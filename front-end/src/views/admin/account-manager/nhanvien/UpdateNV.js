import { Button, Card, Modal } from "antd";
import React, { useEffect } from "react"; // , { useEffect }
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import ImageUploadComponent from "./AnhUpdate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import AddressFormUpdate from "./DiaChiUpdate";
const UpdateNV = () => {
  const { id } = useParams();
  let [listNV, setListNV] = useState([]);
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
  let [ma, setMa] = useState("");
  let [matKhau, setMatKhau] = useState("");
  let [trangThai, setTrangThai] = useState(1);
  let [anhDaiDien, setAnhDaiDien] = useState("");
  let [editing, setEditing] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const showConfirm = () => {
    setIsConfirmVisible(true); // Mở hộp thoại xác nhận
  };

  const handleCancel = () => {
    setIsConfirmVisible(false); // Đóng hộp thoại xác nhận khi người dùng hủy
  };
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    getKHById(id);
  }, [id]);
  const getKHById = (id) => {
    axios
      .get(apiURLNV + `/hien-thi-theo/${id}`)
      .then((response) => {
        const data = response.data;
        setMa(data.ma);
        setCCCD(data.canCuocCongDan);
        setGioiTinh(data.gioiTinh);
        setTen(data.hoVaTen);
        setNgaySinh(data.ngaySinh);
        setMatKhau(data.matKhau);
        setTrangThai(data.trangThai);
        setAnhDaiDien(data.anhDaiDien);
        setEmail(data.email);
        setSdt(data.soDienThoai);
        setDiaChi(data.diaChi);
        setXaPhuong(data.xaPhuong);
        setQuanHuyen(data.quanHuyen);
        setTinhThanhPho(data.tinhThanhPho);
      })
      .catch((error) => {
        console.error("Error fetching customer information:", error);
      });
  };
  const handleProvinceChange = (value) => {
    setTinhThanhPho(value);
  };

  const handleDistrictChange = (value) => {
    setQuanHuyen(value);
  };

  const handleWardChange = (value) => {
    setXaPhuong(value);
  };
  const handleDiaChiChange = (diaChi) => {
    setDiaChi(diaChi); // Cập nhật giá trị diaChi trong thành phần cha
  };
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  const save = async (id) => {
    try {
      const updatedItem = {
        ma: ma,
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
        trangThai: trangThai,
        matKhau: matKhau,
      };

      axios
        .put(`${apiURLNV}/update/${id}`, updatedItem)
        .then((response) => {
          if (response.status === 200) {
            setIsConfirmVisible(false);
            toast.success("Customer information updated successfully!");
          } else {
            // Show an error message using react-toastify
            toast.error("Failed to update customer information.");
          }
        })
        .catch((error) => {
          console.error("Failed to update customer information:", error);

          // Show an error message using react-toastify
          toast.error("An error occurred while updating customer information.");
        });
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
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
          Tài khoản nhân viên{" "}
        </h3>

        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                // marginLeft: "10px",
              }}
            >
              <ImageUploadComponent
                setAnhDaiDien={handleAnhDaiDienChange}
                existingImageUrl={anhDaiDien}
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
                <AddressFormUpdate
                  onDiaChiChange={handleDiaChiChange}
                  required={true}
                  submitted={submitted}
                  onProvinceChange={handleProvinceChange}
                  onDistrictChange={handleDistrictChange}
                  onWardChange={handleWardChange}
                  selectedTinhThanhPho={tinhThanhPho}
                  selectedQuanHuyen={quanHuyen}
                  selectedXaPhuong={xaPhuong}
                  editing={editing}
                />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button type="primary" onClick={showConfirm} size={"large"}>
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      style={{ paddingRight: "5px" }}
                    />
                    Lưu Nhân Viên{" "}
                  </Button>
                  <Modal
                    title="Xác nhận"
                    open={isConfirmVisible}
                    onOk={() => save(id)}
                    onCancel={handleCancel}
                  >
                    <p>Bạn có chắc chắn muốn lưu nhân viên?</p>
                  </Modal>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

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

export default UpdateNV;
