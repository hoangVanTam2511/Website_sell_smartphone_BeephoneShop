import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box, Dialog, DialogContent, FormControl, IconButton, MenuItem, Pagination, Select, Slide, TextField, Tooltip, } from "@mui/material";
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
import { ImportExcelImei } from "./import-imei-by";
import { FaDownload, FaUpload } from "react-icons/fa6";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ManagementProductItems = ({ open, close, productItems, productName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(productItems);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));
  const [currentPage, setCurrentPage] = useState(searchParams.get('currentPage') || 1);

  useEffect(() => {
    setProducts(productItems);
  }, [productItems]);

  const handleRedirectCreateProduct = () => {
    navigate(`/dashboard/create-product`);
  }

  const OrderTable = () => {
    return (
      <>
        <Table className="table-container mt-4 pt-2"
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
      key: "ma",
      width: "15%",
      render: (text, record) => (
        <img src={record && record.image && record.image.path} alt="" style={{ width: "150px", height: "150px" }} />
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
      width: "25%",
      dataIndex: "tenSanPham",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{productName + " " + record.ram.dungLuong + "/" +
          record.rom.dungLuong + "GB"}</span>
      ),
    },
    {
      title: "Màu Sắc",
      align: "center",
      width: "11%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.mauSac.tenMauSac}</span>
      ),
    },
    {
      title: "Đơn Giá",
      align: "center",
      width: "11%",
      render: (text, record) => (
        <span className="txt-price" style={{ fontWeight: "400" }}>{
          record.donGia && record.donGia.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Số Lượng Tồn",
      align: "center",
      width: "11%",
      render: (text, record) => (
        <Tooltip title="Danh sách IMEI" TransitionComponent={Zoom}>
          <div style={{ cursor: "pointer" }}>
            <span style={{ fontWeight: "400" }} className="underline-blue">
              {record.soLuongTonKho}
            </span>
          </div>
        </Tooltip>
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
              <IconButton size="">
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

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        maxWidth="xxl"
        maxHeight="xxl"
      >
        <DialogContent className="">
          <div className="mt-4" style={{ width: "1350px" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
                  CHI TIẾT SẢN PHẨM
                </span>
              </div>
              <div className="header-title mt-3 d-flex justify-content-between">
                <div>
                  <TextField
                    label="Tìm Sản Phẩm Chi Tiết"
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
                <div>
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
                </div>
              </div>
              <div className="d-flex mt-4 pt-1 d-flex justify-content-center">
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
                      Bộ Nhớ RAM:{""}
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
                      Bộ Nhớ ROM:{""}
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
                      Màu Sắc:{""}
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
              </div>
              <OrderTable />
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default ManagementProductItems;
