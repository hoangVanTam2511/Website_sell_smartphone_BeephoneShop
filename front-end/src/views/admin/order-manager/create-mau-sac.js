import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, Checkbox, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

const CreateMauSac = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [congSacs, setCongSacs] = React.useState([
    "USB Type-C",
    "Micro USB",
    "Lightning"
  ]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [sacs, setSacs] = useState([
    {
      ma: "091218273",
      congSuatSac: 120,
      congSuatSacNhanh: 200,
      congSuatSacKhongDay: 15,
      sacStatus: 0
    }
  ]);

  const uniqueCongSuatSac = sacs.map((option) => option.congSuatSac).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const uniqueCongSuatSacNhanh = sacs.map((option) => option.congSuatSacNhanh).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  const uniqueCongSuatSacKhongDay = sacs.map((option) => option.congSuatSacKhongDay).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [checkedSacNhanh, setCheckedSacNhanh] = React.useState(false);
  const [checkedSacKhongDay, setCheckedSacKhongDay] = React.useState(false);

  const handleChangeCheckedSacNhanh = (event) => {
    setCheckedSacNhanh(event.target.checked);
  };
  const handleChangeCheckedSacKhongDay = (event) => {
    setCheckedSacKhongDay(event.target.checked);
  };

  const [status, setStatus] = React.useState('');
  const [selectedSacs, setSelectedSacs] = React.useState([]);

  const handleChangeSelectedSacs = (event) => {
    setSelectedSacs(event.target.value);
  };

  return (
    <>
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: checkedSacKhongDay ? "430px" : "360px" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: checkedSacKhongDay ? "54.2vh" : "45vh", flexDirection: "column" }}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>THÊM SẠC</span>
          </div>
          <div style={{ width: "50%" }} className="mx-auto mt-3 pt-2">
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cổng Sạc</InputLabel>
                <Select className="custom"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={selectedSacs}
                  onChange={handleChangeSelectedSacs}
                  input={<OutlinedInput label="Cổng Sạc" />}
                  renderValue={(selected) => selected.join(', ')}
                  endAdornment={
                    <>
                      <InputAdornment style={{ marginRight: "20px" }} position="end">
                        <Tooltip title="Thêm cổng sạc" TransitionComponent={Zoom}>
                          <IconButton onClick={() => setOpen(true)} aria-label="delete" size="small">
                            <AddCircleOutlineIcon className='text-dark' />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    </>
                  }
                >
                  {congSacs.map((c) => (
                    <MenuItem key={c} value={c}>
                      <Checkbox checked={selectedSacs.indexOf(c) > -1} />
                      <ListItemText primary={c} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mt-3" style={{}}>
              {!checkedSacNhanh ?
                <Autocomplete fullWidth className="custom"
                  id="free-solo-demo"
                  freeSolo
                  options={uniqueCongSuatSac}
                  renderInput={(params) => <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment:
                        (
                          <>
                            <InputAdornment style={{ marginLeft: "5px" }} position="start">Watt</InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                    }}
                    label="Công Suất Sạc" />}
                />
                :
                <Autocomplete fullWidth className="custom"
                  id="free-solo-demo"
                  freeSolo
                  options={uniqueCongSuatSacNhanh}
                  renderInput={(params) => <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment:
                        (
                          <>
                            <InputAdornment style={{ marginLeft: "5px" }} position="start">Watt</InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                    }}
                    label="Công Suất Sạc Nhanh" />}
                />
              }
            </div>
            <div className="mt-3" style={{}}>
              {checkedSacKhongDay &&
                <Autocomplete fullWidth className="custom"
                  id="free-solo-demo"
                  freeSolo
                  options={uniqueCongSuatSac}
                  renderInput={(params) => <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment:
                        (
                          <>
                            <InputAdornment style={{ marginLeft: "5px" }} position="start">Watt</InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                    }}
                    label="Công Suất Sạc Không Dây" />}
                />
              }
            </div>
            <div className="mt-3 d-flex">
              <div>
                <FormControlLabel control={<Checkbox onChange={handleChangeCheckedSacNhanh} checked={checkedSacNhanh} />} label="Sạc Nhanh" />
              </div>
              <div className="ms-3">
                <FormControlLabel control={<Checkbox onChange={handleChangeCheckedSacKhongDay} checked={checkedSacKhongDay} />} label="Sạc Không Dây" />
              </div>
            </div>
            <div className="mt-4 pt-1 d-flex justify-content-end">
              <Button
                // onClick={handleCreateNewOrderPending}
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
        <DialogTitle>{"THÊM CỔNG SẠC"}</DialogTitle>
        <DialogContent className="" style={{ height: "90px" }}>
          <div className="mt-2 d-flex">
            <div>
              <Autocomplete className="custom"
                id="free-solo-demo"
                sx={{ width: "400px" }}
                freeSolo
                options={uniqueCongSuatSac}
                renderInput={(params) => <TextField
                  {...params}
                  label="Tên Cổng Sạc" />}
              />
            </div>
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
export default CreateMauSac;
