import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, Checkbox, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, Rating, FormHelperText, } from "@mui/material";
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
import { Notistack, SimMultiple } from "./enum";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { Box as BoxJoy, getListDividerUtilityClass } from '@mui/joy';
import { Button as ButtonJoy } from '@mui/joy';
import { Card as CardJoy } from '@mui/joy';
import { Checkbox as CheckboxJoy } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { FaUpload } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import CreateHang from "./create-hang";
import CreateChip from "./create-chip";
import CreatePin from "./create-pin";
import CreateSac from "./create-sac";
import CreateTheNho from "./create-the-nho";
import CreateScreen from "./create-screen";
import CreateSimCard from "./create-simcard";
import CreateCauHinh from "./create-cau-hinh";
import generateRandomCode from "../../../utilities/genCode";
import { connectStorageEmulator } from "firebase/storage";
import useFormItemStatus from "antd/es/form/hooks/useFormItemStatus";
import CreateDanhMuc from "./create-danh-muc";
import CreateCameraSau from "./create-camera-sau";
import CreateCameraTruoc from "./create-camera-truoc";
import { brown } from "@mui/material/colors";
import { request } from '../../../store/helpers/axios_helper'
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

const CreateProduct = ({ }) => {
  let isOverplay = false;
  const getOverplay = (value) => {
    isOverplay = value;
  }

  const [confirm, setConfirm] = useState(false);

  const getConfirm = (value) => {
    setConfirm(value);
  }

  const [categorys, setCategorys] = useState([]);
  const getListDanhMuc = () => {
    request('GET', `/api/danh-mucs`)
      .then((response) => {
        setCategorys(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [openHang, setOpenHang] = useState(false);
  const [listHang, setListHang] = useState([]);
  const handleCloseOpenHang = () => {
    setOpenHang(false);
  }
  const getListHang = () => {
    request('GET', `/api/brands`)
      .then((response) => {
        setListHang(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [openChip, setOpenChip] = useState(false);
  const [listChip, setListChip] = useState([]);
  const handleCloseOpenChip = () => {
    setOpenChip(false);
  }
  const getListChip = () => {
    request('GET', `/api/chips`)
      .then((response) => {
        setListChip(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [openPin, setOpenPin] = useState(false);
  const [listPin, setListPin] = useState([]);
  const handleCloseOpenPin = () => {
    setOpenPin(false);
  }
  const getListPin = () => {
    request('GET', `/api/pins`)
      .then((response) => {
        setListPin(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [openSac, setOpenSac] = useState(false);
  const [listSac, setListSac] = useState([]);
  const handleCloseOpenSac = () => {
    setOpenSac(false);
  }
  const getListSac = () => {
    request('GET', `/api/chargers`)
      .then((response) => {
        setListSac(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [openTheNho, setOpenTheNho] = useState(false);
  const [listTheNho, setListTheNho] = useState([]);
  const handleCloseOpenTheNho = () => {
    setOpenTheNho(false);
  }
  const getListTheNho = () => {
    request('GET', `/api/the-nhos`)
      .then((response) => {
        setListTheNho(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [openManHinh, setOpenManHinh] = useState(false);
  const [listManHinh, setListManHinh] = useState([]);
  const handleCloseOpenManHinh = () => {
    setOpenManHinh(false);
  }
  const getListManHinh = () => {
    request('GET', `/api/display`)
      .then((response) => {
        setListManHinh(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [openDanhMuc, setOpenDanhMuc] = useState(false);
  const handleCloseOpenDanhMuc = () => {
    setOpenDanhMuc(false);
  }
  const [openTheSim, setOpenTheSim] = useState(false);
  const [listTheSim, setListTheSim] = useState([]);
  const handleCloseOpenTheSim = () => {
    setOpenTheSim(false);
  }
  const getListTheSim = () => {
    request('GET', `/api/sim-cards/all`)
      .then((response) => {
        setListTheSim(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    getListCameraTruoc();
    getListCameraSau();
    getListDanhMuc()
    getListTheSim();
    getListManHinh();
    getListTheNho();
    getListSac();
    getListPin();
    getListHang();
    getListChip();
    getProducts();
  }, [])

  const [selectKey, setSelectKey] = useState(0);

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
  const [counts, setCounts] = useState([]);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);


  const [camerasSau, setCamerasSau] = useState([]);
  const [camerasTruoc, setCamerasTruoc] = useState([]);
  const getListCameraTruoc = () => {
    request('GET', `/api/camera-fronts`)
      .then((response) => {
        setCamerasTruoc(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getListCameraSau = () => {
    request('GET', `/api/camera-rears`)
      .then((response) => {
        setCamerasSau(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const [openCameraSau, setOpenCameraSau] = useState(false);
  const [openCameraTruoc, setOpenCameraTruoc] = useState(false);


  const handleCloseOpenCameraTruoc = () => {
    setOpenCameraTruoc(false);
  }

  const handleCloseOpenCameraSau = () => {
    setOpenCameraSau(false);
  }


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
    if (selectedSimLength === 2 && listTheSim.find(sim => sim.id === value[1]).simMultiple === SimMultiple.DUAL_SIM) {
      handleOpenAlertVariant("Chỉ được chọn tối đa 2 SIM", "warning");
      return;
    }
    if (selectedSimLength === 2 && listTheSim.find(sim => sim.id === value[0]).simMultiple === SimMultiple.DUAL_SIM) {
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

  const [mainCameraTruoc, setMainCameraTruoc] = useState("");
  const handleToggleRatingCameraTruoc = (cameraId) => {
    setRatingsCameraTruoc((prevRatings) => {
      const updatedRatings = { ...prevRatings };
      Object.keys(updatedRatings).forEach((key) => {
        if (key !== cameraId) {
          updatedRatings[key] = false;
        }
      });
      const newRating = !prevRatings[cameraId];
      updatedRatings[cameraId] = newRating;
      const trueCameraId = Object.keys(updatedRatings).find((key) => updatedRatings[key] === true);
      setMainCameraTruoc(trueCameraId || "");

      return updatedRatings;
      // return {
      //   ...updatedRatings,
      //   [cameraId]: !prevRatings[cameraId],
      // };
    });
  };

  const [mainCameraSau, setMainCameraSau] = useState("");

  const handleToggleRatingCameraSau = (cameraId) => {
    setRatingsCameraSau((prevRatings) => {
      const updatedRatings = { ...prevRatings };
      Object.keys(updatedRatings).forEach((key) => {
        if (key !== cameraId) {
          updatedRatings[key] = false;
        }
      });
      const newRating = !prevRatings[cameraId];
      updatedRatings[cameraId] = newRating;
      const trueCameraId = Object.keys(updatedRatings).find((key) => updatedRatings[key] === true);
      setMainCameraSau(trueCameraId || "");

      return updatedRatings;
      // return {
      //   ...updatedRatings,
      //   [cameraId]: !prevRatings[cameraId],
      // };
    });
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [products, setProducts] = useState([]);
  const getProducts = () => {
    request('GET', `/api/products`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [productName, setProductName] = useState('');
  const handleOnInputChangeProductName = (event, value) => {
    setProductName(value);
  };

  const uniqueTenSanPham = products.map((option) => option.tenSanPham).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const listSortCameraSau = camerasSau.sort((a, b) => b.doPhanGiai - a.doPhanGiai);
  const listSortCameraTruoc = camerasTruoc.sort((a, b) => b.doPhanGiai - a.doPhanGiai);


  const [isLoading, setIsLoading] = React.useState(false);

  const [weight, setWeight] = React.useState('');

  const handleChangeWeight = (event) => {
    const value = event.target.value;
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
    setWeight(valueFinal);

  }
  const [status, setStatus] = React.useState();
  const [brand, setBrand] = React.useState('');
  const [brandName, setBrandName] = React.useState('');
  const [opera, setOpera] = React.useState();
  const [chip, setChip] = React.useState('');
  const [screen, setScreen] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [congSac, setCongSac] = React.useState('');
  const [theSim, setTheSim] = React.useState('');
  const [theNho, setTheNho] = React.useState('');
  const handleChangeTheSim = (event) => {
    setTheSim(event.target.value);
  };
  const handleChangeCongSac = (event) => {
    setCongSac(event.target.value);
  };
  const handleChangeTheNho = (event) => {
    setTheNho(event.target.value);
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
  const getTenHangById = (id) => {
    const hang = listHang.find((item) => item.id === id);
    return hang ? hang.tenHang : "";
  };
  const handleChangeBrand = (event) => {
    const { value } = event.target;
    setBrand(value);
    // setBrandName(getTenHangById(value));
    // if (getTenHangById(value) === "Apple"){
    //   setTheNho('');
    // }
  };
  const handleChangeOpera = (event) => {
    setOpera(event.target.value);
  };

  const convertCameraTruocs = selectedCameraTruoc.map((item) => {
    if (item === mainCameraTruoc) {
      return { id: item, isCameraMain: true };
    }
    return { id: item };
  });
  const convertCameraSaus = selectedCameraSau.map((item) => {
    if (item === mainCameraSau) {
      return { id: item, isCameraMain: true };
    }
    return { id: item };
  });

  const convertDanhMucs = selectedCategory.map((item) => {
    return { id: item };
  });

  const convertTheSims = selectedSim.map((item) => {
    return { id: item };
  });
  const theNhoObject = {
    theNho: theNho === "None" ? null : { id: theNho },
  };
  // const [selectedSacs, setSelectedSacs] = React.useState([]);

  // const handleChangeSelectedSacs = (event) => {
  //   setSelectedSacs(event.target.value);
  // };
  // const [product, setProduct] = useState({});
  const getProduct = () => {
    const request = {
      ma: generateRandomId(),
      tenSanPham: productName,
      operatingType: (opera === "" || opera === null || opera === undefined) ? 0 : 1,
      theSimDienThoais: convertTheSims,
      danhMucDienThoais: convertDanhMucs,
      cameraSauDienThoais: convertCameraSaus,
      cameraTruocDienThoais: convertCameraTruocs,
      congSac: {
        id: congSac,
      },
      moTa: "",
      hang: {
        id: brand,
      },
      chip: {
        id: chip,
      },
      manHinh: {
        id: screen,
      },
      theNho: {
        id: theNho === "None" ? null : theNho,
      },
      pin: { id: pin },
      trangThai: (status === "" || status === null || status === undefined) ? 0 : 1,
    }
    return request;
  }

  const product = getProduct();



  const handleValidation = () => {
    let isValid = true;
    if (productName.trim() === "") {
      isValid = false;
    }
    if (products.some((item) => item.tenSanPham === productName.trim())) {
      isValid = false;
    }
    if (selectedCategory.length === 0) {
      isValid = false;
    }
    if (selectedSim.length === 0) {
      isValid = false;
    }
    if (selectedCameraTruoc.length === 0) {
      isValid = false;
    }
    if (mainCameraTruoc === "") {
      isValid = false;
    }
    if (mainCameraSau === "") {
      isValid = false;
    }
    if (selectedCameraSau.length === 0) {
      isValid = false;
    }
    if (brand.trim() === "") {
      isValid = false;
    }
    if (chip.trim() === "") {
      isValid = false;
    }
    if (pin.trim() === "") {
      isValid = false;
    }
    if (congSac.trim() === "") {
      isValid = false;
    }
    if (screen.trim() === "") {
      isValid = false;
    }
    if (weight.trim() === "") {
      isValid = false;
    }
    return isValid;
  }



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
      <div style={{ pointerEvents: isOverplay === true ? "none" : "auto" }}>
        <div className={"mt-4"} style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010", height: confirm && !handleValidation() ? "800px" : "735px" }}>
          <div className="container" style={{}}>
            <div className="mx-auto" style={{ maxWidth: "70%" }}>
              <div className="text-center pt-4" style={{}}>
                <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>THÊM SẢN PHẨM</span>
              </div>
              <div className="mt-3">
                <Autocomplete fullWidth className="custom"
                  id="free-solo-demo"
                  freeSolo
                  options={uniqueTenSanPham}
                  inputValue={productName}
                  onInputChange={handleOnInputChangeProductName}
                  renderInput={(params) => <TextField
                    helperText={
                      (confirm && productName.trim() === "") ? "Bạn chưa nhập tên sản phẩm" :
                        (confirm && products.some((item) => item.tenSanPham === productName.trim())) ? "Tên sản phẩm đã tồn tại" : ""
                    }
                    error={
                      (confirm && productName.trim() === "") ||
                      (confirm && products.some((item) => item.tenSanPham === productName.trim())) === true
                    }
                    {...params}
                    label="Tên Sản Phẩm" />}
                />
              </div>
              <div className="mt-4">
                <TextField fullWidth multiline maxRows={1} inputProps={{ style: { height: "50px" } }} className="custom" id="outlined-basic" label="Mô Tả" variant="outlined" />
              </div>
              <div className="mt-4 d-flex">
                <div className="" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 262 }} error={confirm && selectedCategory.length === 0}>
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
                            <Tooltip title="Thêm danh mục" TransitionComponent={Zoom}>
                              <IconButton onClick={() => setOpenDanhMuc(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                      renderValue={(selected) => selected.map(id => {
                        const category = categorys.find(c => c.id === id);
                        return category ? category.tenDanhMuc : '';
                      }).join(', ')}
                    >
                      {categorys.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <Checkbox checked={selectedCategory.indexOf(c.id) > -1} />
                          <ListItemText primary={c.tenDanhMuc} />
                        </MenuItem>
                      ))}
                    </Select>
                    {confirm && selectedCategory.length === 0 &&
                      <FormHelperText>Bạn chưa chọn danh mục!</FormHelperText>
                    }
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth error={confirm && brand.trim() === ""}>
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
                            <Tooltip title="Thêm hãng" TransitionComponent={Zoom}>
                              <IconButton onClick={() => setOpenHang(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        </>
                      }
                    >
                      {listHang.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>{item.tenHang}</MenuItem>
                        )
                      })}
                    </Select>
                    {confirm && brand.trim() === "" &&
                      <FormHelperText>Bạn chưa chọn hãng!</FormHelperText>
                    }
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth error={confirm && chip.trim() === ""}>
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
                            <Tooltip title="Thêm chip" TransitionComponent={Zoom}>
                              <IconButton onClick={() => setOpenChip(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                    >
                      {listChip.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>{item.tenChip}</MenuItem>
                        )
                      })}
                    </Select>
                    {confirm && chip.trim() === "" &&
                      <FormHelperText>Bạn chưa chọn chip!</FormHelperText>
                    }
                  </FormControl>
                </div>
              </div>
              <div className="mt-4 d-flex">
                <div className="" style={{ width: "100%" }}>
                  <FormControl fullWidth error={confirm && pin.trim() === ""}>
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
                              <IconButton onClick={() => setOpenPin(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                    >
                      {listPin.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>{item.loaiPin + " " + item.dungLuong + " mAh"}</MenuItem>
                        )
                      })}
                    </Select>
                    {confirm && pin.trim() === "" &&
                      <FormHelperText>Bạn chưa chọn pin!</FormHelperText>
                    }
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth error={confirm && congSac.trim() === ""}>
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
                            <Tooltip title="Thêm cổng sạc" TransitionComponent={Zoom}>
                              <IconButton onClick={() => setOpenSac(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                    >
                      {listSac.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>{item.loaiCongSac}</MenuItem>
                        )
                      })}
                    </Select>
                    {confirm && congSac.trim() === "" &&
                      <FormHelperText>Bạn chưa chọn cổng sạc!</FormHelperText>
                    }
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth error={confirm && theNho.trim() === ""}>
                    <InputLabel id="demo-simple-select-label">Thẻ Nhớ</InputLabel>
                    <Select className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={theNho}
                      label="Thẻ Nhớ"
                      onChange={handleChangeTheNho}
                      endAdornment={
                        <>
                          <InputAdornment style={{ marginRight: "15px" }} position="end">
                            <Tooltip title="Thêm thẻ nhớ" TransitionComponent={Zoom}>
                              <IconButton onClick={() => setOpenTheNho(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                    >
                      <MenuItem value={"None"}>Không có</MenuItem>
                      {listTheNho.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>{item.loaiTheNho}</MenuItem>
                        )
                      })}
                    </Select>
                    {confirm && theNho.trim() === "" &&
                      <FormHelperText>Bạn chưa chọn thẻ nhớ!</FormHelperText>
                    }
                  </FormControl>
                </div>
              </div>
              <div className="mt-4 d-flex mx-auto" style={{ width: "100%" }}>
                <div className="" style={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Hệ Điều Hành</InputLabel>
                    <Select className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={opera}
                      label="Hệ Điều Hành"
                      onChange={handleChangeOpera}
                      defaultValue={0}
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
                      <MenuItem value={1}>Chưa Kinh Doanh</MenuItem>
                      <MenuItem value={2}>Ngừng Kinh Doanh</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <TextField

                    helperText={
                      (confirm && weight === "" ? "Bạn chưa nhập trọng lượng" : "")
                    }
                    // error={confirm && productName.trim() === ""}
                    error={
                      (confirm && weight === "")
                    }

                    fullWidth value={weight} onChange={handleChangeWeight} inputProps={{}} className="custom" id="outlined-basic" label="Trọng Lượng" variant="outlined" />
                </div>
              </div>
              <div className="mt-4 d-flex">
                <div className="" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 402 }} error={(confirm && selectedCameraSau.length === 0) || (confirm && selectedCameraSau.length !== 0 && mainCameraSau === "")}>
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
                              <IconButton onClick={() => setOpenCameraSau(true)} size="small">
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
                          <ListItemText primary={c.doPhanGiai + "MP " + `(${c.cameraType})`} />
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
                    {confirm && selectedCameraSau.length === 0 &&
                      <FormHelperText>Bạn chưa chọn camera sau!</FormHelperText>
                    }
                    {confirm && selectedCameraSau.length > 0 && mainCameraSau === "" &&
                      <FormHelperText>Camera sau chưa có camera chính!</FormHelperText>
                    }
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 402 }} error={(confirm && selectedCameraTruoc.length === 0) || (confirm && selectedCameraTruoc.length !== 0 && mainCameraTruoc === "")}>
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
                              <IconButton onClick={() => setOpenCameraTruoc(true)} size="small">
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
                          <ListItemText primary={c.doPhanGiai + "MP " + `(${c.cameraType})`} />
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
                    {confirm && selectedCameraTruoc.length === 0 &&
                      <FormHelperText>Bạn chưa chọn camera trước!</FormHelperText>
                    }
                    {confirm && selectedCameraTruoc.length > 0 && mainCameraTruoc === "" &&
                      <FormHelperText>Camera trước chưa có camera chính!</FormHelperText>
                    }
                  </FormControl>
                </div>
              </div>
              <div className="mt-4 d-flex">
                <div className="" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 402 }} error={confirm && screen.trim() === ""}>
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
                              <IconButton onClick={() => setOpenManHinh(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                    >
                      {listManHinh.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>{item.loaiManHinh + " " + `(${item.doPhanGiaiManHinh.chieuRong + " x " + item.doPhanGiaiManHinh.chieuDai} pixels) ` + item.kichThuoc + `"`}</MenuItem>
                        )
                      })}
                    </Select>
                    {confirm && screen.trim() === "" &&
                      <FormHelperText>Bạn chưa chọn màn hình!</FormHelperText>
                    }
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 402 }} error={confirm && selectedSim.length === 0}>
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
                              <IconButton onClick={() => setOpenTheSim(true)} size="small">
                                <AiOutlinePlus className='text-dark' />
                              </IconButton>
                            </Tooltip>

                          </InputAdornment>
                        </>
                      }
                      renderValue={(selected) => selected.map(id => {
                        const sim = listTheSim.find(c => c.id === id);
                        return sim ? sim.simMultiple === SimMultiple.SINGLE_SIM ? `${'1 ' + sim.loaiTheSim}` : `${'2 ' + sim.loaiTheSim}` : '';
                      }).join(' & ')}
                    >
                      {listTheSim.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <Checkbox checked={selectedSim.indexOf(c.id) > -1} />
                          <ListItemText primary={c.simMultiple === SimMultiple.SINGLE_SIM ? `${'1 ' + c.loaiTheSim}` : `${'2 ' + c.loaiTheSim}`} />
                        </MenuItem>
                      ))}
                    </Select>
                    {confirm && selectedSim.length === 0 &&
                      <FormHelperText>Bạn chưa chọn thẻ SIM!</FormHelperText>
                    }
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateHang
        open={openHang}
        close={handleCloseOpenHang}
        getAll={getListHang}
        hangs={listHang}
      />
      <CreateChip
        open={openChip}
        close={handleCloseOpenChip}
        getAll={getListChip}
        chips={listChip}
      />
      <CreateSac
        open={openSac}
        close={handleCloseOpenSac}
        getAll={getListSac}
        sacs={listSac}
      />
      <CreateTheNho
        open={openTheNho}
        close={handleCloseOpenTheNho}
        getAll={getListTheNho}
        theNhos={listTheNho}
      />
      <CreateScreen
        open={openManHinh}
        close={handleCloseOpenManHinh}
        getAll={getListManHinh}
        screens={listManHinh}
      />
      <CreateSimCard
        open={openTheSim}
        close={handleCloseOpenTheSim}
        getAll={getListTheSim}
        sims={listTheSim}
      />
      <CreateDanhMuc
        open={openDanhMuc}
        close={handleCloseOpenDanhMuc}
        getAll={getListDanhMuc}
        danhMucs={categorys}
      />
      <CreateCameraSau
        open={openCameraSau}
        close={handleCloseOpenCameraSau}
        getAll={getListCameraSau}
        cameraRear={camerasSau}
      />
      <CreateCameraTruoc
        open={openCameraTruoc}
        close={handleCloseOpenCameraTruoc}
        getAll={getListCameraTruoc}
        cameraFront={camerasTruoc}
      />
      <CreatePin open={openPin} close={handleCloseOpenPin} getAll={getListPin} pins={listPin} />
      <CreateCauHinh valid={handleValidation()} confirm={getConfirm} isConfirm={confirm} productName={productName} getProduct={product} getOverplay={getOverplay} />
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default CreateProduct;
