import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, IconButton, Pagination, TextField, Tooltip, } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Zoom from '@mui/material/Zoom';
import * as dayjs from "dayjs";
import { OrderStatusString, OrderTypeString } from "./enum";
import LoadingIndicator from '../../../utilities/loading';
import { FaPencilAlt } from "react-icons/fa";
import ManagementProductItems from "./management-product-items";
import { FaDownload, FaUpload } from "react-icons/fa6";

const ManagementProducts = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));
  const [currentPage, setCurrentPage] = useState(searchParams.get('currentPage') || 1);

  const [openProductItems, setOpenProductItems] = useState(false);

  const handleCloseOpenProductItems = () => {
    setOpenProductItems(false);
  }

  const getAll = () => {
    axios
      .get(`http://localhost:8080/api/products/all`, {
      })
      .then((response) => {
        setProducts(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getAll();
  }, []);

  const handleRedirectCreateProduct = () => {
    navigate(`/dashboard/create-product`);
  }

  const OrderTable = () => {
    return (
      <>
        <Table className="table-container"
          columns={columns}
          rowKey="ma"
          dataSource={products}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>{products.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Mã Sản Phẩm",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      key: "tenSanPham",
      width: "15%",
      dataIndex: "tenSanPham",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.tenSanPham}</span>
      ),
    },
    {
      title: "Hãng",
      align: "center",
      width: "15%",
      dataIndex: "hang",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.hang.tenHang}</span>
      ),
    },
    {
      title: "Hệ Điều Hành",
      align: "center",
      width: "15%",
      dataIndex: "hang",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.operatingType}</span>
      ),
    },
    {
      title: "CPU",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.chip.tenChip}</span>
      ),
    },
    {
      title: "Màn Hình",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.manHinh.kichThuoc + `"`}</span>
      ),
    },
    {
      title: "Trạng Thái",
      align: "center",
      width: "15%",
      dataIndex: "trangThai",
      render: (type) =>
        type == 0 ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "96px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px" }}
            >
              Kinh doanh
            </span>
          </div>
        ) : 1 ? (
          <div
            className="rounded-pill badge-danger mx-auto"
            style={{ height: "35px", width: "150px", padding: "4px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px" }}
            >
              Ngừng kinh doanh
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <>
          <div className="button-container">
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton size="" onClick={() => {
                setProductItems(record.productItems)
                setProductName(record.tenSanPham);
                setOpenProductItems(true);
              }}>
                <FaPencilAlt color="#2f80ed" />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010" }}>
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                label="Tìm Sản Phẩm"
                // onChange={handleGetValueFromInputTextField}
                // value={keyword}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "250px",
                  },
                }}
                size="small"
                className=""
              />
              <Button
                // onClick={handleRefreshData}
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
            <div className="mt-2">
              <Button
                // onClick={handleUploadClick}
                className="rounded-2 button-mui me-2"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                <FaUpload
                  className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "13.5px",
                    left: "10px",
                  }}
                />
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500", marginLeft: "21px" }}
                >
                  Import IMEI
                </span>
              </Button>
              <Button
                // onClick={handleUploadClick}
                className="rounded-2 button-mui me-2"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                <FaDownload
                  className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "13.5px",
                    left: "10px",
                  }}
                />
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500", marginLeft: "21px" }}
                >
                  Export Excel
                </span>
              </Button>
              <Button
                // onClick={handleUploadClick}
                className="rounded-2 button-mui me-2"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                <FaDownload
                  className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "13.5px",
                    left: "10px",
                  }}
                />
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500", marginLeft: "21px" }}
                >
                  Tải Mẫu
                </span>
              </Button>
              <Button
                onClick={handleRedirectCreateProduct}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "150px", fontSize: "15px" }}
              >
                <PlusOutlined className="ms-1"
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
                  Tạo sản phẩm
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <OrderTable />
          </Card.Body>
          <div className='mx-auto'>
            <Pagination color="primary" /* page={parseInt(currentPage)} key={refreshPage} count={totalPages} */
            // onChange={handlePageChange} 
            />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
      <ManagementProductItems open={openProductItems} close={handleCloseOpenProductItems} productItems={productItems} productName={productName} />
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default ManagementProducts;