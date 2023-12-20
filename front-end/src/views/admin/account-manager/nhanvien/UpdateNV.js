import { Button, Card, Modal } from "antd";
import React, { useEffect } from "react"; // , { useEffect }
import { useState } from "react";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import "react-toastify/dist/ReactToastify.css";
import * as dayjs from "dayjs";
import {
  FormControl,
  FormControlLabel,
  // FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import ImageUploadComponent from "./AnhUpdate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import AddressFormUpdate from "./DiaChiUpdate";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Notistack } from "../../order-manager/enum";
import useCustomSnackbar from "../../../../utilities/notistack";
import { useNavigate } from "react-router-dom";
import { request } from "../../../../store/helpers/axios_helper";

const UpdateNV = () => {
  const { id } = useParams();
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
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      account: "",
      id: id,
      trangThaiNV: "",
    },
  ]);
  let [matKhau, setMatKhau] = useState("");
  let [trangThai, setTrangThai] = useState(1);
  let [anhDaiDien, setAnhDaiDien] = useState("");
  let [
    editing,
    // setEditing
  ] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const showConfirm = () => {
    setIsConfirmVisible(true); // Mở hộp thoại xác nhận
  };

  const handleCancel = () => {
    setIsConfirmVisible(false); // Đóng hộp thoại xác nhận khi người dùng hủy
  };
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoVaTenError, setHoVaTenError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cccdError, setCCCDError] = useState("");
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtError, setSDTError] = useState("");
  const navigate = useNavigate();

  //call KH
  useEffect(() => {
    getKHById(id);
  }, [id]);
  const getKHById = (id) => {
    request("GET", apiURLNV + `/hien-thi-theo/${id}`)
      .then((response) => {
        const data = response.data;
        setXaPhuong(data.diaChiList[0].xaPhuong);
        setQuanHuyen(data.diaChiList[0].quanHuyen);
        setTinhThanhPho(data.diaChiList[0].tinhThanhPho);
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
        setDiaChi(data.diaChiList[0].diaChi);
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
    setDiaChi(diaChiList.diaChi); // Cập nhật giá trị diaChi trong thành phần cha
  };
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  const handleChangeDate = (date) => {
    setNgaySinh(date);
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
    } else if (/^\s+|\s+$/.test(value)) {
      setHoVaTenError("Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi");
    } else {
      setHoVaTenError("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
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
    const value = e.target.value;
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
  const save = async (id) => {
    try {
      setSubmitted(true);
      setFormSubmitted(true);

      const requiredFields = [hoVaTen, ngaySinh, email, soDienThoai, diaChi];
      const errorFields = [
        hoVaTenError,
        sdtError,
        emailError,
        cccdError,
        diaChiError,
      ];

      if (
        requiredFields.some((field) => !field) ||
        errorFields.some((error) => error)
      ) {
        handleOpenAlertVariant(
          "Vui lòng điền đủ và đúng thông tin trước khi lưu.",
          Notistack.ERROR
        );
        setIsConfirmVisible(false);
        return;
      }

      const updatedEmployee = {
        ma: ma,
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh === "" ? null : ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        email: email,
        anhDaiDien: anhDaiDien,
        canCuocCongDan: cccd,
        trangThai: trangThai,
        matKhau: matKhau,
      };

      request("PUT", `${apiURLNV}/update/${id}`, updatedEmployee).then(
        (res) => {
          if (!tinhThanhPho || !xaPhuong || !quanHuyen) {
            handleOpenAlertVariant(
              "Vui lòng điền đủ thông tin trước khi lưu.",
              Notistack.ERROR
            );

            setIsConfirmVisible(false);
            return;
          }

          setIsConfirmVisible(false);

          const updatedAddress = {
            diaChi: diaChi,
            xaPhuong: xaPhuong,
            quanHuyen: quanHuyen,
            tinhThanhPho: tinhThanhPho,
            account: id,
          };

          request("PUT", `${apiURLNV}/dia-chi/update?id=` + id, updatedAddress)
            .then((res) => {
              const updatedAddressInfo = {
                diaChi: updatedAddress.diaChi,
                xaPhuong: updatedAddress.xaPhuong,
                quanHuyen: updatedAddress.quanHuyen,
                tinhThanhPho: updatedAddress.tinhThanhPho,
                account: id,
              };
              setDiaChiList(updatedAddressInfo);
              handleOpenAlertVariant("Sửa thành công", Notistack.SUCCESS);
            })
            .catch((err) =>
              handleOpenAlertVariant(
                "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
                Notistack.ERROR
              )
            );
        }
      );
    } catch (error) {
      handleOpenAlertVariant(
        "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
        Notistack.ERROR
      );
    }
  };
  const redirectTable = () => {
    navigate("/dashboard/employees");
  };
  const showRetable = () => {
    redirectTable();
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
                        value={dayjs(ngaySinh)}
                        format="DD/MM/YYYY"
                        onChange={handleChangeDate}
                        disableFuture
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
                  formSubmitted={formSubmitted}
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            textAlign: "right",
            marginTop: "20px",
          }}
        >
          <Button
            size={"large"}
            onClick={showRetable}
            style={{ float: "left" }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ paddingRight: "5px" }}
            />
            Quay lại
          </Button>{" "}
          <Button type="primary" onClick={showConfirm} size={"large"}>
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ paddingRight: "5px" }}
            />
            Lưu Tài Khoản{" "}
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
      </Card>
    </>
  );
};

export default UpdateNV;
