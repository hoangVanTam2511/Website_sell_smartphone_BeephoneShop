import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  InputAdornment,
  Dialog,
  DialogContent,
  Slide,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/randomCode";
import { Notistack, StatusCommonProductsNumber } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateRam = ({ open, close, getAll, rams }) => {
  const navigate = useNavigate();
  const [kichThuoc, setKichThuoc] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const uniqueRam = rams
    .map((option) => option.dungLuong)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeRam = (event, value) => {
    setKichThuoc(value);
  };

  const handleReset = (event) => {
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setKichThuoc("");
  };

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = rams.some(
      (products) => products.dungLuong == kichThuoc
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Kích thước ram đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (kichThuoc.trim() === "") {
      msg.kichThuoc = "Kích thước ram không được trống.";
    }

    if (kichThuoc < 1) {
      msg.kichThuoc = "Kích thước ram không được nhỏ hơn 1 GB.";
    }

    if (kichThuoc > 3000) {
      msg.kichThuoc = "Kích thước ram không được lớn hơn 3000 GB.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addRams();
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();

  const addRams = () => {
    let obj = {
      ma: generateRandomCode(),
      dungLuong: kichThuoc,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/rams`, obj)
      .then((response) => {
        close();
        getAll();
        handleReset();
        handleOpenAlertVariant("Thêm thành công!", Notistack.SUCCESS);
      })
      .catch((error) => {
        handleOpenAlertVariant("Thêm thất bại!", Notistack.ERROR);
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
                  THÊM RAM
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
                    onInputChange={handleChangeRam}
                    options={uniqueRam}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              <InputAdornment
                                style={{ marginLeft: "5px" }}
                                position="end"
                              >
                                GB
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        label="Kích thước RAM"
                        error={validationMsg.kichThuoc !== undefined}
                        helperText={validationMsg.kichThuoc}
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
export default CreateRam;
