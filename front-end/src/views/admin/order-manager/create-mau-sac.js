import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Empty, Table } from "antd";
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
import generateRandomCode from "../../../utilities/randomCode ";
import { Button } from "@mui/joy";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack } from "./enum";
// import Sketch from '@uiw/react-color-sketch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateMauSac = ({ close, getAll, colors }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [colorName, setColorName] = useState();
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const addColor = () => {
    let obj = {
      ma: generateRandomCode(),
      tenMauSac: colorName,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/colors`, obj)
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
    setStatus("");
    setColorName("");
  };

  const uniqueTenMauSac = colors
    .map((option) => option.tenMauSac)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeColor = (event, value) => {
    setColorName(value);
  };

  return (
    <>
      <div className="mt-4" style={{ width: "700px" }}>
        <div className="container" style={{}}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
              THÊM MÀU SẮC
            </span>
          </div>
          <div style={{}} className="mx-auto mt-3 pt-2">
            <div style={{ display: "flex" }}>
              <Autocomplete
                fullWidth
                className="custom"
                id="free-solo-demo"
                freeSolo
                inputValue={colorName}
                onInputChange={handleChangeColor}
                options={uniqueTenMauSac}
                renderInput={(params) => (
                  <TextField {...params} label="Tên Màu Sắc" />
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
                onClick={() => addColor()}
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
export default CreateMauSac;
