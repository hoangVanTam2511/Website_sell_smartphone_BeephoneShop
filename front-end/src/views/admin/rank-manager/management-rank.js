import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import axios from "axios";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Zoom from "@mui/material/Zoom";

import CreateRank from "./create-rank";
import useCustomSnackbar from "../../../utilities/notistack";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { current } from "@reduxjs/toolkit";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  Notistack,
  StatusCommonProducts,
  StatusCommonProductsNumber,
} from "../order-manager/enum";
import { ConvertStatusProductsNumberToString } from "../../../utilities/convertEnum";
import { InputAdornment } from "@mui/material";
import { request } from '../../../store/helpers/axios_helper'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementRanks = () => {
  const navigate = useNavigate();
  const [listRank, setListRank] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [idRank, setIdRank] = React.useState("");
  const [maRank, setMaRank] = React.useState("");
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const [tenRank, setTenRank] = React.useState("");
  const [dieuKienToiDa, setDieuKienToiDa] = React.useState(0);
  const [dieuKienToiThieu, setDieuKienToiThieu] = React.useState(0);
  const [uuDai, setUuDai] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );
  const [rankPages, setRankPages] = useState([]);
  const [pageShow, setPageShow] = useState(5);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState(6);

  const getListRank = () => {
    request('GET',`/rank/ranks`)
      .then((response) => {
        setListRank(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getListProductSearchAndPage = (page) => {
    request('GET',`/rank/ranksPage`, {
        params: {
          page: page,
          pageSize: pageShow,
          status: searchTrangThai,
        },
      })
      .then((response) => {
        setRankPages(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getListRank();
  }, []);

  const [openSelect, setOpenSelect] = useState(false);
  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const [openSelect3, setOpenSelect3] = useState(false);
  const handleCloseSelect3 = () => {
    setOpenSelect3(false);
  };

  const handleOpenSelect3 = () => {
    setOpenSelect3(true);
  };

  const handleSearchTatCaChange = (event) => {
    const searchTatCaInput = event.target.value;
    setSearchTatCa(searchTatCaInput);
    setCurrentPage(1);
  };

  const handleRefreshData = () => {
    setSearchTatCa("");
    setPageShow(5);
    setSearchTrangThai(6);
    if (searchTrangThai === 6) {
      setSearchParams("");
    }
    getListProductSearchAndPage(currentPage);
  };

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(parseInt(selectedValue)); // Cập nhật giá trị khi Select thay đổi
    searchParams.set("trangThai", parseInt(selectedValue));
    setSearchParams(searchParams);
    if (selectedValue === 5) {
      setSearchParams("");
    }
    setCurrentPage(1);
  };

  const handleShowPageVoucher = (event) => {
    const selectedValue = event.target.value;
    setPageShow(parseInt(selectedValue));
    setCurrentPage(1);
  };

  useEffect(() => {
    getListProductSearchAndPage(currentPage);
  }, [searchTatCa, pageShow, searchTrangThai, currentPage, totalPages]);

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getListProductSearchAndPage(page);
  };

  const detailRank = async (idRank) => {
    request('GET',`/rank/get-by-id/${idRank}`)
      .then((response) => {
        setMaRank(response.data.data.ma);
        setTenRank(response.data.data.ten);
        setStatus(response.data.data.status);
        setValue2(response.data.data.dieuKienToiDa);
        setValue1(response.data.data.dieuKienToiThieu);
        setValue(response.data.data.uuDai);
        convertTien(
          response.data.data.dieuKienToiThieu,
          response.data.data.dieuKienToiDa
        );
      })
      .catch((error) => {});
  };

  const doiTrangThaiRank = (idRank) => {
    request('PUT',`/rank/deleteTrangThaiRank/${idRank}`)
      .then((response) => {
        getListProductSearchAndPage();
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleClickOpen1 = (id) => {
    detailRank(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateRank = () => {
    let obj = {
      id: idRank,
      ma: maRank,
      ten: tenRank,
      status: status,
      dieuKienToiDa: dieuKienToiDa,
      dieuKienToiThieu: dieuKienToiThieu,
      uuDai: value,
    };
    request('PUT',`/rank/updateRank/${idRank}`, obj)
      .then((response) => {
        getListProductSearchAndPage(currentPage);
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeTenRank = (event, value) => {
    setTenRank(value);
  };
  const handleChangeDieuKienToiDaRank = (event, value) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue2(formattedValue);
    setDieuKienToiDa(numericValue);
  };
  const handleChangeDieuKienToiThieuRank = (event, value) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(formattedValue);
    setDieuKienToiThieu(numericValue);
  };
  const handleChangeUuDaiRank = (event, value) => {
    let inputValue = event.target.value;
    // Loại bỏ các ký tự không phải số
    inputValue = inputValue.replace(/\D/g, "");
    // Xử lý giới hạn giá trị từ 1 đến 100
    if (isNaN(inputValue) || inputValue < 1) {
      inputValue = "0";
    } else if (inputValue > 100) {
      inputValue = "100";
    }
    setValue(inputValue);
    setUuDai(inputValue);
  };

  const convertTien = (value1, value2) => {
    const numericValue = parseFloat(String(value1).replace(/[^0-9.-]+/g, ""));
    const fomarttedDieuKien = String(value1)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(fomarttedDieuKien);
    setDieuKienToiThieu(numericValue);

    const numericValue2 = parseFloat(String(value2).replace(/[^0-9.-]+/g, ""));
    const formattedValue2 = String(value2)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue2(formattedValue2);
    setDieuKienToiDa(numericValue2);
  };

  const uniqueRank = listRank
    .map((option) => option.ten)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const OrderTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={rankPages}
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
        <span style={{ fontWeight: "400" }}>
          {rankPages.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã Rank",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Tên Rank",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ten}</span>
      ),
    },
    {
      title: "Điều kiện",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <>
          <span
            className=""
            style={{
              fontWeight: "400",
              whiteSpace: "pre-line",
              fontSize: "15px",
            }}
          >
            Tổng đơn hàng đạt từ{" "}
            {record &&
              record.dieuKienToiThieu &&
              record.dieuKienToiThieu.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
            đến{" "}
            {record &&
              record.dieuKienToiDa &&
              record.dieuKienToiDa.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Ưu đãi",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.uuDai}
          {" %"}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "status",
      render: (type) =>
        type === StatusCommonProductsNumber.ACTIVE ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "96px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Hoạt động
            </span>
          </div>
        ) : type === StatusCommonProductsNumber.IN_ACTIVE ? (
          <div
            className="rounded-pill badge-danger mx-auto"
            style={{ height: "35px", width: "140px", padding: "4px" }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Ngừng hoạt động
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
          <div className="d-flex justify-content-center">
            <div className="button-container">
              <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
                <IconButton
                  onClick={() => {
                    handleClickOpen1(record.id);
                    setIdRank(record.id);
                  }}
                >
                  <BorderColorOutlinedIcon color="primary" />
                </IconButton>
              </Tooltip>

              {/* Hàm đổi trạng thái */}

              <Tooltip
                TransitionComponent={Zoom}
                title={
                  record.status === StatusCommonProductsNumber.ACTIVE
                    ? "Ngừng kích hoạt"
                    : record.status === StatusCommonProductsNumber.IN_ACTIVE
                    ? "Kích hoạt"
                    : ""
                }
              >
                <IconButton
                  className="ms-2"
                  style={{ marginTop: "6px" }}
                  onClick={() => doiTrangThaiRank(record.id)}
                >
                  <AssignmentOutlinedIcon
                    color={
                      record.status === StatusCommonProductsNumber.IN_ACTIVE
                        ? "error"
                        : record.status === StatusCommonProductsNumber.ACTIVE
                        ? "success"
                        : "disabled"
                    }
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      ),
    },
  ];

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
                placeholder="Tìm theo mã, tên Rank"
                label="Tìm Rank"
                onChange={handleSearchTatCaChange}
                value={searchTatCa}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "cranktalize",
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
                onClick={() => handleRefreshData()}
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
            <div
              className="d-flex mt-2"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                className="d-flex"
                style={{
                  height: "40px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={handleOpenSelect}
                  className=""
                  style={{ marginTop: "7px" }}
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
                    open={openSelect}
                    onClose={handleCloseSelect}
                    onOpen={handleOpenSelect}
                    value={searchTrangThai}
                    onChange={handleSearchTrangThaiChange}
                  >
                    <MenuItem value={6}>Tất cả</MenuItem>
                    <MenuItem value={0}>Hoạt động</MenuItem>
                    <MenuItem value={1}>Ngừng hoạt động</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div
                className="d-flex"
                style={{
                  height: "40px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={handleOpenSelect3}
                  className=""
                  style={{ marginTop: "7px" }}
                >
                  <span
                    className="ms-2 ps-1"
                    style={{ fontSize: "15px", fontWeight: "450" }}
                  >
                    Hiển Thị:{" "}
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
                    open={openSelect3}
                    onClose={handleCloseSelect3}
                    onOpen={handleOpenSelect3}
                    value={pageShow}
                    onChange={handleShowPageVoucher}
                  >
                    <MenuItem className="" value={5}>
                      Mặc định
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-2">
              <Button
                onClick={handleClickOpen}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
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
                  Tạo Rank
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <OrderTable />
          </Card.Body>
          <div className="mx-auto">
            <Pagination
              page={parseInt(currentPage)}
              count={totalPages}
              onChange={chuyenTrang}
              color="primary"
            />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
      <CreateRank
        open={open}
        close={handleClose}
        getAll={getListProductSearchAndPage}
        ranks={listRank}
      />

      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "40px",
        }}
      >
        <DialogContent>
          <div className="mt-4" style={{ width: "700px" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  SỬA RANK
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={tenRank}
                    onInputChange={handleChangeTenRank}
                    options={uniqueRank}
                    renderInput={(params) => (
                      <TextField {...params} label="Tên Rank" />
                    )}
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    fullWidth
                    className="custom"
                    id="outlined-end-adornment"
                    label="Điều kiện tối thiểu"
                    // freeSolo
                    value={value1}
                    onChange={handleChangeDieuKienToiThieuRank}
                    InputProps={{
                      inputMode: "numeric",
                      endAdornment: (
                        <InputAdornment position="end">VND</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    fullWidth
                    label="Điều kiện tối đa"
                    className="custom"
                    id="outlined-end-adornment"
                    // freeSolo
                    value={value2}
                    onChange={handleChangeDieuKienToiDaRank}
                    InputProps={{
                      inputMode: "numeric",
                      endAdornment: (
                        <InputAdornment position="end">VND</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    fullWidth
                    label="Ưu Đãi"
                    className="custom"
                    id="outlined-end-adornment"
                    // freeSolo
                    value={value}
                    onChange={handleChangeUuDaiRank}
                    InputProps={{
                      inputMode: "numeric",
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="mt-3">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Trạng Thái
                    </InputLabel>
                    <Select
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Trạng Thái"
                      onChange={handleChangeStatus}
                      defaultValue={StatusCommonProductsNumber.ACTIVE}
                    >
                      <MenuItem value={StatusCommonProductsNumber.ACTIVE}>
                        Hoạt Động
                      </MenuItem>
                      <MenuItem value={StatusCommonProductsNumber.IN_ACTIVE}>
                        Ngừng Hoạt Động
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => updateRank()}
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <span
                      className=""
                      style={{ marginBottom: "2px", fontWeight: "500" }}
                    >
                      Xác Nhận
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export default ManagementRanks;
