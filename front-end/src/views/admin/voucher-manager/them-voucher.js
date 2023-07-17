import {
  Button,
  Select,
  Col,
  Row,
  Input,
  message,
  Upload,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

const AddVoucher = () => {
  let [listVoucher, setListVoucher] = useState([]);
  let [ma, setMa] = useState("");
  let [ten, setTen] = useState("");
  let [ngayBatDau, setNgayBatDau] = useState("");
  let [ngayKetThuc, setNgayKetThuc] = useState("");
  let [giaTriVoucher, setGiaTriVoucher] = useState("");
  let [trangThai, setTrangThai] = useState("");

  const redirectToHienThiVoucher = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/voucher";
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleTrangThaiChange = (event) => {
    setTrangThai(event.target.value);
  };

  const addVoucher = () => {
    let obj = {
      ma: ma,
      ten: ten,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      giaTriVoucher: giaTriVoucher,
      trangThai: trangThai,
    };

    axios
      .post(apiURLVoucher + "/addVoucher", obj)
      .then((response) => {
        // let res = response.data;
        let newVoucherResponse = {
          ma: ma,
          ten: ten,
          ngayBatDau: ngayBatDau,
          ngayKetThuc: ngayKetThuc,
          giaTriVoucher: giaTriVoucher,
          trangThai: trangThai,
        };

        setListVoucher([newVoucherResponse, ...listVoucher]);
        toast.success("Add success!");
        redirectToHienThiVoucher();
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
          label="Mã Voucher:"
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
          label="Tên Voucher:"
          value={ten}
          id="fullWidth"
          onChange={(e) => {
            setTen(e.target.value);
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
          label="Giá Trị Voucher:"
          value={giaTriVoucher}
          id="fullWidth"
          onChange={(e) => {
            setGiaTriVoucher(e.target.value);
          }}
          style={{ marginBottom: "0.1%", width: "35em" }}
        />
      </div>
      <div className="text-f">
        <Select
          defaultValue="Vui Lòng Chọn Trạng Thái"
          style={{ width: 300 }}
          onChange={handleChange}
          options={[
            {
              label: "Trạng Thái",
              options: [
                { label: "Còn Hiệu Lực", value: "1" },
                { label: "Hết Hiệu Lực", value: "2" },
              ],
            },
          ]}
        />
      </div>
      <div style={{ marginBottom: "0.1%" }}>
        <Button type="primary" onClick={addVoucher} htmlType="submit">
          Xác nhận{" "}
          <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: "10px" }} />
        </Button>
      </div>
    </>
  );
};

export default AddVoucher;
