import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import Link from "@mui/material/Link";
import {
  Box,
  FormControl,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  Pagination,
  TextField,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  InputAdornment,
  OutlinedInput,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Slide,
  ListItemText,
  Rating,
  ImageListItemBar,
} from "@mui/material";
import axios from "axios";
import Zoom from "@mui/material/Zoom";
import * as dayjs from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import LoadingIndicator from "../../../utilities/loading";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack } from "./enum";
import { Box as BoxJoy } from "@mui/joy";
import { Card as CardJoy } from "@mui/joy";
import { Checkbox as CheckboxJoy } from "@mui/joy";
import Divider from "@mui/joy/Divider";
import { FaUpload } from "react-icons/fa6";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import TextFieldSearchColors from "./text-field-search-colors";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Done from "@mui/icons-material/Done";
import ModalUpdateCauHinh from "./modal-update-cau-hinh";
import generateRandomCode from "../../../utilities/genCode";
import TextFieldPrice from "./text-field-input-price-product";
import { Col, Row } from "react-bootstrap";
import ImageUpload from "../../../utilities/upload";
import ImportAndExportExcelImei from "../../../utilities/excelUtils";
import { ImportExcelImei } from "./import-imei-by";
import CreateRom from "./create-rom";
import { over } from "stompjs";
import SockJS from "sockjs-client";

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
var stompClient = null;
const CreateCauHinh = ({ productName, getProduct, getOverplay }) => {
  const navigate = useNavigate();
  const redirectProductPage = () => {
    navigate("/dashboard/products");
  };
  const [listColor, setListColor] = useState([]);
  const getListColor = async () => {
    await axios
      .get(`http://localhost:8080/api/colors`)
      .then((response) => {
        setListColor(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [listRam, setListRam] = useState([]);
  const [listRom, setListRom] = useState([]);

  //connnect
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/bill/bills", onMessageReceived);
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
  };

  const onError = (err) => {
    console.log(err);
  };
  const getListRom = () => {
    axios
      .get(`http://localhost:8080/api/roms`)
      .then((response) => {
        setListRom(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getListRam = () => {
    axios
      .get(`http://localhost:8080/api/rams`)
      .then((response) => {
        setListRam(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getListColor();
    getListRam();
    getListRom();
    if (stompClient === null) {
      connect();
    }
  }, []);

  const [imeis, setImeis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInside, setIsLoadingInside] = useState(false);
  const handleDownloadSample = () => {
    setIsLoading(true);
    axios
      .post(
        "http://localhost:8080/api/create-excel-template-by",
        {},
        { responseType: "blob" }
      ) // Sử dụng phương thức POST
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Mẫu Import IMEI.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const [openModalImel, setOpenModalImei] = useState(false);

  const handleOpenModalImei = () => {
    setOpenModalImei(true);
  };

  const handleCloseModalImei = () => {
    setOpenModalImei(false);
  };

  const handleUpdateImageProduct = (url) => {};
  const [defaultRam, setDefaultRam] = useState(null);
  const [defaultRom, setDefaultRom] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const handleOpenModalUpdate = () => {
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const [openRom, setOpenRom] = React.useState(false);
  const handleCloseOpenRom = () => {
    setOpenRom(false);
  };
  const handleCloseOpenRam = () => {
    setOpenRam(false);
  };
  const [openRam, setOpenRam] = React.useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [open, setOpen] = React.useState(false);
  const [cauHinhsFinal, setCauHinhsFinal] = useState([]);
  const [cauHinhsFinal1, setCauHinhsFinal1] = useState([]);
  const [cauHinhs, setCauHinhs] = useState([]);

  const [roms, setRoms] = useState([
    {
      id: 1,
      dungLuong: 16,
    },
    {
      id: 2,
      dungLuong: 32,
    },
    {
      id: 3,
      dungLuong: 64,
    },
    {
      id: 4,
      dungLuong: 128,
    },
    {
      id: 5,
      dungLuong: 256,
    },
    {
      id: 6,
      dungLuong: 512,
    },
    {
      id: 7,
      dungLuong: 1024,
    },
  ]);

  const [rams, setRams] = useState([
    {
      id: 1,
      dungLuong: 1,
    },
    {
      id: 2,
      dungLuong: 2,
    },
    {
      id: 3,
      dungLuong: 3,
    },
    {
      id: 4,
      dungLuong: 4,
    },
    {
      id: 5,
      dungLuong: 5,
    },
    {
      id: 6,
      dungLuong: 6,
    },
    {
      id: 7,
      dungLuong: 8,
    },
    {
      id: 8,
      dungLuong: 10,
    },
  ]);

  const [colors, setColors] = useState([
    { id: 1, tenMauSac: "Xanh" },
    { id: 2, tenMauSac: "Xanh dương nhạt" },
    { id: 3, tenMauSac: "Xanh lá nhạt" },
    { id: 4, tenMauSac: "Xanh lá" },
    { id: 5, tenMauSac: "Hồng Nhạt" },
    { id: 6, tenMauSac: "BLUE" },
    { id: 7, tenMauSac: "RED" },
    { id: 8, tenMauSac: "YELLOW" },
    { id: 9, tenMauSac: "Bạc" },
    { id: 10, tenMauSac: "Đen Nhám" },
  ]);
  const [ram, setRam] = useState();
  const [rom, setRom] = useState();
  const [listColorCurrent, setListColorCurrent] = useState([]);
  const handleChangeRom = (event) => {
    setRom(event.target.value);
  };
  const handleChangeRam = (event) => {
    setRam(event.target.value);
  };
  const joinedStringArr = (arr) => {
    const joinedString = arr.reduce((acc, curr, index) => {
      if (index === 0) {
        return curr;
      } else {
        return `${acc}, ${curr}`;
      }
    }, "");
    return joinedString;
  };
  const [valueColor, setValueColor] = useState([]);
  const [openSelectColor, setOpenSelectColor] = useState(false);
  const [openListColorCurrent, setOpenListColorCurrent] = useState(false);
  const [selectColor, setSelectColor] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [valueColorFinal, setValueColorFinal] = useState([]);
  const joinedColors = joinedStringArr(
    valueColorFinal.map((color) => color.tenMauSac)
  );
  const filterColors = listColor.filter((color) =>
    color.tenMauSac.toLowerCase().includes(keyword.toLowerCase())
  );
  const uniqueConfigurations = cauHinhs.filter((item, index) => {
    if (cauHinhsFinal.length > 0) {
      const currentColors = item.colors.map((color) => color.tenMauSac);
      for (let i = 0; i < index; i++) {
        const prevColors = cauHinhs[i].colors.map((color) => color.tenMauSac);
        if (JSON.stringify(currentColors) === JSON.stringify(prevColors)) {
          return false; // Loại bỏ cấu hình trùng lặp
        }
      }
      return true; // Giữ lại cấu hình không trùng lặp
    }
  });
  const uniqueCauHinhsFinal = cauHinhsFinal.filter(
    (object, index, self) =>
      index === self.findIndex((obj) => obj.color.id === object.color.id)
  );

  const handleOpenListColorCurrent = () => {
    setOpenListColorCurrent(true);
  };
  const handleCloseListColorCurrent = () => {
    setOpenListColorCurrent(false);
  };

  const handleCloseSelectColor = () => {
    setOpenSelectColor(false);
  };
  const handleOpenSelectColor = () => {
    setOpenSelectColor(true);
  };
  const getKeyword = (value) => {
    setKeyword(value);
  };

  const updateData = (id, ram, rom, colors) => {
    const updateDatas = cauHinhs.map((item) => {
      if (item.id === id) {
        return { ...item, ram: ram, rom: rom, colors: colors };
      }
      return item;
    });
    updateDatas.sort((a, b) => {
      if (a.ram.dungLuong !== b.ram.dungLuong) {
        return a.ram.dungLuong - b.ram.dungLuong;
      } else {
        return a.rom.dungLuong - b.rom.dungLuong;
      }
    });
    setCauHinhs(updateDatas);

    const updatedCauHinhsFinal = [...cauHinhsFinal];

    cauHinhs.forEach((cauHinh) => {
      if (cauHinh.id === id) {
        const listFinal = cauHinhsFinal.filter(
          (item) => item.id === cauHinh.id
        );
        if (colors.length === 0) {
          const remove = updatedCauHinhsFinal.filter((item) => item.id !== id);
          setCauHinhsFinal(remove);
        }

        // Lọc ra các object có color nằm trong list colors truyền vào
        const filteredList = listFinal.filter((item) =>
          colors.some((color) => color.id === item.color.id)
        );

        // Xóa các object có color không nằm trong list colors
        const remove = listFinal.filter((item) => !filteredList.includes(item));
        remove.forEach((item) => {
          const index = updatedCauHinhsFinal.findIndex((obj) => obj === item);
          updatedCauHinhsFinal.splice(index, 1);
        });

        colors.forEach((color) => {
          const matchedObj = listFinal.find((c) => c.color.id === color.id);
          if (matchedObj) {
            const updatedObj = {
              ...matchedObj,
              ram: ram,
              rom: rom,
            };
            const index = updatedCauHinhsFinal.findIndex(
              (obj) => obj === matchedObj
            );
            updatedCauHinhsFinal[index] = updatedObj;
          } else {
            const newObj = {
              ...cauHinh,
              color: color,
              stt: 0,
              soLuongTonKho: 0,
              donGia: null,
              url: "",
              ma: generateRandomId(),
            };
            updatedCauHinhsFinal.push(newObj);
          }
          setCauHinhsFinal(updatedCauHinhsFinal);
        });
      }
    });
  };

  const objectsTachRaByIdSelected = (id) => {
    return (
      cauHinhsFinal &&
      cauHinhsFinal.filter((item) => {
        return item.id === id;
      })
    );
  };

  const updatePrice = (price, ma) => {
    if (cauHinhsFinal && cauHinhsFinal.length > 0) {
      const newData = [...cauHinhsFinal];
      const index = newData.findIndex((item) => item.ma === ma);
      if (index > -1) {
        newData[index].donGia = price;
        localStorage.setItem("cauHinhsFinal", JSON.stringify(newData));
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("cauHinhsFinal", JSON.stringify(cauHinhsFinal));
  }, [cauHinhsFinal]);

  const getImeisFromImport = (imeis, ma) => {
    const updatedCauHinhsFinal = cauHinhsFinal.map((item) => {
      if (item.ma === ma) {
        let updatedImeis = imeis;
        if (Array.isArray(item.imeis)) {
          updatedImeis = [...item.imeis, ...imeis];
        }
        return {
          ...item,
          soLuongTonKho: item.soLuongTonKho + imeis.length,
          imeis: updatedImeis,
        };
      }
      return item;
    });

    setCauHinhsFinal(updatedCauHinhsFinal);
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>
          {objectsTachRaByIdSelected(record.id).indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      width: "30%",
      render: (text, record) => {
        return (
          <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>
            {productName +
              " " +
              record.ram.dungLuong +
              "/" +
              record.rom.dungLuong +
              "GB"}
          </span>
        );
      },
    },
    {
      title: "Màu Sắc",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>
          {record.color.tenMauSac}
        </span>
      ),
    },
    {
      title: "Số Lượng Tồn Kho",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <>
          <Tooltip title="Danh sách IMEI" TransitionComponent={Zoom}>
            <div
              onClick={() => {
                setOpenModalImei(true);
                setImeis(record.imeis && record.imeis);
              }}
              style={{ cursor: "pointer" }}
            >
              <span style={{ fontWeight: "400" }} className="underline-blue">
                {record.soLuongTonKho}
              </span>
            </div>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Đơn Giá",
      align: "center",
      width: "15%",
      render: (text, record, index) => {
        return (
          <TextFieldPrice
            update={updatePrice}
            ma={record.ma}
            value={cauHinhsFinal.find((item) => item.ma === record.ma)?.donGia}
          />
        );
      },
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <div className="button-container">
            <ImportExcelImei ma={record.ma} get={getImeisFromImport} />
            <Tooltip title="Xóa" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                  const newCauHinhsFinal = cauHinhsFinal.filter(
                    (cauHinh) => cauHinh.ma !== record.ma
                  );
                  setCauHinhsFinal(newCauHinhsFinal);
                  const color = record.color;
                  const id = record.id;
                  const updatedCauHinhs = cauHinhs.map((cauHinh) => {
                    if (cauHinh.id === id) {
                      const updatedColors = cauHinh.colors.filter(
                        (c) => c !== color
                      );
                      return { ...cauHinh, colors: updatedColors };
                    }
                    return cauHinh;
                  });

                  setCauHinhs(updatedCauHinhs);
                }}
                className=""
              >
                <FaTrashAlt color="#e5383b" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const CauHinhTable = ({ id }) => {
    const objectsTachRaById =
      cauHinhsFinal &&
      cauHinhsFinal.filter((item) => {
        return item.id === id;
      });

    return (
      <>
        <Table
          className="table-container mt-2"
          columns={columns}
          rowKey="id"
          key={"id"}
          dataSource={objectsTachRaById}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };

  const generateRandomId = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  };
  const [selectKey, setSelectKey] = useState(0);

  const handleAddProduct = async () => {
    setIsLoadingInside(true);
    getOverplay(true);
    const storeItem = localStorage.getItem("cauHinhsFinal");
    const request = {
      product: getProduct,
      productItems: JSON.parse(storeItem),
    };
    try {
      await axios.post(`http://localhost:8080/api/products`, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await addFiles(request.product.ma);
      var test = {
        name: "test2" + Math.random(),
      };
      if (stompClient) {
        stompClient.send("/app/bills", {}, JSON.stringify(test));
      }
      handleOpenAlertVariant("Thêm sản phẩm thành công!", Notistack.SUCCESS);
      setIsLoadingInside(false);
      getOverplay(false);
      setTimeout(() => {
        redirectProductPage();
      }, 1000);
    } catch (error) {
      setIsLoadingInside(false);
      getOverplay(false);
      console.error("Error");
    }
  };
  const listFiles = [...cauHinhsFinal];
  const listDtoFiles = listFiles.map((config) => {
    return {
      id: config.ma,
      file: config.file,
    };
  });

  const formData = new FormData(); // Tạo một FormData mới ở mỗi lần gửi
  listDtoFiles.forEach((item, index) => {
    const newFileName = item.id;
    const blobWithCustomFileName = new Blob([item.file], {
      type: "application/octet-stream",
    });
    formData.append("files", blobWithCustomFileName, newFileName);
  });

  const addFiles = async (ma) => {
    try {
      await axios.post(
        "http://localhost:8080/api/products/upload-multiple",
        formData,
        {
          params: {
            ma: ma,
          },
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      setIsLoading(false);
      console.error("Error");
    }
  };

  const addImageToProductItem = (colorId, url, file) => {
    const updateDatas = cauHinhsFinal.map((item) => {
      if (item.color.id === colorId) {
        return { ...item, image: url, file: file };
      }
      return item;
    });
    setCauHinhsFinal(updateDatas);
    console.log(updateDatas);
  };

  return (
    <>
      <div className={isLoadingInside ? "overlay" : undefined}>
        <div
          className="mt-4"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 0.1rem 0.3rem #00000010",
            height: "auto",
          }}
        >
          <div className="container" style={{}}>
            <div className="mx-auto" style={{ maxWidth: "95%" }}>
              <div className="text-center pt-4" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  CẤU HÌNH
                </span>
              </div>
              <div className="d-flex mt-4">
                <div className="mx-auto" style={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">RAM</InputLabel>
                    <Select
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={ram}
                      label="RAM"
                      onChange={handleChangeRam}
                      defaultValue={" "}
                      endAdornment={
                        <>
                          <InputAdornment
                            style={{ marginRight: "15px" }}
                            position="end"
                          >
                            <Tooltip
                              title="Thêm bộ nhớ RAM"
                              TransitionComponent={Zoom}
                            >
                              <IconButton
                                /* onClick={() => setOpen(true)} */ size="small"
                              >
                                <AiOutlinePlus className="text-dark" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        </>
                      }
                    >
                      <MenuItem style={{ display: "none" }} value={" "}>
                        Chọn bộ nhớ RAM
                      </MenuItem>
                      {listRam
                        .slice() // Tạo một bản sao của danh sách để tránh làm thay đổi danh sách gốc
                        .sort((ram1, ram2) => ram1.dungLuong - ram2.dungLuong)
                        .map((item) => (
                          <MenuItem key={item.id} value={item}>
                            {item.dungLuong + "GB"}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">ROM</InputLabel>
                    <Select
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rom}
                      label="ROM"
                      onChange={handleChangeRom}
                      defaultValue={" "}
                      endAdornment={
                        <>
                          <InputAdornment
                            style={{ marginRight: "15px" }}
                            position="end"
                          >
                            <Tooltip
                              title="Thêm bộ nhớ ROM"
                              TransitionComponent={Zoom}
                            >
                              <IconButton
                                /* onClick={() => setOpen(true)} */ size="small"
                              >
                                <AiOutlinePlus className="text-dark" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        </>
                      }
                    >
                      <MenuItem style={{ display: "none" }} value={" "}>
                        Chọn bộ nhớ ROM
                      </MenuItem>
                      {listRom
                        .slice() // Tạo một bản sao của danh sách để tránh làm thay đổi danh sách gốc
                        .sort((ram1, ram2) => ram1.dungLuong - ram2.dungLuong)
                        .map((item) => (
                          <MenuItem key={item.id} value={item}>
                            {item.dungLuong === 1024
                              ? 1 + "TB"
                              : item.dungLuong + "GB"}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="mx-auto ms-3" style={{ width: "100%" }}>
                  <FormControl fullWidth sx={{ width: 355 }}>
                    <InputLabel id="demo-simple-select-label">
                      Màu Sắc
                    </InputLabel>
                    <Select
                      className="custom"
                      MenuProps={{ autoFocus: false }}
                      onOpen={handleOpenSelectColor}
                      open={openSelectColor}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={0}
                      label="Màu Sắc"
                    >
                      <MenuItem style={{ display: "none" }} value={0}>
                        {selectColor ? joinedColors : "Chọn Màu Sắc"}
                      </MenuItem>
                      <MenuItem
                        value={1}
                        disableRipple
                        style={{
                          backgroundColor: "transparent",
                          display: "block",
                          cursor: "auto",
                          width: "1098px",
                        }}
                      >
                        <div
                          style={{
                            height: cauHinhs.length > 0 ? "583px" : "455px",
                          }}
                        >
                          <div className="d-flex justify-content-between">
                            <div className="d-flex" style={{}}>
                              <TextFieldSearchColors
                                getColor={getKeyword}
                                defaultValue={keyword}
                              />
                              <Button
                                className="rounded-2 button-mui ms-2"
                                type="primary"
                                style={{
                                  height: "40px",
                                  width: "auto",
                                  fontSize: "15px",
                                }}
                              >
                                <span
                                  className="text-white"
                                  style={{
                                    marginBottom: "2px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Tìm Kiếm
                                </span>
                              </Button>
                              <Button
                                onClick={() => setValueColor([])}
                                className="rounded-2 button-mui ms-2"
                                type="warning"
                                style={{
                                  height: "40px",
                                  width: "auto",
                                  fontSize: "15px",
                                }}
                              >
                                <span
                                  className="text-dark"
                                  style={{
                                    marginBottom: "2px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Làm Mới
                                </span>
                              </Button>
                            </div>
                            <div className="d-flex">
                              <Button
                                onClick={() => {
                                  if (valueColor.length === 0) {
                                    setValueColorFinal([]);
                                    setSelectColor(false);
                                    handleCloseSelectColor();
                                  } else {
                                    setSelectColor(true);
                                    setValueColorFinal(valueColor);
                                    handleCloseSelectColor();
                                  }
                                }}
                                className="rounded-2 button-mui  me-2"
                                type="primary"
                                style={{
                                  height: "40px",
                                  width: "auto",
                                  fontSize: "15px",
                                }}
                              >
                                <span
                                  className=""
                                  style={{
                                    marginBottom: "2px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Xác Nhận
                                </span>
                              </Button>
                              <Button
                                onClick={() => {
                                  handleCloseSelectColor();
                                  setValueColor(valueColorFinal);
                                }}
                                className="rounded-2"
                                type="danger"
                                style={{
                                  height: "40px",
                                  width: "auto",
                                  fontSize: "15px",
                                }}
                              >
                                <span
                                  className=""
                                  style={{
                                    marginBottom: "2px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Hủy Bỏ
                                </span>
                              </Button>
                            </div>
                          </div>
                          <div className="ms-1 scroll-color mt-4" style={{}}>
                            <h5>Tất Cả Màu Sắc</h5>
                            <div className="mt-3">
                              <List
                                orientation="horizontal"
                                wrap
                                sx={{
                                  maxHeight: "50px",
                                  "--List-gap": "15px",
                                  "--ListItem-radius": "5px",
                                  "--ListItem-gap": "4px",
                                }}
                              >
                                {filterColors.map((item, index) => (
                                  <ListItem key={item.id}>
                                    <CheckboxJoy
                                      slotProps={{
                                        action: ({ checked }) => ({
                                          sx: checked
                                            ? {
                                                border: "1px solid",
                                                borderColor: "#2f80ed",
                                              }
                                            : {},
                                        }),
                                      }}
                                      overlay
                                      disableIcon
                                      checked={valueColor.includes(item)}
                                      variant={
                                        valueColor.includes(item)
                                          ? "soft"
                                          : "outlined"
                                      }
                                      onChange={(event) => {
                                        if (event.target.checked) {
                                          setValueColor((val) => [
                                            ...val,
                                            item,
                                          ]);
                                        } else {
                                          setValueColor((val) =>
                                            val.filter((text) => text !== item)
                                          );
                                        }
                                      }}
                                      label={item.tenMauSac}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </div>
                          </div>
                          <div
                            className="mt-4 ms-1"
                            style={{
                              borderBottom: "2px solid #C7C7C7",
                              width: "99%",
                              borderWidth: "1px",
                            }}
                          ></div>
                          <h5 className="ms-1 mt-3">Màu Sắc Đã Chọn</h5>
                          <div className="colors-had-select ms-1 mt-3 d-flex">
                            <div
                              style={
                                {
                                  /* maxWidth: "200px" */
                                }
                              }
                            >
                              <List
                                orientation="horizontal"
                                wrap
                                sx={{
                                  maxHeight: "50px",
                                  "--List-gap": "15px",
                                  "--ListItem-radius": "5px",
                                  "--ListItem-gap": "4px",
                                }}
                              >
                                {valueColor.map((item, index) => (
                                  <ListItem key={item.id}>
                                    <Done
                                      fontSize="md"
                                      color="primary"
                                      sx={{
                                        ml: -0.5,
                                        zIndex: 2,
                                        pointerEvents: "none",
                                      }}
                                    />
                                    <CheckboxJoy
                                      slotProps={{
                                        action: ({ checked }) => ({
                                          sx: checked
                                            ? {
                                                border: "1px solid",
                                                borderColor: "#2f80ed",
                                              }
                                            : {},
                                        }),
                                      }}
                                      overlay
                                      disableIcon
                                      checked={valueColor.includes(item)}
                                      variant={
                                        valueColor.includes(item)
                                          ? "soft"
                                          : "outlined"
                                      }
                                      onChange={(event) => {
                                        if (event.target.checked) {
                                          setValueColor((val) => [
                                            ...val,
                                            item,
                                          ]);
                                        } else {
                                          setValueColor((val) =>
                                            val.filter((text) => text !== item)
                                          );
                                        }
                                      }}
                                      label={item.tenMauSac}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </div>
                          </div>
                          {cauHinhs.length > 0 ? (
                            <>
                              <div style={{ height: "10px" }}></div>
                              <div className="mt-5 pt-4">
                                <div
                                  className="ms-1"
                                  style={{
                                    borderBottom: "2px solid #C7C7C7",
                                    width: "99%",
                                    borderWidth: "1px",
                                  }}
                                ></div>
                              </div>
                              <div className="ms-1">
                                <h5 className="mt-3">
                                  Màu Sắc Của Các Cấu Hình Hiện Tại
                                </h5>
                              </div>
                              <div className="mt-3 ms-1">
                                <div className="" style={{ width: "99.5%" }}>
                                  <FormControl fullWidth size="small">
                                    <Select
                                      className="custom"
                                      onOpen={handleOpenListColorCurrent}
                                      open={openListColorCurrent}
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={0}
                                    >
                                      <MenuItem
                                        style={{ display: "none" }}
                                        value={0}
                                      >
                                        {"Chọn Màu Sắc"}
                                      </MenuItem>
                                      <MenuItem
                                        value={1}
                                        disableRipple
                                        style={{
                                          backgroundColor: "transparent",
                                          display: "block",
                                          cursor: "auto",
                                          width: "1095px",
                                        }}
                                      >
                                        <div>
                                          <div
                                            className="colors-had-select ms-1 d-flex scroll-color"
                                            style={{ height: "215px" }}
                                          >
                                            <div style={{}} className="">
                                              <List
                                                orientation="horizontal"
                                                wrap
                                                sx={{
                                                  maxHeight: "50px",
                                                  "--List-gap": "15px",
                                                  "--ListItem-radius": "5px",
                                                  "--ListItem-gap": "4px",
                                                  marginTop: "1px",
                                                  paddingTop: "5px",
                                                }}
                                              >
                                                {uniqueConfigurations.map(
                                                  (item, index) => (
                                                    <ListItem key={item.id}>
                                                      {listColorCurrent ===
                                                        item && (
                                                        <Done
                                                          fontSize="md"
                                                          color="primary"
                                                          sx={{
                                                            ml: -0.5,
                                                            zIndex: 2,
                                                            pointerEvents:
                                                              "none",
                                                          }}
                                                        />
                                                      )}
                                                      <CheckboxJoy
                                                        slotProps={{
                                                          action: ({
                                                            checked,
                                                          }) => ({
                                                            sx: checked
                                                              ? {
                                                                  border:
                                                                    "1px solid",
                                                                  borderColor:
                                                                    "#2f80ed",
                                                                }
                                                              : {},
                                                          }),
                                                        }}
                                                        overlay
                                                        disableIcon
                                                        variant={
                                                          listColorCurrent ===
                                                          item
                                                            ? "soft"
                                                            : "outlined"
                                                        }
                                                        checked={
                                                          listColorCurrent ===
                                                          item
                                                        }
                                                        onChange={() => {
                                                          if (
                                                            listColorCurrent ===
                                                            item
                                                          ) {
                                                            setListColorCurrent(
                                                              null
                                                            );
                                                          } else {
                                                            setListColorCurrent(
                                                              item
                                                            );
                                                          }
                                                        }}
                                                        label={item.colors
                                                          .map(
                                                            (color) =>
                                                              color.tenMauSac
                                                          )
                                                          .join(", ")}
                                                      />
                                                    </ListItem>
                                                  )
                                                )}
                                              </List>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-4 ms-1 d-flex justify-content-between">
                                          <div className="d-flex">
                                            <Button
                                              onClick={() => {
                                                if (listColorCurrent === null) {
                                                  handleOpenAlertVariant(
                                                    "Bạn chưa chọn màu sắc!",
                                                    "warning"
                                                  );
                                                } else {
                                                  setValueColor(
                                                    listColorCurrent &&
                                                      listColorCurrent.colors
                                                  );
                                                  setListColorCurrent(null);
                                                  handleOpenAlertVariant(
                                                    "Chọn màu sắc thành công!",
                                                    Notistack.SUCCESS
                                                  );
                                                  handleCloseListColorCurrent();
                                                }
                                              }}
                                              className="rounded-2 button-mui  me-2"
                                              type="primary"
                                              style={{
                                                height: "40px",
                                                width: "auto",
                                                fontSize: "15px",
                                              }}
                                            >
                                              <span
                                                className=""
                                                style={{
                                                  marginBottom: "2px",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                Xác Nhận
                                              </span>
                                            </Button>
                                            <Button
                                              onClick={() => {
                                                setListColorCurrent(null);
                                                handleCloseListColorCurrent();
                                              }}
                                              className="rounded-2"
                                              type="danger"
                                              style={{
                                                height: "40px",
                                                width: "auto",
                                                fontSize: "15px",
                                              }}
                                            >
                                              <span
                                                className=""
                                                style={{
                                                  marginBottom: "2px",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                Hủy Bỏ
                                              </span>
                                            </Button>
                                          </div>
                                        </div>
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button
                  onClick={() => {
                    getOverplay(true);
                    if (!ram) {
                      handleOpenAlertVariant("Bạn chưa chọn RAM!", "warning");
                    } else if (!rom) {
                      handleOpenAlertVariant("Bạn chưa chọn ROM!", "warning");
                    } else if (valueColorFinal.length === 0) {
                      handleOpenAlertVariant(
                        "Bạn chưa chọn màu sắc!",
                        "warning"
                      );
                    } else if (
                      cauHinhs.some(
                        (d) =>
                          d.ram.dungLuong === ram.dungLuong &&
                          d.rom.dungLuong === rom.dungLuong
                      )
                    ) {
                      handleOpenAlertVariant(`Cấu hình đã tồn tại!`, "warning");
                    } else {
                      const cauHinhMoi = {
                        id: generateRandomId(),
                        ram: ram,
                        rom: rom,
                        colors: valueColorFinal,
                      };
                      setCauHinhs((cauHinhs) =>
                        [...cauHinhs, cauHinhMoi].sort((a, b) => {
                          if (a.ram.dungLuong !== b.ram.dungLuong) {
                            return a.ram.dungLuong - b.ram.dungLuong;
                          } else {
                            return a.rom.dungLuong - b.rom.dungLuong;
                          }
                        })
                      );
                      const objectsTachRa = cauHinhMoi.colors.flatMap(
                        (color) => {
                          return {
                            ...cauHinhMoi,
                            color: color,
                            soLuongTonKho: 0,
                            donGia: null,
                            url: "",
                            ma: generateRandomId(),
                          };
                        }
                      );
                      setCauHinhsFinal((prev) => [...prev, ...objectsTachRa]);
                      handleOpenAlertVariant(
                        "Thêm cấu hình thành công!",
                        Notistack.SUCCESS
                      );
                    }
                  }}
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "auto", fontSize: "15px" }}
                >
                  <span
                    className=""
                    style={{ marginBottom: "2px", fontWeight: "500" }}
                  >
                    Thêm Cấu Hình
                  </span>
                </Button>
              </div>
              {cauHinhs.length > 0 && (
                <div className="mt-3 d-flex justify-content-between">
                  <Button
                    onClick={handleDownloadSample}
                    className="rounded-2 button-mui me-2"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <FaDownload
                      className="ms-1"
                      style={{
                        position: "absolute",
                        bottom: "13.5px",
                        left: "10px",
                      }}
                    />
                    <span
                      className="ms-3 ps-1"
                      style={{ marginBottom: "2px", fontWeight: "500" }}
                    >
                      Tải Mẫu Import IMEI
                    </span>
                  </Button>
                  <Button
                    onClick={() => {
                      handleAddProduct();
                    }}
                    className={
                      isLoadingInside
                        ? "loading"
                        : undefined + " button-mui rounded-2"
                    }
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <div className="spinner" />
                    <span
                      className="text-loading"
                      style={{ marginBottom: "2px", fontWeight: "500" }}
                    >
                      Hoàn Tất
                    </span>
                  </Button>
                </div>
              )}
            </div>
            {cauHinhs.length > 0 &&
              cauHinhs.map((item) => {
                return (
                  <>
                    <div className={"mt-3 mx-auto"} style={{ width: "95%" }}>
                      <CardJoy
                        orientation={"vertical"}
                        variant="outlined"
                        sx={{ width: "100%", maxWidth: "100%", gap: 1.5 }}
                      >
                        <div className="d-flex justify-content-between">
                          <span
                            className="mt-1"
                            style={{ fontWeight: "550", fontSize: "22px" }}
                          >
                            CẤU HÌNH{" "}
                            {" " +
                              item.ram.dungLuong +
                              "/" +
                              item.rom.dungLuong +
                              "GB"}
                          </span>
                          <div className="d-flex">
                            <Button
                              onClick={() => {
                                handleOpenModalUpdate();
                                setDefaultRam(item.ram);
                                setDefaultRom(item.rom);
                                setSelectedColors(item.colors);
                                setSelectedId(item.id);
                              }}
                              className="rounded-2 button-mui me-2"
                              type="primary"
                              style={{
                                height: "40px",
                                width: "auto",
                                fontSize: "15px",
                              }}
                            >
                              <span
                                className=""
                                style={{
                                  marginBottom: "2px",
                                  fontWeight: "500",
                                }}
                              >
                                Cập Nhật
                              </span>
                            </Button>
                            <Button
                              onClick={() => {
                                const newCauHinhs = cauHinhs.filter(
                                  (cauHinh) => cauHinh.id !== item.id
                                );
                                setCauHinhs(newCauHinhs);
                                const newCauHinhsFinal = cauHinhsFinal.filter(
                                  (cauHinh) => cauHinh.id !== item.id
                                );
                                setCauHinhsFinal(newCauHinhsFinal);
                                // console.log(objectsTachRa);
                                handleOpenAlertVariant(
                                  "Xóa cấu hình thành công!",
                                  Notistack.SUCCESS
                                );
                              }}
                              className="rounded-2"
                              type="danger"
                              style={{
                                height: "40px",
                                width: "auto",
                                fontSize: "15px",
                              }}
                            >
                              <span
                                className=""
                                style={{
                                  marginBottom: "2px",
                                  fontWeight: "500",
                                }}
                              >
                                Xóa
                              </span>
                            </Button>
                          </div>
                        </div>
                        <Divider
                          sx={{ backgroundColor: "gray", height: "1.5px" }}
                        />
                        <BoxJoy sx={{ display: "contents" }}>
                          <CauHinhTable id={item.id} />
                        </BoxJoy>
                      </CardJoy>
                    </div>
                  </>
                );
              })}
          </div>
          <div style={{ height: "25px" }}></div>
        </div>
        <div
          className="mt-4"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 0.1rem 0.3rem #00000010",
            height: "auto",
          }}
        >
          <div className="container" style={{}}>
            <div className="mx-auto" style={{ width: "95%" }}>
              <div className="text-center pt-4" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  ẢNH
                </span>
              </div>
              <ImageUpload
                uniqueColors={uniqueCauHinhsFinal}
                getColorImage={addImageToProductItem}
              />
            </div>
            <div style={{ height: "25px" }}></div>
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
      <ModalUpdateCauHinh
        open={openModalUpdate}
        close={handleCloseModalUpdate}
        id={selectedId}
        defaultRam={defaultRam}
        defaultRom={defaultRom}
        colorsHadSelect={selectedColors}
        list={cauHinhs}
        rams={listRam}
        roms={listRom}
        updateData={updateData}
        listColor={listColor}
        listFinal={cauHinhsFinal}
      />
      <ImportAndExportExcelImei
        open={openModalImel}
        close={handleCloseModalImei}
        imeis={imeis}
        productName={productName}
      />
    </>
  );
};
export default CreateCauHinh;
