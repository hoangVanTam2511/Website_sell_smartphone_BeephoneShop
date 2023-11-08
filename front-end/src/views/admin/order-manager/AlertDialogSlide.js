import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { Button, Table as TableAntd } from "antd";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Drawer,
  Dialog,
  Input,
  Select as SelectMui,
  IconButton,
  Slide,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  InputAdornment,
} from "@mui/material";
import styleCss from "./style.css";
import { format } from "date-fns";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LoadingIndicator from "../../../utilities/loading.js";
import { Notistack, OrderStatusString, TypeDiscountNumber, TypeDiscountString } from "./enum";
import { parseInt } from "lodash";
import { useSnackbar } from "notistack";
import useCustomSnackbar from "../../../utilities/notistack";
import PriceSlider from "./rangePriceSlider";
import InputNumberAmount from "./input-number-amount-product.js";

const PrettoSlider = styled(Slider)({
  color: "#2f80ed",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 25,
    height: 25,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#2f80ed",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Transition1 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function OrderPendingConfirmCloseDialog(props) {
  const { open, onClose, ma, deleteOrder } = props;

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition1}
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        sx={{
          height: "300px",
          "& .MuiPaper-root": {
            borderRadius: "15px", // Giá trị border radius tùy chỉnh
            marginTop: "150px",
          },
        }}
      >
        <div className="p-2" style={{}}>
          <DialogTitle
            sx={{ color: "#dc3333", fontWeight: "bold", fontSize: "18px" }}
            id="alert-dialog-title"
          >
            {"Đóng đơn hàng " + ma}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Thông tin của{" "}
              <span className="" style={{ fontWeight: "500" }}>
                {" "}
                Đơn hàng {ma}
              </span>{" "}
              sẽ không được lưu lại. Bạn có chắc chắn muốn đóng
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={deleteOrder}
              className="rounded-2 me-2 button-mui"
              type="primary"
              style={{
                height: "40px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Xác nhận
              </span>
            </Button>
            <Button
              onClick={onClose}
              className="rounded-2 me-3 ant-btn-danger"
              type="primary"
              style={{
                height: "40px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Hủy bỏ
              </span>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export function UpdateRecipientOrderDialog(props) {
  const ITEM_HEIGHT = 98;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const { open, onClose, onCloseNoAction } = props;

  return (
    <div className="rounded-pill">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {
            <span className="fs-4 text-dark text-uppercase">
              Cập Nhật Thông Tin
            </span>
          }
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Họ và tên"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size="medium"
              className="mt-1"
            />
          </div>
          <div>
            <TextField
              label="Số điện thoại"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size="medium"
              className="mt-3"
            />
          </div>
          <div className="d-flex mt-3">
            <FormControl sx={{ width: 250 }}>
              <InputLabel id="demo-multiple-name-label">
                Tỉnh / Thành Phố
              </InputLabel>
              <SelectMui
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                input={<OutlinedInput label="Tỉnh / Thành Phố" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </SelectMui>
            </FormControl>
            <FormControl sx={{ width: 250 }} className="ms-3">
              <InputLabel id="demo-multiple-name-label">
                Quận / Huyện
              </InputLabel>
              <SelectMui
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                input={<OutlinedInput label="Quận / Huyện" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </SelectMui>
            </FormControl>
            <FormControl sx={{ width: 250 }} className="ms-3">
              <InputLabel id="demo-multiple-name-label">Phường / Xã</InputLabel>
              <SelectMui
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                input={<OutlinedInput label="Phường / Xã" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </SelectMui>
            </FormControl>
          </div>
          <div>
            <TextField
              label="Địa chỉ"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size="medium"
              className="mt-3"
            />
          </div>
          <div>
            <TextField
              label="Mô tả"
              inputProps={{
                style: {
                  width: "755px",
                  paddingBottom: "60px",
                },
              }}
              size="medium"
              className="mt-3"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Link to={""}>
            <Button
              onClick={onClose}
              danger
              className="rounded-2 me-3 bg-primary"
              type="primary"
              style={{
                height: "50px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "550", marginBottom: "2px" }}
              >
                Xác nhận
              </span>
            </Button>
            <Button
              onClick={onCloseNoAction}
              danger
              className="rounded-2 me-3"
              type="primary"
              style={{
                height: "50px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
                backgroundColor: "#dc3333",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "550", marginBottom: "2px" }}
              >
                Hủy bỏ
              </span>
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function PaymentDialog(props) {
  const { open, onClose, onCloseNoAction, payment } = props;

  return (
    <div className="rounded-pill">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {
            <span className="fs-4 text-dark text-uppercase">
              Tiến Hành Thanh Toán
            </span>
          }
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Số tiền"
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size="medium"
              className="mt-2"
            />
          </div>
          <div>
            <TextField
              label="Ghi chú"
              inputProps={{
                style: {
                  width: "755px",
                  paddingBottom: "60px",
                },
              }}
              size="medium"
              className="mt-3"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Link to={""}>
            <Button
              onClick={onClose}
              danger
              className="rounded-2 me-2 bg-primary"
              type="warning"
              style={{
                height: "40px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-dark"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Tiền mặt
              </span>
            </Button>
            <Button
              onClick={onClose}
              className="rounded-2 me-2"
              type="primary"
              style={{
                height: "40px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Chuyển khoản
              </span>
            </Button>
            <Button
              onClick={onCloseNoAction}
              danger
              className="rounded-2 me-3"
              type="danger"
              style={{
                height: "40px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Hủy bỏ
              </span>
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function ProductsDialog(props) {
  const {
    isOpen,
    open,
    onClose,
    data,
    add,
    openProductDetails,
    openDialogProductItems,
    closeDialogProductDetails,
    closeNoActionDialogProductDetails,
    getAmount
  } = props;
  const StyledTableContainer = styled(TableContainer)({
    boxShadow: "none",
  });


  const [openSelect, setOpenSelect] = useState(false);
  const [openSelect1, setOpenSelect1] = useState(false);
  const [openSelect2, setOpenSelect2] = useState(false);
  const [openSelect3, setOpenSelect3] = useState(false);
  const [openSelect4, setOpenSelect4] = useState(false);
  const [openSelect5, setOpenSelect5] = useState(false);
  const [openSelect6, setOpenSelect6] = useState(false);
  const [openSelect7, setOpenSelect7] = useState(false);
  const [openSelect8, setOpenSelect8] = useState(false);
  const [openSelect9, setOpenSelect9] = useState(false);

  const filterProducts = data.filter((i) => i.soLuongTonKho > 0);
  const addProductToCart = (priceProduct, idProduct, amount) => {
    add(priceProduct, idProduct, amount);
  };

  const StyledTableHead = styled(TableHead)`
    & tr:hover th {
      background-color: white !important;
    }
  `;

  const useStyles = () => ({});

  const classes = useStyles();

  const TableProduct = () => {
    return (
      <>
        <div className="">
          <StyledTableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, boxShadow: "none" }}
              aria-label="simple table"
              className={classes.tableContainer}
            >
              <StyledTableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Ảnh
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Mã Sản Phẩm
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Tên Sản Phẩm
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    RAM
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    ROM
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Màu sắc
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Hãng
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Hệ điều hành
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Giá
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Số lượng tồn
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Thao Tác
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {data &&
                  filterProducts.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        style={{ width: "200px" }}
                      >
                        <img
                          src={item && item.image && item.image.path}
                          alt=""
                          style={{ width: "110px", height: "110px" }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", width: "" }}
                      >
                        No.900{index + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          width: "430px",
                          fontSize: "16px",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item &&
                          item.sanPham &&
                          item.sanPham.tenSanPham +
                          " " +
                          item.ram.dungLuong +
                          "/" +
                          item.rom.dungLuong +
                          "GB"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", width: "120px" }}
                      >
                        {item.ram.dungLuong + "GB"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", width: "120px" }}
                      >
                        {item.rom.dungLuong + "GB"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", width: "120px" }}
                      >
                        {item.mauSac.tenMauSac}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", width: "120px" }}
                      >
                        {"Apple"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", width: "120px" }}
                      >
                        {"IOS"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ width: "150px", fontSize: "16px" }}
                      >
                        <span style={{ color: "#dc1111" }}>
                          {item && item.donGia
                            ? item.donGia.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                            : ""}
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "16px", width: "" }}
                      >
                        {item.soLuongTonKho}
                      </TableCell>
                      <TableCell align="center" style={{ width: "230px" }}>
                        <Button
                          onClick={() => {
                            handleOpenDialogProductItems(item);
                          }}
                          className="rounded-2 button-mui"
                          type="primary"
                          style={{ width: "82px", fontSize: "14px" }}
                        >
                          <span
                            className=""
                            style={{ fontWeight: "500", marginBottom: "3px" }}
                          >
                            Chọn
                          </span>
                        </Button>
                        <Button
                          className="rounded-2 ms-2 ant-btn-warning"
                          onClick={toggleDrawer("left", true)}
                          type="primary"
                          style={{ width: "82px", fontSize: "14px" }}
                        >
                          <span
                            className=""
                            style={{ fontWeight: "500", marginBottom: "3px" }}
                          >
                            Chi tiết
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </>
    );
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect1 = () => {
    setOpenSelect1(false);
  };

  const handleOpenSelect1 = () => {
    setOpenSelect1(true);
  };
  const handleCloseSelect2 = () => {
    setOpenSelect2(false);
  };

  const handleOpenSelect2 = () => {
    setOpenSelect2(true);
  };
  const handleCloseSelect3 = () => {
    setOpenSelect3(false);
  };

  const handleOpenSelect3 = () => {
    setOpenSelect3(true);
  };
  const handleCloseSelect4 = () => {
    setOpenSelect4(false);
  };

  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [isRangePrice, setIsRangePrice] = useState(false);

  const handleOpenSelect4 = () => {
    setOpenSelect4(true);
  };
  const handleCloseSelect5 = () => {
    setOpenSelect5(false);
  };

  const handleOpenSelect5 = () => {
    setOpenSelect5(true);
  };
  const handleCloseSelect6 = () => {
    setOpenSelect6(false);
  };

  const handleOpenSelect6 = () => {
    setOpenSelect6(true);
  };
  const handleCloseSelect7 = () => {
    setOpenSelect7(false);
  };

  const handleOpenSelect7 = () => {
    setOpenSelect7(true);
  };
  const handleCloseSelect8 = () => {
    setOpenSelect8(false);
  };

  const handleOpenSelect8 = () => {
    setOpenSelect8(true);
  };
  const handleCloseSelect9 = () => {
    setOpenSelect9(false);
  };

  const handleOpenSelect9 = () => {
    setOpenSelect9(true);
  };


  const [productItem, setProductItem] = useState();
  const [productItem1, setProductItem1] = useState();
  const [productItem2, setProductItem2] = useState();
  const [productImage, setProductImage] = useState();
  const [productItems, setProductItems] = useState([]);
  const [productItems1, setProductItems1] = useState([]);

  const handleChangeInfoProductItem = (item, color) => {
    const product = {
      id: item.id,
      ram: item.ram,
      rom: item.rom,
      mauSac: item.mauSac,
      donGia: item.donGia,
      sanPham: item.sanPham,
    };

    const getProductItems1 = data.filter((i) => i.maCauHinh == item.maCauHinh);
    const sortedProductItems1 = getProductItems1.sort(
      (a, b) => a.donGia - b.donGia
    );
    setProductItems1(sortedProductItems1);
    setProductItem1(product);

    const findColor = data.find(
      (i) =>
        i.mauSac.tenMauSac === color &&
        i.maCauHinh === item.maCauHinh &&
        i.soLuongTonKho > 0
    );
    if (findColor) {
      setProductItem2(findColor);
    } else {
      setProductItem2(item);
      // Tìm vè giá be nhat ?? chưa làm
    }
    console.log(findColor);
    // console.log(product);
  };
  const handleChangeProductImage = (item) => {
    const product = {
      id: item.id,
      image: item.image,
      soLuongTonKho: item.soLuongTonKho,
      mauSac: item.mauSac,
      donGia: item.donGia,
    };
    setProductItem2(product);
    console.log(product);
  };

  const handleOpenDialogProductItems = (item) => {
    openDialogProductItems();
    setProductItem(item); // general
    setProductItem1(item); //ten va cau hinh, gia
    setProductItem2(item); // so luong va image

    // const getProductItems = data.filter((item, index) => {
    //   const isDuplicate = data.some((i, iIndex) => i.donGia === item.donGia && iIndex < index);
    //   return !isDuplicate;
    // });

    const getIdByItem = item && item.sanPham.id;
    const uniqueItems = Object.values(
      data.reduce((acc, item) => {
        if (
          (!acc[item.maCauHinh] ||
            (acc[item.maCauHinh].donGia > item.donGia && !acc[item.maCauHinh].isDuplicate)) && item.sanPham.id === getIdByItem) {
          acc[item.maCauHinh] = item;
        } else if (
          acc[item.maCauHinh] && acc[item.maCauHinh].isDuplicate &&
          acc[item.maCauHinh].donGia > item.donGia
        ) {
          acc[item.maCauHinh] = {
            ...item,
            isDuplicate: false,
          };
        }
        return acc;
      }, {})
    );
    const sortedProductItems = uniqueItems.sort((a, b) => a.donGia - b.donGia);
    setProductItems(sortedProductItems);

    const getProductItems1 = data.filter((i) => i.maCauHinh === item.maCauHinh);
    const sortedProductItems1 = getProductItems1.sort(
      (a, b) => a.donGia - b.donGia
    );
    setProductItems1(sortedProductItems1);
  };

  const [open1, setOpen1] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen1(true);
  };
  const onClose1 = () => {
    setOpen1(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const [categorys, setCategorys] = useState("Tất cả");
  const handleChangeCategory = (event) => {
    const value = event.target.value;
    setCategorys(value);
  };

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 800 }}
      role="dialog"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

  const handleFormatValue = (value) => {
    let valueFinal;
    valueFinal = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return valueFinal;
  };

  const [valueSlider, setValueSlider] = React.useState([0, 51990000]);
  const [valueStart, setValueStart] = React.useState(
    valueSlider && handleFormatValue(valueSlider[0])
  );
  const [valueEnd, setValueEnd] = React.useState(
    valueSlider && handleFormatValue(valueSlider[1])
  );

  const handleChangeSlider = (event, newValue) => {
    setValueSlider(newValue);
    setValueStart(newValue && handleFormatValue(newValue[0]));
    setValueEnd(newValue && handleFormatValue(newValue[1]));
  };

  const handleChangeValueEnd = (event) => {
    const valueSliderFirst = valueSlider[0];
    const value = event.target.value;
    const parseValueToNumber = parseFloat(value.replace(/[^0-9.-]+/g, ""));

    let valueFinal;
    valueFinal = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueEnd(valueFinal);
    setValueSlider([valueSliderFirst, parseValueToNumber]);
    if (value === null || value === "") {
      setValueEnd("");
      setValueSlider([valueSliderFirst, 0]);
    } else if (parseValueToNumber > 51900000) {
      let valueOld = 51900000;
      valueFinal = String(valueOld)
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValueEnd(valueFinal);
      setValueSlider([valueSliderFirst, valueOld]);
    }
  };
  const handleChangeValueStart = (event) => {
    const valueSliderEnd = valueSlider[1];
    const value = event.target.value;
    const parseValueToNumber = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    let valueFinal;
    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueStart(valueFinal);
    setValueSlider([parseValueToNumber, valueSliderEnd]);

    if (value === null || value === "") {
      setValueStart("");
      setValueSlider([0, valueSliderEnd]);
    } else if (parseValueToNumber > 51900000) {
      let valueOld = 51900000;
      valueFinal = String(valueOld)
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValueStart(valueFinal);
      setValueSlider([valueOld, valueSliderEnd]);
    }
  };

  const [selectedValues, setSelectedValues] = React.useState([0]);
  const [selectedValues1, setSelectedValues1] = React.useState([0]);
  const [selectedValues2, setSelectedValues2] = React.useState([0]);
  const [selectedValues3, setSelectedValues3] = React.useState([0]);
  const [selectedValues4, setSelectedValues4] = React.useState([0]);
  const [selectedValues5, setSelectedValues5] = React.useState([0]);
  const [selectedValues6, setSelectedValues6] = React.useState([0]);
  const [selectedValues7, setSelectedValues7] = React.useState([0]);
  const [selectedValues8, setSelectedValues8] = React.useState([0]);
  const [selectedValues9, setSelectedValues9] = React.useState([0]);

  return (
    <div className="rounded-pill">
      <Dialog
        className=""
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="xl"
        maxHeight="xl"
        fullWidth="xl"
        sx={{
          zIndex: 1250,
        }}
      >
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          sx={{
            zIndex: 1250,
          }}
        >
          {list("left")}
        </Drawer>
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex justify-content-between mt-1">
            <div>
              <span
                className="text-dark"
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                Tìm Kiếm Sản Phẩm
              </span>
            </div>
            <div>
              <Tooltip title="Đóng" TransitionComponent={Zoom}>
                <IconButton size="small" onClick={onClose}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          {isOpen === true ?
            <>
              <div className="mt-1 pt-1 d-flex">
                <TextField
                  label="Tìm sản phẩm"
                  // onChange={handleGetValueFromInputTextField}
                  // value={keyword}
                  InputLabelProps={{
                    sx: {
                      textTransform: "capitalize",
                    },
                  }}
                  style={{ height: "23px" }}
                  inputProps={{
                    style: {
                      // height: "23px",
                      width: "250px",
                    },
                  }}
                  size="small"
                  className=""
                />
                <Button
                  // onClick={handleRefreshData}
                  className="rounded-2 ms-3"
                  type="warning"
                  style={{
                    height: "40px",
                    width: "100px",
                    fontSize: "15px",
                    backgroundColor: "#FFB61E",
                  }}
                >
                  <span
                    className="text-dark"
                    style={{ fontWeight: "550", marginBottom: "2px" }}
                  >
                    Làm Mới
                  </span>
                </Button>
                <div
                  className="ms-3 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Nhu cầu:{" "}
                    </span>
                  </div>
                  <FormControl sx={{ maxWidth: 180 }} size="small">
                    <SelectMui
                      multiple
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      defaultValue={selectedValues}
                      value={selectedValues}
                      onChange={(e) => {
                        setSelectedValues(e.target.value);
                      }}
                    >
                      {selectedValues.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn nhu cầu
                        </MenuItem>
                      )}
                      <MenuItem value={1}>Chơi game</MenuItem>
                      <MenuItem value={2}>Pin trâu</MenuItem>
                      <MenuItem value={3}>Chụp ảnh, quay phim</MenuItem>
                      <MenuItem value={4}>Livestream</MenuItem>
                      <MenuItem value={5}>Nhỏ gọn</MenuItem>
                      <MenuItem value={6}>Cấu hình cao</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-1 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect1} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Hãng:{" "}
                    </span>
                  </div>
                  <FormControl
                    sx={{
                      maxWidth: 150,
                    }}
                    size="small"
                  >
                    <SelectMui
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect1}
                      onClose={handleCloseSelect1}
                      onOpen={handleOpenSelect1}
                      defaultValue={selectedValues1}
                      value={selectedValues1}
                      onChange={(e) => {
                        setSelectedValues1(e.target.value);
                      }}
                      multiple
                    >
                      {selectedValues1.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn hãng
                        </MenuItem>
                      )}
                      <MenuItem value={1}>Iphone</MenuItem>
                      <MenuItem value={2}>Samsung</MenuItem>
                      <MenuItem value={3}>Oppo</MenuItem>
                      <MenuItem value={4}>Xiaomi</MenuItem>
                      <MenuItem value={5}>Readme</MenuItem>
                      <MenuItem value={6}>Nokia</MenuItem>
                      <MenuItem value={7}>Vivo</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-1 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect2} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Loại điện thoại:{" "}
                    </span>
                  </div>
                  <FormControl
                    sx={{
                      maxWidth: 150,
                    }}
                    size="small"
                  >
                    <SelectMui
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect2}
                      onClose={handleCloseSelect2}
                      onOpen={handleOpenSelect2}
                      multiple
                      defaultValue={selectedValues2}
                      value={selectedValues2}
                      onChange={(e) => {
                        setSelectedValues2(e.target.value);
                      }}
                    >
                      {selectedValues2.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn loại
                        </MenuItem>
                      )}
                      <MenuItem value={1}>Iphone</MenuItem>
                      <MenuItem value={2}>Android</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>
                <div
                  className="ms-1 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect3} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Chip xử lý:{" "}
                    </span>
                  </div>
                  <FormControl
                    sx={{
                      maxWidth: 160,
                    }}
                    size="small"
                  >
                    <SelectMui
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect3}
                      onClose={handleCloseSelect3}
                      onOpen={handleOpenSelect3}
                      defaultValue={selectedValues3}
                      value={selectedValues3}
                      onChange={(e) => {
                        setSelectedValues3(e.target.value);
                      }}
                      multiple
                    >
                      {selectedValues3.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn chip
                        </MenuItem>
                      )}
                      <MenuItem value={1}>Snapdragon</MenuItem>
                      <MenuItem value={2}>Apple A</MenuItem>
                      <MenuItem value={3}>Mediatek Helio</MenuItem>
                      <MenuItem value={4}>Mediatek Dimensity</MenuItem>
                      <MenuItem value={5}>Exynos</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>
              </div>

              <div className="d-flex mt-3 mx-auto ms-4 ps-3">
                <PriceSlider />
                <div
                  className="ms-1 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect5} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Bộ nhớ trong:{" "}
                    </span>
                  </div>
                  <FormControl
                    sx={{
                      maxWidth: 150,
                    }}
                    size="small"
                  >
                    <SelectMui
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect5}
                      onClose={handleCloseSelect5}
                      onOpen={handleOpenSelect5}
                      defaultValue={selectedValues5}
                      value={selectedValues5}
                      onChange={(e) => {
                        setSelectedValues5(e.target.value);
                      }}
                      multiple
                    >
                      {selectedValues5.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn bộ nhớ
                        </MenuItem>
                      )}
                      <MenuItem value={1}>16GB</MenuItem>
                      <MenuItem value={2}>32GB</MenuItem>
                      <MenuItem value={3}>64GB</MenuItem>
                      <MenuItem value={4}>128GB</MenuItem>
                      <MenuItem value={5}>256GB</MenuItem>
                      <MenuItem value={6}>512GB</MenuItem>
                      <MenuItem value={7}>1TB</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-1 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect6} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Dung lượng RAM:{" "}
                    </span>
                  </div>
                  <FormControl
                    sx={{
                      maxWidth: 130,
                    }}
                    size="small"
                  >
                    <SelectMui
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect6}
                      onClose={handleCloseSelect6}
                      onOpen={handleOpenSelect6}
                      defaultValue={selectedValues6}
                      value={selectedValues6}
                      onChange={(e) => {
                        setSelectedValues6(e.target.value);
                      }}
                      multiple
                    >
                      {selectedValues6.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn RAM
                        </MenuItem>
                      )}
                      <MenuItem value={1}>2GB</MenuItem>
                      <MenuItem value={2}>3GB</MenuItem>
                      <MenuItem value={3}>4GB</MenuItem>
                      <MenuItem value={4}>6GB</MenuItem>
                      <MenuItem value={5}>8GB</MenuItem>
                      <MenuItem value={6}>12GB</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-1 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect7} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Màn hình:{" "}
                    </span>
                  </div>
                  <FormControl
                    sx={{
                      maxWidth: 170,
                    }}
                    size="small"
                  >
                    <SelectMui
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect7}
                      onClose={handleCloseSelect7}
                      onOpen={handleOpenSelect7}
                      defaultValue={selectedValues7}
                      value={selectedValues7}
                      onChange={(e) => {
                        setSelectedValues7(e.target.value);
                      }}
                      multiple
                    >
                      {selectedValues7.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn kích thước
                        </MenuItem>
                      )}
                      <MenuItem value={1}>Dưới 6 inch</MenuItem>
                      <MenuItem value={2}>Trên 6 inch</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-1 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenSelect8} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Tính năng đặc biệt:{" "}
                    </span>
                  </div>
                  <FormControl
                    sx={{
                      maxWidth: 160,
                    }}
                    size="small"
                  >
                    <SelectMui
                      MenuProps={{
                        PaperProps: {
                          style: {
                            borderRadius: "7px",
                          },
                        },
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                        "& .MuiSelect-select": {
                          color: "#288ad6",
                          fontWeight: "500",
                        },
                      }}
                      open={openSelect8}
                      onClose={handleCloseSelect8}
                      onOpen={handleOpenSelect8}
                      defaultValue={selectedValues8}
                      value={selectedValues8}
                      onChange={(e) => {
                        setSelectedValues8(e.target.value);
                      }}
                      multiple
                    >
                      {selectedValues8.length === 1 && selectedValues[0] == 0 && (
                        <MenuItem
                          className=""
                          value={0}
                          style={{ display: "none" }}
                        >
                          Chọn tính năng
                        </MenuItem>
                      )}
                      <MenuItem value={1}>Kháng nước, kháng bụi</MenuItem>
                      <MenuItem value={2}>Hỗ trợ 5G</MenuItem>
                      <MenuItem value={3}>Bảo mật vân tay</MenuItem>
                      <MenuItem value={4}>Bảo mật khuôn mặt</MenuItem>
                      <MenuItem value={5}>Sạc không dây</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>
              </div>
              <div className="mt-3">
                <TableProduct />
              </div>
            </>
            : null}
        </DialogContent>

        <DialogActions></DialogActions>
      </Dialog>
      <ProductDetailsDialog
        isOpen={isOpen}
        open={openProductDetails}
        onCloseNoAction={closeDialogProductDetails}
        onClose={closeNoActionDialogProductDetails}
        addProduct={addProductToCart}
        productItem={productItem}
        productItem1={productItem1}
        productItem2={productItem2}
        getProductItems={productItems}
        getProductItems1={productItems1}
        changeProductItem={handleChangeInfoProductItem}
        changeProductImage={handleChangeProductImage}
        getAmount={getAmount}
      />
    </div>
  );
}

export function VouchersDialog(props) {
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const {
    open,
    onClose,
    onCloseNoAction,
    data,
    add,
    discount,
    total,
    checkDieuKien,
  } = props;
  const [voucherId, setVoucherId] = useState();
  const StyledTableContainer = styled(TableContainer)({
    boxShadow: "none",
  });

  const getDieuKien = (dieuKien) => {
    checkDieuKien(dieuKien);
  };

  const handleAddOrRemoveVoucherToOrder = (id, dieuKien) => {
    getDieuKien(dieuKien || 0);
    if (total() < dieuKien) {
      handleOpenAlertVariant("Đơn hàng không đủ điều kiện!", Notistack.ERROR);
    } else if (discount === id) {
      add(null, true);
      onClose();
    } else {
      add(id, true);
      onClose();
    }
  };

  const StyledTableHead = styled(TableHead)`
    & tr:hover th {
      background-color: white !important;
    }
  `;

  const useStyles = () => ({});

  const classes = useStyles();
  const filteredData = data.filter((item) => total() >= item.dieuKienApDung);

  const TableVouchers = () => {
    return (
      <>
        <div className="">
          <StyledTableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, boxShadow: "none" }}
              aria-label="simple table"
              className={classes.tableContainer}
            >
              <StyledTableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    STT
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Mã
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Giá trị
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Giảm tối đa
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Số lượng
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Điều kiện áp dụng
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Trạng thái
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Tình trạng đơn hàng
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Thao Tác
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {filteredData.length > 0 ? (filteredData.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "15px" }}>
                      {item.ma}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "", fontSize: "15px", color: "#dc1111" }}
                    >
                      {item.giaTriVoucher.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "", fontSize: "15px" }}
                    >
                      {item.loaiVoucher === TypeDiscountNumber.VND ? "..." : item.giaTriToiDa}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "", fontSize: "15px" }}
                    >
                      {item.soLuong}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        width: "200px",
                        fontSize: "15px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      Áp dụng cho đơn tối thiểu
                      <span className="" style={{}}>
                        {" " +
                          item.dieuKienApDung.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "", fontSize: "15px" }}
                    >
                      <div
                        className="rounded-pill badge-primary"
                        style={{
                          height: "35px",
                          width: "auto",
                          padding: "7.5px",
                        }}
                      >
                        <span className="text-white p-2" style={{}}>
                          {item.trangThai == 1 ? "Hoạt động" : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        width: "200px",
                        fontSize: "15px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      <div
                        className={`${item.dieuKienApDung <= total()
                          ? "rounded-pill badge-success"
                          : "rounded-pill badge-danger"
                          }`}
                        style={{
                          height: "35px",
                          width: "auto",
                          padding: "7.5px",
                        }}
                      >
                        <span className="text-white p-2" style={{}}>
                          <span>{`${item.dieuKienApDung <= total()
                            ? "Có thể áp dụng"
                            : "Không thể áp dụng"
                            }`}</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ width: "" }}>
                      <Button
                        onClick={() =>
                          handleAddOrRemoveVoucherToOrder(
                            item.id,
                            item.dieuKienApDung
                          )
                        }
                        className="rounded-2"
                        type={
                          discount === item.id
                            ? "danger"
                            : discount !== item.id
                              ? "warning"
                              : ""
                        }
                        style={{
                          height: "35px",
                          width: "auto",
                          fontSize: "14px",
                        }}
                      >
                        <span
                          className={
                            discount === item.id ? "text-white" : "text-dark"
                          }
                          style={{ fontWeight: "500", marginBottom: "3px" }}
                        >
                          {discount === item.id ? "Bỏ áp dụng" : "Áp dụng"}{" "}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))) : ""}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </>
    );
  };
  return (
    <div className="rounded-pill">
      <Dialog
        className=""
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        fullWidth="lg"
        sx={{}}
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex justify-content-between mt-1">
            <div>
              <span className="text-dark" style={{ fontSize: "22px" }}>
                Tìm Kiếm Voucher
              </span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          <div className="mt-2 d-flex">
            <TextField
              label="Tìm Voucher"
              // onChange={handleGetValueFromInputTextField}
              // value={keyword}
              InputLabelProps={{
                sx: {
                  marginTop: "0.5px",
                  textTransform: "capitalize",
                },
              }}
              inputProps={{
                style: {
                  height: "23px",
                  width: "200px",
                },
              }}
              size="small"
              className=""
            />
            <Button
              // onClick={handleRefreshData}
              className="rounded-2 ms-3 bg-primary"
              type="warning"
              style={{ height: "40px", width: "100px", fontSize: "15px" }}
            >
              <span
                className="text-dark"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Làm Mới
              </span>
            </Button>
          </div>
          <div className="mt-3">
            <TableVouchers />
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export function CustomersDialog(props) {
  const { open, onClose, onCloseNoAction, data, add } = props;
  const [customerId, setCustomerId] = useState();
  const StyledTableContainer = styled(TableContainer)({
    boxShadow: "none",
  });

  const handleSelectCustomer = (id) => {
    add(id);
  };

  const StyledTableHead = styled(TableHead)`
    & tr:hover th {
      background-color: white !important;
    }
  `;

  const useStyles = () => ({});

  const classes = useStyles();

  const TableCusomter = () => {
    return (
      <>
        <div className="">
          <StyledTableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, boxShadow: "none" }}
              aria-label="simple table"
              className={classes.tableContainer}
            >
              <StyledTableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Avatar
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Mã
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Tên Khách Hàng
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Email
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Số Điện Thoại
                  </TableCell>
                  <TableCell style={{ fontWeight: "550" }} align="center">
                    Thao Tác
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <div className="" style={{ marginLeft: "33px" }}>
                        <Avatar src="https://ecdn.game4v.com/g4v-content/uploads/2021/02/ava-1.png" />
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "15px" }}>
                      {item.ma}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        width: "px",
                        fontSize: "15px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.hoVaTen}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "px", fontSize: "15px" }}
                    >
                      {item.email}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "px", fontSize: "15px" }}
                    >
                      {item.soDienThoai}
                    </TableCell>
                    <TableCell align="center" style={{ width: "" }}>
                      <Button
                        onClick={() => handleSelectCustomer(item.id)}
                        className="rounded-2"
                        type="primary"
                        style={{
                          height: "40px",
                          width: "82px",
                          fontSize: "14px",
                        }}
                      >
                        <span
                          className="text-white"
                          style={{ fontWeight: "550", marginBottom: "3px" }}
                        >
                          Chọn
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </div>
      </>
    );
  };
  return (
    <div className="rounded-pill">
      <Dialog
        className=""
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        fullWidth="lg"
        sx={{}}
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex justify-content-between mt-1">
            <div>
              <span className="text-dark" style={{ fontSize: "22px" }}>
                Tìm Kiếm Khách Hàng
              </span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          <div className="mt-2 d-flex">
            <TextField
              label="Tìm Khách Hàng"
              // onChange={handleGetValueFromInputTextField}
              // value={keyword}
              InputLabelProps={{
                sx: {
                  marginTop: "0.5px",
                  textTransform: "capitalize",
                },
              }}
              inputProps={{
                style: {
                  height: "23px",
                  width: "300px",
                },
              }}
              size="small"
              className=""
            />
            <Button
              // onClick={handleRefreshData}
              className="rounded-2 ms-3 bg-primary"
              type="warning"
              style={{ height: "40px", width: "100px", fontSize: "15px" }}
            >
              <span
                className="text-dark"
                style={{ fontWeight: "450", marginBottom: "2px" }}
              >
                Làm Mới
              </span>
            </Button>
          </div>
          <div className="mt-3">
            <TableCusomter />
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export function OrderHistoryDialog(props) {
  const { columns, open, onClose, dataSource } = props;

  return (
    <div className="rounded-pill">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogContent>
          <div style={{ width: "1100px", maxHeight: "500px" }}>
            <TableAntd
              className=""
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ConfirmPaymentDialog(props) {
  const { open, onCloseNoAction, confirmPayment } = props;
  const [description, setDescription] = useState("");

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleCloseDialog = () => {
    setDescription("");
    onCloseNoAction();
  };

  const confirm = (description) => {
    confirmPayment(description);
  };

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {<span className="fs-4 text-dark">{"Xác nhận thanh toán"}</span>}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Ghi chú đơn hàng"
            value={description}
            onChange={handleGetValueFromInputTextField}
            multiline
            maxRows={1}
            inputProps={{
              style: {
                width: "755px",
                paddingBottom: "80px",
              },
            }}
            size="medium"
            className="mt-2"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={confirm}
            className="rounded-2 me-2"
            type="primary"
            style={{
              height: "40px",
              width: "auto",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <span
              className="text-white"
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              Xác nhận
            </span>
          </Button>
          <Button
            onClick={handleCloseDialog}
            className="rounded-2 me-3"
            type="danger"
            style={{
              height: "40px",
              width: "auto",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <span
              className="text-white"
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              Hủy bỏ
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export function ConfirmDialog(props) {
  const {
    open,
    status,
    confirmPreparing,
    confirmOrderInfo,
    confirmDelivery,
    confirmFinish,
    confirmCancel,
    onCloseNoAction,
  } = props;
  const [description, setDescription] = useState("");

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleCloseDialog = () => {
    setDescription("");
    onCloseNoAction();
  };

  const handleConfirm = () => {
    if (status === OrderStatusString.PENDING_CONFIRM) {
      confirmOrderInfo(description);
    } else if (status === OrderStatusString.CONFIRMED) {
      confirmPreparing(description);
    } else if (status === OrderStatusString.PREPARING) {
      confirmDelivery(description);
    } else if (status === OrderStatusString.DELIVERING) {
      confirmFinish(description);
    } else if (status === OrderStatusString.CANCELLED) {
      confirmCancel(description);
    }
    setDescription("");
  };
  const returnConfirmHeader = () => {
    if (status === OrderStatusString.PENDING_CONFIRM) {
      return "Xác nhận đơn hàng";
    } else if (status === OrderStatusString.CONFIRMED) {
      return "Xác nhận đang chuẩn bị hàng";
    } else if (status === OrderStatusString.PREPARING) {
      return "Xác nhận giao hàng";
    } else if (status === OrderStatusString.DELIVERING) {
      return "Xác nhận đã giao";
    } else if (status === OrderStatusString.CANCELLED) {
      return "Xác nhận hủy đơn";
    }
  };

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {<span className="fs-4 text-dark">{returnConfirmHeader()}</span>}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Ghi chú"
            value={description}
            onChange={handleGetValueFromInputTextField}
            multiline
            maxRows={1}
            inputProps={{
              style: {
                width: "755px",
                paddingBottom: "80px",
              },
            }}
            size="medium"
            className="mt-2"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            className="rounded-2 me-2"
            type="primary"
            style={{
              height: "40px",
              width: "auto",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <span
              className="text-white"
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              Xác nhận
            </span>
          </Button>
          <Button
            onClick={handleCloseDialog}
            className="rounded-2 me-3"
            type="danger"
            style={{
              height: "40px",
              width: "auto",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <span
              className="text-white"
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              Hủy bỏ
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export const ProductDetailsDialog = (props) => {
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const {
    isOpen,
    open,
    onClose,
    onCloseNoAction,
    addProduct,
    productItem,
    productItem1,
    productItem2,
    getProductItems,
    getProductItems1,
    changeProductItem,
    changeProductImage,
    getAmount
  } = props;

  const addProductItemsToCart = (productPrice, productId) => {
    addProduct(productPrice, productId);
  };

  const handleChangeCauHinh = (id) => {
    const item = getProductItems.find((item) => item.id === id);
    if (item) {
      changeProductItem(
        item,
        productItem2 && productItem2.mauSac.tenMauSac
      );
    }
  };

  const handleChangeMauSac = (id) => {
    const item = getProductItems1.find((item) => item.id === id);
    if (item) {
      changeProductImage(item);
    }
  };

  const [keyRadio, setKeyRadio] = useState(0);
  const handleSetKey = () => {
    setKeyRadio(keyRadio + 1);
  };

  return (
    <div className="rounded-pill">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
      >
        {isOpen === true ?
          <DialogContent>
            <>
              <div className="" style={{ width: "auto", height: "500px" }}>
                <div className="wrapper-header d-flex justify-content-between">
                  <span style={{ fontWeight: "500", fontSize: "25px" }}>
                    {productItem1 &&
                      productItem1.sanPham.tenSanPham +
                      " " +
                      productItem1.ram.dungLuong +
                      "/" +
                      productItem1.rom.dungLuong +
                      "GB"}
                    <span
                      className="ms-2"
                      style={{ fontSize: "13.5px", color: "gray" }}
                    >
                      (No.9001)
                    </span>
                  </span>
                  <Tooltip title="Đóng" TransitionComponent={Zoom}>
                    <IconButton size="small" onClick={onCloseNoAction}>
                      <CloseOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div
                  className="mt-2"
                  style={{
                    borderBottom: "2px solid #C7C7C7",
                    width: "100%",
                    borderWidth: "1px",
                  }}
                ></div>
                <div className="wrapper-product d-flex">
                  <div className="product-img" style={{ width: "350px" }}>
                    <img
                      className="mt-4 pt-4"
                      style={{ width: "370px", height: "380px" }}
                      src={productItem2 && productItem2.image && productItem2.image.path}

                      alt=""
                    />
                  </div>
                  <div className="product-details mt-5 ms-3 ps-1">
                    <div className="box-choose">
                      <span style={{ fontWeight: "550", fontSize: "14px" }}>
                        LỰA CHỌN CẤU HÌNH VÀ MÀU SẮC
                      </span>
                    </div>
                    <div className="choose1 mt-3 d-flex">
                      <RadioGroup
                        orientation="horizontal"
                        aria-labelledby="storage-label"
                        defaultValue={
                          productItem &&
                          productItem.ram.dungLuong +
                          "/" +
                          productItem.rom.dungLuong +
                          "GB"
                        }
                        size="lg"
                        sx={{ gap: 1.7 }}
                      >
                        {getProductItems &&
                          getProductItems.map((item) => (
                            <Sheet
                              key={item.id}
                              sx={{
                                maxWidth: "400px",
                                borderRadius: "md",
                                boxShadow: "sm",
                              }}
                            >
                              <Radio
                                label={
                                  <>
                                    <div className="p-1 text-center">
                                      <div>
                                        <span
                                          className="p-2"
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "450",
                                          }}
                                        >
                                          {productItem &&
                                            productItem.sanPham.tenSanPham +
                                            " " +
                                            item.ram.dungLuong +
                                            "/" +
                                            item.rom.dungLuong +
                                            "GB"}
                                        </span>
                                      </div>
                                      <div className="text-center">
                                        <span style={{ fontSize: "14px" }}>
                                          {item &&
                                            item.donGia.toLocaleString("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                            })}
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                }
                                onChange={() => handleChangeCauHinh(item.id)}
                                onClick={() => handleSetKey()}
                                overlay
                                disableIcon
                                value={
                                  item.ram.dungLuong +
                                  "/" +
                                  item.rom.dungLuong +
                                  "GB"
                                }
                                slotProps={{
                                  label: ({ checked }) => ({
                                    sx: {
                                      fontWeight: "lg",
                                      fontSize: "md",
                                      color: checked
                                        ? "text.primary"
                                        : "text.secondary",
                                    },
                                  }),
                                  action: ({ checked }) => ({
                                    sx: (theme) => ({
                                      ...(checked && {
                                        "--variant-borderWidth": "2px",
                                        "&&": {
                                          // && to increase the specificity to win the base :hover styles
                                          borderColor: "#2f80ed",
                                        },
                                      }),
                                    }),
                                  }),
                                }}
                              />
                            </Sheet>
                          ))}
                      </RadioGroup>
                    </div>
                    <div className="choose2 mt-3">
                      <RadioGroup
                        orientation="horizontal"
                        key={keyRadio}
                        aria-labelledby="storage-label"
                        defaultValue={
                          productItem2 && productItem2.mauSac.tenMauSac
                        }
                        size="lg"
                        sx={{ gap: 1.7 }}
                      >
                        {getProductItems1 &&
                          getProductItems1.map((item) => (
                            <Sheet
                              key={item.id}
                              sx={{
                                borderRadius: "md",
                                boxShadow: "sm",
                              }}
                            >
                              <Radio
                                label={
                                  <>
                                    <div
                                      className="p-1 d-flex"
                                      style={{ width: "143px", height: "56px" }}
                                    >
                                      <div>
                                        <img
                                          className=""
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            marginTop: "4px",
                                          }}
                                          src={
                                            item.image && item.image.path
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="" style={{ marginTop: "" }}>
                                        <span
                                          className="p-2"
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.mauSac.tenMauSac}
                                        </span>
                                        <div className="" style={{ marginTop: "" }}>
                                          <span
                                            className="p-2"
                                            style={{ fontSize: "13px" }}
                                          >
                                            {item &&
                                              item.donGia.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              })}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                }
                                onChange={() => handleChangeMauSac(item.id)}
                                overlay
                                disabled={item.soLuongTonKho <= 0 ? true : false}
                                disableIcon
                                value={item.mauSac.tenMauSac}
                                slotProps={{
                                  label: ({ checked }) => ({
                                    sx: {
                                      fontWeight: "lg",
                                      fontSize: "md",
                                      color: checked
                                        ? "text.primary"
                                        : "text.secondary",
                                      opacity:
                                        item.soLuongTonKho <= 0 ? "0.5" : "1",
                                    },
                                  }),
                                  action: ({ checked }) => ({
                                    sx: (theme) => ({
                                      ...(checked && {
                                        "--variant-borderWidth": "2px",
                                        "&&": {
                                          // && to increase the specificity to win the base :hover styles
                                          borderColor: "#2f80ed",
                                        },
                                      }),
                                    }),
                                  }),
                                }}
                              />
                            </Sheet>
                          ))}
                      </RadioGroup>
                    </div>
                    <div className="product-price mt-4">
                      <span
                        style={{
                          color: "#dc3333",
                          fontSize: "23px",
                          fontWeight: "550",
                        }}
                      >
                        {productItem2 &&
                          productItem2.donGia.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </span>
                      <span
                        className="ms-2 ps-1"
                        style={{
                          textDecoration: "line-through",
                          color: "grey",
                          fontSize: "14.5px",
                          fontWeight: "400",
                        }}
                      >
                        29.990.000₫
                      </span>
                    </div>
                    <div className="d-flex mt-3">
                      <InputNumberAmount getAmount={getAmount}
                      />
                      <div className="ms-2 ps-1" style={{ marginTop: "7px" }}>
                        <span
                          className=""
                          style={{ fontSize: "13.5px", color: "gray" }}
                        >
                          {productItem2 && productItem2.soLuongTonKho} sản phẩm có
                          sẵn
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          addProductItemsToCart(
                            productItem2 && productItem2.donGia,
                            productItem2 && productItem2.id
                          );
                        }}
                        type="button"
                        class="__add-cart1 add-to-cart trigger mt-1"
                      >
                        <span class="" style={{ fontSize: "16px" }}>
                          THÊM VÀO GIỎ HÀNG
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </DialogContent>
          : null}
      </Dialog>
    </div>
  );
};
