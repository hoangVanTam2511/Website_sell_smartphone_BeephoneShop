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
import { request } from '../../../store/helpers/axios_helper'

const OrdersPending = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));
  const [currentPage, setCurrentPage] = useState(searchParams.get('currentPage') || 1);
  const navigate = useNavigate();

  const findOrdersByKeywordWithPagination = (page) => {
    request('GET',`/api/orders`, {
        params: {
          currentPage: page,
          keyword: keyword,
          isPending: true,
        }
      })
      .then((response) => {
        setOrders(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleDeleteOrderPendingById = (id) => {
    request('DELETE',`/api/orders/${id}`)
      .then(response => {
        findOrdersByKeywordWithPagination(currentPage);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    findOrdersByKeywordWithPagination(currentPage);
  }, [keyword, currentPage]);

  const handleRefreshData = () => {
    navigate(`/dashboard/orders-pending`);
    setRefreshPage(refreshPage + 1);
    setKeyword('');
    setCurrentPage(1);
    findOrdersByKeywordWithPagination(1);
  }
  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setKeyword(value);
    setCurrentPage(1);
    searchParams.delete('currentPage');
    setSearchParams(searchParams);
    // findOrdersByKeywordWithPagination(1);
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    searchParams.set('currentPage', page);
    setSearchParams(searchParams);
    // findOrdersByKeywordWithPagination(currentPage);
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
      width: "20%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "550" }}>{record.ma}</span>
      ),
    },
    {
      title: "Số Sản Phẩm",
      align: "center",
      dataIndex: "tongSoSanPham",
      width: "5%",
      render: (text, record) => (
        <span style={{ color: "#dc1111", fontWeight: "550" }}>
          1
        </span>
      ),
    },
    {
      title: "Tổng Tiền",
      align: "center",
      dataIndex: "tongTien",
      width: "20%",
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
      title: "Trạng Thái",
      align: "center",
      width: "15%",
      dataIndex: "trangThai",
      render: (status) => {
        return status == 5 ? (
          <div
            className="rounded-pill mx-auto bg-primary"
            style={{
              height: "38px",
              width: "115px",
              padding: "5px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "550" }}
            >
              Đang chờ
            </span>
          </div>)
          : ""
      },
    },
    {
      title: "Ngày Tạo",
      align: "center",
      dataIndex: "createdAt",
      width: "20%",
      render: (text, record) => (
        <span style={{ fontWeight: "" }}>
          {format(new Date(record.createdAt), "HH:mm:ss, dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      key: "actions",
      dataIndex: "id",
      render: (_, record) => (
        <div className="button-container">
          <Link className="ms-1" to={`/dashboard/order-pending/${record.ma}`}>
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
          <Button
            onClick={() => handleDeleteOrderPendingById(record.id)}
            className="rounded-3 ms-2"
            type="primary"
            style={{ height: "45px", width: "90px", fontSize: "14px", backgroundColor: "#dc3333" }}
          >
            <span
              className="text-white"
              style={{ fontWeight: "550", marginBottom: "3px" }}
            >
              Xóa
            </span>
          </Button>
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
            <div className="mt-2">
              <Button
                // onClick={handleAdd}
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

export default OrdersPending;
