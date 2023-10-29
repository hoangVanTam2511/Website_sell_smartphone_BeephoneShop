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
import { AiOutlinePlus } from "react-icons/ai";
import LoadingIndicator from '../../../utilities/loading';
import useCustomSnackbar from '../../../utilities/notistack';
import { Notistack } from "./enum";
import { MdOutlineAddToPhotos } from "react-icons/md";
import ModalCauHinh from "./modal-chon-cau-hinh";
import { Box as BoxJoy } from '@mui/joy';
import { Button as ButtonJoy } from '@mui/joy';
import { Card as CardJoy } from '@mui/joy';
import { Checkbox as CheckboxJoy } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { FaUpload } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
// import Sketch from '@uiw/react-color-sketch';

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

const UpdateProduct = ({ }) => {

  const handleGetBrand = async () => {
    await axios
      .get(`http://localhost:8080/api/brand`)
      .then(async (response) => {
        const data = response.data.ten;
        setBrand(data);
        setChip(data);
        setSelectKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetBrand();
    window.scrollTo(0, 800);
  }, []);
  const [cauHinhs, setCauHinhs] = useState([
    {
      id: 1,
      soLuongTonKho: 0,
      ram: {
        id: 1,
        dungLuong: 3
      },
      rom: {
        id: 1,
        dungLuong: 64
      },
      color: [
        { id: 1, tenMauSac: "YELLOW" },
        { id: 2, tenMauSac: "RED" },
      ]

    },
    {
      id: 2,
      soLuongTonKho: 0,
      ram: {
        id: 2,
        dungLuong: 4
      },
      rom: {
        id: 2,
        dungLuong: 128
      },
      color: [
        { id: 1, tenMauSac: "GREEN" },
        { id: 2, tenMauSac: "BLUE" },
        { id: 3, tenMauSac: "GRAY" },
        { id: 4, tenMauSac: "FK" },
      ]

    },
  ]);



  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>{cauHinhs.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      width: "30%",
      render: (text, record) => {
        return (
          <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>{'Iphone 14 Pro Max ' + record.ram.dungLuong + "/" + record.rom.dungLuong + "GB"}</span>
        )
      }
    },
    {
      title: "Màu Sắc",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>{record.color.tenMauSac}</span>
      ),
    },
    {
      title: "Số Lượng Tồn Kho",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.soLuongTonKho}
        </span>
      ),
    },
    {
      title: "Đơn Giá",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <TextField
          label="Đơn giá"
          id="outlined-size-small"
          size="small"
        />
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <div className="button-container">
            <Tooltip title="Import imei" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                }}
                className="me-2">
                <FaUpload color="#2f80ed" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                }}
                className="">
                <FaTrashAlt color="#e5383b" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];
  const CauHinhTable = ({ id }) => {
    const filterCauHinhs = cauHinhs.filter((item) => item.id === id);
    const objectsTachRa = filterCauHinhs.flatMap((cauHinh) => {
      return cauHinh.color.map((color) => {
        return {
          ...cauHinh,
          color: color,
        };
      });
    });

    return (
      <>
        <Table
          className="table-container mt-2"
          columns={columns}
          rowKey="id"
          key={"id"}
          dataSource={objectsTachRa}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };
  const generateRandomId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  };
  const handleRedirectUpdateProduct = () => {
    navigate(`/dashboard/update-product`);
    handleOpenAlertVariant("Xác nhận thêm sản phẩm thành công!", Notistack.SUCCESS);
  }
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [value, setValue] = React.useState(1);
  const [ratingsCameraTruoc, setRatingsCameraTruoc] = useState([]);
  const [ratingsCameraSau, setRatingsCameraSau] = useState([]);
  const [idCamera, setIdCamera] = useState('');

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [colorName, setColorName] = useState([
    "White Smoke", "Black"
  ]);
  const [camerasTruoc, setCamerasTruoc] = useState([
    {
      id: 1,
      doPhanGiai: 20,
    },
    {
      id: 22,
      doPhanGiai: 20,
    },
    {
      id: 2,
      doPhanGiai: 128,
    },
    {
      id: 3,
      doPhanGiai: 108,
    },
    {
      id: 4,
      doPhanGiai: 48,
    },
    {
      id: 5,
      doPhanGiai: 20,
    },
    {
      id: 6,
      doPhanGiai: 12,
    },
    {
      id: 7,
      doPhanGiai: 5,
    },
  ]);
  const [camerasSau, setCamerasSau] = useState([
    {
      id: 1,
      doPhanGiai: 20,
    },
    {
      id: 22,
      doPhanGiai: 20,
    },
    {
      id: 2,
      doPhanGiai: 128,
    },
    {
      id: 3,
      doPhanGiai: 108,
    },
    {
      id: 4,
      doPhanGiai: 48,
    },
    {
      id: 5,
      doPhanGiai: 20,
    },
    {
      id: 6,
      doPhanGiai: 12,
    },
    {
      id: 7,
      doPhanGiai: 5,
    },
  ]);

  const [sims, setSims] = useState([
    {
      id: 1,
      loaiTheSim: "1 Nano SIM",
      multipleSim: 1,
    },
    {
      id: 2,
      loaiTheSim: "2 Nano SIM",
      multipleSim: 2,
    },
    {
      id: 3,
      loaiTheSim: "1 eSIM",
      multipleSim: 1,
    },
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
  const [selectedCameraTruoc, setSelectedCameraTruoc] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [selectedSim, setSelectecSim] = React.useState([]);

  const handleChangeSelectedSim = (event) => {
    const { value } = event.target;
    const selectedSimLength = value.length;

    if (selectedSimLength > 2) {
      handleOpenAlertVariant("Chỉ được chọn tối đa 2 SIM", "warning");
      return;
    }
    if (selectedSimLength === 2 && sims.find(sim => sim.id === value[1]).multipleSim === 2) {
      handleOpenAlertVariant("Chỉ được chọn tối đa 2 SIM", "warning");
      return;
    }
    if (selectedSimLength === 2 && sims.find(sim => sim.id === value[0]).multipleSim === 2) {
      handleOpenAlertVariant("Chỉ được chọn tối đa 2 SIM", "warning");
      return;
    }
    setSelectecSim(event.target.value);
  };
  const handleChangeSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeSelectedCameraTruoc = (event) => {
    const value = event.target.value
    setSelectedCameraTruoc(value);

    const updatedRatings = {};
    camerasTruoc.forEach((camera) => {
      const isCameraSelected = selectedCameraTruoc.indexOf(camera.id) > -1;
      updatedRatings[camera.id] = isCameraSelected ? ratingsCameraTruoc[camera.id] || false : false;
    });
    setRatingsCameraTruoc(updatedRatings);

  };

  const handleChangeSelectedCameraSau = (event) => {
    const value = event.target.value
    setSelectedCameraSau(value);

    const updatedRatings = {};
    camerasSau.forEach((camera) => {
      const isCameraSelected = selectedCameraSau.indexOf(camera.id) > -1;
      updatedRatings[camera.id] = isCameraSelected ? ratingsCameraSau[camera.id] || false : false;
    });
    setRatingsCameraSau(updatedRatings);

  };

  const handleToggleRatingCameraTruoc = (cameraId) => {
    setRatingsCameraTruoc((prevRatings) => {
      const updatedRatings = { ...prevRatings };
      Object.keys(updatedRatings).forEach((key) => {
        if (key !== cameraId) {
          updatedRatings[key] = false;
        }
      });
      return {
        ...updatedRatings,
        [cameraId]: !prevRatings[cameraId],
      };
    });
  };

  const handleToggleRatingCameraSau = (cameraId) => {
    setRatingsCameraSau((prevRatings) => {
      const updatedRatings = { ...prevRatings };
      Object.keys(updatedRatings).forEach((key) => {
        if (key !== cameraId) {
          updatedRatings[key] = false;
        }
      });
      return {
        ...updatedRatings,
        [cameraId]: !prevRatings[cameraId],
      };
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

  const listSortCameraSau = camerasSau.sort((a, b) => b.doPhanGiai - a.doPhanGiai);
  const listSortCameraTruoc = camerasTruoc.sort((a, b) => b.doPhanGiai - a.doPhanGiai);


  const [isLoading, setIsLoading] = React.useState(false);

  const [status, setStatus] = React.useState();
  const [brand, setBrand] = React.useState();
  const [opera, setOpera] = React.useState();
  const [chip, setChip] = React.useState();
  const [screen, setScreen] = React.useState();
  const [pin, setPin] = React.useState();
  const [congSac, setCongSac] = React.useState();
  const [theSim, setTheSim] = React.useState();
  const [network, setNetwork] = React.useState();
  const [theNho, setTheNho] = React.useState();
  const handleChangeNetword = (event) => {
    setNetwork(event.target.value);
  };
  const handleChangeCongSac = (event) => {
    setCongSac(event.target.value);
  };
  const handleChangeTheSim = (event) => {
    setTheSim(event.target.value);
  };
  const handleChangePin = (event) => {
    setPin(event.target.value);
  };
  const handleChangeScreen = (event) => {
    setScreen(event.target.value);
  };
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

  const [selectKey, setSelectKey] = useState(0);

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
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: "735px" }}>
        <div className="container" style={{}}>
          <div className="mx-auto" style={{ maxWidth: "70%" }}>
            <div className="text-center pt-4" style={{}}>
              <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>CẬP NHẬT SẢN PHẨM</span>
            </div>
            <div className="mt-3">
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
                <FormControl fullWidth sx={{ width: 262 }}>
                  <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedCategory}
                    onChange={handleChangeSelectedCategory}
                    input={<OutlinedInput label="Danh Mục" />}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm hệ điều hành" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
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
                    key={selectKey}

                    value={brand}
                    label="Hãng"
                    onChange={handleChangeBrand}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm hệ điều hành" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
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
                    key={selectKey}
                    label="Chip"
                    onChange={handleChangeChip}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm hệ điều hành" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
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
                  <InputLabel id="demo-simple-select-label">Pin</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pin}
                    label="Pin"
                    onChange={handleChangePin}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm pin" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    <MenuItem value={0}>Li-po 5000 mAh</MenuItem>
                    <MenuItem value={1}>Li-ion 5500 mAh</MenuItem>
                    <MenuItem value={2}>Polymer 4000 mAh</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cổng Sạc</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={congSac}
                    label="Cổng Sạc"
                    onChange={handleChangeCongSac}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm pin" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    <MenuItem value={0}>USB Type-C</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Thẻ Nhớ</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={network}
                    label="Thẻ Nhớ"
                    onChange={handleChangeNetword}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm pin" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    <MenuItem value={0}>MicroSD</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4 d-flex">
              <div className="" style={{ width: "100%" }}>
                <FormControl fullWidth sx={{ width: 402 }}>
                  <InputLabel id="demo-simple-select-label">Camera Sau</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedCameraSau}
                    onChange={handleChangeSelectedCameraSau}
                    input={<OutlinedInput label="Camera Sau" />}
                    renderValue={(selected) => {
                      const selectedCameras = selected.map(id => camerasSau.find(c => c.id === id)).filter(Boolean);
                      const mainCamera = selectedCameras.find(camera => ratingsCameraSau[camera.id]);
                      const otherCameras = selectedCameras.filter(camera => !ratingsCameraSau[camera.id]);

                      const renderCameraText = (camera, isMain) => {
                        const cameraText = camera.doPhanGiai + "MP";
                        if (isMain) {
                          return `Chính ${cameraText}`;
                        } else {
                          return cameraText;
                        }
                      };

                      let renderedCameras = [];

                      if (mainCamera) {
                        renderedCameras.push(renderCameraText(mainCamera, true));
                      }

                      if (otherCameras.length > 0) {
                        const otherCamerasText = otherCameras.map(camera => renderCameraText(camera, false)).join(', ');
                        if (renderedCameras.length > 0) {
                          renderedCameras[0] += ` & Phụ ${otherCamerasText}`;
                        } else {
                          renderedCameras.push(`Phụ ${otherCamerasText}`);
                        }
                      }

                      return renderedCameras.join(', ');
                    }}
                    MenuProps={MenuProps}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm camera sau" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    {listSortCameraSau.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        <Checkbox checked={selectedCameraSau.indexOf(c.id) > -1} />
                        <ListItemText primary={c.doPhanGiai + "MP"} />
                        {selectedCameraSau.indexOf(c.id) > -1 ?
                          <>
                            <Tooltip
                              title={ratingsCameraSau[c.id] ? "Bỏ đặt làm camera chính" : "Đặt làm camera chính"}
                              TransitionComponent={Zoom} placement="right-end">
                              <IconButton onClick={(e) => {
                                handleToggleRatingCameraSau(c.id);
                                e.stopPropagation();
                              }} size="small" className="me-1" style={{ marginBottom: "3px" }}
                              >
                                <Rating
                                  style={{ fontSize: "23px", color: "" }}
                                  max={1}
                                  name="simple-controlled"
                                  readOnly
                                  value={ratingsCameraSau[c.id] ? 1 : 0}
                                />
                              </IconButton>
                            </Tooltip>
                          </>
                          : ""}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth sx={{ width: 402 }}>
                  <InputLabel id="demo-simple-select-label">Camera Trước</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedCameraTruoc}
                    onChange={handleChangeSelectedCameraTruoc}
                    input={<OutlinedInput label="Camera Trước" />}
                    renderValue={(selected) => {
                      const selectedCameras = selected.map(id => camerasTruoc.find(c => c.id === id)).filter(Boolean);
                      const mainCamera = selectedCameras.find(camera => ratingsCameraTruoc[camera.id]);
                      const otherCameras = selectedCameras.filter(camera => !ratingsCameraTruoc[camera.id]);

                      const renderCameraText = (camera, isMain) => {
                        const cameraText = camera.doPhanGiai + "MP";
                        if (isMain) {
                          return `Chính ${cameraText}`;
                        } else {
                          return cameraText;
                        }
                      };

                      let renderedCameras = [];

                      if (mainCamera) {
                        renderedCameras.push(renderCameraText(mainCamera, true));
                      }

                      if (otherCameras.length > 0) {
                        const otherCamerasText = otherCameras.map(camera => renderCameraText(camera, false)).join(', ');
                        if (renderedCameras.length > 0) {
                          renderedCameras[0] += ` & Phụ ${otherCamerasText}`;
                        } else {
                          renderedCameras.push(`Phụ ${otherCamerasText}`);
                        }
                      }

                      return renderedCameras.join(', ');
                    }}
                    MenuProps={MenuProps}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm camera sau" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    {listSortCameraTruoc.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        <Checkbox checked={selectedCameraTruoc.indexOf(c.id) > -1} />
                        <ListItemText primary={c.doPhanGiai + "MP"} />
                        {selectedCameraTruoc.indexOf(c.id) > -1 ?
                          <>
                            <Tooltip
                              title={ratingsCameraTruoc[c.id] ? "Bỏ đặt làm camera chính" : "Đặt làm camera chính"}
                              TransitionComponent={Zoom} placement="right-end">
                              <IconButton onClick={(e) => {
                                handleToggleRatingCameraTruoc(c.id);
                                e.stopPropagation();
                              }} size="small" className="me-1" style={{ marginBottom: "3px" }}
                              >
                                <Rating
                                  style={{ fontSize: "23px", color: "" }}
                                  max={1}
                                  name="simple-controlled"
                                  readOnly
                                  value={ratingsCameraTruoc[c.id] ? 1 : 0}
                                />
                              </IconButton>
                            </Tooltip>
                          </>
                          : ""}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4 d-flex">
              <div className="" style={{ width: "100%" }}>
                <FormControl fullWidth sx={{ width: 402 }}>
                  <InputLabel id="demo-simple-select-label">Màn Hình</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={screen}
                    label="Màn Hình"
                    onChange={handleChangeScreen}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm màn hình" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                  >
                    <MenuItem value={0}>Super Amoled (1920 x 1080 pixels) 6.5"</MenuItem>
                    <MenuItem value={1}>Amoled (728 x 1420 pixels) 7"</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth sx={{ width: 402 }}>
                  <InputLabel id="demo-simple-select-label">Thẻ SIM</InputLabel>
                  <Select className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedSim}
                    onChange={handleChangeSelectedSim}
                    input={<OutlinedInput label="Thẻ SIM" />}
                    endAdornment={
                      <>
                        <InputAdornment style={{ marginRight: "15px" }} position="end">
                          <Tooltip title="Thêm thẻ SIM" TransitionComponent={Zoom}>
                            <IconButton /* onClick={() => setOpen(true)} */ size="small">
                              <AiOutlinePlus className='text-dark' />
                            </IconButton>
                          </Tooltip>

                        </InputAdornment>
                      </>
                    }
                    renderValue={(selected) => selected.map(id => {
                      const sim = sims.find(c => c.id === id);
                      return sim ? sim.loaiTheSim : '';
                    }).join(' & ')}
                  >
                    {sims.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        <Checkbox checked={selectedSim.indexOf(c.id) > -1} />
                        <ListItemText primary={c.loaiTheSim} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-4 d-flex mx-auto" style={{ width: "65%" }}>
              <div className="" style={{ width: "100%" }}>
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
            <div className="mt-4 d-flex justify-content-end">
              <Button
                onClick={handleRedirectUpdateProduct}
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
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: "auto" }}>
        <div className="container" style={{}}>
          <div className="mx-auto" style={{ maxWidth: "70%" }}>
            <div className="text-center pt-4" style={{}}>
              <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>CẤU HÌNH</span>
            </div>
          </div>
          {cauHinhs.length > 0 && cauHinhs.map((item) => {
            return (
              <div className={"mt-3 mx-auto"} style={{ width: "95%" }}>
                <>
                  <CardJoy
                    orientation={'vertical'}
                    variant="outlined"
                    sx={{ width: '100%', maxWidth: '100%', gap: 1.5 }}
                  >
                    <div className="d-flex justify-content-between">
                      <span className="mt-1" style={{ fontWeight: "550", fontSize: "22px" }}>CẤU HÌNH {' ' + item.ram.dungLuong + "/" + item.rom.dungLuong + "GB"}</span>
                      <Button
                        onClick={handleClickOpen}
                        className="rounded-2 button-mui"
                        type="primary"
                        style={{ height: "40px", width: "auto", fontSize: "15px" }}
                      >
                        <span
                          className=""
                          style={{ marginBottom: "2px", fontWeight: "500" }}
                        >
                          Cập Nhật
                        </span>
                      </Button>
                    </div>
                    <Divider sx={{ backgroundColor: 'gray', height: "1.5px" }} />
                    <BoxJoy sx={{ display: 'contents' }}>
                      <CauHinhTable id={item.id} />
                    </BoxJoy>
                  </CardJoy>
                </>
              </div>
            )
          })}
          <div className={cauHinhs.length > 0 ? 'mt-4 text-center' : 'mt-3 text-center'}>
            <Button
              onClick={handleClickOpen}
              className="rounded-2 button-mui"
              type="primary"
              style={{ height: "40px", width: "auto", fontSize: "15px" }}
            >
              <span
                className=""
                style={{ marginBottom: "2px", fontWeight: "500" }}
              >
                CHỌN CẤU HÌNH
              </span>
            </Button>
          </div>
        </div>
        <div style={{ height: "25px" }}></div>
      </div>
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: "auto" }}>
        <div className="container" style={{}}>
          <div className="mx-auto" style={{ maxWidth: "70%" }}>
            <div className="text-center pt-4" style={{}}>
              <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>ẢNH</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <Button
              onClick={handleClickOpen}
              className="rounded-2 button-mui"
              type="primary"
              style={{ height: "40px", width: "auto", fontSize: "15px" }}
            >
              <span
                className=""
                style={{ marginBottom: "2px", fontWeight: "500" }}
              >
                UPLOAD ẢNH
              </span>
            </Button>
          </div>
        </div>
        <div style={{ height: "25px" }}></div>
      </div>
      <div className="mt-4"></div>
      {isLoading && <LoadingIndicator />}
      <ModalCauHinh open={open} close={handleClose} />
    </>
  )

}
export default UpdateProduct;
