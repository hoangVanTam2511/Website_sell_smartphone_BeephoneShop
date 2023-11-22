import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import axios from "axios";
import {
  FaTruck,
  FaRegCalendarCheck,
  FaRegFileAlt,
  FaRegCalendarTimes,
  FaBusinessTime,
} from "react-icons/fa";
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
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import {
  UpdateRecipientOrderDialog,
  PaymentDialog,
  OrderHistoryDialog,
  ConfirmDialog,
  MultiplePaymentMethodsDelivery,
  ProductsDialog,
  ModalUpdateImeiByProductItem,
  ModalRefundProduct,
} from "./AlertDialogSlide.js";
import {
  OrderStatusString,
  OrderTypeString,
  Notistack,
  StatusImei,
} from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { add } from "lodash";
import { FaMoneyBillTransfer, FaMoneyCheckDollar } from "react-icons/fa6";
import InputNumberAmount from "./input-number-amount-product";

const OrderDetail = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [alert, setAlert] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [isRefund, setIsRefund] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [order, setOrder] = useState({});
  const [orderHistories, setOrderHistories] = useState([]);
  const [status, setStatus] = useState();
  const [paymentHistorys, setPaymentHistorys] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderItemRefund, setOrderItemRefund] = useState([]);
  const { id } = useParams();
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [addressDefault, setAddressDefault] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [customerProvince, setCustomerProvince] = useState("");
  const [customerDistrict, setCustomerDistrict] = useState("");
  const [customerWard, setCustomerWard] = useState("");

  const [openPayment, setOpenPayment] = useState(false);

  const handleCloseOpenPayment = () => {
    setOpenPayment(false);
  };
  const [products, setProducts] = useState([]);
  const [openProducts, setOpenProducts] = useState(false);
  const handleCloseOpenProducts = () => {
    setIsOpen(false);
    setOpenProducts(false);
  };
  const [openModalImei, setOpenModalImei] = useState(false);
  const handleOpenModalImei = () => {
    setOpenModalImei(true);
  };
  const handleCloseOpenModalImei = () => {
    setOpenModalImei(false);
  };
  const getAllProducts = async () => {
    await axios
      .get(`http://localhost:8080/api/products/product-items`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error");
      });
  };
  const [openModalUpdateImei, setOpenModalUpdateImei] = useState(false);
  const handleOpenModalUpdateImei = () => {
    setOpenModalUpdateImei(true);
  };
  const handleCloseOpenModalUpdateImei = () => {
    setOpenModalUpdateImei(false);
  };
  const [idOrderItem, setIdOrderItem] = useState("");
  const [orderItem, setOrderItem] = useState({});
  const [itemImg, setItemImg] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [imeis, setImeis] = useState([]);
  const [selectedImei, setSelectedImei] = useState([]);
  const [selectedImeiRefresh, setSelectedImeiRefresh] = useState([]);

  const [openModalRefund, setOpenModalRefund] = useState(false);

  const handleCloseOpenModalRefund = () => {
    setOpenModalRefund(false);
  };

  const filteredData =
    selectedImei &&
    selectedImei.filter((item) => item.trangThai !== StatusImei.REFUND);

  const addCartItemsToCartOrder = async (cartItems) => {
    setIsLoading(true);
    const data = {
      amount: cartItems.amount,
      price: cartItems.price,
      order: {
        id: cartItems.orderId,
      },
      productItem: {
        id: cartItems.productId,
      },
      imeis: cartItems.imeis,
    };
    try {
      await axios.put(`http://localhost:8080/api/carts/order`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getOrderItemsById();
      handleCloseOpenModalImei();
      handleCloseOpenProducts();
      handleOpenAlertVariant("Thêm sản phẩm thành công ", Notistack.SUCCESS);
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, "warning");
      setIsLoading(false);
      // setIsOpen(false);
    }
  };
  const handleAddProductToCartOrder = (price, id, imeis) => {
    const amount = imeis && imeis.length;
    const cartItems = {
      amount: amount,
      price: price,
      orderId: order.id,
      productId: id,
      imeis: imeis,
    };
    if (imeis.length > 0) {
      addCartItemsToCartOrder(cartItems);
    }
  };

  const handleDeleteCartItemOrderById = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/carts/order/${id}`);
      await getOrderItemsById();
      setIsLoading(false);
      handleOpenAlertVariant(
        "Xóa thành công sản phẩm khỏi giỏ hàng!",
        Notistack.SUCCESS
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAmountCartItemOrder = async (imeis) => {
    setIsLoading(true);
    const request = {
      id: idOrderItem,
      amount: imeis && imeis.length,
      imeis: imeis,
      order: {
        id: order.id,
      },
    };
    try {
      await axios.put(`http://localhost:8080/api/carts/order/amount`, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getOrderItemsById();
      handleCloseOpenModalUpdateImei();
      handleOpenAlertVariant(
        "Cập nhật số lượng thành công!",
        Notistack.SUCCESS
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleOpenAlertVariant(error.response.data.message, "warning");
      console.error("Error");
    }
  };

  const [total, setTotal] = useState(0);

  const getOrderItemsById = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        const data = response.data.data;
        setOrder(data);
        const sortOrderHistories =
          data.orderHistories &&
          data.orderHistories.sort((a, b) => a.loaiThaoTac - b.loaiThaoTac);
        setOrderHistories(sortOrderHistories);
        const sortPayments =
          data.paymentMethods &&
          data.paymentMethods.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        setPaymentHistorys(sortPayments);
        // const sortOrderItems = data.paymentMethods && data.paymentMethods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const sortOrderItems =
          data &&
          data.orderItems.flatMap((orderItem) => {
            const imeisWithRefund = orderItem.imeisDaBan.filter(
              (imei) => imei.trangThai === StatusImei.REFUND
            );
            if (imeisWithRefund.length > 0) {
              const imeisWithoutRefund = orderItem.imeisDaBan.filter(
                (imei) => imei.trangThai !== StatusImei.REFUND
              );
              const orderItemWithoutRefundImei = {
                ...orderItem,
                imeisDaBan: imeisWithoutRefund,
                soLuong: imeisWithoutRefund.length,
              };
              const orderItemsWithRefundImei = imeisWithRefund.map((imei) => ({
                ...orderItem,
                imeisDaBan: [imei],
                trangThai: StatusImei.REFUND,
                soLuong: 1,
              }));
              return [orderItemWithoutRefundImei, ...orderItemsWithRefundImei];
            }
            return orderItem;
          });

        console.log(sortOrderItems.filter((item) => item.soLuong > 0));

        setOrderItems(sortOrderItems.filter((item) => item.soLuong > 0));
        // setOrderItemRefund(sortOrderItemRefund);

        const address =
          data &&
          data.account &&
          data.account.diaChiList &&
          data.account.diaChiList.find((item) => item.trangThai === 1);
        const getAddressDefault =
          address &&
          address.diaChi +
            ", " +
            address.xaPhuong +
            ", " +
            address.quanHuyen +
            ", " +
            address.tinhThanhPho;
        setAddressDefault(getAddressDefault);

        if (data.loaiHoaDon === OrderTypeString.DELIVERY) {
          setCustomerName(data.tenNguoiNhan === null ? "" : data.tenNguoiNhan);
          setCustomerPhone(
            data.soDienThoaiNguoiNhan === null ? "" : data.soDienThoaiNguoiNhan
          );
          setCustomerAddress(
            data.diaChiNguoiNhan === null ? "" : data.diaChiNguoiNhan
          );
          setCustomerDistrict(
            data.quanHuyenNguoiNhan === null ? "" : data.quanHuyenNguoiNhan
          );
          setCustomerProvince(
            data.tinhThanhPhoNguoiNhan === null
              ? ""
              : data.tinhThanhPhoNguoiNhan
          );
          setCustomerWard(
            data.xaPhuongNguoiNhan === null ? "" : data.xaPhuongNguoiNhan
          );
          setCustomerNote(data.ghiChu === null ? "" : data.ghiChu);
        }

        const tongTien = (data && data.tongTien) || 0;
        const discount =
          (data && data.voucher && data.voucher.giaTriVoucher) || 0;
        const phiShip = (data && data.phiShip) || 0;
        setTotal(tongTien - discount + phiShip);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrderItemsById();
    getAllProducts();
  }, []);

  const handleRefund = async (imeis, total, note, fee, totalString) => {
    setIsLoading(true);
    const request = {
      id: idOrderItem,
      amount: imeis && imeis.length,
      imeis: imeis,
      order: {
        id: order.id,
      },
      tongTien: total || 0,
      ghiChu: note,
      phuPhi: fee || 0,
      tongTienString: totalString,
    };
    try {
      await axios.put(`http://localhost:8080/api/carts/order/refund`, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getOrderItemsById();
      handleCloseOpenModalRefund();
      handleOpenAlertVariant(
        "Xác nhận trả hàng thành công!",
        Notistack.SUCCESS
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleOpenAlertVariant(error.response.data.message, "warning");
      console.error("Error");
    }
  };

  const [maxAmount, setMaxAmount] = useState(0);

  const totalItem = (amount, price) => {
    return amount * price;
  };

  const totalOrder = (total, discount, feeShip) => {
    return total - discount + feeShip;
  };

  const isOrderValidDelivery =
    order &&
    order.orderItems &&
    order.orderItems.every((item) => item.soLuong === item.imeisDaBan.length);

  const updateStatusOrderDelivery = async (orderRequest) => {
    setIsLoading(true);
    try {
      await axios
        .put(`http://localhost:8080/api/orders/${id}`, orderRequest, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            isUpdateStatusOrderDelivery: true,
          },
        })
        .then((response) => {
          getOrderItemsById();
          setIsLoading(false);
          handleOpenAlertVariant("Xác nhận thành công", "success");
        });
    } catch (error) {
      const message = error.response.data.message;
      setIsLoading(false);
      handleOpenAlertVariant(message, Notistack.ERROR);
      console.log(error.response.data);
    }
  };

  const handlePaymentOrder = async (type, total) => {
    setIsLoading(true);
    const orderRequest = {
      tienKhachTra: total,
      id: id,
      hinhThucThanhToan:
        type === "Chuyển khoản" ? "Chuyển khoản thường" : "Tiền mặt",
      hoanTien: isRefund === true ? "Hoàn tiền" : "",
    };
    try {
      await axios
        .put(`http://localhost:8080/api/vnpay/payment/delivery`, orderRequest, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const order = response.data.data;
          setOrder(order);
          setPaymentHistorys(order.paymentMethods);
          handleCloseOpenPayment();
          handleOpenAlertVariant(
            "Xác nhận thanh toán thành công",
            Notistack.SUCCESS
          );
          setIsRefund(false);
          setIsLoading(false);
        });
    } catch (error) {
      const message = error.response.data.message;
      setIsLoading(false);
      setIsRefund(false);
      handleOpenAlertVariant(message, Notistack.ERROR);
      console.log(error.response.data);
    }
  };

  const soTienThanhToan = 15000000;
  const handleAddPayment = () => {
    const newPayment = {
      ma: "20219128391",
      loaiThanhToan: 0,
      hinhThucThanhToan: 0,
      trangThai: 1,
      createdAt: new Date(),
      soTienThanhToan: 20000000,
      nguoiXacNhan: "Admin",
    };
    setPaymentHistorys((p) => {
      return [...p, newPayment];
    });
  };
  const columnsTableOrderHistories = [
    {
      width: "10%",
      dataIndex: "loaiThaoTac",
      render: (text, item) => (
        <div className="ms-5">
          <span className="text-center" style={{ fontWeight: "" }}>
            {item.loaiThaoTac == 0 ? (
              <>
                <FaRegFileAlt
                  color="#09a129"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : item.loaiThaoTac == 1 ? (
              <>
                <FaMoneyCheckDollar
                  color="#09a129"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : item.loaiThaoTac == 2 ? (
              <>
                <FaBusinessTime
                  color="#ffd500"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : item.loaiThaoTac == 3 ? (
              <>
                <FaTruck
                  color="#09a129"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : item.loaiThaoTac == 4 ? (
              <>
                <FaRegCalendarCheck
                  color="#09a129"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : item.loaiThaoTac == 5 ? (
              <>
                <FaRegCalendarTimes
                  color="#e5383b"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : item.loaiThaoTac == 6 ? (
              <>
                <FaRegCalendarCheck
                  color="#09a129"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : item.loaiThaoTac == 7 ? (
              <>
                <FaMoneyBillTransfer
                  color="#e5383b"
                  size={"40px"}
                  style={{ marginBottom: "5px" }}
                />
                <span className="ms-4">{item.thaoTac}</span>
              </>
            ) : (
              ""
            )}
          </span>
        </div>
      ),
    },
    {
      title: "Thời Gian",
      align: "center",
      width: "15%",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span style={{ fontWeight: "normal" }}>
          {format(new Date(record.createdAt), "HH:mm:ss - dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Người Xác Nhận",
      align: "center",
      dataIndex: "nguoiXacNhan",
      width: "10%",
      render: (text, record) => (
        <span style={{ fontWeight: "550" }}>Admin</span>
      ),
    },
    {
      title: "Ghi Chú",
      align: "center",
      width: "35%",
      dataIndex: "moTa",
      render: (text, record) => (
        <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>
          {record.moTa}
        </span>
      ),
    },
  ];
  const columns = [
    {
      title: "Số Tiền",
      align: "center",
      dataIndex: "soTienThanhToan",
      width: "15%",
      render: (text, record) => (
        <span className="txt-danger" style={{ fontSize: "17px" }}>
          {record &&
            record.soTienThanhToan &&
            record.soTienThanhToan.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </span>
      ),
    },
    {
      title: "Loại Giao Dịch",
      align: "center",
      dataIndex: "loaiThanhToan",
      width: "10%",
      render: (type) =>
        type == 1 ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "110px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Hoàn tiền
            </span>
          </div>
        ) : type == 0 ? (
          <div
            className="rounded-pill badge-primary mx-auto"
            style={{ height: "35px", width: "110px", padding: "4px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Thanh toán
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Phương Thức Thanh Toán",
      align: "center",
      width: "10%",
      dataIndex: "hinhThucThanhToan",
      render: (text, record) =>
        record.hinhThucThanhToan === 0 || record.hinhThucThanhToan === 2 ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "120px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Chuyển khoản
            </span>
          </div>
        ) : record.hinhThucThanhToan == 1 ? (
          <div
            className="rounded-pill badge-success mx-auto"
            style={{ height: "35px", width: "90px", padding: "4px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Tiền mặt
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Trạng Thái",
      align: "center",
      width: "10%",
      dataIndex: "trangThai",
      render: (status) =>
        status == 1 ? (
          <div
            className="rounded-pill badge-primary mx-auto"
            style={{
              height: "35px",
              width: "115px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Thành công
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Thời Gian",
      align: "center",
      width: "15%",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span style={{ fontWeight: "normal" }}>
          {format(new Date(record.createdAt), "HH:mm:ss - dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Mã Giao Dịch",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "500" }}>
          {record.hinhThucThanhToan === 0 ? record.ma : "..."}
        </span>
      ),
    },
    {
      title: "Người Xác Nhận",
      align: "center",
      width: "15%",
      dataIndex: "nguoiXacNhan",
    },
  ];
  const EmptyData = () => {
    return (
      <>
        <div className="text-center" style={{ height: "50px" }}>
          <p className="mt-4" style={{ fontSize: "20px" }}>
            Chưa có dữ liệu!
          </p>
        </div>
      </>
    );
  };

  const [openDialogUpdateRecipientOrder, setOpenDialogUpdateRecipientOrder] =
    useState(false);
  const [openCommon, setOpenCommon] = useState(false);
  const [openDialogPayment, setOpenDialogPayment] = useState(false);
  const [openDialogDetailOrderHistories, setOpenDialogDetailOrderHistories] =
    useState(false);

  const handleCloseNoActionCommon = () => {
    setOpenCommon(false);
  };

  const handleClickOpenDialogPayment = () => {
    setOpenDialogPayment(true);
  };

  const handleCloseDialogPayment = () => {
    setIsDone(true);
    handleAddPayment();
    setOpenDialogPayment(false);
  };

  const handleClickOpenDialogDetailOrderHistories = () => {
    setOpenDialogDetailOrderHistories(true);
  };

  const handleCloseDialogDetailOrderHistories = () => {
    setOpenDialogDetailOrderHistories(false);
  };

  const handleConfirmOrderCancel = (description) => {
    const data = {
      trangThai: OrderStatusString.CANCELLED,
      orderHistory: {
        createdAt: new Date(),
        createdBy: "",
        thaoTac: "Đã Hủy Đơn",
        loaiThaoTac: 5,
        moTa: description || "",
        hoaDon: {
          id: order.id,
        },
      },
    };
    updateStatusOrderDelivery(data);
    setOpenCommon(false);
  };
  const handleConfirmOrderFinish = (description) => {
    const data = {
      trangThai: OrderStatusString.SUCCESS_DELIVERY,
      orderHistory: {
        createdAt: new Date(),
        createdBy: "",
        thaoTac: "Giao Hàng Thành Công",
        loaiThaoTac: 4,
        moTa: description || "",
        hoaDon: {
          id: order.id,
        },
      },
    };
    updateStatusOrderDelivery(data);
    setOpenCommon(false);
  };
  const handleConfirmDelivery = (description) => {
    const data = {
      trangThai: OrderStatusString.DELIVERING,
      orderHistory: {
        createdAt: new Date(),
        createdBy: "",
        thaoTac: "Đã Giao Hàng Cho Bên Vận Chuyển",
        loaiThaoTac: 3,
        moTa: description,
        hoaDon: {
          id: order.id,
        },
      },
    };
    updateStatusOrderDelivery(data);
    setOpenCommon(false);
  };
  const handleConfirmPreparing = (description) => {
    const data = {
      trangThai: OrderStatusString.PREPARING,
      orderHistory: {
        createdAt: new Date(),
        createdBy: "",
        thaoTac: "Đang Chuẩn Bị Hàng",
        loaiThaoTac: 2,
        moTa: description,
        hoaDon: {
          id: order.id,
        },
      },
    };
    updateStatusOrderDelivery(data);
    setOpenCommon(false);
  };

  const handleConfirmOrderInfo = (description) => {
    const data = {
      trangThai: OrderStatusString.CONFIRMED,
      orderHistory: {
        createdAt: new Date(),
        createdBy: "",
        thaoTac: "Đã Xác Nhận Thông Tin Đơn Hàng",
        loaiThaoTac: 1,
        moTa: description,
        hoaDon: {
          id: order.id,
        },
      },
    };
    updateStatusOrderDelivery(data);
    setOpenCommon(false);
  };
  const handleOpenDialogConfirmOrder = (status, isCancel) => {
    if (isCancel) {
      setStatus(OrderStatusString.CANCELLED);
      setOpenCommon(true);
    } else {
      setStatus(status);
      setOpenCommon(true);
    }
  };
  const handleClickOpenDialogUpdateRecipientOrder = () => {
    setOpenDialogUpdateRecipientOrder(true);
  };

  const handleCloseDialogUpdateRecipientOrder = () => {
    setOpenDialogUpdateRecipientOrder(false);
  };
  const handleCloseNoActionDialogUpdateRecipientOrder = () => {
    setOpenDialogUpdateRecipientOrder(false);
  };
  const handleCloseNoActionDialogPayment = () => {
    setOpenDialogPayment(false);
  };

  const StyledTableContainer = styled(TableContainer)({
    boxShadow: "none",
  });

  const StyledTableHead = styled(TableHead)`
    & tr:hover th {
      background-color: white !important;
    }
  `;

  const StyledTableBody = styled(TableBody)`
    & tr:hover td {
      background-color: white !important;
    }
  `;

  const useStyles = () => ({});

  const classes = useStyles();

  const TimeLine = () => {
    return (
      <div className="time-line">
        <Timeline
          minEvents={orderHistories && 5 + orderHistories.length}
          placeholder
        >
          {orderHistories &&
            orderHistories.map((item, index) => (
              <TimelineEvent
                icon={
                  item.loaiThaoTac == 0
                    ? FaRegFileAlt
                    : item.loaiThaoTac == 1
                    ? FaMoneyCheckDollar
                    : item.loaiThaoTac == 2
                    ? FaBusinessTime
                    : item.loaiThaoTac == 3
                    ? FaTruck
                    : item.loaiThaoTac == 4
                    ? FaRegCalendarCheck
                    : item.loaiThaoTac == 5
                    ? FaRegCalendarTimes
                    : item.loaiThaoTac == 6
                    ? FaRegCalendarCheck
                    : item.loaiThaoTac == 7
                    ? FaMoneyBillTransfer
                    : ""
                }
                title={
                  <div className="mt-1">
                    <span style={{ whiteSpace: "pre-line", fontSize: "19px" }}>
                      {item.thaoTac}
                    </span>
                  </div>
                }
                subtitle={format(
                  new Date(item.createdAt),
                  "HH:mm:ss - dd/MM/yyyy"
                )}
                color={
                  item.loaiThaoTac == 0
                    ? "#09a129"
                    : item.loaiThaoTac == 1
                    ? "#09a129"
                    : item.loaiThaoTac == 2
                    ? "#ffd500"
                    : item.loaiThaoTac == 3
                    ? "#09a129"
                    : item.loaiThaoTac == 4
                    ? "#09a129"
                    : item.loaiThaoTac == 5
                    ? "#e5383b"
                    : item.loaiThaoTac == 6
                    ? "#09a129"
                    : item.loaiThaoTac == 7
                    ? "#e5383b"
                    : ""
                }
              />
            ))}
        </Timeline>
      </div>
    );
  };

  const ProcessOrder = () => {
    return (
      <div className="d-flex justify-content-between mt-2 p-3">
        <div className="d-flex order-info">
          {order.trangThai == OrderStatusString.PENDING_CONFIRM &&
          order.loaiHoaDon == OrderTypeString.DELIVERY ? (
            <div>
              <Button
                onClick={() =>
                  handleOpenDialogConfirmOrder(
                    OrderStatusString.PENDING_CONFIRM,
                    false
                  )
                }
                className="rounded-2 ms-2"
                type="primary"
                style={{
                  height: "40px",
                  width: "auto",
                  fontSize: "16px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  XÁC NHẬN
                </span>
              </Button>
            </div>
          ) : null}
          {(order.trangThai === OrderStatusString.PREPARING ||
            order.trangThai === OrderStatusString.CONFIRMED) &&
          order.loaiHoaDon === OrderTypeString.DELIVERY ? (
            <div>
              <Button
                onClick={() =>
                  handleOpenDialogConfirmOrder(
                    OrderStatusString.PREPARING,
                    false
                  )
                }
                className="rounded-2 ms-2"
                type="primary"
                style={{
                  height: "40px",
                  width: "auto",
                  fontSize: "16px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  GIAO HÀNG
                </span>
              </Button>
            </div>
          ) : null}
          {order.trangThai == OrderStatusString.CONFIRMED &&
          order.loaiHoaDon == OrderTypeString.DELIVERY ? (
            <div>
              <Button
                onClick={() =>
                  handleOpenDialogConfirmOrder(
                    OrderStatusString.CONFIRMED,
                    false
                  )
                }
                className="rounded-2 ms-2"
                type="warning"
                style={{
                  height: "40px",
                  width: "auto",
                  fontSize: "16px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  ĐANG CHUẨN BỊ
                </span>
              </Button>
            </div>
          ) : null}
          {order.tienKhachTra >= total &&
          order.trangThai == OrderStatusString.DELIVERING &&
          order.loaiHoaDon == OrderTypeString.DELIVERY ? (
            <div>
              <Button
                onClick={() =>
                  handleOpenDialogConfirmOrder(
                    OrderStatusString.DELIVERING,
                    false
                  )
                }
                className="rounded-2 ms-2"
                type="primary"
                style={{
                  height: "40px",
                  width: "auto",
                  fontSize: "16px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  HOÀN THÀNH ĐƠN
                </span>
              </Button>
            </div>
          ) : (
            ""
          )}
          {paymentHistorys &&
          paymentHistorys.length <= 0 &&
          order.trangThai != OrderStatusString.CANCELLED &&
          order.trangThai != OrderStatusString.SUCCESS_DELIVERY &&
          order.loaiHoaDon == OrderTypeString.DELIVERY ? (
            <div className="">
              <Button
                onClick={() => handleOpenDialogConfirmOrder(null, true)}
                danger
                className="rounded-2 ms-2"
                type="danger"
                style={{
                  height: "40px",
                  width: "auto",
                  fontSize: "16px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  HỦY ĐƠN
                </span>
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <Button
            onClick={() => console.log(isOrderValidDelivery ? "OK" : "NOT")}
            className="rounded-2 me-2"
            type="primary"
            style={{
              height: "40px",
              width: "130px",
              fontSize: "16px",
            }}
          >
            <span
              className="text-white"
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              IN HÓA ĐƠN
            </span>
          </Button>
          <Button
            onClick={handleClickOpenDialogDetailOrderHistories}
            className="rounded-2"
            type="warning"
            style={{
              height: "40px",
              width: "100px",
              fontSize: "16px",
            }}
          >
            <span
              className="text-dark"
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              Chi Tiết
            </span>
          </Button>
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
            <div className="">
              {order.trangThai === OrderStatusString.PENDING_CONFIRM ||
              order.trangThai === OrderStatusString.CONFIRMED ||
              order.trangThai === OrderStatusString.PREPARING ? (
                <Button
                  onClick={handleClickOpenDialogUpdateRecipientOrder}
                  className="rounded-2 ms-2"
                  type="primary"
                  style={{
                    height: "40px",
                    fontSize: "16px",
                    width: "100px",
                  }}
                >
                  <span
                    className=""
                    style={{ fontWeight: "500", marginBottom: "2px" }}
                  >
                    Cập nhật
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
                  className="rounded-pill"
                  style={{
                    height: "35px",
                    width: "auto",
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
                    className="rounded-pill badge-success"
                    style={{
                      height: "35px",
                      width: "auto",
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
                    className="rounded-pill bg-primary"
                    style={{
                      height: "35px",
                      width: "auto",
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
                    className="rounded-pill badge-warning"
                    style={{
                      height: "35px",
                      width: "auto",
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
                    className="rounded-pill badge-success"
                    style={{
                      height: "35px",
                      width: "auto",
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
                    className="rounded-pill mx-auto badge-warning"
                    style={{
                      height: "35px",
                      width: "auto",
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
                    className="rounded-pill badge-primary"
                    style={{
                      height: "35px",
                      width: "auto",
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
                    className="rounded-pill bg-primary"
                    style={{
                      height: "35px",
                      width: "auto",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đã giao hàng
                    </span>
                  </div>
                ) : order.trangThai == OrderStatusString.CANCELLED ? (
                  <div
                    className="rounded-pill badge-danger"
                    style={{
                      height: "35px",
                      width: "auto",
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
                    className="rounded-pill bg-primary"
                    style={{
                      height: "35px",
                      width: "auto",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đã thanh toán
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
                  className="rounded-pill"
                  style={{
                    height: "35px",
                    width: "auto",
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
            {/*order.loaiHoaDon === OrderTypeString.DELIVERY ?
              <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
                <div className="ms-2 mt-1" style={{ width: "140px" }}>
                  <span style={{ fontSize: "17px" }}>
                    Ngày Thanh Toán</span>
                </div>
                <div className="ms-5 ps-5">
                  <div
                    className="rounded-pill"
                    style={{
                      height: "35px",
                      width: "auto",
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
              : ""*/}
            {/*order.loaiHoaDon === OrderTypeString.DELIVERY ?
              <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
                <div className="ms-2 mt-1" style={{ width: "140px" }}>
                  <span style={{ fontSize: "17px" }}>
                    Ngày giao hàng cho bên vận chuyển</span>
                </div>
                <div className="ms-5 ps-5">
                  <div
                    className="rounded-pill"
                    style={{
                      height: "35px",
                      width: "auto",
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
              : ""*/}
          </Col>
          <Col sm="6" className="ms-5">
            <div className="ms-4 mt-3 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Tên Khách Hàng</span>
              </div>
              <div className="ms-5 ps-5">
                {order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                order.account === null ? (
                  <div
                    className="rounded-pill"
                    style={{
                      height: "35px",
                      width: "auto",
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
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                  order.account === null
                    ? "..."
                    : order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
                      order.account &&
                      order.account.diaChiList
                    ? addressDefault
                    : order.diaChiNguoiNhan +
                      ", " +
                      order.xaPhuongNguoiNhan +
                      ", " +
                      order.quanHuyenNguoiNhan +
                      ", " +
                      order.tinhThanhPhoNguoiNhan}
                </span>
              </div>
            </div>
            {/*order.loaiHoaDon === OrderTypeString.DELIVERY ?
              <div className="ms-4 mt-4 mt-1 d-flex" style={{ height: "30px" }}>
                <div className="ms-2 mt-1" style={{ width: "140px" }}>
                  <span style={{ fontSize: "17px" }}>Ghi Chú Shipper</span>
                </div>
                <div
                  className="ms-5 ps-5 mt-1"
                  style={{ whiteSpace: "pre-line", flex: "1" }}
                >
                  <span className="text-dark ms-1" style={{ fontSize: "17px" }}>
                    {order.diaChiNguoiNhan == null ? "..." : order.diaChiNguoiNhan}
                  </span>
                </div>
              </div>
              : ""*/}
            {/*order.loaiHoaDon === OrderTypeString.DELIVERY ?
              <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
                <div className="ms-2 mt-1" style={{ width: "140px" }}>
                  <span style={{ fontSize: "17px" }}>
                    Ngày hoàn thành đơn</span>
                </div>
                <div className="ms-5 ps-5">
                  <div
                    className="rounded-pill"
                    style={{
                      height: "35px",
                      width: "auto",
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
              : ""*/}
          </Col>
        </Row>
      </div>
    );
  };

  const PaymentHistories = () => {
    return (
      <div className="wrap-payment mt-4 p-3">
        <div className="">
          <div className="d-flex justify-content-between">
            <div className="ms-2" style={{ marginTop: "3px" }}>
              <span className="" style={{ fontSize: "25px" }}>
                LỊCH SỬ THANH TOÁN
              </span>
            </div>
            <div className="">
              {order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.tienKhachTra < total ? (
                <Button
                  onClick={() => setOpenPayment(true)}
                  className="rounded-2 ms-2"
                  type="primary"
                  style={{
                    height: "40px",
                    fontSize: "16px",
                    width: "180px",
                  }}
                >
                  <span
                    className=""
                    style={{ fontWeight: "500", marginBottom: "2px" }}
                  >
                    Tiến hành thanh toán
                  </span>
                </Button>
              ) : order.tienTraKhach < order.tienTraHang ? (
                <Button
                  onClick={() => {
                    setOpenPayment(true);
                    setIsRefund(true);
                  }}
                  className="rounded-2 ms-2"
                  type="primary"
                  style={{
                    height: "40px",
                    fontSize: "16px",
                    width: "110px",
                  }}
                >
                  <span
                    className=""
                    style={{ fontWeight: "500", marginBottom: "2px" }}
                  >
                    Hoàn tiền
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
        <div className="mt-3">
          <Table
            className="scroll-container1"
            columns={columns}
            dataSource={paymentHistorys}
            pagination={false}
            rowKey={"id"}
            key={"id"}
            locale={{ emptyText: <Empty /> }}
          />
          {/*
              <div className="d-flex justify-content-between p-3">
                <div className="ms-1 mt-2">
                  <div className="" style={{ marginTop: "1px" }}>
                    <span className="ms-2" style={{ fontSize: "16px" }}>
                      Đã Thanh Toán Tổng Cộng
                    </span>
                    <span
                      className="ms-4"
                      style={{
                        fontSize: "16px",
                        color: "#dc1111",
                        fontWeight: "550",
                      }}
                    >
                      {soTienThanhToan.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </div>
                <div className="">
                  <div
                    className="rounded-pill bg-primary me-2"
                    style={{ height: "38px", width: "auto", padding: "10px" }}
                  >
                    <span
                      className="text-white p-1"
                      style={{ fontSize: "14px" }}
                    >
                      Hoàn tất thanh toán
                    </span>
                  </div>
                </div>
              </div>
*/}
        </div>
      </div>
    );
  };

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
            {item.imeisDaBan &&
              item.imeisDaBan.length <= 0 &&
              item.imeisDaBan.length !== item.soLuong && (
                <div className="mt-2 pt-1">
                  <Box sx={{ width: "100%" }}>
                    <Alert color="danger" variant="soft">
                      Bạn cần chọn Imei cho sản phẩm trước khi giao hàng.
                    </Alert>
                  </Box>
                </div>
              )}
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
            {item.trangThai !== StatusImei.REFUND &&
            (order.trangThai === OrderStatusString.HAD_PAID ||
              order.trangThai === OrderStatusString.SUCCESS_DELIVERY) ? (
              <Button
                onClick={() => {
                  setOpenModalRefund(true);
                  setSelectedImei(item.imeisDaBan);
                  setIdOrderItem(item.id);
                  setItemImg(
                    item &&
                      item.sanPhamChiTiet &&
                      item.sanPhamChiTiet.image &&
                      item.sanPhamChiTiet.image.path
                  );
                  setItemName(
                    item.sanPhamChiTiet.sanPham.tenSanPham +
                      "\u00A0" +
                      item.sanPhamChiTiet.ram.dungLuong +
                      "/" +
                      item.sanPhamChiTiet.rom.dungLuong +
                      "GB" +
                      " " +
                      `(${item.sanPhamChiTiet.mauSac.tenMauSac})`
                  );
                  setItemPrice(item && item.sanPhamChiTiet.donGia);
                  setSelectedImeiRefresh([]);
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
            ) : order.trangThai === OrderStatusString.PENDING_CONFIRM ||
              order.trangThai === OrderStatusString.PREPARING ||
              order.trangThai === OrderStatusString.CONFIRMED ? (
              <>
                <Button
                  onClick={() => {
                    handleOpenModalUpdateImei();
                    const imeisDaBan = item.imeisDaBan;
                    const imeiAll = item.sanPhamChiTiet.imeis;
                    const isSelected = (item) =>
                      imeisDaBan.some(
                        (selectedItem) => selectedItem.soImei === item.soImei
                      );
                    const sortedItems = [...imeiAll].sort((a, b) => {
                      const isSelectedA = isSelected(a);
                      const isSelectedB = isSelected(b);
                      if (isSelectedA && !isSelectedB) {
                        return -1;
                      } else if (!isSelectedA && isSelectedB) {
                        return 1;
                      }
                      return 0;
                    });
                    setImeis(sortedItems);
                    setMaxAmount(item.soLuong);
                    setIdOrderItem(item.id);
                    setSelectedImei(item.imeisDaBan);
                    setSelectedImeiRefresh([]);
                  }}
                  className="rounded-2 button-mui"
                  type="primary"
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
                    Cập Nhật
                  </span>
                </Button>
                {orderItems && orderItems.length > 1 && (
                  <Button
                    onClick={() => handleDeleteCartItemOrderById(item.id)}
                    className="rounded-2 button-mui ms-2"
                    type="danger"
                    style={{ height: "38px", width: "80px", fontSize: "15px" }}
                  >
                    <span
                      className="text-white"
                      style={{
                        marginBottom: "2px",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      Xóa
                    </span>
                  </Button>
                )}
              </>
            ) : item.trangThai === StatusImei.REFUND ? (
              <Button
                // onClick={() => removeProductInCart(item.id)}
                className="rounded-2                   ant-btn-danger-light"
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
                // onClick={() => removeProductInCart(item.id)}
                className="rounded-2 ant-btn-light"
                style={{ height: "38px", width: "90px", fontSize: "15px" }}
              >
                <span
                  className=""
                  style={{
                    marginBottom: "2px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  Chi Tiết
                </span>
              </Button>
            )}
          </div>
        </div>
      ),
    },
  ];

  const OrderSummary = () => {
    return (
      <div className="wrap-order-summary mt-4 p-3">
        <div className="">
          <div className="d-flex justify-content-between">
            <div className="ms-2" style={{ marginTop: "3px" }}>
              <span className="" style={{ fontSize: "25px" }}>
                DANH SÁCH SẢN PHẨM ĐÃ{" "}
                {order.loaiHoaDon === OrderTypeString.AT_COUNTER ? "" : " ĐẶT "}{" "}
                MUA
              </span>
            </div>
            <div className="">
              {order.trangThai === OrderStatusString.PENDING_CONFIRM ||
              order.trangThai === OrderStatusString.CONFIRMED ||
              order.trangThai === OrderStatusString.PREPARING ? (
                <Button
                  onClick={() => {
                    setOpenProducts(true);
                    getAllProducts();
                    setIsOpen(true);
                  }}
                  className="rounded-2"
                  type="primary"
                  style={{ height: "40px", width: "145px", fontSize: "16px" }}
                >
                  <span
                    className="text-white"
                    style={{ marginBottom: "3px", fontWeight: "500" }}
                  >
                    Thêm sản phẩm
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

        <div
          className="ms-2 mt-2"
          style={{
            borderBottom: "2px solid #C7C7C7",
            width: "99.2%",
            borderWidth: "2px",
          }}
        ></div>
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
                  Tổng tiền hàng
                </span>
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {order &&
                    order.tongTien &&
                    order.tongTien.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px", color: "" }}>
                  Giảm giá
                </span>
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {(order &&
                    order.voucher &&
                    order.voucher.giaTriVoucher &&
                    order.voucher.giaTriVoucher.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    "Không"}
                </span>
              </div>
              {order.loaiHoaDon === OrderTypeString.AT_COUNTER ? (
                <>
                  <div className="d-flex justify-content-between mt-3">
                    <span className="" style={{ fontSize: "16px", color: "" }}>
                      Khách cần trả
                    </span>
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span
                      className=""
                      style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      Khách thanh toán
                    </span>
                    <span
                      className="fw-bold"
                      style={{ fontSize: "17px", color: "#dc1111" }}
                    >
                      {order &&
                        order.tienKhachTra &&
                        order.tienKhachTra.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between mt-3">
                    <span className="" style={{ fontSize: "16px", color: "" }}>
                      Phí vận chuyển
                    </span>
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {order &&
                        order.phiShip &&
                        order.phiShip.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span
                      className="text-dark"
                      style={{ fontSize: "16px", color: "", fontWeight: "500" }}
                    >
                      Tổng cộng
                    </span>
                    <span
                      className="fw-bold"
                      style={{ fontSize: "17px", color: "#dc1111" }}
                    >
                      {order &&
                        order.khachCanTra &&
                        order.khachCanTra.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span className="" style={{ fontSize: "16px", color: "" }}>
                      Khách thanh toán
                    </span>
                    <span
                      className="fw-bold"
                      style={{ fontSize: "17px", color: "#2f80ed" }}
                    >
                      {(order &&
                        order.tienKhachTra &&
                        order.tienKhachTra.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })) ||
                        "Chưa thanh toán"}
                    </span>
                  </div>
                </>
              )}
              {order.tienThua !== 0 ? (
                <div className="d-flex justify-content-between mt-3">
                  <span className="" style={{ fontSize: "16px", color: "" }}>
                    Tiền thừa trả khách
                  </span>
                  <span className="text-dark" style={{ fontSize: "17px" }}>
                    {order &&
                      order.tienThua &&
                      order.tienThua.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </span>
                </div>
              ) : (
                ""
              )}
              {order.tienTraHang && (
                <div className="d-flex justify-content-between mt-3">
                  <span className="" style={{ fontSize: "16px", color: "" }}>
                    Hoàn trả
                  </span>
                  <span className="text-dark" style={{ fontSize: "17px" }}>
                    {order &&
                      order.tienTraHang.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </span>
                </div>
              )}
              {order.tienTraKhach && (
                <div className="d-flex justify-content-between mt-3">
                  <span className="" style={{ fontSize: "16px", color: "" }}>
                    Đã trả khách
                  </span>
                  <span className="text-dark" style={{ fontSize: "17px" }}>
                    {order &&
                      order.tienTraKhach.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="wrap-timeline mt-4">
        <div class="scroll-container mt-2">
          <Card>
            <Card.Body>
              <TimeLine />
            </Card.Body>
          </Card>
        </div>
        <ConfirmDialog
          open={openCommon}
          status={status}
          confirmPreparing={handleConfirmPreparing}
          confirmOrderInfo={handleConfirmOrderInfo}
          confirmDelivery={handleConfirmDelivery}
          confirmFinish={handleConfirmOrderFinish}
          confirmCancel={handleConfirmOrderCancel}
          onCloseNoAction={handleCloseNoActionCommon}
        />
        <ProcessOrder />
      </div>

      <OrderInfo />
      <PaymentHistories />
      <OrderSummary />

      <OrderHistoryDialog
        columns={columnsTableOrderHistories}
        open={openDialogDetailOrderHistories}
        onClose={handleCloseDialogDetailOrderHistories}
        dataSource={orderHistories}
      />
      <PaymentDialog
        open={openDialogPayment}
        onClose={handleCloseDialogPayment}
        onCloseNoAction={handleCloseNoActionDialogPayment}
        addPayment={handleAddPayment}
      />
      <UpdateRecipientOrderDialog
        open={openDialogUpdateRecipientOrder}
        onClose={handleCloseDialogUpdateRecipientOrder}
        onCloseNoAction={handleCloseNoActionDialogUpdateRecipientOrder}
        name={customerName}
        phone={customerPhone}
        address={customerAddress}
        province={customerProvince}
        district={customerDistrict}
        ward={customerWard}
        note={customerNote}
      />

      <MultiplePaymentMethodsDelivery
        open={openPayment}
        close={handleCloseOpenPayment}
        hoanTien={isRefund}
        data={paymentHistorys}
        khachCanTra={order.khachCanTra}
        khachThanhToan={order.tienKhachTra}
        canTraKhach={order.tienTraHang}
        addPayment={handlePaymentOrder}
      />

      <ProductsDialog
        onOpenImei={handleOpenModalImei}
        onCloseImei={handleCloseOpenModalImei}
        openImei={openModalImei}
        isOpen={isOpen}
        open={openProducts}
        onClose={handleCloseOpenProducts}
        data={products}
        add={handleAddProductToCartOrder}
      />

      <ModalUpdateImeiByProductItem
        open={openModalUpdateImei}
        close={handleCloseOpenModalUpdateImei}
        imeis={imeis}
        imeisChuaBan={selectedImei}
        refresh={selectedImeiRefresh}
        update={handleUpdateAmountCartItemOrder}
        delivery={true}
        max={maxAmount}
      />

      <ModalRefundProduct
        open={openModalRefund}
        close={handleCloseOpenModalRefund}
        imeis={filteredData}
        refresh={selectedImeiRefresh}
        img={itemImg}
        price={itemPrice}
        name={itemName}
        refund={handleRefund}
      />

      {isLoading && <LoadingIndicator />}
      <div className="mt-4"></div>
    </>
  );
};
export default OrderDetail;
