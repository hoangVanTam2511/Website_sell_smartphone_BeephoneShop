import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  SimStatus,
  StatusCommonProducts,
  StatusCommonProductsNumber,
} from "./enum";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoadingIndicator from "../../../utilities/loading";
import CreateScreen from "./create-screen";
import { apiURLDisplay, apiURLDoPhanGiai } from "../../../service/api";
import "./style.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { ConvertStatusProductsNumberToString } from "../../../utilities/convertEnum";
import useCustomSnackbar from "../../../utilities/notistack";
import { request, requestParam } from "../../../store/helpers/axios_helper";
import {
  faArrowsRotate,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementScreens = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );
  const [screens, setScreens] = useState([]);
  const [productPages, setProductPages] = useState([]);
  const [pageShow, setPageShow] = useState(5);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState(5);
  const [doPhanGiai, setDoPhanGiai] = useState();
  const [loaiManHinh, setLoaiManHinh] = React.useState("");
  const [tanSoQuet, setTanSoQuet] = React.useState("");
  const [kichThuoc, setKichThuoc] = React.useState("");
  const [openDoPhanGiai, setOpenDoPhanGiai] = React.useState(false);
  const [chieuDai, setChieuDai] = React.useState();
  const [chieuRong, setChieuRong] = React.useState();
  const [listPhanGiai, setListPhanGiai] = useState([]);
  const [trangThai, setTrangThai] = React.useState("");
  const handleChangeDoPhanGiai = (event) => {
    const selectedValue = event.target.value;
    setDoPhanGiai(selectedValue);
  };

  const loadDataList = () => {
    axios
      .get(apiURLDisplay)
      .then((response) => {
        setScreens(response.data.data);
        // setIsLoading(false);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };
  useEffect(() => {
    loadDataList();
  }, []);

  const handleRefreshData = () => {
    setSearchTatCa("");
    setPageShow(5);
    setSearchTrangThai(5);
    if (searchTrangThai === 5) {
      setSearchParams("");
    }
    getListProductSearchAndPage(currentPage);
  };

  const getListProductSearchAndPage = (page) => {
    // setIsLoading(false);
    requestParam("GET", `/api/display/search`, {
      keyword: searchTatCa,
      currentPage: page,
      pageSize: pageShow,
      status: ConvertStatusProductsNumberToString(searchTrangThai),
    })
      .then((response) => {
        setProductPages(response.data.data);
        setTotalPages(response.data.totalPages);
        // setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

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

  // const handleRedirectCreateScreen = () => {
  //   navigate(`/dashboard/screen/create`);
  // };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const OrderTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={productPages}
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
          {productPages.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã màn hình",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Loại màn hình",
      align: "center",
      key: "loaiManHinh",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.loaiManHinh}</span>
      ),
    },
    {
      title: "Độ phân giải",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.doPhanGiaiManHinh === null
            ? ""
            : record.doPhanGiaiManHinh.chieuDai}{" "}
          x{" "}
          {record.doPhanGiaiManHinh === null
            ? ""
            : record.doPhanGiaiManHinh.chieuRong + " Pixels"}
        </span>
      ),
    },
    {
      title: "Tần số quét",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.tanSoQuet + " HZ"}</span>
      ),
    },
    {
      title: "Kích thước",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.kichThuoc + " inches"}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "pinStatus",
      render: (text, type) =>
        type.status === SimStatus.ACTIVE ? (
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
        ) : type.status === SimStatus.IN_ACTIVE ? (
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
                    setIdManHinh(record.id);
                    setIdDoPhanGiai(record.doPhanGiaiManHinh.id);
                    setMaDoPhanGiai(record.doPhanGiaiManHinh.ma);
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
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    size="sm"
                    transform={{ rotate: 90 }}
                    style={{
                      cursor: "pointer",
                      color:
                        record.status === StatusCommonProducts.IN_ACTIVE
                          ? "#e5383b"
                          : record.status === StatusCommonProducts.ACTIVE
                          ? "#09a129"
                          : "disabled",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    // Load data when the component mounts
    axios
      .get(apiURLDoPhanGiai)
      .then((response) => {
        setListPhanGiai(response.data.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const handleChieuDai = (e) => {
    const value = e.target.value;
    setChieuDai(value);
  };
  const handleChieuRong = (e) => {
    const value = e.target.value;
    setChieuRong(value);
  };
  const handleTanSoQuet = (event, value) => {
    setTanSoQuet(value);
  };
  const handleKichThuoc = (event, value) => {
    setKichThuoc(value);
  };
  const handleLoaiManHinh = (event, value) => {
    setLoaiManHinh(value);
  };
  // const handleClose = () => {
  //   addDoPhanGiai();
  // };
  const handleReset = () => {
    setChieuDai("");
    setChieuRong("");
  };
  const handleReset1 = () => {
    setLoaiManHinh("");
    setDoPhanGiai("");
    setTanSoQuet("");
    setKichThuoc("");
  };

  const [manHinhCode, setManHinhCode] = useState("");
  const [idManHinh, setIdManHinh] = useState("");
  const [idDoPhanGiai, setIdDoPhanGiai] = useState("");
  const [maDoPhanGiai, setMaDoPhanGiai] = useState("");

  const detailManHinhs = (id) => {
    request("GET", `/api/display/${id}`)
      .then((response) => {
        setManHinhCode(response.data.data.ma);
        setTrangThai(response.data.data.status);
        setLoaiManHinh(response.data.data.loaiManHinh);
        setTanSoQuet(response.data.data.tanSoQuet);
        setKichThuoc(response.data.data.kichThuoc);
        setDoPhanGiai(response.data.data.doPhanGiaiManHinh.id);
        // setIdDoPhanGiai(response.data.data.doPhanGiaiManHinh.id);
        setChieuDai(response.data.data.doPhanGiaiManHinh.chieuDai);
        setChieuRong(response.data.data.doPhanGiaiManHinh.chieuRong);
        console.log(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant("Đã xảy ra lỗi.");
      });
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = (id) => {
    detailManHinhs(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    // setValidationMsg({});
  };

  const uniqueManHinh = productPages
    .map((option) => option.loaiManHinh)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeLoaiManHinh = (event, value) => {
    loaiManHinh(value);
  };

  const handleChangeStatus = (event) => {
    setTrangThai(event.target.value);
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();

  // const [validationMsg, setValidationMsg] = useState({});

  // const validationAll = () => {
  //   const msg = {};

  //   const isDuplicate = listRam.some(
  //     (product) => product.dungLuong === dungLuong && product.id !== idRam
  //   );

  //   if (isDuplicate) {
  //     handleOpenAlertVariant("Ram đã tồn tại", Notistack.ERROR);
  //     msg = "Đã tồn tại";
  //   }

  //   if (!dungLuong.trim("")) {
  //     msg.dungLuong = "Kích thước ram không được trống.";
  //   }

  //   if (dungLuong < 1) {
  //     msg.dungLuong = "Kích thước ram không được nhỏ hơn 1 GB.";
  //   }

  //   if (dungLuong > 3000) {
  //     msg.dungLuong = "Kích thước ram không được lớn hơn 3000 GB.";
  //   }

  //   setValidationMsg(msg);
  //   if (Object.keys(msg).length > 0) return false;
  //   return true;
  // };

  // const handleSubmit = () => {
  //   const isValid = validationAll();
  //   if (!isValid) return;
  //   updateRam();
  // };

  const updateDoPhanGiai = () => {
    let obj = {
      id: idDoPhanGiai,
      ma: maDoPhanGiai,
      chieuDai: chieuDai,
      chieuRong: chieuRong,
    };
    axios
      .put(apiURLDoPhanGiai, obj)
      .then((response) => {
        console.log(response);
        let newDoPhanGiai = {
          chieuDai: chieuDai,
          chieuRong: chieuRong,
        };
        setListPhanGiai([newDoPhanGiai, ...listPhanGiai]);
        handleOpenAlertVariant("Sửa thành công", Notistack.SUCCESS);
        handleReset();
        setOpenDoPhanGiai(false);
        // redirectToHienThiKH(generatedMaKhachHang);
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };

  const updateManHinh = () => {
    let obj = {
      id: idManHinh,
      ma: manHinhCode,
      loaiManHinh: loaiManHinh,
      doPhanGiaiManHinh: doPhanGiai,
      tanSoQuet: tanSoQuet,
      kichThuoc: kichThuoc,
      status: trangThai,
    };
    request("PUT", `/api/display`, obj)
      .then((response) => {
        loadDataList();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const doiTrangThaiProducts = (idManHinh) => {
    request("PUT", `/api/display/${idManHinh}`)
      .then((response) => {
        getListProductSearchAndPage(currentPage);
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const uniqueTanSoQuet = screens
    .map((option) => option.tanSoQuet.toString())
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const uniqueKichThuoc = screens
    .map((option) => option.kichThuoc.toString())
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const uniqueLoaiManHinh = screens
    .map((option) => option.loaiManHinh)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

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
          <span
            className="header-title mt-3 ms-4"
            style={{ fontWeight: "500px" }}
          >
            <FontAwesomeIcon icon={faHouse} size={"sm"} /> Quản Lý Màn Hình
          </span>
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <TextField
                placeholder="Tìm theo mã, loại, tần số quét, kích thước màn hình"
                label="Tìm Màn Hình"
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
                    value={5}
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
                style={{ height: "40px", width: "155px", fontSize: "15px" }}
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
                  Tạo Màn Hình
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
      {/* {isLoading && <LoadingIndicator />} */}
      <CreateScreen
        open={open}
        close={handleClose}
        getAll={loadDataList}
        screens={screens}
      />
      <Dialog
        style={{ zIndex: 2 }}
        open={openDoPhanGiai}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        disableBackdropClick={true}
        maxHeight="md"
        sx={{
          marginBottom: "170px",
        }}
      >
        <DialogTitle className="text-center">{"SỬA ĐỘ PHÂN GIẢI"}</DialogTitle>
        <DialogContent className="" style={{ height: "180px", width: "350px" }}>
          <div className="mt-3"></div>
          <div className="mt-3">
            <TextField
              label="Chiều dài"
              value={String(chieuDai)}
              id="fullWidth"
              onChange={handleChieuDai}
              // error={formSubmitDPG && !chieuDai}
              // helperText={formSubmitDPG && !chieuDai && "Chiều Dài trống"}
              style={{ width: "100%" }}
              maxLength={30}
            />
          </div>
          <div className="mt-3">
            <TextField
              label="Chiều rộng"
              value={String(chieuRong)}
              id="fullWidth"
              onChange={handleChieuRong}
              // error={formSubmitDPG && !chieuRong}
              // helperText={formSubmitDPG && !chieuRong && "Chiều rộng trống"}
              style={{ width: "100%" }}
              maxLength={30}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            key="cancel"
            onClick={() => {
              setOpenDoPhanGiai(false);
              handleReset();
            }}
            size="large"
            type="text"
          >
            Hủy
          </Button>

          <Button
            onClick={() => updateDoPhanGiai()}
            className="rounded-2 button-mui me-3"
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
        </DialogActions>
        <div className="mt-3"></div>
      </Dialog>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "50px",
        }}
        style={{ zIndex: 1 }}
      >
        <DialogContent>
          <div className="mt-4" style={{ width: "700px" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  SỬA MÀN HÌNH
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={loaiManHinh}
                    options={uniqueLoaiManHinh}
                    onInputChange={handleLoaiManHinh}
                    renderInput={(params) => (
                      <TextField {...params} label="Loại Màn Hình" />
                    )}
                  />
                </div>
                <div className="mt-3">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Độ Phân Giải
                    </InputLabel>
                    <Select
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={doPhanGiai}
                      label="Độ Phân Giải"
                      onChange={handleChangeDoPhanGiai}
                      endAdornment={
                        <>
                          <InputAdornment
                            style={{ marginRight: "20px" }}
                            position="end"
                          >
                            <Tooltip
                              title="Sửa độ phân giải"
                              TransitionComponent={Zoom}
                            >
                              <IconButton
                                onClick={() => setOpenDoPhanGiai(true)}
                                aria-label="delete"
                                size="small"
                              >
                                <AddCircleOutlineIcon className="text-dark" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        </>
                      }
                    >
                      {listPhanGiai.map((record) => (
                        <MenuItem key={record.id} value={record.id}>
                          {`${record.chieuDai} x ${record.chieuRong}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-3">
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    options={uniqueTanSoQuet}
                    onInputChange={handleTanSoQuet}
                    inputValue={String(tanSoQuet)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment
                                style={{ marginLeft: "5px" }}
                                position="start"
                              >
                                Hz
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        label="Tần Số Quét"
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
                    options={uniqueKichThuoc}
                    inputValue={String(kichThuoc)}
                    onInputChange={handleKichThuoc}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment
                                style={{ marginLeft: "5px" }}
                                position="start"
                              >
                                inches
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        label="Màn Hình Rộng"
                      />
                    )}
                  />
                </div>
                {/* <div className="mt-3" style={{}}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Trạng Thái
                    </InputLabel>
                    <Select
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={trangThai}
                      label="Trạng Thái"
                      defaultValue={StatusCommonProducts.ACTIVE}
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={StatusCommonProducts.ACTIVE}>
                        Hoạt Động
                      </MenuItem>
                      <MenuItem value={StatusCommonProducts.IN_ACTIVE}>
                        Ngừng Hoạt Động
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => {
                      updateManHinh();
                    }}
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
export default ManagementScreens;
