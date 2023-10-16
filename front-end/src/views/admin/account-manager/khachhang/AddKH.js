import { Button, Modal, Card, message } from "antd";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressForm from "./DiaChi";
import ImageUploadComponent from "./Anh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
const AddKH = () => {
  let [listKH, setListKH] = useState([]);
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [anhDaiDien, setAnhDaiDien] = useState("");
  let [hoTenKH, setHoTenKH] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [diaChi, setDiaChi] = useState("");
  let [soDienThoaiKhachHang, setSoDienThoaiKhachHang] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [trangThaiKH, setTrangThaiKH] = useState(1);
  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      soDienThoaiKhachHang: "",
      hoTenKH: "",
      account: "",
      id: "",
      trangThaiKH: "",
    },
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hoVaTenError, setHoVaTenError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtError, setSDTError] = useState("");
  const [sdtkhError, setSDTKHError] = useState("");
  const [hoTenKHErr, setHoTenKHErr] = useState("");

  const showConfirm = () => {
    setShowConfirmModal(true);
  };
  const handleHoVaTenChange = (e) => {
    const value = e.target.value;
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const trimmedValue = value.replace(/\s/g, "");
    setTen(value);
    if (!value.trim()) {
      setHoVaTenError("Họ và tên không được trống");
    } else if (specialCharPattern.test(value)) {
      setHoVaTenError("Họ và tên không được chứa ký tự đặc biệt");
    } else if (trimmedValue.length < 5) {
      setHoVaTenError("Họ và tên phải có ít nhất 5 ký tự");
    } else {
      setHoVaTenError("");
    }
  };
  const handleHoVaTenKH = (e) => {
    const value = e.target.value;
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const trimmedValue = value.replace(/\s/g, "");
    setHoTenKH(value);
    if (!value.trim()) {
      setHoTenKHErr("Họ và tên không được trống");
    } else if (specialCharPattern.test(value)) {
      setHoTenKHErr("Họ và tên không được chứa ký tự đặc biệt");
    } else if (trimmedValue.length < 5) {
      setHoTenKHErr("Họ và tên phải có ít nhất 5 ký tự");
    } else {
      setHoTenKHErr("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^[a-zA-Z0-9._-]+@gmail\.com$/i;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("Email không được trống");
    } else if (!parn.test(value)) {
      setEmailError("Email sai định dạng hoặc không phải là Gmail");
    } else {
      setEmailError("");
    }
  };
  const handleDiaChi = (e) => {
    const value = e.target.value;
    setDiaChi(value);
    const trimmedValue = value.replace(/\s/g, "");
    if (!value.trim()) {
      setDiaChiError("Địa chỉ không được trống");
    } else if (trimmedValue.length < 5) {
      setDiaChiError("Địa chỉ phải có ít nhất 5 ký tự");
    } else {
      setDiaChiError("");
    }
  };
  const handleSDT = (e) => {
    const value = e.target.value.trim();
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;
    setSdt(value);
    if (!value.trim()) {
      setSDTError("Số điện thoại không được trống");
    } else if (!parn.test(value)) {
      setSDTError("Sai định dạng số điện thoại");
    } else {
      setSDTError("");
    }
  };
  const handleSDTKH = (e) => {
    const value = e.target.value.trim();
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;
    setSoDienThoaiKhachHang(value);
    if (!value.trim()) {
      setSDTKHError("Số điện thoại không được trống");
    } else if (!parn.test(value)) {
      setSDTKHError("Sai định dạng số điện thoại");
    } else {
      setSDTKHError("");
    }
  };
  const redirectToHienThiKH = (generatedMaKhachHang) => {
    window.location.href = "/update-khach-hang/" + generatedMaKhachHang;
  };
  const handleAddressChange = (result) => {
    setDiaChi(result);
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
  
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };

  const AddKH = async () => {
    setSubmitted(true);
    setFormSubmitted(true);
    try {
      // Tạo khách hàng mới với thông tin đã nhập
      const khachHangData = {
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        diaChiList: [], // Bạn có thể để trống danh sách địa chỉ ở đây
        email: email,
        anhDaiDien: anhDaiDien,
      };
      if (
        !hoVaTen ||
        ngaySinh == null ||
        !email ||
        !soDienThoai ||
        !diaChi ||
        !xaPhuong
      ) {
        message.error("Vui lòng điền đủ thông tin");
        setShowConfirmModal(false);
        return;
      }
      // Gọi API tạo khách hàng mới
      const khachHangResponse = await axios.post(
        apiURLKH + "/add",
        khachHangData
      );

      // Lấy mã khách hàng từ response
      const generatedMaKhachHang = khachHangResponse.data.data.id;
      addDiaChiList(generatedMaKhachHang);
      redirectToHienThiKH(generatedMaKhachHang);

      // Cập nhật danh sách khách hàng và hiển thị thông báo
      const newKhachHangResponse = {
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        diaChiList: [],
        email: email,
        anhDaiDien: anhDaiDien,
      };

      setListKH([newKhachHangResponse, ...listKH]);
      message.success({
        content: "Thêm khách hàng thành công",
      });
    } catch (error) {
      // Xử lý lỗi
      alert("Thêm khách hàng thất bại");
      console.log(error);
    }
  };

  const addDiaChiList = (generatedMaKhachHang) => {
    //day
    setSubmitted(true);
    setFormSubmitted(true);
    let newAddress = {
      diaChi: diaChi,
      xaPhuong: xaPhuong,
      quanHuyen: quanHuyen,
      tinhThanhPho: tinhThanhPho,
      soDienThoaiKhachHang: soDienThoaiKhachHang,
      hoTenKH: hoTenKH,
      account: generatedMaKhachHang,
      trangThai: trangThaiKH,
    };
    axios
      .post(`${apiURLKH}/dia-chi/add?id=${generatedMaKhachHang}`, newAddress)
      .then((response) => {
        let newKhachHangResponse = {
          diaChi: diaChi,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          soDienThoaiKhachHang: soDienThoaiKhachHang,
          hoTenKH: hoTenKH,
          account: generatedMaKhachHang,
          trangThai: trangThaiKH,
        };
        setDiaChiList([newKhachHangResponse, ...diaChiList]);
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };

  const handleChangeDate = (date) => {
    const value = date.format("DD/MM/YYYY");
    setNgaySinh(value);
  };
  return (
    <>
      <Card bordered="false" style={{ width: "100%" }}>
        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={5.4}>
            <Card
              title={
                <span style={{ color: "gray" }}>Thông tin Khách Hàng</span>
              }
              bordered="false"
              headStyle={{ borderLeft: "4px solid #e2e2e2", borderRadius: 0 }}
            >
              <div style={{ width: "95%", margin: "0 auto" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "-8px",
                    width: "100%",
                  }}
                >
                  <ImageUploadComponent
                    setAnhDaiDien={handleAnhDaiDienChange}
                    hoten={hoVaTen}
                  />
                </div>
                <div
                  className="text-f"
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    // marginTop: "20px",
                  }}
                >
                  <TextField
                    label="Họ và tên"
                    value={hoVaTen}
                    id="fullWidth"
                    onChange={handleHoVaTenChange}
                    error={(formSubmitted && !hoVaTen) || !!hoVaTenError}
                    helperText={
                      hoVaTenError ||
                      (formSubmitted && !hoVaTen && "Họ và tên trống")
                    }
                    style={{ width: "100%" }}
                    maxLength={30}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "right" }}>
                  <div
                    className="text-f"
                    style={{
                      marginBottom: "30px",
                      textAlign: "left",
                      width: "47%",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Ngày Sinh"
                          value={
                            ngaySinh ? dayjs(ngaySinh, "DD/MM/YYYY") : null
                          }
                          format="DD/MM/YYYY"
                          onChange={handleChangeDate}
                          sx={{
                            position: "relative",

                            "& .MuiInputBase-root": {
                              width: "100%",
                            },
                          }}
                          slotProps={{
                            textField: {
                              error: formSubmitted && !ngaySinh,
                              helperText:
                                formSubmitted && !ngaySinh
                                  ? "Chưa chọn ngày sinh"
                                  : "",
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div
                    className="text-f"
                    style={{
                      marginBottom: "20px",
                      marginLeft: "50px",
                      marginTop: "20px",
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
                    onChange={handleEmailChange}
                    error={(formSubmitted && !email) || !!emailError}
                    helperText={
                      emailError || (formSubmitted && !email && "Email trống")
                    }
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
                    onChange={handleSDT}
                    error={(formSubmitted && !soDienThoai) || !!sdtError} // Show error if form submitted and hoVaTen is empty
                    helperText={
                      sdtError ||
                      (formSubmitted && !soDienThoai && "Số điện thoại trống")
                    }
                    style={{ width: "100%" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "center",
                    }}
                  ></div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              title={
                <span style={{ color: "gray" }}>
                  Thông tin địa chỉ mặc định
                </span>
              }
              bordered="false"
              headStyle={{
                borderLeft: "4px solid #e2e2e2",
                borderRadius: 0,
              }}
              style={{
                borderRadius: 0,
                height: "100%", // Set Card height to 100% of its parent container
                overflowY: "auto", // Add a vertical scrollbar when content overflows
                maxHeight: "calc(111vh - 100px)",
              }}
            >
              {/* <h4 style={{ color: "gray" }}>Địa chỉ mặc định</h4> */}

              <div style={{ width: "95%", margin: "0 auto" }}>
                <div
                  className="text-f"
                  style={{ marginBottom: "30px", marginTop: "20px" }}
                >
                  <TextField
                    label="Họ và tên khách hàng (cho địa chỉ)"
                    value={hoTenKH}
                    id="fullWidth"
                    onChange={handleHoVaTenKH}
                    error={(formSubmitted && !hoTenKH) || !!hoTenKHErr}
                    helperText={
                      hoTenKHErr ||
                      (formSubmitted && !hoTenKH && "Họ và tên trống")
                    }
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="text-f" style={{ marginBottom: "30px" }}>
                  <TextField
                    label="Số điện thoại khách hàng"
                    id="fullWidth"
                    value={soDienThoaiKhachHang}
                    onChange={handleSDTKH}
                    error={
                      (formSubmitted && !soDienThoaiKhachHang) || !!sdtkhError
                    }
                    helperText={
                      sdtkhError ||
                      (formSubmitted &&
                        !soDienThoaiKhachHang &&
                        "Số điện thoại khách hàng trống")
                    }
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="text-f" style={{ marginBottom: "30px" }}>
                  <TextField
                    label="Địa chỉ"
                    id="fullWidth"
                    value={diaChi}
                    onChange={handleDiaChi}
                    error={(formSubmitted && !diaChi) || !!diaChiError}
                    helperText={
                      diaChiError ||
                      (formSubmitted && !diaChi && "Địa chỉ trống")
                    }
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <AddressForm
                    onDiaChiChange={handleAddressChange}
                    required={true}
                    submitted={submitted}
                    onProvinceChange={handleProvinceChange}
                    onDistrictChange={handleDistrictChange}
                    onWardChange={handleWardChange}
                    formSubmitted={formSubmitted}
                  />
                </div>
              </div>
            </Card>
          </Grid>{" "}
        </Grid>
        <div style={{ float: "right", marginTop: "10px" }}>
          <Button type="primary" onClick={showConfirm} size={"large"}>
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ paddingRight: "5px" }}
            />
            Lưu Khách Hàng{" "}
          </Button>
          <Modal
            title="Xác nhận"
            open={showConfirmModal}
            onOk={AddKH}
            onCancel={() => setShowConfirmModal(false)}
          >
            Bạn có chắc muốn lưu khách hàng?
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

export default AddKH;
