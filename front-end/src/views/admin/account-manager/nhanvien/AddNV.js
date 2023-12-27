import { Button, Card, Modal } from "antd";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressForm from "./DiaChi";
import ImageUploadComponent from "./Anh";
import IDScan from "./QuetCanCuoc";
import { useNavigate } from "react-router-dom";
import { request } from "../../../../store/helpers/axios_helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as dayjs from "dayjs";
import { Notistack } from "../../order-manager/enum";
import useCustomSnackbar from "../../../../utilities/notistack";
import LoadingIndicator from "../../../../utilities/loading";
const AddNV = () => {
  let [listNV, setListNV] = useState([]);
  let [hoVaTen, setTen] = useState("");
  // let [id, setID] = useState("");
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
  const [hoVaTenError, setHoVaTenError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cccdError, setCCCDError] = useState("");
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtError, setSDTError] = useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();
  var navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      account: "",
      id: "",
      trangThaiNV: "",
    },
  ]);
  //Scan
  const handleScanData = (data) => {
    if (data) {
      setTen(data.hoVaTen);
      setNgaySinh(data.ngaySinh);
      setCCCD(data.cccd);
      setGioiTinh(data.gioiTinh);
    }
  };
  const handleHoVaTenChange = (e) => {
    const value = e.target.value;
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
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
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("Email không được trống");
    } else if (!parn.test(value)) {
      setEmailError("Email sai định dạng hoặc không phải là Gmail");
    } else {
      setEmailError("");
    }
  };
  const handleCCCDChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^[0-9]{9}$|^[0-9]{12}$/;
    setCCCD(value);
    if (!value.trim()) {
      setCCCDError("CCCD không được trống");
    } else if (!parn.test(value)) {
      setCCCDError("CCCD gồm 9-12 số");
    } else {
      setCCCDError("");
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
  //Choose diaChi
  const handleProvinceChange = (value) => {
    setTinhThanhPho(value);
  };

  const handleDistrictChange = (value) => {
    setQuanHuyen(value);
  };

  const handleWardChange = (value) => {
    setXaPhuong(value);
  };
  const handleDiaChiChange = (result) => {
    setDiaChi(diaChiList.diaChi);
  };
  //Choose Anh
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  const redirectToHienThiKH = () => {
    navigate("/dashboard/employees");
  };
  const showConfirm = () => {
    setIsConfirmVisible(true);
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };
  // add
  const AddNV = async () => {
    setIsLoading(false);
    setSubmitted(true);
    setFormSubmitted(true);
    try {
      const obj = {
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        diaChiList: [],
        gioiTinh: gioiTinh,
        email: email,
        anhDaiDien: anhDaiDien,
        canCuocCongDan: cccd,
      };
      if (
        !hoVaTen ||
        !ngaySinh ||
        !email ||
        !soDienThoai ||
        !diaChi ||
        !xaPhuong ||
        !quanHuyen ||
        !tinhThanhPho
      ) {
        handleOpenAlertVariant(
          "Vui lòng điền đủ thông tin trước khi lưu.",
          Notistack.ERROR
        );
        setIsLoading(true);
        setIsConfirmVisible(false);
        return;
      }
      if (hoVaTenError || sdtError || emailError || cccdError || diaChiError) {
        handleOpenAlertVariant(
          "Vui lòng điền đúng thông tin trước khi lưu.",
          Notistack.ERROR
        );
        setIsLoading(true);
        setIsConfirmVisible(false);
        return;
      }
      request("POST", apiURLNV + "/add", obj).then((response) => {
        var nhanVienRespone = response;
        const generatedMaKhachHang = nhanVienRespone.data.id;
        addDiaChiList(generatedMaKhachHang);
        setIsLoading(true);
        redirectToHienThiKH(generatedMaKhachHang);
        const newNhanVienRespone = {
          hoVaTen: hoVaTen,
          ngaySinh: ngaySinh,
          soDienThoai: soDienThoai,
          diaChiList: [],
          gioiTinh: gioiTinh,
          email: email,
          anhDaiDien: anhDaiDien,
          canCuocCongDan: cccd,
        };
        setListNV([newNhanVienRespone, ...listNV]);
        handleOpenAlertVariant("Thêm khách hàng thành công", Notistack.SUCCESS);
      });
    } catch (error) {
      setIsLoading(true);
      handleOpenAlertVariant(error.response.data, Notistack.ERROR);
      setIsConfirmVisible(false);
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
      account: generatedMaKhachHang,
      trangThaiNV: 1,
    };
    request(
      "POST",
      `${apiURLNV}/dia-chi/add?id=${generatedMaKhachHang}`,
      newAddress
    )
      .then((response) => {
        let newKhachHangResponse = {
          diaChi: diaChi,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          account: generatedMaKhachHang,
          trangThaiNV: 1,
        };
        setDiaChiList([newKhachHangResponse, ...diaChiList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangeDate = (date) => {
    const value = date.format("DD/MM/YYYY");
    setNgaySinh(value);
  };
  return (
    <>
      <Card bordered="false" style={{ width: "100%" }}>
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="text-f"
                  style={{
                    marginBottom: "30px",
                    width: "50%",
                  }}
                >
                  {/* Ngày sinh */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Ngày Sinh"
                        disableFuture
                        value={ngaySinh ? dayjs(ngaySinh, "DD/MM/YYYY") : null}
                        format="DD/MM/YYYY"
                        onChange={handleChangeDate}
                        sx={{
                          position: "relative",

                          "& .MuiInputBase-root": {
                            width: "348px",
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
                    marginBottom: "30px",
                    width: "40%",
                    marginLeft: "20px",
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
                  label="Căn cước công dân"
                  value={cccd}
                  // id="fullWidth"
                  onChange={handleCCCDChange}
                  error={(formSubmitted && !cccd) || !!cccdError} // Show error if form submitted and hoVaTen is empty
                  helperText={
                    cccdError || (formSubmitted && !cccd && "CCCD trống")
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <Grid container justifyContent="space-between">
                {/* Left column */}
                <Grid item xs={5.8}>
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
                  </div>
                </Grid>
                <Grid item xs={5.8}>
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
                </Grid>
              </Grid>

              <div
                className="text-f"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                <TextField
                  label="Địa chỉ"
                  id="fullWidth"
                  value={diaChi}
                  onChange={handleDiaChi}
                  error={(formSubmitted && !diaChi) || !!diaChiError} // Show error if form submitted and hoVaTen is empty
                  helperText={
                    diaChiError || (formSubmitted && !diaChi && "Địa chỉ trống")
                  }
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
                  formSubmitted={formSubmitted}
                />
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
            icon={<FontAwesomeIcon icon={faExclamationCircle} />}
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
      {!isLoading && <LoadingIndicator />}
    </>
  );
};

export default AddNV;
