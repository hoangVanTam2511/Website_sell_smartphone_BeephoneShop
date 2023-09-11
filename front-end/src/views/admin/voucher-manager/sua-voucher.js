import {
  Button,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import {
  Box,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import "../../../assets/scss/addVoucher.scss";
import { Link, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateVoucher = () => {
  let [voucher, setVoucher] = useState({});
  let [ten, setTen] = useState("");
  let [soLuong, setSoLuong] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [giaTriVoucherConvert, setGiaTriVoucherConvert] = useState(0);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  let [giaTriVoucher, setGiaTriVoucher] = useState("");
  let [dieuKienApDung, setDieuKienApDung] = useState(0);
  const [dieuKienApDungConvert, setDieuKienApDungConvert] = useState(0);
  const [validationMsg, setValidationMsg] = useState({});
  const { id } = useParams();
  const [value2, setValue2] = React.useState();
  const [selectDiscount, setSeclectDiscount] = useState("1");
  const [giaTriToiDa, setGiaTriToiDa] = useState(0);
  const [valueToiThieu, setValueToiThieu] = React.useState();
  const [valueToiDa, setValueToiDa] = React.useState();

  const redirectToHienThiVoucher = () => {
    window.location.href = "/voucher";
  };

  const convertTien = () => {
    dieuKienApDung = voucher.dieuKienApDung;
    const numericValue = parseFloat(
      String(dieuKienApDung).replace(/[^0-9.-]+/g, "")
    );
    const fomarttedDieuKien = String(dieuKienApDung)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(numericValue);
    setDieuKienApDung(fomarttedDieuKien);

    giaTriVoucher = voucher.giaTriVoucher;
    const numericValue1 = parseFloat(
      String(giaTriVoucher).replace(/[^0-9.-]+/g, "")
    );
    const formattedValue = String(giaTriVoucher)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(numericValue1);
    setGiaTriVoucher(formattedValue);
  };

  const handleChange = (event) => {
    if (selectDiscount === "1") {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(numericValue);
      setGiaTriVoucherConvert(formattedValue);
    }
    if (selectDiscount === "2") {
      let inputValue = event.target.value;
      // Loại bỏ các ký tự không phải số
      inputValue = inputValue.replace(/\D/g, "");
      // Xử lý giới hạn giá trị từ 1 đến 100
      if (isNaN(inputValue) || inputValue < 1) {
        inputValue = 0;
      } else if (inputValue > 100) {
        inputValue = 100;
      }
      setValue(inputValue);
      setGiaTriVoucherConvert(inputValue);
    }
  };

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(numericValue);
    setDieuKienApDung(formattedValue);
  };

  const handleChangeGiaTriToiDa = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiDa(numericValue);
    setGiaTriToiDa(formattedValue);
  };

  const handleChangeToggleButtonDiscount = (event, newAlignment) => {
    var oldAligment = selectDiscount;

    if (newAlignment != null) {
      setSeclectDiscount(newAlignment);
      setValue2(null);
    }

    if (newAlignment == null) {
      setSeclectDiscount(oldAligment);
    }
  };

  const handleReset = () => {
    setValue("");
    setValueToiDa("");
    setValueToiThieu("");
  };

  useEffect(() => {
    detailVoucher();
    setTen(() => voucher.ten);
    setSoLuong(() => voucher.soLuong);
    setNgayBatDau(() => voucher.ngayBatDau);
    setNgayKetThuc(() => voucher.ngayKetThuc);
    setGiaTriToiDa(() => voucher.giaTriToiDa);
    setSeclectDiscount(() => voucher.loaiVoucher);
    convertTien();
  }, []);

  const detailVoucher = () => {
    axios
      .get(apiURLVoucher + "/get-by-id/" + id)
      .then((response) => {
        convertTien();
        setVoucher(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  };

  let isToastVisible = false;

  const updateVoucher = () => {
    if (isToastVisible) {
      return;
    }

    let obj = {
      ten: ten,
      soLuong: soLuong,
      dieuKienApDung: value1,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      giaTriVoucher: value,
      giaTriToiDa: valueToiDa,
      giaTriToiThieu: valueToiThieu,
      loaiVoucher: selectDiscount,
    };
    axios
      .put(apiURLVoucher + "/updateVoucher/" + id, obj)
      .then((response) => {
        toast.success("Cập Nhật thành công!");
        setTimeout(() => {
          redirectToHienThiVoucher();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Đã xảy ra lỗi khi Cập Nhật voucher.");
      });
  };
  const validationAll = () => {
    const msg = {};
    if (!ten) {
      msg.ten = "Tên không được để trống !!!";
    }

    if (!soLuong) {
      msg.soLuong = "Số lượng không được để trống !!!";
    }

    if (!dieuKienApDungConvert) {
      msg.dieuKienApDungConvert = "Điều kiện áp dụng không được để trống !!!";
    }

    if (ngayBatDau.isAfter(ngayKetThuc)) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (!giaTriVoucherConvert) {
      msg.giaTriVoucherConvert = "Giá trị voucher không được để trống !!!";
    }

    if (ngayKetThuc.isBefore(ngayBatDau)) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu !!!";
    }

    if (ngayBatDau.isBefore(dayjs())) {
      msg.ngayBatDau = "Ngày bắt đầu phải lớn hơn ngày hiện tại !!!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateVoucher();
  };

  return (
    <>
      <div className="add-voucher-container">
        <h5 style={{ marginBottom: "3%" }}>Sửa Voucher</h5>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Tên Voucher"
              value={ten !== "Tên Voucher" ? ten : voucher.ten}
              id="fullWidth"
              onChange={(e) => {
                setTen(e.target.value);
              }}
              style={{ width: "65%" }}
            />
          </div>

          <div className="input-container">
            <TextField
              label="Số Lượng"
              value={soLuong !== "Số Lượng" ? soLuong : voucher.soLuong}
              id="fullWidth"
              onChange={(e) => {
                setSoLuong(e.target.value);
              }}
              style={{ width: "65%" }}
            />

            <span className="validate" style={{ color: "red" }}>
              {validationMsg.soLuong}
            </span>
          </div>
        </div>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Điều Kiện Áp Dụng"
              value={dieuKienApDung}
              onChange={handleChange1}
              id="outlined-start-adornment"
              InputProps={{
                inputMode: "numeric",
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                ),
              }}
              style={{ width: "65%" }}
            />
            <span className="validate" style={{ color: "red" }}>
              {validationMsg.value1}
            </span>
          </div>
          <div className="row-input">
            <div className="select-value">
              <div className="">
                <ToggleButtonGroup
                  color="primary"
                  value={selectDiscount}
                  exclusive
                  onChange={handleChangeToggleButtonDiscount}
                  aria-label="Platform"
                >
                  <ToggleButton
                    style={{
                      height: "55px",
                      borderRadius: "10px",
                      width: "40px",
                    }}
                    value="1"
                    onClick={() => handleReset()}
                  >
                    VND
                  </ToggleButton>
                  <ToggleButton
                    style={{
                      height: "55px",
                      borderRadius: "10px",
                      width: "40px",
                    }}
                    value="2"
                    onClick={() => handleReset()}
                  >
                    %
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="">
                <TextField
                  label="Nhập Giá Trị Voucher"
                  value={giaTriVoucher}
                  onChange={handleChange}
                  id="outlined-start-adornment"
                  InputProps={{
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">
                        {selectDiscount === "1" ? "VND" : "%"}
                      </InputAdornment>
                    ),
                  }}
                  style={{
                    marginLeft: "18px",
                    width: selectDiscount === "1" ? "670px" : "390px",
                  }}
                />
              </div>
              <div className="ms-4">
                <TextField
                  label="Giá Trị Tối Đa:"
                  value={giaTriToiDa}
                  id="outlined-start-adornment"
                  onChange={handleChangeGiaTriToiDa}
                  InputProps={{
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                  }}
                  style={{
                    width: "250px",
                    display: selectDiscount === "2" ? "block" : "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="row-input"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="input-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  ampm={true}
                  disablePast={true}
                  label="Ngày Bắt Đầu"
                  value={dayjs(ngayBatDau)}
                  format="HH:mm DD/MM/YYYY"
                  onChange={(e) => {
                    setNgayBatDau(e);
                  }}
                  sx={{
                    width: "368px",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="input-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  ampm={true}
                  label="Ngày Kết Thúc"
                  value={dayjs(ngayKetThuc)}
                  disablePast={true}
                  format="HH:mm DD/MM/YYYY"
                  onChange={(e) => {
                    setNgayKetThuc(e);
                  }}
                  sx={{
                    width: "368px",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <div className="btn-accept">
          <Button type="primary" onClick={handleSubmit} htmlType="submit">
            <FontAwesomeIcon icon={faCheck} />
            &nbsp; Xác nhận{" "}
          </Button>
          <ToastContainer />
          &nbsp; &nbsp;
          <Link to="/voucher">
            <Button type="primary" htmlType="submit">
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp; Quay Về{" "}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdateVoucher;
