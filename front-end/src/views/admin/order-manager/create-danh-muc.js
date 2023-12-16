import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Autocomplete,
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/randomCode";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack, StatusCommonProductsNumber } from "./enum";
import axios from "axios";
import { request } from "../../../store/helpers/axios_helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreateDanhMuc = ({ open, close, getAll, danhMucs }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const [tenDanhMuc, setTenDanhMuc] = React.useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = danhMucs.some(
      (products) => products.tenDanhMuc === tenDanhMuc
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Tên danh mục đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (tenDanhMuc.trim() === "") {
      msg.tenDanhMuc = "Tên danh mục không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addDanhMuc();
  };

  const addDanhMuc = () => {
    let obj = {
      ma: generateRandomCode(),
      tenDanhMuc: tenDanhMuc,
      status: status,
    };
    request("POST", `/api/danh-mucs`, obj)
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
    setTenDanhMuc("");
    setValidationMsg({});
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeDanhMuc = (event, value) => {
    setTenDanhMuc(value);
  };

  const uniqueDanhMuc = danhMucs
    .map((option) => option.tenDanhMuc)
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
          <div className="mt-4" style={{ width: "700px" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  THÊM DANH MỤC
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={tenDanhMuc}
                    onInputChange={handleChangeDanhMuc}
                    options={uniqueDanhMuc}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tên Danh Mục"
                        error={validationMsg.tenDanhMuc !== undefined}
                        helperText={validationMsg.tenDanhMuc}
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
                      value={status}
                      label="Trạng Thái"
                      onChange={handleChangeStatus}
                      style={{
                        pointerEvents: "none",
                        opacity: 0.5,
                      }}
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
                </div> */}
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
export default CreateDanhMuc;
