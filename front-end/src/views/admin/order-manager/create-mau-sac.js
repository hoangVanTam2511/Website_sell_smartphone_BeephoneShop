import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/randomCode";
import { Button } from "@mui/joy";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack, StatusCommonProductsNumber } from "./enum";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
// import Sketch from '@uiw/react-color-sketch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateMauSac = ({ open, close, getAll, colors }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const [colorName, setColorName] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [key, setKey] = useState(1);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = colors.some(
      (products) => products.tenMauSac === colorName
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Màu sắc đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (colorName.trim() === "") {
      msg.colorName = "Tên màu sắc không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addColor();
  };

  const addColor = () => {
    let obj = {
      ma: generateRandomCode(),
      tenMauSac: colorName,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/colors`, obj)
      .then((response) => {
        handleReset();
        close();
        getAll();
        handleOpenAlertVariant("Thêm thành công!!!", Notistack.SUCCESS);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleReset = () => {
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setColorName("");
    setValidationMsg({});
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
            <div className="container">
              <div className="text-center">
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  THÊM MÀU SẮC
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
                      <TextField
                        {...params}
                        label="Tên Màu Sắc"
                        error={validationMsg.colorName !== undefined}
                        helperText={validationMsg.colorName}
                      />
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
export default CreateMauSac;
