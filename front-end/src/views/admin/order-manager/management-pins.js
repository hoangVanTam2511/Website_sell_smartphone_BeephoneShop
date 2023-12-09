import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
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
import {
  Notistack,
  StatusCommonProducts,
  StatusCommonProductsNumber,
} from "./enum";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CreatePin from "./create-pin";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConvertStatusProductsNumberToString } from "../../../utilities/convertEnum";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { request, requestParam } from '../../../store/helpers/axios_helper'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementPins = () => {
  const navigate = useNavigate();
  const [pins, setPins] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [pinPages, setPinPages] = useState([]);
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelect, setOpenSelect] = useState(false);

  const loadDataPins = () => {
    request('GET',`/api/pins`)
      .then((response) => {
        setPins(response.data.data);
        setTotalPages(response.data.totalPages);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

  const getListPinSearchAndPage = (page) => {
    // setIsLoading(false);
    requestParam('GET',`/api/pins/search`, {
          keyword: searchTatCa,
          currentPage: page,
          status: ConvertStatusProductsNumberToString(searchTrangThai),
      })
      .then((response) => {
        setPinPages(response.data.data);
        setTotalPages(response.data.totalPages);
        // setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    loadDataPins();
  }, []);

  useEffect(() => {
    getListPinSearchAndPage(currentPage);
  }, [searchTatCa, searchTrangThai, currentPage, totalPages]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
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

  const handleSearchTatCaChange = (event) => {
    const searchTatCaInput = event.target.value;
    setSearchTatCa(searchTatCaInput);
    setCurrentPage(1);
  };

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getListPinSearchAndPage(page);
  };

  const PinTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={pinPages}
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
          {pinPages.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã Pin",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Loại Pin",
      align: "center",
      key: "loaiPin",
      width: "15%",
      dataIndex: "loaiPin",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.loaiPin}</span>
      ),
    },
    {
      title: "Dung lượng",
      align: "center",
      key: "dungLuong",
      width: "15%",
      dataIndex: "dungLuong",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.dungLuong + " mAh"}</span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "status",
      render: (type) =>
        type == StatusCommonProducts.ACTIVE ? (
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
        ) : type == StatusCommonProducts.IN_ACTIVE ? (
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
      render: (text, record) => (
        <>
          <div className="d-flex justify-content-center">
            <div className="button-container">
              <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
                <IconButton
                  onClick={() => {
                    handleClickOpen1(record.id);
                    setIdPin(record.id);
                  }}
                >
                  <BorderColorOutlinedIcon color="primary" />
                </IconButton>
              </Tooltip>

              {/* Hàm đổi trạng thái */}

              <Tooltip
                TransitionComponent={Zoom}
                title={
                  record.status === StatusCommonProducts.ACTIVE
                    ? "Ngừng kích hoạt"
                    : record.status === StatusCommonProducts.IN_ACTIVE
                    ? "Kích hoạt"
                    : ""
                }
              >
                <IconButton
                  className="ms-2"
                  style={{ marginTop: "6px" }}
                  onClick={() => doiTrangThaiProducts(record.id)}
                >
                  <AssignmentOutlinedIcon
                    color={
                      record.status === StatusCommonProducts.IN_ACTIVE
                        ? "error"
                        : record.status === StatusCommonProducts.ACTIVE
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

  const [pinCode, setPinCode] = useState("");
  const [status, setStatus] = useState("");
  const [loaiPin, setLoaiPin] = useState("");
  const [dungLuong, setDungLuong] = useState("");
  const [idPin, setIdPin] = useState("");

  const detailPins = async (id) => {
    request('GET',`/api/pins/${id}`)
      .then((response) => {
        setPinCode(response.data.data.ma);
        setStatus(response.data.data.status);
        setLoaiPin(response.data.data.loaiPin);
        setDungLuong(response.data.data.dungLuong);
        console.log(response.data.data);
      })
      .catch((error) => {});
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = (id) => {
    detailPins(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setValidationMsg({});
  };

  const uniquePin = pins
    .map((option) => option.loaiPin)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const uniqueDungLuong = pins
    .map((option) => option.dungLuong.toString())
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeLoaiPin = (event, value) => {
    setLoaiPin(value);
  };

  const handleChangeDungLuong = (event, value) => {
    setDungLuong(value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    if (!loaiPin.trim("")) {
      msg.loaiPin = "Loại pin không được trống.";
    }

    if (!dungLuong.trim("")) {
      msg.dungLuong = "Dung lượng pin không được trống.";
    }

    if (dungLuong < 1) {
      msg.dungLuong = "Dung lượng pin không được nhỏ hơn 1 mAh.";
    }

    if (dungLuong > 100000) {
      msg.dungLuong = "Dung lượng pin không được lớn hơn 100.000 mAh.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updatePin();
  };

  const updatePin = () => {
    let obj = {
      id: idPin,
      ma: pinCode,
      loaiPin: loaiPin,
      dungLuong: dungLuong,
      status: status,
    };
    request('PUT',`/api/pins`, obj)
      .then((response) => {
        loadDataPins();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const doiTrangThaiProducts = (idPin) => {
    request('PUT',`/api/pins/${idPin}`)
      .then((response) => {
        loadDataPins();
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
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
                placeholder="Tìm theo mã, loại, dung lượng Pin"
                label="Tìm Pin"
                onChange={handleSearchTatCaChange}
                value={searchTatCa}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "270px",
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

            <div className="d-flex mt-2">
              <div
                className="d-flex me-5"
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
                    defaultValue={5}
                    onChange={handleSearchTrangThaiChange}
                  >
                    <MenuItem className="" value={5}>
                      Tất cả
                    </MenuItem>
                    <MenuItem value={StatusCommonProductsNumber.ACTIVE}>
                      Hoạt động
                    </MenuItem>
                    <MenuItem value={StatusCommonProductsNumber.IN_ACTIVE}>
                      Ngừng hoạt động
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button
                onClick={handleClickOpen}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "145px", fontSize: "15px" }}
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
                  Tạo Pin
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <PinTable />
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
      {/* {isLoading && <LoadingIndicator />} */}
      <CreatePin
        open={open}
        close={handleClose}
        getAll={loadDataPins}
        pins={pins}
      />
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "170px",
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
                  SỬA PIN
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={loaiPin}
                    onInputChange={handleChangeLoaiPin}
                    options={uniquePin}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tên Pin"
                        error={validationMsg.loaiPin !== undefined}
                        helperText={validationMsg.loaiPin}
                      />
                    )}
                  />
                </div>
                <div className="mt-3">
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={String(dungLuong)}
                    onInputChange={handleChangeDungLuong}
                    options={uniqueDungLuong}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              <InputAdornment
                                style={{ marginLeft: "5px" }}
                                position="end"
                              >
                                mAh
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        label="Dung Lượng PIN"
                        error={validationMsg.dungLuong !== undefined}
                        helperText={validationMsg.dungLuong}
                      />
                    )}
                  />
                </div>
                <div className="mt-3" style={{}}>
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
                      // defaultValue={StatusCommonProductsNumber.ACTIVE}
                    >
                      <MenuItem value={StatusCommonProducts.ACTIVE}>
                        Hoạt Động
                      </MenuItem>
                      <MenuItem value={StatusCommonProducts.IN_ACTIVE}>
                        Ngừng Hoạt Động
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => handleSubmit()}
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
          {/* {isLoading && <LoadingIndicator />} */}
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export default ManagementPins;
