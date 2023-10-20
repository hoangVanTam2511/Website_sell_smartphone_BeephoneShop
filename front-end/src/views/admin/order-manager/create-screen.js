import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, Checkbox, FormControlLabel, Autocomplete, InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Zoom from '@mui/material/Zoom';
import * as dayjs from "dayjs";
import LoadingIndicator from '../../../utilities/loading';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateScreen = ({ close }) => {
  const navigate = useNavigate();
  const [doPhanGiai, setDoPhanGiai] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [screens, setScreens] = useState([
    {
      ma: "091238612",
      loaiManHinh: "AMOLED",
      tanSoQuet: 120,
      kichThuoc: 6.5,
      doPhanGiai: "1080 x 1900",
      screenStatus: 1,
    },
    {
      ma: "091238612",
      loaiManHinh: "Lipo",
      tanSoQuet: 120,
      doPhanGiai: "1080 x 1900",
      kichThuoc: 6.5,
      screenStatus: 1,
    }
  ]);

  const uniqueTanSoQuet = screens.map((option) => option.tanSoQuet).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const uniqueKichThuoc = screens.map((option) => option.kichThuoc).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const uniqueLoaiManHinh = screens.map((option) => option.loaiManHinh).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [status, setStatus] = React.useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDoPhanGiai = (event) => {
    setDoPhanGiai(event.target.value);
  };

  return (
    <>
      <div className="mt-4" style={{width: "700px" }}>
        <div className="container" style={{}}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>THÊM MÀN HÌNH</span>
          </div>
          <div className="mx-auto mt-3 pt-2">
            <div>
              <Autocomplete fullWidth className="custom"
                id="free-solo-demo"
                freeSolo
                options={uniqueLoaiManHinh}
                renderInput={(params) => <TextField
                  {...params}
                  label="Loại Màn Hình" />}
              />
            </div>
            <div className="mt-3">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Độ Phân Giải</InputLabel>
                <Select className="custom"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={doPhanGiai}
                  label="Độ Phân Giải"
                  onChange={handleChangeDoPhanGiai}
                  endAdornment={
                    <>
                      <InputAdornment style={{ marginRight: "20px" }} position="end">
                        <Tooltip title="Thêm độ phân giải" TransitionComponent={Zoom}>
                          <IconButton onClick={() => setOpen(true)} aria-label="delete" size="small">
                            <AddCircleOutlineIcon className='text-dark' />
                          </IconButton>
                        </Tooltip>

                      </InputAdornment>
                    </>
                  }
                >
                  <MenuItem value={0}>1080 x 1980</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mt-3">
              <Autocomplete fullWidth className="custom"
                id="free-solo-demo"
                freeSolo
                options={uniqueTanSoQuet}
                renderInput={(params) => <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment:
                      (
                        <>
                          <InputAdornment style={{ marginLeft: "5px" }} position="start">Hz</InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                  }}
                  label="Tần Số Quét" />}
              />
            </div>
            <div className="mt-3">
              <Autocomplete fullWidth className="custom"
                id="free-solo-demo"
                freeSolo
                options={uniqueKichThuoc}
                renderInput={(params) => <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment:
                      (
                        <>
                          <InputAdornment style={{ marginLeft: "5px" }} position="start">inches</InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                  }}
                  label="Màn Hình Rộng" />}
              />
            </div>
            <div className="mt-3" style={{}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                <Select className="custom"
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
            <div className="mt-4 pt-1 d-flex justify-content-end">
              <Button
                onClick={() => close()}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "170px",
        }}
      >
        <DialogTitle>{"THÊM ĐỘ PHÂN GIẢI"}</DialogTitle>
        <DialogContent className="" style={{ height: "160px" }}>
          <div className="mt-2 d-flex">
            <div>
              <Autocomplete className="custom"
                sx={{ width: "200px" }}
                id="free-solo-demo"
                freeSolo
                options={uniqueTanSoQuet}
                renderInput={(params) => <TextField
                  {...params}
                  label="Chiều Rộng" />}
              />
            </div>
            <div className="ms-4">
              <Autocomplete className="custom"
                id="free-solo-demo"
                sx={{ width: "200px" }}
                freeSolo
                options={uniqueTanSoQuet}
                renderInput={(params) => <TextField
                  {...params}
                  label="Chiều Dài" />}
              />
            </div>
          </div>
          <div className="mt-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Độ Phân Giải</InputLabel>
              <Select className="custom"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Độ Phân Giải"
                onChange={handleChangeStatus}
              >
                <MenuItem value={0}>AMOLED</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="rounded-2 button-mui me-3"
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
        </DialogActions>
        <div className="mt-3"></div>
      </Dialog>
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default CreateScreen;
