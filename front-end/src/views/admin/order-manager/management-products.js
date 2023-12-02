import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, MenuItem, Pagination, Select, TextField, Tooltip, } from "@mui/material";
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
import { FaDownload, FaEye, FaUpload } from "react-icons/fa6";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';

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
      .get(`http://localhost:8080/api/products`, {
      })
      .then((response) => {
        setProducts(response.data.data);
        setIsLoading(false);
        console.log(response.data.data);
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
      title: "Ảnh",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <>
          <div style={{ position: "relative" }}>
            <img
              src={
                item &&
                item.productItems && item.productItems[0] &&
                item.productItems[0].image && item.productItems[0].image.path
              }
              class=""
              alt=""
              style={{ width: "125px", height: "125px" }}
            />
          </div>
        </>
      ),
    },
    {
      title: "Mã Sản Phẩm",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{"SP00000" + products.indexOf(record) + 1}</span>
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
      width: "20%",
      dataIndex: "ma",
      render: (text, record) => (
        <>
          <div className="button-container">
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton size="" className="me-2" onClick={() => {
                navigate(`/dashboard/update-product/${record.id}`);
              }}
              >
                <FaPencilAlt color="#2f80ed" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Chi tiết" TransitionComponent={Zoom}>
              <IconButton size="" className=""
                onClick={() => {
                  navigate(`/dashboard/products/${record.id}`);
                }}
              >
                <FaEye color="#2f80ed" />
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
                label="Tìm Sản Phẩm Theo Mã Hoặc Tên"
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
                    width: "300px",
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
              {/*
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
*/}
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
                  Tải Mẫu Import IMEI
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
                  Danh Mục:{" "}
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
                  Hãng:{" "}
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
                  Hệ Điều Hành:{" "}
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
                  CPU:{""}
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
                  Màn Hình:{""}
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
          <div className="d-flex mt-3 mx-auto">
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
                  Trạng Thái:{""}
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
                  Sắp Xếp:{""}
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
          <div className='mx-auto'>
            <Pagination color="primary" /* page={parseInt(currentPage)} key={refreshPage} count={totalPages} */
            // onChange={handlePageChange} 
            />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default ManagementProducts;
