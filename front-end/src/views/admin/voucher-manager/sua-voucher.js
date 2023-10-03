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
import { InputAdornment } from "@mui/material";
import "../voucher-manager/style.css";
import { Link, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/joy/Box";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";

const UpdateVoucher = () => {
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [soLuong, setSoLuong] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  // const [giaTriVoucherConvert, setGiaTriVoucherConvert] = useState(0);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  const [giaTriVoucher, setGiaTriVoucher] = useState(0);
  const [dieuKienApDung, setDieuKienApDung] = useState(0);
  const [validationMsg, setValidationMsg] = useState({});
  const { id } = useParams();
  const [selectDiscount, setSelectDiscount] = useState("");
  const [giaTriToiDa, setGiaTriToiDa] = useState(0);
  const [valueToiDa, setValueToiDa] = React.useState();

  const redirectToHienThiVoucher = () => {
    window.location.href = "/dashboard/voucher";
  };

  const handleChange = (event) => {
    if (selectDiscount === "VNĐ") {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(formattedValue);
      setGiaTriVoucher(numericValue);
    }
    if (selectDiscount === "%") {
      let inputValue = event.target.value;
      // Loại bỏ các ký tự không phải số
      inputValue = inputValue.replace(/\D/g, "");
      // Xử lý giới hạn giá trị từ 1 đến 100
      if (isNaN(inputValue) || inputValue < 1) {
        inputValue = "0";
      } else if (inputValue > 100) {
        inputValue = "100";
      }
      setValue(inputValue);
      setGiaTriVoucher(inputValue);
    }
  };

  const detailVoucher = async () => {
    try {
      const response = await axios.get(apiURLVoucher + "/get-by-id/" + id);
      setMa(response.data.ma);
      setTen(response.data.ten);
      setSoLuong(response.data.soLuong);
      setNgayBatDau(response.data.ngayBatDau);
      setNgayKetThuc(response.data.ngayKetThuc);
      setValueToiDa(response.data.giaTriToiDa);
      setValue1(response.data.dieuKienApDung);
      setValue(response.data.giaTriVoucher);
      setSelectDiscount(response.data.loaiVoucher);
      convertTien(
        response.data.dieuKienApDung,
        response.data.giaTriVoucher,
        response.data.giaTriToiDa
      );
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(formattedValue);
    setDieuKienApDung(numericValue);
  };

  const handleChangeGiaTriToiDa = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiDa(formattedValue);
    setGiaTriToiDa(numericValue);
  };

  const handleChangeToggleButtonDiscount = (event) => {
    const newAlignment = event.target.value;
    if (newAlignment != null) {
      setSelectDiscount(newAlignment);
    }

    if (newAlignment == null) {
      setSelectDiscount(null);
    }
    handleReset();
  };

  const handleReset = () => {
    setValue("");
    setValueToiDa("");
  };

  const convertTien = (value1, value, valueToiDa) => {
    const numericValue = parseFloat(String(value1).replace(/[^0-9.-]+/g, ""));
    const fomarttedDieuKien = String(value1)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(fomarttedDieuKien);
    setDieuKienApDung(numericValue);

    const numericValue1 = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
    const formattedValue1 = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(formattedValue1);
    setGiaTriVoucher(numericValue1);

    const numericValue2 = parseFloat(
      String(valueToiDa).replace(/[^0-9.-]+/g, "")
    );
    const formattedValue2 = String(valueToiDa)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiDa(formattedValue2);
    setGiaTriToiDa(numericValue2);
  };

  useEffect(() => {
    convertTien();
    detailVoucher();
  }, []);

  let isToastVisible = false;

  const updateVoucher = () => {
    if (isToastVisible) {
      return;
    }

    let obj = {
      ma: ma,
      ten: ten,
      soLuong: soLuong,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      dieuKienApDung: dieuKienApDung,
      giaTriVoucher: giaTriVoucher,
      giaTriToiDa: giaTriToiDa,
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
    if (!ten.trim("")) {
      msg.ten = "Tên không được để trống !!!";
    }

    if (/^\s+|\s+$/.test(ten)) {
      msg.ten = "Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi";
    }
    if (soLuong == null || soLuong === "") {
      msg.soLuong = "Số lượng không được để trống !!!";
    }
    if (/^\s+|\s+$/.test(soLuong)) {
      msg.soLuong = "Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi";
    }

    if (soLuong <= 0 || soLuong > 10000) {
      msg.soLuong = "Số lượng cho phép từ 1 đến 10000";
    }

    const numericValue1 = parseFloat(value1?.replace(/[^0-9.-]+/g, ""));
    if (value1 == null || value1 === "") {
      msg.value1 = "Điều kiện áp dụng không được để trống !!!";
    }

    if (numericValue1 <= 0 || numericValue1 > 100000000) {
      msg.value1 = "Điều kiện áp dụng từ 1đ đến 100.000.000đ";
    }

    // if (ngayBatDau.isAfter(ngayKetThuc)) {
    //   msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
    // }

    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    if (value == null || value === "") {
      msg.value = "Giá trị voucher không được trống !!!";
    }

    if (
      (selectDiscount === "VNĐ" && numericValue2 <= 0) ||
      (selectDiscount === "VNĐ" && numericValue2 > 100000000)
    ) {
      msg.value = "Giá trị voucher từ 1đ đến 100.000.000đ";
    }

    const numericValue3 = parseFloat(valueToiDa?.replace(/[^0-9.-]+/g, ""));
    if (
      (selectDiscount === "%" && valueToiDa === null) ||
      (selectDiscount === "%" && valueToiDa === "")
    ) {
      msg.valueToiDa = "Giá trị tối đa không được để trống !!!";
    }

    if (
      (selectDiscount === "%" && numericValue3 <= 0) ||
      (selectDiscount === "%" && numericValue3 > 100000000)
    ) {
      msg.valueToiDa = "Giá trị tối đa từ 1đ đến 100.000.000đ";
    }
    // if (ngayKetThuc.isBefore(ngayBatDau)) {
    //   msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu !!!";
    //   msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
    // }

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
      <div className="add-voucher-container mt-4">
        <h4
          style={{
            marginBottom: "20px",
            marginLeft: "40px",
            marginTop: "15px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Sửa Voucher
        </h4>

        <div className="text-center">
          <div
            className="d-flex"
            style={{ marginLeft: "40px", marginBottom: "15px" }}
          >
            <div>
              <TextField
                label="Mã Voucher"
                placeholder="Mã tự động "
                value={ma}
                id="fullWidth"
                onChange={(e) => {
                  setMa(e.target.value);
                }}
                style={{ width: "300px" }}
                inputProps={{
                  maxLength: 100, // Giới hạn tối đa 10 ký tự
                }}
              />
              <span className="validate" style={{ color: "red" }}>
                {validationMsg.ten}
              </span>
            </div>
            <div className="ms-3">
              <TextField
                label="Tên Voucher"
                value={ten}
                id="fullWidth"
                onChange={(e) => {
                  setTen(e.target.value);
                }}
                style={{ width: "300px" }}
                inputProps={{
                  maxLength: 100, // Giới hạn tối đa 10 ký tự
                }}
              />
              <span className="validate" style={{ color: "red" }}>
                {validationMsg.ten}
              </span>
            </div>
          </div>
          <div
            className="d-flex"
            style={{ marginLeft: "40px", marginBottom: "15px" }}
          >
            <div>
              <TextField
                label="Số Lượng"
                value={soLuong}
                id="fullWidth"
                onChange={(e) => {
                  setSoLuong(e.target.value);
                }}
                style={{ width: "300px" }}
                inputProps={{
                  maxLength: 10, // Giới hạn tối đa 10 ký tự
                }}
              />
              <span className="validate" style={{ color: "red" }}>
                {validationMsg.soLuong}
              </span>
            </div>
            <div className="ms-3">
              {" "}
              <TextField
                label="Điều kiện áp dụng khi đơn hàng đạt"
                value={value1}
                onChange={handleChange1}
                id="outlined-start-adornment"
                InputProps={{
                  inputMode: "numeric",
                  startAdornment: (
                    <InputAdornment position="start">VND</InputAdornment>
                  ),
                }}
                style={{ width: "300px" }}
                inputProps={{
                  maxLength: 20, // Giới hạn tối đa 10 ký tự
                }}
              />
              <span className="validate" style={{ color: "red" }}>
                {validationMsg.value1}
              </span>
            </div>
          </div>

          <div className="d-flex" style={{ marginLeft: "40px" }}>
            <div>
              <RadioGroup
                orientation="horizontal"
                aria-label="Alignment"
                name="alignment"
                variant="outlined"
                value={selectDiscount}
                onChange={handleChangeToggleButtonDiscount}
                sx={{ borderRadius: "12px" }}
              >
                {["VNĐ", "%"].map((item) => (
                  <Box
                    key={item}
                    sx={(theme) => ({
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 55,
                      height: 54,
                      "&:not([data-first-child])": {
                        borderLeft: "1px solid",
                        borderdivor: "divider",
                      },
                      [`&[data-first-child] .${radioClasses.action}`]: {
                        borderTopLeftRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                        borderBottomLeftRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                      },
                      [`&[data-last-child] .${radioClasses.action}`]: {
                        borderTopRightRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                        borderBottomRightRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                      },
                    })}
                  >
                    <Radio
                      value={item}
                      disableIcon
                      overlay
                      label={[item]}
                      variant={selectDiscount === item ? "solid" : "plain"}
                      slotProps={{
                        input: { "aria-label": item },
                        action: {
                          sx: { borderRadius: 0, transition: "none" },
                        },
                        label: { sx: { lineHeight: 0 } },
                      }}
                    />
                  </Box>
                ))}
              </RadioGroup>
            </div>
            <div className="ms-3">
              <TextField
                label="Nhập Giá Trị Voucher"
                value={value}
                onChange={handleChange}
                id="outlined-start-adornment"
                InputProps={{
                  inputMode: "numeric",
                  startAdornment: (
                    <InputAdornment position="start">
                      {selectDiscount === "VNĐ" ? "VND" : "%"}
                    </InputAdornment>
                  ),
                }}
                style={{
                  width: "235.5px",
                }}
                inputProps={{
                  maxLength: 20, // Giới hạn tối đa 10 ký tự
                }}
              />
              <span
                className="validate"
                style={{
                  color: "red",
                }}
              >
                {validationMsg.value}
              </span>
            </div>
            <div className="ms-3">
              <TextField
                label="Giá Trị Tối Đa"
                value={valueToiDa}
                id="outlined-start-adornment"
                onChange={handleChangeGiaTriToiDa}
                InputProps={{
                  inputMode: "numeric",
                  startAdornment: (
                    <InputAdornment position="start">VND</InputAdornment>
                  ),
                }}
                disabled={selectDiscount === "VNĐ" ? true : false}
                style={{
                  width: "235.5px",
                }}
                inputProps={{
                  maxLength: 20, // Giới hạn tối đa 10 ký tự
                }}
              />
              <span
                className="validate"
                style={{
                  color: "red",
                }}
              >
                {validationMsg.valueToiDa}
              </span>
            </div>
          </div>
          <div className="d-flex" style={{ marginLeft: "40px" }}>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    ampm={true}
                    disablePast={true}
                    label="Ngày Bắt Đầu"
                    format="HH:mm DD/MM/YYYY"
                    value={dayjs(ngayBatDau)}
                    onChange={(e) => {
                      setNgayBatDau(e);
                    }}
                    sx={{ width: "295px" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span className="validate-date" style={{ color: "red" }}>
                {validationMsg.ngayBatDau}
              </span>
            </div>
            <div className="ms-4" style={{ marginLeft: "15px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    ampm={true}
                    label="Ngày Kết Thúc"
                    value={dayjs(ngayKetThuc)}
                    format="HH:mm DD/MM/YYYY"
                    disablePast={true}
                    onChange={(e) => {
                      setNgayKetThuc(e);
                    }}
                    sx={{ width: "295px" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span className="validate-date" style={{ color: "red" }}>
                {validationMsg.ngayKetThuc}
              </span>
            </div>
          </div>
        </div>
        <div className="btn-accept mt-3">
          <Button
            className="rounded-2 button-mui"
            type="primary"
            style={{ height: "35px", width: "120px", fontSize: "15px" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            <ToastContainer />
            <FontAwesomeIcon icon={faCheck} />
            <span
              className="ms-2 ps-1"
              style={{ marginBottom: "3px", fontWeight: "500" }}
            >
              Xác nhận
            </span>
          </Button>
          <Button
            className="rounded-2 button-mui ms-2"
            type="primary"
            style={{ height: "35px", width: "120px", fontSize: "15px" }}
            onClick={() => {
              redirectToHienThiVoucher();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span
              className="ms-2 ps-1"
              style={{ marginBottom: "3px", fontWeight: "500" }}
            >
              Quay về
            </span>
          </Button>
        </div>
      </div>
      {/* <div className="add-voucher-container">
        
        
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
          <Link to="/dashboard/voucher">
            <Button type="primary" htmlType="submit">
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp; Quay Về{" "}
            </Button>
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default UpdateVoucher;
