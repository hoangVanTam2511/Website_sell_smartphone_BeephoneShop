import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Autocomplete,
  DialogContent,
  Slide,
  Dialog,
  Select,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/randomCode";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack, StatusCommonProductsNumber } from "../order-manager/enum";
import { request } from '../../../store/helpers/axios_helper'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreateRank = ({ open, close, getAll, ranks }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const [tenRank, setTenRank] = React.useState("");
  const [dieuKienToiDa, setDieuKienToiDa] = React.useState(0);
  const [dieuKienToiThieu, setDieuKienToiThieu] = React.useState(0);
  const [uuDai, setUuDai] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");

  const { handleOpenAlertVariant } = useCustomSnackbar();

  const addRank = () => {
    let obj = {
      ten: tenRank,
      dieuKienToiDa: dieuKienToiDa,
      dieuKienToiThieu: dieuKienToiThieu,
      uuDai: uuDai,
      status: status,
    };
    request('POST',`/rank/addRank`, obj)
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

  const handleReset = () => {
    setValue1("");
    setValue2("");
    setValue("");
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setTenRank("");
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeTenRank = (event, value) => {
    setTenRank(value);
  };
  const handleChangeDieuKienToiDaRank = (event, value) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue2(formattedValue);
    setDieuKienToiDa(numericValue);
  };
  const handleChangeDieuKienToiThieuRank = (event, value) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(formattedValue);
    setDieuKienToiThieu(numericValue);
  };
  const handleChangeUuDaiRank = (event, value) => {
    let inputValue = event.target.value;
    // Loại bỏ các ký tự không phải số
    inputValue = inputValue.replace(/\D/g, "");
    // Xử lý giới hạn giá trị từ 1 đến 100
    if (isNaN(inputValue) || inputValue < 1) {
      inputValue = "0";
    } else if (inputValue > 100) {
      inputValue = "100";
    }
    setValue(inputValue);
    setUuDai(inputValue);
  };

  const uniqueRank = ranks
    .map((option) => option.ten)
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
                  THÊM RANK
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={tenRank}
                    onInputChange={handleChangeTenRank}
                    options={uniqueRank}
                    renderInput={(params) => (
                      <TextField {...params} label="Tên Rank" />
                    )}
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    fullWidth
                    className="custom"
                    id="outlined-end-adornment"
                    label="Điều kiện tối thiểu"
                    // freeSolo
                    value={value1}
                    onChange={handleChangeDieuKienToiThieuRank}
                    InputProps={{
                      inputMode: "numeric",
                      endAdornment: (
                        <InputAdornment position="end">VND</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    fullWidth
                    label="Điều kiện tối đa"
                    className="custom"
                    id="outlined-end-adornment"
                    // freeSolo
                    value={value2}
                    onChange={handleChangeDieuKienToiDaRank}
                    InputProps={{
                      inputMode: "numeric",
                      endAdornment: (
                        <InputAdornment position="end">VND</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    fullWidth
                    label="Ưu Đãi"
                    className="custom"
                    id="outlined-end-adornment"
                    // freeSolo
                    value={value}
                    onChange={handleChangeUuDaiRank}
                    InputProps={{
                      inputMode: "numeric",
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
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
                      defaultValue={StatusCommonProductsNumber.ACTIVE}
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
                    onClick={() => addRank()}
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
export default CreateRank;
