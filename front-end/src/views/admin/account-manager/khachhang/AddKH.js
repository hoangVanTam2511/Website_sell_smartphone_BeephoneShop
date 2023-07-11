import {
  Button,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
const AddKH = () => {
  let [listKH, setListKH] = useState([]);
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [diaChi, setDiaChi] = useState("");

  const redirectToHienThiKH = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/khach-hang";
  };
  const addKH = () => {
    let obj = {
      hoVaTen: hoVaTen,
      ngaySinh: ngaySinh,
      soDienThoai: soDienThoai,
      diaChi: diaChi,
      email: email,
    };

    axios
      .post(apiURLKH + "/add", obj)
      .then((response) => {
        // let res = response.data;
        let newKhachHangResponse = {
          hoVaTen: hoVaTen,
          ngaySinh: ngaySinh,
          soDienThoai: soDienThoai,
          diaChi: diaChi,
          email: email,
        };

        setListKH([newKhachHangResponse, ...listKH]);
        toast.success("Add success!");
        redirectToHienThiKH();
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };
  return (
    <>
      <h2>Tạo tài khoản khách hàng</h2>
      <div className="text-f">
        <TextField
          label="Họ và tên"
          value={hoVaTen}
          id="fullWidth"
          onChange={(e) => {
            setTen(e.target.value);
          }}
          style={{ maxHeight: "10px", width: "35em" }}
        />
      </div>
      <div className="text-f" style={{ marginBottom: "20px" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35em" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Ngày sinh"
            type="date"
            value={ngaySinh}
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
              setNgaySinh(e.target.value); // Cập nhật giá trị ngaySinh sau khi thay đổi
            }}
          />
        </Box>
      </div>
      <div className="text-f">
        <TextField
          label="Email"
          value={email}
          // id="fullWidth"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{ maxHeight: "15px", width: "35em" }}
        />
      </div>
      <div className="text-f">
        <TextField
          label="Số điện thoại"
          id="fullWidth"
          value={soDienThoai}
          style={{ maxHeight: "15px", width: "35em" }}
          onChange={(e) => {
            setSdt(e.target.value);
          }}
        />
      </div>
      <div className="text-f">
        <TextField
          label="Địa chỉ"
          id="fullWidth"
          value={diaChi}
          onChange={(e) => {
            setDiaChi(e.target.value);
          }}
          style={{ maxHeight: "15px", width: "35em" }}
        />
      </div>
      <Button type="primary" onClick={addKH} htmlType="submit">
        Xác nhận{" "}
        <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: "10px" }} />
      </Button>
    </>
  );
};

export default AddKH;
