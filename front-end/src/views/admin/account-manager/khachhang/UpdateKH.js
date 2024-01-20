import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Button, Card, Modal, Tag } from "antd";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFloppyDisk,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import "react-toastify/dist/ReactToastify.css";
import ImageUploadComponent from "./AnhUpdate";
import AddressTable from "./HienThiDiaChi";
import ModalAddDiaChiKhachHang from "./ModalAddDiaChiKhachHang";
import "./style.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
import useCustomSnackbar from "../../../../utilities/notistack";
import { Notistack } from "../../order-manager/enum";
import { useNavigate } from "react-router-dom";
import { request } from '../../../../store/helpers/axios_helper'

const UpdateKH = () => {
  const { id } = useParams();
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [hoTenKH, setHoTenKH] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [diaChi, setDiaChi] = useState("");
  let [soDienThoaiKhachHang, setSoDienThoaiKhachHang] = useState("");
  let [id1, setId] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [ma, setMa] = useState("");

  let [matKhau, setMatKhau] = useState("");
  let [trangThai, setTrangThai] = useState(1);
  let [trangThaiKH, setTrangThaiKH] = useState(0); // Khởi tạo mặc định là 0
  let [anhDaiDien, setAnhDaiDien] = useState("");
  let [huy, setHuy] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  var navigate = useNavigate();

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
  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      soDienThoaiKhachHang: "",
      hoTenKH: "",
      account: id,
      id: "",
      trangThai: trangThaiKH,
    },
  ]);

  useEffect(() => {
    fetchDiaChiList();
  }, []);

  //hiển thị diaChi
  const fetchDiaChiList = async () => {
    try {
      request('GET',apiURLKH + "/dia-chi/hien-thi/" + id).then(
        (res) => {
          if(res.status === 200){
            setDiaChiList(res.data);
          }
        }
      )
      // console.log(response);

    } catch (error) {
      console.error("Error fetching dia chi list:", error);
    }
  };

  // Hiển thị diaChi

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isModalVisibleS, setIsModalVisibleS] = useState(false);
  const [formSubmittedS, setFormSubmittedS] = useState(false);
  const [submittedS, setSubmittedS] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  //fetch detail khachHang
  useEffect(() => {
    getKHById(id);
  }, [id]);
  const getKHById = (id) => {
    request('GET', apiURLKH + `/hien-thi-theo/${id}`)
      .then((response) => {
        const data = response.data;
        setMa(data.ma);
        setGioiTinh(data.gioiTinh);
        setTen(data.hoVaTen);
        setNgaySinh(data.ngaySinh);
        setMatKhau(data.matKhau);
        setTrangThai(data.trangThai);
        setAnhDaiDien(data.anhDaiDien);
        setEmail(data.email);
        setSdt(data.soDienThoai);
      })
      .catch((error) => {
        console.error("Error fetching customer information:", error);
      });
  };
  //validate diaChi
  const [hoVaTenError, setHoVaTenError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtError, setSDTError] = useState("");
  const [sdtkhError, setSDTKHError] = useState("");
  const [hoTenkhError, sethoTenKHError] = useState("");
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
  //handle diaChi
  const handleHoTenChange = (e) => {
    const value = e.target.value;
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    setHoTenKH(value);
    if (!value.trim()) {
      sethoTenKHError("Họ và tên không được trống");
    } else if (specialCharPattern.test(value)) {
      sethoTenKHError("Họ và tên không được chứa ký tự đặc biệt");
    } else if (value.length < 5) {
      sethoTenKHError("Họ và tên phải có ít nhất 5 ký tự");
    } else if (/^\s+|\s+$/.test(value)) {
      sethoTenKHError("Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi");
    } else if (huy) {
      sethoTenKHError("");
    } else {
      sethoTenKHError("");
    }
  };
  const handleSoDienThoaiChange = (e) => {
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

  const redirectTable = () => {
    navigate("/dashboard/customers");
  };
  const handleCloseModal = () => {
    setIsModalVisibleS(false);
    setFormSubmittedS(false);
    setDiaChi("");
    setHoTenKH("");
    sethoTenKHError("");
    setSDTKHError("");
    setDiaChiError("");
    setTrangThaiKH(0);
    setSoDienThoaiKhachHang("");
    setHuy(true);
  };
  //add diaChi
  const addDiaChiList = () => {
    setSubmittedS(true);
    setFormSubmittedS(true);
    let newAddress = {
      diaChi: diaChi,
      xaPhuong: xaPhuong,
      quanHuyen: quanHuyen,
      tinhThanhPho: tinhThanhPho,
      soDienThoaiKhachHang: soDienThoaiKhachHang,
      hoTenKH: hoTenKH,
      account: id,
      id: id1,
      trangThai: trangThaiKH,
      ma: generateRandomCode(),
    };
    if (
      !hoTenKH ||
      !soDienThoaiKhachHang ||
      !diaChi ||
      !xaPhuong ||
      !quanHuyen ||
      !tinhThanhPho
    ) {
      handleOpenAlertVariant("Chưa điền đủ thông tin", Notistack.ERROR);
      setIsModalVisibleS(true);
      return;
    }
    if (hoTenkhError || sdtkhError || diaChiError) {
      handleOpenAlertVariant(
        "Vui lòng điền đúng thông tin trước khi lưu.",
        Notistack.ERROR
      );
      setIsModalVisibleS(true);
      return;
    }
    setIsModalVisibleS(false);
    request('POST', `${apiURLKH}/dia-chi/add?id=${id}`, newAddress)
      .then((response) => {
        let newKhachHangResponse = {
          diaChi: diaChi,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          soDienThoaiKhachHang: soDienThoaiKhachHang,
          hoTenKH: hoTenKH,
          account: id,
          id: id1,
          trangThai: trangThaiKH,
        };
        setDiaChiList([...diaChiList, newKhachHangResponse]);
        fetchDiaChiList();
        console.log(response.data);
        handleOpenAlertVariant("Thêm thành công", Notistack.SUCCESS);
        handleCloseModal();
        return;
      })
      .catch((error) => {
        handleOpenAlertVariant("Thêm thất bại", Notistack.ERROR);
      });
  };
  //update diaChi
  const updateDiaChiList = (updatedList) => {
    setDiaChiList(updatedList);
  };
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const showConfirm = () => {
    setIsConfirmVisible(true); // Mở hộp thoại xác nhận
  };

  const showRetable = () => {
    redirectTable();
  };
  const handleCancel = () => {
    setIsConfirmVisible(false); // Đóng hộp thoại xác nhận khi người dùng hủy
  };

  const save = async (id) => {
    setSubmitted(true);
    setFormSubmitted(true);
    if (!hoVaTen || !ngaySinh || !email || !soDienThoai) {
      handleOpenAlertVariant(
        "Vui lòng điền đủ thông tin trước khi lưu.",
        Notistack.ERROR
      );
      setIsConfirmVisible(false);
      return;
    }
    if (hoVaTenError || sdtError || emailError) {
      handleOpenAlertVariant(
        "Vui lòng điền đúng thông tin trước khi lưu.",
        Notistack.ERROR
      );
      setIsConfirmVisible(false);
      return;
    }
    try {
      const updatedItem = {
        ma: ma,
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        // diaChi: diaChi,
        email: email,
        anhDaiDien: anhDaiDien,
        trangThai: trangThai,
        matKhau: matKhau,
      };

      request('PUT', `${apiURLKH}/update/${id}`, updatedItem)
        .then((response) => {
          if (response.status === 200) {
            handleOpenAlertVariant("Sửa thành công", Notistack.SUCCESS);
            setIsConfirmVisible(false);
          } else {
            handleOpenAlertVariant(
              "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
              Notistack.ERROR
            );
          }
        })
        .catch((error) => {
          console.error("Failed to update customer information:", error);
          handleOpenAlertVariant(
            "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
            Notistack.ERROR
          );
        });
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };
  const handleChangeDate = (date) => {
    setNgaySinh(date);
  };
  return (
    <>
      <div className="mt-4">
      {" "}
      <Card bordered="false" style={{ width: "100%" }}>
        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={6.5}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                fontSize: "16px",
                top: 0,
                backgroundColor: "white",
                borderLeft: "4px solid #e2e2e2",
                zIndex: 1,
                paddingLeft: "10px",
                color: "gray",
              }}
            >
              <span
                style={{
                  color: "gray",
                  display: "block",
                  padding: "15px",
                  borderBottom: "1px solid #e2e2e2",
                  flex: "1",
                  margin: "0",
                }}
              >
                Thông tin Khách Hàng
              </span>
            </div>
            <div
              bordered="false"
              headstyle={{ borderLeft: "4px solid #e2e2e2", borderRadius: 0 }}
              style={{
                height: "100%",
                overflowY: "auto",

                zIndex: 0,
                position: "relative",
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "95%",
                      marginTop: "20px",
                    }}
                  >
                    <ImageUploadComponent
                      setAnhDaiDien={handleAnhDaiDienChange}
                      existingImageUrl={anhDaiDien}
                      hoten={hoVaTen}
                    />
                    <br />
                    <Grid
                      item
                      xs={12}
                      style={{
                        textAlign: "center",
                        border: "1px solid #c2c2c2",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      Đơn hàng mới nhất <br />
                      <b>#DH123</b> <br />
                      Từ quản lý đơn hàng
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={8} style={{ marginTop: "40px" }}>
                  {/* <b style={{ fontSize: "16px" }}>{hoVaTen}</b>{" "}
                {gioiTinh === true ? (
                  <FontAwesomeIcon icon={faMars} />
                ) : gioiTinh === false ? (
                  <FontAwesomeIcon icon={faVenus} />
                ) : null}{" "}
                <br />
                {email} */}
                  <div style={{ width: "95%" }}>
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
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "right" }}>
                      <div
                        className="text-f"
                        style={{
                          marginBottom: "30px",
                          width: "63%",
                        }}
                      >
                        {/* Ngày sinh */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              disableFuture
                              label="Ngày Sinh"
                              value={dayjs(ngaySinh)}
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
                          width: "45%",
                          marginLeft: "15px",
                          marginTop: "15px",
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
                              control={
                                <Radio style={{ borderRadius: "50%" }} />
                              } // Add border radius to the radio button
                              label="Nam"
                            />
                            <FormControlLabel
                              value="false"
                              control={
                                <Radio style={{ borderRadius: "50%" }} />
                              } // Add border radius to the radio button
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
                        error={(formSubmitted && !email) || !!emailError} // Show error if form submitted and hoVaTen is empty
                        helperText={
                          emailError ||
                          (formSubmitted && !email && "Email trống")
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
                        error={(formSubmitted && !soDienThoai) || !!sdtError}
                        helperText={
                          sdtError ||
                          (formSubmitted &&
                            !soDienThoai &&
                            "Số điện thoại trống")
                        }
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>{" "}
                </Grid>
              </Grid>
              {/* <Grid container justifyContent="space-between">
              <Grid item xs={3.7} style={{ textAlign: "center" }}>
                Tổng chi tiêu <br />
                <b>500.000 đ</b>
                <br />
                Từ quản lý đơn hàng
              </Grid>
              <Grid item xs={3.7} style={{ textAlign: "center" }}>
                Chi tiêu trung bình <br />
                <b>500.000 đ</b>
                <br />
              </Grid>
            </Grid> */}
            </div>
          </Grid>{" "}
          <Grid
            item
            xs={5.4}
            style={{ borderLeft: "1px solid #e2e2e2", paddingLeft: "20px" }}
          >
            {/* <div style={{ position: 'relative' }}> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                fontSize: "16px",
                top: 0,
                backgroundColor: "white",
                borderLeft: "4px solid #e2e2e2",
                zIndex: 1,
                paddingLeft: "10px",
                color: "gray",
              }}
            >
              <span
                style={{
                  color: "gray",
                  display: "block",
                  padding: "15px",
                  borderBottom: "1px solid #e2e2e2",
                  flex: "1",
                  margin: "0",
                }}
              >
                Thông tin Địa Chỉ
                <Button
                  style={{
                    backgroundColor: "#4b69ff",
                    color: "white",
                    float: "right",
                    marginLeft: "auto",
                    marginTop: "-3px",
                  }}
                  size=""
                  onClick={() => {
                    setIsModalVisibleS(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp; Thêm địa chỉ
                </Button>
              </span>
            </div>
            <div
              // title={<span style={{ color: "gray" }}>Thông tin Địa Chỉ </span>}
              bordered="false"
              // bodyStyle={{ padding: 0 }}
              headstyle={{
                // backgroundColor: "#d5dbfa",
                borderLeft: "4px solid #e2e2e2",
                borderRadius: 0,
              }}
              style={{
                height: "100%",
                overflowY: "auto",
                maxHeight: "calc(67vh - 100px)",
                zIndex: 0,
                position: "relative",
              }}
            >
              <Modal
                closable={false}
                open={isModalVisibleS}
                maskClosable={false}
                footer={[
                  <React.Fragment key="modal-footer">
                    <Button
                      onClick={() => {
                        handleCloseModal();
                      }}
                      size="large"
                      type="text"
                      style={{
                        borderRadius: 0,
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={() => {
                        // add();
                        addDiaChiList();
                        // Đóng modal sau khi thêm
                      }}
                      size="large"
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#4b69ff",
                        color: "white",
                        marginTop: "20px",
                      }}
                      bordered="false"
                    >
                      Lưu
                    </Button>
                  </React.Fragment>,
                ]} // Hide default footer buttons
              >
                <div>
                  <h4 style={{ textAlign: "center" }}>THÊM ĐỊA CHỈ</h4>
                  <div
                    className="text-f"
                    style={{ marginBottom: "30px", marginTop: "25px" }}
                  >
                    <TextField
                      label="Họ và tên"
                      value={hoTenKH}
                      id="fullWidth"
                      onChange={handleHoTenChange}
                      error={(formSubmittedS && !hoTenKH) || !!hoTenkhError}
                      helperText={
                        hoTenkhError ||
                        (formSubmittedS && !hoTenKH && "Họ và tên trống")
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="text-f" style={{ marginBottom: "30px" }}>
                    <TextField
                      label="Số điện thoại"
                      id="fullWidth"
                      value={soDienThoaiKhachHang}
                      onChange={handleSoDienThoaiChange}
                      error={
                        (formSubmittedS && !soDienThoaiKhachHang) ||
                        !!sdtkhError
                      }
                      helperText={
                        sdtkhError ||
                        (formSubmittedS &&
                          !soDienThoaiKhachHang &&
                          "Số điện thoại trống")
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
                      error={(formSubmittedS && !diaChi) || !!diaChiError}
                      helperText={
                        diaChiError ||
                        (formSubmittedS && !diaChi && "Địa chỉ trống")
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <ModalAddDiaChiKhachHang
                      required={true}
                      submitted={submittedS}
                      onProvinceChange={handleProvinceChange}
                      onDistrictChange={handleDistrictChange}
                      onWardChange={handleWardChange}
                      formSubmitted={formSubmittedS}
                      huy={huy}
                      set={setHuy}
                    />
                  </div>
                </div>
              </Modal>
              <div style={{ clear: "both" }}>
                <AddressTable
                  diaChiList={diaChiList}
                  account={id}
                  updateDiaChiList={updateDiaChiList}
                  fetchDiaChiList={fetchDiaChiList}
                />
              </div>{" "}
            </div>{" "}
          </Grid>{" "}
        </Grid>
        <div style={{ marginTop: "10px" }}>
          {" "}
          <Button size={"large"} onClick={showRetable}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ paddingRight: "5px" }}
            />
            Quay lại
          </Button>{" "}
          <div style={{ float: "right" }}>
            <Button type="primary" onClick={showConfirm} size={"large"}>
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{ paddingRight: "5px" }}
              />
              Lưu Khách Hàng{" "}
            </Button>
            <Modal
              title="Xác nhận"
              open={isConfirmVisible}
              onOk={() => save(id)}
              onCancel={handleCancel}
            >
              <p>Bạn có chắc chắn muốn lưu khách hàng?</p>
            </Modal>
          </div>
        </div>
      </Card>
      </div>
    </>
  );
};
export default UpdateKH;
