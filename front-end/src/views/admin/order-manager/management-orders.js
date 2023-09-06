import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Table } from "antd";
import { Pagination, TextField, } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from "dayjs";

const ManagementOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));
  const [currentPage, setCurrentPage] = useState(searchParams.get('currentPage') || 1);
  const [fromDate, setFromDate] = useState(searchParams.get('fromDate'));
  const [toDate, setToDate] = useState(searchParams.get('toDate'));
  const [state, setState] = useState(searchParams.get('state'));
  const [type, setType] = useState(searchParams.get('type'));
  const [sort, setSort] = useState(searchParams.get('sort'));

  const findOrdersByMultipleCriteriaWithPagination = (page) => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          currentPage: page,
          keyword: keyword,
          fromDate: fromDate,
          toDate: toDate,
          isPending: false,
        }
      })
      .then((response) => {
        setOrders(response.data.content);
        setTotalPages(response.data.totalPages);
        // localStorage.setItem('orders', response.data.content);
        // localStorage.setItem('totalPages', response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    // const savedToDate = localStorage.getItem('toDate');
    // const savedFromDate = localStorage.getItem('fromDate');
    // const savedKeyword = localStorage.getItem('keyword');
    // const savedCurrentPage = localStorage.getItem('currentPage');
    // const savedTotalPages = localStorage.getItem('totalPages');
    // const savedOrders = localStorage.getItem('orders');

    // if (savedToDate) {
    //   setToDate(savedToDate);
    // }
    // if (savedFromDate) {
    //   setFromDate(savedFromDate);
    // }
    // if (savedKeyword) {
    //   setKeyword(savedKeyword);
    // }
    // if (savedCurrentPage) {
    //   setCurrentPage(savedCurrentPage);
    // }
    // if (savedTotalPages) {
    //   setTotalPages(savedTotalPages);
    // }
    // if (savedOrders) {
    //   setOrders(savedOrders);
    // }

    findOrdersByMultipleCriteriaWithPagination(currentPage);
  }, [fromDate, toDate, keyword, currentPage]);

  const handleRefreshData = () => {
    navigate(`/dashboard/management-orders`);
    setRefreshPage(refreshPage + 1);
    setKeyword('');
    setFromDate(null);
    setToDate(null);
    setCurrentPage(1);
    // findOrdersByMultipleCriteriaWithPagination(1);
    // handleRemoveStorage();
  }

  const handleRemoveStorage = () => {
    localStorage.clear();
  }

  const handleSetParamsDate = () => {
    const fromDateParam = searchParams.get('fromDate');
    const toDateParam = searchParams.get('toDate');

    if (fromDateParam && toDateParam) {
      searchParams.delete('fromDate');
      searchParams.delete('toDate');
      setSearchParams(searchParams);

      searchParams.set('fromDate', fromDateParam);
      searchParams.set('toDate', toDateParam);
      setSearchParams(searchParams);
    }
  }

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setKeyword(value);
    setCurrentPage(1);
    searchParams.delete('currentPage');
    setSearchParams(searchParams);
    // localStorage.setItem('keyword', value);
    // localStorage.removeItem('currentPage');
  }

  const handleGetToDateFromDatePicker = (newDate) => {
    const value = newDate.format("DD/MM/YYYY");
    setToDate(value);
    searchParams.set('toDate', newDate.format("DD-MM-YYYY"));
    searchParams.delete('currentPage');
    setSearchParams(searchParams);
    handleSetParamsDate();
    setCurrentPage(1);
    // localStorage.setItem('toDate', value);
    // localStorage.removeItem('currentPage');
  }

  const handleGetFromDateFromDatePicker = (newDate) => {
    const value = newDate.format("DD/MM/YYYY");
    setFromDate(value);
    searchParams.set('fromDate', newDate.format("DD-MM-YYYY"));
    searchParams.delete('currentPage');
    setSearchParams(searchParams);
    handleSetParamsDate();
    setCurrentPage(1);
    // localStorage.setItem('fromDate', value);
    // localStorage.removeItem('currentPage');
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    searchParams.set('currentPage', page);
    setSearchParams(searchParams);
    // localStorage.setItem('currentPage', page);
  };

  const handleAdd = () => {
    alert("hello");
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
        <span style={{ fontWeight: "550" }}>{orders.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Mã Đơn Hàng",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "550" }}>{record.ma}</span>
      ),
    },
    {
      title: "Tên Khách Hàng",
      align: "center",
      dataIndex: "tenNguoiNhan",
      width: "15%",
      render: (text, record) =>
        record.tenNguoiNhan == null ? (
          <div
            className="rounded-pill mx-auto"
            style={{
              height: "38px",
              width: "90px",
              padding: "5px",
              backgroundColor: "#e1e1e1",
            }}
          >
            <span
              className="text-dark"
              style={{ fontSize: "14px" }}
            >
              Khách lẻ
            </span>
          </div>
        ) : (
          <span>{record.tenNguoiNhan}</span>
        ),
    },
    {
      title: "Số Điện Thoại",
      align: "center",
      dataIndex: "soDienThoaiNguoiNhan",
    },
    {
      title: "Loại Đơn Hàng",
      align: "center",
      width: "15%",
      dataIndex: "loaiHoaDon",
      render: (type) =>
        type == 1 ? (
          <div
            className="rounded-pill mx-auto bg-success"
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
              Giao hàng
            </span>
          </div>
        ) : type == 0 ? (
          <div
            className="rounded-pill bg-primary mx-auto"
            style={{ height: "38px", width: "100px", padding: "5px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
            >
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
        return status == 0 ? (
          <div
            className="rounded-pill"
            style={{
              backgroundColor: "#FAAD14",
              height: "38px",
              padding: "5px",
            }}
          >
            <span
              className="text-dark"
              style={{ fontSize: "14px", padding: "11px", fontWeight: "550" }}
            >
              Đang chờ xác nhận
            </span>
          </div>
        ) : status == 1 ? (
          <div
            className="rounded-pill mx-auto"
            style={{
              height: "38px",
              width: "115px",
              padding: "5px",
              backgroundColor: "#26A65B",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
            >
              Đã xác nhận
            </span>
          </div>
        ) : status == 2 ?
          <div
            className="rounded-pill mx-auto bg-primary"
            style={{
              height: "38px",
              width: "135px",
              padding: "5px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
            >
              Đang giao hàng
            </span>
          </div>
          : status == 3 ?
            <div
              className="rounded-pill mx-auto bg-primary"
              style={{
                height: "38px",
                width: "135px",
                padding: "5px",
              }}
            >
              <span
                className="text-white"
                style={{ fontSize: "14px", fontWeight: "550" }}
              >
                Đã hoàn thành
              </span>
            </div>
            : status == 4 ?
              <div
                className="rounded-pill mx-auto"
                style={{
                  height: "38px",
                  width: "85px",
                  padding: "5px",
                  backgroundColor: "#dc3333"
                }}
              >
                <span
                  className="text-white"
                  style={{ fontSize: "14px", fontWeight: "550" }}
                >
                  Đã hủy
                </span>
              </div>
              : status == 6 ?
                <div
                  className="rounded-pill mx-auto bg-success"
                  style={{
                    height: "38px",
                    width: "130px",
                    padding: "5px",
                  }}
                >
                  <span
                    className="text-white"
                    style={{ fontSize: "14px", fontWeight: "550" }}
                  >
                    Đã thanh toán
                  </span>
                </div>
                : ""
      },
    },
    {
      title: "Tổng Tiền",
      align: "center",
      dataIndex: "tongTien",
      width: "15%",
      render: (text, record) => (
        <span style={{ color: "#dc1111", fontWeight: "550" }}>
          {record.tongTien.toLocaleString("vi-VN", {
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
          {format(new Date(record.createdAt), "HH:mm:ss, dd/MM/yyyy")}
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
            <Button
              className="rounded-3"
              type="primary"
              style={{ height: "45px", width: "92px", fontSize: "14px", backgroundColor: "#FAAD14" }}
            >
              <span
                className="text-dark"
                style={{ fontWeight: "550", marginBottom: "3px" }}
              >
                Chi tiết
              </span>
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const OrderTable = () => {
    return (
      <>
        <Table className="table-container"
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
      <div className="mt-4">
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                label="Tìm đơn hàng"
                onChange={handleGetValueFromInputTextField}
                value={keyword}
                InputLabelProps={{
                  sx: {
                    marginTop: "2.5px",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "28px",
                    width: "190px",
                  },
                }}
                size="small"
                className=""
              />
              <Button
                onClick={handleRefreshData}
                className="rounded-2 ms-2 bg-primary"
                type="primary"
                style={{ height: "45px", width: "100px", fontSize: "15px", backgroundColor: "#FAAD14" }}
              >
                <span
                  className="text-white"
                  style={{ fontWeight: "550", marginBottom: "3px" }}
                >
                  Làm Mới
                </span>
              </Button>
            </div>
            <div className="d-flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Từ ngày"
                    value={fromDate ? dayjs(fromDate, "DD/MM/YYYY") : null}
                    format="DD/MM/YYYY"
                    onChange={(value) => handleGetFromDateFromDatePicker(value)}
                    sx={{
                      position: "relative",
                      width: "50px",
                      "& .MuiInputLabel-root": {
                        top: "-3.2px",
                      },
                      "& .MuiInputBase-root": {
                        width: "85%",
                      },
                      "& .MuiInputBase-input": {
                        height: "14px",
                      }
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    onChange={(value) => handleGetToDateFromDatePicker(value)}
                    label={"Đến ngày"}
                    value={toDate ? dayjs(toDate, "DD/MM/YYYY") : null}
                    format={"DD/MM/YYYY"}
                    sx={{
                      position: "relative",
                      width: "50px",
                      "& .MuiInputLabel-root": {
                        top: "-3.2px",
                      },
                      "& .MuiInputBase-root": {
                        width: "85%",
                      },
                      "& .MuiInputBase-input": {
                        height: "14px",
                      }
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mt-2">
              <Button
                onClick={handleAdd}
                className="rounded-2 bg-primary"
                type="primary"
                style={{ height: "45px", width: "150px", fontSize: "15px" }}
              >
                <PlusOutlined className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "14.5px",
                    left: "12px",
                  }}
                />
                <span
                  className="ms-3 ps-1"
                  style={{ fontWeight: "550", marginBottom: "3px" }}
                >
                  Tạo đơn hàng
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <OrderTable />
          </Card.Body>
          <div className='mx-auto'>
            <Pagination color="primary" page={parseInt(currentPage)} key={refreshPage} count={totalPages}
              onChange={handlePageChange} />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
    </>
  );
};

export default ManagementOrders;
