import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import axios from "axios";
import { Table as TableMui, Tooltip, Zoom } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingIndicator from "../../../utilities/loading";
import EditIcon from "@mui/icons-material/Edit";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Card from "../../../components/Card";
import styleCss from "./style.css";
import { format } from "date-fns";
import {
  OrderStatusString,
  OrderTypeString,
  Notistack,
  StatusImei,
} from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { add } from "lodash";
import PrinterInvoice, { Print } from "./printer-invoice";
import {
  ConfirmRefund,
  ConfirmRefundOrder,
  ModalRefundProduct,
} from "./AlertDialogSlide";
import { ref, updateMetadata } from "firebase/storage";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/user/userSlice";
const RefundDetail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [orderItemsTotal, setOrderItemsTotal] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [orderRefunds, setOrderRefunds] = useState([]);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [codeDiscount, setCodeDiscount] = useState("");

  const userId = getUser().id;

  const getOrderItemsById = async () => {
    await axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        const data = response.data.data;
        setOrder(data);
        console.log(data);

        const discountVoucher = data.voucher && data.voucher.giaTriVoucher;
        const discountVoucherCode = data.voucher && data.voucher.ma;
        setTotalDiscount(discountVoucher || 0);
        setCodeDiscount(discountVoucherCode === null ? "" : discountVoucherCode);

        // const filteredData = data.orderItems.filter((item) => item.soLuong > 0);
        setOrderItemsTotal(data.orderItems);

        const updatedOrderItems = data.orderItems.map((orderItem) => {
          const imeiRefundCount = orderItem.imeisDaBan.filter(
            (imei) => imei.trangThai === StatusImei.REFUND
          ).length;
          const newQuantity = orderItem.soLuong - imeiRefundCount;

          return {
            ...orderItem,
            soLuong: newQuantity,
          };
        });

        setOrderItems(updatedOrderItems);
        console.log(updatedOrderItems);

        const orderRefunds = data.orderItems.reduce((acc, orderItem) => {
          const imeiRefunds = orderItem.imeisDaBan.filter(
            (imei) => imei.trangThai === StatusImei.REFUND
          );
          if (imeiRefunds.length > 0) {
            const refundObject = imeiRefunds.map((imeiRefund) => ({
              ...orderItem,
              soLuong: 1,
              imei: imeiRefund,
              trangThai: StatusImei.REFUND,
            }));
            acc.push(...refundObject);
          }
          return acc;
        }, []);

        setOrderRefunds(orderRefunds);
        console.log(orderRefunds);

        const tongTien = (data && data.tongTien) || 0;
        const discount =
          (data && data.voucher && data.voucher.giaTriVoucher) || 0;
        const phiShip = (data && data.phiShip) || 0;
        setTotal(tongTien - discount + phiShip);
      })
      .catch((error) => {
        handleOpenAlertVariant("Không tìm thấy đơn hàng!", Notistack.ERROR);
      });
  };

  // const handleRedirectRefundOrderDetail = () => {
  //   navigate(`/dashboard/refund-order/${orderCode}`)
  // }

  const [selectedImeiRefresh, setSelectedImeiRefresh] = useState([]);
  const [selectedImei, setSelectedImei] = useState([]);
  const filteredData =
    selectedImei &&
    selectedImei.filter((item) => item.trangThai !== StatusImei.REFUND);
  const [openModalRefund, setOpenModalRefund] = useState(false);
  const [openModalRefundOrder, setOpenModalRefundOrder] = useState(false);

  const handleCloseOpenModalRefund = () => {
    setOpenModalRefund(false);
  };
  const handleCloseOpenModalRefundOrder = () => {
    setOpenModalRefundOrder(false);
  };
  useEffect(() => {
    getOrderItemsById();
  }, []);

  const totalItem = (amount, price) => {
    return amount * price;
  };

  const totalSizeRefundFinal = () => {
    let total = 0;
    orderRefunds &&
      orderRefunds.map((item) => {
        if (item.trangThai === StatusImei.SOLD) {
          total += item.soLuong;
        }
      });
    return total;
  };

  const totalRefundFinal = () => {
    let total = 0;
    orderRefunds &&
      orderRefunds.map((item) => {
        if (item.trangThai === StatusImei.SOLD) {
          if (item.donGiaSauGiam !== null && item.donGiaSauGiam !== 0) {
            total += item.donGiaSauGiam;
          } else {
            total += item.donGia;
          }
        }
      });
    return total;
  };

  const canTraKhach = () => {
    return totalRefund() - order.tienTraKhach;
  };

  const totalRefund = () => {
    let total = 0;
    orderRefunds &&
      orderRefunds.map((item) => {
        if (item.donGiaSauGiam !== null && item.donGiaSauGiam !== 0) {
          total += item.donGiaSauGiam;
        } else {
          total += item.donGia;
        }
      });
    return total;
  };

  const countPrice = (price, afterDiscount) => {
    return price - afterDiscount;
  };

  const columnsOrderItemsRefund = [
    {
      title: "Sản phẩm",
      width: "40%",
      align: "center",
      render: (text, item) => (
        <div className="d-flex">
          <div className="product-img" style={{ position: "relative" }}>
            <img
              src={
                item &&
                item.sanPhamChiTiet &&
                item.sanPhamChiTiet.image &&
                item.sanPhamChiTiet.image.path
              }
              class=""
              alt=""
              style={{ width: "125px", height: "125px" }}
            />
          </div>
          <div className="product ms-3 text-start">
            <Tooltip
              TransitionComponent={Zoom}
              title="Xem sản phẩm"
              style={{ cursor: "pointer" }}
              placement="top-start"
            >
              <div classNamountme="product-name">
                <span
                  className="underline-custom"
                  style={{
                    whiteSpace: "pre-line",
                    fontSize: "17.5px",
                    fontWeight: "500",
                  }}
                >
                  {item.sanPhamChiTiet.sanPham.tenSanPham +
                    "\u00A0" +
                    item.sanPhamChiTiet.ram.dungLuong +
                    "/" +
                    item.sanPhamChiTiet.rom.dungLuong +
                    "GB" +
                    " " +
                    `(${item.sanPhamChiTiet.mauSac.tenMauSac})`}
                </span>
              </div>
            </Tooltip>
            <div className="mt-2">
              <span
                className="txt-price"
                style={{ fontSize: "17.5px", fontWeight: "" }}
              >
                {item && item.donGiaSauGiam !== null && item.donGiaSauGiam !== 0
                  ? item.donGiaSauGiam.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                  : ""}
              </span>
              <span
                className={
                  item.donGiaSauGiam !== null && item.donGiaSauGiam !== 0
                    ? "txt-price-discount ms-2"
                    : "txt-price"
                }
                style={{ fontSize: "17px", fontWeight: "" }}
              >
                {item && item.donGia
                  ? item.donGia.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số Imei",
      align: "center",
      width: "10%",
      render: (text, item) => <div>{item.imei.soImei}</div>,
    },
    {
      title: "Thành tiền",
      align: "center",
      width: "20%",
      render: (text, item) => (
        <div>
          <span
            style={{ fontSize: "17.5px", fontWeight: "" }}
            className="txt-price"
          >
            {(item &&
              totalItem(
                item.soLuong,
                item.donGiaSauGiam !== null && item.donGiaSauGiam !== 0
                  ? item.donGiaSauGiam
                  : item.donGia
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })) ||
              0}
          </span>
        </div>
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      dataIndex: "actions",
      width: "15%",
      render: (text, item) => (
        <div>
          <div className="button-container">
            {item.imei.trangThai === StatusImei.REFUND ? (
              <Button
                onClick={() => console.log(totalRefund())}
                className="rounded-2 ant-btn-light"
                style={{ height: "38px", width: "130px", fontSize: "15px" }}
              >
                <span
                  className=""
                  style={{
                    marginBottom: "2px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  Đã Hoàn Trả
                </span>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  cancelRefund(item);
                }}
                className="rounded-2 button-mui"
                type="danger"
                style={{ height: "38px", width: "130px", fontSize: "15px" }}
              >
                <span
                  className="text-white"
                  style={{
                    marginBottom: "2px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  Hủy Trả Hàng
                </span>
              </Button>
            )}
          </div>
        </div>
      ),
    },
  ];

  const columnsOrderItems = [
    {
      title: "Sản phẩm",
      width: "40%",
      align: "center",
      render: (text, item) => (
        <div className="d-flex">
          <div className="product-img">
            <img
              src={
                item &&
                item.sanPhamChiTiet &&
                item.sanPhamChiTiet.image &&
                item.sanPhamChiTiet.image.path
              }
              class=""
              alt=""
              style={{ width: "125px", height: "125px" }}
            />
          </div>
          <div className="product ms-3 text-start">
            <Tooltip
              TransitionComponent={Zoom}
              title="Xem sản phẩm"
              style={{ cursor: "pointer" }}
              placement="top-start"
            >
              <div classNamountme="product-name">
                <span
                  className="underline-custom"
                  style={{
                    whiteSpace: "pre-line",
                    fontSize: "17.5px",
                    fontWeight: "500",
                  }}
                >
                  {item.sanPhamChiTiet.sanPham.tenSanPham +
                    "\u00A0" +
                    item.sanPhamChiTiet.ram.dungLuong +
                    "/" +
                    item.sanPhamChiTiet.rom.dungLuong +
                    "GB" +
                    " " +
                    `(${item.sanPhamChiTiet.mauSac.tenMauSac})`}
                </span>
              </div>
            </Tooltip>
            <div className="mt-2">
              <span
                className="product-price txt-price"
                style={{ fontSize: "17.5px", fontWeight: "" }}
              >
                {item && item.donGia
                  ? item.donGia.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      align: "center",
      dataIndex: "soLuong",
      width: "10%",
      render: (text, item) => (
        <div>
          <span style={{ fontWeight: "", fontSize: "17px" }} className="">
            {"x" + item.soLuong}
          </span>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      align: "center",
      width: "20%",
      render: (text, item) => (
        <div>
          <span
            style={{ fontSize: "17.5px", fontWeight: "" }}
            className="txt-price"
          >
            {(item &&
              totalItem(item.soLuong, item.donGia).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })) ||
              0}
          </span>
        </div>
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      dataIndex: "actions",
      width: "15%",
      render: (text, item) => (
        <div>
          <div className="button-container">
            <Button
              onClick={() => {
                setOpenModalRefund(true);
                setSelectedImei(item.imeisDaBan);
                setSelectedImeiRefresh([]);
                setOrderItem(item);
              }}
              className="rounded-2 button-mui"
              type="danger"
              style={{ height: "38px", width: "100px", fontSize: "15px" }}
            >
              <span
                className="text-white"
                style={{
                  marginBottom: "2px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Trả Hàng
              </span>
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const ChinhSachTraHang = () => {
    return (
      <div
        className="wrap-order-refund mt-4"
        style={{
          height: "380px",
        }}
      >
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <div className="ms-2" style={{ marginTop: "3px" }}>
              <span className="" style={{ fontSize: "25px", color: "" }}>
                CHÍNH SÁCH TRẢ HÀNG & HOÀN TIỀN
                <span style={{ color: "#2f80ed" }}>
                  {" "}
                  (TRẢI NGHIỆM 7 NGÀY DÙNG THỬ)
                </span>
              </span>
            </div>
            <div className=""></div>
          </div>
          <div
            className="ms-2 mt-2"
            style={{
              borderBottom: "2px solid #C7C7C7",
              width: "99.2%",
              borderWidth: "2px",
            }}
          ></div>
        </div>

        <div className="text-center ms-4" style={{ width: "96.5%" }}>
          <table
            className="table-info-order"
            border="1"
            cellpadding="5"
            cellspacing="10"
          >
            <thead>
              <tr>
                <th align="center" class="" style={{ width: "50%" }}>
                  Điều kiện áp dụng hoàn trả sản phẩm
                </th>
                <th align="center" class="" style={{ width: "50%" }}>
                  Yêu cầu về việc hoàn trả sản phẩm
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  align="center"
                  style={{ whiteSpace: "pre-line", width: "50%" }}
                >
                  - Áp dụng với các hóa đơn thanh toán bằng tiền mặt hoặc chuyển
                  khoản trực tiếp.
                </td>
                <td
                  align="center"
                  style={{ whiteSpace: "pre-line", width: "50%" }}
                >
                  - Còn hóa đơn mua hàng, phiếu bảo hành hoặc chứng thực thông
                  tin mua người mua hàng và số điện thoại.
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style={{ whiteSpace: "pre-line", width: "50%" }}
                >
                  - Không áp dụng với các hình thức thanh toán khác.
                </td>
                <td
                  align="center"
                  style={{ whiteSpace: "pre-line", width: "50%" }}
                >
                  - Còn đẩy đủ hộp sản phẩm, phụ kiện đi kèm (nếu có), sản phẩm
                  còn nguyên vẹn không trầy xước, cấn móp.
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="left">
                  <span
                    className="ms-2 ps-1"
                    style={{ color: "red", fontWeight: "500" }}
                  >
                    Lưu ý:
                  </span>
                  <div className="p-2 ms-1">
                    <div>
                      <span style={{ whiteSpace: "pre-line" }}>
                        -{" "}
                        <span className="" style={{ fontWeight: "500" }}>
                          Sau 7 ngày{" "}
                        </span>
                        không áp dụng chính sách trả hàng. Thời gian được tính
                        từ ngày nhận hàng và không quá{" "}
                        <span className="" style={{ fontWeight: "500" }}>
                          5 (ngày){" "}
                        </span>
                        so với ngày mua hàng trên hoá đơn áp dụng với hình thức
                        giao hàng qua dịch vụ có phát sinh thời gian giao hàng.
                      </span>
                    </div>
                    <div>
                      <span style={{ whiteSpace: "pre-line" }}>
                        - Ngoài thời gian trên sản phẩm được bảo hành theo Chính
                        sách Bảo hành mặc định của{" "}
                        <span style={{}} className="underline-custom">
                          beephoneshop.vn.
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const OrderInfo = () => {
    return (
      <div
        className="wrap-order-detail mt-4"
        style={{
          height:
            order.loaiHoaDon === OrderTypeString.AT_COUNTER
              ? "340px"
              : /* "480px" */ "340px",
        }}
      >
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <div className="ms-2" style={{ marginTop: "3px" }}>
              <span className="" style={{ fontSize: "25px" }}>
                THÔNG TIN ĐƠN HÀNG
              </span>
            </div>
            <div className=""></div>
          </div>
          <div
            className="ms-2 mt-2"
            style={{
              borderBottom: "2px solid #C7C7C7",
              width: "99.2%",
              borderWidth: "2px",
            }}
          ></div>
        </div>

        <Row>
          <Col sm="5">
            <div className="ms-4 mt-3 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span className="" style={{ fontSize: "17px" }}>
                  Mã Đơn Hàng
                </span>
              </div>
              <div className="ms-5 ps-5">
                <div
                  className="rounded-pill text-center"
                  style={{
                    height: "35px",
                    width: "140px",
                    padding: "5px",
                    backgroundColor: "#e1e1e1",
                  }}
                >
                  <span className="text-dark p-2" style={{ fontSize: "14px" }}>
                    {order.ma}
                  </span>
                </div>
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Loại Đơn Hàng</span>
              </div>
              <div className="ms-5 ps-5">
                {order.loaiHoaDon == OrderTypeString.DELIVERY ? (
                  <div
                    className="rounded-pill badge-success text-center"
                    style={{
                      height: "35px",
                      width: "100px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Giao hàng
                    </span>
                  </div>
                ) : (
                  <div
                    className="rounded-pill bg-primary text-center"
                    style={{
                      height: "35px",
                      width: "90px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Tại quầy
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Trạng Thái</span>
              </div>
              <div className="ms-5 ps-5">
                {order.trangThai == OrderStatusString.PENDING_CONFIRM ? (
                  <div
                    className="rounded-pill badge-warning text-center"
                    style={{
                      height: "35px",
                      width: "158px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-dark p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đang chờ xác nhận
                    </span>
                  </div>
                ) : order.trangThai == OrderStatusString.CONFIRMED ? (
                  <div
                    className="rounded-pill badge-success text-center"
                    style={{
                      height: "35px",
                      width: "115px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đã xác nhận
                    </span>
                  </div>
                ) : order.trangThai == OrderStatusString.PREPARING ? (
                  <div
                    className="rounded-pill mx-auto badge-warning text-center"
                    style={{
                      height: "35px",
                      width: "160px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-dark p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đang chuẩn bị hàng
                    </span>
                  </div>
                ) : order.trangThai == OrderStatusString.DELIVERING ? (
                  <div
                    className="rounded-pill badge-primary text-center"
                    style={{
                      height: "35px",
                      width: "135px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đang giao hàng
                    </span>
                  </div>
                ) : order.trangThai == OrderStatusString.SUCCESS_DELIVERY ? (
                  <div
                    className="rounded-pill bg-primary text-center"
                    style={{
                      height: "35px",
                      width: "110px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Hoàn thành
                    </span>
                  </div>
                ) : order.trangThai == OrderStatusString.CANCELLED ? (
                  <div
                    className="rounded-pill badge-danger text-center"
                    style={{
                      height: "35px",
                      width: "80px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đã hủy
                    </span>
                  </div>
                ) : order.trangThai == OrderStatusString.HAD_PAID ? (
                  <div
                    className="rounded-pill bg-primary text-center"
                    style={{
                      height: "35px",
                      width: "110px",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Hoàn thành
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>
                  {order.loaiHoaDon === OrderTypeString.AT_COUNTER
                    ? "Ngày Tạo"
                    : "Ngày Đặt Hàng"}
                </span>
              </div>
              <div className="ms-5 ps-5">
                <div
                  className="rounded-pill text-center"
                  style={{
                    height: "35px",
                    width: "180px",
                    padding: "5px",
                    backgroundColor: "#e1e1e1",
                  }}
                >
                  <span className="text-dark p-2" style={{ fontSize: "14px" }}>
                    {order &&
                      order.createdAt &&
                      format(
                        new Date(order.createdAt),
                        "dd/MM/yyyy - HH:mm:ss"
                      )}
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col sm="6" className="ms-5">
            <div className="ms-4 mt-3 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>
                  {order.loaiHoaDon === OrderTypeString.DELIVERY
                    ? "Tên Người Nhận"
                    : "Tên Khách Hàng"}
                </span>
              </div>
              <div className="ms-5 ps-5">
                {order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                  order.account === null
                  ? order.hoVaTen
                  : order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                    order.account &&
                    order.account.hoVaTen
                    ? order.account.hoVaTen
                    : order.tenNguoiNhan}
              </div>
            </div>
            <div className="ms-4 mt-4 mt-1 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Số Điện Thoại</span>
              </div>
              <div className="ms-5 ps-5 mt-1">
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                    order.account === null
                    ? order.soDienThoai
                    : order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                      order.account &&
                      order.account.soDienThoai
                      ? order.account.soDienThoai
                      : order.soDienThoaiNguoiNhan}
                </span>
              </div>
            </div>
            <div className="ms-4 mt-4 mt-1 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Email</span>
              </div>
              <div className="ms-5 ps-5 mt-1">
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {order.account === null
                    ? order.email
                    : order.account && order.account.email
                      ? order.account.email
                      : "..."}
                </span>
              </div>
            </div>
            <div className="ms-4 mt-4 mt-1 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>
                  Địa Chỉ{" "}
                  {order.loaiHoaDon === OrderTypeString.AT_COUNTER
                    ? ""
                    : " Nhận"}
                </span>
              </div>
              <div
                className="ms-5 ps-5 mt-1"
                style={{ whiteSpace: "pre-line", flex: "1" }}
              >
                <span className="text-dark" style={{ fontSize: "17px" }}></span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  };


  const ProductRefund = () => {
    return (
      <>
        <div className="wrap-order-summary mt-4 p-3">
          <div className="">
            <div className="d-flex justify-content-between">
              <div className="ms-2" style={{ marginTop: "3px" }}>
                <span className="" style={{ fontSize: "25px" }}>
                  TRẢ HÀNG
                </span>
              </div>
              <div className="">
                {orderRefunds.filter(
                  (item) => item.trangThai === StatusImei.SOLD
                ).length > 0 ? (
                  <Button
                    onClick={() => {
                      setOpenModalRefundOrder(true);
                    }}
                    className="rounded-2"
                    type="primary"
                    style={{ height: "40px", width: "170px", fontSize: "16px" }}
                  >
                    <span
                      className="text-white"
                      style={{ marginBottom: "3px", fontWeight: "500" }}
                    >
                      Xác nhận trả hàng
                    </span>
                  </Button>
                ) : null}
              </div>
            </div>
            <div
              className="ms-2 mt-2"
              style={{
                borderBottom: "2px solid #C7C7C7",
                width: "99.2%",
                borderWidth: "2px",
              }}
            ></div>
          </div>

          <div
            className="wrap-cart-order mx-auto"
            style={{ height: "auto", width: "98%" }}
          >
            <Row className="">
              <div className="">
                <div className="mt-2" style={{ height: "auto" }}>
                  <Table
                    className="table-cart"
                    columns={columnsOrderItemsRefund}
                    dataSource={orderRefunds}
                    pagination={false}
                    rowKey={"id"}
                    key={"id"}
                  />
                </div>
              </div>
            </Row>
          </div>
        </div>
      </>
    );
  };

  const ProductHadBuy = () => {
    return (
      <>
        <div className="wrap-order-summary mt-4 p-3">
          <div className="">
            <div className="d-flex justify-content-between">
              <div className="ms-2" style={{ marginTop: "3px" }}>
                <span className="" style={{ fontSize: "25px" }}>
                  DANH SÁCH SẢN PHẨM ĐÃ{" "}
                  {order.loaiHoaDon === OrderTypeString.AT_COUNTER
                    ? ""
                    : " ĐẶT "}{" "}
                  MUA
                </span>
              </div>
              <div className="">
                {order.trangThai === OrderStatusString.SUCCESS_DELIVERY ||
                  order.trangThai === OrderStatusString.HAD_PAID ? (
                  <Button
                    onClick={() => {
                      const updatedOrderItems = orderItemsTotal.map((orderItem) => {
                        return {
                          ...orderItem,
                          soLuong: 0,
                          imeisDaBan: [],
                        };
                      });

                      setOrderItems(updatedOrderItems);
                      const ordersRefunds = orderItemsTotal.flatMap((order) => {
                        return order.imeisDaBan.flatMap((item) => {
                          if (orderRefunds.some((refund) => refund.imei.soImei === item.soImei)) {
                            return [];
                          } else {
                            return {
                              ...order,
                              soLuong: 1,
                              imei: item,
                              trangThai: StatusImei.SOLD,
                            };
                          }
                        });
                      });
                      const updatedOrderRefunds = [...orderRefunds, ...ordersRefunds];
                      setOrderRefunds(updatedOrderRefunds);
                      console.log(updatedOrderRefunds);
                      handleOpenAlertVariant("Trả toàn bộ thành công!", Notistack.SUCCESS);
                    }}
                    className="rounded-2"
                    type="primary"
                    style={{ height: "40px", width: "120px", fontSize: "16px" }}
                  >
                    <span
                      className="text-white"
                      style={{ marginBottom: "3px", fontWeight: "500" }}
                    >
                      Trả toàn bộ
                    </span>
                  </Button>
                ) : null}
              </div>
            </div>
            <div
              className="ms-2 mt-2"
              style={{
                borderBottom: "2px solid #C7C7C7",
                width: "99.2%",
                borderWidth: "2px",
              }}
            ></div>
          </div>

          <div
            className="wrap-cart-order mx-auto"
            style={{ height: "auto", width: "98%" }}
          >
            <Row className="">
              <div className="">
                <div className="mt-2" style={{ height: "auto" }}>
                  <Table
                    className="table-cart"
                    columns={columnsOrderItems}
                    dataSource={orderItems.filter((item) => item.soLuong > 0)}
                    pagination={false}
                    rowKey={"id"}
                    key={"id"}
                  />
                </div>
              </div>
            </Row>
          </div>
        </div>
      </>
    );
  };

  const handleRefund = async (note) => {
    console.log(order.id);
    setIsLoading(true);
    const request = {
      orderItemRefunds: orderRefunds,
      tongTien: totalRefundFinal(),
      id: order.id,
      amount: totalSizeRefundFinal(),
      createdByRefund: userId,
      ghiChu: note,
    };
    try {
      await axios.put(`http://localhost:8080/api/carts/order/refund`, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getOrderItemsById();
      handleCloseOpenModalRefundOrder();
      handleOpenAlertVariant(
        "Xác nhận trả hàng thành công!",
        Notistack.SUCCESS
      );
      setIsLoading(false);
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, "warning");
      console.error("Error");
      setIsLoading(false);
    }
  };

  const cancelRefund = (refundItem) => {
    const { imei, soLuong } = refundItem;
    console.log(refundItem);
    const updatedOrderItems = orderItems.map((item) => {
      if (item.id === refundItem.id) {
        const updatedImeisDaBan = [...item.imeisDaBan, imei];
        const updatedSoLuong = item.soLuong + soLuong;
        return {
          ...item,
          soLuong: updatedSoLuong,
          imeisDaBan: updatedImeisDaBan,
        };
      }
      return item;
    });

    console.log(updatedOrderItems);

    const updatedOrderRefunds = orderRefunds.filter(
      (item) => item !== refundItem
    );
    console.log(updatedOrderRefunds);

    setOrderItems(updatedOrderItems);
    setOrderRefunds(updatedOrderRefunds);
    handleOpenAlertVariant("Hủy trả hàng thành công!", Notistack.SUCCESS);
  };
  const getImeiSelected = (imeis) => {
    const updatedOrderItems = orderItems.map((item) => {
      if (item.id === orderItem.id) {
        const updatedImeisDaBan = item.imeisDaBan.filter(
          (imei) => !imeis.includes(imei)
        );
        const updatedSoLuong = item.soLuong - imeis.length;
        return {
          ...item,
          soLuong: updatedSoLuong,
          imeisDaBan: updatedImeisDaBan,
        };
      }
      return item;
    });

    // const filteredData = updatedOrderItems.filter((item) => item.soLuong > 0);
    setOrderItems(updatedOrderItems);
    const ordersRefund =
      imeis &&
      imeis.map((item) => {
        return {
          ...orderItem,
          soLuong: 1,
          imei: item,
          trangThai: StatusImei.SOLD,
        };
      });
    const updatedOrderRefunds = [...orderRefunds, ...ordersRefund];
    setOrderRefunds(updatedOrderRefunds);
    console.log(updatedOrderRefunds);
    handleOpenAlertVariant("Xác nhận thành công!", Notistack.SUCCESS);
  };

  return (
    <>
      <div
        className="mt-4 "
        style={{
          width: "100%",
          // backgroundColor: "#ffffff",
          // boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <ChinhSachTraHang />
        <OrderInfo />
        {orderItems &&
          orderItems.filter((item) => item.soLuong > 0).length > 0 && (
            <ProductHadBuy />
          )}

        {orderRefunds && orderRefunds.length > 0 && <ProductRefund />}
        <div className="d-flex mt-3  wrap-order-detail">
          <div
            style={{
              // backgroundColor: "whitesmoke",
              height: "auto",
              width: "400px",
            }}
            className="rounded-2 ms-auto"
          >
            <div className="p-4">
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px", color: "" }}>
                  Tổng tiền hàng giá gốc
                </span>
                <span
                  className="text-dark"
                  style={{ fontSize: "17px", fontWeight: "500" }}
                >
                  {(order.tongTien &&
                    order.tongTien.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    0}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px" }}>
                  Số lượng hoàn trả
                </span>
                <span
                  className="text-dark"
                  style={{ fontSize: "17px", fontWeight: "500" }}
                >
                  {orderRefunds && orderRefunds.length}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px", color: "" }}>
                  Tổng tiền trả hàng
                </span>
                <span
                  className="text-dark"
                  style={{ fontSize: "17px", fontWeight: "500" }}
                >
                  {totalRefund().toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || 0}
                </span>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px", color: "" }}>
                  Phiếu giảm giá
                </span>
                <span
                  className="text-dark"
                  style={{ fontSize: "17px", fontWeight: "500" }}
                >
                  <span className="underline-custom" style={{ cursor: "pointer", fontWeight: "500" }}>
                    {codeDiscount !== null || codeDiscount !== "" && "(" + codeDiscount + ") "}
                  </span>
                  {totalDiscount && totalDiscount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || 0}
                </span>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px", color: "" }}>
                  Cần trả khách
                </span>
                <span
                  className="text-dark"
                  style={{ fontSize: "17px", fontWeight: "500" }}
                >
                  {canTraKhach().toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || 0}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px", color: "" }}>
                  Đã trả khách
                </span>
                <span
                  className="text-dark"
                  style={{ fontSize: "17px", fontWeight: "500" }}
                >
                  {(order.tienTraKhach &&
                    order.tienTraKhach.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4"></div>
      <ModalRefundProduct
        open={openModalRefund}
        close={handleCloseOpenModalRefund}
        imeis={filteredData}
        refresh={selectedImeiRefresh}
        refund={getImeiSelected}
      />

      <ConfirmRefund
        open={openModalRefundOrder}
        close={handleCloseOpenModalRefundOrder}
        confirm={handleRefund}
        total={totalRefundFinal().toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
        size={totalSizeRefundFinal()}
      />
      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default RefundDetail;
