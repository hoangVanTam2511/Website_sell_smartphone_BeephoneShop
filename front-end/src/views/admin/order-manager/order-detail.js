import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Row, Col } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Table } from "antd";
import axios from "axios";
import { FaTruck, FaRegCalendarCheck, FaRegFileAlt, FaRegCalendarTimes, FaBusinessTime } from "react-icons/fa";
import { Table as TableMui, Tooltip, Zoom } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingIndicator from '../../../utilities/loading';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Card from "../../../components/Card";
import styleCss from "./style.css";
import { format } from "date-fns";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import {
  UpdateRecipientOrderDialog,
  PaymentDialog,
  OrderHistoryDialog,
  ConfirmDialog,
} from "./AlertDialogSlide.js";
import { OrderStatusString, OrderTypeString, Notistack } from './enum';
import useCustomSnackbar from '../../../utilities/notistack';

const OrderDetail = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [alert, setAlert] = useState({});

  const [isDone, setIsDone] = useState(false);
  const [order, setOrder] = useState({});
  const [orderHistories, setOrderHistories] = useState([]);
  const [status, setStatus] = useState();
  const [paymentHistorys, setPaymentHistorys] = useState([]);
  const { id } = useParams();
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const getOrderItemsById = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/orders/${id}`)
      .then((response) => {
        setOrder(response.data.data);
        setOrderHistories(response.data.data.orderHistories);
        setPaymentHistorys(response.data.data.paymentMethods)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getOrderItemsById();
  }, []);

  const totalItem = (amount, price) => {
    return amount * price;
  }

  const totalOrder = (total, discount, feeShip) => {
    return total - discount + feeShip;
  }

  const IconTrash = () => {
    return (
      <>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z" fill="currentColor" />
        </svg>
      </>
    )
  }

  const updateStatusOrderDelivery = async (orderRequest) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}`, orderRequest, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          isUpdateStatusOrderDelivery: true,
        }
      }).then((response) => {
        getOrderItemsById();
        setIsLoading(false);
        handleOpenAlertVariant("Xác nhận thành công", "success");
      })
    } catch (error) {
      const message = error.response.data.message;
      setIsLoading(false);
      handleOpenAlertVariant(message, Notistack.ERROR);
      console.log(error.response.data)
    }
  };

  const handlePaymentOrder = () => {

  }

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
          <span className="text-center" style={{ fontWeight: "" }}>{
            item.loaiThaoTac == 0
              ?
              <>
                <FaRegFileAlt color="#09a129" size={"40px"} style={{ marginBottom: "5px" }} />
                <span className="ms-4">{item.thaoTac}</span>
              </>
              : item.loaiThaoTac == 1
                ?
                <>
                  <FaRegFileAlt color="#09a129" size={"40px"} style={{ marginBottom: "5px" }} />
                  <span className="ms-4">{item.thaoTac}</span>
                </>
                : item.loaiThaoTac == 2
                  ?
                  <>
                    <FaBusinessTime color="#ffd500" size={"40px"} style={{ marginBottom: "5px" }} />
                    <span className="ms-4">{item.thaoTac}</span>
                  </>
                  : item.loaiThaoTac == 3
                    ?
                    <>
                      <FaTruck color="#09a129" size={"40px"} style={{ marginBottom: "5px" }} />
                      <span className="ms-4">{item.thaoTac}</span>
                    </>
                    : item.loaiThaoTac == 4
                      ?
                      <>
                        <FaRegCalendarCheck color="#09a129" size={"40px"} style={{ marginBottom: "5px" }} />
                        <span className="ms-4">{item.thaoTac}</span>
                      </>
                      : item.loaiThaoTac == 5
                        ?
                        <>
                          <FaRegCalendarTimes color="#e5383b" size={"40px"} style={{ marginBottom: "5px" }} />
                          <span className="ms-4">{item.thaoTac}</span>
                        </>
                        : item.loaiThaoTac == 6
                          ?
                          <>
                            <FaRegCalendarCheck color="#09a129" size={"40px"} style={{ marginBottom: "5px" }} />
                            <span className="ms-4">{item.thaoTac}</span>
                          </>
                          : ""
          }</span>
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
        <span style={{ fontWeight: "500" }}>{record.ma}</span>
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
        record.hinhThucThanhToan == 0 ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "140px",
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
      title: "Số Tiền",
      align: "center",
      dataIndex: "soTienThanhToan",
      width: "10%",
      render: (text, record) => (
        <span
          className="txt-danger"
          style={{ fontSize: "17px" }}
        >
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
    const data = {
      trangThai: OrderStatusString.CANCELLED,
      orderHistory: {
        createdAt: new Date(),
        createdBy: "",
        thaoTac: "Đã Hủy Đơn",
        loaiThaoTac: 5,
        moTa: description || "",
        hoaDon: {
          id: order.id
        }
      }
    }
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
          id: order.id
        }
      }
    }
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
          id: order.id
        }
      }
    }
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
          id: order.id
        }
      }
    }
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
          id: order.id
        }
      },
    }
    updateStatusOrderDelivery(data);
    setOpenCommon(false);
  };
  const handleOpenDialogConfirmOrder = (status, isCancel) => {
    if (isCancel) {
      setStatus(OrderStatusString.CANCELLED);
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

  const StyledTableContainer = styled(TableContainer)({
    boxShadow: 'none',
  });

  const StyledTableHead = styled(TableHead)`
  & tr:hover th{
    background-color: white !important;
  }
`;

  const StyledTableBody = styled(TableBody)`
  & tr:hover td{
    background-color: white !important;
  }
`;


  const useStyles = () => ({
  });

  const classes = useStyles();

  const TimeLine = () => {
    return (
      <div className="time-line">
        <Timeline minEvents={orderHistories && 5 + orderHistories.length} placeholder>
          {orderHistories && orderHistories.map((item, index) => (
            <TimelineEvent
              icon={
                item.loaiThaoTac == 0
                  ? FaRegFileAlt
                  : item.loaiThaoTac == 1
                    ? FaRegFileAlt
                    : item.loaiThaoTac == 2
                      ?
                      FaBusinessTime
                      : item.loaiThaoTac == 3
                        ? FaTruck
                        : item.loaiThaoTac == 4
                          ? FaRegCalendarCheck
                          : item.loaiThaoTac == 5
                            ? FaRegCalendarTimes
                            : item.loaiThaoTac == 6
                              ? FaRegCalendarCheck
                              : ""
              }
              title={
                <div className="mt-1">
                  <span
                    style={{ whiteSpace: "pre-line", fontSize: "19px" }}
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
                              : ""
              }
            />
          ))}
        </Timeline>
      </div>

    )
  }

  const ProcessOrder = () => {
    return (
      <div className="d-flex justify-content-between mt-2 p-3">
        <div className="d-flex order-info">
          {order.trangThai == OrderStatusString.PENDING_CONFIRM && order.loaiHoaDon == OrderTypeString.DELIVERY ? (
            <div>
              <Button
                onClick={() => handleOpenDialogConfirmOrder(order.trangThai, false)}
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
          )
            : order.trangThai == OrderStatusString.CONFIRMED && order.loaiHoaDon == OrderTypeString.DELIVERY ? (
              <div>
                <Button
                  onClick={() => handleOpenDialogConfirmOrder(order.trangThai, false)}
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
            )
              : order.trangThai == OrderStatusString.PREPARING && order.loaiHoaDon == OrderTypeString.DELIVERY ? (
                <div>
                  <Button
                    onClick={() => handleOpenDialogConfirmOrder(order.trangThai, false)}
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
              )
                : isDone == true && order.trangThai == OrderStatusString.DELIVERING && order.loaiHoaDon == OrderTypeString.DELIVERY ? (
                  <div>
                    <Button
                      onClick={() => handleOpenDialogConfirmOrder(order.trangThai, false)}
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
                        ĐÃ GIAO HÀNG
                      </span>
                    </Button>
                  </div>
                ) : (
                  ""
                )}
          {order.trangThai != OrderStatusString.CANCELLED && order.trangThai != OrderStatusString.SUCCESS_DELIVERY && order.loaiHoaDon == OrderTypeString.DELIVERY ? (
            <div className="ms-1">
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

    )
  }

  const OrderInfo = () => {
    return (

      <div className="wrap-order-detail mt-4" style={{ height: order.loaiHoaDon === OrderTypeString.AT_COUNTER ? "340px" : "480px" }}>
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <div className="ms-2" style={{ marginTop: "3px" }}>
              <span className='' style={{ fontSize: "25px" }}>THÔNG TIN ĐƠN HÀNG</span>
            </div>
            <div className="">
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
            </div>
          </div>
          <div className='ms-2 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "99.2%", borderWidth: "2px" }}></div>
        </div>

        <Row>
          <Col sm="5">
            <div className="ms-4 mt-3 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span className="" style={{ fontSize: "17px" }}>Mã Đơn Hàng</span>
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
                )

                  : order.trangThai == OrderStatusString.CONFIRMED ? (
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
                  )

                    : order.trangThai == OrderStatusString.PREPARING ? (
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
                    )
                      : order.trangThai == OrderStatusString.DELIVERING ? (
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
                      )
                        : order.trangThai == OrderStatusString.HAD_PAID ?
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
                          </div> : ""

                }
              </div>
            </div>
            <div className="ms-4 mt-4 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>
                  {order.loaiHoaDon === OrderTypeString.AT_COUNTER ? "Ngày Tạo" : "Ngày Đặt Hàng"}</span>
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
            {order.loaiHoaDon === OrderTypeString.DELIVERY ?
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
              : ""}
            {order.loaiHoaDon === OrderTypeString.DELIVERY ?
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
              : ""}
          </Col>
          <Col sm="6" className="ms-5">
            <div className="ms-4 mt-3 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Tên Khách Hàng</span>
              </div>
              <div className="ms-5 ps-5">
                {order.tenNguoiNhan == null ?
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
                      Khách hàng lẻ
                    </span>
                  </div>
                  : order.tenNguoiNhan
                }
              </div>
            </div>
            <div className="ms-4 mt-4 mt-1 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Số Điện Thoại</span>
              </div>
              <div className="ms-5 ps-5 mt-1">
                <span className="text-dark ms-1" style={{ fontSize: "17px" }}>
                  {order.soDienThoaiNguoiNhan == null ? "..." : order.soDienThoaiNguoiNhan}
                </span>
              </div>
            </div>
            <div className="ms-4 mt-4 mt-1 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Email</span>
              </div>
              <div className="ms-5 ps-5 mt-1">
                <span className="text-dark ms-1" style={{ fontSize: "17px" }}>
                  {order.account === null ? "..." : order && order.account && order.account.email}
                </span>
              </div>
            </div>
            <div className="ms-4 mt-4 mt-1 d-flex" style={{ height: "30px" }}>
              <div className="ms-2 mt-1" style={{ width: "140px" }}>
                <span style={{ fontSize: "17px" }}>Địa Chỉ Nhận</span>
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
            {order.loaiHoaDon === OrderTypeString.DELIVERY ?
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
              : ""}
            {order.loaiHoaDon === OrderTypeString.DELIVERY ?
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
              : ""}
          </Col>
        </Row>
      </div>

    )
  }

  const PaymentHistories = () => {
    return (

      <div className="wrap-payment mt-4 p-3">
        <div className="">
          <div className="d-flex justify-content-between">
            <div className="ms-2" style={{ marginTop: "3px" }}>
              <span className='' style={{ fontSize: "25px" }}>LỊCH SỬ THANH TOÁN</span>
            </div>
            <div className="">
              <Button
                onClick={handleClickOpenDialogPayment}
                className="rounded-2 ms-2"
                type="primary"
                style={{
                  height: "40px",
                  fontSize: "16px",
                  width: "120px",
                }}
              >
                <span
                  className=""
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  Thanh toán
                </span>
              </Button>
            </div>
          </div>
          <div className='ms-2 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "99.2%", borderWidth: "2px" }}></div>

        </div>
        <div className="mt-3">
          {paymentHistorys.length <= 0 ? (
            <EmptyData />
          ) : (
            <>
              <Table
                className="scroll-container1"
                columns={columns}
                dataSource={paymentHistorys}
                pagination={false}
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
            </>
          )}
        </div>
      </div>
    )
  }

  const OrderSummary = () => {
    return (
      <div className="wrap-order-summary mt-4 p-3">
        <div className="">
          <div className="d-flex justify-content-between">
            <div className="ms-2" style={{ marginTop: "3px" }}>
              <span className='' style={{ fontSize: "25px" }}>DANH SÁCH SẢN PHẨM</span>
            </div>
            <div className="">
              <Button
                // onClick={handleOpenDialogProducts}
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
            </div>
          </div>
          <div className='ms-2 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "99.2%", borderWidth: "2px" }}></div>
        </div>

        <div className="wrap-cart-order" style={{ height: "auto" }}>
          <Row className="">
            <div className="">
              <div className='' style={{ height: "auto" }}>
                <StyledTableContainer component={Paper}>
                  <TableMui sx={{ minWidth: 650, boxShadow: "none" }} aria-label="simple table" className={classes.tableContainer}>
                    <StyledTableHead>
                      <TableRow>
                        <TableCell align="center">Ảnh</TableCell>
                        <TableCell align="center">Sản Phẩm</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Thành tiền</TableCell>
                        <TableCell align="center">Thao Tác</TableCell>
                      </TableRow>
                    </StyledTableHead>
                    <StyledTableBody>
                      {order && order.orderItems && order.orderItems.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align='center'>
                            <img src={item && item.sanPhamChiTiet.image.path} class='' alt="" style={{ width: "155px", height: "155px" }} />
                          </TableCell>
                          <TableCell align="center" style={{ width: "350px" }}>
                            <div>
                              <span className='' style={{ whiteSpace: "pre-line", fontSize: "18px" }}>{item.sanPhamChiTiet.sanPham.tenSanPham}</span>
                            </div>
                            <div className='mt-2'>
                              <span style={{ color: "#dc1111", fontSize: "17px" }}>
                                {item && item.donGia ? item.donGia.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }) : ""}
                              </span>
                            </div>
                            <div className='mt-2 pt-1 d-flex justify-content-around mx-auto'>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <RadioGroup orientation='horizontal'
                                aria-labelledby="storage-label"
                                size="lg"
                                sx={{ gap: 1.7 }}
                              >
                                <Sheet
                                  sx={{
                                    borderRadius: 'md',
                                    boxShadow: 'sm',
                                  }}
                                >
                                  <Radio disabled
                                    label={
                                      <>
                                        <div>
                                          <span className="p-2" style={{ fontSize: "15px", fontWeight: "500" }}>{item.sanPhamChiTiet.ram.dungLuong + "/" + item.sanPhamChiTiet.rom.dungLuong + "GB"}</span>
                                        </div>
                                      </>
                                    }
                                    overlay
                                    disableIcon
                                    slotProps={{
                                      label: ({ checked }) => ({
                                        sx: {
                                          fontWeight: 'lg',
                                          fontSize: 'md',
                                          color: checked ? 'text.primary' : 'text.secondary',
                                        },
                                      }),
                                      action: ({ checked }) => ({
                                        sx: (theme) => ({
                                          ...(checked && {
                                            '--variant-borderWidth': '2px',
                                            '&&': {
                                              // && to increase the specificity to win the base :hover styles
                                              borderColor: "#2f80ed",
                                            },
                                          }),
                                        }),
                                      }),
                                    }}
                                  />
                                </Sheet>
                              </RadioGroup>
                              <RadioGroup orientation='horizontal' className="ms-2"
                                aria-labelledby="storage-label"
                                size="lg"
                                sx={{ gap: 1.7 }}
                              >
                                <Sheet
                                  sx={{
                                    borderRadius: 'md',
                                    boxShadow: 'sm',
                                  }}
                                >
                                  <Radio disabled
                                    label={
                                      <>
                                        <div className="">
                                          <span className="p-2" style={{ fontSize: "15px", fontWeight: "500" }}>{item.sanPhamChiTiet.mauSac.tenMauSac}</span>
                                        </div>
                                      </>
                                    }
                                    overlay
                                    disableIcon
                                    slotProps={{
                                      label: ({ checked }) => ({
                                        sx: {
                                          fontWeight: 'lg',
                                          fontSize: 'md',
                                          color: checked ? 'text.primary' : 'text.secondary',
                                        },
                                      }),
                                      action: ({ checked }) => ({
                                        sx: (theme) => ({
                                          ...(checked && {
                                            '--variant-borderWidth': '2px',
                                            '&&': {
                                              // && to increase the specificity to win the base :hover styles
                                              borderColor: "#2f80ed",
                                            },
                                          }),
                                        }),
                                      }),
                                    }}
                                  />
                                </Sheet>
                              </RadioGroup>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ fontSize: "15px" }}>
                            <div className="ms-5">
                              <RadioGroup orientation='horizontal'
                                aria-labelledby="storage-label"
                                size="lg"
                                sx={{ gap: 1.7 }}
                              >
                                <Sheet
                                  sx={{
                                    borderRadius: 'md',
                                    boxShadow: 'sm',
                                  }}
                                >
                                  <Radio disabled
                                    label={
                                      <>
                                        <div>
                                          <span className="p-2" style={{ fontSize: "15px", fontWeight: "500" }}>{"x" + item.soLuong}</span>
                                        </div>
                                      </>
                                    }
                                    overlay
                                    disableIcon
                                    slotProps={{
                                      label: ({ checked }) => ({
                                        sx: {
                                          fontWeight: 'lg',
                                          fontSize: 'md',
                                          color: checked ? 'text.primary' : 'text.secondary',
                                        },
                                      }),
                                      action: ({ checked }) => ({
                                        sx: (theme) => ({
                                          ...(checked && {
                                            '--variant-borderWidth': '2px',
                                            '&&': {
                                              // && to increase the specificity to win the base :hover styles
                                              borderColor: "#2f80ed",
                                            },
                                          }),
                                        }),
                                      }),
                                    }}
                                  />
                                </Sheet>
                              </RadioGroup>
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{ color: "#dc1111", fontSize: "15px" }}>
                            <span style={{ color: "#dc1111", fontSize: "17.5px" }}>
                              {item && totalItem(item.soLuong, item.donGia).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </TableCell>
                          <TableCell align="center" className=''>
                            <Tooltip TransitionComponent={Zoom} title="Cập nhật">
                              <Button className=''
                                icon={
                                  <EditIcon />
                                }
                                // onClick={() => openDialogProductDetails()}
                                type="primary"
                                style={{ fontSize: "13px", height: "32.5px" }}
                              >
                              </Button>

                            </Tooltip>
                            <Tooltip TransitionComponent={Zoom} title="Xóa khỏi giỏ hàng">
                              <Button className='ms-2'
                                // onClick={() => removeProductInCart(item.id)}
                                icon={
                                  <IconTrash />
                                }
                                type="danger"
                                style={{ fontSize: "13px", height: "32.5px" }}
                              >
                              </Button>


                            </Tooltip>

                          </TableCell>
                        </TableRow>
                      ))}
                    </StyledTableBody>
                  </TableMui>
                </StyledTableContainer>
              </div>
            </div>
          </Row>
        </div>

        <div className='ms-2 mt-2' style={{ borderBottom: "2px solid #C7C7C7", width: "99.2%", borderWidth: "2px" }}></div>
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
                <span
                  className="text-dark"
                  style={{ fontSize: "17px" }}
                >
                  {order && order.tongTien && order.tongTien.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="" style={{ fontSize: "16px", color: "" }}>
                  Giảm giá
                </span>
                <span
                  className="text-dark"
                  style={{ fontSize: "17px" }}
                >
                  {order && order.voucher && order.voucher.giaTriVoucher && order.voucher.giaTriVoucher.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }) || "Không"}
                </span>
              </div>
              {order.loaiHoaDon === OrderTypeString.AT_COUNTER ?
                <>
                  <div className="d-flex justify-content-between mt-3">
                    <span className="" style={{ fontSize: "16px", color: "" }}>
                      Khách cần trả
                    </span>
                    <span
                      className="text-dark"
                      style={{ fontSize: "17px" }}
                    >
                      {order && order.tongTienSauKhiGiam && order.tongTienSauKhiGiam.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <span className="" style={{ fontSize: "16px", fontWeight: "500" }}>
                      Khách thanh toán
                    </span>
                    <span
                      className="fw-bold"
                      style={{ fontSize: "17px", color: "#dc1111" }}
                    >
                      {order && order.tienKhachTra && order.tienKhachTra.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </> :
                <>
                  <div className="d-flex justify-content-between mt-3">
                    <span className="" style={{ fontSize: "16px", color: "" }}>
                      Phí vận chuyển
                    </span>
                    <span
                      className="text-dark"
                      style={{ fontSize: "17px" }}
                    >
                      {order && order.phiShip && order.phiShip.toLocaleString("vi-VN", {
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
                        totalOrder(order.tongTien, order.voucher && order.voucher.giaTriVoucher, order.phiShip).toLocaleString("vi-VN", {
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
                      style={{ fontSize: "17px", color: order.tienKhachTra && "#dc1111" || "#2f80ed" }}
                    >
                      {order && order.tienKhachTra && order.tienKhachTra.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }) || "Chưa thanh toán"}
                    </span>
                  </div>
                </>
              }
              {order.tienThua !== 0 ?
                <div className="d-flex justify-content-between mt-3">
                  <span className="" style={{ fontSize: "16px", color: "" }}>
                    Tiền thừa trả khách
                  </span>
                  <span
                    className="text-dark"
                    style={{ fontSize: "17px" }}
                  >
                    {order && order.tienThua && order.tienThua.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                : ""}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
      />

      {isLoading && <LoadingIndicator />}
      <div className="mt-4"></div>
    </>
  );
};
export default OrderDetail;
