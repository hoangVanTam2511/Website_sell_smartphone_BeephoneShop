import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import ResultContainerPlugin from './ResultContainerPlugin.jsx';
import styleReader from './html5-qrcode-css.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { Button, Empty, Table as TableAntd } from "antd";
// import  EmptyData from "antd";
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
  // Checkbox,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import styleCss from "./style.css";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Done from "@mui/icons-material/Done";
import { Checkbox as CheckboxJoy } from "@mui/joy";
// import { styled } from '@mui/material/styles';
import { format } from "date-fns";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import { PlusOutlined } from "@ant-design/icons";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";
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
import {
  Notistack,
  OrderStatusString,
  StatusImei,
  TypeDiscountNumber,
  TypeDiscountString,
} from "./enum";
import { parseInt } from "lodash";
import { useSnackbar } from "notistack";
import useCustomSnackbar from "../../../utilities/notistack";
import PriceSlider from "./rangePriceSlider";
import InputNumberAmount from "./input-number-amount-product.js";
import { FaExternalLinkSquareAlt, FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Scanner from "./scanner";
import AppBarCode from "./App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Transition1 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function OrderConfirmPayment(props) {
  const {
    open,
    onCloseNoAction,
    ma,
    confirmPayment,
    delivery,
    total,
    paymentWhenReceive,
    khachCanTra,
  } = props;

  const checkTotal = () => {
    if (total === 0) {
      return khachCanTra;
    }
    return total;
  };

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition1}
        open={open}
        onClose={onCloseNoAction}
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
            sx={{ color: "#2f80ed", fontWeight: "500", fontSize: "18px" }}
            id="alert-dialog-title"
          >
            {`Xác nhận ${delivery ? "đặt hàng" : "thanh toán đơn hàng"}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              {`Bạn có chắc chắn muốn ${delivery ? "đặt đơn hàng" : "thanh toán đơn hàng"
                }`}{" "}
              <span className="" style={{ fontWeight: "500" }}>
                {" "}
                {ma}
              </span>{" "}
              với số tiền {paymentWhenReceive ? "chưa " : "đã "} nhận được là{" "}
              <span style={{ color: "#dc1111" }}>
                {checkTotal().toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={confirmPayment}
              className="rounded-2 me-1 button-mui"
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
              onClick={onCloseNoAction}
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
            sx={{ color: "#dc3333", fontWeight: "500", fontSize: "18px" }}
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
              className="rounded-2 me-1 button-mui"
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

  const {
    open,
    onClose,
    onCloseNoAction,
    name,
    phone,
    address,
    province,
    district,
    ward,
    note,
  } = props;
  const [customerName, setCustomerName] = useState(name);
  const [customerPhone, setCustomerPhone] = useState(phone);
  const [customerAddress, setCustomerAddress] = useState(address);
  const [customerNote, setCustomerNote] = useState(note);
  const [customerProvince, setCustomerProvince] = useState(province);
  const [customerDistrict, setCustomerDistrict] = useState(district);
  const [customerWard, setCustomerWard] = useState(ward);

  useEffect(() => {
    setCustomerName(name);
    setCustomerPhone(phone);
    setCustomerAddress(address);
    setCustomerNote(note);
    setCustomerProvince(province);
    setCustomerDistrict(district);
    setCustomerWard(ward);
  }, [name, phone, address, province, district, ward, note]);

  const resetData = () => {
    setCustomerName(name);
    setCustomerPhone(phone);
    setCustomerAddress(address);
    setCustomerNote(note);
    setCustomerProvince(province);
    setCustomerDistrict(district);
    setCustomerWard(ward);
  };

  const getAllDistrictGhnByIdProvinceByCustomer = async (
    provinceId,
    districtName,
    wardName
  ) => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
        {
          params: {
            province_id: provinceId,
          },
          headers: {
            token: tokenGhn,
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data;
      setDistricts(data);

      if (districtName === "") {
        setSelectedProvince(provinceId);
        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);
      } else {
        const district = data.find(
          (item) => item.DistrictName === districtName
        );
        await getAllWardGhnByIdDistrictByCustomer(
          provinceId,
          district.DistrictID,
          wardName
        );
      }
    } catch (error) { }
  };

  return (
    <div className="rounded-pill">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
        maxHeight="xl"
      >
        <DialogTitle id="alert-dialog-title">
          {
            <div className="mt-2">
              <span className="fs-4 text-dark text-uppercase">
                Cập Nhật Thông Tin Giao Hàng
              </span>
            </div>
          }
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              value={customerName}
              label="Họ và tên"
              onChange={(e) => setCustomerName(e.target.value)}
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size="medium"
              className="mt-2 custom"
            />
          </div>
          <div>
            <TextField
              label="Số điện thoại"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size="medium"
              className="mt-3 custom"
            />
          </div>
          <div className="d-flex mt-3">
            <FormControl sx={{ width: 250 }}>
              <InputLabel id="demo-multiple-name-label">
                Tỉnh / Thành Phố
              </InputLabel>
              <SelectMui
                labelId="demo-multiple-name-label"
                className="custom"
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
                className="custom"
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
                className="custom"
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
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              inputProps={{
                style: {
                  width: "755px",
                },
              }}
              size="medium"
              className="mt-3 custom"
            />
          </div>
          <div>
            <TextField
              label="Ghi chú"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              // onBlur={() => }
              inputProps={{
                style: {
                  width: "755px",
                  paddingBottom: "60px",
                },
              }}
              size="medium"
              className="mt-3 custom"
            />
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              // onClick={handleOpenDialogProducts}
              className="rounded-2 me-2"
              type="primary"
              style={{ height: "40px", width: "110px", fontSize: "16px" }}
            >
              <span
                className="text-white"
                style={{ marginBottom: "3px", fontWeight: "500" }}
              >
                Xác Nhận
              </span>
            </Button>
            <Button
              onClick={() => {
                onClose();
                resetData();
              }}
              className="rounded-2"
              type="danger"
              style={{ height: "40px", width: "90px", fontSize: "16px" }}
            >
              <span
                className="text-white"
                style={{ marginBottom: "3px", fontWeight: "500" }}
              >
                Hủy Bỏ
              </span>
            </Button>
          </div>
          <div className="mt-2"></div>
        </DialogContent>
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
    getAmount,
    openImei,
    onOpenImei,
    onCloseImei,
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

  const [price, setPrice] = useState(0);
  const [id, setId] = useState("");

  const addProductToCart = (imeis) => {
    add(price, id, imeis);
  };
  const filterdData = data.filter((item) => item.soLuongTonKho > 0);

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
                    Màu sắc
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Hãng
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }} align="center">
                    Đơn Giá
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
                {filterdData.map((item, index) => (
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
                      style={{ fontSize: "16px", width: "150px" }}
                    >
                      {item.mauSac.tenMauSac}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ fontSize: "16px", width: "150px" }}
                    >
                      {item.sanPham.hang.tenHang}
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
                          handleOpenModalImeiByProductItem(item);
                          setId(item.id);
                          setPrice(item.donGia);
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

  // const [openModalImei, setOpenModalImei] = useState(false);
  const [imeis, setImeis] = useState([]);
  // const handleCloseOpenModalImei = () => {
  //   setOpenModalImei(false);
  // }
  const handleOpenModalImeiByProductItem = (item) => {
    onOpenImei();
    setImeis(item.imeis);
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
  const [productItemAll, setProductItemAll] = useState([]);
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
      const findColorCurrentIsStocking = data.find(
        (i) => i.maCauHinh === item.maCauHinh && i.soLuongTonKho > 0
      );
      setProductItem2(findColorCurrentIsStocking);
      // Tìm vè giá be nhat ?? chưa làm
    }
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
  };

  const handleOpenDialogProductItems = (item) => {
    openDialogProductItems();
    setProductItem(item); // general
    setProductItem1(item); //ten va cau hinh, gia
    setProductItem2(item); // so luong va image

    const findDataAllByIdProduct = data.filter((d) => {
      return d.sanPham.id === item.sanPham.id;
    });
    setProductItemAll(findDataAllByIdProduct);

    // const getProductItems = data.filter((item, index) => {
    //   const isDuplicate = data.some((i, iIndex) => i.donGia === item.donGia && iIndex < index);
    //   return !isDuplicate;
    // });

    const getIdByItem = item && item.sanPham.id;
    const uniqueItems = Object.values(
      data.reduce((acc, item) => {
        if (
          (!acc[item.maCauHinh] ||
            (acc[item.maCauHinh].donGia > item.donGia &&
              !acc[item.maCauHinh].isDuplicate)) &&
          item.sanPham.id === getIdByItem
        ) {
          acc[item.maCauHinh] = item;
        } else if (
          acc[item.maCauHinh] &&
          acc[item.maCauHinh].isDuplicate &&
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
                Chọn Sản Phẩm
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
          {isOpen === true ? (
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
                      {selectedValues.length === 1 &&
                        selectedValues[0] == 0 && (
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
                      {selectedValues1.length === 1 &&
                        selectedValues[0] == 0 && (
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
                      {selectedValues2.length === 1 &&
                        selectedValues[0] == 0 && (
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
                      {selectedValues3.length === 1 &&
                        selectedValues[0] == 0 && (
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
                      {selectedValues5.length === 1 &&
                        selectedValues[0] == 0 && (
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
                      {selectedValues6.length === 1 &&
                        selectedValues[0] == 0 && (
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
                      {selectedValues7.length === 1 &&
                        selectedValues[0] == 0 && (
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
                      {selectedValues8.length === 1 &&
                        selectedValues[0] == 0 && (
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
          ) : null}
        </DialogContent>

        <DialogActions></DialogActions>
      </Dialog>
      <ModalImeiByProductItem
        isOpen={isOpen}
        open={openImei}
        imeis={imeis}
        close={onCloseImei}
        addProduct={addProductToCart}
      />
      {/*
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
        dataAll={productItemAll}
      />
*/}
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

  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, item) => <span>{data.indexOf(item) + 1}</span>,
    },
    {
      title: "Mã",
      align: "center",
      width: "15%",
      render: (text, item) => <span>{item.ma}</span>,
    },
    {
      title: "Giá Trị",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <span
          align="center"
          style={{ width: "", fontSize: "15px", color: "#dc1111" }}
        >
          {item.giaTriVoucher.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Giảm Tối Đa",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <span>
          {item.loaiVoucher === TypeDiscountNumber.VND
            ? "..."
            : item.giaTriToiDa}
        </span>
      ),
    },
    {
      title: "Số Lượng",
      align: "center",
      width: "15%",
      render: (text, item) => <span>{item.soLuong}</span>,
    },
    {
      title: "Điều Kiện Áp Dụng",
      align: "center",
      width: "25%",
      render: (text, item) => (
        <span
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
        </span>
      ),
    },
    {
      title: "Thời gian",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <span style={{ fontWeight: "normal" }}>
          {format(new Date(item.ngayBatDau), "dd/MM/yyyy")} {" - "}
          {format(new Date(item.ngayKetThuc), "dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <Button
          onClick={() =>
            handleAddOrRemoveVoucherToOrder(item.id, item.dieuKienApDung)
          }
          className="rounded-2"
          type={
            discount === item.id
              ? "danger"
              : discount !== item.id
                ? "primary"
                : ""
          }
          style={{
            height: "35px",
            width: "auto",
            fontSize: "14px",
          }}
        >
          <span
            className={discount === item.id ? "text-white" : "text-white"}
            style={{ fontWeight: "500", marginBottom: "3px" }}
          >
            {discount === item.id ? "Bỏ áp dụng" : "Áp dụng"}{" "}
          </span>
        </Button>
      ),
    },
  ];

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
                {filteredData.length > 0
                  ? filteredData.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: "15px" }}>
                        {item.ma}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          width: "",
                          fontSize: "15px",
                          color: "#dc1111",
                        }}
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
                        {item.loaiVoucher === TypeDiscountNumber.VND
                          ? "..."
                          : item.giaTriToiDa}
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
                      <TableCell
                        align="center"
                        style={{ width: "" }}
                      ></TableCell>
                    </TableRow>
                  ))
                  : ""}
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
              <span
                className="text-dark"
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                Chọn Voucher
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
                  width: "550px",
                },
              }}
              size="small"
              className=""
            />
            <Button
              // onClick={handleRefreshData}
              className="rounded-2 ms-2 bg-primary"
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
          <div className="mt-4">
            <TableAntd
              className="table-container"
              columns={columns}
              dataSource={data}
              pagination={false}
              rowClassName={(record) =>
                total() < record.dieuKienApDung && "disabled-row"
              }
              rowKey={"id"}
              key={"id"}
              locale={{ emptyText: <Empty /> }}
            />
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export function CustomersDialog(props) {
  const { open, onClose, onCloseNoAction, data, add, idCus, isOpen } = props;

  const handleSelectCustomer = (id) => {
    if (idCus === id) {
      add(null);
    } else {
      add(id);
    }
  };
  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, item) => <span>{data.indexOf(item) + 1}</span>,
    },
    {
      title: "Avatar",
      align: "center",
      width: "10%",
      render: (text, item) => (
        <div className="d-flex justify-content-center" style={{}}>
          <Avatar src="https://ecdn.game4v.com/g4v-content/uploads/2021/02/ava-1.png" />
        </div>
      ),
    },
    {
      title: "Mã Khách Hàng",
      align: "center",
      width: "15%",
      render: (text, item) => <span>{item.ma}</span>,
    },
    {
      title: "Tên Khách Hàng",
      align: "center",
      width: "15%",
      render: (text, item) => <span>{item.hoVaTen}</span>,
    },
    {
      title: "Email",
      align: "center",
      width: "15%",
      render: (text, item) => <span>{item.email}</span>,
    },
    {
      title: "Số Điện Thoại",
      align: "center",
      width: "15%",
      render: (text, item) => <span>{item.soDienThoai}</span>,
    },
    {
      title: "Ngày Tạo",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <span style={{ fontWeight: "normal" }}>
          {format(new Date(), "HH:mm:ss - dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <div>
          <Button
            onClick={() => handleSelectCustomer(item.id)}
            className="rounded-2 button-mui me-2"
            type={idCus === item.id ? "danger" : "primary"}
            style={{
              height: "35px",
              width: "82px",
              fontSize: "14px",
            }}
          >
            <span
              className={"text-white"}
              style={{ fontWeight: "500", marginBottom: "3px" }}
            >
              {idCus === item.id ? "Bỏ chọn" : "Chọn"}
            </span>
          </Button>
          <Button
            // onClick={() => handleSelectCustomer(item.id)}
            className="rounded-2"
            type="warning"
            style={{
              height: "35px",
              width: "92px",
              fontSize: "14px",
            }}
          >
            <span
              className={"text-dark"}
              style={{ fontWeight: "500", marginBottom: "3px" }}
            >
              Cập nhật
            </span>
          </Button>
        </div>
      ),
    },
  ];

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
              <span
                className="text-dark"
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                Chọn Khách Hàng
              </span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          {isOpen === true ? (
            <>
              <div className="mt-2 d-flex justify-content-between">
                <div>
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
                        width: "550px",
                      },
                    }}
                    size="small"
                    className=""
                  />
                  <Button
                    // onClick={handleRefreshData}
                    className="rounded-2 ms-2"
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
                <div>
                  <Button
                    // onClick={handleCreateNewOrderPending}
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "40px", width: "165px", fontSize: "15px" }}
                  >
                    <PlusOutlined
                      className="ms-1"
                      style={{
                        position: "absolute",
                        bottom: "12.5px",
                        left: "12px",
                      }}
                    />
                    <span
                      className="ms-3 ps-1"
                      style={{ marginBottom: "2.5px", fontWeight: "500" }}
                    >
                      Tạo khách hàng
                    </span>
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <TableAntd
                  className="table-container"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  rowKey={"id"}
                  key={"id"}
                  locale={{ emptyText: <Empty /> }}
                />
              </div>
            </>
          ) : null}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export function AddressDialog(props) {
  const { open, onClose, data, add, isOpen } = props;

  const handleSelectAddress = (item) => {
    add(item);
  };
  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      showSorterTooltip: false,
      render: (text, item) => <span>{data.indexOf(item) + 1}</span>,
    },
    {
      title: "Họ Và Tên",
      align: "center",
      width: "10%",
      render: (text, item) => <span>{item.hoTenKH}</span>,
    },
    {
      title: "Số Điện Thoại",
      align: "center",
      width: "15%",
      render: (text, item) => <span>{item.soDienThoaiKhachHang}</span>,
    },
    {
      title: "Địa Chỉ",
      align: "center",
      width: "40%",
      render: (text, item) => (
        <span
          align="center"
          style={{
            width: "200px",
            fontSize: "15px",
            whiteSpace: "pre-line",
          }}
        >
          {item.tinhThanhPho +
            ", " +
            item.quanHuyen +
            ", " +
            item.xaPhuong +
            ", " +
            item.diaChi}
          <span style={{ color: "red" }}>
            {item.trangThai === 1 ? " (Mặc định)" : ""}
          </span>
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <div>
          <Button
            onClick={() => handleSelectAddress(item)}
            className="rounded-2 button-mui me-2"
            type="primary"
            style={{
              height: "35px",
              width: "82px",
              fontSize: "14px",
            }}
          >
            <span
              className={"text-white"}
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              Chọn
            </span>
          </Button>
          <Button
            // onClick={() => handleSelectCustomer(item.id)}
            className="rounded-2 button-mui"
            type="warning"
            style={{
              height: "35px",
              width: "92px",
              fontSize: "14px",
            }}
          >
            <span
              className={"text-dark"}
              style={{ fontWeight: "500", marginBottom: "2px" }}
            >
              {"Cập nhật"}
            </span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-pill">
      <Dialog
        className=""
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        fullWidth="lg"
        sx={{}}
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex justify-content-between mt-1">
            <div>
              <span
                className="text-dark"
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                Chọn Địa Chỉ Giao Hàng
              </span>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ height: "600px" }}>
          {isOpen === true ? (
            <>
              <div className="mt-2 d-flex justify-content-between">
                <div>
                  <TextField
                    label="Tìm Địa Chỉ"
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
                        width: "550px",
                      },
                    }}
                    size="small"
                    className=""
                  />
                  <Button
                    // onClick={handleRefreshData}
                    className="rounded-2 ms-2"
                    type="warning"
                    style={{ height: "40px", width: "100px", fontSize: "15px" }}
                  >
                    <span
                      className="text-dark"
                      style={{ fontWeight: "450", marginBottom: "2.5px" }}
                    >
                      Làm Mới
                    </span>
                  </Button>
                </div>
                <div>
                  <Button
                    // onClick={handleCreateNewOrderPending}
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "40px", width: "175px", fontSize: "15px" }}
                  >
                    <PlusOutlined
                      className="ms-1"
                      style={{
                        position: "absolute",
                        bottom: "12.5px",
                        left: "12px",
                      }}
                    />
                    <span
                      className="ms-3 ps-1"
                      style={{ marginBottom: "2px", fontWeight: "500" }}
                    >
                      Thêm địa chỉ mới
                    </span>
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <TableAntd
                  className="table-container"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  rowKey={"id"}
                  key={"id"}
                  locale={{ emptyText: <Empty /> }}
                />
              </div>
            </>
          ) : null}
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
    dataAll,
    getAmount,
  } = props;

  const addProductItemsToCart = (productPrice, productId) => {
    addProduct(productPrice, productId);
  };

  const handleChangeCauHinh = (id) => {
    console.log(dataAll);
    const item = getProductItems.find((item) => item.id === id);
    if (item) {
      changeProductItem(item, productItem2 && productItem2.mauSac.tenMauSac);
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

  const isAllProductsZeroQuantity = (maCauHinh) => {
    let isNotStocking = false;
    const configurationProducts = dataAll.filter(
      (item) => item.maCauHinh === maCauHinh
    );
    configurationProducts.map((item) => {
      if (item.soLuongTonKho <= 0) {
        isNotStocking = true;
      } else {
        isNotStocking = false;
      }
    });
    return isNotStocking;
  };

  return (
    <div className="rounded-pill">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onCloseNoAction}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="xxl"
        maxHeight="xxl"
      >
        {isOpen === true ? (
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
                    ></span>
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
                      src={
                        productItem2 &&
                        productItem2.image &&
                        productItem2.image.path
                      }
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
                                            item.donGia.toLocaleString(
                                              "vi-VN",
                                              {
                                                style: "currency",
                                                currency: "VND",
                                              }
                                            )}
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                }
                                onChange={() => handleChangeCauHinh(item.id)}
                                onClick={() => handleSetKey()}
                                overlay
                                disableIcon
                                disabled={isAllProductsZeroQuantity(
                                  item.maCauHinh
                                )}
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
                                      opacity: isAllProductsZeroQuantity(
                                        item.maCauHinh
                                      )
                                        ? "0.5"
                                        : "1",
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
                                          src={item.image && item.image.path}
                                          alt=""
                                        />
                                      </div>
                                      <div
                                        className=""
                                        style={{ marginTop: "" }}
                                      >
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
                                        <div
                                          className=""
                                          style={{ marginTop: "" }}
                                        >
                                          <span
                                            className="p-2"
                                            style={{ fontSize: "13px" }}
                                          >
                                            {item &&
                                              item.donGia.toLocaleString(
                                                "vi-VN",
                                                {
                                                  style: "currency",
                                                  currency: "VND",
                                                }
                                              )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                }
                                onChange={() => handleChangeMauSac(item.id)}
                                overlay
                                disabled={
                                  item.soLuongTonKho <= 0 ? true : false
                                }
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
                    <div className="" style={{ marginTop: "7px" }}>
                      <span
                        className=""
                        style={{ fontSize: "13.5px", color: "gray" }}
                      >
                        {productItem2 && productItem2.soLuongTonKho} sản phẩm có
                        sẵn
                      </span>
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
                    {/*
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
*/}
                  </div>
                </div>
              </div>
            </>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
};
export const ModalImeiByProductItem = ({
  open,
  close,
  imeis,
  addProduct,
  isOpen,
}) => {
  const [selectedImei, setSelectedImei] = useState([]);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const filteredData = imeis.filter(
    (item) =>
      item.trangThai === StatusImei.NOT_SOLD ||
      item.trangThai === StatusImei.IN_THE_CART ||
      item.trangThai === StatusImei.PENDING_DELIVERY
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const itemsOnCurrentPage = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedImei([]);
  }, [imeis]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close();
          setSelectedImei([]);
        }}
        maxWidth="xxl"
        maxHeight="xxl"
      >
        <DialogContent className="">
          <div className="mt-2" style={{ width: "1100px" }}>
            <div className="container" style={{}}>
              <div className="header-title d-flex justify-content-between">
                <div className="mt-1">
                  <span className="fs-4 fw-bold">Chọn Imei Sản Phẩm</span>
                </div>
                <div className="">
                  <TextField
                    label="Tìm IMEI"
                    // onChange={handleGetValueFromInputTextField}
                    // value={keyword}
                    InputLabelProps={{
                      sx: {
                        marginTop: "",
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
                    onClick={() => { }}
                    className="rounded-2 ms-2 button-mui"
                    type="primary"
                    style={{ width: "100px", fontSize: "15px" }}
                  >
                    <span
                      className="text-white"
                      style={{ fontWeight: "500", marginBottom: "2px" }}
                    >
                      Tìm Kiếm
                    </span>
                  </Button>
                </div>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div className="">
                  <table className="table" style={{ borderRadius: "10px" }}>
                    <thead style={{ borderRadius: "10px" }}>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col" className="text-center text-dark">
                          Mã Imei
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Trạng Thái
                        </th>
                      </tr>
                    </thead>
                    {isOpen === true ? (
                      <tbody>
                        {itemsOnCurrentPage.length
                          ? itemsOnCurrentPage.map((item, index) => (
                            <>
                              <tr
                                key={index}
                                style={{
                                  cursor: "pointer",
                                  pointerEvents:
                                    item.trangThai ===
                                      StatusImei.PENDING_DELIVERY ||
                                      item.trangThai === StatusImei.IN_THE_CART
                                      ? "none"
                                      : "auto",
                                  opacity:
                                    item.trangThai ===
                                      StatusImei.PENDING_DELIVERY ||
                                      item.trangThai === StatusImei.IN_THE_CART
                                      ? "0.5"
                                      : "1",
                                }}
                                onClick={() => {
                                  if (
                                    selectedImei.length >= 4 &&
                                    !selectedImei.includes(item)
                                  ) {
                                    handleOpenAlertVariant(
                                      "Lựa chọn tối đa 4 số lượng sản phẩm!",
                                      "warning"
                                    );
                                  } else if (!selectedImei.includes(item)) {
                                    setSelectedImei((val) => [...val, item]);
                                  } else {
                                    setSelectedImei((val) =>
                                      val.filter((text) => text !== item)
                                    );
                                  }
                                }}
                              >
                                <td>
                                  <Checkbox
                                    color="primary"
                                    checked={selectedImei.includes(item)}
                                  />
                                </td>
                                <td className="text-center">{item.soImei}</td>

                                <td className="text-center">
                                  {item.trangThai ===
                                    StatusImei.PENDING_DELIVERY ||
                                    item.trangThai === StatusImei.NOT_SOLD ||
                                    item.trangThai ===
                                    StatusImei.IN_THE_CART ? (
                                    <div
                                      className={
                                        item.trangThai ===
                                          StatusImei.PENDING_DELIVERY
                                          ? "badge-primary rounded-pill mx-auto"
                                          : "badge-success rounded-pill mx-auto"
                                      }
                                      style={{
                                        height: "35px",
                                        width: "115px",
                                        padding: "4px",
                                      }}
                                    >
                                      <span
                                        className="text-white"
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {item.trangThai ===
                                          StatusImei.NOT_SOLD
                                          ? "Chưa Bán"
                                          : item.trangThai ===
                                            StatusImei.IN_THE_CART
                                            ? "Chưa Bán"
                                            : item.trangThai ===
                                              StatusImei.PENDING_DELIVERY
                                              ? "Chờ Giao"
                                              : ""}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            </>
                          ))
                          : ""}
                      </tbody>
                    ) : null}
                  </table>
                </div>
                {isOpen === true ? (
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination
                      color="primary"
                      page={parseInt(currentPage)}
                      count={totalPages}
                      onChange={(event, page) => setCurrentPage(page)}
                    />
                  </div>
                ) : null}
                <div className="mt-3">
                  <span className="fs-4 fw-bold">Imei Đã Chọn</span>
                </div>
                <div className="mt-2 d-flex justify-content-between">
                  <div className="" style={{ marginTop: "2px" }}>
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
                      {selectedImei.map((item, index) => (
                        <ListItem key={item.id}>
                          <Done
                            fontSize="md"
                            color="primary"
                            sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
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
                            checked={selectedImei.includes(item)}
                            variant={
                              selectedImei.includes(item) ? "soft" : "outlined"
                            }
                            onChange={(event) => {
                              if (event.target.checked) {
                                setSelectedImei((val) => [...val, item]);
                              } else {
                                setSelectedImei((val) =>
                                  val.filter((text) => text !== item)
                                );
                              }
                            }}
                            label={item.soImei}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                  <div className="d-flex">
                    <Button
                      onClick={() => {
                        if (selectedImei.length === 0) {
                          handleOpenAlertVariant(
                            "Bạn chưa chọn IMEI!",
                            "warning"
                          );
                        } else {
                          addProduct(selectedImei);
                        }
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
                        style={{ marginBottom: "2px", fontWeight: "500" }}
                      >
                        Xác Nhận
                      </span>
                    </Button>
                    <Button
                      onClick={() => {
                        close();
                        setSelectedImei([]);
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
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export const ModalUpdateImeiByProductItem = ({
  open,
  close,
  imeis,
  imeisChuaBan,
  refresh,
  update,
  max,
}) => {
  const [selectedImei, setSelectedImei] = useState(imeisChuaBan);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const filteredData = imeis.filter(
    (item) =>
      item.trangThai === StatusImei.NOT_SOLD ||
      item.trangThai === StatusImei.IN_THE_CART ||
      item.trangThai === StatusImei.PENDING_DELIVERY
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const itemsOnCurrentPage = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedImei(imeisChuaBan);
  }, [refresh]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close(); /*  setSelectedImei([])  */
        }}
        maxWidth="xxl"
        maxHeight="xxl"
      >
        <DialogContent className="">
          <div className="mt-2" style={{ width: "1100px" }}>
            <div className="container" style={{}}>
              <div className="header-title d-flex justify-content-between">
                <div className="mt-1">
                  <span className="fs-4 fw-bold">Chọn Imei Sản Phẩm</span>
                </div>
                <div className="">
                  <TextField
                    label="Tìm IMEI"
                    // onChange={handleGetValueFromInputTextField}
                    // value={keyword}
                    InputLabelProps={{
                      sx: {
                        marginTop: "",
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
                    onClick={() => {
                      console.log(imeisChuaBan);
                      console.log(imeis);
                    }}
                    className="rounded-2 ms-2 button-mui"
                    type="primary"
                    style={{ width: "100px", fontSize: "15px" }}
                  >
                    <span
                      className="text-white"
                      style={{ fontWeight: "500", marginBottom: "2px" }}
                    >
                      Tìm Kiếm
                    </span>
                  </Button>
                </div>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div className="">
                  <table className="table" style={{ borderRadius: "10px" }}>
                    <thead style={{ borderRadius: "10px" }}>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col" className="text-center text-dark">
                          Mã Imei
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Trạng Thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsOnCurrentPage.length
                        ? itemsOnCurrentPage.map((item, index) => (
                          <tr
                            key={index}
                            style={{
                              cursor: "pointer",
                              pointerEvents:
                                (item.trangThai ===
                                  StatusImei.PENDING_DELIVERY ||
                                  item.trangThai ===
                                  StatusImei.IN_THE_CART) &&
                                  !imeisChuaBan.some(
                                    (selectedItem) =>
                                      selectedItem.soImei === item.soImei
                                  )
                                  ? "none"
                                  : "auto",
                              opacity:
                                (item.trangThai ===
                                  StatusImei.PENDING_DELIVERY ||
                                  item.trangThai ===
                                  StatusImei.IN_THE_CART) &&
                                  !imeisChuaBan.some(
                                    (selectedItem) =>
                                      selectedItem.soImei === item.soImei
                                  )
                                  ? "0.5"
                                  : "1",
                            }}
                            onClick={() => {
                              if (
                                selectedImei.length >= 4 &&
                                !selectedImei.some(
                                  (selectedItem) =>
                                    selectedItem.soImei === item.soImei
                                )
                              ) {
                                handleOpenAlertVariant(
                                  "Lựa chọn tối đa 4 số lượng sản phẩm!",
                                  "warning"
                                );
                              } else if (
                                !selectedImei.some(
                                  (selectedItem) =>
                                    selectedItem.soImei === item.soImei
                                )
                              ) {
                                setSelectedImei([...selectedImei, item]);
                              } else {
                                setSelectedImei(
                                  selectedImei.filter(
                                    (selectedItem) =>
                                      selectedItem.soImei !== item.soImei
                                  )
                                );
                              }
                            }}
                          >
                            <td>
                              <Checkbox
                                color="primary"
                                checked={selectedImei.some(
                                  (selectedItem) =>
                                    selectedItem.soImei === item.soImei
                                )}
                              />
                            </td>
                            <td className="text-center">{item.soImei}</td>
                            <td className="text-center">
                              {item.trangThai ===
                                StatusImei.PENDING_DELIVERY ||
                                item.trangThai === StatusImei.NOT_SOLD ||
                                item.trangThai === StatusImei.IN_THE_CART ? (
                                <div
                                  className={
                                    item.trangThai ===
                                      StatusImei.PENDING_DELIVERY
                                      ? "badge-primary rounded-pill mx-auto"
                                      : "badge-success rounded-pill mx-auto"
                                  }
                                  style={{
                                    height: "35px",
                                    width: "115px",
                                    padding: "4px",
                                  }}
                                >
                                  <span
                                    className="text-white"
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {item.trangThai === StatusImei.NOT_SOLD
                                      ? "Chưa Bán"
                                      : item.trangThai ===
                                        StatusImei.IN_THE_CART
                                        ? "Chưa Bán"
                                        : item.trangThai ===
                                          StatusImei.PENDING_DELIVERY
                                          ? "Chờ Giao"
                                          : ""}
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))
                        : ""}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Pagination
                    color="primary"
                    page={parseInt(currentPage)}
                    count={totalPages}
                    onChange={(event, page) => setCurrentPage(page)}
                  />
                </div>
                <div className="mt-3">
                  <span className="fs-4 fw-bold">Imei Đã Chọn</span>
                </div>
                <div className="mt-2 d-flex justify-content-between">
                  <div className="" style={{ marginTop: "2px" }}>
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
                      {selectedImei.map((item, index) => (
                        <ListItem key={index}>
                          <Done
                            fontSize="md"
                            color="primary"
                            sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
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
                            checked={selectedImei.includes(item)}
                            variant={
                              selectedImei.includes(item) ? "soft" : "outlined"
                            }
                            onChange={(event) => {
                              if (event.target.checked) {
                                setSelectedImei((val) => [...val, item]);
                              } else {
                                setSelectedImei((val) =>
                                  val.filter((text) => text !== item)
                                );
                              }
                            }}
                            label={item.soImei}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                  <div className="d-flex">
                    <Button
                      onClick={() => {
                        if (selectedImei.length === 0) {
                          handleOpenAlertVariant(
                            "Bạn chưa chọn IMEI!",
                            "warning"
                          );
                        } else {
                          update(selectedImei);
                        }
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
                        style={{ marginBottom: "2px", fontWeight: "500" }}
                      >
                        Xác Nhận
                      </span>
                    </Button>
                    <Button
                      onClick={() => {
                        close();
                        // setSelectedImei([]);
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
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};

export function MultiplePaymentMethods({
  open,
  close,
  data,
  khachCanTra,
  khachThanhToan,
  handleOpenPayment,
  handleCloseOpenPayment,
  addPayment,
  openPayment,
  deletePayment,
}) {
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [payments, setPayments] = useState(data);

  useEffect(() => {
    setPayments(data);
  }, [data]);

  const sortPayments =
    data &&
    payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [selectedPayment, setSelectedPayment] = useState([
    "Tiền mặt",
    "Chuyển khoản thường",
    "Ví VNPAY",
  ]);
  const [paymentCurrent, setPaymentCurrent] = useState("Tiền mặt");

  const handleRedirectPaymentView = (url) => {
    window.open(url, "_blank");
  };

  const columns = [
    {
      title: "Số Tiền",
      align: "center",
      dataIndex: "soTienThanhToan",
      width: "20%",
      render: (text, record) => (
        <span className="txt-danger" style={{ fontSize: "17px" }}>
          {record &&
            record.soTienThanhToan &&
            record.soTienThanhToan.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </span>
      ),
    },
    {
      title: "Phương Thức Thanh Toán",
      align: "center",
      width: "15%",
      dataIndex: "hinhThucThanhToan",
      render: (text, record) =>
        record.hinhThucThanhToan == 0 || record.hinhThucThanhToan === 2 ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "120px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Chuyển khoản
            </span>
          </div>
        ) : record.hinhThucThanhToan == 1 ? (
          <div
            className="rounded-pill badge-success mx-auto"
            style={{ height: "35px", width: "90px", padding: "4px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Tiền mặt
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Trạng Thái",
      align: "center",
      width: "10%",
      dataIndex: "trangThai",
      render: (status) =>
        status == 1 ? (
          <div
            className="rounded-pill badge-primary mx-auto"
            style={{
              height: "35px",
              width: "115px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Thành công
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Thời Gian",
      align: "center",
      width: "10%",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span style={{ fontWeight: "normal" }}>
          {format(new Date(record.createdAt), "HH:mm:ss, dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Mã Giao Dịch",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <span style={{ fontWeight: "500" }}>
          {item.hinhThucThanhToan === 1 || item.hinhThucThanhToan === 2
            ? "..."
            : item.ma}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <>
          {record.hinhThucThanhToan === 1 || record.hinhThucThanhToan === 2 ? (
            <Tooltip title="Xóa" TransitionComponent={Zoom}>
              <IconButton
                className=""
                style={{ height: "40px" }}
                onClick={() => deletePayment(record.id)}
              >
                <FaTrashAlt color="#e5383b" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Xem lịch sử" TransitionComponent={Zoom}>
              <IconButton
                className=""
                style={{ height: "40px" }}
                onClick={() =>
                  handleRedirectPaymentView(
                    `https://sandbox.vnpayment.vn/merchantv2/Transaction/PaymentDetail/${record.ma}.htm`
                  )
                }
              >
                <FaExternalLinkSquareAlt color="#2f80ed" />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const paymentBank = () => {
    addPayment(paymentCurrent, customerPayment);
  };

  const [customerPayment, setCustomerPayment] = useState(0);
  const [customerPaymentFormat, setCustomerPaymentFormat] = useState("");

  useEffect(() => {
    const chuaThanhToan = khachCanTra - khachThanhToan;
    if (chuaThanhToan <= 0) {
      setCustomerPaymentFormat("0");
      setCustomerPayment(0);
    } else {
      let valueFinal;
      valueFinal = String(chuaThanhToan)
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setCustomerPaymentFormat(valueFinal);
      setCustomerPayment(chuaThanhToan);
    }
  }, [payments, khachThanhToan, khachCanTra]);

  const handleCustomerPayment = (event) => {
    const value = event.target.value;
    const parseNumberPayment = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCustomerPaymentFormat(valueFinal);
    setCustomerPayment(parseNumberPayment);

    if (value == null || value == "") {
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
    } else if (parseNumberPayment > 1000000000000) {
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close();
        }}
        maxWidth="xxl"
        maxHeight="xxl"
      >
        <DialogContent className="">
          <div
            className="mt-2"
            style={{ width: "950px", height: "auto", minHeight: "500px" }}
          >
            <div className="container" style={{}}>
              <div className="d-flex justify-content-between">
                <span style={{ fontWeight: "500", fontSize: "24px" }}>
                  Tiến hành thanh toán
                </span>
                <Tooltip title="Đóng" TransitionComponent={Zoom}>
                  <IconButton size="small" onClick={() => close()}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div
                className="d-flex justify-content-between mt-4 pt-2"
                style={{ marginLeft: "1px" }}
              >
                <span
                  className="text-dark"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Khách cần trả
                </span>
                <span
                  className=""
                  style={{
                    fontSize: "20px",
                    color: "#dc1111",
                    fontWeight: "500",
                  }}
                >
                  {(khachCanTra &&
                    khachCanTra.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    "0 ₫"}
                </span>
              </div>
              <div
                className="d-flex justify-content-between mt-4"
                style={{ marginLeft: "1px" }}
              >
                <span
                  className="text-dark"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  Nhập số tiền
                </span>
                <div className="d-flex">
                  <TextField
                    className="me-3"
                    onChange={handleCustomerPayment}
                    value={customerPaymentFormat}
                    InputProps={{
                      style: { fontSize: "19px" },
                    }}
                    variant="standard"
                    sx={{ width: "155px", fontSize: "17.5px" }}
                  />
                  <div
                    className=""
                    style={{ marginTop: "1px", marginRight: "13px" }}
                  >
                    <List
                      orientation="horizontal"
                      wrap
                      sx={{
                        maxHeight: "50px",
                        "--List-gap": "15px",
                        "--ListItem-radius": "10px",
                        "--ListItem-gap": "4px",
                      }}
                    >
                      {selectedPayment.map((item, index) => (
                        <ListItem key={index}>
                          {paymentCurrent === item && (
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
                          <CheckboxJoy
                            slotProps={{
                              action: ({ checked }) => ({
                                sx: checked
                                  ? {
                                    border: "1px solid",
                                    borderColor: "#2f80ed",
                                    // borderRadius: "10px",
                                    // height: "40px",
                                  }
                                  : {},
                              }),
                            }}
                            overlay
                            disableIcon
                            checked={paymentCurrent === item}
                            variant={"outlined"}
                            onChange={() => {
                              if (paymentCurrent === item) {
                                setPaymentCurrent(item);
                              } else {
                                setPaymentCurrent(item);
                              }
                            }}
                            label={item}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                  <Button
                    onClick={() => {
                      if (paymentCurrent === null) {
                        handleOpenAlertVariant(
                          "Bạn chưa chọn hình thức thanh toán!",
                          Notistack.ERROR
                        );
                      } else if (customerPayment === 0) {
                        handleOpenAlertVariant(
                          "Số tiền không hợp lệ!",
                          Notistack.ERROR
                        );
                      } else if (paymentCurrent === "Ví VNPAY") {
                        handleOpenPayment();
                      } else {
                        addPayment(paymentCurrent, customerPayment);
                      }
                    }}
                    className="rounded-2 ant-btn-light"
                    style={{
                      height: "37.5px",
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
                </div>
              </div>
              <div className="mx-auto mt-3 pt-2" style={{ minHeight: "200px" }}>
                <TableAntd
                  className="table-container"
                  columns={columns}
                  dataSource={sortPayments}
                  pagination={false}
                  rowKey={"id"}
                  key={"id"}
                  locale={{ emptyText: <Empty /> }}
                />
              </div>
              <div
                className="d-flex justify-content-between mt-4 pt-2"
                style={{ marginLeft: "1px" }}
              >
                <span
                  className="text-dark"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Khách đã thanh toán
                </span>
                <span
                  className=""
                  style={{
                    fontSize: "20px",
                    color: "#2f80ed",
                    fontWeight: "500",
                  }}
                >
                  {(khachThanhToan &&
                    khachThanhToan.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    "0 ₫"}
                </span>
              </div>
              <div className="mt-4 d-flex justify-content-end">
                <Button
                  onClick={() => {
                    close();
                  }}
                  type="primary"
                  className="rounded-2"
                  style={{ height: "40px", width: "110px", fontSize: "15px" }}
                >
                  <span
                    className=""
                    style={{ marginBottom: "2px", fontWeight: "500" }}
                  >
                    Xong
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3"></div>
        </DialogContent>
      </Dialog>
      <PaymentVnPayConfirmDialog
        open={openPayment}
        onClose={handleCloseOpenPayment}
        payment={paymentBank}
      />
    </>
  );
}
export function PaymentVnPayConfirmDialog(props) {
  const { open, onClose, payment } = props;

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition1}
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="lg"
        maxHeight="lg"
        sx={{
          height: "300px",
          "& .MuiPaper-root": {
            borderRadius: "15px", // Giá trị border radius tùy chỉnh
            marginTop: "150px",
          },
        }}
      >
        <div className="p-2" style={{ width: "600px" }}>
          <DialogTitle
            sx={{ color: "#09a129", fontWeight: "500", fontSize: "18px" }}
            id="alert-dialog-title"
          >
            {"Xác nhận chuyển hướng đến trang thanh toán"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Bạn có chắc chắn muốn chuyển hướng đến trang thanh toán bằng hình
              thức
              <span style={{ fontWeight: "500", color: "#2f80ed" }}>
                {" Chuyển khoản"}
              </span>{" "}
              {" hoặc "}
              <span style={{ fontWeight: "500", color: "#2f80ed" }}>
                {"Thẻ"}
              </span>{" "}
              qua ví điện tử
              <span style={{ fontWeight: "500" }}>{" VNPAY "}</span>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={payment}
              className="rounded-2 me-1 button-mui"
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
                Đồng ý
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
                Hủy
              </span>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export const ModalPaymentHistories = ({ open, close, data }) => {
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [payments, setPayments] = useState(data);

  useEffect(() => {
    setPayments(data);
  }, [data]);

  const columns = [
    {
      title: "Mã Giao Dịch",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <span style={{ fontWeight: "500" }}>
          {item.ma === null || item.ma === "" ? "..." : item.ma}
        </span>
      ),
    },
    {
      title: "Phương Thức Thanh Toán",
      align: "center",
      width: "15%",
      dataIndex: "hinhThucThanhToan",
      render: (text, record) =>
        record.hinhThucThanhToan == 0 ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "120px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Chuyển khoản
            </span>
          </div>
        ) : record.hinhThucThanhToan == 1 ? (
          <div
            className="rounded-pill badge-success mx-auto"
            style={{ height: "35px", width: "90px", padding: "4px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Tiền mặt
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Trạng Thái",
      align: "center",
      width: "10%",
      dataIndex: "trangThai",
      render: (status) =>
        status == 1 ? (
          <div
            className="rounded-pill badge-primary mx-auto"
            style={{
              height: "35px",
              width: "115px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Thành công
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Thời Gian",
      align: "center",
      width: "10%",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span style={{ fontWeight: "normal" }}>
          {format(new Date(record.createdAt), "HH:mm:ss, dd/MM/yyyy")}
        </span>
      ),
    },
    {
      title: "Số Tiền",
      align: "center",
      dataIndex: "soTienThanhToan",
      width: "15%",
      render: (text, record) => (
        <span className="txt-danger" style={{ fontSize: "17px" }}>
          {record &&
            record.soTienThanhToan &&
            record.soTienThanhToan.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </span>
      ),
    },
  ];

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close();
        }}
        maxWidth="xxl"
        maxHeight="xxl"
        sx={{ marginBottom: "170px" }}
      >
        <DialogContent className="">
          <div
            className="mt-2"
            style={{ width: "950px", height: "auto", maxHeight: "200px" }}
          >
            <div className="container" style={{}}>
              <div className="mx-auto mt-3 pt-2">
                <TableAntd
                  className="table-container"
                  columns={columns}
                  dataSource={payments}
                  pagination={false}
                  rowKey={"id"}
                  key={"id"}
                  locale={{ emptyText: <Empty /> }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export function MultiplePaymentMethodsDelivery({
  open,
  close,
  data,
  khachCanTra,
  khachThanhToan,
  addPayment,
  hoanTien,
  canTraKhach,
  tienThua,
}) {
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [payments, setPayments] = useState(data);

  useEffect(() => {
    setPayments(data);
  }, [data]);

  const [selectedPayment, setSelectedPayment] = useState([
    "Tiền mặt",
    "Chuyển khoản",
  ]);
  const [paymentCurrent, setPaymentCurrent] = useState("Tiền mặt");

  const [customerPayment, setCustomerPayment] = useState(0);
  const [customerPaymentFormat, setCustomerPaymentFormat] = useState("");

  useEffect(() => {
    if (hoanTien) {
      let valueFinal;
      valueFinal = String(canTraKhach)
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setCustomerPaymentFormat(valueFinal);
      setCustomerPayment(canTraKhach);
    } else {
      const chuaThanhToan = khachCanTra - khachThanhToan;
      if (chuaThanhToan <= 0) {
        setCustomerPaymentFormat("0");
        setCustomerPayment(0);
      } else {
        let valueFinal;
        valueFinal = String(chuaThanhToan)
          .replace(/[^0-9]+/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setCustomerPaymentFormat(valueFinal);
        setCustomerPayment(chuaThanhToan);
      }
    }
  }, [payments, khachThanhToan, khachCanTra, hoanTien, canTraKhach]);

  const handleCustomerPayment = (event) => {
    const value = event.target.value;
    const parseNumberPayment = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCustomerPaymentFormat(valueFinal);
    setCustomerPayment(parseNumberPayment);

    if (value == null || value == "") {
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
    } else if (parseNumberPayment > 1000000000000) {
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
    }
  };

  const checkHoanTien = () => {
    if (hoanTien === true) {
      return canTraKhach && canTraKhach;
    }
    return khachCanTra && khachCanTra;
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close();
        }}
        maxWidth="xxl"
        maxHeight="xxl"
        sx={{ marginBottom: "100px" }}
      >
        <DialogContent className="">
          <div
            className="mt-2"
            style={{ width: "950px", height: "auto", minHeight: "300px" }}
          >
            <div className="container" style={{}}>
              <div className="d-flex justify-content-between">
                <span style={{ fontWeight: "500", fontSize: "24px" }}>
                  Tiến hành thanh toán
                </span>
                <Tooltip title="Đóng" TransitionComponent={Zoom}>
                  <IconButton size="small" onClick={() => close()}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div
                className="d-flex justify-content-between mt-4 pt-2"
                style={{ marginLeft: "1px" }}
              >
                <span
                  className="text-dark"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Khách cần trả
                </span>
                <span
                  className=""
                  style={{
                    fontSize: "20px",
                    color: "#dc1111",
                    fontWeight: "500",
                  }}
                >
                  {(khachCanTra &&
                    khachCanTra.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    "0 ₫"}
                </span>
              </div>
              <div
                className="d-flex justify-content-between mt-4"
                style={{ marginLeft: "1px" }}
              >
                <span
                  className="text-dark"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  Nhập số tiền
                </span>
                <div className="d-flex">
                  <TextField
                    className="me-3"
                    onChange={handleCustomerPayment}
                    value={customerPaymentFormat}
                    InputProps={{
                      style: { fontSize: "19px" },
                    }}
                    variant="standard"
                    sx={{ width: "155px", fontSize: "17.5px" }}
                  />
                  <div className="" style={{ marginTop: "1px" }}>
                    <List
                      orientation="horizontal"
                      wrap
                      sx={{
                        maxHeight: "50px",
                        "--List-gap": "15px",
                        "--ListItem-radius": "10px",
                        "--ListItem-gap": "4px",
                      }}
                    >
                      {selectedPayment.map((item, index) => (
                        <ListItem key={index}>
                          {paymentCurrent === item && (
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
                          <CheckboxJoy
                            slotProps={{
                              action: ({ checked }) => ({
                                sx: checked
                                  ? {
                                    border: "1px solid",
                                    borderColor: "#2f80ed",
                                    // borderRadius: "10px",
                                    // height: "40px",
                                  }
                                  : {},
                              }),
                            }}
                            overlay
                            disableIcon
                            checked={paymentCurrent === item}
                            variant={"outlined"}
                            onChange={() => {
                              if (paymentCurrent === item) {
                                setPaymentCurrent(item);
                              } else {
                                setPaymentCurrent(item);
                              }
                            }}
                            label={item}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mt-4 pt-2"
                style={{ marginLeft: "1px" }}
              >
                <span
                  className="text-dark"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Khách đã thanh toán
                </span>
                <span
                  className=""
                  style={{
                    fontSize: "20px",
                    color: "#2f80ed",
                    fontWeight: "500",
                  }}
                >
                  {(khachThanhToan &&
                    khachThanhToan.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    "0 ₫"}
                </span>
              </div>
              <div className="mt-4 d-flex justify-content-end">
                <Button
                  onClick={() => {
                    if (paymentCurrent === null) {
                      handleOpenAlertVariant(
                        "Bạn chưa chọn hình thức thanh toán!",
                        Notistack.ERROR
                      );
                    } else if (customerPayment === 0) {
                      handleOpenAlertVariant(
                        "Số tiền không hợp lệ!",
                        Notistack.ERROR
                      );
                    } else {
                      addPayment(paymentCurrent, customerPayment);
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
            </div>
          </div>
          <div className="mt-2"></div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const ModalRefundProduct = ({
  open,
  close,
  imeis,
  refresh,
  refund,
}) => {
  const [selectedImei, setSelectedImei] = useState([]);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [isAll, setIsAll] = useState(false);

  const handleAllCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsAll(checked);
    if (checked) {
      setSelectedImei(imeis);
    } else {
      setSelectedImei([]);
    }
  };

  useEffect(() => {
    setSelectedImei([]);
  }, [refresh]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close(); /*  setSelectedImei([])  */
        }}
        maxWidth="xxl"
        maxHeight="xxl"
      >
        <DialogContent className="">
          <div className="mt-2" style={{ width: "1000px" }}>
            <div className="container" style={{}}>
              <div className="header-title">
                <div className="mt-1">
                  <span className="fs-4" style={{ fontWeight: "500" }}>
                    Chọn Imei Cần Trả Hàng
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2">
                <div className="me-2" style={{}}>
                  <table className="table" style={{ borderRadius: "10px" }}>
                    <thead style={{ borderRadius: "10px" }}>
                      <tr>
                        <th scope="col">
                          <Checkbox
                            color="primary"
                            checked={isAll}
                            onChange={handleAllCheckboxChange}
                          />
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Imei
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Trạng Thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {imeis.length
                        ? imeis.map((item, index) => (
                          <tr
                            key={index}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (
                                !selectedImei.some(
                                  (selectedItem) =>
                                    selectedItem.soImei === item.soImei
                                )
                              ) {
                                setSelectedImei([...selectedImei, item]);
                              } else {
                                setSelectedImei(
                                  selectedImei.filter(
                                    (selectedItem) =>
                                      selectedItem.soImei !== item.soImei
                                  )
                                );
                              }
                            }}
                          >
                            <td>
                              <Checkbox
                                color="primary"
                                checked={selectedImei.some(
                                  (selectedItem) =>
                                    selectedItem.soImei === item.soImei
                                )}
                              />
                            </td>
                            <td className="text-center">{item.soImei}</td>
                            <td className="text-center">
                              <div
                                className={
                                  "badge-success rounded-pill mx-auto"
                                }
                                style={{
                                  height: "35px",
                                  width: "105px",
                                  padding: "4px",
                                }}
                              >
                                <span
                                  className="text-white"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  Đã Bán
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3 me-2">
                <Button
                  onClick={() => {
                    if (selectedImei.length === 0) {
                      handleOpenAlertVariant(
                        "Bạn chưa chọn IMEI cần trả hàng!",
                        "warning"
                      );
                    } else {
                      refund(selectedImei
                      );
                      close();
                    }
                  }}
                  className="rounded-2 button-mui me-2"
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
                <Button
                  onClick={() => {
                    close();
                    // setSelectedImei([]);
                  }}
                  className="rounded-2"
                  type="danger"
                  style={{ height: "40px", width: "auto", fontSize: "15px" }}
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
          </div>
        </DialogContent>
        <div className="mt-2"></div>
      </Dialog>
    </>
  );
};

export function ConfirmChangeTypePhienBan(props) {
  const { open, onClose, confirm } = props;

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
            borderRadius: "15px",
            marginTop: "150px",
          },
        }}
      >
        <div className="p-2" style={{}}>
          <DialogTitle
            sx={{ color: "#2f80ed", fontWeight: "500", fontSize: "18px" }}
            id="alert-dialog-title"
          >
            {"Chuyển đổi tính năng thêm phiên bản"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Thông tin của các phiên bản hiện tại
              sẽ không được lưu lại. Bạn có chắc chắn muốn chuyển sang tính năng này ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={confirm}
              className="rounded-2 me-1 button-mui"
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

export function ConfirmRefundOrder(props) {
  const { open, onClose, confirm } = props;

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
            borderRadius: "15px",
            marginTop: "150px",
          },
        }}
      >
        <div className="p-2" style={{}}>
          <DialogTitle
            sx={{ color: "#e5383b", fontWeight: "500", fontSize: "18px" }}
            id="alert-dialog-title"
          >
            {"Xác nhận trả hàng"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Bạn có chắc chắn muốn trả hàng ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={confirm}
              className="rounded-2 me-1 button-mui"
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


export function ConfirmAddProduct(props) {
  const { open, onClose, confirm, name } = props;

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
            borderRadius: "15px",
            marginTop: "150px",
          },
        }}
      >
        <div className="p-2" style={{}}>
          <DialogTitle
            sx={{ color: "#2f80ed", fontWeight: "500", fontSize: "18px" }}
            id="alert-dialog-title"
          >
            {"Xác nhận thêm sản phẩm"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Bạn có chắc chắc muốn thêm sản phẩm
              <span style={{ fontWeight: "500" }}>{" " + name + " "}</span>
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={confirm}
              className="rounded-2 me-1 button-mui"
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
export const ScannerBarcode = ({
  open,
  close,
  getResult,
  refresh
}) => {

  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    setScanning(true);
  }, [refresh])

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    getResult(decodedText);
    setScanning(false);
  };

  const Barcode = () => {
    return (
      <div className="mx-auto" style={{ width: "500px" }}>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </div>
    )
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close();
          // setScanning(true);
        }}
        maxWidth="xxl"
        maxHeight="xxl"
      >
        <DialogContent className="">
          <div className="mt-2" style={{ width: "600px" }}>
            <div className="container" style={{}}>
              <div className="">
                <div className="mt-1">
                  <span className="fs-4 fw-bold">Quét Barcode Sản Phẩm</span>
                </div>
                <div className="mt-4 text-center" style={{}}>
                  {scanning === true && open === true ?
                    <Barcode /> : "Đang chờ ..."
                  }
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export const ModalViewImeiHadBuy = ({
  open,
  close,
  imeis,
}) => {

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close(); /*  setSelectedImei([])  */
        }}
        maxWidth="xxl"
        maxHeight="xxl"
        sx={{ marginBottom: "170px" }}
      >
        <DialogContent className="">
          <div className="mt-2" style={{ width: "900px" }}>
            <div className="container" style={{}}>
              <div className="header-title">
                <div className="mt-1">
                  <span className="fs-4" style={{ fontWeight: "500" }}>
                    Danh sách IMEI đã bán
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2">
                <div className="me-2" style={{}}>
                  <table className="table" style={{ borderRadius: "10px" }}>
                    <thead style={{ borderRadius: "10px" }}>
                      <tr>
                        <th scope="col" className="text-center text-dark">
                          STT
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Imei
                        </th>
                        <th scope="col" className="text-center text-dark">
                          Trạng Thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {imeis.length
                        ? imeis.map((item, index) => (
                          <tr
                          >
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{item.soImei}</td>
                            <td className="text-center">
                              <div
                                className={
                                  "badge-success rounded-pill mx-auto"
                                }
                                style={{
                                  height: "35px",
                                  width: "105px",
                                  padding: "4px",
                                }}
                              >
                                <span
                                  className="text-white"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  Đã Bán
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-2"></div>
      </Dialog>
    </>
  );
};
