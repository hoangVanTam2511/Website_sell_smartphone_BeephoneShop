import { Button, Col, Row } from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import "../voucher-manager/style.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/joy/Box";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import {
  Notistack,
  TypeDiscountNumber,
  TypeDiscountString,
} from "../order-manager/enum";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import useCustomSnackbar from "../../../utilities/notistack";
import LoadingIndicator from "../../../utilities/loading";

const AddVoucher = () => {
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState(dayjs());
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  const [dieuKienApDungConvert, setDieuKienApDungConvert] = useState(0);
  const [soLuong, setSoLuong] = useState();
  const [validationMsg, setValidationMsg] = useState({});
  const [giaTriVoucherConvert, setGiaTriVoucherConvert] = useState(0);
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState();
  const [selectDiscount, setSeclectDiscount] = useState(TypeDiscountString.VND);
  const [giaTriToiDa, setGiaTriToiDa] = useState();
  const [valueToiThieu, setValueToiThieu] = React.useState();
  const [valueToiDa, setValueToiDa] = React.useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const handleOpenDialogConfirmAdd = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmAdd = () => {
    setOpenConfirm(false);
  };

  const Header = () => {
    return (
      <>
        <span style={{ fontWeight: "bold" }}>Xác nhận thêm voucher</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>
          Bạn có chắc chắc muốn thêm voucher có tên là{" "}
          <span style={{ color: "red" }}>"{ten}"</span> và giá trị{" "}
          <span style={{ color: "red" }}>"{value}</span>
          <span style={{ color: "red" }}>
            {selectDiscount === TypeDiscountString.VND ? "VND" : "%"}"
          </span>{" "}
          không ?
        </span>
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
      setGiaTriVoucherConvert(numericValue);
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
      setGiaTriVoucherConvert(inputValue);
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
    setDieuKienApDungConvert(numericValue);
  };

  const handleChangeGiaTriToiDa = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
    const formattedValue = inputValue
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueToiDa(formattedValue);
    setGiaTriToiDa(numericValue);
  };

  const redirectToHienThiVoucher = () => {
    window.location.href = "/dashboard/voucher";
  };

  const addVoucher = () => {
    setIsLoading(true);
    let obj = {
      ma: ma,
      ten: ten,
      dieuKienApDung: dieuKienApDungConvert,
      soLuong: soLuong,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      giaTriVoucher: giaTriVoucherConvert,
      giaTriToiDa: giaTriToiDa,
      loaiVoucher: selectDiscount,
    };

    axios
      .post(apiURLVoucher + "/addVoucher", obj)
      .then((response) => {
        handleOpenAlertVariant("Thêm thành công!!!", Notistack.SUCCESS);
        setIsLoading(false);
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
    } else if (selectDiscount === TypeDiscountString.PERCENT && value <= 0) {
      msg.value = "Giá trị voucher trong khoảng 1% - 100% !!!";
    }

    if (
      (selectDiscount === TypeDiscountString.VND && numericValue2 <= 0) ||
      (selectDiscount === TypeDiscountString.VND && numericValue2 > 100000000)
    ) {
      msg.value = "Giá trị voucher từ 1đ - 100.000.000đ";
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

    if (ngayBatDau === ngayKetThuc) {
      msg.ngayKetThuc = "Ngày kết thúc không được bằng ngày bắt đầu !!!";
    }

    if (ngayKetThuc.isBefore(ngayBatDau)) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu !!!";
    }

    if (ngayBatDau.isBefore(dayjs())) {
      msg.ngayBatDau = "Ngày bắt đầu phải lớn hơn ngày hiện tại !!!";
    }

    if (ngayBatDau.isAfter(ngayKetThuc)) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (ngayKetThuc.isBefore(dayjs())) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày hiện tại !!!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    handleOpenDialogConfirmAdd();
  };

  const handleChangeToggleButtonDiscount = (event, newAlignment) => {
    var oldAligment = event.target.value;

    if (newAlignment != null) {
      setSeclectDiscount(newAlignment);
      setValue2(null);
    }

    if (newAlignment == null) {
      setSeclectDiscount(oldAligment);
    }
    console.log(oldAligment);
    handleReset();
  };

  const handleReset = () => {
    setValue("");
    setValueToiDa("");
    setValueToiThieu("");
  };

  return (
    <>
      <div className="add-voucher-container mt-4">
        <h4
          style={{
            marginBottom: "20px",
            marginLeft: "40px",
            marginTop: "15px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Thêm Voucher
        </h4>

        <div className="text-center">
          <div
            className="d-flex"
            style={{ marginLeft: "40px", marginBottom: "15px" }}
          >
            <div>
              <TextField
                label="Nhập mã hoặc mã tự động"
                value={ma}
                id="fullWidth"
                onInput={handleInputCodeVoucher}
                style={{ width: "330px" }}
                inputProps={{
                  maxLength: 10, // Giới hạn tối đa 10 ký tự
                }}
                error={validationMsg.ma !== undefined}
                helperText={validationMsg.ma}
              />
              {/* <span className="validate" style={{ color: "red" }}>
                {validationMsg.ma}
              </span> */}
            </div>
            <div className="ms-4">
              <TextField
                label="Tên Voucher"
                value={ten}
                id="fullWidth"
                onChange={(e) => {
                  setTen(e.target.value);
                }}
                style={{ width: "330px" }}
                inputProps={{
                  maxLength: 100,
                }}
                error={validationMsg.ten !== undefined}
                helperText={validationMsg.ten}
              />
            </div>
          </div>
          <div
            className="d-flex"
            style={{ marginLeft: "40px", marginBottom: "15px" }}
          >
            <div>
              <TextField
                label="Số Lượng"
                value={soLuong}
                id="fullWidth"
                onChange={handleInputNumberVoucher}
                style={{ width: "330px" }}
                inputProps={{
                  maxLength: 10, // Giới hạn tối đa 10 ký tự
                }}
                error={validationMsg.soLuong !== undefined}
                helperText={validationMsg.soLuong}
              />
            </div>
            <div className="ms-4">
              {" "}
              <TextField
                label="Điều kiện áp dụng khi đơn hàng đạt"
                value={value1}
                onChange={handleChange1}
                id="outlined-start-adornment"
                InputProps={{
                  inputMode: "numeric",
                  startAdornment: (
                    <InputAdornment position="start">VND</InputAdornment>
                  ),
                }}
                style={{ width: "330px" }}
                inputProps={{
                  maxLength: 20,
                }}
                error={validationMsg.value1 !== undefined}
                helperText={validationMsg.value1}
              />
            </div>
          </div>

          <div
            className="d-flex"
            style={{ marginLeft: "40px", marginBottom: "5px" }}
          >
            <div>
              <RadioGroup
                orientation="horizontal"
                aria-label="Alignment"
                name="alignment"
                variant="outlined"
                value={selectDiscount}
                onChange={handleChangeToggleButtonDiscount}
                sx={{ borderRadius: "12px" }}
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
                        width: 50,
                        height: 54,
                        "&:not([data-first-child])": {
                          borderLeft: "1px solid",
                          borderdivor: "divider",
                        },
                        [`&[data-first-child] .${radioClasses.action}`]: {
                          borderTopLeftRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                          borderBottomLeftRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                        },
                        [`&[data-last-child] .${radioClasses.action}`]: {
                          borderTopRightRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                          borderBottomRightRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                        },
                      })}
                    >
                      <Radio
                        value={item}
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
            </div>
            <div className="ms-4">
              <TextField
                label="Nhập Giá Trị Voucher"
                value={value}
                onChange={handleChange}
                id="outlined-start-adornment"
                InputProps={{
                  inputMode: "numeric",
                  startAdornment: (
                    <InputAdornment position="start">
                      {selectDiscount === TypeDiscountString.VND
                        ? TypeDiscountString.VND
                        : TypeDiscountString.PERCENT
                        ? "%"
                        : ""}
                    </InputAdornment>
                  ),
                }}
                style={{
                  width: "267px",
                }}
                inputProps={{
                  maxLength: 20,
                }}
                error={validationMsg.value !== undefined}
                helperText={validationMsg.value}
              />
            </div>
            <div className="ms-4">
              <TextField
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
                  width: "267px",
                }}
                inputProps={{
                  maxLength: 20,
                }}
                error={validationMsg.valueToiDa !== undefined}
                helperText={validationMsg.valueToiDa}
              />
            </div>
          </div>
          <div
            className="d-flex"
            style={{ marginLeft: "40px", marginBottom: "10px" }}
          >
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    ampm={true}
                    disablePast={true}
                    label="Ngày Bắt Đầu"
                    format="HH:mm DD/MM/YYYY"
                    value={ngayBatDau}
                    onChange={(e) => {
                      setNgayBatDau(e);
                      setNgayKetThuc(e);
                    }}
                    sx={{ width: "330px" }}
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
                    ampm={true}
                    label="Ngày Kết Thúc"
                    value={ngayKetThuc}
                    format="HH:mm DD/MM/YYYY"
                    disablePast={true}
                    onChange={(e) => {
                      setNgayKetThuc(e);
                    }}
                    sx={{
                      width: "330px",
                      "& .MuiInputAdornedEnd-root .Mui-disabled": {
                        backgroundColor: "red", // Thay đổi màu nền của input khi disabled
                      },
                    }}
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
        <div className="btn-accept-voucher mt-3">
          <Button
            className="rounded-2 button-mui"
            type="primary"
            style={{ height: "35px", width: "120px", fontSize: "15px" }}
            onClick={() => handleSubmit()}
          >
            <FontAwesomeIcon icon={faCheck} />
            <span
              className="ms-2 ps-1"
              style={{ marginBottom: "3px", fontWeight: "500" }}
            >
              Xác nhận
            </span>
          </Button>
          <Button
            className="rounded-2 button-mui ms-2"
            type="primary"
            style={{ height: "35px", width: "120px", fontSize: "15px" }}
            onClick={() => {
              setTimeout(() => {
                setIsLoading(false);
                redirectToHienThiVoucher();
              }, 200);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span
              className="ms-2 ps-1"
              style={{ marginBottom: "3px", fontWeight: "500" }}
            >
              Quay về
            </span>
          </Button>
        </div>
      </div>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseDialogConfirmAdd}
        add={addVoucher}
        title={<Title />}
        header={<Header />}
      />
      {!isLoading && <LoadingIndicator />}
    </>
  );
};

export default AddVoucher;
