import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { responsiveFontSizes, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import PaymentIcon from "@mui/icons-material/Payment";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  FormHelperText,
  InputLabel,
  selectClasses,
  Tooltip,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Badge from "@mui/material/Badge";
import Zoom from "@mui/material/Zoom";

import Alert from "@mui/joy/Alert";
import { Button as ButtonJoy } from "@mui/joy";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { IconButton as IconButtonJoy } from "@mui/joy";
import { format } from "date-fns";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IoPersonCircle } from "react-icons/io5";
import Sheet from "@mui/joy/Sheet";
import { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box as BoxJoy } from "@mui/joy";
import { Button } from "antd";
import {
  FormControl,
  Input,
  OutlinedInput,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/joy/Checkbox";
import TextField from "@mui/material/TextField";
import style from "./style.css";
import {
  AddressDialog,
  ConfirmPaymentDialog,
  CustomersDialog,
  ModalPaymentHistories,
  MultiplePaymentMethods,
  OrderConfirmPayment,
  OrderPendingConfirmCloseDialog,
  PaymentVnPayConfirmDialog,
  ProductsDialog,
  ShipFeeInput,
  VouchersDialog,
} from "./AlertDialogSlide";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { isNaN, map, parseInt, debounce, update } from "lodash";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import TabItem from "./tab-item";
import LoadingIndicator from "../../../utilities/loading";
import { OrderStatusString, OrderTypeString, Notistack } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
import {
  TextFieldAddress,
  TextFieldEmail,
  TextFieldFullName,
  TextFieldName,
  TextFieldPhone,
  TextFieldSdt,
} from "./text-field-info-ship";
import DeliveryInfoShip from "./delivery-info-ship";
import AppBarCode from "./App";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import {
  PrintBillAtTheCounter,
  PrintBillAtTheCounterAuto,
} from "./printer-invoice";
import { useReactToPrint } from "react-to-print";
import {
  request,
  requestBodyParam,
  requestParam,
} from "../../../store/helpers/axios_helper";
import { getUser } from "../../../store/user/userSlice";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const PointOfSales = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [loadingChild, setLoadingChild] = useState(false);
  const [delivery, setDelivery] = React.useState(false);
  const [paymentWhenReceive, setPaymentWhenReceive] = useState(false);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountValidate, setDiscountValidate] = useState("");
  const [discountFormat, setDiscountFormat] = useState("");
  const [shipFee, setShipFee] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [clearCus, setClearCus] = useState(false);
  const [paymentHistories, setPaymentHistories] = useState([]);
  const [hadPaymentBank, setHadPaymentBank] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isFirstGet, setIsFirstGet] = useState(true);

  const [payment, setPayment] = useState(1);
  const [customerPayment, setCustomerPayment] = useState(0);
  const [customerPaymentFormat, setCustomerPaymentFormat] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [idCustomer, setIdCustomer] = useState("");
  const [customerNeedPay, setCustomerNeedPay] = useState(null);
  const [customerNeedPayFormat, setCustomerNeedPayFormat] = useState(0);

  const [idVoucher, setIdVoucher] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [vouchers, setVouchers] = useState([]);
  const [order, setOrder] = useState({});
  const [cartId, setCartId] = useState("");
  const [orders, setOrders] = useState([]);
  const [changedCartItems, setChangedCartItems] = useState(0);
  const [dieuKien, setDieuKien] = useState(0);
  const [sizeCartItems, setSizeCartItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [customerNameShip, setCustomerNameShip] = useState("");
  const [customerPhoneShip, setCustomerPhoneShip] = useState("");
  const [customerAddressShip, setCustomerAddressShip] = useState("");
  const [customerNoteShip, setCustomerNoteShip] = useState("");
  const [customerProvinceShip, setCustomerProvinceShip] = useState("");
  const [customerDistrictShip, setCustomerDistrictShip] = useState("");
  const [customerWardShip, setCustomerWardShip] = useState("");
  let [hoTenKH, setHoTenKH] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [diaChi, setDiaChi] = useState("");
  let [soDienThoaiKhachHang, setSoDienThoaiKhachHang] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [diaChiList, setDiaChiList] = useState({});
  const [customerAddressList, setCustomerAddressList] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");

  const [openScanner, setOpenScanner] = useState(false);

  const getFullName = (value) => {
    setFullName(value);
  };
  const getSdt = (value) => {
    setSdt(value);
  };
  const getEmail = (value) => {
    setEmail(value);
  };

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };

  const handleCloseOpenScanner = () => {
    setOpenScanner(false);
  };

  const updateSdt = async (sdt) => {
    const orderRequest = {
      soDienThoai: sdt.trim() === "" ? null : sdt,
      isUpdateSdt: true,
      isPayment: false,
      isUpdateType: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: true,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setSdt(data.soDienThoai === null ? "" : data.soDienThoai);
        getAllOrdersPending();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmail = async (email) => {
    const orderRequest = {
      email: email.trim() === "" ? null : email,
      isUpdateSdt: false,
      isPayment: false,
      isUpdateType: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: true,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateFullName: false,
      isUpdateEmail: true,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setEmail(data.email === null ? "" : data.email);
        getAllOrdersPending();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFullName = async (name) => {
    const orderRequest = {
      hoVaTen: name.trim() === "" ? null : name,
      isUpdateSdt: false,
      isPayment: false,
      isUpdateType: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: true,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateFullName: true,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setFullName(data.hoVaTen === null ? "" : data.hoVaTen);
        getAllOrdersPending();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedValuePaymentMethod, setSelectedValuePaymentMethod] =
    useState("Tiền mặt");
  const handleRadioChange = (event) => {
    const value = event.target.value;
    if (value === "Chuyển khoản" && !delivery) {
      setOpenModalConfirmRedirectPayment(true);
    } else if (value === "Cả 2" && !delivery) {
      setOpenModalPaymentMultipleCounter(true);
    } else {
      setSelectedValuePaymentMethod(value);
    }
  };

  const getCustomerPayment = (money, moneyFormat) => {
    setCustomerPayment(money);
    setCustomerPaymentFormat(moneyFormat);
  };

  const getIsShow = (data) => {
    setIsShow(data);
  };

  const getNameShip = (data) => {
    setCustomerNameShip(data);
  };
  const getPhoneShip = (data) => {
    setCustomerPhoneShip(data);
  };
  const getAddressShip = (data) => {
    setCustomerAddressShip(data);
  };
  const getDistrictShip = (data) => {
    setCustomerDistrictShip(data);
  };
  const getProvinceShip = (data) => {
    setCustomerProvinceShip(data);
  };
  const getWardShip = (data) => {
    setCustomerWardShip(data);
  };
  const getNoteShip = (data) => {
    setCustomerNoteShip(data);
  };

  const updateInfoShipDefault = async (data) => {
    setIsShow(true);
    if (data !== null) {
      const orderRequest = {
        soDienThoaiNguoiNhan:
          data.soDienThoaiKhachHang !== "" || data.soDienThoaiKhachHang !== null
            ? data.soDienThoaiKhachHang
            : "",
        tenNguoiNhan:
          data.hoTenKH !== "" || data.hoTenKH !== null ? data.hoTenKH : "",
        diaChiNguoiNhan:
          data.diaChi !== "" || data.diaChi !== null ? data.diaChi : "",
        tinhThanhPhoNguoiNhan:
          data.tinhThanhPho !== "" || data.tinhThanhPho !== null
            ? data.tinhThanhPho
            : "",
        quanHuyenNguoiNhan:
          data.quanHuyen !== "" || data.quanHuyen !== null
            ? data.quanHuyen
            : "",
        xaPhuongNguoiNhan:
          data.xaPhuong !== "" || data.xaPhuong !== null ? data.xaPhuong : "",
        // loaiHoaDon: delivery ? OrderTypeString.DELIVERY : OrderTypeString.AT_COUNTER,
        isPayment: false,
        isUpdateType: false,
        isUpdateAccount: false,
        isUpdateVoucher: false,
        isUpdateInfoShipByCustomer: true,
        isUpdateInfoShip: false,
        isUpdateNoteShip: false,
        isUpdateNameShip: false,
        isUpdateAddressShip: false,
        isUpdatePhoneShip: false,
        isUpdateSdt: false,
        isUpdateFullName: false,
        isUpdateEmail: false,
      };
      try {
        await request(
          "PUT",
          `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
          orderRequest
        ).then((response) => {
          const data = response.data.data;
          setOrder(data);
          setCustomerNameShip(data && data.tenNguoiNhan);
          setCustomerPhoneShip(data && data.soDienThoaiNguoiNhan);
          setCustomerAddressShip(data && data.diaChiNguoiNhan);
          setCustomerWardShip(data && data.xaPhuongNguoiNhan);
          setCustomerProvinceShip(data && data.tinhThanhPhoNguoiNhan);
          setCustomerDistrictShip(data && data.quanHuyenNguoiNhan);
        });
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      const orderRequest = {
        soDienThoaiNguoiNhan: "",
        tenNguoiNhan: "",
        diaChiNguoiNhan: "",
        tinhThanhPhoNguoiNhan: "",
        quanHuyenNguoiNhan: "",
        xaPhuongNguoiNhan: "",
        // loaiHoaDon: delivery ? OrderTypeString.DELIVERY : OrderTypeString.AT_COUNTER,
        isPayment: false,
        isUpdateType: false,
        isUpdateAccount: false,
        isUpdateVoucher: false,
        isUpdateInfoShipByCustomer: true,
        isUpdateInfoShip: false,
        isUpdateNoteShip: false,
        isUpdateNameShip: false,
        isUpdateAddressShip: false,
        isUpdatePhoneShip: false,
        isUpdateSdt: false,
        isUpdateFullName: false,
        isUpdateEmail: false,
      };
      try {
        await request(
          "PUT",
          `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
          orderRequest
        ).then((response) => {
          const data = response.data.data;
          setOrder(data);
          setCustomerNameShip(data && data.tenNguoiNhan);
          setCustomerPhoneShip(data && data.soDienThoaiNguoiNhan);
          setCustomerAddressShip(data && data.diaChiNguoiNhan);
          setCustomerWardShip(data && data.xaPhuongNguoiNhan);
          setCustomerProvinceShip(data && data.tinhThanhPhoNguoiNhan);
          setCustomerDistrictShip(data && data.quanHuyenNguoiNhan);
        });
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const updateInfoShip = async (data) => {
    setIsLoading(true);
    setIsShow(true);
    const orderRequest = {
      soDienThoaiNguoiNhan:
        data.soDienThoaiKhachHang !== "" || data.soDienThoaiKhachHang !== null
          ? data.soDienThoaiKhachHang
          : null,
      tenNguoiNhan:
        data.hoTenKH !== "" || data.hoTenKH !== null ? data.hoTenKH : null,
      diaChiNguoiNhan:
        data.diaChi !== "" || data.diaChi !== null ? data.diaChi : null,
      tinhThanhPhoNguoiNhan:
        data.tinhThanhPho !== "" || data.tinhThanhPho !== null
          ? data.tinhThanhPho
          : null,
      quanHuyenNguoiNhan:
        data.quanHuyen !== "" || data.quanHuyen !== null
          ? data.quanHuyen
          : null,
      xaPhuongNguoiNhan:
        data.xaPhuong !== "" || data.xaPhuong !== null ? data.xaPhuong : null,
      // loaiHoaDon: delivery ? OrderTypeString.DELIVERY : OrderTypeString.AT_COUNTER,
      isPayment: false,
      isUpdateType: false,
      isUpdateAccount: false,
      isUpdateVoucher: false,
      isUpdateInfoShipByCustomer: true,
      isUpdateInfoShip: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setCustomerNameShip(data && data.tenNguoiNhan);
        setCustomerPhoneShip(data && data.soDienThoaiNguoiNhan);
        setCustomerAddressShip(data && data.diaChiNguoiNhan);
        setCustomerWardShip(data && data.xaPhuongNguoiNhan);
        setCustomerProvinceShip(data && data.tinhThanhPhoNguoiNhan);
        setCustomerDistrictShip(data && data.quanHuyenNguoiNhan);
        getAllOrdersPending();
        setIsLoading(false);
        handleCloseDialogAddresses();
        handleOpenAlertVariant(
          "Chọn địa chỉ giao hàng thành công!",
          Notistack.SUCCESS
        );
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  const openEditModal = async (diaChiList) => {
    try {
      await axios
        .get(`http://localhost:8080/khach-hang/mot-dia-chi?id=${diaChiList.id}`)
        .then((response) => {
          // const data = response.data.data;
          setSoDienThoaiKhachHang(diaChiList.soDienThoaiKhachHang);
          setHoTenKH(diaChiList.hoTenKH);
          setQuanHuyen(diaChiList.quanHuyen);
          setDiaChi(diaChiList.diaChi);
          setTinhThanhPho(diaChiList.tinhThanhPho);
          setXaPhuong(diaChiList.xaPhuong);
          setDiaChiList(diaChiList);
          console.log(diaChiList);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };
  const updatePhoneShipOrder = async (phone) => {
    const orderRequest = {
      soDienThoaiNguoiNhan: phone === "" ? null : phone,
      isUpdatePhoneShip: true,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isUpdateAddressShip: false,
      isPayment: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateType: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setCustomerPhoneShip(data && data.soDienThoaiNguoiNhan);
        getAllOrdersPending();
      });
    } catch (error) {}
  };
  const updateAddressShipOrder = async (address) => {
    const orderRequest = {
      diaChiNguoiNhan: address === "" ? null : address,
      isUpdateType: false,
      isUpdateAddressShip: true,
      isUpdatePhoneShip: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isPayment: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setCustomerAddressShip(data && data.diaChiNguoiNhan);
        getAllOrdersPending();
      });
    } catch (error) {}
  };
  const updateNoteShipOrder = async (note) => {
    const orderRequest = {
      ghiChu: note === "" ? null : note,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateNoteShip: true,
      isUpdateNameShip: false,
      isPayment: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateType: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setCustomerNoteShip(data && data.ghiChu);
        getAllOrdersPending();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTypeOrder = async (type) => {
    setIsLoading(true);
    const orderRequest = {
      loaiHoaDon: type ? OrderTypeString.DELIVERY : OrderTypeString.AT_COUNTER,
      isUpdateType: true,
      isPayment: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const order = response.data.data;
        setOrder(order);

        const delivery =
          order.loaiHoaDon === OrderTypeString.DELIVERY ? true : false;
        setDelivery(
          order.loaiHoaDon === OrderTypeString.DELIVERY ? true : false
        );

        if (delivery) {
          setCustomerNameShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.tenNguoiNhan !== null
              ? order.tenNguoiNhan
              : ""
          );
          setCustomerPhoneShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.soDienThoaiNguoiNhan !== null
              ? order.soDienThoaiNguoiNhan
              : ""
          );
          setCustomerAddressShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.diaChiNguoiNhan !== null
              ? order.diaChiNguoiNhan
              : ""
          );
          setCustomerWardShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.xaPhuongNguoiNhan !== null
              ? order.xaPhuongNguoiNhan
              : ""
          );
          setCustomerProvinceShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.tinhThanhPhoNguoiNhan !== null
              ? order.tinhThanhPhoNguoiNhan
              : ""
          );
          setCustomerDistrictShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.quanHuyenNguoiNhan != null
              ? order.quanHuyenNguoiNhan
              : ""
          );
          setCustomerNoteShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.ghiChu != null
              ? order.ghiChu
              : ""
          );
        } else {
          setSelectedValuePaymentMethod("Tiền mặt");
          setCustomerNameShip("");
          setCustomerPhoneShip("");
          setCustomerAddressShip("");
          setCustomerWardShip("");
          setCustomerProvinceShip("");
          setCustomerDistrictShip("");
          setCustomerNoteShip("");
        }
        getAllOrdersPending();
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const updateNameShipOrder = async (name) => {
    const orderRequest = {
      tenNguoiNhan: name === "" ? null : name,
      isPayment: false,
      isUpdateType: false,
      isUpdateAccount: false,
      isUpdateInfoShip: false,
      isUpdateVoucher: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: true,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setCustomerNameShip(data && data.tenNguoiNhan);
        getAllOrdersPending();
      });
    } catch (error) {}
  };

  const updateInfoShipOrder = async (
    name,
    phone,
    address,
    province,
    district,
    ward,
    note
  ) => {
    const orderRequest = {
      tinhThanhPhoNguoiNhan: province === "" ? null : province,
      quanHuyenNguoiNhan: district === "" ? null : district,
      xaPhuongNguoiNhan: ward === "" ? null : ward,
      isPayment: false,
      isUpdateType: false,
      isUpdateAccount: false,
      isUpdateInfoShip: true,
      isUpdateVoucher: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      requestBodyParam(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        const data = response.data.data;
        setOrder(data);
        setCustomerWardShip(data && data.xaPhuongNguoiNhan);
        setCustomerProvinceShip(data && data.tinhThanhPhoNguoiNhan);
        setCustomerDistrictShip(data && data.quanHuyenNguoiNhan);
        getAllOrdersPending();
      });
    } catch (error) {}
  };

  // const getCustomerById = async (id) => {
  //   setIsLoading(true);
  //   if (id !== null) {
  //     try {
  //       const response = await request("GET", `/khach-hang/hien-thi-theo/${id}`);
  //       const data = response.data;
  //       await updateAccount(id);
  //       console.log(data);
  //       setCustomer(data);
  //       setCustomerName(data.hoVaTen);
  //       setCustomerPhone(data.soDienThoai);
  //       setCustomerEmail(data.email);
  //       setIdCustomer(data.id);
  //       setCustomerAddressList(data.diaChiList);
  //       setIsLoading(false);
  //       handleCloseDialogCustomers();
  //       handleOpenAlertVariant(
  //         "Chọn khách hàng thành công!",
  //         Notistack.SUCCESS
  //       );
  //     } catch (error) {
  //       console.error(error);
  //       setIsLoading(false);
  //     }
  //   }
  //   else {
  //     try {
  //       await updateAccount(null);
  //       setCustomer(null);
  //       setCustomerName("");
  //       setCustomerPhone("");
  //       setCustomerEmail("");
  //       setIdCustomer("");
  //       setCustomerAddressList([]);
  //       setIsLoading(false);
  //       handleCloseDialogCustomers();
  //       handleOpenAlertVariant(
  //         "Bỏ chọn khách hàng thành công!",
  //         Notistack.SUCCESS
  //       );
  //     } catch (error) {
  //       console.error(error);
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const getCustomerById = async (id) => {
    setIsLoading(true);
    if (id !== null) {
      request("GET", `/khach-hang/${id}`)
        .then(async (response) => {
          const data = response.data;
          await updateAccount(id);
          console.log(data);
          setCustomer(data);
          setCustomerName(data.hoVaTen);
          setCustomerPhone(data.soDienThoai);
          setCustomerEmail(data.email);
          setIdCustomer(data.id);
          setCustomerAddressList(data.diaChiList);
          setIsLoading(false);
          handleCloseDialogCustomers();
          handleOpenAlertVariant(
            "Chọn khách hàng thành công!",
            Notistack.SUCCESS
          );
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      await updateAccount(null);
      setCustomer(null);
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setIdCustomer("");
      setCustomerAddressList([]);
      setIsLoading(false);
      handleCloseDialogCustomers();
      handleOpenAlertVariant(
        "Bỏ chọn khách hàng thành công!",
        Notistack.SUCCESS
      );
    }
  };

  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const scrollToDiv1 = () => {
    const { top, height } = divRef1.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = top + scrollTop - (window.innerHeight - height) / 2;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };
  const scrollToDiv2 = () => {
    const { top, height } = divRef2.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = top + scrollTop - (window.innerHeight - height) / 2;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [openDialogConfirmPayment, setOpenDialogConfirmPayment] =
    useState(false);

  const checkInfoGuest = () => {
    if (order.account === null) {
      if (fullName.trim() === "" || sdt.trim() === "") {
        return true;
      }
      return false;
    }
  };

  const checkInfoShip = () => {
    if (
      customerNameShip.trim() === "" ||
      customerPhoneShip.trim() === "" ||
      customerAddressShip.trim() === "" ||
      customerDistrictShip.trim() === "" ||
      customerWardShip.trim() === ""
    ) {
      return true;
    }
    return false;
  };

  const handleOpenDialogConfirmPayment = () => {
    setConfirm(true);
    if (checkInfoGuest() === true) {
      scrollToDiv1();
      return;
    }
    if (
      checkInfoShip() === true &&
      order.loaiHoaDon === OrderTypeString.DELIVERY &&
      checkInfoGuest() === false
    ) {
      scrollToDiv2();
      return;
    }
    if (cartItems && cartItems.length == 0) {
      handleOpenAlertVariant("Giỏ hàng chưa có sản phẩm!", Notistack.ERROR);
    } else if (
      customerPayment < handleCountTotalMoneyCustomerNeedPay() &&
      delivery == false
    ) {
      handleOpenAlertVariant(
        "Số tiền thanh toán không khớp với số tiền cần trả!",
        Notistack.ERROR
      );
    } else if (
      customerPayment < handleCountTotalMoneyCustomerNeedPay() &&
      delivery == true &&
      paymentWhenReceive === false
    ) {
      handleOpenAlertVariant(
        "Số tiền thanh toán không khớp với số tiền cần trả!",
        Notistack.ERROR
      );
    } else {
      setOpenDialogConfirmPayment(true);
    }
  };
  const handleCloseDialogConfirmPayment = () => {
    setOpenDialogConfirmPayment(false);
  };

  const getShipFee = (fee) => {
    setShipFee(delivery ? fee : 0);
  };
  const getDieuKien = (dieuKien) => {
    setDieuKien(dieuKien);
  };

  useEffect(() => {
    const validVouchers = vouchers.filter(
      (item) => handleCountTotalMoney() >= item.dieuKienApDung
    );
    const sortedVouchers = validVouchers.sort(
      (a, b) => b.giaTriVoucher - a.giaTriVoucher
    );
    if (cartItems.length === 0 && discountValue != 0) {
      handleCheckVoucher(discount);
    } else if (cartItems.length !== 0) {
      if (discount != "" && discountValue == 0) {
        if (discount.trim().length === 10) {
          handleCheckVoucher(discount);
        }
      } else if (discount != "" && discountValue != 0) {
        if (handleCountTotalMoney() < dieuKien) {
          handleCheckVoucher(discount);
        } else {
          const maxVoucher = sortedVouchers[0];
          if (maxVoucher) {
            handleCheckVoucher(maxVoucher.ma);
          }
        }
      } else {
        const maxVoucher = sortedVouchers[0];
        if (maxVoucher) {
          handleCheckVoucher(maxVoucher.ma);
        }
      }
    }
  }, [changedCartItems]);

  const paymentOrder = async (data) => {
    setIsLoading(true);
    const orderRequest = {
      ma: order.ma,
      tongTien: handleCountTotalMoney(),
      tienThua: paymentWhenReceive === true ? 0 : handleCountTotalSurplus(),
      tongTienSauKhiGiam: handleCountTotalMoney() - discountValue,
      khachCanTra: handleCountTotalMoneyCustomerNeedPay(),
      trangThai: data.trangThai,
      hoVaTen: order.account !== null ? order.account.hoVaTen : fullName,
      soDienThoai: order.account !== null ? order.account.soDienThoai : sdt,
      email: order.account !== null ? order.account.email : email,
      loaiHoaDon: data.loaiHoaDon,
      phiShip: delivery === true ? shipFee : null,
      orderHistories: data.orderHistories,
      hinhThucThanhToan: selectedValuePaymentMethod,
      employee: {
        id:
          userId === null || userId === "" || userId === undefined
            ? null
            : userId,
      },
      cart: order.cart,
      isPayment: true,
      isUpdateType: false,
      isUpdateInfoShip: false,
      isUpdateAccount: false,
      isUpdateVoucher: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    try {
      request(
        "PUT",
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then((response) => {
        setOrder(response.data.data);
        setIsLoading(false);
        handleOpenAlertVariant(
          `${
            data.loaiHoaDon == OrderTypeString.DELIVERY
              ? "Xác nhận đặt hàng thành công!"
              : "Xác nhận thanh toán thành công!"
          }`,
          Notistack.SUCCESS
        );
        navigate(`/dashboard/order-detail/${order.ma}`);
        // handlePrint();
        console.log(orderRequest);
      });
    } catch (error) {}
  };

  // const updateAccount = async (id) => {
  //   return new Promise((resolve, reject) => {
  //     const orderRequest = {
  //       isUpdateType: false,
  //       isPayment: false,
  //       isUpdateInfoShip: false,
  //       isUpdateAccount: true,
  //       isUpdateVoucher: false,
  //       isUpdateInfoShipByCustomer: false,
  //       isUpdateNoteShip: false,
  //       isUpdateNameShip: false,
  //       isUpdateAddressShip: false,
  //       isUpdatePhoneShip: false,
  //       isUpdateSdt: false,
  //       isUpdateFullName: false,
  //       isUpdateEmail: false,
  //       account: {
  //         id: id,
  //       },
  //     };
  //
  //     try {
  //       request(`PUT`, `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`, orderRequest)
  //         .then((response) => {
  //           const data = response.data.data;
  //           console.log(data);
  //           setOrder(data);
  //
  //           const account = data && data.account && data.account;
  //           const listAddress = data.account && data.account.diaChiList && data.account.diaChiList;
  //           const addressActive = listAddress && listAddress.find((item) => item.trangThai === 1);
  //
  //           if (account) {
  //             updateInfoShipDefault(addressActive);
  //           } else {
  //             updateInfoShipDefault(null);
  //           }
  //
  //           getAllOrdersPending();
  //           resolve(); // hoặc resolve(data) nếu bạn muốn trả về dữ liệu từ hàm updateAccount
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           reject(error);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //       reject(error);
  //     }
  //   });
  // };
  const updateAccount = async (id) => {
    const orderRequest = {
      isUpdateType: false,
      isPayment: false,
      isUpdateInfoShip: false,
      isUpdateAccount: true,
      isUpdateVoucher: false,
      isUpdateInfoShipByCustomer: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
      account: {
        id: id,
      },
    };

    try {
      await request(
        `PUT`,
        `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
        orderRequest
      ).then(async (response) => {
        const data = response.data.data;
        console.log(data);
        setOrder(data);

        const account = data && data.account && data.account;
        const listAddress =
          data.account && data.account.diaChiList && data.account.diaChiList;
        const addressActive =
          listAddress && listAddress.find((item) => item.trangThai === 1);

        if (addressActive) {
          /* await  */ updateInfoShipDefault(addressActive);
        } else {
          /* await  */ updateInfoShipDefault(null);
        }

        getAllOrdersPending();
        // setIsLoading(false);
        // handleOpenAlertVariant(message, Notistack.SUCCESS);
      });
    } catch (error) {
      console.log(error);
      // Xử lý lỗi tại đây (nếu cần)
    }
  };

  const handleAddOrRemoveVoucher = async (idVoucher, loading, keep) => {
    const message = `${
      idVoucher === null
        ? "Mã giảm giá đã được gỡ bỏ thành công!"
        : "Áp dụng thành công mã giảm giá!"
    }`;
    const orderRequest = {
      voucher: {
        id: idVoucher,
      },
      isUpdateType: false,
      isPayment: false,
      isUpdateAccount: false,
      isUpdateVoucher: true,
      isUpdateInfoShipByCustomer: false,
      isUpdateInfoShip: false,
      isUpdateNoteShip: false,
      isUpdateNameShip: false,
      isUpdateAddressShip: false,
      isUpdatePhoneShip: false,
      isUpdateSdt: false,
      isUpdateFullName: false,
      isUpdateEmail: false,
    };
    if (idVoucher === null && loading) {
      setLoadingChild(true);
      setTimeout(() => {
        try {
          request(
            "PUT",
            `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
            orderRequest
          ).then((response) => {
            setOrder(response.data.data);
            setDiscount("");
            setIdVoucher("");
            setDiscountValue(0);
            setDiscountValidate("");
            getAllOrdersPending();
            handleOpenAlertVariant(message, Notistack.SUCCESS);
            setLoadingChild(false);
          });
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    } else if (idVoucher === null && !loading) {
      try {
        request(
          "PUT",
          `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
          orderRequest
        ).then((response) => {
          setOrder(response.data.data);
          setIdVoucher("");
          if (!keep) {
            setDiscountValue(0);
            setDiscount("");
            setDiscountValidate("");
          }
          getAllOrdersPending();
        });
      } catch (error) {
        console.log(error);
      }
    } else if (idVoucher != null && loading) {
      setLoadingChild(true);
      setTimeout(() => {
        try {
          request(
            "PUT",
            `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
            orderRequest
          ).then((response) => {
            setOrder(response.data.data);
            setDiscount(response.data.data.voucher.ma);
            setIdVoucher(response.data.data.voucher.id);
            setDiscountValue(response.data.data.voucher.giaTriVoucher);
            setDiscountValidate("");
            getAllOrdersPending();
            handleOpenAlertVariant(message, Notistack.SUCCESS);
            setLoadingChild(false);
          });
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    } else {
      try {
        request(
          "PUT",
          `/api/orders/${order.id}?isUpdateStatusOrderDelivery=false`,
          orderRequest
        ).then((response) => {
          setOrder(response.data.data);
          setIdVoucher(response.data.data.voucher.id);
          setDiscount(response.data.data.voucher.ma);
          setDiscountValue(response.data.data.voucher.giaTriVoucher);
          setDiscountValidate("");
          getAllOrdersPending();
          handleOpenAlertVariant(message, Notistack.SUCCESS);
          setLoadingChild(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateAmountCartItem = async (id, imeis) => {
    setIsLoading(true);
    const requestBody = {
      id: id,
      amount: imeis.length,
      imeis: imeis,
      cart: {
        id: cartId,
      },
    };
    try {
      await request("PUT", `/api/carts/amount`, requestBody).then(
        async (response) => {
          await getAllOrdersPending();
          await getCartItems();
          handleCloseOpenModalUpdateImei();
          handleOpenAlertVariant(
            "Cập nhật số lượng thành công!",
            Notistack.SUCCESS
          );
          setChangedCartItems(changedCartItems + 1);
          setIsLoading(false);
        }
      );
    } catch (error) {
      setIsLoading(false);
      handleOpenAlertVariant(error.response.data.message, "warning");
      console.error(error);
    }
  };
  // const handleUpdateAmountCartItem = async (id, imeis) => {
  //   setIsLoading(true);
  //   const request = {
  //     id: id,
  //     amount: imeis.length,
  //     imeis: imeis,
  //     cart: {
  //       id: cartId,
  //     },
  //   };
  //   try {
  //     request("PUT", `/api/carts/amount`, request
  //     ).then(async (response) => {
  //       await getAllOrdersPending();
  //       await getCartItems();
  //       handleCloseOpenModalUpdateImei();
  //       handleOpenAlertVariant(
  //         "Cập nhật số lượng thành công!",
  //         Notistack.SUCCESS
  //       );
  //       setChangedCartItems(changedCartItems + 1);
  //       setIsLoading(false);
  //     })
  //   } catch (error) {
  //     setIsLoading(false);
  //     handleOpenAlertVariant(error.response.data.message, "warning");
  //     console.error("Error");
  //   }
  // };

  const userId = getUser().id;

  const processingPaymentOrder = () => {
    console.log(userId);
    if (cartItems && cartItems.length > 0) {
      const statusOrder = delivery
        ? OrderStatusString.CONFIRMED
        : OrderStatusString.HAD_PAID;
      const typeOrder = delivery
        ? OrderTypeString.DELIVERY
        : OrderTypeString.AT_COUNTER;
      const orderHistoryCounter = [
        {
          stt: 1,
          thaoTac: "Tạo Đơn Hàng",
          loaiThaoTac: 0,
          moTa: "Nhân viên tạo đơn cho khách hàng",
          createdAt: new Date(),
          createdBy: userId,
          hoaDon: {
            id: order.id,
          },
        },
        {
          stt: 2,
          thaoTac: "Thanh Toán Thành Công",
          loaiThaoTac: 6,
          moTa: "Khách hàng đã thanh toán đơn hàng",
          createdAt: new Date(new Date().getTime() - 2000), // Giảm 2 giây so với thời gian hiện tại
          createdBy: userId,
          hoaDon: {
            id: order.id,
          },
        },
      ];
      const orderHistoryDelivery = [
        {
          stt: 1,
          thaoTac: "Đặt Hàng Thành Công",
          loaiThaoTac: 0,
          moTa: "Đơn hàng đã được đặt thành công",
          createdAt: new Date(),
          createdBy: userId,
          hoaDon: {
            id: order.id,
          },
        },
        {
          stt: 2,
          thaoTac: "Chờ Giao Hàng",
          loaiThaoTac: 1,
          moTa: "Thông tin đơn hàng đã được xác nhận bởi nhân viên và đang trong quá trình chờ giao hàng",
          createdAt: new Date(new Date().getTime() - 2000), // Giảm 2 giây so với thời gian hiện tại
          createdBy: userId,
          hoaDon: {
            id: order.id,
          },
        },
      ];
      const data = {
        trangThai: statusOrder,
        loaiHoaDon: typeOrder,
        orderHistories: delivery ? orderHistoryDelivery : orderHistoryCounter,
      };
      paymentOrder(data);
    }
  };

  const getAllOrdersPending = async () => {
    await request("GET", `/api/orders/pending`, {})
      .then(async (response) => {
        const data = response.data.data;
        if (data && data.length === 0) {
          await handleAddOrderPendingDefault();
        } else {
          setOrders(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsFirstGet(false);
      });
  };

  const getOrderPendingDefaultFirst = async () => {
    request("GET", `/api/orders/pending`, {})
      .then((response) => {
        const order = response && response.data.data[0];
        navigate(`/dashboard/point-of-sales/${order.ma}`);
        setValueTabs(1);
        setCartId((response && response.data.data[0].cart.id) || "");

        if (order.loaiHoaDon === OrderTypeString.DELIVERY) {
          setCustomerNameShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.tenNguoiNhan !== null
              ? order.tenNguoiNhan
              : ""
          );
          setCustomerPhoneShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.soDienThoaiNguoiNhan !== null
              ? order.soDienThoaiNguoiNhan
              : ""
          );
          setCustomerAddressShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.diaChiNguoiNhan !== null
              ? order.diaChiNguoiNhan
              : ""
          );
          setCustomerWardShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.xaPhuongNguoiNhan !== null
              ? order.xaPhuongNguoiNhan
              : ""
          );
          setCustomerProvinceShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.tinhThanhPhoNguoiNhan !== null
              ? order.tinhThanhPhoNguoiNhan
              : ""
          );
          setCustomerDistrictShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.quanHuyenNguoiNhan != null
              ? order.quanHuyenNguoiNhan
              : ""
          );
          setCustomerNoteShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.ghiChu != null
              ? order.ghiChu
              : ""
          );
        }
        setEmail(order.email != null ? order.email : "");
        setSdt(order.soDienThoai != null ? order.soDienThoai : "");
        setFullName(order.hoVaTen != null ? order.hoVaTen : "");
        setOrder(order);
        setConfirm(false);
        console.log((order && order.cart.id) || "");
        // setShipFee(response && response.data.data[0].phiShip || 0);
        setDelivery(
          response &&
            response.data.data[0].loaiHoaDon === OrderTypeString.DELIVERY
            ? true
            : false
        );
        setCartItems(response && response.data.data[0].cart.cartItems);
        const account = response && response.data.data[0].account;

        if (account) {
          setIdCustomer(account.id);
          setCustomerName(account.hoVaTen);
          setCustomerPhone(account.soDienThoai);
          setCustomerEmail(account.email);
        }

        if (account && account.diaChiList) {
          setCustomerAddressList(account.diaChiList);
        }

        const payments = order.paymentMethods;
        if (payments.length > 0) {
          setPaymentHistories(payments);

          let total = 0;
          payments.map((item) => {
            total += item.soTienThanhToan;
          });
          setCustomerPayment(total);
          setPaymentWhenReceive(false);
          // if (payments.length === 1) {
          //
          //   payments.map((item) => {
          //     if (item.hinhThucThanhToan === 0 && (item.ma !== null || item.ma !== "")) {
          //       setSelectedValuePaymentMethod("Chuyển khoản");
          //       setHadPaymentBank(true);
          //     }
          //   });
          //
          // }
        } else {
          setPaymentHistories([]);
          setCustomerPayment(0);
          // setSelectedValuePaymentMethod("Tiền mặt");
          // setHadPaymentBank(false);
        }

        setDiscount(
          (response &&
            response.data.data[0].voucher &&
            response.data.data[0].voucher.ma) ||
            ""
        );
        setIdVoucher(
          (response &&
            response.data.data[0].voucher &&
            response.data.data[0].voucher.id) ||
            ""
        );
        setDiscountValue(
          (response &&
            response.data.data[0].voucher &&
            response.data.data[0].voucher.giaTriVoucher) ||
            0
        );
        console.log(order);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsFirstGet(false);
      });
  };

  const getOrderPendingById = async () => {
    request("GET", `/api/orders/pending`, {})
      .then((response) => {
        const data = response && response.data.data;
        const order = data.find((item) => item.ma === id);

        //   if (!order){
        //
        //page
        // }
        //
        //   console.log(valueTabs)

        setCartId((order && order.cart.id) || "");
        const indexTab = data.indexOf(order);
        setValueTabs(indexTab + 1);

        if (order.loaiHoaDon === OrderTypeString.DELIVERY) {
          setCustomerNameShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.tenNguoiNhan !== null
              ? order.tenNguoiNhan
              : ""
          );
          setCustomerPhoneShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.soDienThoaiNguoiNhan !== null
              ? order.soDienThoaiNguoiNhan
              : ""
          );
          setCustomerAddressShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.diaChiNguoiNhan !== null
              ? order.diaChiNguoiNhan
              : ""
          );
          setCustomerWardShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.xaPhuongNguoiNhan !== null
              ? order.xaPhuongNguoiNhan
              : ""
          );
          setCustomerProvinceShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.tinhThanhPhoNguoiNhan !== null
              ? order.tinhThanhPhoNguoiNhan
              : ""
          );
          setCustomerDistrictShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.quanHuyenNguoiNhan != null
              ? order.quanHuyenNguoiNhan
              : ""
          );
          setCustomerNoteShip(
            order.loaiHoaDon === OrderTypeString.DELIVERY &&
              order.ghiChu != null
              ? order.ghiChu
              : ""
          );
        }

        setEmail(order.email != null ? order.email : "");
        setSdt(order.soDienThoai != null ? order.soDienThoai : "");
        setFullName(order.hoVaTen != null ? order.hoVaTen : "");

        console.log((order && order.cart.id) || "");
        setOrder(order);
        // setShipFee(order && order.phiShip || 0);
        setDelivery(
          order && order.loaiHoaDon === OrderTypeString.DELIVERY ? true : false
        );
        setConfirm(false);
        console.log(order && order.loaiHoaDon);
        setCartItems(order && order.cart.cartItems);
        const account = order && order.account;

        if (account) {
          setIdCustomer(account.id);
          setCustomerName(account.hoVaTen);
          setCustomerPhone(account.soDienThoai);
          setCustomerEmail(account.email);
        }

        const payments = order.paymentMethods;
        if (payments.length > 0) {
          setPaymentHistories(payments);

          let total = 0;
          payments.map((item) => {
            total += item.soTienThanhToan;
          });
          setCustomerPayment(total);
          setPaymentWhenReceive(false);

          // if (payments.length === 1) {
          //
          //   payments.map((item) => {
          //     if (item.hinhThucThanhToan === 0 && (item.ma !== null || item.ma !== "")) {
          //       // setSelectedValuePaymentMethod("Chuyển khoản");
          //       setHadPaymentBank(true);
          //     }
          //   });
          //
          // }
        } else {
          setPaymentHistories([]);
          // setHadPaymentBank(false);
          setCustomerPayment(0);
          // setSelectedValuePaymentMethod("Tiền mặt");
        }

        if (account && account.diaChiList && account.diaChiList.length > 0) {
          setCustomerAddressList(account.diaChiList);
        }

        setDiscount((order && order.voucher && order.voucher.ma) || "");
        setIdVoucher((order && order.voucher && order.voucher.id) || "");
        setDiscountValue(
          (order && order.voucher && order.voucher.giaTriVoucher) || 0
        );

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsFirstGet(false);
      });
  };

  const handleRedirectPayment = (url) => {
    window.location.href = url;
  };

  const handleGetUrlRedirectPayment = async (type, total) => {
    setIsLoading(true);
    if (type === "Ví VNPAY") {
      const vnpayReq = {
        total: parseInt(total),
        info: order.ma,
        code: order.ma,
      };
      try {
        request("POST", `/api/vnpay/payment`, vnpayReq).then((response) => {
          setIsLoading(false);
          handleCloseOpenModalConfirmRedirectPayment();
          handleRedirectPayment(response.data.data);
        });
      } catch (error) {
        const message = error.response.data.message;
        setIsLoading(false);
        handleOpenAlertVariant(message, Notistack.ERROR);
        handleCloseOpenModalConfirmRedirectPayment();
        console.log(error.response.data);
      }
    } else {
      const orderRequest = {
        tienKhachTra: total,
        id: order.id,
        hinhThucThanhToan: type,
        createdByPayment: userId,
      };
      try {
        request("PUT", `/api/vnpay/payment/cash`, orderRequest, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          const order = response.data.data;
          setOrder(order);
          setPaymentHistories(order.paymentMethods);
          let total = 0;
          order.paymentMethods.map((item) => {
            total += item.soTienThanhToan;
          });
          setCustomerPayment(total);
          setPaymentWhenReceive(false);
          getAllOrdersPending();
          handleOpenAlertVariant("Xác nhận thành công", Notistack.SUCCESS);
          handleCloseModalpaymentMultipleCounter();
          setIsLoading(false);
        });
      } catch (error) {
        const message = error.response.data.message;
        setIsLoading(false);
        handleOpenAlertVariant(message, Notistack.ERROR);
        console.log(error.response.data);
      }
    }
  };

  const [totalPagesVoucher, setTotalPagesVoucher] = useState();

  const getVouchersIsActive = (page, keyword) => {
    const request = {
      pageNo: page,
      keyword: keyword,
    };
    requestParam("GET", `/voucher/voucherActive`, request)
      .then((response) => {
        setVouchers(response.data.data);
        setTotalPagesVoucher(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [customerPaymentEx, setCustomerPaymentEx] = useState(0);

  useEffect(() => {
    // const valueFinal = String(handleCountTotalMoneyCustomerNeedPay())
    //   .replace(/[^0-9]+/g, "")
    //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // setCustomerPaymentFormat(valueFinal);
    // setCustomerPayment(handleCountTotalMoneyCustomerNeedPay());
    //
    // if (handleCountTotalMoneyCustomerNeedPay() === 0) {
    //   setCustomerPaymentFormat("");
    // }
  }, [cartItems, discountValue, shipFee]);

  const getCartItems = async () => {
    await request("GET", `/api/orders/pending/${order.id}`)
      .then((response) => {
        const data = response.data.data;
        setOrder(data);
        setCartItems(data.cart.cartItems);

        // let total = 0 - discountValue;
        // data && data.cart.cartItems.map((item) => {
        //   total += item.donGia * item.soLuong;
        // });
        // let result = "";
        // result = String(total)
        //   .replace(/[^0-9]+/g, "")
        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // setCustomerPaymentFormat(result);
        // setCustomerPayment(total);

        setChangedCartItems(changedCartItems + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPaymentsOfOrder = async () => {
    await request("GET", `/api/orders/pending/${order.id}`)
      .then((response) => {
        const data = response.data.data;
        setOrder(data);
        setPaymentHistories(data.paymentMethods);
        let total = 0;
        data.paymentMethods.map((item) => {
          total += item.soTienThanhToan;
        });
        setCustomerPayment(total);

        if (data.paymentHistories && data.paymentHistories.length > 0) {
          setPaymentWhenReceive(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getOrderPendingLastRemove = async () => {
    // setIsLoading(true);
    await request("GET", `/api/orders/pending`, {})
      .then((response) => {
        const orders = response.data.data;
        setOrders(orders);
        const lastOrder = orders[orders.length - 1];
        setOrder(lastOrder);
        navigate(`/dashboard/point-of-sales/${lastOrder.ma}`);
        setCartId(lastOrder.cart.id);
        // setShipFee(lastOrder.shipFee || 0);
        setCartItems(lastOrder.cart.cartItems);

        const payments = lastOrder.paymentMethods;
        if (payments.length > 0) {
          setPaymentHistories(payments);

          let total = 0;
          payments.map((item) => {
            total += item.soTienThanhToan;
          });
          setCustomerPayment(total);
          setPaymentWhenReceive(false);
          // if (payments.length === 1) {
          //
          //   payments.map((item) => {
          //     if (item.hinhThucThanhToan === 0 && (item.ma !== null || item.ma !== "")) {
          //       setSelectedValuePaymentMethod("Chuyển khoản");
          //       setHadPaymentBank(true);
          //     }
          //   });
          //
          // }
        } else {
          setPaymentHistories([]);
          setCustomerPayment(0);
          // setSelectedValuePaymentMethod("Tiền mặt");
          // setHadPaymentBank(false);
        }

        setConfirm(false);
        setCustomerNameShip(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY &&
            lastOrder.tenNguoiNhan !== null
            ? lastOrder.tenNguoiNhan
            : ""
        );
        setCustomerPhoneShip(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY &&
            lastOrder.soDienThoaiNguoiNhan !== null
            ? lastOrder.soDienThoaiNguoiNhan
            : ""
        );
        setCustomerAddressShip(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY &&
            lastOrder.diaChiNguoiNhan !== null
            ? lastOrder.diaChiNguoiNhan
            : ""
        );
        setCustomerWardShip(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY &&
            lastOrder.xaPhuongNguoiNhan !== null
            ? lastOrder.xaPhuongNguoiNhan
            : ""
        );
        setCustomerProvinceShip(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY &&
            lastOrder.tinhThanhPhoNguoiNhan !== null
            ? lastOrder.tinhThanhPhoNguoiNhan
            : ""
        );
        setCustomerDistrictShip(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY &&
            lastOrder.quanHuyenNguoiNhan != null
            ? lastOrder.quanHuyenNguoiNhan
            : ""
        );
        setCustomerNoteShip(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY &&
            lastOrder.ghiChu != null
            ? lastOrder.ghiChu
            : ""
        );
        setEmail(lastOrder.email != null ? lastOrder.email : "");
        setSdt(lastOrder.soDienThoai != null ? lastOrder.soDienThoai : "");
        setFullName(lastOrder.hoVaTen != null ? lastOrder.hoVaTen : "");

        setDelivery(
          lastOrder.loaiHoaDon === OrderTypeString.DELIVERY ? true : false
        );
        // setPaymentWhenReceive(order.loaiHoaDon === OrderTypeString.DELIVERY ? true : false);
        if (lastOrder.voucher != null) {
          setDiscount(lastOrder.voucher.ma);
          setIdVoucher(lastOrder.voucher.id);
          setDiscountValue(lastOrder.voucher.giaTriVoucher);
        } else {
          setDiscount("");
          setIdVoucher("");
          setDiscountValue(0);
        }
        if (lastOrder.account != null) {
          setIdCustomer(lastOrder.account.id);
          setCustomerName(lastOrder.account.hoVaTen);
          setCustomerPhone(lastOrder.account.soDienThoai);
          setCustomerEmail(lastOrder.account.email);
          setCustomerAddressList(lastOrder.account.diaChiList);
        } else {
          setIdCustomer("");
          setCustomerName("");
          setCustomerPhone("");
          setCustomerEmail("");
          setCustomerAddressList([]);
        }
        setValueTabs(orders.length);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleAddOrderPendingDefault = async () => {
    setIsLoading(true);
    const data = {
      id: order.id,
    };
    try {
      await request("POST", `/api/orders?isPending=true`, data).then(
        async (response) => {
          await getAllOrdersPending();
          setValueTabs(1);
          setOrder(response.data.data);
          navigate(`/dashboard/point-of-sales/${response.data.data.ma}`);
          setCartId(response.data.data.cart.id);
          setDelivery(false);
          setPaymentWhenReceive(false);
          setCartItems([]);
          setPaymentHistories([]);
          setCustomerPayment(0);
          setShipFee(0);
          setDiscount("");
          setIdVoucher("");
          setConfirm(false);
          setDiscountValue(0);
          setIdCustomer("");
          setCustomerName("");
          setCustomerPhone("");
          setCustomerEmail("");
          setCustomerAddressList([]);
          setCustomerNameShip("");
          setCustomerPhoneShip("");
          setCustomerAddressShip("");
          setCustomerWardShip("");
          setCustomerProvinceShip("");
          setCustomerDistrictShip("");
          setCustomerNoteShip("");

          setFullName("");
          setEmail("");
          setSdt("");
          setIsLoading(false);
        }
      );
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, "warning");
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleAddOrderPending = async () => {
    setIsLoading(true);
    const data = {
      id: order.id,
    };
    try {
      const response = await request(
        "POST",
        `/api/orders?isPending=true`,
        data
      ).then(async (response) => {
        await getAllOrdersPending();
        setValueTabs(orders.length + 1);
        setOrder(response.data.data);
        navigate(`/dashboard/point-of-sales/${response.data.data.ma}`);
        setCartId(response.data.data.cart.id);
        setDelivery(false);
        setPaymentWhenReceive(false);
        setCartItems([]);
        setPaymentHistories([]);
        setCustomerPayment(0);
        // setSelectedValuePaymentMethod("Tiền mặt");
        // setHadPaymentBank(false);
        setShipFee(0);
        setDiscount("");
        setIdVoucher("");
        setConfirm(false);
        setDiscountValue(0);
        setIdCustomer("");
        setCustomerName("");
        setCustomerPhone("");
        setCustomerEmail("");
        setCustomerAddressList([]);
        setCustomerNameShip("");
        setCustomerPhoneShip("");
        setCustomerAddressShip("");
        setCustomerWardShip("");
        setCustomerProvinceShip("");
        setCustomerDistrictShip("");
        setCustomerNoteShip("");

        setFullName("");
        setEmail("");
        setSdt("");
        setIsLoading(false);
      });
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, "warning");
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleDeletePaymentById = async (id) => {
    setIsLoading(true);
    try {
      await request(
        "DELETE",
        `/api/payment/${id}?orderId=${order.id}`,
        {}
      ).then(async (response) => {
        await getPaymentsOfOrder();
        await getAllOrdersPending();
        setIsLoading(false);
        handleOpenAlertVariant("Xóa thành công!", Notistack.SUCCESS);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteCartItemById = async (id) => {
    setIsLoading(true);
    try {
      await request("DELETE", `/api/carts/${id}`).then(async (response) => {
        await getCartItems();
        await getAllOrdersPending();
        setIsLoading(false);
        setChangedCartItems(changedCartItems + 1);
        handleOpenAlertVariant(
          "Xóa thành công sản phẩm khỏi giỏ hàng!",
          Notistack.SUCCESS
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrderPendingById = async (id) => {
    const getOrder = orders.find((item) => item.id === id);
    if (
      getOrder &&
      getOrder.paymentMethods &&
      getOrder.paymentMethods.length > 0
    ) {
      handleOpenAlertVariant(
        "Không cho phép xóa đơn hàng đã thanh toán!",
        Notistack.ERROR
      );
    } else {
      setIsLoading(true);
      try {
        await request("DELETE", `/api/orders/${id}`).then(async (response) => {
          await getOrderPendingLastRemove();
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setSizeCartItems(0);
      }
    }
  };

  const handleConfirmBeforeDeleteOrderPendingHasProduct = (size, id) => {
    if (size == 0) {
      handleDeleteOrderPendingById(id);
    } else {
      handleOpenDialogOrderClose();
    }
  };

  const getOrderPendingByTabIndex = (index) => {
    const order = orders[index - 1];
    navigate(`/dashboard/point-of-sales/${order.ma}`);
    setOrder(order);
    setCartId(order.cart.id);
    setCartItems(order.cart.cartItems);

    setCustomerNameShip(
      order.loaiHoaDon === OrderTypeString.DELIVERY &&
        order.tenNguoiNhan !== null
        ? order.tenNguoiNhan
        : ""
    );
    setCustomerPhoneShip(
      order.loaiHoaDon === OrderTypeString.DELIVERY &&
        order.soDienThoaiNguoiNhan !== null
        ? order.soDienThoaiNguoiNhan
        : ""
    );
    setCustomerAddressShip(
      order.loaiHoaDon === OrderTypeString.DELIVERY &&
        order.diaChiNguoiNhan !== null
        ? order.diaChiNguoiNhan
        : ""
    );
    setCustomerWardShip(
      order.loaiHoaDon === OrderTypeString.DELIVERY &&
        order.xaPhuongNguoiNhan !== null
        ? order.xaPhuongNguoiNhan
        : ""
    );
    setCustomerProvinceShip(
      order.loaiHoaDon === OrderTypeString.DELIVERY &&
        order.tinhThanhPhoNguoiNhan !== null
        ? order.tinhThanhPhoNguoiNhan
        : ""
    );
    setCustomerDistrictShip(
      order.loaiHoaDon === OrderTypeString.DELIVERY &&
        order.quanHuyenNguoiNhan != null
        ? order.quanHuyenNguoiNhan
        : ""
    );
    setCustomerNoteShip(
      order.loaiHoaDon === OrderTypeString.DELIVERY && order.ghiChu != null
        ? order.ghiChu
        : ""
    );

    setEmail(order.email != null ? order.email : "");
    setSdt(order.soDienThoai != null ? order.soDienThoai : "");
    setFullName(order.hoVaTen != null ? order.hoVaTen : "");

    setConfirm(false);
    const payments = order.paymentMethods;
    if (payments.length > 0) {
      setPaymentHistories(payments);
      let total = 0;
      payments.map((item) => {
        total += item.soTienThanhToan;
      });
      setCustomerPayment(total);
      setPaymentWhenReceive(false);

      // if (payments.length === 1) {
      //   payments.map((item) => {
      //     if (item.hinhThucThanhToan === 0 && (item.ma !== null || item.ma !== "")) {
      //       setSelectedValuePaymentMethod("Chuyển khoản");
      //       setHadPaymentBank(true);
      //       setDelivery(false);
      //       // setShipFee(0);
      //     }
      //   });
      //
      // }
    } else {
      setPaymentHistories([]);
      // setSelectedValuePaymentMethod("Tiền mặt");
      // setHadPaymentBank(false);
      setCustomerPayment(0);
    }

    setDelivery(order.loaiHoaDon === OrderTypeString.DELIVERY ? true : false);
    console.log(order.loaiHoaDon);
    // setPaymentWhenReceive(order.loaiHoaDon === OrderTypeString.DELIVERY ? true : false);
    // if (order.loaiHoaDon === OrderTypeString.DELIVERY) {
    //   setShipFee(order.phiShip || 0);
    // }
    if (order && order.voucher) {
      setIdVoucher(order && order.voucher && order.voucher.id);
      setDiscount(order && order.voucher && order.voucher.ma);
      setDiscountValue(order && order.voucher && order.voucher.giaTriVoucher);
    } else {
      setIdVoucher("");
      setDiscount("");
      setDiscountValue(0);
    }
    if (order && order.account) {
      setIdCustomer(order.account.id);
      setCustomerName(order.account.hoVaTen);
      setCustomerPhone(order.account.soDienThoai);
      setCustomerEmail(order.account.email);
      setCustomerAddressList(order.account.diaChiList);
    } else {
      setIdCustomer("");
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setCustomerAddressList([]);
    }
    setDiscountValidate("");
  };

  const [totalPagesCustomer, setTotalPagesCustomer] = useState();
  const getAllCustomers = (page, keyword) => {
    request("GET", `/khach-hang/hien-thi`, {
      params: {
        pageNo: page,
        keyword: keyword,
      },
    })
      .then((response) => {
        setCustomers(response.data.data);
        setTotalPagesCustomer(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error");
      });
  };

  const handleCheckVoucher = (value) => {
    setLoadingChild(true);
    setTimeout(() => {
      requestParam("GET", `/voucher/findVoucher`, {
        input: value,
        tongTien: handleCountTotalMoney(),
      })
        .then((response) => {
          setDiscountValidate("");
          if (response.data.data.status === true) {
            handleAddOrRemoveVoucher(response.data.data.voucher.id, false);
            setDiscountValidate("");
          }
          if (response.data.data.status === null) {
            setDiscountValidate(response.data.data.message);
            if (discountValue != 0) {
              setDiscountValue(0);
              handleAddOrRemoveVoucher(null, false, true);
            }
          }
          setLoadingChild(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  };

  const handleCountTotalSurplus = () => {
    let total = 0;
    cartItems &&
      cartItems.map((item) => {
        if (
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== null &&
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0
        ) {
          total += item.sanPhamChiTiet.donGiaSauKhuyenMai * item.soLuong;
        } else {
          total += item.donGia * item.soLuong;
        }
      });
    const result = customerPayment - (total + shipFee - discountValue || 0);
    return result;
  };
  const handleCountTotalSurplusFormat = () => {
    let total = 0;
    cartItems &&
      cartItems.map((item) => {
        if (
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== null &&
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0
        ) {
          total += item.sanPhamChiTiet.donGiaSauKhuyenMai * item.soLuong;
        } else {
          total += item.donGia * item.soLuong;
        }
      });
    const surplus = customerPayment - (total + shipFee - discountValue || 0);
    const result = surplus.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return result;
  };
  const handleCountTotalMoney = () => {
    let total = 0;
    cartItems &&
      cartItems.map((item) => {
        if (
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== null &&
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0
        ) {
          total += item.sanPhamChiTiet.donGiaSauKhuyenMai * item.soLuong;
        } else {
          total += item.donGia * item.soLuong;
        }
      });
    return total;
  };
  const handleCountTotalMoneyFormat = () => {
    let total = 0;
    cartItems &&
      cartItems.map((item) => {
        if (
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== null &&
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0
        ) {
          total += item.sanPhamChiTiet.donGiaSauKhuyenMai * item.soLuong;
        } else {
          total += item.donGia * item.soLuong;
        }
      });
    const result = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return result;
  };
  const handleCountTotalMoneyCustomerNeedPay = () => {
    let total = 0;
    cartItems &&
      cartItems.map((item) => {
        if (
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== null &&
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0
        ) {
          total += item.sanPhamChiTiet.donGiaSauKhuyenMai * item.soLuong;
        } else {
          total += item.donGia * item.soLuong;
        }
      });
    const result = total + shipFee - (discountValue || 0);
    return result;
  };
  const handleCountTotalMoneyCustomerNeedPayFormat = () => {
    let result = "";
    let total = 0;
    cartItems &&
      cartItems.map((item) => {
        if (
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== null &&
          item.sanPhamChiTiet.donGiaSauKhuyenMai !== 0
        ) {
          total += item.sanPhamChiTiet.donGiaSauKhuyenMai * item.soLuong;
        } else {
          total += item.donGia * item.soLuong;
        }
      });
    let totalFinal = total + shipFee - (discountValue || 0);
    result = totalFinal.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return result;
  };

  const handleChangeDiscount = (event) => {
    setDiscountValidate("");
    const value = event.target.value;
    setDiscount(value);
    if (value === null || value === "" || value.trim().length === 0) {
      setDiscount("");
      setDiscountValidate("");
    } else if (value.trim().length === 10) {
      handleCheckVoucher(value);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllOrdersPending();
    if (id) {
      getOrderPendingById(id);
    } else {
      getOrderPendingDefaultFirst();
    }
    getAllCustomers();
    getVouchersIsActive();
  }, []);

  const [openModalConfirmRedirectPayment, setOpenModalConfirmRedirectPayment] =
    useState(false);
  const [openModalPaymentMultipleCounter, setOpenModalPaymentMultipleCounter] =
    useState(false);

  const handleCloseModalpaymentMultipleCounter = () => {
    setOpenModalPaymentMultipleCounter(false);
  };

  const handleOpenModalConfirmRedirectPayment = () => {
    setOpenModalConfirmRedirectPayment(true);
  };

  const handleCloseOpenModalConfirmRedirectPayment = () => {
    setOpenModalConfirmRedirectPayment(false);
  };

  const [openModalUpdateImei, setOpenModalUpdateImei] = useState(false);
  const handleOpenModalUpdateImei = () => {
    setOpenModalUpdateImei(true);
  };
  const handleCloseOpenModalUpdateImei = () => {
    setOpenModalUpdateImei(false);
  };
  const [openModalImei, setOpenModalImei] = useState(false);
  const handleOpenModalImei = () => {
    setOpenModalImei(true);
  };
  const handleCloseOpenModalImei = () => {
    setOpenModalImei(false);
  };

  const [openProducts, setOpenProducts] = useState(false);
  const [openProductDetails, setOpenProductDetails] = useState(false);

  const handleOpenDialogProductDetails = () => {
    setOpenProductDetails(true);
  };

  const handleCloseNoActionDialogProductDetails = () => {
    setOpenProductDetails(false);
  };

  const handleCloseDialogProductDetails = () => {
    setCount(1);
    setOpenProductDetails(false);
  };

  const handleOpenDialogProducts = () => {
    setOpenProducts(true);
    setIsOpen(true);
  };

  const handleCloseDialogProducts = () => {
    setOpenProducts(false);
    setIsOpen(false);
  };
  const handleCloseNoActionDialogProducts = () => {
    setOpenProducts(false);
  };
  const [count, setCount] = useState(1);
  const handleChangeCount = (value) => {
    let newValue = value;
    // newValue = newValue > 4 ? 4 : newValue;
    // newValue = newValue < 1 ? 1 : newValue;
    setCount(newValue);
  };

  const handleClickCount1 = () => {
    // if (count == 1) {
    //   handleOpenAlertVariant("Tối thiểu 1 sản phẩm!", Notistack.ERROR);
    // }
    // else {
    setCount(count - 1);
    // }
  };
  const handleClickCount = () => {
    // if (count == 4) {
    //   handleOpenAlertVariant("Tối đa 4 sản phẩm!", Notistack.ERROR);
    // }
    // else {
    setCount(count + 1);
    // }
  };

  const addCartItemsToCartByScanner = async (imei) => {
    setIsLoading(true);
    const data = {
      amount: 1,
      cart: {
        id: cartId,
      },
      imei: imei,
    };
    try {
      await request("PUT", `/api/carts/scanner`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        await getAllOrdersPending();
        await getCartItems();
        handleCloseOpenScanner();
        handleOpenAlertVariant(
          "Thêm vào giỏ hàng thành công ",
          Notistack.SUCCESS
        );
        setIsLoading(false);
        setIsOpen(false);
      });
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, "warning");
      handleCloseOpenScanner();
      setIsLoading(false);
      // setIsOpen(false);
    }
  };

  const addCartItemsToCart = async (cartItems) => {
    console.log(cartId);
    setIsLoading(true);
    const data = {
      amount: cartItems.amount,
      price: cartItems.price,
      cart: {
        id: cartItems.cartId,
      },
      productItem: {
        id: cartItems.productId,
      },
      imeis: cartItems.imeis,
    };
    console.log(data);
    try {
      await request("PUT", `/api/carts`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        await getAllOrdersPending();
        await getCartItems();
        handleCloseOpenModalImei();
        handleCloseDialogProducts();
        handleOpenAlertVariant(
          "Thêm vào giỏ hàng thành công ",
          Notistack.SUCCESS
        );
        setIsLoading(false);
        setIsOpen(false);
      });
    } catch (error) {
      handleOpenAlertVariant(error.response.data.message, "warning");
      setIsLoading(false);
      // setIsOpen(false);
    }
  };
  const handleAddProductToCart = (price, id, imeis) => {
    const amount = imeis && imeis.length;
    const cartItems = {
      amount: amount,
      price: price,
      cartId: cartId,
      productId: id,
      imeis: imeis,
    };
    if (imeis.length > 0) {
      addCartItemsToCart(cartItems);
    }
  };

  const handleDeliveryChange = (event) => {
    updateTypeOrder(event.target.checked);
    // setDelivery(event.target.checked);
    // if (event.target.checked == true) {
    //   // setPaymentWhenReceive(true);
    // }
    // else {
    // setSelectedValuePaymentMethod("Tiền mặt");
    // setCustomerNameShip("");
    // setCustomerPhoneShip("");
    // setCustomerAddressShip("");
    // setCustomerWardShip("");
    // setCustomerProvinceShip("");
    // setCustomerDistrictShip("");
    // setCustomerNoteShip("");
    //   // setPaymentWhenReceive(false);
    // }
  };

  const handlePaymentWhenReceiveChange = (event) => {
    setPaymentWhenReceive(event.target.checked);
  };

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
    } else if (parseNumberPayment > 100000000000) {
      setCustomerPayment(0);
      setCustomerPaymentFormat("");
    }
  };

  const [openAddresses, setOpenAddresses] = useState();
  const [openCustomers, setOpenCustomers] = useState();
  const [openVouchers, setOpenVouchers] = useState();
  const [openPayments, setOpenPayments] = useState(false);
  const [openOrderClose, setOpenOrderClose] = useState();

  const handleCloseOpenPayment = () => {
    setOpenPayments(false);
  };

  const handleOpenDialogAddresses = () => {
    setIsOpen(true);
    setOpenAddresses(true);
  };

  const handleCloseDialogAddresses = () => {
    setOpenAddresses(false);
    setIsOpen(false);
  };

  const handleOpenDialogOrderClose = () => {
    setOpenOrderClose(true);
  };

  const handleCloseNoActionDialogOrderClose = () => {
    setOpenOrderClose(false);
    setSizeCartItems(0);
  };
  const handleCloseDialogOrderClose = (id) => {
    handleDeleteOrderPendingById(id);
    setOpenOrderClose(false);
  };

  const handleOpenDialogVouchers = () => {
    getVouchersIsActive();
    setOpenVouchers(true);
    setIsOpen(true);
    setCurrentPage(1);
  };

  const handleCloseNoActionDialogVouchers = () => {
    setOpenVouchers(false);
    setIsOpen(false);
  };

  const handleCloseDialogVouchers = () => {
    setOpenVouchers(false);
    setIsOpen(false);
  };
  const handleOpenDialogCustomers = () => {
    setOpenCustomers(true);
    setIsOpen(true);
  };

  const handleCloseDialogCustomers = () => {
    setOpenCustomers(false);
    setIsOpen(false);
  };

  // const [receiveName, setReceiveName] = useState("");
  // const handleChangeReceiveName = (event) => {
  //   const value = event.target.value;
  //   setReceiveName(value);
  // };

  const [valueTabs, setValueTabs] = React.useState();
  const [itemMa, setItemMa] = React.useState("");
  const [itemId, setItemId] = React.useState("");

  const handleChange = (event, newValue) => {
    // setIsLoading(true);
    setValueTabs(newValue);
    getOrderPendingByTabIndex(newValue);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 500);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -4,
      top: 1,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#2f80ed",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#2f80ed",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7",
      },
      "&:hover fieldset": {
        borderColor: "#E0E3E7", // use the same color as original border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2f80ed",
      },
    },
  });

  return (
    <>
      <div style={{ pointerEvents: isLoading ? "none" : "auto" }}>
        <div
          className="mt-4 tab-order-pending p-3"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "7px 7px 0px 0px",
            boxShadow: "0 0.1rem 0.3rem #00000020",
          }}
        >
          <TabContext value={valueTabs}>
            <div className="" style={{}}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <div
                  className="d-flex"
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "99%",
                  }}
                >
                  <TabList
                    style={{}}
                    variant="scrollable"
                    TabIndicatorProps={{
                      title: "indicator",
                      sx: { backgroundColor: "#0B6BCB", height: 4 }, //width: "25% !important"
                    }}
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.35 },
                      },
                    }}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {orders &&
                      orders.map((item, index) => {
                        return (
                          <Tab
                            sx={{ height: "20px" }}
                            style={{
                              borderRadius: "7px 7px 0 0",
                              color: "black",
                            }}
                            label={
                              <div className="d-flex" style={{}}>
                                <span
                                  className="active"
                                  style={{
                                    fontWeight: "",
                                    fontSize: "15px",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  HD000{item.ma.substring(10)}
                                </span>
                                <StyledBadge
                                  showZero={true}
                                  className="ms-2"
                                  badgeContent={
                                    item &&
                                    item.cart &&
                                    item.cart.cartItems &&
                                    item.cart.cartItems.length
                                  }
                                  color="primary"
                                >
                                  <img
                                    style={{ width: "15px", height: "19px" }}
                                    src="https://www.svgrepo.com/show/224235/shopping-cart.svg"
                                  />
                                </StyledBadge>
                                <div className="ms-1"></div>
                                {orders && orders.length > 1 ? (
                                  <>
                                    <div
                                      onClick={(event) => {
                                        event.stopPropagation();
                                      }}
                                      onMouseDown={() => {
                                        handleConfirmBeforeDeleteOrderPendingHasProduct(
                                          item &&
                                            item.cart &&
                                            item.cart.cartItems &&
                                            item.cart.cartItems.length,
                                          item.id
                                        );
                                        setItemMa(item.ma);
                                        setItemId(item.id);
                                        setSizeCartItems(
                                          item.cart.cartItems.length || 0
                                        );
                                      }}
                                      className="ms-2 ps-1 iconButton"
                                      style={{ position: "relative" }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          position: "absolute",
                                          bottom: "-5px",
                                        }}
                                      >
                                        <Tooltip
                                          title="Đóng"
                                          TransitionComponent={Zoom}
                                        >
                                          <IconButton
                                            aria-label="delete"
                                            size="small"
                                            className=""
                                          >
                                            <CloseIcon
                                              className="text-dark"
                                              fontSize="inherit"
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                    </div>
                                    <div className="ms-3 ps-1"></div>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            }
                            value={index + 1}
                          />
                        );
                      })}
                  </TabList>
                  <div style={{ cursor: "pointer" }} className="mt-1">
                    <div
                      onClick={() => handleAddOrderPending()}
                      className="ms-2 ps-1"
                      style={{}}
                    >
                      <Tooltip title="Thêm mới" TransitionComponent={Zoom}>
                        <IconButton aria-label="delete" size="medium">
                          <AddCircleOutlineIcon
                            className="text-dark"
                            fontSize="inherit"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Box>
              <div
                style={
                  {
                    /* opacity: hadPaymentBank ? "0.8" : "1", pointerEvents: hadPaymentBank ? "none" : "auto" */
                  }
                } /* className='scroll-container3' */ /* style={{ width: "100.6%" }} */
              >
                <TabPanel
                  className=""
                  sx={{ margin: 0.1, padding: 0 }}
                  value={valueTabs}
                >
                  {/*
                   */}
                  <TabItem
                    scanner={addCartItemsToCartByScanner}
                    openScanner={openScanner}
                    closeScanner={handleCloseOpenScanner}
                    onOpenScanner={handleOpenScanner}
                    openUpdateImei={openModalUpdateImei}
                    onOpenUpdateImei={handleOpenModalUpdateImei}
                    onCloseUpdateImei={handleCloseOpenModalUpdateImei}
                    openImei={openModalImei}
                    onOpenImei={handleOpenModalImei}
                    onCloseImei={handleCloseOpenModalImei}
                    // getCustomer={getCustomer}
                    // getAmount={getAmount}
                    isOpen={isOpen}
                    openProducts={openProducts}
                    openDialogProducts={handleOpenDialogProducts}
                    closeDialogProducts={handleCloseDialogProducts}
                    closeNoActionDialogProducts={
                      handleCloseNoActionDialogProducts
                    }
                    // openProductDetails={openProductDetails}
                    // openDialogProductDetails={handleOpenDialogProductDetails}
                    // closeDialogProductDetails={handleCloseDialogProductDetails}
                    // closeNoActionDialogProductDetails={handleCloseNoActionDialogProductDetails}
                    add={handleAddProductToCart}
                    remove={handleDeleteCartItemById}
                    // delivery={delivery}
                    cartItems={cartItems}
                    update={handleUpdateAmountCartItem}
                  />
                </TabPanel>
              </div>
            </div>
          </TabContext>
        </div>
        <div
          className="mt-4 customer-order p-3"
          style={{
            backgroundColor: "#ffffff",
            /* borderRadius: "15px 15px 0px 0px", */ boxShadow:
              "0 0.1rem 0.3rem #00000020",
          }}
        >
          <div className="d-flex justify-content-between mt-1" ref={divRef1}>
            <div className="ms-2 d-flex" style={{ marginTop: "5px" }}>
              <span
                className=""
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                Khách hàng
              </span>
              {idCustomer !== "" && (
                <div className="ms-2" style={{ marginTop: "3px" }}>
                  <Tooltip title="Bỏ chọn" TransitionComponent={Zoom}>
                    <IconButton
                      onClick={() => {
                        getCustomerById(null);
                      }}
                      aria-label="delete"
                      size="small"
                      className=""
                    >
                      <HighlightOffOutlinedIcon
                        className="text-dark"
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="">
              <Button
                onClick={() => {
                  handleOpenDialogCustomers();
                }}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500" }}
                >
                  Chọn khách hàng
                </span>
              </Button>
            </div>
          </div>
          <div
            className="mt-2"
            style={{
              borderBottom: "2px solid #C7C7C7",
              width: "100%",
              borderWidth: "2px",
            }}
          ></div>
          {order.account ? (
            <>
              <div className="d-flex ms-2 mt-4 account">
                <div className="d-flex">
                  <div
                    className=""
                    style={{ marginTop: "5px", width: "200px", height: "35px" }}
                  >
                    Tên khách hàng
                  </div>
                  <span className="text-dark ms-1" style={{ marginTop: "5px" }}>
                    {!isLoading && customerName}
                  </span>
                </div>

                <div
                  className=" d-flex"
                  style={{ marginLeft: "300px", marginTop: "5px" }}
                >
                  <div className="" style={{ width: "130px" }}>
                    Email
                  </div>
                  <div style={{}}>
                    <span className="text-dark" style={{}}>
                      {!isLoading && customerEmail}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex ms-2 mt-2">
                <div className="" style={{ width: "200px" }}>
                  Số điện thoại
                </div>
                <div style={{}}>
                  <span className="text-dark ms-1" style={{}}>
                    {!isLoading && customerPhone}
                  </span>
                </div>
              </div>
              <div className="mt-2"></div>
            </>
          ) : (
            <>
              <div className="d-flex ms-2 mt-4 account">
                <div className="d-flex" style={{ width: "400px" }}>
                  <TextFieldFullName
                    confirm={confirm}
                    fullNameDefault={fullName}
                    getFullName={getFullName}
                    update={updateFullName}
                  />
                </div>
              </div>
              <div className="d-flex ms-2 mt-3">
                <div className="" style={{ width: "400px" }}>
                  <TextFieldSdt
                    sdtDefault={sdt}
                    confirm={confirm}
                    getSdt={getSdt}
                    update={updateSdt}
                  />
                </div>
              </div>
              <div className="mt-2"></div>
            </>
          )}
        </div>
        <div
          className="mt-4 p-3"
          style={{
            height: "auto",
            /* margin: "auto", */ backgroundColor: "#ffffff",
            width: "",
            /* borderRadius: "15px 15px 0px 0px", */ boxShadow:
              "0 0.1rem 0.3rem #00000030",
          }}
        >
          <div className="d-flex justify-content-between mt-1">
            <div className="ms-2" style={{ marginTop: "5px" }}>
              <span
                className=""
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                Thông tin đơn hàng
              </span>
            </div>
            <div className="d-flex">
              <div className={"me-2"}>
                <BoxJoy
                  sx={{
                    display: "flex",
                    gap: 1,
                    width: 160,
                    "& > div": { p: 1, borderRadius: "md", display: "flex" },
                  }}
                >
                  <Sheet variant="outlined" color="primary">
                    <Checkbox
                      overlay
                      checked={delivery}
                      onChange={handleDeliveryChange}
                      label={
                        <span style={{ fontSize: "16.5px", fontWeight: "400" }}>
                          Bán Giao Hàng
                        </span>
                      }
                    />
                  </Sheet>
                </BoxJoy>
              </div>
              {idCustomer !== "" && delivery && (
                <Button
                  onClick={() => {
                    handleOpenDialogAddresses();
                  }}
                  className="rounded-2 ant-btn-light me-2"
                  style={{ height: "38px", width: "auto", fontSize: "15px" }}
                >
                  <span
                    className=""
                    style={{ marginBottom: "2px", fontWeight: "500" }}
                  >
                    Chọn địa chỉ giao hàng
                  </span>
                </Button>
              )}
              <Button
                onClick={() => {
                  setOpenModalPaymentMultipleCounter(true);
                }}
                className="rounded-2 ant-btn-light"
                style={{ height: "38px", width: "auto", fontSize: "15px" }}
              >
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500" }}
                >
                  Tiến hành thanh toán
                </span>
              </Button>
              {/*
      <Sheet variant="outlined">
        <Checkbox
          label="Bán Giao Hàng"
          overlay
          // Force the outline to appear in the demo. Usually, you don't need this in your project.
          slotProps={{ action: { className: checkboxClasses.focusVisible } }}
        />
      </Sheet>
            <FormControlLabel
              checked={delivery}
              onChange={handleDeliveryChange}
              control={<IOSSwitch sx={{ m: 1 }} />}
              label={
                <span className='ms-1' style={{ fontSize: "16px" }}>Bán Giao Hàng
                </span>
              }
            />
*/}
            </div>
          </div>
          <div
            className="mt-2"
            style={{
              borderBottom: "2px solid #C7C7C7",
              width: "100%",
              borderWidth: "2px",
            }}
          ></div>
          <div className="d-flex justify-content-between">
            <div className="" style={{}} ref={divRef2}>
              <DeliveryInfoShip
                confirm={confirm}
                delivery={delivery}
                getShipFee={getShipFee}
                update={updateInfoShipOrder}
                loading={isLoading}
                customerNameShip={customerNameShip}
                customerAddressShip={customerAddressShip}
                customerPhoneShip={customerPhoneShip}
                customerProvinceShip={customerProvinceShip}
                customerDistrictShip={customerDistrictShip}
                customerNoteShip={customerNoteShip}
                customerWardShip={customerWardShip}
                getNameShip={getNameShip}
                getWardShip={getWardShip}
                getAddressShip={getAddressShip}
                getPhoneShip={getPhoneShip}
                getDistrictShip={getDistrictShip}
                getProvinceShip={getProvinceShip}
                getNoteShip={getNoteShip}
                isShow={isShow}
                getIsShow={getIsShow}
                updateName={updateNameShipOrder}
                updateNote={updateNoteShipOrder}
                updatePhone={updatePhoneShipOrder}
                updateAddress={updateAddressShipOrder}
              />
              <div className="mt-3"></div>
            </div>
            <div className="" style={{}}>
              <div className="mt-2">
                <div style={{ height: "480px", width: "380px" }}>
                  <div className="ms-2 ps-1 mt-3 pt-1">
                    <>
                      <div
                        className="d-flex mt-3"
                        style={{ position: "relative" }}
                      >
                        <TextField
                          size="small"
                          onChange={handleChangeDiscount}
                          value={discount}
                          InputLabelProps={{
                            sx: {
                              fontSize: "14.5px",
                            },
                          }}
                          InputProps={{
                            readOnly: discountValue && true,
                            endAdornment:
                              loadingChild === true ? (
                                <CircularProgress
                                  size={25}
                                  sx={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                  }}
                                />
                              ) : discountValue != 0 ? (
                                <Tooltip
                                  title="Bỏ chọn"
                                  className=""
                                  TransitionComponent={Zoom}
                                >
                                  <IconButton
                                    size="small"
                                    sx={{ marginLeft: "5px" }}
                                    onClick={() =>
                                      handleAddOrRemoveVoucher(null, true)
                                    }
                                  >
                                    <CloseOutlined
                                      style={{ fontSize: "18px" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                ""
                              ),
                          }}
                          inputProps={{
                            maxLength: 10,
                            style: {
                              height: "22.5px",
                            },
                          }}
                          label="Mã Giảm Giá"
                          sx={{ fontSize: "13px" }}
                          className="me-2"
                          style={{
                            width:
                              "170px" /* , opacity: hadPaymentBank ? "0.7" : "1", pointerEvents: hadPaymentBank ? "none" : "auto" */,
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "2px",
                            top: "36px",
                          }}
                        >
                          <FormHelperText>
                            <span style={{ color: "#dc1111" }}>
                              {discount === "" || discount.length === 0
                                ? ""
                                : discountValidate}
                            </span>
                          </FormHelperText>
                        </div>
                        <Button
                          onClick={() => handleOpenDialogVouchers()}
                          className="rounded-2 button-mui"
                          type="warning"
                          style={{
                            height: "38.8px",
                            width: "auto",
                            fontSize:
                              "15px" /* , opacity: hadPaymentBank ? "0.7" : "1", pointerEvents: hadPaymentBank ? "none" : "auto"  */,
                          }}
                        >
                          <span
                            className="text-dark"
                            style={{
                              marginBottom: "3px",
                              fontSize: "13.5px",
                              fontWeight: "500",
                            }}
                          >
                            Chọn Mã Giảm Giá
                          </span>
                        </Button>
                      </div>
                    </>
                    <div
                      className="d-flex justify-content-between mt-4"
                      style={{ marginLeft: "1px" }}
                    >
                      <span
                        className=""
                        style={{ fontSize: "15px", marginTop: "1px" }}
                      >
                        Tổng tiền hàng
                      </span>
                      <span
                        className="text-dark me-2"
                        style={{ fontSize: "17.5px" }}
                      >
                        {handleCountTotalMoneyFormat()}
                      </span>
                    </div>
                    <div
                      className="d-flex justify-content-between mt-4"
                      style={{ marginLeft: "1px" }}
                    >
                      <span
                        className=""
                        style={{ fontSize: "15px", marginTop: "1px" }}
                      >
                        Giảm giá
                      </span>
                      <span
                        className="text-dark me-2"
                        style={{ fontSize: "17.5px" }}
                      >
                        {discountValue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>

                    {delivery == false ? (
                      <>
                        <div
                          className="d-flex justify-content-between mt-4"
                          style={{ marginLeft: "1px" }}
                        >
                          <span
                            className="fw-bold"
                            style={{ fontSize: "15px", marginTop: "2px" }}
                          >
                            Khách cần trả
                          </span>
                          <span
                            className="me-2"
                            style={{
                              fontSize: "17.5px",
                              fontWeight: "500",
                              color: "#dc1111",
                            }}
                          >
                            {handleCountTotalMoneyCustomerNeedPayFormat()}
                          </span>
                        </div>
                        {cartItems.length > 0 ? (
                          <div
                            className="d-flex justify-content-between mt-3"
                            style={{ marginLeft: "1px" }}
                          >
                            <div className="d-flex">
                              <span
                                className="fw-bold text-dark"
                                style={{
                                  fontSize: "15px",
                                  color: "#777",
                                  marginTop: "10px",
                                }}
                              >
                                Khách thanh toán
                              </span>
                            </div>
                            <span
                              className="me-2"
                              style={{
                                fontSize: "17.5px",
                                fontWeight: "500",
                                color: "#2f80ed",
                                marginTop: "7.5px",
                              }}
                            >
                              {(customerPayment !== 0 &&
                                customerPayment.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })) ||
                                "0 ₫"}
                            </span>
                            {/*
                            <TextField className='me-2'
                              onChange={handleCustomerPayment}
                              value={customerPaymentFormat}
                              InputProps={{
                                style: { fontSize: '16.5px' },
                                readOnly: hadPaymentBank,
                              }}
                              variant="standard"
                              sx={{ width: "105px", fontSize: "17.5px" }} />
*/}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          className="d-flex justify-content-between mt-4"
                          style={{ marginLeft: "1px" }}
                        >
                          <span
                            className=""
                            style={{ fontSize: "15px", marginTop: "1px" }}
                          >
                            Phí vận chuyển
                          </span>
                          <span className="me-2" style={{ fontSize: "17.5px" }}>
                            {shipFee.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                        <div
                          className="d-flex justify-content-between mt-4"
                          style={{ marginLeft: "1px" }}
                        >
                          <div className="d-flex">
                            <span
                              className="fw-bold"
                              style={{ fontSize: "15px", marginTop: "1px" }}
                            >
                              Tổng cộng
                            </span>
                          </div>
                          <span
                            className="me-2 fw-bold"
                            style={{ fontSize: "17.5px", color: "#dc1111" }}
                          >
                            {handleCountTotalMoneyCustomerNeedPayFormat()}
                          </span>
                        </div>
                        {cartItems.length > 0 && !paymentWhenReceive ? (
                          <div
                            className="d-flex justify-content-between mt-3"
                            style={{ marginLeft: "1px" }}
                          >
                            <div className="d-flex">
                              <span
                                className="fw-bold text-dark"
                                style={{
                                  fontSize: "15px",
                                  color: "#777",
                                  marginTop: "10px",
                                }}
                              >
                                Khách thanh toán
                              </span>
                            </div>
                            <span
                              className="me-2"
                              style={{
                                fontSize: "17.5px",
                                fontWeight: "500",
                                color: "#2f80ed",
                                marginTop: "7.5px",
                              }}
                            >
                              {(customerPayment !== 0 &&
                                customerPayment.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })) ||
                                "0 ₫"}
                            </span>
                            {/*
                            <TextField className='me-2'
                              onChange={handleCustomerPayment}
                              value={customerPaymentFormat}
                              InputProps={{
                                style: { fontSize: '16.5px' },
                                readOnly: hadPaymentBank,
                              }}
                              variant="standard"
                              sx={{ width: "105px", fontSize: "17.5px" }} />
*/}
                          </div>
                        ) : (
                          ""
                        )}
                        {/*
                          paymentWhenReceive == false && cartItems.length > 0 ?
                            <div className='d-flex justify-content-between mt-3 pt-1' style={{ marginLeft: "1px" }}>
                              <span className='fw-bold text-dark' style={{ fontSize: "15px", color: "#777", marginTop: "10px" }}>Khách thanh toán</span>
                              <TextField className='me-2'
                                onChange={handleCustomerPayment}
                                value={customerPaymentFormat}
                                variant="standard"
                                style={{ width: "105px", fontSize: "17.5px" }} />
                            </div>
                            : ""
                        */}
                      </>
                    )}
                  </div>

                  {customerPayment != handleCountTotalMoneyCustomerNeedPay() &&
                  (delivery == true || delivery == false) &&
                  paymentWhenReceive == false &&
                  cartItems.length > 0 ? (
                    <div
                      className={`d-flex justify-content-between ${`${
                        paymentWhenReceive == false && delivery == true
                          ? "pt-4 mt-1"
                          : "pt-3 mt-2"
                      }`} ms-2`}
                      style={{ marginLeft: "1px" }}
                    >
                      <span
                        className="ms-1"
                        style={{ fontSize: "15px", marginTop: "2px" }}
                      >
                        Tiền thừa trả khách
                      </span>
                      <span className="me-2" style={{ fontSize: "17.5px" }}>
                        {handleCountTotalSurplusFormat()}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {delivery == true && customerPayment === 0 ? (
                    <div className="mt-3 ms-3">
                      <FormControlLabel
                        checked={paymentWhenReceive}
                        onChange={handlePaymentWhenReceiveChange}
                        control={<IOSSwitch sx={{ m: 1 }} />}
                        label={
                          <span className="ms-1" style={{ fontSize: "15px" }}>
                            Thanh toán khi nhận hàng
                          </span>
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/*(delivery == true && paymentWhenReceive == true) || cartItems.length == 0 ? "" :
                    <div className={
                      delivery == false ?
                        'mt-4 ms-2 pt-1' : "ms-2 mt-3"}>

                      <RadioGroup className='' style={{ userSelect: "none" }}
                        value={selectedValuePaymentMethod} onChange={handleRadioChange}
                        aria-label="platform"
                        // defaultValue={"Tiền mặt"}
                        overlay
                        name="platform"
                        sx={{
                          flexDirection: 'row',
                          gap: 2,
                          [`& .${radioClasses.checked}`]: {
                            [`& .${radioClasses.action}`]: {
                              inset: -1,
                              border: '2px solid #212327',
                              borderColor: 'primary.500',
                            },
                          },
                          [`& .${radioClasses.radio}`]: {
                            display: 'contents',
                            '& > svg': {
                              zIndex: 2,
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              bgcolor: 'background.surface',
                              borderRadius: '50%',
                            },
                          },
                        }}
                      >
                        <Sheet
                          key={"Tiền mặt"}
                          variant="outlined"
                          sx={{
                            borderRadius: 'md',
                            boxShadow: 'sm',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 0.5,
                            minWidth: "27%",
                            opacity: hadPaymentBank ? "0.7" : "1",
                          }}
                        >
                          <Radio disabled={hadPaymentBank} value={"Tiền mặt"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                          <FormLabel htmlFor={"Tiền mặt"}>Tiền mặt</FormLabel>
                          <FaRegMoneyBillAlt style={{ fontSize: "24px" }} />
                        </Sheet>
                        <Tooltip title={hadPaymentBank ? "Xem lịch sử" : ""} TransitionComponent={Zoom}>
                          <Sheet
                            key={"Chuyển khoản"}
                            variant="outlined"
                            sx={{
                              borderRadius: 'md',
                              boxShadow: 'sm',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              p: 0.5,
                              minWidth: "40%",
                            }}
                          >
                            <Radio onClick={() => {
                              if (hadPaymentBank) {
                                setOpenPayments(true)
                              }
                            }} value={"Chuyển khoản"} checkedIcon={
                              <>
                                <CheckCircleOutlineOutlinedIcon />
                              </>
                            } />
                            <FormLabel htmlFor={"Chuyển khoản"}>Chuyển khoản</FormLabel>
                            <PaymentIcon style={{ fontSize: "24px" }} />
                          </Sheet>
                        </Tooltip>
                        <Sheet
                          key={"Cả 2"}
                          variant="outlined"
                          sx={{
                            borderRadius: 'md',
                            boxShadow: 'sm',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 0.5,
                            minWidth: "23%",
                            opacity: hadPaymentBank ? "0.7" : "1",
                          }}
                        >
                          <Radio onClick={() => setOpenModalPaymentMultiple(true)} disabled={hadPaymentBank} value={"Cả 2"} checkedIcon={<CheckCircleOutlineOutlinedIcon />} />
                          <FormLabel htmlFor={"Cả 2"}>Cả 2</FormLabel>
                          <CreditScoreOutlinedIcon style={{ fontSize: "24px" }} />
                        </Sheet>
                      </RadioGroup>
                    </div>
                  */}
                </div>

                <div className="mt-4 pt-2">
                  <div className="">
                    <div className="text-center">
                      <Button
                        type="primary"
                        onClick={handleOpenDialogConfirmPayment}
                        className="__add-cart0 add-to-cart trigger ms-1"
                      >
                        <span
                          class=""
                          style={{ fontSize: "17.5px", fontWeight: "450" }}
                        >
                          {delivery == true
                            ? "XÁC NHẬN ĐẶT HÀNG"
                            : "XÁC NHẬN THANH TOÁN"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            {paymentHistories &&
              paymentHistories
                .filter(
                  (i) => i.hinhThucThanhToan === 0 && i.ma && i.ma.length <= 8
                )
                .map((item) => {
                  return (
                    <>
                      <div className="mt-2">
                        <BoxJoy
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "100%",
                          }}
                        >
                          <Alert
                            variant="soft"
                            color="success"
                            startDecorator={
                              <PlaylistAddCheckCircleRoundedIcon />
                            }
                            endDecorator={
                              <IconButtonJoy
                                variant="plain"
                                size="sm"
                                color="success"
                                onClick={() => {
                                  const payments = paymentHistories.filter(
                                    (pay) => pay.ma !== item.ma
                                  );
                                  setPaymentHistories(payments);
                                }}
                              >
                                <CloseRoundedIcon />
                              </IconButtonJoy>
                            }
                          >
                            <span>Đơn hàng</span>
                            <span style={{ fontWeight: "500" }}>
                              {order.ma}
                            </span>
                            <span>
                              vừa có một giao dịch được thực hiện thành công vào
                              lúc{" "}
                              {format(
                                new Date(item.createdAt),
                                "HH:mm:ss - dd/MM/yyyy"
                              )}
                              . Bạn có thể xem lịch sử giao dịch
                            </span>
                            <a
                              target={"_blank"}
                              href={`https://sandbox.vnpayment.vn/merchantv2/Transaction/PaymentDetail/${item.ma}.htm`}
                            >
                              <span
                                style={{ cursor: "pointer" }}
                                // onClick={() =>
                                //   window.open(`https://sandbox.vnpayment.vn/merchantv2/Transaction/PaymentDetail/${item.ma}.htm`, '_blank')}
                                className="underline-custom"
                              >
                                tại đây!
                              </span>
                            </a>
                          </Alert>
                        </BoxJoy>
                      </div>
                    </>
                  );
                })}
          </div>

          <div className="mt-2"></div>
        </div>
        <div className="mt-4"></div>
      </div>
      <CustomersDialog
        open={openCustomers}
        onCloseNoAction={handleCloseDialogCustomers}
        add={getCustomerById}
        data={customers}
        idCus={idCustomer}
        isOpen={isOpen}
        totalPages={totalPagesCustomer}
        getCustomer={getAllCustomers}
      />

      <AddressDialog
        open={openAddresses}
        onClose={handleCloseDialogAddresses}
        data={customerAddressList}
        setData={setCustomerAddressList}
        isOpen={isOpen}
        add={openEditModal}
        add1={updateInfoShip}
        idCus={idCustomer}
        hoTenKH={hoTenKH}
        xaPhuong={xaPhuong}
        tinhThanhPho={tinhThanhPho}
        quanHuyen={quanHuyen}
        sdt={soDienThoaiKhachHang}
        diaChi={diaChi}
        setXaPhuong={setXaPhuong}
        setDiaChi={setDiaChi}
        setTinhThanhPho={setTinhThanhPho}
        setHoTenKH={setHoTenKH}
        setSDT={setSoDienThoaiKhachHang}
        setQuanHuyen={setQuanHuyen}
        diaChiList={diaChiList}
      />

      <MultiplePaymentMethods
        data={paymentHistories}
        khachCanTra={handleCountTotalMoneyCustomerNeedPay()}
        khachThanhToan={customerPayment}
        open={openModalPaymentMultipleCounter}
        close={handleCloseModalpaymentMultipleCounter}
        handleOpenPayment={handleOpenModalConfirmRedirectPayment}
        handleCloseOpenPayment={handleCloseOpenModalConfirmRedirectPayment}
        addPayment={handleGetUrlRedirectPayment}
        openPayment={openModalConfirmRedirectPayment}
        deletePayment={handleDeletePaymentById}
      />

      <VouchersDialog
        isOpen={isOpen}
        open={openVouchers}
        onCloseNoAction={handleCloseNoActionDialogVouchers}
        onClose={handleCloseDialogVouchers}
        data={vouchers}
        add={handleAddOrRemoveVoucher}
        discount={idVoucher}
        total={handleCountTotalMoney}
        checkDieuKien={getDieuKien}
        totalPages={totalPagesVoucher}
        getVoucher={getVouchersIsActive}
      />
      <OrderConfirmPayment
        open={openDialogConfirmPayment}
        onCloseNoAction={handleCloseDialogConfirmPayment}
        confirmPayment={processingPaymentOrder}
        ma={order.ma}
        paymentWhenReceive={paymentWhenReceive}
        delivery={delivery}
        total={customerPayment}
        khachCanTra={handleCountTotalMoneyCustomerNeedPay()}
      />
      <ModalPaymentHistories
        open={openPayments}
        close={handleCloseOpenPayment}
        data={order && order.paymentMethods && order.paymentMethods}
      />
      <OrderPendingConfirmCloseDialog
        open={openOrderClose}
        onClose={handleCloseNoActionDialogOrderClose}
        ma={itemMa && itemMa.substring(1)}
        deleteOrder={() => handleCloseDialogOrderClose(itemId)}
      />
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export default PointOfSales;
