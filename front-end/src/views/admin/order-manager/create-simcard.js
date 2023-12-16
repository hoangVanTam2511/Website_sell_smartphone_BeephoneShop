import React, { useState } from "react";
import { Button, message } from "antd";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Slide,
  Dialog,
  DialogContent,
} from "@mui/material";
import axios from "axios";
// import LoadingIndicator from "../../../utilities/loading";
import { apiURLSimCard } from "../../../service/api";
import { Notistack, SimMultiple, StatusCommonProductsNumber } from "./enum";

import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/genCode";
import useCustomSnackbar from "../../../utilities/notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateSimCard = ({ open, close, getAll, sims }) => {
  // const navigate = useNavigate();
  const [loaiTheSim, setLoaiTheSim] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkedDualSim, setCheckedDualSim] = React.useState(false);
  const [checkedSingleSim, setCheckedSingleSim] = React.useState(true);
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const uniqueLoaiTheSim = sims
    .map((option) => option.loaiTheSim)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeCheckedSingleSim = (event) => {
    setCheckedSingleSim(event.target.checked);
  };
  const handleChangeCheckedDualSim = (event) => {
    setCheckedDualSim(event.target.checked);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeLoai = (event, value) => {
    setLoaiTheSim(value);
  };

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate =
      sims.some((products) => products.loaiTheSim == loaiTheSim) &&
      sims.some((products) => products.simMultiple == loaiTheSim);

    if (isDuplicate) {
      handleOpenAlertVariant("Loại thẻ sim đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (loaiTheSim.trim() === "") {
      msg.loaiTheSim = "Loại thẻ sim không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addTheSim();
  };

  const addTheSim = () => {
    let simObjects = [];
    if (checkedSingleSim && checkedDualSim) {
      // Nếu cả hai loại SIM được chọn, tạo hai đối tượng và thêm vào danh sách
      const simObject1 = {
        ma: generateRandomCode(),
        loaiTheSim: loaiTheSim,
        status: status,
        simMultiple: SimMultiple.SINGLE_SIM,
      };

      const simObject2 = {
        ma: "TS" + generateRandomCode(),
        loaiTheSim: loaiTheSim,
        status: status,
        simMultiple: SimMultiple.DUAL_SIM,
      };

      simObjects.push(simObject1, simObject2);
    } else if (checkedSingleSim) {
      // Nếu chỉ một trong hai loại SIM được chọn hoặc không có SIM nào được chọn, tạo một đối tượng và thêm vào danh sách
      const simObject = {
        ma: "TS" + generateRandomCode(),
        loaiTheSim: loaiTheSim,
        status: status,
        simMultiple: SimMultiple.SINGLE_SIM,
      };
      simObjects.push(simObject);
    } else {
      // Nếu chỉ một trong hai loại SIM được chọn hoặc không có SIM nào được chọn, tạo một đối tượng và thêm vào danh sách
      const simObject = {
        ma: "TS" + generateRandomCode(),
        loaiTheSim: loaiTheSim,
        status: status,
        simMultiple: SimMultiple.SINGLE_SIM,
      };
      simObjects.push(simObject);
    }
    axios
      .post(apiURLSimCard + "/add", simObjects)
      .then((response) => {
        close();
        getAll();
        handleReset();
        handleOpenAlertVariant("Thêm thành công thẻ sim", Notistack.ERROR);
      })
      .catch((error) => {
        handleOpenAlertVariant("Thêm thất bại thẻ sim", Notistack.ERROR);
      });
  };
  const handleReset = (event) => {
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setLoaiTheSim("");
    setCheckedSingleSim(true);
    setCheckedDualSim(false);
    setValidationMsg({});
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
                  THÊM THẺ SIM
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    options={uniqueLoaiTheSim}
                    inputValue={loaiTheSim}
                    onInputChange={handleChangeLoai}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Loại Thẻ SIM"
                        error={validationMsg.loaiTheSim !== undefined}
                        helperText={validationMsg.loaiTheSim}
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
                <div className="mt-3 d-flex">
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChangeCheckedSingleSim}
                          checked={checkedSingleSim}
                        />
                      }
                      label="1 SIM"
                    />
                  </div>
                  <div className="ms-3">
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChangeCheckedDualSim}
                          checked={checkedDualSim}
                        />
                      }
                      label="2 SIM"
                    />
                  </div>
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
export default CreateSimCard;
