import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, Checkbox, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, Rating, } from "@mui/material";
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
import CloseIcon from '@mui/icons-material/Close';
import { ClearIcon } from "@mui/x-date-pickers";

const CreateCameraSau = ({ close }) => {
  const navigate = useNavigate();

  const [cameras, setCameras] = useState([
    {
      ma: "091218273",
      doPhanGiai: 48,
      status: 0
    }
  ]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [doPhanGiai, setDoPhanGiai] = React.useState(false);


  const [status, setStatus] = React.useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const uniqueDoPhanGiai = cameras.map((option) => option.doPhanGiai).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return (
    <>
      <div className="mt-4" style={{ width: "700px", height: "auto" }}>
        <div className="container" style={{}}>
          <div className="text-center" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>THÊM CAMERA SAU</span>
          </div>
          <div className="mx-auto mt-3 pt-2">
            <div className="d-flex">
              <Autocomplete fullWidth className="custom"
                id="free-solo-demo"
                options={uniqueDoPhanGiai}
                renderInput={(params) => <TextField className=""
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment:
                      (
                        <>
                          <InputAdornment style={{ marginLeft: "5px" }} position="start">
                            <span className="">Megapixel</span>
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                  }}
                  label="Độ Phân Giải" />}
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

  {/*
                    endAdornment:
                      (
                        <>
                          <InputAdornment style={{ marginLeft: "" }} position="end">
                            <Tooltip title="Camera chính" TransitionComponent={Zoom}>
                              <IconButton onClick={() => {
                                if (value === null) {
                                  setValue(1);
                                }
                                else {
                                  setValue(null);
                                }
                              }} size="small" className="me-1" style={{ marginBottom: "3px" }}>
                                <Rating
                                  style={{ fontSize: "23px", color: "" }}
                                  max={1}
                                  name="simple-controlled"
                                  readOnly
                                  value={value}
                                />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                          {params.InputProps.endAdornment}
                        </>
                      ),

  const [autoCompletes, setAutoCompletes] = useState([null]);


  const handleAddAutoComplete = () => {
    setAutoCompletes([...autoCompletes, null]);
  };

  const handleAutoCompleteChange = (index, value) => {
    const updatedAutoCompletes = [...autoCompletes];
    updatedAutoCompletes[index] = value;
    setAutoCompletes(updatedAutoCompletes);
  };

  const handleGetAllValues = () => {
    const allValues = autoCompletes.map((value) => value || '');
    console.log(allValues);
  };
  const [value, setValue] = React.useState(1);
*/}

}
export default CreateCameraSau;
