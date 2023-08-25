import { Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { Box, InputAdornment } from "@mui/material";
import "../../../assets/scss/addVoucher.scss";
import Swal from "sweetalert2";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty, isBefore, isAfter, equals } from "validator";

const AddVoucher = () => {
  let [ten, setTen] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState(dayjs());
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  const [giaTriVoucher, setGiaTriVoucher] = useState(0);
  const [dieuKienApDung, setDieuKienApDung] = useState(0);
  const [dieuKienApDungConvert, setDieuKienApDungConvert] = useState(0);
  const [soLuong, setSoLuong] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  const [giaTriVoucherConvert, setGiaTriVoucherConvert] = useState(0);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(formattedValue);
    setGiaTriVoucherConvert(numericValue);
  };

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(formattedValue);
    setDieuKienApDungConvert(numericValue);
  };

  const redirectToHienThiVoucher = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/voucher";
  };

  const addVoucher = () => {
    let obj = {
      ten: ten,
      dieuKienApDung: dieuKienApDungConvert,
      soLuong: soLuong,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      giaTriVoucher: giaTriVoucherConvert,
    };
    toast
      .promise(axios.post(apiURLVoucher + "/addVoucher", obj), {
        success: {
          render({ data }) {
            toast.success("Thêm thành công!");
            setTimeout(() => {
              redirectToHienThiVoucher();
            }, 2000);
          },
        },
        error: {
          render({ error }) {
            toast.error("Đã xảy ra lỗi khi thêm voucher.");
          },
        },
      })
      .catch((error) => {});
  };

  const validationAll = () => {
    const msg = {};
    if (isEmpty(ten)) {
      msg.ten = "Không để trống Tên !!!";
    }
    if (isEmpty(value)) {
      msg.value = "Không để trống Giá Trị Voucher !!!";
    }

    if (isEmpty(soLuong)) {
      msg.soLuong = "Không để trống Số Lượng !!!";
    }

    if (isEmpty(value1)) {
      msg.value1 = "Không để trống Điều Kiện Voucher !!!";
    }

    if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (equals(String(ngayBatDau), String(ngayKetThuc))) {
      msg.ngayKetThuc = "Ngày Kết Thúc phải lớn hơn Ngày Bắt Đầu !!!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addVoucher();
  };

  return (
    <>
      <div className="add-voucher-container">
        <h5 style={{ marginBottom: "3%" }}>Thêm Voucher</h5>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Tên Voucher:"
              value={ten}
              id="fullWidth"
              onChange={(e) => {
                setTen(e.target.value);
              }}
              style={{ width: "25em" }}
            />

            <span className="validate" style={{ color: "red" }}>
              {validationMsg.ten}
            </span>
          </div>
          <div className="input-container">
            <TextField
              label="Nhập Giá Trị Voucher"
              value={value}
              onChange={handleChange}
              id="outlined-start-adornment"
              InputProps={{
                inputMode: "numeric",
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                ),
              }}
              style={{ width: "25em" }}
            />
            <span className="validate" style={{ color: "red" }}>
              {validationMsg.value}
            </span>
          </div>
        </div>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Số Lượng:"
              value={soLuong}
              id="fullWidth"
              onChange={(e) => {
                setSoLuong(e.target.value);
              }}
              style={{ width: "25em" }}
            />

            <span className="validate" style={{ color: "red" }}>
              {validationMsg.soLuong}
            </span>
          </div>
          <div className="input-container">
            <TextField
              label="Điều Kiện Áp Dụng:"
              value={value1}
              onChange={handleChange1}
              id="outlined-start-adornment"
              InputProps={{
                inputMode: "numeric",
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                ),
              }}
              style={{ width: "25em" }}
            />
            <span className="validate" style={{ color: "red" }}>
              {validationMsg.value1}
            </span>
          </div>
        </div>
        <div className="row-input">
          <div className="input-container">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "25em" },
              }}
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    ampm={true}
                    disablePast={true}
                    label="Ngày Bắt Đầu"
                    format="HH:mm DD/MM/YYYY"
                    value={ngayBatDau}
                    onChange={(e) => {
                      setNgayBatDau(e);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <span className="validate" style={{ color: "red" }}>
              {validationMsg.ngayBatDau}
            </span>
          </div>
          <div className="input-container">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "25em" },
              }}
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    ampm={true}
                    label="Ngày Kết Thúc"
                    value={ngayKetThuc}
                    format="HH:mm DD/MM/YYYY"
                    disablePast={true}
                    onChange={(e) => {
                      setNgayKetThuc(e);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <span className="validate" style={{ color: "red" }}>
              {validationMsg.ngayKetThuc}
            </span>
          </div>
        </div>

        <div className="btn-accept">
          <Button type="primary" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCheck} />
            &nbsp; Xác nhận{" "}
          </Button>
          <ToastContainer />
          &nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              redirectToHienThiVoucher();
            }}
            htmlType="submit"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp; Quay Về{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddVoucher;
