import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Popconfirm, Table } from "antd";
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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Card from "../../../components/Card";
import axios from "axios";
import Zoom from "@mui/material/Zoom";
import { Notistack, StatusImei, StatusImeiNumber } from "./enum";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoadingIndicator from "../../../utilities/loading";
import useCustomSnackbar from "../../../utilities/notistack";
import {
  ConvertStatusImeisNumberToString,
  ConvertStatusProductsNumberToString,
} from "../../../utilities/convertEnum";
import { request, requestParam } from "../../../store/helpers/axios_helper";
import {
  faArrowsRotate,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { current } from "@reduxjs/toolkit";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementImei = () => {
  const navigate = useNavigate();
  const [imei, setImei] = useState([]);
  const [imeiPages, setImeiPages] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("a");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [trangThai, setTrangThai] = React.useState("");
  const [idImei, setIdImei] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelect, setOpenSelect] = useState(false);

  // const getListImei = () => {
  //   request("GET", `/api/imeis`)
  //     .then((response) => {
  //       setImei(response.data.data);
  //       setTotalPages(response.data.totalPages);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleOpenDialogConfirmUpdate = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmUpdate = () => {
    setOpenConfirm(false);
  };

  const Header = () => {
    return (
      <>
        <span className="">Chỉnh sửa voucher</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>Bạn có chắc chắc muốn chỉnh sửa voucher không ?</span>
      </>
    );
  };

  const getListImeiSearchAndPage = (page) => {
    requestParam("GET", `/api/imeis/search`, {
      keyword: searchTatCa,
      currentPage: page,
      trangThai: ConvertStatusImeisNumberToString(searchTrangThai),
    })
      .then((response) => {
        setImeiPages(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
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
    if (selectedValue === "a") {
      setSearchParams("");
    }
    setCurrentPage(1);
  };

  const handleSearchTatCaChange = (event) => {
    const searchTatCaInput = event.target.value;
    setSearchTatCa(searchTatCaInput);
    setCurrentPage(1);
  };

  useEffect(() => {
    getListImeiSearchAndPage(currentPage);
  }, [searchTatCa, searchTrangThai, currentPage, totalPages]);

  useEffect(() => {
    getListImeiSearchAndPage(currentPage);
  }, []);

  const doiTrangThaiImei = (idImei) => {
    request("PUT", `/api/imeis/${idImei}`)
      .then((response) => {
        getListImeiSearchAndPage(currentPage);
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };
  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getListImeiSearchAndPage(page);
  };

  const ImeiTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={imeiPages}
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
          {imeiPages.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.soImei}</span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "trangThai",
      render: (type) =>
        type === StatusImei.SOLD ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "135px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Đã Bán
            </span>
          </div>
        ) : type === StatusImei.NOT_SOLD || type === StatusImei.IN_THE_CART ? (
          <div
            className="rounded-pill badge-warning mx-auto"
            style={{ height: "35px", width: "135px", padding: "4px" }}
          >
            <span className="" style={{ fontSize: "14px" }}>
              Chưa Bán
            </span>
          </div>
        ) : type === StatusImei.IN_ACTIVE ? (
          <div
            className="rounded-pill badge-danger mx-auto"
            style={{ height: "35px", width: "135px", padding: "4px" }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Ngừng hoạt động
            </span>
          </div>
        ) : type === StatusImei.REFUND ? (
          <div
            className="rounded-pill badge-danger mx-auto"
            style={{ height: "35px", width: "135px", padding: "4px" }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Hàng Trả
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
        <div className="d-flex justify-content-center">
          <div className="button-container">
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                  handleClickOpen1(record.id);
                  setIdImei(record.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="sm"
                  style={{
                    color: "#2f80ed",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Tooltip>

            {/* Hàm đổi trạng thái */}
            <Popconfirm
              title={
                <span style={{ fontSize: "16px" }}>
                  Bạn có chắc chắn đổi trạng thái imei ?
                </span>
              }
              onConfirm={() => {
                doiTrangThaiImei(record.id);
              }}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title={
                  record.trangThai === StatusImei.NOT_SOLD
                    ? "Chưa bán"
                    : record.trangThai === StatusImei.IN_ACTIVE
                    ? "Ngừng kích hoạt"
                    : ""
                }
              >
                <IconButton
                  className="ms-2"
                  style={{ marginTop: "6px" }}
                  disabled={record.trangThai === StatusImei.SOLD ? true : false}
                >
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    size="sm"
                    transform={{ rotate: 90 }}
                    style={{
                      cursor: "pointer",
                      color:
                        record.trangThai === StatusImei.IN_ACTIVE
                          ? "#e5383b"
                          : record.trangThai === StatusImei.NOT_SOLD
                          ? "#09a129"
                          : "disabled",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const [soImei, setSoImei] = useState("");
  const [idSanPhamChiTiet, setIdSanPhamChiTiet] = useState("");
  const [barcode, setBarcode] = useState("");
  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    if (!soImei.trim("")) {
      msg.soImei = "Số imei không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateImei();
  };

  const detailImei = async (id) => {
    await axios
      .get(`http://localhost:8080/api/imeis/${id}`)
      .then((response) => {
        setIdImei(response.data.data.id);
        setIdSanPhamChiTiet(response.data.data.sanPhamChiTiet.id);
        setBarcode(response.data.data.barcode);
        setSoImei(response.data.data.soImei);
        setTrangThai(response.data.data.trangThai);
      })
      .catch((error) => {});
  };

  const updateImei = () => {
    let obj = {
      id: idImei,
      soImei: soImei,
      trangThai: trangThai,
      sanPhamChiTiet: { id: idSanPhamChiTiet },
      barcode: barcode,
    };
    axios
      .put(`http://localhost:8080/api/imeis`, obj)
      .then((response) => {
        console.log(response);
        getListImeiSearchAndPage();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleChangeSoImei = (event) => {
    setSoImei(event.target.value);
  };

  const handleClickOpen1 = (id) => {
    detailImei(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setValidationMsg({});
  };

  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundImei: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                label="Tìm Imei"
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
                    width: "200px",
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
            <div
              className="d-flex"
              style={{
                height: "40px",
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
                  <MenuItem className="" value={"a"}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={StatusImeiNumber.NOT_SOLD}>
                    Chưa Bán
                  </MenuItem>
                  <MenuItem value={StatusImeiNumber.SOLD}>Đã Bán</MenuItem>
                  <MenuItem value={StatusImeiNumber.IN_ACTIVE}>
                    Ngưng Hoạt Động
                  </MenuItem>
                  <MenuItem value={StatusImeiNumber.REFUND}>Hàng Trả</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Card.Header>
          <Card.Body>
            <ImeiTable />
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
            <div className="container">
              <div className="text-center">
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  SỬA SỐ IMEI
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div style={{ display: "flex" }}>
                  <TextField
                    className="custom"
                    fullWidth
                    label="Số Imei"
                    value={soImei}
                    id="fullWidth"
                    onChange={handleChangeSoImei}
                    inputProps={{
                      maxLength: 14, // Giới hạn tối đa 10 ký tự
                    }}
                    error={validationMsg.soImei !== undefined}
                    helperText={validationMsg.soImei}
                  />
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
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
      {/* {!isLoading && <LoadingIndicator />} */}
    </>
  );
};
export default ManagementImei;
