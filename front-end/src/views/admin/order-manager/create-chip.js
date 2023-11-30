import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Empty, Table } from "antd";
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
} from "@mui/material";
import axios from "axios";
import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/randomCode";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack, StatusCommonProductsNumber } from "./enum";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreateChip = ({ open, close, getAll, chips }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const [tenChip, setTenChip] = React.useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    if (!tenChip.trim("")) {
      msg.tenChip = "Tên chip không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addChip();
  };

  const addChip = () => {
    let obj = {
      ma: generateRandomCode(),
      tenChip: tenChip,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/chips`, obj)
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
    setTenChip("");
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeChip = (event, value) => {
    setTenChip(value);
  };

  const uniqueChip = chips
    .map((option) => option.tenChip)
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
                  THÊM CHIP
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={tenChip}
                    onInputChange={handleChangeChip}
                    options={uniqueChip}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tên Chip"
                        error={validationMsg.tenChip !== undefined}
                        helperText={validationMsg.tenChip}
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
export default CreateChip;
