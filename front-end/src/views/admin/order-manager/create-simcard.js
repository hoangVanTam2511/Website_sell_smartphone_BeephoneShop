import React from "react";
// import {
//   useNavigate,

// } from "react-router-dom";
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
import { SimMultiple } from "./enum";

import LoadingIndicator from "../../../utilities/loading";
import generateRandomCode from "../../../utilities/genCode";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateSimCard = ({ open, close, getAll, sims }) => {
  // const navigate = useNavigate();

  const [loaiTheSim, setLoaiTheSim] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const uniqueLoaiTheSim = sims
    .map((option) => option.loaiTheSim)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const [checkedDualSim, setCheckedDualSim] = React.useState(false);
  const [checkedSingleSim, setCheckedSingleSim] = React.useState(true);

  const handleChangeCheckedSingleSim = (event) => {
    setCheckedSingleSim(event.target.checked);
  };
  const handleChangeCheckedDualSim = (event) => {
    setCheckedDualSim(event.target.checked);
  };

  const [status, setStatus] = React.useState("");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeLoai = (event, value) => {
    setLoaiTheSim(value);
  };
  const addTheSim = () => {
    let simObjects = [];
    if (checkedSingleSim && checkedDualSim) {
      // Nếu cả hai loại SIM được chọn, tạo hai đối tượng và thêm vào danh sách
      const simObject1 = {
        ma: "TS" + generateRandomCode(),
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
        message.success("Thêm thành công");
      })
      .catch((error) => {
        console.log("add thất bại");
      });
  };
  const handleReset = (event) => {
    setStatus("");
    setLoaiTheSim("");
    setCheckedSingleSim(true);
    setCheckedDualSim(false);
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
                <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
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
                      <TextField {...params} label="Loại Thẻ SIM" />
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
                    onClick={() => addTheSim()}
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
