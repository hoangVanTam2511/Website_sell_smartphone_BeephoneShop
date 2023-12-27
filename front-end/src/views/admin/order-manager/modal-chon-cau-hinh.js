import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Empty, Table, Input } from "antd";
import {
  Box,
  FormControl,
  Table as TableMui,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  Pagination,
  TextField,
  Tooltip,
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
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import axios from "axios";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Zoom from "@mui/material/Zoom";
import { AiOutlineClear, AiOutlinePlus } from "react-icons/ai";
import LoadingIndicator from "../../../utilities/loading";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack } from "./enum";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Done from "@mui/icons-material/Done";
import { Select as SelectJoy } from "@mui/joy";
import { Option as OptionJoy } from "@mui/joy";
import TextFieldSearchColors from "./text-field-search-colors";
import DeleteIcon from "@mui/icons-material/Delete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ModalCauHinh = ({ open, close, add }) => {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [listColorCurrent, setListColorCurrent] = useState([]);

  const handleOpenModalUpdate = () => {
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
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

  const updateData = (id, ram, rom, colors) => {
    const updateDatas = cauHinhs.map((item) => {
      if (item.id === id) {
        return { ...item, ram: ram, rom: rom, colors: colors };
      }
      return item;
    });
    setCauHinhs(updateDatas);
  };

  const [selectedRam, setSelectedRam] = useState(null);
  const [defaultRam, setDefaultRam] = useState(null);
  const [defaultRom, setDefaultRom] = useState(null);
  const [selectedRom, setSelectedRom] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openSelectColorSelected, setOpenSelectColorSelected] = useState(false);
  const [selectColorSelected, setSelectColorSelected] = useState(true);

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

  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [cauHinhs, setCauHinhs] = useState([]);
  const [valueColor, setValueColor] = useState([]);
  const [openSelectColor, setOpenSelectColor] = useState(false);
  const [openListColorCurrent, setOpenListColorCurrent] = useState(false);
  const [selectColor, setSelectColor] = useState(false);
  const [keyword, setKeyword] = useState("");
  const handleCloseSelectColorSelected = () => {
    setOpenSelectColorSelected(false);
  };
  const handleOpenSelectColorSelected = () => {
    setOpenSelectColorSelected(true);
  };

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
  const uniqueConfigurations = cauHinhs.filter((item, index) => {
    const currentColors = item.colors.map((color) => color.tenMauSac);
    for (let i = 0; i < index; i++) {
      const prevColors = cauHinhs[i].colors.map((color) => color.tenMauSac);
      if (JSON.stringify(currentColors) === JSON.stringify(prevColors)) {
        return false; // Loại bỏ cấu hình trùng lặp
      }
    }
    return true; // Giữ lại cấu hình không trùng lặp
  });

  const [valueColorFinal, setValueColorFinal] = useState([]);
  const [valueColorFinalSelected, setValueColorFinalSelected] = useState([]);

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

  const joinedColors = joinedStringArr(
    valueColorFinal.map((color) => color.tenMauSac)
  );
  const joinedColorsSelected = joinedStringArr(
    selectedColors.map((color) => color.tenMauSac)
  );

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

  const uniqueTenMauSac = colors
    .map((option) => option.tenMauSac)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleGetValueFromInputTextField = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };

  // useEffect(() => {
  //   filterData(keyword);
  // }, [keyword])
  const filterColors = colors.filter((color) =>
    color.tenMauSac.toLowerCase().includes(keyword.toLowerCase())
  );

  const getKeyword = (value) => {
    setKeyword(value);
  };

  const [ram, setRam] = useState();
  const [rom, setRom] = useState();
  const handleChangeRom = (event) => {
    setRom(event.target.value);
  };
  const handleChangeRam = (event) => {
    setRam(event.target.value);
  };

  const IconTrash = () => {
    return (
      <>
        <svg
          fill="none"
          color="#e5383b"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z"
            fill="currentColor"
          />
        </svg>
      </>
    );
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>
          {cauHinhs.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "RAM",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return (
          <span style={{ fontWeight: "400" }}>
            {record.ram.dungLuong + "GB"}
          </span>
        );
      },
    },
    {
      title: "ROM",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.rom.dungLuong === 1024
            ? 1 + "TB"
            : record.rom.dungLuong + "GB"}
        </span>
      ),
    },
    {
      title: "Danh Sách Màu Sắc",
      align: "center",
      width: "45%",
      render: (text, record) => (
        <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>
          {joinedStringArr(record.colors.map((color) => color.tenMauSac))}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "20%",
      dataIndex: "ma",
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <div className="button-container">
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                  handleOpenModalUpdate();
                  setSelectedRam(record.ram);
                  setDefaultRam(record.ram);
                  setDefaultRom(record.rom);
                  setSelectedRom(record.rom);
                  setSelectedColors(record.colors);
                  setValueColorFinalSelected(record.colors);
                  setSelectedId(record.id);
                }}
                className="me-2"
                style={{ height: "40px" }}
              >
                <BorderColorOutlinedIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa" TransitionComponent={Zoom}>
              <IconButton
                className=""
                style={{ height: "40px" }}
                onClick={() => {
                  const newCauHinhs = cauHinhs.filter(
                    (cauHinh) => cauHinh.id !== record.id
                  );
                  setCauHinhs(newCauHinhs);
                  handleOpenAlertVariant(
                    "Xóa cấu hình thành công!",
                    Notistack.SUCCESS
                  );
                }}
              >
                <DeleteIcon sx={{ color: "#e5383b" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const CauHinhTable = () => {
    return (
      <>
        <Table
          className="table-container mt-4"
          columns={columns}
          rowKey="id"
          key={"id"}
          dataSource={cauHinhs}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        maxWidth="xxl"
        maxHeight="xxl"
        // sx={{
        //   marginBottom: "100px",
        // }}
      >
        <DialogContent className="">
          <div style={{ width: "1100px", height: "auto" }}>
            <div className="text-center mt-1" style={{}}>
              <span
                className=""
                style={{ fontWeight: "550", fontSize: "29px" }}
              >
                LỰA CHỌN CẤU HÌNH
              </span>
            </div>
            <div className="d-flex mt-4">
              <div className="" style={{ width: "100%" }}>
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
                    {rams.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.dungLuong + "GB"}
                        </MenuItem>
                      );
                    })}
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
                    {roms.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.dungLuong === 1024
                            ? 1 + "TB"
                            : item.dungLuong + "GB"}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="mx-auto ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth sx={{ width: 355 }}>
                  <InputLabel id="demo-simple-select-label">Màu Sắc</InputLabel>
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
                                  <Checkbox
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
                                        setValueColor((val) => [...val, item]);
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
                                  <Checkbox
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
                                        setValueColor((val) => [...val, item]);
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
                                                          pointerEvents: "none",
                                                        }}
                                                      />
                                                    )}
                                                    <Checkbox
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
                  if (!ram) {
                    handleOpenAlertVariant("Bạn chưa chọn RAM!", "warning");
                  } else if (!rom) {
                    handleOpenAlertVariant("Bạn chưa chọn ROM!", "warning");
                  } else if (valueColorFinal.length === 0) {
                    handleOpenAlertVariant("Bạn chưa chọn màu sắc!", "warning");
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
                      [...cauHinhs, cauHinhMoi].sort(
                        (a, b) => a.ram.dungLuong - b.ram.dungLuong
                      )
                    );
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
            <CauHinhTable />
            <div className="mt-4 text-end">
              <Button
                onClick={() => {
                  close();
                }}
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
          <div className="" style={{ height: "10px" }}></div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openModalUpdate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModalUpdate}
        maxWidth="xl"
        maxHeight="xl"
        sx={{
          marginBottom: "170px",
        }}
      >
        <DialogContent className="">
          <div style={{ width: "600px", height: "auto" }}>
            <div className="text-center mt-1" style={{}}>
              <span
                className=""
                style={{ fontWeight: "550", fontSize: "29px" }}
              >
                CẬP NHẬT CẤU HÌNH
              </span>
            </div>
            <div className="d-flex mt-4">
              <div className="" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <Select
                    className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedRam}
                    onChange={(e) => setSelectedRam(e.target.value)}
                    startAdornment={
                      <>
                        <InputAdornment
                          position="start"
                          style={{ marginBottom: "1px" }}
                        >
                          RAM
                        </InputAdornment>
                      </>
                    }
                  >
                    {rams.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.dungLuong + "GB"}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="ms-3" style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <Select
                    className="custom"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedRom}
                    onChange={(e) => setSelectedRom(e.target.value)}
                    startAdornment={
                      <>
                        <InputAdornment
                          position="start"
                          style={{ marginBottom: "1px" }}
                        >
                          ROM
                        </InputAdornment>
                      </>
                    }
                  >
                    {roms.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item}>
                          {item.dungLuong === 1024
                            ? 1 + "TB"
                            : item.dungLuong + "GB"}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mx-auto mt-3" style={{ width: "100%" }}>
              <FormControl fullWidth>
                <Select
                  className="custom"
                  onOpen={handleOpenSelectColorSelected}
                  open={openSelectColorSelected}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={0}
                  startAdornment={
                    <>
                      <InputAdornment
                        position="start"
                        style={{ marginBottom: "1px" }}
                      >
                        Màu Sắc
                      </InputAdornment>
                    </>
                  }
                >
                  <MenuItem style={{ display: "none" }} value={0}>
                    {selectColorSelected
                      ? joinedColorsSelected
                      : "Chọn Màu Sắc"}
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
                    <div style={{ height: "589px" }}>
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
                              style={{ marginBottom: "2px", fontWeight: "500" }}
                            >
                              Tìm Kiếm
                            </span>
                          </Button>
                          <Button
                            onClick={() => setSelectedColors([])}
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
                              style={{ marginBottom: "2px", fontWeight: "500" }}
                            >
                              Làm Mới
                            </span>
                          </Button>
                        </div>
                        <div className="d-flex">
                          <Button
                            onClick={() => {
                              if (selectedColors.length === 0) {
                                setSelectColorSelected(false);
                                setValueColorFinalSelected([]);
                                handleCloseSelectColorSelected();
                              } else {
                                setSelectColorSelected(true);
                                setValueColorFinalSelected(selectedColors);
                                handleCloseSelectColorSelected();
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
                              style={{ marginBottom: "2px", fontWeight: "500" }}
                            >
                              Xác Nhận
                            </span>
                          </Button>
                          <Button
                            onClick={() => {
                              handleCloseSelectColorSelected();
                              setSelectedColors(valueColorFinalSelected);
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
                              style={{ marginBottom: "2px", fontWeight: "500" }}
                            >
                              Hủy Bỏ
                            </span>
                          </Button>
                        </div>
                      </div>
                      <div className="scroll-color mt-4" style={{}}>
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
                                <Checkbox
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
                                  checked={selectedColors.includes(item)}
                                  variant={
                                    selectedColors.includes(item)
                                      ? "soft"
                                      : "outlined"
                                  }
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setSelectedColors((val) => [
                                        ...val,
                                        item,
                                      ]);
                                    } else {
                                      setSelectedColors((val) =>
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
                            {selectedColors.map((item, index) => (
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
                                <Checkbox
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
                                  checked={selectedColors.includes(item)}
                                  variant={
                                    selectedColors.includes(item)
                                      ? "soft"
                                      : "outlined"
                                  }
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setSelectedColors((val) => [
                                        ...val,
                                        item,
                                      ]);
                                    } else {
                                      setSelectedColors((val) =>
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
                                                        pointerEvents: "none",
                                                      }}
                                                    />
                                                  )}
                                                  <Checkbox
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
                                                      listColorCurrent === item
                                                        ? "soft"
                                                        : "outlined"
                                                    }
                                                    checked={
                                                      listColorCurrent === item
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
                                              setSelectedColors(
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
          <div className="mt-4 text-end">
            <Button
              onClick={() => {
                if (!selectedRam) {
                  handleOpenAlertVariant("Bạn chưa chọn RAM!", "warning");
                } else if (!selectedRom) {
                  handleOpenAlertVariant("Bạn chưa chọn ROM!", "warning");
                } else if (valueColorFinalSelected.length === 0) {
                  handleOpenAlertVariant("Bạn chưa chọn màu sắc!", "warning");
                } else if (
                  selectedRam.dungLuong === defaultRam.dungLuong &&
                  selectedRom.dungLuong === defaultRom.dungLuong
                ) {
                  updateData(
                    selectedId,
                    defaultRam,
                    defaultRom,
                    valueColorFinalSelected
                  );
                  handleCloseModalUpdate();
                  handleOpenAlertVariant(
                    "Cập nhật cấu hình thành công!",
                    Notistack.SUCCESS
                  );
                } else if (
                  cauHinhs.some(
                    (d) =>
                      d.ram.dungLuong === selectedRam.dungLuong &&
                      d.rom.dungLuong === selectedRom.dungLuong
                  )
                ) {
                  handleOpenAlertVariant(`Cấu hình đã tồn tại!`, "warning");
                } else {
                  updateData(
                    selectedId,
                    selectedRam,
                    selectedRom,
                    valueColorFinalSelected
                  );
                  handleCloseModalUpdate();
                  handleOpenAlertVariant(
                    "Cập nhật cấu hình thành công!",
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
                Xác Nhận
              </span>
            </Button>
          </div>
        </DialogContent>
        <div className="mt-2"></div>
      </Dialog>
    </>
  );
};
export default ModalCauHinh;
