import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, Checkbox, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, Rating, } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
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
const ITEM_HEIGHT = 130;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateProduct = ({ close }) => {
  const [value, setValue] = React.useState(1);
  const [ratings, setRatings] = useState([]);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [colorName, setColorName] = useState([
    "White Smoke", "Black"
  ]);
  const [camerasSau, setCamerasSau] = useState([
    "200MP", "48MP", "12MP", "20MP",
    "220MP", "18MP", "22MP", "30MP"
  ]);
  const [categorys, setCategorys] = useState([
    {
      id: 1,
      content: "Chơi Game, Cấu Hình Cao",
    },
    {
      id: 2,
      content: "Pin Trâu",
    },
    {
      id: 3,
      content: "Livestream",
    },
    {
      id: 4,
      content: "Chụp Ảnh, Quay Phim",
    },
    {
      id: 5,
      content: "Mỏng nhẹ",
    },
  ]);

  const [selectedCameraSau, setSelectedCameraSau] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const handleChangeSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
    alert(event.target.value)
  };

  const handleChangeSelectedCameraSau = (event) => {
    const value = event.target.value
    setSelectedCameraSau(value);

  };

  const handleToggleRating = (camera) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [camera]: !prevRatings[camera],
    }));
  };

  const handleRemoveRating = (camera) => {
    setRatings((prevRatings) => {
      const newRatings = prevRatings.filter((item) => item !== camera);
      return newRatings;
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [products, setProducts] = useState([
    {
      ma: "091218273",
      tenSanPham: "Iphone 14 Pro Max",
    },
    {
      ma: "091218273",
      tenSanPham: "Iphone 12 Pro",
    },
    {
      ma: "091218273",
      tenSanPham: "Samsung Galaxy Ultra 23",
    },
    {
      ma: "091218273",
      tenSanPham: "Xiaomi K40 Pro",
    },
  ]);
  const [colors, setColors] = useState([
    {
      ma: "091218273",
      tenMauSac: "White Smoke",
      status: 0
    }
  ]);


  const uniqueTenSanPham = products.map((option) => option.tenSanPham).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });


  const [isLoading, setIsLoading] = React.useState(false);

  const [status, setStatus] = React.useState();
  const [brand, setBrand] = React.useState('');
  const [opera, setOpera] = React.useState('');
  const [chip, setChip] = React.useState('');
  const handleChangeChip = (event) => {
    setChip(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleChangeOpera = (event) => {
    setOpera(event.target.value);
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
*/}
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: "600px" }}>
        <div className="container" style={{}}>
          <div className="mx-auto" style={{ maxWidth: "70%" }}>
            <div className="text-center pt-4" style={{}}>
              <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>THÊM SẢN PHẨM</span>
            </div>
            <div className="mt-4">
              <Autocomplete fullWidth className="custom"
                id="free-solo-demo"
                freeSolo
                options={uniqueTenSanPham}
                renderInput={(params) => <TextField
                  {...params}
                  label="Tên Sản Phẩm" />}
              />
            </div>
            <div className="mt-4">
              <TextField fullWidth multiline maxRows={1} inputProps={{ style: { height: "50px" } }} className="custom" id="outlined-basic" label="Mô Tả" variant="outlined" />
            </div>
            <div className="mt-4 d-flex">
              <div className="" style={{ width: "100%" }}>
                <FormControl fullWidth sx={{ width: 270 }}>
                  <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedCategory}
                    onChange={handleChangeSelectedCategory}
                    input={<OutlinedInput label="Danh Mục" />}
                    renderValue={(selected) => selected.map(id => {
                      const category = categorys.find(c => c.id === id);
                      return category ? category.content : '';
                    }).join(', ')}
                  >
                    {categorys.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        <Checkbox checked={selectedCategory.indexOf(c.id) > -1} />
                        <ListItemText primary={c.content} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Hãng</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brand}
                    label="Hãng"
                    onChange={handleChangeBrand}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm hệ điều hành" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AddCircleOutlineIcon className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    <MenuItem value={0}>Apple</MenuItem>
                    <MenuItem value={1}>Xiaomi</MenuItem>
                    <MenuItem value={2}>Samsung</MenuItem>
                    <MenuItem value={3}>Oppo</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Chip</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chip}
                    label="Chip"
                    onChange={handleChangeChip}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm hệ điều hành" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AddCircleOutlineIcon className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    <MenuItem value={0}>Snapdragon 625</MenuItem>
                    <MenuItem value={1}>Apple A16</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4 d-flex">
              <div className="" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Camera Sau</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedCameraSau}
                    onChange={handleChangeSelectedCameraSau}
                    input={<OutlinedInput label="Camera Sau" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm hệ điều hành" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AddCircleOutlineIcon className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    {camerasSau.map((c) => (
                      <MenuItem key={c} value={c}>
                        <Checkbox checked={selectedCameraSau.indexOf(c) > -1} />
                        <ListItemText primary={c} />
                        {selectedCameraSau.indexOf(c) > -1 ?

                          <Tooltip title="Đặt làm camera chính" TransitionComponent={Zoom} placement="left">
                            <IconButton onClick={(e) => {
                              handleToggleRating(c);
                              e.stopPropagation();
                            }} size="small" className="me-1" style={{ marginBottom: "3px" }}>
                              <Rating
                                style={{ fontSize: "23px", color: "" }}
                                max={1}
                                name="simple-controlled"
                                readOnly
                                value={ratings[c] ? 1 : 0}
                              />
                            </IconButton>
                          </Tooltip>
                          : ""}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Camera Trước</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Trạng Thái"
                    onChange={handleChangeStatus}
                    defaultValue={0}
                  >
                    <MenuItem value={0}>Kinh Doanh</MenuItem>
                    <MenuItem value={1}>Ngừng Kinh Doanh</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4 d-flex">
              <div className="" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Màn Hình</InputLabel>
                  <Select className="custom"
                    sx={{ maxWidth: "70%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brand}
                    label="Màn Hình"
                    onChange={handleChangeBrand}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm hệ điều hành" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AddCircleOutlineIcon className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    <MenuItem value={0}>Super Amoled (1920 x 1080 pixels) FULL HD</MenuItem>
                    <MenuItem value={1}>LCD (728 x 1420 pixels) HD</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Hệ Điều Hành</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={opera}
                    label="Hệ Điều Hành"
                    onChange={handleChangeOpera}
                  >
                    <MenuItem value={0}>Android</MenuItem>
                    <MenuItem value={1}>IOS</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Trạng Thái"
                    onChange={handleChangeStatus}
                    defaultValue={0}
                  >
                    <MenuItem value={0}>Kinh Doanh</MenuItem>
                    <MenuItem value={1}>Ngừng Kinh Doanh</MenuItem>
                  </Select>
                </FormControl>
              </div>
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
export default CreateProduct;
