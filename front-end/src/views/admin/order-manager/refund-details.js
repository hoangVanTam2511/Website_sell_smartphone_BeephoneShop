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
import { ConfirmRefundOrder, ModalRefundProduct } from "./AlertDialogSlide";
import { ref, updateMetadata } from "firebase/storage";
const RefundDetail = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [orderRefunds, setOrderRefunds] = useState([]);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const { id } = useParams();
  const [total, setTotal] = useState(0);

  const getOrderItemsById = async () => {
    await axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        const data = response.data.data;
        setOrder(data);

        // const filteredData = data.orderItems.filter((item) => item.soLuong > 0);
        // setOrderItems(filteredData);

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

        const orderRefunds = data.orderItems.reduce((acc, orderItem) => {
          const imeiRefunds = orderItem.imeisDaBan.filter(
            (imei) => imei.trangThai === StatusImei.REFUND
          );
          if (imeiRefunds.length > 0) {
            const refundObject = imeiRefunds.map((imeiRefund) => ({
              ...orderItem,
              soLuong: 1,
              imei: imeiRefund,
            }));
            acc.push(...refundObject);
          }
          return acc;
        }, []);

        setOrderRefunds(orderRefunds);

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

  const totalRefund = () => {
    let total = 0;
    orderRefunds &&
      orderRefunds.map((item) => {
        total += item.donGia;
      });
    return total;
  };

  const columnsOrderItemsRefund = [
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
                {item && item.sanPhamChiTiet.donGia
                  ? item.sanPhamChiTiet.donGia.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : ""}
              </span>
            </div>
            <div className="mt-2 pt-1"></div>
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
            {item.imei.trangThai === StatusImei.REFUND ? (
              <Button
                className="rounded-2 ant-btn-danger-light"
                style={{ height: "38px", width: "130px", fontSize: "15px" }}
                type={"danger"}
              >
                <span
                  className="text-white"
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
                {item && item.sanPhamChiTiet.donGia
                  ? item.sanPhamChiTiet.donGia.toLocaleString("vi-VN", {
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
                order.account === null ? (
                  <div
                    className="rounded-pill text-center"
                    style={{
                      height: "35px",
                      width: "130px",
                      padding: "5px",
                      backgroundColor: "#e1e1e1",
                    }}
                  >
                    <span
                      className="text-dark p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Khách hàng lẻ
                    </span>
                  </div>
                ) : order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                  order.account &&
                  order.account.hoVaTen ? (
                  order.account.hoVaTen
                ) : (
                  order.tenNguoiNhan
                )}
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
                    ? "..."
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
                    ? "..."
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

  const hasOrderWithoutStatus = orderRefunds.some((orderRefund) => {
    const imeiValues = Object.values(orderRefund.imei);
    return imeiValues.some((imei) => imei.trangThai !== StatusImei.REFUND);
  });

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
                {order.trangThai === OrderStatusString.SUCCESS_DELIVERY ||
                order.trangThai === OrderStatusString.HAD_PAID ? (
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
                      // setOpenProducts(true);
                      // getAllProducts();
                      // setIsOpen(true);
                    }}
                    className="rounded-2"
                    type="primary"
                    style={{ height: "40px", width: "130px", fontSize: "16px" }}
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
                    dataSource={orderItems}
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

  const handleRefund = async () => {
    const request = {
      orderItemRefunds: orderRefunds,
      tongTien: totalRefund(),
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
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, "warning");
      console.error("Error");
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

    const updatedOrderRefunds = orderRefunds.filter(
      (item) => item !== refundItem
    );

    setOrderItems(updatedOrderItems);
    setOrderRefunds(updatedOrderRefunds);
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

    const filteredData = updatedOrderItems.filter((item) => item.soLuong > 0);
    setOrderItems(filteredData);
    const ordersRefund =
      imeis &&
      imeis.map((item) => {
        return {
          ...orderItem,
          soLuong: 1,
          imei: item,
        };
      });
    const updatedOrderRefunds = [...orderRefunds, ...ordersRefund];
    setOrderRefunds(updatedOrderRefunds);
    console.log(updatedOrderRefunds);
  };

  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <OrderInfo />
        {orderItems && orderItems.length > 0 && <ProductHadBuy />}

        {orderRefunds && orderRefunds.length > 0 && <ProductRefund />}
        <div className="d-flex mt-3">
          <div
            style={{
              // backgroundColor: "whitesmoke",
              height: "auto",
              width: "400px",
            }}
            className="rounded-2 ms-auto wrap-total-money"
          >
            <div className="p-4">
              <div className="d-flex justify-content-between">
                <span className="" style={{ fontSize: "16px", color: "" }}>
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
                  Cần trả khách
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

      <ConfirmRefundOrder
        open={openModalRefundOrder}
        onClose={handleCloseOpenModalRefundOrder}
        confirm={handleRefund}
      />
    </>
  );
};
export default RefundDetail;
