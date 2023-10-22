import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Empty, Table } from "antd";
import {
  Box,
  FormControl,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  Pagination,
  TextField,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  InputAdornment,
  OutlinedInput,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Slide,
  ListItemText,
  Rating,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Zoom from "@mui/material/Zoom";
import * as dayjs from "dayjs";
import LoadingIndicator from "../../../utilities/loading";
import CloseIcon from "@mui/icons-material/Close";
import { ClearIcon } from "@mui/x-date-pickers";
import generateRandomCode from "../../../utilities/randomCode ";
import { StatusCommonProductsNumber, TypeCameraNumber } from "./enum";

const CreateCameraSau = ({ close, getAll, cameraRear }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cameraType, setCameraType] = React.useState("");
  const [doPhanGiai, setDoPhanGiai] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDoPhanGiai = (event, value) => {
    setDoPhanGiai(value);
  };

  const handleChangeCameraType = (event) => {
    setCameraType(event.target.value);
  };

  const addCameraRear = () => {
    let obj = {
      ma: generateRandomCode(),
      cameraType: cameraType,
      doPhanGiai: doPhanGiai,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/camera-rears`, obj)
      .then((response) => {
        close();
        getAll();
        handleReset();
        alert("add thành công");
      })
      .catch((error) => {
        alert("add thất bại");
      });
  };

  const handleReset = (event) => {
    setStatus("");
    setDoPhanGiai("");
    setCameraType("");
  };

  const uniqueDoPhanGiai = cameraRear
    .map((option) => option.doPhanGiai)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  return (
    <>
      <div className="mt-4" style={{ width: "700px", height: "auto" }}>
        <div className="container" style={{}}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
              THÊM CAMERA SAU
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
                      startAdornment: (
                        <>
                          <InputAdornment
                            style={{ marginLeft: "5px" }}
                            position="start"
                          >
                            <span className="">Megapixel</span>
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                    label="Độ Phân Giải"
                  />
                )}
              />
            </div>

            <div className="mt-3" style={{}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tính Năng</InputLabel>
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
                  <MenuItem value={TypeCameraNumber.PERISCOPE_TELEPHOTO_CAMERA}>
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
                  className="custom"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Trạng Thái"
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
                onClick={() => addCameraRear()}
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
      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default CreateCameraSau;
