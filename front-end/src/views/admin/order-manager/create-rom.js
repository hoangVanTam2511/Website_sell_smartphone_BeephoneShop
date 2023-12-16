import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Empty, Table } from "antd";
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
import { Notistack, StatusCommonProductsNumber } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { request } from "../../../store/helpers/axios_helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateRom = ({ open, close, getAll, roms }) => {
  const navigate = useNavigate();
  const [kichThuoc, setKichThuoc] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const uniqueRom = roms
    .map((option) => option.dungLuong)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeRom = (event, value) => {
    setKichThuoc(value);
  };

  const handleReset = (event) => {
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setKichThuoc("");
    setValidationMsg({});
  };

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = roms.some(
      (products) => products.dungLuong == kichThuoc
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Kích thước rom đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (kichThuoc.trim() === "") {
      msg.kichThuoc = "Kích thước rom không được trống.";
    }

    if (kichThuoc < 1) {
      msg.kichThuoc = "Kích thước rom không được nhỏ hơn 1 GB.";
    }

    if (kichThuoc > 3000) {
      msg.kichThuoc = "Kích thước rom không được lớn hơn 3000 GB.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addRoms();
  };

  const addRoms = () => {
    let obj = {
      ma: generateRandomCode(),
      dungLuong: kichThuoc,
      status: status,
    };
    request("POST", `/api/roms`, obj)
      .then((response) => {
        close();
        getAll();
        handleReset();
        handleOpenAlertVariant("Thêm thành công", Notistack.SUCCESS);
      })
      .catch((error) => {
        handleOpenAlertVariant("Thêm thất bại", Notistack.ERROR);
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
                  THÊM ROM
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={kichThuoc}
                    onInputChange={handleChangeRom}
                    options={uniqueRom}
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
                                GB
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        label="Kích thước ROM"
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
                      value={status}
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
export default CreateRom;
