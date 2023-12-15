import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Autocomplete,
  InputAdornment,
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
import axios from "axios";
import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/randomCode";
import {
  Notistack,
  StatusCommonProductsNumber,
  TypeCameraNumber,
} from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConvertCameraTypeToString } from "../../../utilities/convertEnum";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateCameraTruoc = ({ open, close, getAll, cameraFront }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cameraType, setCameraType] = React.useState(
    TypeCameraNumber.STANDARD_CAMERA
  );
  const [doPhanGiai, setDoPhanGiai] = React.useState("");
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDoPhanGiai = (event, value) => {
    setDoPhanGiai(value);
  };

  const handleChangeCameraType = (event) => {
    setCameraType(event.target.value);
  };

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = cameraFront.some(
      (camera) =>
        camera.doPhanGiai === Number(doPhanGiai) &&
        camera.cameraType === ConvertCameraTypeToString(cameraType)
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Camera đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (isNaN(doPhanGiai) || doPhanGiai < 1 || doPhanGiai > 10000) {
      msg.doPhanGiai = "Độ phân giải phải là số và từ 1 đến 10000 Megapixels";
    }

    if (doPhanGiai.trim() === "") {
      msg.doPhanGiai = "Độ phân giải không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addCameraFront();
  };

  const addCameraFront = () => {
    let obj = {
      ma: generateRandomCode(),
      doPhanGiai: doPhanGiai,
      cameraType: cameraType,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/camera-fronts`, obj)
      .then((response) => {
        close();
        getAll();
        handleReset();
        handleOpenAlertVariant("Thêm thành công!!!", Notistack.SUCCESS);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleReset = (event) => {
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setDoPhanGiai("");
    setCameraType("");
  };

  const uniqueDoPhanGiai = cameraFront
    .map((option) => option.doPhanGiai)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

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
          marginBottom: "170px",
        }}
      >
        <DialogContent className="">
          <div className="mt-4" style={{ width: "700px", height: "auto" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  THÊM CAMERA TRƯỚC
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div className="d-flex">
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={doPhanGiai}
                    onInputChange={handleChangeDoPhanGiai}
                    options={uniqueDoPhanGiai}
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
                                <span className="">Megapixel</span>
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
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
                      <MenuItem value={TypeCameraNumber.STANDARD_CAMERA}>
                        Standard Camera
                      </MenuItem>
                      <MenuItem value={TypeCameraNumber.WIDE_CAMERA}>
                        Wide Camera
                      </MenuItem>
                      <MenuItem value={TypeCameraNumber.ULTRA_WIDE_CAMERA}>
                        Ultra Wide Camera
                      </MenuItem>
                      <MenuItem value={TypeCameraNumber.TELEPHOTO_CAMERA}>
                        Telephoto Camera
                      </MenuItem>
                      <MenuItem
                        value={TypeCameraNumber.PERISCOPE_TELEPHOTO_CAMERA}
                      >
                        Periscope Telephoto Camera
                      </MenuItem>
                      <MenuItem value={TypeCameraNumber.MARCO_CAMERA}>
                        Marco Camera
                      </MenuItem>
                      <MenuItem value={TypeCameraNumber.DEPTH_CAMERA}>
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
                      // disabled={true}
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Trạng Thái"
                      onChange={handleChangeStatus}
                      defaultValue={StatusCommonProductsNumber.ACTIVE}
                      style={{
                        pointerEvents: "none",
                        opacity: 0.5,
                      }}
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
                      close();
                      handleReset();
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
      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default CreateCameraTruoc;
