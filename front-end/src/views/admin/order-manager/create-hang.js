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
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack } from "./enum";

const CreateHang = ({ close, getAll, hangs }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [tenHang, setTenHang] = React.useState("");
  const [status, setStatus] = React.useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const addHang = () => {
    let obj = {
      ma: generateRandomCode(),
      tenHang: tenHang,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/brands`, obj)
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
    setTenHang("");
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeHang = (event, value) => {
    setTenHang(value);
  };

  const uniqueHang = hangs
    .map((option) => option.tenHang)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  return (
    <>
      <div className="mt-4" style={{ width: "700px" }}>
        <div className="container" style={{}}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
              THÊM HÃNG
            </span>
          </div>
          <div className="mx-auto mt-3 pt-2">
            <div>
              <Autocomplete
                fullWidth
                className="custom"
                id="free-solo-demo"
                freeSolo
                inputValue={tenHang}
                onInputChange={handleChangeHang}
                options={uniqueHang}
                renderInput={(params) => (
                  <TextField {...params} label="Tên Hãng" />
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
                onClick={() => addHang()}
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
export default CreateHang;
