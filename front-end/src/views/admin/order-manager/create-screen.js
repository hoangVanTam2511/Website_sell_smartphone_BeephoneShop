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
import { StatusCommonProductsNumber } from "./enum";

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
    axios
      .get(apiURLDoPhanGiai)
      .then((response) => {
        setListPhanGiai(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const [formSubmitDPG, setFormSubmitDPG] = useState(false);
  const [formSubmitMH, setFormSubmitMH] = useState(false);
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
  const handleClose = () => {
    addDoPhanGiai();
  };
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

  const addDoPhanGiai = () => {
    setFormSubmitDPG(true);
    let obj = {
      chieuDai: chieuDai,
      chieuRong: chieuRong,
    };
    if (!chieuDai || !chieuRong) {
      // message.error("Vui lòng điền đủ thông tin");
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
        message.success("Thêm thành công");
        handleReset();
        setOpenDoPhanGiai(false);
        // redirectToHienThiKH(generatedMaKhachHang);
      })
      .catch((error) => {
        alert("Thêm thất bại");
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
        message.success("Thêm thành công");

        // setOpen(false);
      })
      .catch((error) => {
        console.log("add thất bại");
      });
  };

  const uniqueTanSoQuet = screens
    .map((option) => option.tanSoQuet)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const uniqueKichThuoc = screens
    .map((option) => option.kichThuoc)
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
                      value={trangThai}
                      label="Trạng Thái"
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
                </div>
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => {
                      addManHinh();
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
        <DialogContent className="" style={{ height: "180px", width: "350px" }}>
          <div className="mt-3"></div>
          <div className="mt-3">
            <TextField
              label="Chiều dài"
              value={chieuDai}
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
              value={chieuRong}
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
            onClick={handleClose}
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
