import { Button, Modal, Card } from "antd";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressForm from "./DiaChi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
import AnhKhachHang from "./AnhKhachHang";
import useCustomSnackbar from "../../../../utilities/notistack";
import { Notistack } from "../../order-manager/enum";
import { useNavigate } from "react-router-dom";
import { request } from "../../../../store/helpers/axios_helper";
import LoadingIndicator from "../../../../utilities/loading";

const AddKH = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { handleOpenAlertVariant } = useCustomSnackbar();
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
  let [maDC, setMaDC] = useState("");
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
  const navigate = useNavigate();

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
    } else if (/^\s+|\s+$/.test(value)) {
      setHoVaTenError("Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi");
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
    } else if (/^\s+|\s+$/.test(value)) {
      setHoTenKHErr("Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi");
    } else {
      setHoTenKHErr("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("Email không được trống");
    } else if (!parn.test(value)) {
      setEmailError("Email sai định dạng hoặc không phải là email");
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
  const redirectToHienThiKH = () => {
    navigate("/dashboard/customers");
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
    setIsLoading(false);
    setSubmitted(true);
    setFormSubmitted(true);
    try {
      // Tạo khách hàng mới với thông tin đã nhập
      const khachHangData = {
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        diaChiList: [],
        email: email,
        anhDaiDien: anhDaiDien,
      };
      if (
        !hoVaTen ||
        !ngaySinh ||
        !email ||
        !soDienThoai ||
        !diaChi ||
        !xaPhuong
      ) {
        handleOpenAlertVariant(
          "Vui lòng điền đủ thông tin trước khi lưu.",
          Notistack.ERROR
        );
        setIsLoading(true);
        setShowConfirmModal(false);
        return;
      }
      if (
        hoVaTenError ||
        sdtError ||
        emailError ||
        hoTenKHErr ||
        sdtkhError ||
        diaChiError
      ) {
        handleOpenAlertVariant(
          "Vui lòng điền đúng thông tin trước khi lưu.",
          Notistack.ERROR
        );
        setIsLoading(true);
        setShowConfirmModal(false);
        return;
      }
      // Gọi API tạo khách hàng mới
      request("POST", apiURLKH + "/add", khachHangData).then((response) => {
        const data = response.data;
        // Lấy mã khách hàng từ response
        if (data) {
          addDiaChiList(data.id);
        }
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
        setIsLoading(true);
        setShowConfirmModal(false);
        handleOpenAlertVariant("Thêm thành công", Notistack.SUCCESS);
        redirectToHienThiKH();
      });
    } catch (error) {
      // Xử lý lỗi
      handleOpenAlertVariant(error.response.data, Notistack.ERROR);
      setShowConfirmModal(false);
    }
  };
  const generateRandomCode = () => {
    const getRandomInt = () => {
      return Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
    };

    let randomCode = "DC";
    for (let i = 0; i < 10; i++) {
      randomCode += getRandomInt();
    }
    return randomCode;
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
      ma: generateRandomCode(),
    };
    request(
      "POST",
      `${apiURLKH}/dia-chi/add?id=${generatedMaKhachHang}`,
      newAddress
    )
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
          ma: maDC,
        };
        setMaDC(response.data.ma);
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
              style={{ borderRadius: 0 }}
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
                  <AnhKhachHang
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
                          disableFuture
                          format="DD/MM/YYYY"
                          value={
                            ngaySinh ? dayjs(ngaySinh, "DD/MM/YYYY") : null
                          }
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
                    label="Họ và tên người nhận"
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
                    label="Số điện thoại người nhận"
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
      {!isLoading && <LoadingIndicator />}
    </>
  );
};

export default AddKH;
