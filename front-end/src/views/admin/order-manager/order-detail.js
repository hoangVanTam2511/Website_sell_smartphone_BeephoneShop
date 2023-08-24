import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Input, Select, Table } from "antd";
import axios from "axios";
import { FaTruck, FaRegCalendarCheck, FaRegFileAlt } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import {
  Dialog,
  Select as SelectMui,
  IconButton,
  Slide,
  Button as MuiButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Card from "../../../components/Card";
import {
  DeleteFilled,
  DeleteOutlined,
  DeleteRowOutlined,
  DeleteTwoTone,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import styleCss from "./style.css";
import { format } from "date-fns";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  UpdateRecipientOrderDialog,
  PaymentDialog,
  ConfirmOrderDialog,
  ConfirmDeliveryOrderDialog,
  ConfirmFinishOrderDialog,
  OrderHistoryDialog,
  ConfirmCancelOrderDialog,
  ConfirmDialog,
} from "./AlertDialogSlide.js";
import list from "./data";
import useFormItemStatus from "antd/es/form/hooks/useFormItemStatus";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";

const OrderDetail = () => {
  const [isDone, setIsDone] = useState(false);
  const [order, setOrder] = useState({});
  const [orderHistories, setOrderHistories] = useState([]);
  const [status, setStatus] = useState();
  const { id } = useParams();

  const getOrders = () => {
    axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getOrderHisoriesByOrderId = () => {
    axios
      .get(`http://localhost:8080/api/orders/${id}/orderHistory`)
      .then((response) => {
        setOrderHistories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getOrders();
    getOrderHisoriesByOrderId();
  }, []);

  const updateOrder = async (orderStatus, orderHistory) => {
    const updateData = {
      orderStatus: orderStatus,
      orderHistory: orderHistory,
    };
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getOrders();
      getOrderHisoriesByOrderId();
    } catch (error) { }
  };

  const soTienThanhToan = 15000000;
  const [paymentHistorys, setPaymentHistorys] = useState([]);
  const handleAddPayment = () => {
    const newPayment = {
      ma: "20219128391",
      loaiGiaoDich: 1,
      phuongThucThanhToan: 1,
      trangThai: 0,
      thoiGian: new Date(),
      soTien: 20000000,
      nguoiXacNhan: "Admin",
    };
    setPaymentHistorys((p) => {
      return [...p, newPayment];
    });
  };
  const columnsTableOrderHistories = [
    {
      title: "",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "550" }}>{record.loaiThaoTac}</span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      dataIndex: "thaoTac",
      width: "10%",
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
        <span style={{ fontWeight: "550" }}>Gọi Rồng</span>
      ),
    },
    {
      title: "Ghi Chú",
      align: "center",
      width: "15%",
      dataIndex: "moTa",
    },
  ];
  const columns = [
    {
      title: "Mã Giao Dịch",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "550" }}>{record.ma}</span>
      ),
    },
    {
      title: "Loại Giao Dịch",
      align: "center",
      dataIndex: "loaiGiaoDich",
      width: "10%",
      render: (type) =>
        type == 0 ? (
          <div
            className="rounded-pill mx-auto"
            style={{
              height: "38px",
              width: "100px",
              padding: "5px",
              backgroundColor: "#26A65B",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
            >
              Hoàn tiền
            </span>
          </div>
        ) : type == 1 ? (
          <div
            className="rounded-pill bg-primary mx-auto"
            style={{ height: "38px", width: "100px", padding: "5px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
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
      dataIndex: "phuongThucThanhToan",
      render: (type) =>
        type == 0 ? (
          <div
            className="rounded-pill mx-auto"
            style={{
              height: "38px",
              width: "100px",
              padding: "5px",
              backgroundColor: "#26A65B",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
            >
              Chuyển khoản
            </span>
          </div>
        ) : type == 1 ? (
          <div
            className="rounded-pill bg-primary mx-auto"
            style={{ height: "38px", width: "90px", padding: "5px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
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
        status == 0 ? (
          <div
            className="rounded-pill bg-success mx-auto"
            style={{
              height: "38px",
              width: "100px",
              padding: "5px",
              backgroundColor: "#26A65B",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
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
      dataIndex: "thoiGian",
      render: (text, record) => (
        <span style={{ fontWeight: "normal" }}>
          {format(record.thoiGian, "HH:mm:ss - dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Số Tiền",
      align: "center",
      dataIndex: "soTien",
      width: "10%",
      render: (text, record) => (
        <span style={{ color: "#dc1111", fontWeight: "550" }}>
          {record.soTien.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
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

  const [openDialogUpdateRecipientOrder, setOpenDialogUpdateRecipientOrder] = useState(false);
  const [openCommon, setOpenCommon] = useState(false);
  const [openDialogPayment, setOpenDialogPayment] = useState(false);
  const [openDialogDetailOrderHistories, setOpenDialogDetailOrderHistories] = useState(false);

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
    updateOrder(4, {
      createdAt: new Date(),
      thaoTac: "Đã Hủy Đơn",
      loaiThaoTac: "4",
      moTa: description,
    });
    setOpenCommon(false);
  };
  const handleConfirmOrderFinish = (description) => {
    updateOrder(3, {
      createdAt: new Date(),
      thaoTac: "Đã Nhận Được Hàng",
      loaiThaoTac: "3",
      moTa: description,
    });
    setOpenCommon(false);
  };
  const handleConfirmDelivery = (description) => {
    updateOrder(2, {
      createdAt: new Date(),
      thaoTac: "Đã Giao Cho Đơn Vị Vận Chuyển",
      loaiThaoTac: "2",
      moTa: description,
    });
    setOpenCommon(false);
  };

  const handleConfirmOrderInfo = (description) => {
    updateOrder(1, {
      createdAt: new Date(),
      thaoTac: "Đã Xác Nhận Thông Tin Đơn Hàng",
      loaiThaoTac: "1",
      moTa: description,
    });
    setOpenCommon(false);
  };
  const handleOpenDialogConfirmOrder = (status, isCancel) => {
    if (isCancel) {
      setStatus(4);
      setOpenCommon(true);
    }
    else {
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

  return (
    <>
      <div className="wrap-timeline">
        <div class="scroll-container mt-2">
          <Card>
            <Card.Body>
              <div className="time-line">
                <Timeline minEvents={6 + orderHistories.length} placeholder>
                  {orderHistories.map((item, index) => (
                    <TimelineEvent
                      icon={
                        item.loaiThaoTac == 0
                          ? FaRegFileAlt
                          : item.loaiThaoTac == 1
                            ? FaRegFileAlt
                            : item.loaiThaoTac == 2
                              ? FaTruck
                              : item.loaiThaoTac == 3
                                ? FaRegCalendarCheck
                                : item.loaiThaoTac == 4
                                  ? MdCancelPresentation
                                  : item.loaiThaoTac == 5
                                    ? MdCancelPresentation
                                    : ""
                      }
                      title={
                        <div className="mt-1">
                          <span
                            style={{ whiteSpace: "pre-line", fontSize: "20px" }}
                          >
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
                          ? "#26A65B"
                          : item.loaiThaoTac == 1
                            ? "#26A65B"
                            : item.loaiThaoTac == 2
                              ? "#26A65B"
                              : item.loaiThaoTac == 3
                                ? "#26A65B"
                                : item.loaiThaoTac == 4
                                  ? "#dc3333"
                                  : ""
                      }
                    />
                  ))}
                </Timeline>
              </div>
            </Card.Body>
          </Card>
        </div>
        <ConfirmDialog
          open={openCommon}
          status={status}
          confirmOrderInfo={handleConfirmOrderInfo}
          confirmDelivery={handleConfirmDelivery}
          confirmFinish={handleConfirmOrderFinish}
          confirmCancel={handleConfirmOrderCancel}
          onCloseNoAction={handleCloseNoActionCommon}
        />
        <div className="d-flex justify-content-between mt-2 p-3">
          <div className="d-flex">
            {order.trangThai == 0 ? (
              <div>
                <Button
                  onClick={() => handleOpenDialogConfirmOrder(order.trangThai, false)}
                  className="rounded-2 ms-2"
                  type="primary"
                  style={{
                    height: "50px",
                    width: "auto",
                    fontSize: "16px",
                    backgroundColor: "#3A57E8",
                  }}
                >
                  <span
                    className=""
                    style={{ fontWeight: "550", marginBottom: "2px" }}
                  >
                    XÁC NHẬN
                  </span>
                </Button>
              </div>
            ) : order.trangThai == 1 ? (
              <div>
                <Button
                  onClick={() => handleOpenDialogConfirmOrder(order.trangThai, false)}
                  className="rounded-2 ms-2"
                  type="primary"
                  style={{
                    height: "50px",
                    width: "auto",
                    fontSize: "16px",
                    backgroundColor: "#3A57E8",
                  }}
                >
                  <span
                    className=""
                    style={{ fontWeight: "550", marginBottom: "2px" }}
                  >
                    GIAO HÀNG
                  </span>
                </Button>
              </div>
            ) : isDone == true && order.trangThai == 2 ? (
              <div>
                <Button
                  onClick={() => handleOpenDialogConfirmOrder(order.trangThai, false)}
                  className="rounded-2 ms-2"
                  type="primary"
                  style={{
                    height: "50px",
                    width: "auto",
                    fontSize: "16px",
                    backgroundColor: "#3A57E8",
                  }}
                >
                  <span
                    className=""
                    style={{ fontWeight: "550", marginBottom: "2px" }}
                  >
                    HOÀN THÀNH
                  </span>
                </Button>
              </div>
            ) : (
              ""
            )}
            {order.trangThai != 3 && order.trangThai != 4 ? (
              <div className="ms-1">
                <Button
                  onClick={() => handleOpenDialogConfirmOrder(null, true)}
                  danger
                  className="rounded-2 ms-2"
                  type="primary"
                  style={{
                    height: "50px",
                    width: "auto",
                    fontSize: "16px",
                    backgroundColor: "#dc3333",
                  }}
                >
                  <span
                    className=""
                    style={{ fontWeight: "550", marginBottom: "2px" }}
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
              onClick={handleClickOpenDialogDetailOrderHistories}
              className="rounded-2 me-2"
              type="primary"
              style={{
                height: "50px",
                width: "100px",
                fontSize: "16px",
                backgroundColor: "#F5A524",
              }}
            >
              <span
                className="text-dark"
                style={{ fontWeight: "550", marginBottom: "2px" }}
              >
                Chi Tiết
              </span>
            </Button>
            <OrderHistoryDialog
              columns={columnsTableOrderHistories}
              open={openDialogDetailOrderHistories}
              onClose={handleCloseDialogDetailOrderHistories}
              dataSource={orderHistories}
            />
          </div>
        </div>
      </div>

      <div className="wrap-order-detail mt-3">
        <div
          className="d-flex justify-content-between"
          style={{ position: "relative" }}
        >
          <div className="ms-4 mt-4">
            <span style={{ fontSize: "27.5px" }}>THÔNG TIN ĐƠN HÀNG</span>
          </div>
          <div className="me-4 mt-3">
            <Link to={""} className="">
              <Button
                onClick={handleClickOpenDialogUpdateRecipientOrder}
                className="rounded-2 ms-2"
                type="primary"
                style={{
                  height: "50px",
                  fontSize: "16px",
                  backgroundColor: "#3A57E8",
                  width: "100px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "550", marginBottom: "2px" }}
                >
                  Thay Đổi
                </span>
              </Button>
              <UpdateRecipientOrderDialog
                open={openDialogUpdateRecipientOrder}
                onClose={handleCloseDialogUpdateRecipientOrder}
                onCloseNoAction={handleCloseNoActionDialogUpdateRecipientOrder}
              />
            </Link>
          </div>
        </div>
        <hr className="mx-auto" style={{ borderWidth: "2px", width: "96%" }} />

        <Row>
          <Col sm="5">
            <div className="ms-4 mt-2 d-flex" style={{ height: "30px" }}>
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Mã Đơn Hàng</span>
              </div>
              <div className="ms-5 ps-5">
                <div
                  className="rounded-pill"
                  style={{
                    height: "31px",
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
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Loại Đơn Hàng</span>
              </div>
              <div className="ms-5 ps-5">
                {order.loaiHoaDon == 1 ? (
                  <div
                    className="rounded-pill"
                    style={{
                      height: "31px",
                      width: "92px",
                      padding: "5px",
                      backgroundColor: "#26A65B",
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
                      height: "31px",
                      width: "92px",
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
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Trạng Thái</span>
              </div>
              <div className="ms-5 ps-5">
                {order.trangThai == 0 ? (
                  <div
                    className="rounded-pill"
                    style={{
                      height: "31px",
                      width: "151px",
                      padding: "5px",
                      backgroundColor: "#FAAD14",
                    }}
                  >
                    <span
                      className="text-dark p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đang chờ xác nhận
                    </span>
                  </div>
                ) : order.trangThai == 1 ? (
                  <div
                    className="rounded-pill bg-success"
                    style={{
                      height: "31px",
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
                ) : order.trangThai == 2 ? (
                  <div
                    className="rounded-pill bg-primary"
                    style={{
                      height: "31px",
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
                ) : order.trangThai == 3 ? (
                  <div
                    className="rounded-pill bg-primary"
                    style={{
                      height: "31px",
                      width: "auto",
                      padding: "5px",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đã nhận được hàng
                    </span>
                  </div>
                ) : order.trangThai == 4 ? (
                  <div
                    className="rounded-pill"
                    style={{
                      height: "31px",
                      width: "auto",
                      padding: "5px",
                      backgroundColor: "#dc3333",
                    }}
                  >
                    <span
                      className="text-white p-2"
                      style={{ fontSize: "14px" }}
                    >
                      Đã hủy
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Ngày tạo</span>
              </div>
              <div className="ms-5 ps-5">
                <div
                  className="rounded-pill"
                  style={{
                    height: "31px",
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
                        "HH:mm:ss - dd/MM/yyyy"
                      )}
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col sm="6" className="ms-5">
            <div className="ms-4 mt-2 d-flex" style={{ height: "30px" }}>
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Tên Khách Hàng</span>
              </div>
              <div className="ms-5 ps-5">
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {order.tenNguoiNhan}
                </span>
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Số Điện Thoại</span>
              </div>
              <div className="ms-5 ps-5">
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {order.soDienThoaiNguoiNhan}
                </span>
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Email</span>
              </div>
              <div className="ms-5 ps-5">
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  haog@gmail.com
                </span>
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2" style={{ width: "130px" }}>
                <span style={{ fontSize: "17px" }}>Địa Chỉ</span>
              </div>
              <div
                className="ms-5 ps-5"
                style={{ whiteSpace: "pre-line", flex: "1" }}
              >
                <span className="text-dark" style={{ fontSize: "17px" }}>
                  {order.diaChiNguoiNhan}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="wrap-payment mt-3">
        <div className="d-flex justify-content-between">
          <div className="ms-4 mt-4">
            <span style={{ fontSize: "27.5px" }}>LỊCH SỬ THANH TOÁN</span>
          </div>
          <div className="me-4 mt-3">
            <Link to={""} className="">
              <Button
                onClick={handleClickOpenDialogPayment}
                className="rounded-2 ms-2"
                type="primary"
                style={{
                  height: "50px",
                  fontSize: "16px",
                  backgroundColor: "#3A57E8",
                  width: "193px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "550", marginBottom: "2px" }}
                >
                  Tiến Hành Thanh Toán
                </span>
              </Button>
              <PaymentDialog
                open={openDialogPayment}
                onClose={handleCloseDialogPayment}
                onCloseNoAction={handleCloseNoActionDialogPayment}
                addPayment={handleAddPayment}
              />
            </Link>
          </div>
        </div>
        <hr className="mx-auto" style={{ borderWidth: "2px", width: "96%" }} />
        <div>
          {paymentHistorys.length == 0 ? (
            <EmptyData />
          ) : (
            <>
              <Table
                className="scroll-container1"
                columns={columns}
                dataSource={paymentHistorys}
                pagination={false}
              />
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
            </>
          )}
        </div>
      </div>
      <div className="wrap-order-summary mt-3">
        <div className="wrap-cart-order" style={{ height: "auto" }}>
          <Row className="">
            <div className="">
              {list.slice(0, 3).map((l, index) => (
                <Col sm="12">
                  <div className="d-flex cart-item mt-3 ms-3 p-3">
                    <div className="item-img">
                      <img
                        style={{ width: "205px", height: "180px" }}
                        src={l.img}
                      />
                    </div>
                    <div className="item-info ms-4">
                      <div className="d-flex justify-content-between">
                        <div
                          className="wrap-item-name"
                          style={{
                            width: "900px",
                            whiteSpace: "normal",
                            height: "50px",
                          }}
                        >
                          <span
                            className="text-dark item-name"
                            style={{ fontSize: "25px" }}
                          >
                            {l.title}
                          </span>
                        </div>
                      </div>
                      <div className="item-detail">
                        <div className="d-flex">
                          <span
                            className=""
                            style={{ fontSize: "15px", color: "#666" }}
                          >
                            Màu sắc: Gray
                          </span>
                        </div>
                        <div
                          className="d-flex mt-1"
                          style={{ position: "relative" }}
                        >
                          <div style={{ width: "550px" }}>
                            <span
                              className=""
                              style={{ fontSize: "15px", color: "#666" }}
                            >
                              RAM: 8GB,{" "}
                            </span>
                            <span
                              className="ms-2"
                              style={{ fontSize: "15px", color: "#666" }}
                            >
                              {" "}
                              ROM: 64GB
                            </span>
                          </div>
                          <div
                            className="d-flex"
                            style={{
                              position: "absolute",
                              left: "530px",
                              bottom: "-8px",
                            }}
                          >
                            <div className="mt-2">
                              <span
                                className="fw-bold"
                                style={{ fontSize: "17.5px", color: "#dc1111" }}
                              >
                                12.000.000₫
                              </span>
                            </div>
                            <div className="ms-4">
                              <Button
                                className="rounded-2 ms-4 bg-primary"
                                type="primary"
                                style={{
                                  height: "40px",
                                  width: "auto",
                                  fontSize: "14px",
                                }}
                              >
                                <span
                                  className=""
                                  style={{
                                    fontWeight: "550",
                                    marginBottom: "2px",
                                  }}
                                >
                                  Thay Đổi
                                </span>
                              </Button>
                              <Button
                                className="rounded-2 ms-3"
                                type="primary"
                                style={{
                                  height: "40px",
                                  width: "auto",
                                  fontSize: "14px",
                                  backgroundColor: "#dc3333",
                                }}
                              >
                                <span
                                  className=""
                                  style={{
                                    fontWeight: "550",
                                    marginBottom: "2px",
                                  }}
                                >
                                  Xóa
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex mt-1">
                          <span
                            className=""
                            style={{ fontSize: "15px", color: "#666" }}
                          >
                            Số lượng: x1
                          </span>
                        </div>
                      </div>
                      <div className="d-flex" style={{ height: "28px" }}></div>
                      <div className="d-flex justify-content-between">
                        <div
                          className="wrap-item-price"
                          style={{ width: "70px" }}
                        >
                          <span
                            className="item-price"
                            style={{
                              fontSize: "16px",
                              color: "#dc1111",
                              fontWeight: "550",
                            }}
                          >
                            {l.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr
                    className="mx-auto"
                    style={{ borderWidth: "2px", width: "96%" }}
                  />
                </Col>
              ))}
            </div>
          </Row>
        </div>

        <div className="me-4 d-flex">
          <Button
            className="rounded-2 ms-4 bg-primary"
            type="primary"
            style={{ height: "50px", width: "auto", fontSize: "16px" }}
          >
            <span
              className=""
              style={{ fontWeight: "550", marginBottom: "2px" }}
            >
              Thêm Sản Phẩm
            </span>
          </Button>
          <div
            style={{
              backgroundColor: "whitesmoke",
              height: "auto",
              width: "400px",
            }}
            className="rounded-2 ms-auto wrap-total-money"
          >
            <div className="p-4">
              <div className="d-flex justify-content-between">
                <span className="" style={{ fontSize: "15px", color: "#777" }}>
                  Tổng Tiền Hàng
                </span>
                <span
                  className="fw-bold text-dark"
                  style={{ fontSize: "16px" }}
                >
                  12.190.000 ₫
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "15px", color: "#777" }}>
                  Giảm Giá
                </span>
                <span
                  className="fw-bold text-dark"
                  style={{ fontSize: "16px" }}
                >
                  -190.000 ₫
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "15px", color: "#777" }}>
                  Phí Vận Chuyển
                </span>
                <span
                  className="fw-bold text-dark"
                  style={{ fontSize: "16px" }}
                >
                  30.000 ₫
                </span>
              </div>
              <hr
                className=""
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: "#333",
                }}
              />
              <div className="d-flex justify-content-between mt-4">
                <span
                  className="fw-bold text-dark"
                  style={{ fontSize: "18px", color: "#777" }}
                >
                  Tổng cộng
                </span>
                <span
                  className="fw-bold"
                  style={{ fontSize: "18px", color: "#dc1111" }}
                >
                  {order &&
                    order.tongTien &&
                    order.tongTien.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "30px" }}></div>
      </div>

      <div className="mt-5"></div>
    </>
  );
};
export default OrderDetail;
