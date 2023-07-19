import {
  Button,
  Card,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
const AddNV = () => {
  let [listNhanVien, setListNhanVien] = useState([]);
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [diaChi, setDiaChi] = useState("");

  const redirectToHienThiNV = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/nhan-vien";
  };
  const addNhanVien = () => {
    let obj = {
      hoVaTen: hoVaTen,
      ngaySinh: ngaySinh,
      soDienThoai: soDienThoai,
      diaChi: diaChi,
      email: email,
    };

    axios
      .post(apiURLNV + "/add", obj)
      .then((response) => {
        // let res = response.data;
        let newNhanVienResponse = {
          hoVaTen: hoVaTen,
          ngaySinh: ngaySinh,
          soDienThoai: soDienThoai,
          diaChi: diaChi,
          email: email,
        };

        setListNhanVien([newNhanVienResponse, ...listNhanVien]);
        toast.success("Add success!");
        redirectToHienThiNV();
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };
  return (
    <>
      <Card
        bordered={false}
        style={{
          width: "100%",
        }}
      >
        <h3
          style={{ color: "gray", textAlign: "center", marginBottom: "20px" }}
        >
          Tạo tài khoản nhân viên
        </h3>
        <div
          className="text-f"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <TextField
            label="Họ và tên"
            value={hoVaTen}
            id="fullWidth"
            onChange={(e) => {
              setTen(e.target.value);
            }}
            style={{ maxHeight: "10px", width: "40em" }}
          />
        </div>
        <div
          className="text-f"
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "15px",
          }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40em" },
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
        <div
          className="text-f"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <TextField
            label="Email"
            value={email}
            // id="fullWidth"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ width: "40em" }}
          />
        </div>
        <div
          className="text-f"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <TextField
            label="Số điện thoại"
            id="fullWidth"
            value={soDienThoai}
            style={{ width: "40em" }}
            onChange={(e) => {
              setSdt(e.target.value);
            }}
          />
        </div>
        <div
          className="text-f"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <TextField
            label="Địa chỉ"
            id="fullWidth"
            value={diaChi}
            onChange={(e) => {
              setDiaChi(e.target.value);
            }}
            style={{ width: "40em" }}
          />
        </div>
        <div style={{ textAlign: "center", paddingLeft: "32em" }}>
          <Button type="primary" onClick={addNhanVien} htmlType="submit">
            Xác nhận{" "}
            <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: "10px" }} />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddNV;
