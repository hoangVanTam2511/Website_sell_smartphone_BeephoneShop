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
import generateRandomCode from "../../../utilities/randomCode";
import { Button } from "@mui/joy";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack, StatusCommonProducts } from "./enum";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import { request } from '../../../store/helpers/axios_helper'
// import Sketch from '@uiw/react-color-sketch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateMauSac = ({ close1, getAll1, colors1, colorById }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [colorCode, setColorCode] = useState(colorById.ma);
  const [status, setStatus] = React.useState(colorById.status);
  const [colorName, setColorName] = useState(colorById.tenMauSac);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  React.useEffect(() => {
    // Cập nhật state dựa trên dữ liệu mới khi colorById thay đổi
    if (colorById) {
      setColorCode(colorById.ma);
      setStatus(colorById.status);
      setColorName(colorById.tenMauSac);
    }
    console.log(colorById.status);
  }, [colorById]);

  const handleOpenDialogConfirmAdd = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmAdd = () => {
    setOpenConfirm(false);
  };

  const Header = () => {
    return (
      <>
        <span style={{ fontWeight: "bold" }}>Xác nhận sửa màu sắc</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>
          Bạn có chắc chắc muốn sửa mã màu{" "}
          <span style={{ color: "red" }}>"{colors1.ma}"</span> không ?
        </span>
      </>
    );
  };

  const updateColor = () => {
    let obj = {
      ma: colorCode,
      tenMauSac: colorName,
      status: status,
    };
    request('PUT',`/api/colors}`, obj)
      .then((response) => {
        close1();
        getAll1();
        handleReset();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleReset = () => {
    setStatus("");
    setColorName("");
  };

  const uniqueTenMauSac = colors1
    .map((option) => option.tenMauSac)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeColor = (event, value) => {
    setColorName(value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <div className="mt-4" style={{ width: "700px" }}>
        <div className="container">
          <div className="text-center">
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
              SỬA MÀU SẮC
            </span>
          </div>
          <div className="mx-auto mt-3 pt-2">
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

            <div className="mt-3">
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
                onClick={() => handleOpenDialogConfirmAdd()}
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
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseDialogConfirmAdd}
        add={updateColor}
        title={<Title />}
        header={<Header />}
      />
      {isLoading && <LoadingIndicator />}
    </>
  );
};
export default UpdateMauSac;
