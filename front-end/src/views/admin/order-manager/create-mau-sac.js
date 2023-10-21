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
// import Sketch from '@uiw/react-color-sketch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateMauSac = ({ close }) => {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  // const [hex, setHex] = useState("#fff");
  //
  const [colorName, setColorName] = useState([
    "White Smoke", "Black"
  ]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [colors, setColors] = useState([
    {
      ma: "091218273",
      tenMauSac: "White Smoke",
      status: 0
    }
  ]);

  const generateRandomCode = () => {
    const prefix = '2023';
    const randomSuffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const code = prefix + randomSuffix;
    return code;
  };

  const uniqueTenMauSac = colors.map((option) => option.tenMauSac).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });


  const [isLoading, setIsLoading] = React.useState(false);

  const [status, setStatus] = React.useState('');
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  // const [selectedSacs, setSelectedSacs] = React.useState([]);

  // const handleChangeSelectedSacs = (event) => {
  //   setSelectedSacs(event.target.value);
  // };

  return (
    <>
      {/*
              <div>
                <Sketch
                  style={{ marginLeft: 20 }}
                  color={hex}
                  onChange={(color) => {
                    setHex(color.hex);
                  }}
                />
              </div>
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
                  {colorName.map((c) => (
                    <MenuItem key={c} value={c}>
                      <Checkbox checked={selectedSacs.indexOf(c) > -1} />
                      <ListItemText primary={c} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
*/}
      <div className="mt-4" style={{ width: "700px" }}>
        <div className="container" style={{}}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>THÊM MÀU SẮC</span>
          </div>
          <div style={{}} className="mx-auto mt-3 pt-2">
            <div>
              <Autocomplete fullWidth className="custom"
                id="free-solo-demo"
                freeSolo
                options={uniqueTenMauSac}
                renderInput={(params) => <TextField
                  {...params}
                  label="Tên Màu Sắc" />}
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
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default CreateMauSac;
