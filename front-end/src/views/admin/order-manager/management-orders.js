import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Table } from "antd";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Zoom from "@mui/material/Zoom";
import * as dayjs from "dayjs";
import { OrderStatusString, OrderTypeString } from "./enum";
import LoadingIndicator from "../../../utilities/loading";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import moment from "moment";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const ManagementOrders = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );
  const [fromDate, setFromDate] = useState(searchParams.get("fromDate"));
  const [toDate, setToDate] = useState(searchParams.get("toDate"));
  const [state, setState] = useState(searchParams.get("state"));
  const [type, setType] = useState(searchParams.get("type"));
  const [sort, setSort] = useState(searchParams.get("sort"));
  const [changeOfRealtime, setChangeOfRealtime] = useState("");
  var stompClient = null;

  //connnect
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/bill/bills", onMessageReceived);
  };

  const onMessageReceived = (payload) => {
    var data = JSON.parse(payload.body);
    setChangeOfRealtime(data.name);
  };

  const onError = (err) => {
    console.log(err);
  };

  const findOrdersByMultipleCriteriaWithPagination = (page) => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          currentPage: page,
          keyword: keyword,
          fromDate: fromDate,
          toDate: toDate,
          isPending: false,
        },
      })
      .then((response) => {
        setOrders(response.data.data);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
        console.log(response.data.data);
        // localStorage.setItem('orders', response.data.content);
        // localStorage.setItem('totalPages', response.data.totalPages);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (stompClient === null) {
      connect();
    }
    setIsLoading(true);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      findOrdersByMultipleCriteriaWithPagination(currentPage);
    } else {
      findOrdersByMultipleCriteriaWithPagination(currentPage);
    }
  }, [fromDate, toDate, keyword, currentPage, changeOfRealtime]);

  // const isMounted = useRef(false);
  // useEffect(() => {
  //   if (!isMounted.current) {
  //     isMounted.current = true;
  //     setIsLoading(true);
  //     findOrdersByMultipleCriteriaWithPagination(currentPage);
  //   }
  // }, [])

  const handleRefreshData = () => {
    navigate(`/dashboard/management-orders`);
    setRefreshPage(refreshPage + 1);
    setKeyword("");
    setFromDate(null);
    setToDate(null);
    setCurrentPage(1);
    // findOrdersByMultipleCriteriaWithPagination(1);
    // handleRemoveStorage();
  };

  const handleRemoveStorage = () => {
    localStorage.clear();
  };

  const handleSetParamsDate = () => {
    const fromDateParam = searchParams.get("fromDate");
    const toDateParam = searchParams.get("toDate");

    if (fromDateParam && toDateParam) {
      searchParams.delete("fromDate");
      searchParams.delete("toDate");
      setSearchParams(searchParams);

      searchParams.set("fromDate", fromDateParam);
      searchParams.set("toDate", toDateParam);
      setSearchParams(searchParams);
    }
  };

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setKeyword(value);
    setCurrentPage(1);
    searchParams.delete("currentPage");
    setSearchParams(searchParams);
    // localStorage.setItem('keyword', value);
    // localStorage.removeItem('currentPage');
  };

  const handleGetToDateFromDatePicker = (newDate) => {
    const value = newDate.format("DD-MM-YYYY");
    setToDate(value);
    searchParams.set("toDate", newDate.format("DD-MM-YYYY"));
    searchParams.delete("currentPage");
    setSearchParams(searchParams);
    handleSetParamsDate();
    setCurrentPage(1);
    // localStorage.setItem('toDate', value);
    // localStorage.removeItem('currentPage');
  };

  const handleGetFromDateFromDatePicker = (newDate) => {
    const value = newDate.format("DD-MM-YYYY");
    setFromDate(value);
    searchParams.set("fromDate", newDate.format("DD-MM-YYYY"));
    searchParams.delete("currentPage");
    setSearchParams(searchParams);
    handleSetParamsDate();
    setCurrentPage(1);
    // localStorage.setItem('fromDate', value);
    // localStorage.removeItem('currentPage');
  };

  const handlePageChange = (event, page) => {
    setIsLoading(true);
    setCurrentPage(page);
    searchParams.set("currentPage", page);
    setSearchParams(searchParams);
    // localStorage.setItem('currentPage', page);
  };

  const handleCreateNewOrderPending = () => {
    navigate(`/dashboard/point-of-sales`);
  };

  const [open, setOpen] = useState(false);
  const handleCloseNoAction = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>{orders.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Mã Đơn Hàng",
      align: "center",
      key: "ma",
      width: "10%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "500" }}>{record.ma}</span>
      ),
    },
    {
      title: "Khách Hàng",
      align: "center",
      dataIndex: "tenNguoiNhan",
      width: "10%",
      render: (text, order) =>
        order.account === null &&
        order.loaiHoaDon === OrderTypeString.AT_COUNTER ? (
          <div
            className="rounded-pill mx-auto"
            style={{
              height: "35px",
              width: "130px",
              padding: "4px",
              backgroundColor: "#e1e1e1",
            }}
          >
            <span className="text-dark mt-1" style={{ fontSize: "14px" }}>
              Khách hàng lẻ
            </span>
          </div>
        ) : order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
          order.account &&
          order.account.hoVaTen ? (
          order.account.hoVaTen
        ) : (
          order.tenNguoiNhan
        ),
    },
    {
      title: "Số Điện Thoại",
      align: "center",
      dataIndex: "soDienThoaiNguoiNhan",
      render: (text, order) => (
        <span style={{ fontWeight: "400" }}>
          {order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
          order.account === null
            ? "..."
            : order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
              order.account &&
              order.account.soDienThoai
            ? order.account.soDienThoai
            : order.soDienThoaiNguoiNhan}
        </span>
      ),
    },
    {
      title: "Loại Đơn Hàng",
      align: "center",
      width: "15%",
      dataIndex: "loaiHoaDon",
      render: (type) =>
        type == OrderTypeString.DELIVERY ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "96px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Giao hàng
            </span>
          </div>
        ) : type == OrderTypeString.AT_COUNTER ? (
          <div
            className="rounded-pill badge-primary mx-auto"
            style={{ height: "35px", width: "91px", padding: "4px" }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Tại quầy
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Trạng Thái",
      align: "center",
      width: "15%",
      dataIndex: "trangThai",
      render: (status) => {
        return status == OrderStatusString.PENDING_CONFIRM ? (
          <div
            className="rounded-pill badge-warning"
            style={{
              height: "35px",
              padding: "4px",
              width: "auto",
            }}
          >
            <span
              className="text-dark"
              style={{ fontSize: "14px", padding: "13px" }}
            >
              Đang chờ xác nhận
            </span>
          </div>
        ) : status == OrderStatusString.CONFIRMED ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "115px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Đã xác nhận
            </span>
          </div>
        ) : status == OrderStatusString.PREPARING ? (
          <div
            className="rounded-pill mx-auto badge-warning"
            style={{
              height: "35px",
              width: "150px",
              padding: "4px",
            }}
          >
            <span className="text-dark" style={{ fontSize: "14px" }}>
              Đang chuẩn bị hàng
            </span>
          </div>
        ) : status == OrderStatusString.DELIVERING ? (
          <div
            className="rounded-pill mx-auto badge-primary"
            style={{
              height: "35px",
              width: "135px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Đang giao hàng
            </span>
          </div>
        ) : status == OrderStatusString.SUCCESS_DELIVERY ? (
          <div
            className="rounded-pill mx-auto badge-primary"
            style={{
              height: "35px",
              width: "115px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Hoàn thành
            </span>
          </div>
        ) : status == OrderStatusString.CANCELLED ? (
          <div
            className="rounded-pill mx-auto badge-danger"
            style={{
              height: "35px",
              width: "90px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Đã hủy
            </span>
          </div>
        ) : status == OrderStatusString.HAD_PAID ? (
          <div
            className="rounded-pill mx-auto badge-primary"
            style={{
              height: "35px",
              width: "115px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Hoàn thành
            </span>
          </div>
        ) : (
          ""
        );
      },
    },
    {
      title: "Tổng Tiền",
      align: "center",
      dataIndex: "tongTien",
      width: "15%",
      render: (text, record) => (
        <span className="txt-danger" style={{ fontWeight: "500" }}>
          {record &&
            record.tongTien &&
            record.tongTien.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </span>
      ),
    },
    {
      title: "Ngày Tạo",
      align: "center",
      dataIndex: "createdAt",
      width: "5%",
      render: (text, record) => (
        <span style={{ fontWeight: "", whiteSpace: "pre-line" }}>
          {record &&
            record.createdAt &&
            format(new Date(record.createdAt), "HH:mm:ss, dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <div className="button-container">
          <Link className="ms-1" to={`/dashboard/order-detail/${record.ma}`}>
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton size="">
                <BorderColorOutlinedIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      ),
    },
  ];

  const OrderTable = () => {
    return (
      <>
        <Table
          className="table-container mt-2"
          columns={columns}
          rowKey="ma"
          dataSource={orders}
          pagination={false}
          locale={{ emptyText: <EmptyData /> }}
        />
      </>
    );
  };

  const EmptyData = () => {
    return (
      <>
        <div className="p-3">
          <h4>Không có dữ liệu!</h4>
        </div>
      </>
    );
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
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                label="Tìm đơn hàng"
                onChange={handleGetValueFromInputTextField}
                value={keyword}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "190px",
                  },
                }}
                size="small"
                className=""
              />
              <Button
                onClick={handleRefreshData}
                className="rounded-2 ms-2"
                type="warning"
                style={{ width: "100px", fontSize: "15px" }}
              >
                <span
                  className="text-dark"
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  Làm Mới
                </span>
              </Button>
            </div>
            <div className="d-flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Từ ngày"
                    slotProps={{ textField: { size: "small" } }}
                    value={fromDate ? dayjs(fromDate, "DD/MM/YYYY") : null}
                    format="DD/MM/YYYY"
                    onChange={(value) => handleGetFromDateFromDatePicker(value)}
                    sx={{
                      position: "relative",
                      width: "50px",
                      "& .MuiInputBase-root": {
                        width: "85%",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    onChange={(value) => handleGetToDateFromDatePicker(value)}
                    slotProps={{ textField: { size: "small" } }}
                    label={"Đến ngày"}
                    value={toDate ? dayjs(toDate, "DD/MM/YYYY") : null}
                    format={"DD/MM/YYYY"}
                    sx={{
                      position: "relative",
                      width: "50px",
                      "& .MuiInputBase-root": {
                        width: "85%",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mt-2">
              <Button
                onClick={handleCreateNewOrderPending}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "150px", fontSize: "15px" }}
              >
                <PlusOutlined
                  className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "12.5px",
                    left: "12px",
                  }}
                />
                <span
                  className="ms-3 ps-1"
                  style={{ marginBottom: "3px", fontWeight: "500" }}
                >
                  Tạo đơn hàng
                </span>
              </Button>
            </div>
          </Card.Header>
          <div className="d-flex mt-4 pt-1 mx-auto">
            <div
              className="d-flex"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                // onClick={handleOpenSelect1}
                className=""
                style={{ marginTop: "8px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Trạng Thái:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  // open={openSelect1}
                  // onClose={handleCloseSelect1}
                  // onOpen={handleOpenSelect1}
                  defaultValue={14}
                >
                  <MenuItem className="" value={14}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={15}>Khách hàng mới</MenuItem>
                  <MenuItem value={20}>Khách hàng cũ</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="d-flex ms-3"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                // onClick={handleOpenSelect1}
                className=""
                style={{ marginTop: "8px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Loại Đơn Hàng:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  // open={openSelect1}
                  // onClose={handleCloseSelect1}
                  // onOpen={handleOpenSelect1}
                  defaultValue={14}
                >
                  <MenuItem className="" value={14}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={15}>Khách hàng mới</MenuItem>
                  <MenuItem value={20}>Khách hàng cũ</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="d-flex ms-3"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                // onClick={handleOpenSelect1}
                className=""
                style={{ marginTop: "8px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Sắp Xếp:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  // open={openSelect1}
                  // onClose={handleCloseSelect1}
                  // onOpen={handleOpenSelect1}
                  defaultValue={14}
                >
                  <MenuItem className="" value={14}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={15}>Khách hàng mới</MenuItem>
                  <MenuItem value={20}>Khách hàng cũ</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="d-flex ms-3"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                // onClick={handleOpenSelect1}
                className=""
                style={{ marginTop: "8px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Hiển Thị:{""}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  // open={openSelect1}
                  // onClose={handleCloseSelect1}
                  // onOpen={handleOpenSelect1}
                  defaultValue={14}
                >
                  <MenuItem className="" value={14}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={15}>Khách hàng mới</MenuItem>
                  <MenuItem value={20}>Khách hàng cũ</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Card.Body>
            <OrderTable />
          </Card.Body>
          <div className="mx-auto">
            <Pagination
              color="primary"
              page={parseInt(currentPage)}
              key={refreshPage}
              count={totalPages}
              onChange={handlePageChange}
            />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export default ManagementOrders;
