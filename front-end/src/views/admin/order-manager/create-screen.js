import React, { useEffect, useState } from "react";
// import {
//   useNavigate,
// } from "react-router-dom";
import { Button, message } from "antd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  FormControl,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Tooltip,
  Autocomplete,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";
import LoadingIndicator from "../../../utilities/loading";
import axios from "axios";
import { apiURLDisplay, apiURLDoPhanGiai } from "../../../service/api";
import { Notistack, StatusCommonProductsNumber } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreateScreen = ({ open, close, getAll, screens }) => {
  // const navigate = useNavigate();
  let [doPhanGiai, setDoPhanGiai] = useState("");
  const [loaiManHinh, setLoaiManHinh] = React.useState("");
  const [tanSoQuet, setTanSoQuet] = React.useState("");
  const [kichThuoc, setKichThuoc] = React.useState("");
  const [trangThai, setTrangThai] = React.useState(
    StatusCommonProductsNumber.ACTIVE
  );
  const [openDoPhanGiai, setOpenDoPhanGiai] = React.useState(false);
  const [chieuDai, setChieuDai] = React.useState("");
  const [chieuRong, setChieuRong] = React.useState("");
  const [listPhanGiai, setListPhanGiai] = useState([]);
  const handleChangeDoPhanGiai = (event) => {
    const selectedValue = event.target.value;
    setDoPhanGiai(selectedValue);
  };

  useEffect(() => {
    // Load data when the component mounts
    getDoPhanGiai();
  }, []);
  const getDoPhanGiai = () => {
    axios
      .get(apiURLDoPhanGiai)
      .then((response) => {
        setListPhanGiai(response.data.data);
      })
      .catch((error) => {});
  }, []);

  const [formSubmitDPG, setFormSubmitDPG] = useState(false);
  const [formSubmitMH, setFormSubmitMH] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [idDPG, setIdDPG] = useState(false);
  const handleChieuDai = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setChieuDai(value);
    }
  };
  const handleChieuRong = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setChieuRong(value);
    }
  };
  const handleTanSoQuet = (event, value) => {
    if (!isNaN(value)) {
      setTanSoQuet(value);
    }
  };
  const handleKichThuoc = (event, value) => {
    if (!isNaN(value)) {
      setKichThuoc(value);
    }
  };
  const handleLoaiManHinh = (event, value) => {
    setLoaiManHinh(value);
  };
  const handleClose = () => {
    // addDoPhanGiai();
  };
  const handleReset = () => {
    setChieuDai("");
    setChieuRong("");
    setValidationMsg({});
  };
  const handleReset1 = () => {
    setLoaiManHinh("");
    setDoPhanGiai("");
    setTanSoQuet("");
    setKichThuoc("");
    setValidationMsg({});
  };

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = screens.some(
      (products) =>
        products.loaiManHinh == loaiManHinh &&
        products.doPhanGiaiManHinh.id == doPhanGiai &&
        products.tanSoQuet == tanSoQuet &&
        products.kichThuoc == kichThuoc
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Màn hình đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (loaiManHinh.trim() === "") {
      msg.loaiManHinh = "Loại màn hình không được trống.";
    }

    if (doPhanGiai.trim() === "") {
      msg.doPhanGiai = "Độ phân giải không được trống.";
    }

    if (tanSoQuet.trim() === "") {
      msg.tanSoQuet = "Tần số quét không được trống.";
    }

    if (tanSoQuet < 1) {
      msg.tanSoQuet = "Tần số quét không được nhỏ hơn 1 Hz.";
    }
    if (tanSoQuet > 1000) {
      msg.tanSoQuet = "Tần số quét không được lớn hơn 1000 Hz.";
    }

    if (kichThuoc < 1) {
      msg.kichThuoc = "Kích thước màn hình không được nhỏ hơn 1.";
    }

    if (kichThuoc > 1000) {
      msg.kichThuoc = "Kích thước màn hình không được lớn hơn 1000 inches.";
    }

    if (!kichThuoc.trim("")) {
      msg.kichThuoc = "Kích thước màn hình không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addManHinh();
  };

  const [validationMsg1, setValidationMsg1] = useState({});

  const validationAll1 = () => {
    const msg = {};

    if (chieuDai < 0 || chieuDai > 10000) {
      msg.chieuDai = "Chiều cao màn hình nằm trong khoảng 0 - 10000 pixels.";
    }

    if (chieuRong < 0 || chieuRong > 10000) {
      msg.chieuRong = "Chiều rộng màn hình nằm trong khoảng 0 - 10000 pixels.";
    }

    if (!chieuDai.trim("")) {
      msg.chieuDai = "Chiều cao màn hình không được trống.";
    }

    if (!chieuRong.trim("")) {
      msg.chieuRong = "Chiều rộng màn hình không được trống.";
    }

    setValidationMsg1(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit1 = () => {
    const isValid = validationAll1();
    if (!isValid) return;
    addDoPhanGiai();
  };

  const addDoPhanGiai = () => {
    setFormSubmitDPG(true);
    let obj = {
      chieuDai: chieuDai,
      chieuRong: chieuRong,
    };
    if (!chieuDai || !chieuRong) {
      message.error("Vui lòng điền đủ thông tin");
      setOpenDoPhanGiai(true);
      return;
    }

    axios
      .post(apiURLDoPhanGiai + "/add", obj)
      .then((response) => {
        let newDoPhanGiai = {
          chieuDai: chieuDai,
          chieuRong: chieuRong,
        };
        setListPhanGiai([newDoPhanGiai, ...listPhanGiai]);
        getDoPhanGiai();
        handleOpenAlertVariant(
          "Thêm thành công độ phân giải màn hình",
          Notistack.SUCCESS
        );
        handleReset();
        setOpenDoPhanGiai(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Thêm thất bại độ phân giải màn hình",
          Notistack.ERROR
        );
      });
  };

  const addManHinh = () => {
    setFormSubmitMH(true);
    let obj = {
      loaiManHinh: loaiManHinh,
      doPhanGiaiManHinh: doPhanGiai,
      tanSoQuet: tanSoQuet,
      kichThuoc: kichThuoc,
      status: trangThai,
    };
    axios
      .post(apiURLDisplay + "/add", obj)
      .then((response) => {
        close();
        getAll();
        handleReset1();
        handleOpenAlertVariant("Thêm thành công màn hình", Notistack.SUCCESS);
        // setOpen(false);
      })
      .catch((error) => {
        handleOpenAlertVariant("Thêm thất bại màn hình", Notistack.ERROR);
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

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeStatus = (event) => {
    setTrangThai(event.target.value);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "40px",
        }}
      >
        <DialogContent className="">
          <div className="mt-4" style={{ width: "700px" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  THÊM MÀN HÌNH
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
                      <TextField
                        {...params}
                        label="Loại Màn Hình"
                        error={validationMsg.loaiManHinh !== undefined} // Áp dụng trạng thái lỗi
                        helperText={validationMsg.loaiManHinh}
                      />
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
                      error={validationMsg.doPhanGiai !== undefined}
                      onChange={handleChangeDoPhanGiai}
                      endAdornment={
                        <>
                          <InputAdornment
                            style={{ marginRight: "20px" }}
                            position="end"
                          >
                            <Tooltip
                              title="Thêm độ phân giải"
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
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "15px",
                    }}
                  >
                    {validationMsg.doPhanGiai}
                  </span>
                </div>
                <div className="mt-3">
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    options={uniqueTanSoQuet}
                    onInputChange={handleTanSoQuet}
                    inputValue={tanSoQuet}
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
                        error={validationMsg.tanSoQuet !== undefined}
                        helperText={validationMsg.tanSoQuet}
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
                    inputValue={kichThuoc}
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
                        error={validationMsg.kichThuoc !== undefined}
                        helperText={validationMsg.kichThuoc}
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
                      style={{
                        pointerEvents: "none",
                        opacity: 0.5,
                      }}
                      defaultValue={StatusCommonProductsNumber.ACTIVE}
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={StatusCommonProductsNumber.ACTIVE}>
                        Hoạt Động
                      </MenuItem>
                      <MenuItem value={StatusCommonProductsNumber.IN_ACTIVE}>
                        Ngừng Hoạt Động
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => {
                      close();
                      handleReset();
                      handleReset1();
                    }}
                    className="rounded-2 me-2 button-mui"
                    type="error"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <span
                      className=""
                      style={{ marginBottom: "2px", fontWeight: "500" }}
                    >
                      Hủy
                    </span>
                  </Button>
                  <Button
                    onClick={() => {
                      handleSubmit();
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
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
      <Dialog
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
        <DialogTitle className="text-center">{"THÊM ĐỘ PHÂN GIẢI"}</DialogTitle>
        <DialogContent className="" style={{ height: "auto", width: "450px" }}>
          <div className="mt-3"></div>
          <div className="mt-3">
            <TextField
              label="Chiều cao"
              value={chieuDai}
              id="fullWidth"
              onChange={handleChieuDai}
              error={validationMsg1.chieuDai !== undefined}
              helperText={validationMsg1.chieuDai}
              style={{ width: "100%" }}
              maxLength={5}
            />
          </div>
          <div className="mt-3">
            <TextField
              label="Chiều rộng"
              value={chieuRong}
              id="fullWidth"
              onChange={handleChieuRong}
              error={validationMsg1.chieuRong !== undefined}
              helperText={validationMsg1.chieuRong}
              style={{ width: "100%" }}
              maxLength={5}
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
            onClick={() => handleSubmit1()}
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
      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default CreateScreen;
