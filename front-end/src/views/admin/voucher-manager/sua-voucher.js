import {
  Button,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { Alert, InputAdornment } from "@mui/material";
import "../voucher-manager/style.css";
import { useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import "react-toastify/dist/ReactToastify.css";

import {
  Notistack,
  StatusDiscountNumber,
  TypeDiscountNumber,
  TypeDiscountString,
} from "../order-manager/enum";
import useCustomSnackbar from "../../../utilities/notistack";
import LoadingIndicator from "../../../utilities/loading";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import { useNavigate } from "react-router-dom";
import { request } from "../../../store/helpers/axios_helper";

const UpdateVoucher = () => {
  const [voucher, setVoucher] = useState({});
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [soLuong, setSoLuong] = useState("");
  const [status, setStatus] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState(null);
  const [ngayKetThuc, setNgayKetThuc] = useState(null);
  // const [giaTriVoucherConvert, setGiaTriVoucherConvert] = useState(0);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  const [giaTriVoucher, setGiaTriVoucher] = useState(0);
  const [dieuKienApDung, setDieuKienApDung] = useState(0);
  const [validationMsg, setValidationMsg] = useState({});
  const { id } = useParams();
  const [selectDiscount, setSelectDiscount] = useState("");
  const [giaTriToiDa, setGiaTriToiDa] = useState(0);
  const [valueToiDa, setValueToiDa] = React.useState();
  const [isLoading, setIsLoading] = useState(true);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const redirectToHienThiVoucher = () => {
    navigate("/dashboard/vouchers");
  };

  const handleOpenDialogConfirmUpdate = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmUpdate = () => {
    setOpenConfirm(false);
  };

  const Header = () => {
    return (
      <>
        <span className="">Chỉnh sửa phiếu giảm giá</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>Bạn có chắc chắc muốn chỉnh sửa phiếu giảm giá không ?</span>
      </>
    );
  };

  const handleChange = (event) => {
    if (selectDiscount === TypeDiscountString.VND) {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(formattedValue);
      setGiaTriVoucher(numericValue);
    }
    if (selectDiscount === TypeDiscountString.PERCENT) {
      let inputValue = event.target.value;
      // Loại bỏ các ký tự không phải số
      inputValue = inputValue.replace(/\D/g, "");
      // Xử lý giới hạn giá trị từ 1 đến 100
      if (isNaN(inputValue) || inputValue < 1) {
        inputValue = "0";
      } else if (inputValue > 100) {
        inputValue = "100";
      }
      setValue(inputValue);
      setGiaTriVoucher(inputValue);
    }
  };

  const detailVoucher = async () => {
    try {
      console.log(id);
      request("GET", apiURLVoucher + "/get-by-id/" + id).then((res) => {
        if (res.status === 200) {
          var response = res;
          setMa(response.data.data.ma);
          setTen(response.data.data.ten);
          setSoLuong(response.data.data.soLuong);
          setNgayBatDau(response.data.data.ngayBatDau);
          setNgayKetThuc(response.data.data.ngayKetThuc);
          setValueToiDa(response.data.data.giaTriToiDa);
          setValue1(response.data.data.dieuKienApDung);
          setValue(response.data.data.giaTriVoucher);
          setStatus(response.data.data.trangThai);
          setSelectDiscount(
            response.data.data.loaiVoucher === TypeDiscountNumber.VND
              ? TypeDiscountString.VND
              : TypeDiscountString.PERCENT
          );
          convertTien(
            response.data.data.dieuKienApDung,
            response.data.data.giaTriVoucher,
            response.data.data.giaTriToiDa
          );
          setVoucher(response.data.data);
        }
        console.log(response);
      });

      // console.log(response.data.data);
    } catch (error) {
      // Xử lý lỗi nếu cần
      handleOpenAlertVariant(
        "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên!!!",
        Notistack.ERROR
      );
    }
  };

  const handleInputNumberVoucher = (e) => {
    // Loại bỏ tất cả các ký tự không phải số sử dụng regex
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setSoLuong(sanitizedValue);
  };

  const handleInputCodeVoucher = (e) => {
    // Sử dụng regex để chỉ cho phép chữ cái và số, loại bỏ ký tự đặc biệt
    let inputValue = e.target.value;
    let sanitizedValue = inputValue.toUpperCase();
    setMa(sanitizedValue);
  };

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(formattedValue);
    setDieuKienApDung(numericValue);
  };

  // const handleChangeGiaTriToiDa = (event) => {
  //   const inputValue = event.target.value;
  //   if (selectDiscount === TypeDiscountString.VND) {
  //     setGiaTriToiDa(null);
  //     setValueToiDa(null);
  //   }
  //   const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
  //   const formattedValue = inputValue
  //     .replace(/[^0-9]+/g, "")
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   setValueToiDa(formattedValue);
  //   setGiaTriToiDa(numericValue);
  // };

  // const handleChangeToggleButtonDiscount = (event) => {
  //   const newAlignment = event.target.value;
  //   handleReset();
  //   if (newAlignment != null) {
  //     setSelectDiscount(newAlignment);
  //   }

  //   if (newAlignment == null) {
  //     setSelectDiscount(null);
  //   }
  //   handleReset();
  // };

  // const handleReset = () => {
  //   setValue("");
  //   setValueToiDa("");
  // };

  const convertTien = (value1, value, valueToiDa) => {
    const numericValue = parseFloat(String(value1).replace(/[^0-9.-]+/g, ""));
    const fomarttedDieuKien = String(value1)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue1(fomarttedDieuKien);
    setDieuKienApDung(numericValue);

    const numericValue1 = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
    const formattedValue1 = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(formattedValue1);
    setGiaTriVoucher(numericValue1);

    const numericValue2 = parseFloat(
      String(valueToiDa).replace(/[^0-9.-]+/g, "")
    );
    const formattedValue2 = String(valueToiDa)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiDa(formattedValue2);
    setGiaTriToiDa(numericValue2);
  };

  useEffect(() => {
    convertTien();
    detailVoucher();
  }, []);

  const updateVoucher = () => {
    setIsLoading(true);
    let obj = {
      ma: ma,
      ten: ten,
      soLuong: soLuong,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      dieuKienApDung: dieuKienApDung,
      giaTriVoucher: giaTriVoucher,
      giaTriToiDa: giaTriToiDa,
      loaiVoucher: selectDiscount,
    };
    request("PUT", apiURLVoucher + "/updateVoucher/" + id, obj)
      .then((response) => {
        handleOpenAlertVariant("Cập nhật thành công!!!", Notistack.SUCCESS);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setTimeout(() => {
          redirectToHienThiVoucher();
        }, 1000);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const validationAll = () => {
    const msg = {};
    if (!ten.trim("")) {
      msg.ten = "Tên không được trống !!!";
    }

    if (soLuong == null || soLuong === "") {
      msg.soLuong = "Số lượng không được trống !!!";
    }

    if (soLuong <= 0 || soLuong > 10000) {
      msg.soLuong = "Số lượng cho phép từ 1 - 10000";
    }

    const numericValue1 = parseFloat(value1?.replace(/[^0-9.-]+/g, ""));
    if (value1 == null || value1 === "") {
      msg.value1 = "Điều kiện áp dụng không được trống !!!";
    }

    if (numericValue1 <= 0 || numericValue1 > 100000000) {
      msg.value1 = "Điều kiện áp dụng từ 1đ - 100.000.000đ";
    }

    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    if (value == null || value === "") {
      msg.value = "Giá trị voucher không được trống !!!";
    }

    if (
      (selectDiscount === TypeDiscountString.VND && numericValue2 <= 0) ||
      (selectDiscount === TypeDiscountString.VND && numericValue2 > 100000000)
    ) {
      msg.value = "Giá trị voucher từ 1đ - 100.000.000đ";
    }

    if (selectDiscount === TypeDiscountString.PERCENT && value <= 0) {
      msg.value = "Giá trị voucher trong khoảng 1% - 100% !!!";
    }

    const numericValue3 = parseFloat(valueToiDa?.replace(/[^0-9.-]+/g, ""));
    if (
      (selectDiscount === TypeDiscountString.PERCENT && valueToiDa === null) ||
      (selectDiscount === TypeDiscountString.PERCENT && valueToiDa === "")
    ) {
      msg.valueToiDa = "Giá trị tối đa không được trống !!!";
    }

    if (
      (selectDiscount === TypeDiscountString.PERCENT && numericValue3 <= 0) ||
      (selectDiscount === TypeDiscountString.PERCENT &&
        numericValue3 > 100000000)
    ) {
      msg.valueToiDa = "Giá trị tối đa từ 1đ - 100.000.000đ";
    }

    if (!dayjs(ngayBatDau).isBefore(ngayKetThuc)) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu !!!";
    }

    // if (
    //   dayjs(ngayBatDau).isBefore(voucher.ngayBatDau) ||
    //   dayjs(ngayBatDau).isBefore(dayjs()) ||
    //   dayjs(ngayBatDau).isAfter(voucher.ngayKetThuc)
    // ) {
    //   msg.ngayBatDau = "Không thể chọn ngày quá khứ !!!";
    // }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    handleOpenDialogConfirmUpdate();
  };

  return (
    <>
      <div className="add-voucher-container mt-4">
        <div className="mx-auto" style={{ maxWidth: "70%" }}>
          <div className="text-center pt-3 mb-3">
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
              SỬA VOUCHER
            </span>
          </div>

          <div className="text-center">
            <div
              className="d-flex"
              style={{ marginLeft: "30px", marginBottom: "15px" }}
            >
              <TextField
                className="custom"
                label="Tên Voucher"
                value={ten}
                id="fullWidth"
                onChange={(e) => {
                  setTen(e.target.value);
                }}
                style={{ width: "780px" }}
                inputProps={{
                  maxLength: 100, // Giới hạn tối đa 10 ký tự
                }}
                error={validationMsg.ten !== undefined}
                helperText={validationMsg.ten}
              />
            </div>
            <div
              className="d-flex"
              style={{
                marginLeft: "30px",
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              <div>
                <TextField
                  className="custom"
                  label="Nhập mã hoặc mã tự động"
                  value={ma}
                  id="fullWidth"
                  onChange={handleInputCodeVoucher}
                  style={{ width: "380px" }}
                  inputProps={{
                    maxLength: 20, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.ma !== undefined}
                  helperText={validationMsg.ma}
                />
              </div>
              <div className="ms-4">
                <TextField
                  className="custom"
                  label="Số Lượng"
                  value={soLuong}
                  id="fullWidth"
                  onChange={handleInputNumberVoucher}
                  style={{ width: "380px" }}
                  inputProps={{
                    maxLength: 10, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.soLuong !== undefined}
                  helperText={validationMsg.soLuong}
                />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                marginLeft: "30px",
                marginBottom: "5px",
                marginTop: "15px",
              }}
            >
              {/* <div>
                <RadioGroup
                  orientation="horizontal"
                  aria-label="Alignment"
                  name="alignment"
                  variant="outlined"
                  value={selectDiscount}
                  onChange={handleChangeToggleButtonDiscount}
                  sx={{ borderRadius: "12px" }}
                  defaultValue={"VND"}
                >
                  {[TypeDiscountString.VND, TypeDiscountString.PERCENT].map(
                    (item) => (
                      <Box
                        key={item}
                        sx={(theme) => ({
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 55,
                          height: 54,
                          "&:not([data-first-child])": {
                            borderLeft: "1px solid",
                            borderdivor: "divider",
                          },
                          [`&[data-first-child] .${radioClasses.action}`]: {
                            borderTopLeftRadius: `calc(${theme.vars.radius.sm} + 2px)`,
                            borderBottomLeftRadius: `calc(${theme.vars.radius.sm} + 2px)`,
                          },
                          [`&[data-last-child] .${radioClasses.action}`]: {
                            borderTopRightRadius: `calc(${theme.vars.radius.sm} + 2px)`,
                            borderBottomRightRadius: `calc(${theme.vars.radius.sm} + 2px)`,
                          },
                        })}
                      >
                        <Radio
                          value={
                            item === TypeDiscountString.VND
                              ? TypeDiscountString.VND
                              : TypeDiscountString.PERCENT
                          }
                          disableIcon
                          overlay
                          label={[
                            item === TypeDiscountString.VND
                              ? "VND"
                              : item === TypeDiscountString.PERCENT
                              ? "%"
                              : "",
                          ]}
                          variant={selectDiscount === item ? "solid" : "plain"}
                          slotProps={{
                            input: { "aria-label": item },
                            action: {
                              sx: { borderRadius: 0, transition: "none" },
                            },
                            label: { sx: { lineHeight: 0 } },
                          }}
                        />
                      </Box>
                    )
                  )}
                </RadioGroup>
              </div> */}
              <div>
                <TextField
                  className="custom"
                  label="Nhập Giá Trị phiếu giảm giá"
                  value={value}
                  onChange={handleChange}
                  id="outlined-start-adornment"
                  InputProps={{
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">VNĐ</InputAdornment>
                    ),
                  }}
                  style={{
                    width: "380px",
                  }}
                  inputProps={{
                    maxLength: 20, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.value !== undefined}
                  helperText={validationMsg.value}
                />
              </div>
              <div className="ms-4">
                {" "}
                <TextField
                  className="custom"
                  label="Điều kiện áp dụng"
                  value={value1}
                  onChange={handleChange1}
                  id="outlined-start-adornment"
                  InputProps={{
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">VNĐ</InputAdornment>
                    ),
                  }}
                  style={{ width: "380px" }}
                  inputProps={{
                    maxLength: 20, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.value1 !== undefined}
                  helperText={validationMsg.value1}
                />
              </div>
              {/* <div className="ms-4">
                <TextField
                  className="custom"
                  label="Giá Trị Tối Đa"
                  value={valueToiDa}
                  id="outlined-start-adornment"
                  onChange={handleChangeGiaTriToiDa}
                  InputProps={{
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                  }}
                  disabled={
                    selectDiscount === TypeDiscountString.VND ? true : false
                  }
                  style={{
                    width: "312px",
                  }}
                  inputProps={{
                    maxLength: 20, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.valueToiDa !== undefined}
                  helperText={validationMsg.valueToiDa}
                />
              </div> */}
            </div>
            <div
              className="d-flex"
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                marginTop: "15px",
              }}
            >
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      className="custom"
                      ampm={true}
                      disablePast={true}
                      label="Ngày Bắt Đầu"
                      format="HH:mm DD/MM/YYYY"
                      value={dayjs(ngayBatDau)}
                      onChange={(e) => {
                        setNgayBatDau(e);
                      }}
                      sx={{ width: "380px" }}
                      slotProps={{
                        textField: {
                          error: validationMsg.ngayBatDau !== undefined,
                          helperText:
                            !!validationMsg.ngayBatDau !== undefined
                              ? validationMsg.ngayBatDau
                              : "",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="ms-4" style={{ marginLeft: "15px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      className="custom"
                      ampm={true}
                      label="Ngày Kết Thúc"
                      value={dayjs(ngayKetThuc)}
                      format="HH:mm DD/MM/YYYY"
                      disablePast={true}
                      onChange={(e) => {
                        setNgayKetThuc(e);
                      }}
                      sx={{ width: "380px" }}
                      slotProps={{
                        textField: {
                          error: validationMsg.ngayKetThuc !== undefined,
                          helperText:
                            !!validationMsg.ngayKetThuc !== undefined
                              ? validationMsg.ngayKetThuc
                              : "",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
        <div>
          {status === StatusDiscountNumber.HOAT_DONG ? (
            <Alert
              severity="warning"
              className="mx-auto"
              style={{ maxWidth: "65%" }}
            >
              Không thể sửa khi phiếu giảm giá ĐANG HOẠT ĐỘNG, hãy đổi trạng
              thái thành tạm dừng!
            </Alert>
          ) : status === StatusDiscountNumber.DA_HUY ? (
            <Alert
              severity="warning"
              className="mx-auto"
              style={{ maxWidth: "65%" }}
            >
              Không thể sửa khi phiếu giảm giá ĐÃ HỦY!
            </Alert>
          ) : (
            ""
          )}
        </div>
        <div className="btn-accept-update mt-3">
          <Button
            className="rounded-2 button-mui"
            type="primary"
            style={{ height: "40px", width: "auto", fontSize: "15px" }}
            disabled={
              status === StatusDiscountNumber.HOAT_DONG
                ? true
                : status === StatusDiscountNumber.DA_HUY
                ? true
                : false
            }
            onClick={() => {
              handleSubmit();
            }}
          >
            <span style={{ marginBottom: "2px", fontWeight: "500" }}>
              Xác nhận
            </span>
          </Button>
          <Button
            className="rounded-2 button-mui ms-2"
            type="primary"
            style={{ height: "40px", width: "auto", fontSize: "15px" }}
            onClick={() => {
              setTimeout(() => {
                setIsLoading(false);
                redirectToHienThiVoucher();
              }, 200);
            }}
          >
            <span style={{ marginBottom: "2px", fontWeight: "500" }}>
              Quay về
            </span>
          </Button>
        </div>
      </div>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseDialogConfirmUpdate}
        add={updateVoucher}
        title={<Title />}
        header={<Header />}
      />
      {!isLoading && <LoadingIndicator />}
    </>
  );
};

export default UpdateVoucher;
