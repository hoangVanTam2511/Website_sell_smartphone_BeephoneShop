import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import {
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
import Zoom from "@mui/material/Zoom";
import { OrderStatusString, OrderTypeString } from "./enum";
import LoadingIndicator from "../../../utilities/loading";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { FaPencilAlt } from "react-icons/fa";
import * as dayjs from "dayjs";
import { request, requestParam } from "../../../store/helpers/axios_helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
  const [state, setState] = useState(searchParams.get("state") || 10);
  const [type, setType] = useState(searchParams.get("type") || 10);
  const [sort, setSort] = useState(searchParams.get("sort") || "default");
  const [size, setSize] = useState(searchParams.get("pageSize") || 10);
  const [changeOfRealtime, setChangeOfRealtime] = useState("");
  const [openSort, setOpenSort] = useState(false);
  const handleCloseOpenSort = () => {
    setOpenSort(false);
  };

  const handleOpenSort = () => {
    setOpenSort(true);
  };
  const [openPage, setOpenPage] = useState(false);
  const handleCloseOpenPage = () => {
    setOpenPage(false);
  };

  const handleOpenPage = () => {
    setOpenPage(true);
  };
  const [openType, setOpenType] = useState(false);
  const handleCloseOpenType = () => {
    setOpenType(false);
  };

  const handleOpenType = () => {
    setOpenType(true);
  };
  const [openStatus, setOpenStatus] = useState(false);
  const handleCloseOpenStatus = () => {
    setOpenStatus(false);
  };

  const handleOpenStatus = () => {
    setOpenStatus(true);
  };
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
    requestParam("GET", `/api/orders`, {
      currentPage: page,
      keyword: keyword,
      fromDate: fromDate,
      toDate: toDate,
      isPending: false,
      sort: sort,
      type: type,
      state: state,
      pageSize: size,
    })
      .then((response) => {
        setOrders(response.data.data);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.pageable.currentPage + 1);
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

  useEffect(() => {
    if (stompClient === null) {
      connect();
    }
    findOrdersByMultipleCriteriaWithPagination(currentPage);
  }, [
    fromDate,
    toDate,
    keyword,
    currentPage,
    type,
    sort,
    size,
    state,
    changeOfRealtime,
  ]);

  const handleRefreshData = () => {
    navigate(`/dashboard/management-orders`);
    setRefreshPage(refreshPage + 1);
    setKeyword("");
    setFromDate(null);
    setToDate(null);
    setCurrentPage(1);
    setSize(10);
    setSort("default");
    setType(10);
    setState(10);
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
    // setCurrentPage(1);
    // searchParams.delete("currentPage");
    setSearchParams(searchParams);
    // localStorage.setItem('keyword', value);
    // localStorage.removeItem('currentPage');
  };

  const handleGetToDateFromDatePicker = (newDate) => {
    const value = newDate.format("DD-MM-YYYY");
    setToDate(value);
    searchParams.set("toDate", newDate.format("DD-MM-YYYY"));
    // searchParams.delete("currentPage");
    setSearchParams(searchParams);
    handleSetParamsDate();
    // setCurrentPage(1);
    // localStorage.setItem('toDate', value);
    // localStorage.removeItem('currentPage');
  };

  const handleGetFromDateFromDatePicker = (newDate) => {
    const value = newDate.format("DD-MM-YYYY");
    setFromDate(value);
    searchParams.set("fromDate", newDate.format("DD-MM-YYYY"));
    // searchParams.delete("currentPage");
    setSearchParams(searchParams);
    handleSetParamsDate();
    // setCurrentPage(1);
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

  const orderSort = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>{record.stt}</span>
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
      width: "20%",
      render: (text, order) => (
        <span
          style={
            {
              whiteSpace: "pre-line"
            }
          }
        >
          {order.account === null &&
            order.loaiHoaDon === OrderTypeString.AT_COUNTER
            ? order.hoVaTen
            : order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
              order.account &&
              order.account.hoVaTen
              ? order.account.hoVaTen
              : order.tenNguoiNhan}
          {" - "}
          {order.loaiHoaDon === OrderTypeString.AT_COUNTER &&
            order.account === null
            ? order.soDienThoai
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
        (type == OrderTypeString.DELIVERY || type == OrderTypeString.CLIENT) ? (
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
              width: "125px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Chờ giao hàng
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
        ) : status === OrderStatusString.REFUND_A_PART ? (
          <div
            className="rounded-pill mx-auto badge-danger"
            style={{
              height: "35px",
              width: "150px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Hoàn trả 1 phần
            </span>
          </div>
        ) : status === OrderStatusString.REFUND_FULL ? (
          <div
            className="rounded-pill mx-auto badge-danger"
            style={{
              height: "35px",
              width: "150px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Hoàn trả toàn phần
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
      width: "15%",
      render: (text, record) => (
        <span className="txt-danger" style={{ fontWeight: "500" }}>
          {record &&
            record.khachCanTra &&
            record.khachCanTra.toLocaleString("vi-VN", {
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
          <Link className="" to={`/dashboard/order-detail/${record.ma}`}>
            <Tooltip title="Chi Tiết" TransitionComponent={Zoom}>
              <IconButton size="">
                <FaPencilAlt color="#2f80ed" />
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
          locale={{ emptyText: <Empty /> }}
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
                label="Tìm theo mã đơn hàng, tên, số điện thoại khách hàng"
                onChange={handleGetValueFromInputTextField}
                value={keyword}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    // textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "390px",
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
                onClick={handleOpenStatus}
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
                  maxWidth: 200,
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
                  open={openStatus}
                  onClose={handleCloseOpenStatus}
                  onOpen={handleOpenStatus}
                  defaultValue={10}
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    searchParams.set(
                      "orderStatus",
                      state === 0
                        ? OrderStatusString.PENDING_CONFIRM
                        : state === 1
                          ? OrderStatusString.CONFIRMED
                          : state === 3
                            ? OrderStatusString.DELIVERING
                            : state === 4
                              ? "COMPLETE"
                              : OrderStatusString.CANCELLED
                    );
                    setSearchParams(searchParams);
                  }}
                >
                  <MenuItem className="" value={10}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={0}>Chờ xác nhận</MenuItem>
                  <MenuItem value={1}>Chờ giao hàng</MenuItem>
                  <MenuItem value={3}>Đang giao hàng</MenuItem>
                  <MenuItem value={4}>Hoàn thành</MenuItem>
                  <MenuItem value={8}>Hoàn trả 1 phần</MenuItem>
                  <MenuItem value={9}>Hoàn trả toàn phần</MenuItem>
                  <MenuItem value={5}>Đã hủy</MenuItem>
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
                onClick={handleOpenType}
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
                  maxWidth: 200,
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
                  open={openType}
                  onClose={handleCloseOpenType}
                  onOpen={handleOpenType}
                  defaultValue={10}
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    searchParams.set(
                      "orderType",
                      type === 0
                        ? OrderTypeString.AT_COUNTER
                        : OrderTypeString.DELIVERY
                    );
                    setSearchParams(searchParams);
                  }}
                >
                  <MenuItem className="" value={10}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={0}>Tại quầy</MenuItem>
                  <MenuItem value={1}>Giao hàng</MenuItem>
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
                onClick={handleOpenSort}
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
                  maxWidth: 200,
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
                  open={openSort}
                  onClose={handleCloseOpenSort}
                  onOpen={handleOpenSort}
                  defaultValue={"default"}
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    searchParams.set("sortType", sort);
                    setSearchParams(searchParams);
                  }}
                >
                  <MenuItem className="" value={"default"}>
                    Mặc định
                  </MenuItem>
                  <MenuItem value={"desc"}>Cũ</MenuItem>
                  <MenuItem value={"asc"}>Mới</MenuItem>
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
                onClick={handleOpenPage}
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
                  maxWidth: 200,
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
                  open={openPage}
                  onClose={handleCloseOpenPage}
                  onOpen={handleOpenPage}
                  defaultValue={10}
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                    searchParams.set("pageSize", size);
                    setSearchParams(searchParams);
                  }}
                >
                  <MenuItem className="" value={10}>
                    10/Pages
                  </MenuItem>
                  <MenuItem value={20}>20/Pages</MenuItem>
                  <MenuItem value={50}>50/Pages</MenuItem>
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
