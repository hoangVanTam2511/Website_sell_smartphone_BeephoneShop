import {
  Button,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKhuyenMai } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import "../../../assets/scss/addPromotion.scss";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js

const AddKhuyenMai = () => {
  let [listKhuyenMai, setlistKhuyenMai] = useState([]);
  let [ma, setMa] = useState("");
  let [tenKhuyenMai, setTenKhuyenMai] = useState("");
  let [mucGiamGiaTheoPhanTram, setMucGiamGiaTheoPhanTram] = useState("");
  let [mucGiamGiaTheoSoTien, setMucGiamGiaTheoSoTien] = useState("");
  let [ngayBatDau, setNgayBatDau] = useState(dayjs());
  let [ngayKetThuc, setNgayKetThuc] = useState("");
  let [dieuKienGiamGia, setDieuKienGiamGia] = useState("");

  const redirectToHienThiKhuyenMai = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/khuyen-mai";
  };

  const addKhuyenMai = () => {
    let obj = {
      ma: ma,
      tenKhuyenMai: tenKhuyenMai,
      mucGiamGiaTheoPhanTram: mucGiamGiaTheoPhanTram,
      mucGiamGiaTheoSoTien: mucGiamGiaTheoSoTien,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      dieuKienGiamGia: dieuKienGiamGia,
    };

    axios
      .post(apiURLKhuyenMai + "/add-khuyen-mai", obj)
      .then((response) => {
        // let res = response.data;
        let newKhuyenMaiResponse = {
          ma: ma,
          tenKhuyenMai: tenKhuyenMai,
          mucGiamGiaTheoPhanTram: mucGiamGiaTheoPhanTram,
          mucGiamGiaTheoSoTien: mucGiamGiaTheoSoTien,
          ngayBatDau: ngayBatDau,
          ngayKetThuc: ngayKetThuc,
          dieuKienGiamGia: dieuKienGiamGia,
        };

        setlistKhuyenMai([newKhuyenMaiResponse, ...listKhuyenMai]);
        toast.success("Add success!");
        redirectToHienThiKhuyenMai();
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };

  return (
    <>
      <form>
        <div className="add-promotion-container">
          <h5 className="title-promotion" style={{ marginBottom: "2%" }}>
            Thêm Khuyến Mãi
          </h5>
          <div className="row-input">
            <div className="input-container">
              <TextField
                label="Mã Khuyến Mãi:"
                value={ma}
                id="fullWidth"
                onChange={(e) => {
                  setMa(e.target.value);
                }}
                style={{ marginBottom: "0.1%", width: "25em" }}
              />
            </div>
            <div className="input-container">
              <TextField
                label="Tên Khuyến Mãi:"
                value={tenKhuyenMai}
                id="fullWidth"
                onChange={(e) => {
                  setTenKhuyenMai(e.target.value);
                }}
                style={{ marginBottom: "0.1%", width: "25em" }}
              />
            </div>
          </div>
          <div className="row-input">
            <div className="input-container">
              <TextField
                label="Mức Giảm Giá Theo Phần Trăm:"
                value={mucGiamGiaTheoPhanTram}
                id="fullWidth"
                onChange={(e) => {
                  setMucGiamGiaTheoPhanTram(e.target.value);
                }}
                style={{ marginBottom: "0.1%", width: "25em" }}
              />
            </div>
            <div className="input-container">
              <TextField
                label="Mức Giảm Giá Theo Số Tiền:"
                value={mucGiamGiaTheoSoTien}
                id="fullWidth"
                onChange={(e) => {
                  setMucGiamGiaTheoSoTien(e.target.value);
                }}
                style={{ marginBottom: "0.1%", width: "25em" }}
              />
            </div>
          </div>
          <div className="row-input">
            <div className="input-container">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "25em" },
                }}
                noValidate
                autoComplete="off"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      ampm={true}
                      disablePast={true}
                      label="Ngày Bắt Đầu"
                      value={ngayBatDau}
                      format="HH:mm:ss DD-MM-YYYY"
                      onChange={(e) => {
                        setNgayBatDau(e);
                      }}
                      // error={!!errors.ngayBatDau}
                      // helperText={errors.ngayBatDau}
                    />
                    {/* {errors.ngayBatDau && (
                      <p className="error-message">{errors.ngayBatDau}</p>
                    )} */}
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </div>
            <div className="input-container">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "25em" },
                }}
                noValidate
                autoComplete="off"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      ampm={true}
                      disablePast={true}
                      label="Ngày Kết Thúc"
                      value={ngayKetThuc}
                      format="HH:mm:ss DD-MM-YYYY"
                      onChange={(e) => {
                        setNgayKetThuc(e);
                      }}
                      // error={!!errors.ngayBatDau}
                      // helperText={errors.ngayBatDau}
                    />
                    {/* {errors.ngayBatDau && (
                      <p className="error-message">{errors.ngayBatDau}</p>
                    )} */}
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </div>
          </div>
          <div className="input-container-dieukiengiamgia">
            <TextField
              label="Điều Kiện Giảm Giá:"
              value={dieuKienGiamGia}
              id="fullWidth"
              onChange={(e) => {
                setDieuKienGiamGia(e.target.value);
              }}
              style={{ width: "25em" }}
            />
          </div>
          <div className="btn-accept">
            <Button type="primary" onClick={addKhuyenMai} htmlType="submit">
              Xác nhận{" "}
              <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: "10px" }} />
            </Button>
            &nbsp;&nbsp;
            <Button
              type="primary"
              onClick={redirectToHienThiKhuyenMai}
              htmlType="submit"
            >
              Quay Về{" "}
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ paddingLeft: "10px" }}
              />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddKhuyenMai;
