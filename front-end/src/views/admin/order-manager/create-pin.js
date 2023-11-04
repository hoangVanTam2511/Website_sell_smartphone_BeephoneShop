import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Empty, Table } from "antd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
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
import generateRandomCode from "../../../utilities/randomCode ";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack } from "./enum";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePin = ({ open, close, getAll, pins }) => {
  const navigate = useNavigate();
  const [dungLuong, setDungLuong] = useState("");
  const [loaiPin, setLoaiPin] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const handleChangeDungLuong = (event, value) => {
    setDungLuong(value);
  };

  const handleChangePin = (event, value) => {
    setLoaiPin(value);
  };

  const uniqueDungLuong = pins
    .map((option) => option.dungLuong)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const uniqueLoaiPin = pins
    .map((option) => option.loaiPin)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleReset = (event) => {
    setStatus("");
    setLoaiPin("");
    setDungLuong("");
  };

  const addPins = () => {
    let obj = {
      ma: generateRandomCode(),
      loaiPin: loaiPin,
      dungLuong: dungLuong,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/pins`, obj)
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
          marginBottom: "100px",
        }}
      >
        <DialogContent className="">
          <div className="mt-4" style={{ width: "700px" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
                  THÊM PIN
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
                    onInputChange={handleChangePin}
                    options={uniqueLoaiPin}
                    renderInput={(params) => (
                      <TextField {...params} label="Loại PIN" />
                    )}
                  />
                </div>
                <div className="mt-3">
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={dungLuong}
                    onInputChange={handleChangeDungLuong}
                    options={uniqueDungLuong}
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
                                mAh
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        label="Dung Lượng PIN"
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
                    >
                      <MenuItem value={0}>Hoạt Động</MenuItem>
                      <MenuItem value={1}>Ngừng Hoạt Động</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => addPins()}
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
export default CreatePin;
