import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams, useParams } from "react-router-dom";
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
import CreateDanhMuc from "./create-danh-muc";
import CreateCameraSau from "./create-camera-sau";
import CreateCameraTruoc from "./create-camera-truoc";
import UpdateCauHinh from "./update-cau-hinh";
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
  const { id } = useParams();
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
    axios
      .get(`http://localhost:8080/api/danh-mucs`)
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
    axios
      .get(`http://localhost:8080/api/brands`)
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
    axios
      .get(`http://localhost:8080/api/chips`)
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
    axios
      .get(`http://localhost:8080/api/pins`)
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
    axios
      .get(`http://localhost:8080/api/chargers`)
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
    axios
      .get(`http://localhost:8080/api/the-nhos`)
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
    axios
      .get(`http://localhost:8080/api/display`)
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
    axios
      .get(`http://localhost:8080/api/sim-cards/all`)
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
  }, [])

  const [selectKey, setSelectKey] = useState(0);
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
  const [counts, setCounts] = useState([]);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [colorName, setColorName] = useState([
    "White Smoke", "Black"
  ]);
  // const [camerasTruoc, setCamerasTruoc] = useState([
  //   {
  //     id: 1,
  //     doPhanGiai: 20,
  //   },
  //   {
  //     id: 22,
  //     doPhanGiai: 20,
  //   },
  //   {
  //     id: 2,
  //     doPhanGiai: 128,
  //   },
  //   {
  //     id: 3,
  //     doPhanGiai: 108,
  //   },
  //   {
  //     id: 4,
  //     doPhanGiai: 48,
  //   },
  //   {
  //     id: 5,
  //     doPhanGiai: 20,
  //   },
  //   {
  //     id: 6,
  //     doPhanGiai: 12,
  //   },
  //   {
  //     id: 7,
  //     doPhanGiai: 5,
  //   },
  // ]);
  // const [camerasSau, setCamerasSau] = useState([
  //   {
  //     id: 1,
  //     doPhanGiai: 20,
  //   },
  //   {
  //     id: 22,
  //     doPhanGiai: 20,
  //   },
  //   {
  //     id: 2,
  //     doPhanGiai: 128,
  //   },
  //   {
  //     id: 3,
  //     doPhanGiai: 108,
  //   },
  //   {
  //     id: 4,
  //     doPhanGiai: 48,
  //   },
  //   {
  //     id: 5,
  //     doPhanGiai: 20,
  //   },
  //   {
  //     id: 6,
  //     doPhanGiai: 12,
  //   },
  //   {
  //     id: 7,
  //     doPhanGiai: 5,
  //   },
  // ]);
  //
  // const [sims, setSims] = useState([
  //   {
  //     id: 1,
  //     loaiTheSim: "1 Nano SIM",
  //     multipleSim: 1,
  //   },
  //   {
  //     id: 2,
  //     loaiTheSim: "2 Nano SIM",
  //     multipleSim: 2,
  //   },
  //   {
  //     id: 3,
  //     loaiTheSim: "1 eSIM",
  //     multipleSim: 1,
  //   },
  // ]);
  // const [categorys, setCategorys] = useState([
  //   {
  //     id: 1,
  //     content: "Chơi Game, Cấu Hình Cao",
  //   },
  //   {
  //     id: 2,
  //     content: "Pin Trâu",
  //   },
  //   {
  //     id: 3,
  //     content: "Livestream",
  //   },
  //   {
  //     id: 4,
  //     content: "Chụp Ảnh, Quay Phim",
  //   },
  //   {
  //     id: 5,
  //     content: "Mỏng nhẹ",
  //   },
  // ]);
  //
  //

  const [camerasSau, setCamerasSau] = useState([]);
  const [camerasTruoc, setCamerasTruoc] = useState([]);
  const getListCameraTruoc = () => {
    axios
      .get(`http://localhost:8080/api/camera-fronts`)
      .then((response) => {
        setCamerasTruoc(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getListCameraSau = () => {
    axios
      .get(`http://localhost:8080/api/camera-rears`)
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
  // const [products, setProducts] = useState([
  //   {
  //     ma: "091218273",
  //     tenSanPham: "Iphone 14 Pro Max",
  //   },
  //   {
  //     ma: "091218273",
  //     tenSanPham: "Iphone 12 Pro",
  //   },
  //   {
  //     ma: "091218273",
  //     tenSanPham: "Samsung Galaxy Ultra 23",
  //   },
  //   {
  //     ma: "091218273",
  //     tenSanPham: "Xiaomi K40 Pro",
  //   },
  // ]);
  // const [colors, setColors] = useState([
  //   {
  //     ma: "091218273",
  //     tenMauSac: "White Smoke",
  //     status: 0
  //   }
  // ]);
  const [weight, setWeight] = React.useState('');

  const handleChangeWeight = (event) => {
    const value = event.target.value;
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
    setWeight(valueFinal);

  }
  const [productId, setProductId] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const handleOnInputChangeProductName = (event, value) => {
    setProductName(value);
  };

  const uniqueTenSanPham = products.map((option) => option.tenSanPham).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const listSortCameraSau = camerasSau.sort((a, b) => b.doPhanGiai - a.doPhanGiai);
  const listSortCameraTruoc = camerasTruoc.sort((a, b) => b.doPhanGiai - a.doPhanGiai);


  const [isLoading, setIsLoading] = React.useState(false);
  const [isNonNull, setIsNonNull] = React.useState(false);

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
    if (productName && productName.trim() === "") {
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
    return isValid;
  }

  const [findProduct, setFindProduct] = useState({});
  const [findProductItem, setFindProductItem] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedRom, setSelectedRom] = useState([]);

  const getProductById = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        const data = response.data.data;
        setProductId(data.id);
        setProductCode(data.ma);
        setProductName(data.tenSanPham);
        setBrand(data.hang.id);
        setChip(data.chip.id)
        setPin(data.pin.id);
        setCongSac(data.congSac.id);
        setTheNho(data.theNho || "None")
        setScreen(data.manHinh.id);
        setOpera(data.operatingType);
        setStatus(data.trangThai);
        setFindProduct(data);
        setFindProductItem(data.productItems);

        const mainCameraSau = data.cameraSaus.find(camera => camera.isCameraMain === true);
        const findMainCameraSau = mainCameraSau ? mainCameraSau.cameraSau.id : ""
        const cameraSauIds = data.cameraSaus.map(camera => camera.cameraSau.id);
        setSelectedCameraSau(cameraSauIds);

        setRatingsCameraSau((prevRatings) => {
          const updatedRatings = { ...prevRatings };
          Object.keys(updatedRatings).forEach((key) => {
            if (key !== findMainCameraSau) {
              updatedRatings[key] = false;
            }
          });
          const newRating = !prevRatings[findMainCameraSau];
          updatedRatings[findMainCameraSau] = newRating;
          const trueCameraId = Object.keys(updatedRatings).find((key) => updatedRatings[key] === true);
          setMainCameraSau(trueCameraId);

          return updatedRatings;
        });

        const mainCameraTruoc = data.cameraTruocs.find(camera => camera.isCameraMain === true);
        const findMainCameraTruoc = mainCameraTruoc ? mainCameraTruoc.cameraTruoc.id : ""
        const cameraTruocIds = data.cameraTruocs.map(camera => camera.cameraTruoc.id);
        setSelectedCameraTruoc(cameraTruocIds);

        setRatingsCameraTruoc((prevRatings) => {
          const updatedRatings = { ...prevRatings };
          Object.keys(updatedRatings).forEach((key) => {
            if (key !== findMainCameraTruoc) {
              updatedRatings[key] = false;
            }
          });
          const newRating = !prevRatings[findMainCameraTruoc];
          updatedRatings[findMainCameraTruoc] = newRating;
          const trueCameraId = Object.keys(updatedRatings).find((key) => updatedRatings[key] === true);
          setMainCameraTruoc(trueCameraId);

          return updatedRatings;
        });

        const categoryIds = data.danhMucs.map(item => item.danhMuc.id);
        const simCardsIds = data.theSims.map(item => item.theSim.id);

        setSelectedCategory(categoryIds);
        setSelectecSim(simCardsIds);

        const ramIds = data && data.productItems && data.productItems.map(item => item.ram.id);
        const uniqueRamIds = [...new Set(ramIds)]; // Lọc các giá trị duy nhất

        setSelectedRam(uniqueRamIds);

        const romIds = data && data.productItems && data.productItems.map(item => item.rom.id);
        const uniqueRomIds = [...new Set(romIds)]; // Lọc các giá trị duy nhất

        setSelectedRom(uniqueRomIds);


        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProductById();
  }, []);


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
                <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>CẬP NHẬT SẢN PHẨM</span>
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
                    // helperText={confirm && productName.trim() === "" ? "Bạn chưa nhập tên sản phẩm" : ""}
                    // error={confirm && productName.trim() === ""}
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
                      <MenuItem value={0}>Kinh doanh</MenuItem>
                      <MenuItem value={1}>Chưa kinh doanh</MenuItem>
                      <MenuItem value={2}>Ngừng kinh doanh</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <TextField fullWidth inputProps={{}} className="custom" id="outlined-basic" label="Trọng Lượng" variant="outlined" />
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
      <UpdateCauHinh valid={handleValidation()} confirm={getConfirm} isConfirm={confirm} productName={productName} getProduct={product} getOverplay={getOverplay} getSelectedRam={selectedRam} getSelectedRom={selectedRom} findProductItem={findProductItem} />
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default UpdateProduct;
