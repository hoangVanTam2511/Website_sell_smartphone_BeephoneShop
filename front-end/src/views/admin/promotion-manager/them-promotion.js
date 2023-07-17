import {
  Button,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKhuyenMai } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { toast } from "react-toastify";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const AddKhuyenMai = () => {
  let [listKhuyenMai, setlistKhuyenMai] = useState([]);
  let [ma, setMa] = useState("");
  let [tenKhuyenMai, setTenKhuyenMai] = useState("");
  let [mucGiamGiaTheoPhanTram, setMucGiamGiaTheoPhanTram] = useState("");
  let [mucGiamGiaTheoSoTien, setMucGiamGiaTheoSoTien] = useState("");
  let [ngayBatDau, setNgayBatDau] = useState("");
  let [ngayKetThuc, setNgayKetThuc] = useState("");
  let [dieuKienGiamGia, setDieuKienGiamGia] = useState("");
  let [trangThai, setTrangThai] = useState("");

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
      trangThai: trangThai,
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
          trangThai: trangThai,
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
      <h2 style={{ marginBottom: "2%" }}>Thêm Voucher</h2>
      <div className="text-f">
        <TextField
          label="Mã Khuyến Mãi:"
          value={ma}
          id="fullWidth"
          onChange={(e) => {
            setMa(e.target.value);
          }}
          style={{ marginBottom: "0.1%", width: "35em" }}
        />
      </div>
      <div className="text-f">
        <TextField
          label="Tên Khuyến Mãi:"
          value={tenKhuyenMai}
          id="fullWidth"
          onChange={(e) => {
            setTenKhuyenMai(e.target.value);
          }}
          style={{ marginBottom: "0.1%", width: "35em" }}
        />
      </div>
      <div className="text-f">
        <TextField
          label="Mức Giảm Giá Theo Phần Trăm:"
          value={mucGiamGiaTheoPhanTram}
          id="fullWidth"
          onChange={(e) => {
            setMucGiamGiaTheoPhanTram(e.target.value);
          }}
          style={{ marginBottom: "0.1%", width: "35em" }}
        />
      </div>
      <div className="text-f">
        <TextField
          label="Mức Giảm Giá Theo Số Tiền:"
          value={mucGiamGiaTheoSoTien}
          id="fullWidth"
          onChange={(e) => {
            setMucGiamGiaTheoSoTien(e.target.value);
          }}
          style={{ marginBottom: "0.1%", width: "35em" }}
        />
      </div>
      <div className="text-f">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35em" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Ngày Bắt Đầu:"
            type="date"
            value={ngayBatDau}
            format="YYYY-MM-DD"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
              },
            }}
            onChange={(e) => {
              setNgayBatDau(e.target.value);
            }}
          />
        </Box>
      </div>
      <div className="text-f">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35em" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Ngày Kết Thúc:"
            type="date"
            value={ngayKetThuc}
            format="YYYY-MM-DD"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              style: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
              },
            }}
            onChange={(e) => {
              setNgayKetThuc(e.target.value);
            }}
          />
        </Box>
      </div>
      <div className="text-f">
        <TextField
          label="Điều Kiện Giảm Giá:"
          value={dieuKienGiamGia}
          id="fullWidth"
          onChange={(e) => {
            setDieuKienGiamGia(e.target.value);
          }}
          style={{ marginBottom: "0.1%", width: "35em" }}
        />
      </div>
      <div className="text-f">
        <FormControl component="fieldset">
          <FormLabel component="legend">Trạng Thái Voucher:</FormLabel>
          <RadioGroup
            row
            aria-label="trạng thái voucher"
            name="trangThai"
            value={trangThai}
            onChange={(e) => {
              setTrangThai(e.target.value);
            }}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Còn Hiệu Lực"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Hết Hiệu Lực"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ marginBottom: "0.1%" }}>
        <Button type="primary" onClick={addKhuyenMai} htmlType="submit">
          Xác nhận{" "}
          <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: "10px" }} />
        </Button>
      </div>
    </>
  );
};

export default AddKhuyenMai;
