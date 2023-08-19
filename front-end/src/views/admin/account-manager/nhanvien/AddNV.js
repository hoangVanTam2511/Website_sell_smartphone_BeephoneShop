import { Button, Card, Modal } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  Box,
  FormControl,
  FormControlLabel,
  // FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressForm from "./DiaChi";
import ImageUploadComponent from "./Anh";
import IDScan from "./QuetCanCuoc";
// import Haha from "./DiaChi.hah";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
const AddNV = () => {
  let [listKH, setListKH] = useState([]);
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [diaChi, setDiaChi] = useState("");
  let [cccd, setCCCD] = useState("");
  let [anhDaiDien, setAnhDaiDien] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleScanData = (data) => {
    if (data) {
      setTen(data.hoVaTen);
      setNgaySinh(data.ngaySinh);
      setDiaChi(data.diaChi);
      setTinhThanhPho(data.tinhThanhPho);
      setXaPhuong(data.xaPhuong);
      setCCCD(data.cccd);
      setGioiTinh(data.gioiTinh);
      console.log(data);
    }
    // setIsScanning(false); // Ẩn modal sau khi quét xong
  };
  const handleProvinceChange = (value) => {
    setTinhThanhPho(value);
    console.log("Selected Province:", value);
  };

  const handleDistrictChange = (value) => {
    setQuanHuyen(value);
    // Truyền thông tin quận/huyện vào component khác (ở đây ví dụ là console.log)
    console.log("Selected District:", value);
  };

  const handleWardChange = (value) => {
    setXaPhuong(value);
    // Truyền thông tin xã vào component khác (ở đây ví dụ là console.log)
    console.log("Selected Ward:", value);
  };
  const handleDiaChiChange = (result) => {
    setDiaChi(result); // Cập nhật giá trị diaChi trong thành phần cha
  };
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  const redirectToHienThiKH = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/nhan-vien";
  };
  const showConfirm = () => {
    setIsConfirmVisible(true); // Mở hộp thoại xác nhận
  };

  const handleCancel = () => {
    setIsConfirmVisible(false); // Đóng hộp thoại xác nhận khi người dùng hủy
  };
  const AddNV = () => {
    setSubmitted(true);
    setFormSubmitted(true);
    let obj = {
      hoVaTen: hoVaTen,
      ngaySinh: ngaySinh,
      soDienThoai: soDienThoai,
      xaPhuong: xaPhuong,
      quanHuyen: quanHuyen,
      tinhThanhPho: tinhThanhPho,
      gioiTinh: gioiTinh,
      diaChi: diaChi,
      email: email,
      anhDaiDien: anhDaiDien,
      canCuocCongDan: cccd,
    };
    if (!hoVaTen || !ngaySinh || !email || !soDienThoai || !diaChi) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return; // Stop form submission if any required field is empty
    }
    axios
      .post(apiURLNV + "/add", obj)
      .then((response) => {
        // let res = response.data;
        let newKhachHangResponse = {
          hoVaTen: hoVaTen,
          ngaySinh: ngaySinh,
          soDienThoai: soDienThoai,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          gioiTinh: gioiTinh,
          diaChi: diaChi,
          email: email,
          anhDaiDien: anhDaiDien,
          canCuocCongDan: cccd,
        };

        setListKH([newKhachHangResponse, ...listKH]);
        toast.info("Add success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        redirectToHienThiKH();
      })
      .catch((error) => {
        alert("Thêm thất bại");
        console.log(error);
      });
  };
  return (
    <>
      <Card bordered={false} style={{ width: "100%" }}>
        <h3
          style={{
            color: "gray",
            textAlign: "center",
            marginBottom: "30px",
            marginLeft: "40px",
          }}
        >
          Tạo tài khoản nhân viên{" "}
          <span style={{ float: "right", fontSize: "20px" }}>
            <IDScan onScanData={handleScanData} />
          </span>
        </h3>

        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              <ImageUploadComponent
                setAnhDaiDien={handleAnhDaiDienChange}
                hoten={hoVaTen}
              />
            </div>
          </Grid>
          <Grid item xs={10}>
            {" "}
            <div style={{ width: "75%", marginLeft: "30px" }}>
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
                  error={formSubmitted && !hoVaTen}
                  helperText={formSubmitted && !hoVaTen && "Họ và tên trống"}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="text-f"
                  style={{
                    textAlign: "center",
                    marginBottom: "15px",
                    width: "60%",
                  }}
                >
                  {/* Ngày sinh */}
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        mt: 2,
                        mb: 2,
                        width: "100%",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      label="Ngày sinh"
                      type="date"
                      value={ngaySinh}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setNgaySinh(e.target.value); // Cập nhật giá trị ngaySinh sau khi thay đổi
                      }}
                      error={formSubmitted && !ngaySinh} // Show error if form submitted and hoVaTen is empty
                      helperText={
                        formSubmitted && !ngaySinh && "Ngày sinh trống"
                      }
                    />
                  </Box>
                </div>
                <div
                  className="text-f"
                  style={{
                    marginBottom: "15px",
                    marginLeft: "50px",
                  }}
                >
                  {/* Giới tính */}
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gioiTinh"
                      name="gioiTinh"
                      value={gioiTinh}
                      onChange={(e) => {
                        setGioiTinh(e.target.value === "true"); // Convert the string to a boolean value
                      }}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio style={{ borderRadius: "50%" }} />} // Add border radius to the radio button
                        label="Nam"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio style={{ borderRadius: "50%" }} />} // Add border radius to the radio button
                        label="Nữ"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Email"
                  value={email}
                  // id="fullWidth"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={formSubmitted && !email} // Show error if form submitted and hoVaTen is empty
                  helperText={formSubmitted && !email && "Email trống"}
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Căn cước công dân"
                  value={cccd}
                  // id="fullWidth"
                  onChange={(e) => {
                    setCCCD(e.target.value);
                  }}
                  error={formSubmitted && !cccd} // Show error if form submitted and hoVaTen is empty
                  helperText={formSubmitted && !cccd && "CCCD trống"}
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Số điện thoại"
                  id="fullWidth"
                  value={soDienThoai}
                  onChange={(e) => {
                    setSdt(e.target.value);
                  }}
                  error={formSubmitted && !soDienThoai} // Show error if form submitted and hoVaTen is empty
                  helperText={
                    formSubmitted && !soDienThoai && "Số điện thoại trống"
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Địa chỉ"
                  id="fullWidth"
                  value={diaChi}
                  onChange={(e) => {
                    setDiaChi(e.target.value);
                  }}
                  error={formSubmitted && !diaChi} // Show error if form submitted and hoVaTen is empty
                  helperText={formSubmitted && !diaChi && "Địa chỉ trống"}
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="text-f"
                style={{
                  marginBottom: "30px",
                }}
              >
                <AddressForm
                  onDiaChiChange={handleDiaChiChange}
                  required={true}
                  submitted={submitted}
                  onProvinceChange={handleProvinceChange}
                  onDistrictChange={handleDistrictChange}
                  onWardChange={handleWardChange}
                  tinhThanhPho={handleScanData.tinhThanhPho}
                  // provinces={provinces}
                  // districts={districts}
                  // wards={wards}
                />
                {/* <Haha onDiaChiChange={handleDiaChiChange} /> */}
              </div>
            </div>
          </Grid>

          {/* Right column */}
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={showConfirm}
            htmlType="submit"
            size="large"
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ paddingRight: "5px" }}
            />
            Xác nhận{" "}
          </Button>
          <Modal
            title="Xác nhận"
            open={isConfirmVisible}
            icon={<FontAwesomeIcon icon={faExclamationCircle} size="3px" />}
            onOk={AddNV}
            onCancel={handleCancel}
          >
            <p>Bạn có chắc chắn muốn tạo tài khoản nhân viên?</p>
          </Modal>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Card>
    </>
  );
};

export default AddNV;
