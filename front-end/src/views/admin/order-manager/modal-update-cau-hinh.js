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

const ModalUpdateCauHinh = ({
  open,
  close,
  updateData,
  defaultRam,
  defaultRom,
  id,
  colorsHadSelect,
  list,
  rams,
  roms,
  listColor,
  listFinal,
}) => {
  const [selectedRam, setSelectedRam] = useState(defaultRam);
  const [selectedRom, setSelectedRom] = useState(defaultRom);
  const [selectedColors, setSelectedColors] = useState(colorsHadSelect);
  const [selectedId, setSelectedId] = useState(id);
  const [valueColorFinalSelected, setValueColorFinalSelected] =
    useState(colorsHadSelect);
  const [openSelectColorSelected, setOpenSelectColorSelected] = useState(false);
  const [selectColorSelected, setSelectColorSelected] = useState(false);

  useEffect(() => {
    setSelectedRam(defaultRam);
    setSelectedRom(defaultRom);
    setSelectedId(id);
    setSelectedColors(colorsHadSelect);
    setValueColorFinalSelected(colorsHadSelect);
    setCauHinhs(list);
  }, [defaultRom, defaultRam, colorsHadSelect, id, list]);

  const [listColorCurrent, setListColorCurrent] = useState([]);

  const update = (id, ram, rom, colors) => {
    updateData(id, ram, rom, colors);
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [cauHinhs, setCauHinhs] = useState(list);
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
    if (item.colors.length > 0) {
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

  // const [valueColorFinal, setValueColorFinal] = useState([]);

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

  // const joinedColors = joinedStringArr(valueColorFinal.map((color) => color.tenMauSac));
  const joinedColorsSelected = joinedStringArr(
    selectedColors.map((color) => color.tenMauSac)
  );

  const [colors, setColors] = useState(listColor);

  const filterColors = listColor.filter((color) =>
    color.tenMauSac.toLowerCase().includes(keyword.toLowerCase())
  );

  const getKeyword = (value) => {
    setKeyword(value);
  };

  // const [ram, setRam] = useState();
  // const [rom, setRom] = useState();
  // const handleChangeRom = (event) => {
  //   setRom(event.target.value);
  // };
  // const handleChangeRam = (event) => {
  //   setRam(event.target.value);
  // };

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
                  // handleOpenModalUpdate();
                  // setSelectedRam(record.ram);
                  // setDefaultRam(record.ram);
                  // setDefaultRom(record.rom);
                  // setSelectedRom(record.rom);
                  // setSelectedColors(record.colors);
                  // setValueColorFinalSelected(record.colors);
                  // setSelectedId(record.id)
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
        onClose={() => {
          close();
          setSelectedColors(colorsHadSelect);
          setValueColorFinalSelected(colorsHadSelect);
          setSelectedRam(defaultRam);
          setSelectedRom(defaultRom);
        }}
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
                    {rams
                      // .slice() // Tạo một bản sao của danh sách để tránh làm thay đổi danh sách gốc
                      // .sort((ram1, ram2) => ram1.dungLuong - ram2.dungLuong)
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
                    {roms
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
                    {selectedColors.length > 0
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
                    <div
                      style={{
                        height:
                          cauHinhs.length > 0 && listFinal.length > 0
                            ? "589px"
                            : "455px",
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
                            {filterColors.map((item) => (
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
                            {selectedColors.map((item) => (
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
                      {cauHinhs.length > 0 && listFinal.length > 0 ? (
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
                                              (item) => (
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
                } else if (
                  selectedRam.dungLuong === defaultRam.dungLuong &&
                  selectedRom.dungLuong === defaultRom.dungLuong
                ) {
                  update(
                    selectedId,
                    defaultRam,
                    defaultRom,
                    valueColorFinalSelected
                  );
                  close();
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
                  update(
                    selectedId,
                    selectedRam,
                    selectedRom,
                    valueColorFinalSelected
                  );
                  close();
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
export default ModalUpdateCauHinh;
