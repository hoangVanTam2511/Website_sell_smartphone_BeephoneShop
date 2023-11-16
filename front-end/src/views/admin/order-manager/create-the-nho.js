import React from "react";
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
import { StatusCommonProductsNumber } from "./enum";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTheNho = ({ open, close, getAll, theNhos }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [loaiTheNho, setLoaiTheNho] = React.useState("");
  const [dungLuongToiDa, setDungLuongToiDa] = React.useState("");
  const [status, setStatus] = React.useState(StatusCommonProductsNumber.ACTIVE);

  const addTheNho = () => {
    let obj = {
      ma: generateRandomCode(),
      loaiTheNho: loaiTheNho,
      dungLuongToiDa: dungLuongToiDa,
      status: status,
    };
    axios
      .post(`http://localhost:8080/api/the-nhos`, obj)
      .then((response) => {
        close();
        getAll();
        handleReset();
      })
      .catch((error) => {
        console.log("add thất bại");
      });
  };

  const handleReset = (event) => {
    setStatus(StatusCommonProductsNumber.ACTIVE);
    setLoaiTheNho("");
    setDungLuongToiDa("");
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeLoaiTheNho = (event, value) => {
    setLoaiTheNho(value);
  };

  const handleChangeDungLuongToiDa = (event, value) => {
    setDungLuongToiDa(value);
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
                      <TextField {...params} label="Loại Thẻ Nhớ" />
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
                      d
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
                    onClick={() => addTheNho()}
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
