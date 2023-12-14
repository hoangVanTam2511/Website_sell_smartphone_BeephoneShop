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
import {
  Notistack,
  StatusCommonProducts,
  StatusCommonProductsNumber,
  TypeCamera,
} from "./enum";
import CreateCameraSau from "./create-camera-sau";
import useCustomSnackbar from "../../../utilities/notistack";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  ConvertCameraTypeToString,
  ConvertStatusProductsNumberToString,
} from "../../../utilities/convertEnum";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementRearCameras = () => {
  const navigate = useNavigate();
  const [cameraRears, setCameraRears] = useState([]);
  const [pageShow, setPageShow] = useState(5);
  const [openSelect, setOpenSelect] = useState(false);
  const [cameraPages, setCameraPages] = useState([]);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState(5);
  const [totalPages, setTotalPages] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );

  const [openSelect3, setOpenSelect3] = useState(false);
  const handleCloseSelect3 = () => {
    setOpenSelect3(false);
  };
  const handleShowPageVoucher = (event) => {
    const selectedValue = event.target.value;
    setPageShow(parseInt(selectedValue));
    setCurrentPage(1);
  };

  const handleOpenSelect3 = () => {
    setOpenSelect3(true);
  };

  const getListProductSearchAndPage = (page) => {
    // setIsLoading(false);
    axios
      .get(`http://localhost:8080/api/camera-rears/search`, {
        params: {
          keyword: searchTatCa,
          currentPage: page,
          pageSize: pageShow,
          status: ConvertStatusProductsNumberToString(searchTrangThai),
        },
      })
      .then((response) => {
        setCameraPages(response.data.data);
        setTotalPages(response.data.totalPages);
        // setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    getListProductSearchAndPage(currentPage);
  }, [pageShow, searchTatCa, searchTrangThai, currentPage, totalPages]);

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getListProductSearchAndPage(page);
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

  const handleRefreshData = () => {
    setSearchTatCa("");
    setPageShow(5);
    setSearchTrangThai(5);
    if (searchTrangThai === 5) {
      setSearchParams("");
    }
    getListProductSearchAndPage(currentPage);
  };
  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const getListCameraRear = () => {
    axios
      .get(`http://localhost:8080/api/camera-rears`)
      .then((response) => {
        setCameraRears(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getListCameraRear();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CameraRearTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={cameraPages}
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
          {cameraPages.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã Camera",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Độ Phân Giải",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.doPhanGiai + " MP"}</span>
      ),
    },

    {
      title: "Tính Năng",
      align: "center",
      width: "15%",
      dataIndex: "cameraType",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.cameraType}</span>
      ),
    },

    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "status",
      render: (type) =>
        type === StatusCommonProducts.ACTIVE ? (
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
        ) : type === StatusCommonProducts.IN_ACTIVE ? (
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
                    setIdCamera(record.id);
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

  const [cameraCode, setCameraCode] = useState("");
  const [status, setStatus] = useState("");
  const [doPhanGiai, setDoPhanGiai] = useState("");
  const [idCamera, setIdCamera] = useState("");
  const [cameraType, setCameraType] = useState("");

  const detailCameras = async (id) => {
    await axios
      .get(`http://localhost:8080/api/camera-rears/${id}`)
      .then((response) => {
        setCameraCode(response.data.data.ma);
        setCameraType(response.data.data.cameraType);
        setStatus(response.data.data.status);
        setDoPhanGiai(response.data.data.doPhanGiai);
        console.log(response.data.data);
      })
      .catch((error) => {});
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = (id) => {
    detailCameras(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setValidationMsg({});
  };

  const uniqueCamera = cameraRears
    .map((option) => option.doPhanGiai.toString())
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeDoPhanGiai = (event, value) => {
    setDoPhanGiai(value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeCameraType = (event) => {
    setCameraType(event.target.value);
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = cameraRears.some(
      (camera) =>
        camera.doPhanGiai === doPhanGiai &&
        camera.cameraType === cameraType &&
        camera.id === idCamera
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Camera đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (
      doPhanGiai !== null &&
      doPhanGiai !== undefined &&
      typeof doPhanGiai === "string" &&
      doPhanGiai.trim() === ""
    ) {
      msg.doPhanGiai = "Độ phân giải không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateCamera();
  };

  const updateCamera = () => {
    let obj = {
      id: idCamera,
      ma: cameraCode,
      doPhanGiai: doPhanGiai,
      cameraType: cameraType,
      status: status,
    };
    axios
      .put(`http://localhost:8080/api/camera-rears`, obj)
      .then((response) => {
        getListCameraRear();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const doiTrangThaiProducts = (idCamera) => {
    axios
      .put(`http://localhost:8080/api/camera-rears/${idCamera}`)
      .then((response) => {
        getListCameraRear();
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
                placeholder="Tìm theo mã, độ phân giải, tính năng camera sau"
                label="Tìm Camera Sau"
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
                    value={searchTrangThai}
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
                style={{ height: "40px", width: "185px", fontSize: "15px" }}
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
                  Tạo Camera Sau
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <CameraRearTable />
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
      <CreateCameraSau
        open={open}
        close={handleClose}
        getAll={getListCameraRear}
        cameraRear={cameraRears}
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
                  SỬA CAMERA TRƯỚC
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={String(doPhanGiai)}
                    onInputChange={handleChangeDoPhanGiai}
                    options={uniqueCamera}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Độ Phân Giải"
                        error={validationMsg.doPhanGiai !== undefined}
                        helperText={validationMsg.doPhanGiai}
                      />
                    )}
                  />
                </div>
                <div className="mt-3" style={{}}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tính Năng
                    </InputLabel>
                    <Select
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cameraType}
                      label="Tính năng"
                      onChange={handleChangeCameraType}
                    >
                      <MenuItem value={TypeCamera.STANDARD_CAMERA}>
                        Standard Camera
                      </MenuItem>
                      <MenuItem value={TypeCamera.WIDE_CAMERA}>
                        Wide Camera
                      </MenuItem>
                      <MenuItem value={TypeCamera.ULTRA_WIDE_CAMERA}>
                        Ultra Wide Camera
                      </MenuItem>
                      <MenuItem value={TypeCamera.TELEPHOTO_CAMERA}>
                        Telephoto Camera
                      </MenuItem>
                      <MenuItem value={TypeCamera.PERISCOPE_TELEPHOTO_CAMERA}>
                        Periscope Telephoto Camera
                      </MenuItem>
                      <MenuItem value={TypeCamera.MARCO_CAMERA}>
                        Marco Camera
                      </MenuItem>
                      <MenuItem value={TypeCamera.DEPTH_CAMERA}>
                        Depth Camera
                      </MenuItem>
                    </Select>
                  </FormControl>
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
export default ManagementRearCameras;
