import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";
import styleReader from "./html5-qrcode-css.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { Button, Empty, Modal, Table as TableAntd } from "antd";
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
  Checkbox as CheckBoxMui,
  FormControlLabel,
  Pagination,
  ListItemText,
  FormHelperText,
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
import ModalAddKhachHang from "../account-manager/khachhang/ModalAddKhachHang.js";
import AddressNew from "../account-manager/dia-chi/add-dia-chi.js";
import AddressUpdate from "../account-manager/dia-chi/update-dia-chi.js";
import { Print1 } from "./printer-invoice.js";
import { request } from "../../../store/helpers/axios_helper.js";

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

  const [order, setOrder] = useState({});

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

export function ConfirmOrderChange(props) {
  const { open, onClose, sizeOld, sizeNew, confirm } = props;

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
            {"Xác nhận cập nhật số lượng sản phẩm"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Bạn có chắc chắn muốn cập nhật số lượng của sản phẩm từ {sizeOld}{" "}
              thành {sizeNew}
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

export function UpdateRecipientOrderDialog(props) {
  const {
    open,
    onClose,
    onCloseNoAction,
    update,
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
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [feeShip, setFeeShip] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    setCustomerName(name);
    setCustomerPhone(phone);
    setCustomerAddress(address);
    setCustomerNote(note);
    fetchDataFirst();
  }, [name, phone, address, province, district, ward, note]);

  const isValidation = () => {
    let isValid = true;
    if (customerName.trim() === "") {
      isValid = false;
    }
    if (customerPhone.trim() === "") {
      isValid = false;
    }
    if (customerAddress.trim() === "") {
      isValid = false;
    }
    if (selectedProvince === "") {
      isValid = false;
    }
    if (selectedDistrict === "") {
      isValid = false;
    }
    if (selectedWard === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleUpdateInfo = () => {
    setIsConfirm(true);
    if (isValidation()) {
      const province = provinces.find(
        (item) => item.ProvinceID === selectedProvince
      );
      const district = districts.find(
        (item) => item.DistrictID === selectedDistrict
      );
      const ward = wards.find((item) => item.WardCode === selectedWard);
      update(
        customerName,
        customerPhone,
        customerAddress,
        province.ProvinceName,
        district.DistrictName,
        ward.WardName,
        customerNote,
        feeShip
      );
    }
  };

  const fetchDataFirst = async () => {
    if (ward && province && district) {
      const getProvince = provinces.find(
        (item) => item.ProvinceName === province
      );
      if (getProvince) {
        await Promise.all([
          getAllDistrictGhnByIdProvinceByCustomer(
            getProvince.ProvinceID,
            district,
            ward
          ),
        ]);
      }
    } else if (!ward && province && district) {
      const getProvince = provinces.find(
        (item) => item.ProvinceName === province
      );
      if (getProvince) {
        await Promise.all([
          getAllDistrictGhnByIdProvinceByCustomer(
            getProvince.ProvinceID,
            district,
            ""
          ),
        ]);
      }
    } else if (!ward && province && !district) {
      const getProvince = provinces.find(
        (item) => item.ProvinceName === province
      );
      if (getProvince) {
        await Promise.all([
          getAllDistrictGhnByIdProvinceByCustomer(
            getProvince.ProvinceID,
            "",
            ""
          ),
        ]);
      }
    } else if (!ward && !province && !district) {
      getAllProvinceGhn();
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedWard("");
      setDistricts([]);
      setWards([]);
    }
  };

  const tokenGhn = "62124d79-4ffa-11ee-b1d4-92b443b7a897";

  useEffect(() => {
    if (
      selectedProvince != "" &&
      selectedDistrict != "" &&
      selectedWard != ""
    ) {
      getShipFeeGhn();
    } else {
      setFeeShip(0);
    }
  }, [selectedWard, selectedDistrict, selectedProvince]);

  const shopID = 189389;
  const serviceID = 53320;
  const shopDistrictId = 1482;
  const shopWardCode = 11007;

  const getShipFeeGhn = () => {
    axios
      .get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
        {
          params: {
            from_district_id: shopDistrictId,
            from_ward_code: shopWardCode,
            service_id: serviceID,
            to_district_id: selectedDistrict,
            to_ward_code: selectedWard,
            weight: 240,
          },
          headers: {
            token: tokenGhn,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setFeeShip(response.data.data.total);
        console.log(response.data.data.total);
      });
  };

  const getAllProvinceGhn = async () => {
    axios
      .get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        {
          headers: {
            token: tokenGhn,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setProvinces(response.data.data);
      });
  };

  useEffect(() => {
    getAllProvinceGhn();
  }, []);

  const resetData = () => {
    setCustomerName(name);
    setCustomerPhone(phone);
    setCustomerAddress(address);
    setCustomerNote(note);
    fetchDataFirst();
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

  const getAllWardGhnByIdDistrictByCustomer = async (
    provinceId,
    districtId,
    wardName
  ) => {
    await axios
      .get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
        {
          params: {
            district_id: districtId,
          },
          headers: {
            token: tokenGhn,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data.data;
        setWards(data);
        const ward = data.find((item) => item.WardName === wardName);

        setSelectedProvince(provinceId);
        setSelectedDistrict(districtId);

        if (wardName === "") {
          setSelectedWard("");
        } else {
          setSelectedWard(ward.WardCode);
        }
      });
  };
  const getAllDistrictGhnByIdProvince = async (provinceId) => {
    await axios
      .get(
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
      )
      .then((response) => {
        setDistricts(response.data.data);
      });
  };
  const getAllWardGhnByIdDistrict = async (districtId) => {
    await axios
      .get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
        {
          params: {
            district_id: districtId,
          },
          headers: {
            token: tokenGhn,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setWards(response.data.data);
      });
  };
  const handleChangeProvince = (event) => {
    const value = event.target.value;
    setSelectedProvince(value);
    getAllDistrictGhnByIdProvince(value);
    getAllWardGhnByIdDistrict(3450);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleChangeWard = (event) => {
    const value = event.target.value;
    setSelectedWard(value);
  };

  const handleChangeDistrict = (event) => {
    const value = event.target.value;
    setSelectedDistrict(value);
    getAllWardGhnByIdDistrict(value);
    setSelectedWard("");
  };

  return (
    <div className="rounded-pill">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          resetData();
          onCloseNoAction();
        }}
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
              helperText={
                isConfirm === true &&
                  customerName !== null &&
                  customerName.trim() === ""
                  ? "Bạn chưa nhập họ và tên"
                  : ""
              }
              error={
                isConfirm === true &&
                customerName !== null &&
                customerName.trim() === ""
              }
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
              helperText={
                isConfirm === true &&
                  customerPhone !== null &&
                  customerPhone.trim() === ""
                  ? "Bạn chưa nhập số điện thoại"
                  : ""
              }
              error={
                isConfirm === true &&
                customerPhone !== null &&
                customerPhone.trim() === ""
              }
              size="medium"
              className="mt-3 custom"
            />
          </div>
          <div className="d-flex mt-3">
            <FormControl
              error={isConfirm && selectedProvince === ""}
              style={{ width: "100%" }}
            >
              <InputLabel>Tỉnh / Thành Phố</InputLabel>
              <SelectMui
                className="custom"
                onChange={handleChangeProvince}
                input={<OutlinedInput label="Tỉnh / Thành Phố" />}
                value={selectedProvince}
              >
                {provinces &&
                  provinces.map((province) => (
                    <MenuItem
                      key={province.ProvinceID}
                      value={province.ProvinceID}
                    >
                      {province.ProvinceName}
                    </MenuItem>
                  ))}
              </SelectMui>
              {isConfirm && selectedProvince === "" && (
                <FormHelperText>Bạn chưa chọn Tỉnh / Thành Phố!</FormHelperText>
              )}
            </FormControl>
            <FormControl
              error={isConfirm && selectedDistrict === ""}
              style={{ width: "100%" }}
              className="ms-3"
            >
              <InputLabel>Quận / Huyện</InputLabel>
              <SelectMui
                className="custom"
                label="Quận / Huyện"
                input={<OutlinedInput label="Quận / Huyện" />}
                value={selectedDistrict}
                onChange={handleChangeDistrict}
              >
                {districts &&
                  districts.map((district) => (
                    <MenuItem
                      key={districts.DistrictID}
                      value={district.DistrictID}
                    >
                      {district.DistrictName}
                    </MenuItem>
                  ))}
              </SelectMui>
              {isConfirm && selectedDistrict === "" && (
                <FormHelperText>Bạn chưa chọn Quận / Huyện!</FormHelperText>
              )}
            </FormControl>
            <FormControl
              error={isConfirm && selectedWard === ""}
              style={{ width: "100%" }}
              className="ms-3"
            >
              <InputLabel>Phường / Xã</InputLabel>
              <SelectMui
                className="custom"
                onChange={handleChangeWard}
                input={<OutlinedInput label="Phường / Xã" />}
                value={selectedWard}
              >
                {wards &&
                  wards.map((ward) => (
                    <MenuItem key={ward.WardCode} value={ward.WardCode}>
                      {ward.WardName}
                    </MenuItem>
                  ))}
              </SelectMui>
              {isConfirm && selectedWard === "" && (
                <FormHelperText>Bạn chưa chọn Phường / Xã!</FormHelperText>
              )}
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
              helperText={
                isConfirm === true &&
                  customerAddress !== null &&
                  customerAddress.trim() === ""
                  ? "Bạn chưa nhập số điện thoại"
                  : ""
              }
              error={
                isConfirm === true &&
                customerAddress !== null &&
                customerAddress.trim() === ""
              }
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
              onClick={handleUpdateInfo}
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
    openImei,
    onOpenImei,
    onCloseImei,
  } = props;

  const [openCategory, setOpenCategory] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openOpera, setOpenOpera] = useState(false);
  const [openCpu, setOpenCpu] = useState(false);
  const [openRam, setOpenRam] = useState(false);
  const [openRom, setOpenRom] = useState(false);
  const [openScreen, setOpenScreen] = useState(false);
  const [openPin, setOpenPin] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [openPage, setOpenPage] = useState(false);

  const handleOpenSort = () => {
    setOpenSort(true);
  };

  const handleCloseOpenSort = () => {
    setOpenSort(false);
  };

  const handleOpenPage = () => {
    setOpenPage(true);
  };

  const handleCloseOpenPage = () => {
    setOpenPage(false);
  };

  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const addProductToCart = (imeis) => {
    add(price, id, imeis, name);
    findProductsByMultipleCriteriaWithPagination(currentPage);
  };
  const filterdData = data.filter((item) => item.soLuongTonKho > 0);

  const countPrice = (price, afterDiscount) => {
    return price - afterDiscount;
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>
          {products.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Ảnh",
      align: "center",
      key: "ma",
      width: "15%",
      render: (text, item) => (
        <>
          <div style={{ position: "relative" }}>
            {item.image !== null ? (
              <img
                src={item.image.path}
                class=""
                alt=""
                style={{ width: "125px", height: "125px" }}
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="90"
                style={{
                  width: "125px",
                  height: "125px",
                  color: "rgb(232, 234, 235)",
                  margin: "0px auto",
                }}
              >
                <path
                  d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2ZM5 19V5h14l.002 14H5Z"
                  fill="currentColor"
                ></path>
                <path
                  d="m10 14-1-1-3 4h12l-5-7-3 4ZM8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
            {item &&
              item.donGiaSauKhuyenMai !== null &&
              item.donGiaSauKhuyenMai !== 0 && (
                <div
                  className="category"
                  style={{
                    userSelect: "none",
                    backgroundColor: "#ffcc00",
                    position: "absolute",
                    top: "0px",
                    borderTopLeftRadius: `8px`,
                    fontSize: "11px",
                    borderTopRightRadius: `20px`,
                    borderBottomRightRadius: `20px`,
                    fontWeight: "600",
                    padding: "4px 8px", // Add padding for better visibility
                    // width: "auto",
                    // height: "30px"
                    marginLeft: "10px",
                    // marginTop: "25px",
                  }}
                >
                  Giảm{" "}
                  {countPrice(
                    item.donGia,
                    item.donGiaSauKhuyenMai
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              )}
          </div>
        </>
      ),
    },
    {
      title: "Mã Sản Phẩm",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {"SP00000" + data.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      key: "tenSanPham",
      width: "15%",
      dataIndex: "tenSanPham",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.sanPham.tenSanPham +
            " " +
            record.ram.dungLuong +
            "/" +
            record.rom.dungLuong +
            "GB (" +
            record.mauSac.tenMauSac +
            ")"}
        </span>
      ),
    },
    {
      title: "Đơn Giá",
      align: "center",
      width: "11%",
      render: (text, item) => (
        <span style={{ color: "#dc1111" }}>
          {item && item.donGiaSauKhuyenMai
            ? item.donGiaSauKhuyenMai.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
            : item.donGia.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </span>
      ),
    },
    {
      title: "Số Lượng Tồn",
      align: "center",
      width: "11%",
      render: (text, record) => record.soLuongTonKho,
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, item) => (
        <>
          <Button
            onClick={() => {
              handleOpenModalImeiByProductItem(item);
              setId(item.id);
              setPrice(item.donGia);
              setName(item.sanPham.tenSanPham +
                " " +
                item.ram.dungLuong +
                "/" +
                item.rom.dungLuong +
                "GB (" +
                item.mauSac.tenMauSac +
                ")");
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
        </>
      ),
    },
  ];

  // const [openModalImei, setOpenModalImei] = useState(false);
  const [imeis, setImeis] = useState([]);
  // const handleCloseOpenModalImei = () => {
  //   setOpenModalImei(false);
  // }
  const handleOpenModalImeiByProductItem = (item) => {
    onOpenImei();
    setImeis(item.imeis);
  };

  const handleCloseOpenCategory = () => {
    setOpenCategory(false);
  };

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleCloseBrand = () => {
    setOpenBrand(false);
  };

  const handleOpenBrand = () => {
    setOpenBrand(true);
  };
  const handleCloseOpera = () => {
    setOpenOpera(false);
  };

  const handleOpenOpera = () => {
    setOpenOpera(true);
  };
  const handleCloseCpu = () => {
    setOpenCpu(false);
  };

  const handleOpenCpu = () => {
    setOpenCpu(true);
  };

  const handleCloseRam = () => {
    setOpenRam(false);
  };

  const handleOpenRam = () => {
    setOpenRam(true);
  };
  const handleCloseSelectRom = () => {
    setOpenRom(false);
  };

  const handleOpenRom = () => {
    setOpenRom(true);
  };
  const handleCloseScreen = () => {
    setOpenScreen(false);
  };

  const handleOpenScreen = () => {
    setOpenScreen(true);
  };
  const handleClosePin = () => {
    setOpenPin(false);
  };

  const handleOpenPin = () => {
    setOpenPin(true);
  };

  const [selectedValueCategorys, setSelectedValueCategorys] = React.useState([
    0,
  ]);
  const [selectedValueBrands, setSelectedValueBrands] = React.useState([0]);
  const [selectedValueOperas, setSelectedValueOperas] = React.useState([
    "None",
  ]);
  const [selectedValueCpus, setSelectedValueCpus] = React.useState([0]);
  const [selectedValueRams, setSelectedValueRams] = React.useState([0]);
  const [selectedValueRoms, setSelectedValueRoms] = React.useState([0]);
  const [selectedValueScreens, setSelectedValueScreens] = React.useState([0]);
  const [selectedValuePins, setSelectedValuePins] = React.useState([0]);

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
  const [listHang, setListHang] = useState([]);
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

  const [listChip, setListChip] = useState([]);
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

  const [listPin, setListPin] = useState([]);
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

  const [listManHinh, setListManHinh] = useState([]);
  const getListManHinh = () => {
    axios
      .get(`http://localhost:8080/api/display`)
      .then((response) => {
        setListManHinh(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listRam, setListRam] = useState([]);
  const [listRom, setListRom] = useState([]);
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

  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [size, setSize] = useState(10);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const [fromPrice, setFromPrice] = useState();
  const [toPrice, setToPrice] = useState();

  const getPrice = (from, to) => {
    setFromPrice(from);
    setToPrice(to);
  };

  const [products, setProducts] = useState([]);
  const operas = ["ANDROID", "IOS"];

  const findProductsByMultipleCriteriaWithPagination = (page) => {
    const params = new URLSearchParams();
    params.append("currentPage", page);
    params.append("pageSize", size);
    params.append("keyword", keyword);
    params.append(
      "danhMucs",
      selectedValueCategorys.length === 1 && selectedValueCategorys[0] === 0
        ? []
        : selectedValueCategorys &&
        selectedValueCategorys.filter((item) => item !== 0)
    );
    params.append(
      "hangs",
      selectedValueBrands.length === 1 && selectedValueBrands[0] === 0
        ? []
        : selectedValueBrands &&
        selectedValueBrands.filter((item) => item !== 0)
    );
    params.append(
      "heDieuHanhs",
      selectedValueOperas.length === 1 && selectedValueOperas[0] === "None"
        ? operas
        : selectedValueOperas &&
        selectedValueOperas.filter((item) => item !== "None")
    );
    params.append(
      "chips",
      selectedValueCpus.length === 1 && selectedValueCpus[0] === 0
        ? []
        : selectedValueCpus && selectedValueCpus.filter((item) => item !== 0)
    );
    params.append(
      "manHinhs",
      selectedValueScreens.length === 1 && selectedValueScreens[0] === 0
        ? []
        : selectedValueScreens &&
        selectedValueScreens.filter((item) => item !== 0)
    );
    params.append(
      "pins",
      selectedValuePins.length === 1 && selectedValuePins[0] === 0
        ? []
        : selectedValuePins && selectedValuePins.filter((item) => item !== 0)
    );
    params.append(
      "rams",
      selectedValueRams.length === 1 && selectedValueRams[0] === 0
        ? []
        : selectedValueRams && selectedValueRams.filter((item) => item !== 0)
    );
    params.append(
      "roms",
      selectedValueRoms.length === 1 && selectedValueRoms[0] === 0
        ? []
        : selectedValueRoms && selectedValueRoms.filter((item) => item !== 0)
    );
    params.append("fromPrice", fromPrice || 0);
    params.append("toPrice", toPrice || 51900000);
    axios
      .get(
        `http://localhost:8080/api/products/product-items/page?${params}`,
        {}
      )
      .then((response) => {
        const data = response.data.data;
        setProducts(data);
        setTotalPages(response.data.totalPages);
        // setIsLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    findProductsByMultipleCriteriaWithPagination(currentPage);
  }, [
    currentPage,
    keyword,
    size,
    selectedValueRams,
    selectedValuePins,
    selectedValueRoms,
    selectedValueScreens,
    selectedValueCpus,
    selectedValueBrands,
    selectedValueOperas,
    selectedValueCategorys,
    fromPrice,
    toPrice,
    open,
  ]);

  useEffect(() => {
    getListDanhMuc();
    getListHang();
    getListManHinh();
    getListChip();
    getListPin();
    getListRam();
    getListRom();
  }, []);

  const TableProduct = () => {
    return (
      <>
        <div className="">
          <TableAntd
            className="table-container "
            columns={columns}
            rowKey="ma"
            dataSource={products}
            rowClassName={(record) =>
              record.soLuongTonKho <= 0 && "disable-product"
            }
            pagination={false}
            locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
          />
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
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="xl"
        maxHeight="xl"
        fullWidth="xl"
        sx={{
          zIndex: 1250,
        }}
      >
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
                  label="Tìm kiếm sản phẩm theo mã, tên"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  value={keyword}
                  InputLabelProps={{
                    sx: {
                      // textTransform: "capitalize",
                    },
                  }}
                  style={{ height: "23px" }}
                  inputProps={{
                    style: {
                      // height: "23px",
                      width: "750px",
                    },
                  }}
                  size="small"
                  className=""
                />
                <Button
                  onClick={() => {
                    setKeyword("");
                    setCurrentPage(1);
                    setSelectedValueCpus([0]);
                    setSelectedValueCategorys([0]);
                    setSelectedValueScreens([0]);
                    setSelectedValueBrands([0]);
                    setSelectedValueOperas(["None"]);
                    setSelectedValuePins([0]);
                    setSelectedValueRams([0]);
                    setSelectedValueRoms([0]);
                    setSize(10);
                    setSort("New");
                  }}
                  className="rounded-2 ms-2"
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
              </div>
              <div className="d-flex justify-content-center mt-4">
                <div
                  className="d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenCategory} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Danh Mục:{" "}
                    </span>
                  </div>
                  <FormControl sx={{ maxWidth: 150 }} size="small">
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
                      open={openCategory}
                      onClose={handleCloseOpenCategory}
                      onOpen={handleOpenCategory}
                      defaultValue={selectedValueCategorys}
                      value={selectedValueCategorys}
                      onChange={(e) => {
                        setSelectedValueCategorys(e.target.value);
                      }}
                      renderValue={(selected) =>
                        selected && selected.length > 1
                          ? selected
                            .filter((id) =>
                              categorys.find((c) => c.id === id)
                            ) // Loại bỏ các giá trị không hợp lệ
                            .map(
                              (id) =>
                                categorys.find((c) => c.id === id).tenDanhMuc
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Danh Mục"
                      }
                    >
                      {categorys.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <CheckBoxMui
                            checked={selectedValueCategorys.indexOf(c.id) > -1}
                          />
                          <ListItemText primary={c.tenDanhMuc} />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-2 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenBrand} className="mt-2">
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
                      open={openBrand}
                      onClose={handleCloseBrand}
                      onOpen={handleOpenBrand}
                      defaultValue={selectedValueBrands}
                      value={selectedValueBrands}
                      onChange={(e) => {
                        setSelectedValueBrands(e.target.value);
                        console.log(e.target.value);
                      }}
                      multiple
                      renderValue={(selected) =>
                        selected && selected.length > 1
                          ? selected
                            .filter((id) => listHang.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                            .map(
                              (id) =>
                                listHang.find((c) => c.id === id).tenHang
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Hãng"
                      }
                    >
                      {listHang.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <CheckBoxMui
                            checked={selectedValueBrands.indexOf(c.id) > -1}
                          />
                          <ListItemText primary={c.tenHang} />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-2 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenOpera} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Hệ Điều Hành:{" "}
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
                      open={openOpera}
                      onClose={handleCloseOpera}
                      onOpen={handleOpenOpera}
                      multiple
                      defaultValue={selectedValueOperas}
                      value={selectedValueOperas}
                      onChange={(e) => {
                        if (e.target.value.length === 0) {
                          setSelectedValueOperas(["None"]);
                        } else {
                          const values = e.target.value.filter(
                            (value) => value !== "None"
                          );
                          setSelectedValueOperas(values);
                        }
                      }}
                      renderValue={(selected) =>
                        selected &&
                          selected.filter((value) => value !== "None").length > 0
                          ? selected
                            .filter((id) =>
                              ["ANDROID", "IOS"].find((c) => c === id)
                            ) // Loại bỏ các giá trị không hợp lệ
                            .map((id) =>
                              ["ANDROID", "IOS"].find((c) => c === id)
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Hệ Điều Hành"
                      }
                    >
                      {["ANDROID", "IOS"].map((c) => (
                        <MenuItem key={c} value={c}>
                          <CheckBoxMui
                            checked={selectedValueOperas.indexOf(c) > -1}
                          />
                          <ListItemText primary={c} />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>
                <div
                  className="ms-2 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenCpu} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Chip:{" "}
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
                      open={openCpu}
                      onClose={handleCloseCpu}
                      onOpen={handleOpenCpu}
                      defaultValue={selectedValueCpus}
                      value={selectedValueCpus}
                      onChange={(e) => {
                        setSelectedValueCpus(e.target.value);
                      }}
                      multiple
                      renderValue={(selected) =>
                        selected && selected.length > 1
                          ? selected
                            .filter((id) => listChip.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                            .map(
                              (id) =>
                                listChip.find((c) => c.id === id).tenChip
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Chip"
                      }
                    >
                      {listChip.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <CheckBoxMui
                            checked={selectedValueCpus.indexOf(c.id) > -1}
                          />
                          <ListItemText primary={c.tenChip} />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-2 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenScreen} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Màn hình:{" "}
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
                      open={openScreen}
                      onClose={handleCloseScreen}
                      onOpen={handleOpenScreen}
                      defaultValue={selectedValueScreens}
                      value={selectedValueScreens}
                      onChange={(e) => {
                        setSelectedValueScreens(e.target.value);
                      }}
                      multiple
                      renderValue={(selected) =>
                        selected && selected.length > 1
                          ? selected
                            .filter((id) =>
                              listManHinh.find((c) => c.id === id)
                            ) // Loại bỏ các giá trị không hợp lệ
                            .map(
                              (id) =>
                                listManHinh.find((c) => c.id === id)
                                  .loaiManHinh +
                                " " +
                                `(${listManHinh.find((c) => c.id === id)
                                  .doPhanGiaiManHinh.chieuRong +
                                " x " +
                                listManHinh.find((c) => c.id === id)
                                  .doPhanGiaiManHinh.chieuDai
                                } pixels) ` +
                                listManHinh.find((c) => c.id === id)
                                  .kichThuoc +
                                `"`
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Màn Hình"
                      }
                    >
                      {listManHinh.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <CheckBoxMui
                            checked={selectedValueScreens.indexOf(c.id) > -1}
                          />
                          <ListItemText
                            primary={
                              c.loaiManHinh +
                              " " +
                              `(${c.doPhanGiaiManHinh.chieuRong +
                              " x " +
                              c.doPhanGiaiManHinh.chieuDai
                              } pixels) ` +
                              c.kichThuoc +
                              `"`
                            }
                          />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>
                <div
                  className="ms-2 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenPin} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Pin:{" "}
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
                      open={openPin}
                      onClose={handleClosePin}
                      onOpen={handleOpenPin}
                      defaultValue={selectedValuePins}
                      value={selectedValuePins}
                      onChange={(e) => {
                        setSelectedValuePins(e.target.value);
                      }}
                      multiple
                      renderValue={(selected) =>
                        selected && selected.length > 1
                          ? selected
                            .filter((id) => listPin.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                            .map(
                              (id) =>
                                listPin.find((c) => c.id === id).loaiPin +
                                " " +
                                listPin.find((c) => c.id === id).dungLuong +
                                " mAh"
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Pin"
                      }
                    >
                      {listPin.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <CheckBoxMui
                            checked={selectedValuePins.indexOf(c.id) > -1}
                          />
                          <ListItemText
                            primary={c.loaiPin + " " + c.dungLuong + " mAh"}
                          />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <PriceSlider getPrice={getPrice} />
                <div
                  className="ms-2 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenRam} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      RAM:{" "}
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
                      open={openRam}
                      onClose={handleCloseRam}
                      onOpen={handleOpenRam}
                      defaultValue={selectedValueRams}
                      value={selectedValueRams}
                      onChange={(e) => {
                        setSelectedValueRams(e.target.value);
                      }}
                      multiple
                      renderValue={(selected) =>
                        selected && selected.length > 1
                          ? selected
                            .filter((id) => listRam.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                            .map(
                              (id) =>
                                listRam.find((c) => c.id === id).dungLuong +
                                "GB"
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Ram"
                      }
                    >
                      {listRam.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <CheckBoxMui
                            checked={selectedValueRams.indexOf(c.id) > -1}
                          />
                          <ListItemText primary={c.dungLuong + "GB"} />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="ms-2 d-flex"
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <div onClick={handleOpenRom} className="mt-2">
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      ROM:{" "}
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
                      open={openRom}
                      onClose={handleCloseSelectRom}
                      onOpen={handleOpenRom}
                      defaultValue={selectedValueRoms}
                      value={selectedValueRoms}
                      onChange={(e) => {
                        setSelectedValueRoms(e.target.value);
                      }}
                      multiple
                      renderValue={(selected) =>
                        selected && selected.length > 1
                          ? selected
                            .filter((id) => listRom.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                            .map((id) =>
                              listRom.find((c) => c.id === id).dungLuong ===
                                1024
                                ? 1 + "TB"
                                : listRom.find((c) => c.id === id).dungLuong +
                                "GB"
                            ) // Lấy tên danh mục tương ứng
                            .join(", ")
                          : "Chọn Rom"
                      }
                    >
                      {listRom.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          <CheckBoxMui
                            checked={selectedValueRoms.indexOf(c.id) > -1}
                          />
                          <ListItemText
                            primary={
                              c.dungLuong === 1024
                                ? 1 + "TB"
                                : c.dungLuong + "GB"
                            }
                          />
                        </MenuItem>
                      ))}
                    </SelectMui>
                  </FormControl>
                </div>

                <div
                  className="d-flex ms-2"
                  style={{
                    height: "40px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={handleOpenSort}
                    className=""
                    style={{ marginTop: "8px" }}
                  >
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Sắp Xếp:{""}
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
                          color: "#2f80ed",
                          fontWeight: "500",
                        },
                      }}
                      open={openSort}
                      onClose={handleCloseOpenSort}
                      onOpen={handleOpenSort}
                      defaultValue={"New"}
                    >
                      <MenuItem value={"New"}>Mới</MenuItem>
                      <MenuItem value={"Old"}>Cũ</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>
                <div
                  className="d-flex ms-2"
                  style={{
                    height: "40px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={handleOpenPage}
                    className=""
                    style={{ marginTop: "8px" }}
                  >
                    <span
                      className="ms-2 ps-1"
                      style={{ fontSize: "15px", fontWeight: "450" }}
                    >
                      Hiển Thị:{""}
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
                          color: "#2f80ed",
                          fontWeight: "500",
                        },
                      }}
                      open={openPage}
                      onClose={handleCloseOpenPage}
                      onOpen={handleOpenPage}
                      defaultValue={10}
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    >
                      <MenuItem value={10}>10/Pages</MenuItem>
                      <MenuItem value={20}>20/Pages</MenuItem>
                      <MenuItem value={50}>50/Pages</MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>
              </div>
              <div className="mt-4">
                <TableProduct />
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <Pagination
                  color="primary"
                  page={parseInt(currentPage)}
                  key={refreshPage}
                  count={totalPages}
                  onChange={handlePageChange}
                />
              </div>
            </>
          ) : null}
        </DialogContent>

        <DialogActions></DialogActions>
      </Dialog>
      <ModalImeiByProductItem
        isOpen={isOpen}
        open={openImei}
        imeisChuaBan={imeis}
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
    totalPages,
    getVoucher,
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

  const [currentPage, setCurrentPage] = useState(1);

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getVoucher(page);
  };

  const [keyword, setKeyword] = useState("");

  const handleChangeSearchVoucher = (event) => {
    const searchTatCaInput = event.target.value;
    setKeyword(searchTatCaInput);
    setCurrentPage(1);
  };

  useEffect(
    (page) => {
      getVoucher(page, keyword);
    },
    [keyword]
  );

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
        onClose={() => {
          onCloseNoAction();
          setKeyword("");
        }}
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
              onChange={handleChangeSearchVoucher}
              value={keyword}
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
            {/* <TableAntd
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
            /> */}
            <TableAntd
              className="table-container"
              dataSource={data}
              columns={columns}
              pagination={false}
              rowClassName={(record) =>
                total() < record.dieuKienApDung && "disabled-row"
              }
              rowKey="id"
              size="middle"
              locale={{ emptyText: <Empty /> }}
            />
            <div className="d-flex justify-content-center mt-2">
              <Pagination
                page={parseInt(currentPage)}
                count={totalPages}
                onChange={chuyenTrang}
                color="primary"
              />
            </div>
            <div className="mt-4"></div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export function CustomersDialog(props) {
  const {
    open,
    onClose,
    onCloseNoAction,
    data,
    add,
    idCus,
    isOpen,
    totalPages,
    getCustomer,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [openCustomer, setOpenCustomer] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setOpenCustomer(false);
  };

  const handleClickOpen = () => {
    setOpenCustomer(true);
  };

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getCustomer(page);
  };

  const [keyword, setKeyword] = useState("");

  const handleChangeSearchCustomer = (event) => {
    const searchTatCaInput = event.target.value;
    setKeyword(searchTatCaInput);
    setCurrentPage(1);
  };

  useEffect(
    (page) => {
      getCustomer(page, keyword);
    },
    [keyword]
  );

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
          <Avatar src={item.anhDaiDien} />
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
        <span style={{ fontWeight: "normal", whiteSpace: "pre-line" }}>
          {format(item.ngayTao, "HH:mm:ss, dd/MM/yyyy")}
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
        onClose={() => {
          onCloseNoAction();
        }}
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
                    label="Tìm khách hàng theo mã, tên, email, số điện thoại"
                    onChange={handleChangeSearchCustomer}
                    value={keyword}
                    InputLabelProps={{
                      sx: {
                        marginTop: "0.5px",
                        // textTransform: "capitalize",
                      },
                    }}
                    inputProps={{
                      style: {
                        height: "23px",
                        width: "600px",
                      },
                    }}
                    size="small"
                    className=""
                  />
                  <Button
                    onClick={() => {
                      setCurrentPage(1);
                      setKeyword("");
                    }}
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
                    onClick={handleClickOpen}
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
                {/* <TableAntd
                  className="table-container"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  rowKey={"id"}
                  key={"id"}
                  locale={{ emptyText: <Empty /> }}
                /> */}
                <TableAntd
                  className="table-container"
                  dataSource={data}
                  columns={columns}
                  pagination={false}
                  rowKey="id"
                  key={"id"}
                  size="middle"
                  locale={{ emptyText: <Empty /> }}
                />
                <div className="d-flex justify-content-center mt-2">
                  <Pagination
                    page={parseInt(currentPage)}
                    count={totalPages}
                    onChange={chuyenTrang}
                    color="primary"
                  />
                </div>
                <div className="mt-4"></div>
              </div>
            </>
          ) : null}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        open={openCustomer}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          handleClose();
        }}
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "unset",
          overflowX: "hidden", // Ngăn việc cuộn ngang
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "71vw",
          },
        }}
      >
        <DialogContent
          style={{ fontSize: "22px", fontWeight: "500", height: "700px" }}
        >
          <ModalAddKhachHang
            close={() => {
              handleClose();
            }}
            getCustomer={getCustomer}
            openCustomer={openCustomer}
            setOP={setOpenCustomer}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AddressDialog(props) {
  const {
    open,
    onClose,
    data,
    add,
    add1,
    isOpen,
    idCus,
    getAddress,
    setData,
    hoTenKH,
    xaPhuong,
    tinhThanhPho,
    quanHuyen,
    sdt,
    diaChi,
    setXaPhuong,
    setDiaChi,
    setTinhThanhPho,
    setHoTenKH,
    setSDT,
    setQuanHuyen,
    diaChiList,
  } = props;
  const handleSelectAddress = (item) => {
    add1(item);
  };
  const [openAddress, setOpenAddress] = React.useState(false);
  const [openAddressUpdate, setOpenAddressUpdate] = React.useState(false);
  const handleCloseAddress = () => {
    setOpenAddress(false);
  };

  const handleOpenAddress = () => {
    setOpenAddress(true);
  };
  const handleCloseAddressUpdate = () => {
    setOpenAddressUpdate(false);
  };

  const handleOpenAddressUpdate = () => {
    setOpenAddressUpdate(true);
  };
  const handleChooseAddress = (id) => {
    if (data === id) {
      add(null);
    } else {
      add(id);
      setOpenAddressUpdate(true);
    }
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
            onClick={() => {
              handleChooseAddress(item);
            }}
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

  const [keyword, setKeyword] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.hoTenKH.includes(keyword) ||
      item.soDienThoaiKhachHang.includes(keyword) ||
      item.diaChi.includes(keyword) ||
      item.tinhThanhPho.includes(keyword) ||
      item.xaPhuong.includes(keyword) ||
      item.quanHuyen.includes(keyword)
  );

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
                    label="Tìm theo tên, số điện thoại, địa chỉ"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    InputLabelProps={{
                      sx: {
                        marginTop: "0.5px",
                        // textTransform: "capitalize",
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
                    onClick={() => {
                      setKeyword("");
                    }}
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
                    onClick={handleOpenAddress}
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
                  dataSource={filteredData}
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
      <Dialog
        open={openAddress}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          handleCloseAddress();
        }}
        maxWidth={false}
        sx={{
          maxWidth: "unset",
          overflowX: "hidden", // Ngăn việc cuộn ngang
          "& .MuiDialog-paper": {
            width: "50%",
            maxWidth: "70vw",
          },
        }}
      >
        <DialogContent
          style={{ fontSize: "22px", fontWeight: "500", height: "700px" }}
        >
          <AddressNew
            idCustom={idCus}
            openAddress={openAddress}
            close={handleCloseAddress}
            getAddress={getAddress}
            data={data}
            setData={setData}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAddressUpdate}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          handleCloseAddressUpdate();
        }}
        maxWidth={false}
        sx={{
          maxWidth: "unset",
          overflowX: "hidden", // Ngăn việc cuộn ngang
          "& .MuiDialog-paper": {
            width: "50%",
            maxWidth: "70vw",
          },
        }}
      >
        <DialogContent
          style={{ fontSize: "22px", fontWeight: "500", height: "700px" }}
        >
          <AddressUpdate
            idCustom={idCus}
            openAddress={openAddress}
            close={handleCloseAddressUpdate}
            getAddress={getAddress}
            data={data}
            setData={setData}
            hoTenKH={hoTenKH}
            xaPhuong={xaPhuong}
            tinhThanhPho={tinhThanhPho}
            quanHuyen={quanHuyen}
            sdt={sdt}
            diaChi={diaChi}
            setXaPhuong={setXaPhuong}
            setDiaChi={setDiaChi}
            setTinhThanhPho={setTinhThanhPho}
            setHoTenKH={setHoTenKH}
            setSDT={setSDT}
            setQuanHuyen={setQuanHuyen}
            diaChiList={diaChiList}
          />
        </DialogContent>
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
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const {
    open,
    status,
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
      confirmDelivery(description);
    } else if (status === OrderStatusString.DELIVERING) {
      if (description !== null && description.trim() === "") {
        handleOpenAlertVariant("Bạn chưa nhập ghi chú! ", Notistack.ERROR);
      } else {
        confirmFinish(description);
      }
    } else if (status === OrderStatusString.CANCELLED) {
      if (description !== null && description.trim() === "") {
        handleOpenAlertVariant(
          "Bạn chưa nhập lí do hủy đơn! ",
          Notistack.ERROR
        );
      } else {
        confirmCancel(description);
      }
    }
    setDescription("");
  };
  const returnConfirmHeader = () => {
    if (status === OrderStatusString.PENDING_CONFIRM) {
      return "Xác nhận đơn hàng";
    } else if (status === OrderStatusString.CONFIRMED) {
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
  imeisChuaBan,
  addProduct,
  isOpen,
}) => {
  const [selectedImei, setSelectedImei] = useState([]);
  const [imei, setImei] = useState("");
  const [imeis, setImeis] = useState(imeisChuaBan);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  // const filteredData = imeis.filter(
  //   (item) =>
  //     item.trangThai === StatusImei.NOT_SOLD || item.trangThai === StatusImei.PENDING_DELIVERY ||
  //     item.trangThai === StatusImei.IN_THE_CART
  // );
  const filteredData = imeis
    .filter((item) => item.soImei.includes(imei))
    .filter((item) => item.trangThai === StatusImei.NOT_SOLD);

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
    setImeis(imeisChuaBan);
  }, [imeisChuaBan]);

  useEffect(() => {
    let newCurrentPage = currentPage;
    while (
      newCurrentPage > 1 &&
      filteredData.slice(
        (newCurrentPage - 1) * itemsPerPage,
        newCurrentPage * itemsPerPage
      ).length === 0
    ) {
      newCurrentPage--;
    }
    setCurrentPage(newCurrentPage);
  }, [filteredData]);

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
                    onChange={(e) => {
                      setImei(e.target.value);
                    }}
                    value={imei}
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
                                        "badge-success rounded-pill mx-auto"
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
                                            : "Chưa Bán"}
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
  openOrder,
  closeOrder,
  onOpenOrder,
  size,
}) => {
  const [selectedImei, setSelectedImei] = useState(imeisChuaBan);
  const [imei, setImei] = useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();

  // const filteredData = imeis.filter(
  //   (item) =>
  //     item.trangThai === StatusImei.NOT_SOLD ||
  //     item.trangThai === StatusImei.PENDING_DELIVERY ||
  //     item.trangThai === StatusImei.IN_THE_CART
  // );

  // const filteredData = imeis.filter((item) =>
  //   item.soImei.includes(imei)
  // ).filter(
  //   (item) =>
  //     item.trangThai === StatusImei.NOT_SOLD ||
  //     item.trangThai === StatusImei.PENDING_DELIVERY ||
  //     item.trangThai === StatusImei.IN_THE_CART
  // );
  const filteredData = imeis.filter(
    (item) =>
      item.trangThai === StatusImei.NOT_SOLD ||
      ((item.trangThai === StatusImei.IN_THE_CART ||
        item.trangThai === StatusImei.PENDING_DELIVERY) &&
        imeisChuaBan.some((imei) => imei.soImei === item.soImei))
  );

  const [newSize, setNewSize] = useState();
  const [oldSize, setOldSize] = useState();

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

  useEffect(() => {
    if (imei.trim() !== "") {
      let newCurrentPage = currentPage;
      while (
        newCurrentPage > 1 &&
        filteredData.slice(
          (newCurrentPage - 1) * itemsPerPage,
          newCurrentPage * itemsPerPage
        ).length === 0
      ) {
        newCurrentPage--;
      }
      setCurrentPage(newCurrentPage);
    }
  }, [filteredData]);

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
                    onChange={(e) => {
                      setImei(e.target.value);
                    }}
                    value={imei}
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
                                    "badge-success rounded-pill mx-auto"
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
                                        : "Chưa Bán"}
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
                        } else if (
                          imeisChuaBan.length === 0 &&
                          selectedImei.length !== size
                        ) {
                          onOpenOrder();
                          setNewSize(selectedImei.length);
                          setOldSize(size);
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
        <ConfirmOrderChange
          open={openOrder}
          onClose={closeOrder}
          sizeOld={oldSize}
          sizeNew={newSize}
          confirm={() => update(selectedImei)}
        />
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
    "Chuyển khoản",
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
                    sx={{ width: "245px", fontSize: "17.5px" }}
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
                  type="primary"
                  className="rounded-2"
                  style={{ height: "40px", width: "110px", fontSize: "15px" }}
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

  const [description, setDescription] = useState("");

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setDescription(value);
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
              <div className="mt-2">
                <TextField
                  label="Ghi chú"
                  value={description}
                  onChange={handleGetValueFromInputTextField}
                  multiline
                  maxRows={1}
                  fullWidth
                  inputProps={{
                    style: {
                      paddingBottom: "80px",
                    },
                  }}
                  size="medium"
                  className="mt-4"
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

export const ModalRefundProduct = ({ open, close, imeis, refresh, refund }) => {
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

  useEffect(() => {
    if (selectedImei.length === imeis.length){
      setIsAll(true);
    }
    else{
      setIsAll(false);
    }
  }, [selectedImei]);

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
                <div className="mt-1 d-flex justify-content-between">
                  <span className="fs-4" style={{ fontWeight: "500" }}>
                    Chọn Imei Cần Trả
                  </span>
                  <TextField
                    label="Tìm IMEI"
                    onChange={(e) => {
                      // setImei(e.target.value);
                    }}
                    // value={imei}
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
              <div className="d-flex justify-content-end mt-4 me-2">
                <Button
                  onClick={() => {
                    if (selectedImei.length === 0) {
                      handleOpenAlertVariant(
                        "Bạn chưa chọn IMEI cần trả hàng!",
                        "warning"
                      );
                    } else {
                      refund(selectedImei);
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
              Thông tin của các phiên bản hiện tại sẽ không được lưu lại. Bạn có
              chắc chắn muốn chuyển sang tính năng này ?
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

export function ConfirmRollbackStatusOrder(props) {
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
            {"Xác nhận hoàn tác"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Bạn có chắc chắc muốn hoàn tác về trạng thái trước đó của đơn hàng
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
                Hủy bỏ
              </span>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export function ConfirmRemoveProductDetails(props) {
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
            {"Xác nhận xóa phiên bản"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              Bạn có chắc chắc muốn xóa sản phẩm
              <span style={{ fontWeight: "500" }}>{" " + name + " "}</span> và
              danh sách Imei của sản phẩm này ?
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
              <span style={{ fontWeight: "500" }}>{" " + name + " "}</span>?
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
export const ScannerBarcodeOrder = ({ open, close, getResult, refresh }) => {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    setScanning(true);
  }, [refresh]);

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
                  <span className="fs-4 fw-bold">Quét Barcode Đơn Hàng</span>
                </div>
                <div className="mt-4 text-center" style={{}}>
                  {scanning === true && open === true ? (
                    <Barcode />
                  ) : (
                    "Đang chờ ..."
                  )}
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
export const ScannerBarcode = ({ open, close, getResult, refresh }) => {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    setScanning(true);
  }, [refresh]);

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
                  {scanning === true && open === true ? (
                    <Barcode />
                  ) : (
                    "Đang chờ ..."
                  )}
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
export const ModalViewImeiHadBuy = ({ open, close, imeis }) => {
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
              <div className="header-title d-flex justify-content-between">
                <div className="mt-1">
                  <span className="fs-4" style={{ fontWeight: "500" }}>
                    Danh sách IMEI đã bán
                  </span>
                </div>
                <div className="mt-1">
                  <TextField
                    label="Tìm IMEI"
                    onChange={(e) => {
                      // setImei(e.target.value);
                    }}
                    // value={imei}
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
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{item.soImei}</td>
                            <td className="text-center">
                              <div
                                className={
                                  item.trangThai === StatusImei.SOLD
                                    ? "badge-success rounded-pill mx-auto"
                                    : item.trangThai ===
                                      StatusImei.CANCELLED ||
                                      item.trangThai === StatusImei.REFUND
                                      ? "badge-danger rounded-pill mx-auto"
                                      : ""
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
                                  {item.trangThai === StatusImei.SOLD
                                    ? "Đã bán"
                                    : item.trangThai === StatusImei.REFUND
                                      ? "Hoàn trả"
                                      : item.trangThai ===
                                        StatusImei.PENDING_DELIVERY
                                        ? "Chờ giao"
                                        : "Đã hủy"}
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

export function ConfirmRefund({ open, close, confirm, total, size }) {
  const [description, setDescription] = useState("");

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={() => {
          close();
          setDescription("");
        }}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {
            <span className="fs-4 text-dark">
              {"Xác Nhận Hoàn Trả " + size + " Sản Phẩm Với Số Tiền " + total}
            </span>
          }
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
            onClick={() => {
              confirm(description);
              setDescription("");
            }}
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
            onClick={() => {
              close();
              setDescription("");
            }}
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

export function ConfirmRollBack({ open, close, confirm }) {
  const [description, setDescription] = useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const handleGetValueFromInputTextField = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={() => {
          close();
          setDescription("");
        }}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "100px",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {
            <span className="fs-4 text-dark">
              {"Xác Nhận Hoàn Tác Trạng Thái"}
            </span>
          }
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
            onClick={() => {
              if (description !== null && description.trim() === "") {
                handleOpenAlertVariant(
                  "Bạn chưa nhập lí do hoàn tác! ",
                  Notistack.ERROR
                );
              } else {
                confirm(description);
              }
              setDescription("");
            }}
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
            onClick={() => {
              close();
              setDescription("");
            }}
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
export const ModalUpdateProduct = ({
  update,
  open,
  close,
  refresh,
  priceProduct,
  statusProduct,
}) => {
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [priceFormat, setPriceFormat] = useState(
    String(priceProduct)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
  const [status, setStatus] = useState(statusProduct);
  const handleChangePrice = (event) => {
    const value = event.target.value;
    let valueFinal;

    valueFinal = value
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPriceFormat(valueFinal);
  };

  const [selectKey, setSelectKey] = useState(0);
  useEffect(() => {
    setSelectKey((key) => key + 1);
    setStatus(statusProduct);
    setPriceFormat(
      String(priceProduct)
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }, [priceProduct, statusProduct]);

  const updateData = () => {
    const parseNumber = parseFloat(priceFormat.replace(/[^0-9.-]+/g, ""));
    update(parseNumber, status);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          close();
          setStatus(statusProduct);
          setPriceFormat(
            String(priceProduct)
              .replace(/[^0-9]+/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
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
                CẬP NHẬT SẢN PHẨM
              </span>
            </div>
            <div className="mx-auto mt-3" style={{ width: "100%" }}>
              <TextField
                fullWidth
                className="custom"
                label="Đơn giá chung"
                id="outlined-size-small"
                value={priceFormat}
                onChange={handleChangePrice}
              />
            </div>
            <div className="mx-auto mt-3" style={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Trạng Thái
                </InputLabel>
                <SelectMui
                  className="custom"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Trạng Thái"
                  key={selectKey}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={0}>Kinh doanh</MenuItem>
                  <MenuItem value={1}>Chưa kinh doanh</MenuItem>
                  <MenuItem value={2}>Ngừng kinh doanh</MenuItem>
                </SelectMui>
              </FormControl>
            </div>
          </div>
          <div className="mt-4 text-end">
            <Button
              onClick={() => {
                if (priceFormat !== "") {
                  updateData();
                } else {
                  handleOpenAlertVariant("Bạn chưa nhập đơn giá!", "warning");
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
