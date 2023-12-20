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
import { Notistack, StatusCommonProductsNumber } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { request } from "../../../store/helpers/axios_helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTheNho = ({ open, close, getAll, theNhos }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [loaiTheNho, setLoaiTheNho] = React.useState("");
  const [dungLuongToiDa, setDungLuongToiDa] = React.useState("");
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = theNhos.some(
      (products) =>
        products.loaiTheNho === loaiTheNho &&
        products.dungLuongToiDa == dungLuongToiDa
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Thẻ nhớ đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (loaiTheNho.trim() === "") {
      msg.loaiTheNho = "Loại thẻ nhớ không được trống.";
    }

    if (dungLuongToiDa < 1) {
      msg.dungLuongToiDa = "Dung lượng tối đa không được nhỏ hơn 1 GB.";
    }

    if (dungLuongToiDa > 300000) {
      msg.dungLuongToiDa = "Dung lượng tối đa không được lớn hơn 300.000 GB.";
    }

    if (!dungLuongToiDa.trim("")) {
      msg.dungLuongToiDa = "Dung lượng tối đa không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addTheNho();
  };

  const addTheNho = () => {
    let obj = {
      ma: generateRandomCode(),
      loaiTheNho: loaiTheNho,
      dungLuongToiDa: dungLuongToiDa,
      status: status,
    };
    request("POST", `/api/the-nhos`, obj)
      .then((response) => {
        close();
        getAll();
        handleReset();
        handleOpenAlertVariant("Thêm thẻ nhớ thành công", Notistack.SUCCESS);
      })
      .catch((error) => {
        handleOpenAlertVariant("Thêm thẻ nhớ thất bại", Notistack.ERROR);
      });
  };

  const handleReset = (event) => {
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setLoaiTheNho("");
    setDungLuongToiDa("");
    setValidationMsg({});
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeLoaiTheNho = (event, value) => {
    setLoaiTheNho(value);
  };

  const handleChangeDungLuongToiDa = (event, value) => {
    const cleanedValue = value.replace(/\D/g, "");
    setDungLuongToiDa(cleanedValue);
  };

  const uniqueLoaiTheNho = theNhos
    .map((option) => option.loaiTheNho)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const uniqueDungLuongToiDa = theNhos
    .map((option) => option.dungLuongToiDa)
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
                  THÊM THẺ NHỚ
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={loaiTheNho}
                    onInputChange={handleChangeLoaiTheNho}
                    options={uniqueLoaiTheNho}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Loại Thẻ Nhớ"
                        error={validationMsg.loaiTheNho !== undefined}
                        helperText={validationMsg.loaiTheNho}
                      />
                    )}
                  />
                </div>

                <div className="mt-3">
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo-s1"
                    freeSolo
                    inputValue={dungLuongToiDa}
                    onInputChange={handleChangeDungLuongToiDa}
                    options={uniqueDungLuongToiDa}
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
                        label="Dung Lượng Tối Đa"
                        error={validationMsg.dungLuongToiDa !== undefined}
                        helperText={validationMsg.dungLuongToiDa}
                      />
                    )}
                  />
                </div>

                {/* <div className="mt-3">
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
export default CreateTheNho;
