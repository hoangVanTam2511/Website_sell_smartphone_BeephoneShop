import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import "../voucher-manager/style.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import "react-toastify/dist/ReactToastify.css";
import { Notistack, TypeDiscountString } from "../order-manager/enum";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import useCustomSnackbar from "../../../utilities/notistack";
import { useNavigate } from "react-router-dom";
import { request } from "../../../store/helpers/axios_helper";

const AddVoucher = () => {
  const navigate = useNavigate();
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
  const [selectDiscount, setSeclectDiscount] = useState(TypeDiscountString.VND);
  const [giaTriToiDa, setGiaTriToiDa] = useState();
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
        <span style={{ fontWeight: "bold" }}>Xác nhận thêm phiếu giảm giá</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>Bạn có chắc chắn muốn thêm phiếu giảm giá không ?</span>
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

  const redirectToHienThiVoucher = () => {
    navigate("/dashboard/vouchers");
  };

  const handleUpdateVoucher = (id) => {
    navigate(`/dashboard/update-voucher/${id}`);
  };

  const sendMailVoucher = (maVoucher) => {
    let obj = {
      subject: "ok",
      ma: maVoucher,
      ten: ten,
      dieuKienApDung: dieuKienApDungConvert,
      giaTriVoucher: giaTriVoucherConvert,
      startTime: ngayBatDau,
      endTime: ngayKetThuc,
    };
    request("POST", "/email/send-html-email/voucher", obj)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        handleOpenAlertVariant("Đã xảy ra lỗi", Notistack.ERROR);
      });
  };

  const addVoucher = () => {
    setIsLoading(false);
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

    request("POST", apiURLVoucher + "/addVoucher", obj)
      .then((response) => {
        setTimeout(() => {
          setIsLoading(true);
          // handleUpdateVoucher(response.data.data.id);
          redirectToHienThiVoucher();
          handleOpenAlertVariant("Thêm thành công!!!", Notistack.SUCCESS);
          sendMailVoucher(response.data.data.ma);
        }, 1000);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const validationAll = () => {
    const msg = {};

    if (!ten.trim("")) {
      msg.ten = "Tên không được trống.";
    }

    if (!(ma.trim().length === 0 || (ma.length >= 10 && ma.length <= 15))) {
      msg.ma = "Mã giảm giá phải từ 10 đến 15 ký tự.";
    }

    if (soLuong == null || soLuong === "") {
      msg.soLuong = "Số lượng không được trống.";
    }

    if (soLuong <= 0 || soLuong > 10000) {
      msg.soLuong = "Số lượng cho phép từ 1 - 10000";
    }

    const numericValue1 = parseFloat(value1?.replace(/[^0-9.-]+/g, ""));
    if (value1 == null || value1 === "") {
      msg.value1 = "Điều kiện áp dụng không được trống.";
    }

    if (numericValue1 <= 0 || numericValue1 > 100000000) {
      msg.value1 = "Điều kiện áp dụng từ 1đ - 100.000.000đ";
    }

    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    if (value == null || value === "") {
      msg.value = "Giá trị voucher không được trống.";
    }
    if (numericValue2 > numericValue1) {
      msg.value = "Giá trị voucher không được lớn hơn điều kiện áp dụng.";
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
      msg.valueToiDa = "Giá trị tối đa không được trống.";
    }

    if (
      (selectDiscount === TypeDiscountString.PERCENT && numericValue3 <= 0) ||
      (selectDiscount === TypeDiscountString.PERCENT &&
        numericValue3 > 100000000)
    ) {
      msg.valueToiDa = "Giá trị tối đa từ 1đ - 100.000.000đ";
    }

    if (ngayBatDau === ngayKetThuc) {
      msg.ngayKetThuc = "Ngày kết thúc không được bằng ngày bắt đầu.";
    }

    if (ngayKetThuc.isBefore(ngayBatDau)) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu.";
    }

    if (ngayBatDau.isBefore(dayjs())) {
      msg.ngayBatDau = "Ngày bắt đầu phải lớn hơn ngày hiện tại.";
    }

    if (ngayBatDau.isAfter(ngayKetThuc)) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc.";
    }

    if (ngayKetThuc.isBefore(dayjs())) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày hiện tại.";
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

  // const handleChangeToggleButtonDiscount = (event, newAlignment) => {
  //   var oldAligment = event.target.value;

  //   if (newAlignment != null) {
  //     setSeclectDiscount(newAlignment);
  //     setValue2(null);
  //   }

  //   if (newAlignment == null) {
  //     setSeclectDiscount(oldAligment);
  //   }
  //   handleReset();
  // };

  // const handleReset = () => {
  //   setValue("");
  //   setValueToiDa("");
  //   setValueToiThieu("");
  // };

  return (
    <>
      <div className="add-voucher-container mt-4">
        <div className="mx-auto" style={{ maxWidth: "70%" }}>
          <div className="text-center pt-3 mb-3" style={{}}>
            <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
              THÊM PHIẾU GIẢM GIÁ
            </span>
          </div>
          <div
            className="d-flex"
            style={{ marginLeft: "7px", marginBottom: "15px" }}
          >
            <div className="ms-4">
              <TextField
                className="custom"
                label="Tên phiếu giảm giá"
                value={ten}
                id="fullWidth"
                onChange={(e) => {
                  setTen(e.target.value);
                }}
                style={{ width: "780px" }}
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
            style={{
              marginLeft: "30px",
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            <div>
              <TextField
                fullWidth
                className="custom"
                label="Nhập mã hoặc mã tự động"
                value={ma}
                id="fullWidth"
                onInput={handleInputCodeVoucher}
                style={{ width: "380px" }}
                inputProps={{
                  maxLength: 15, // Giới hạn tối đa 10 ký tự
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
                className="custom"
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
            </div> */}
            <div>
              <TextField
                className="custom"
                label="Giá Trị phiếu giảm giá"
                value={value}
                onChange={handleChange}
                id="outlined-end-adornment"
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
                  maxLength: 20,
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
                id="outlined-end-adornment"
                InputProps={{
                  inputMode: "numeric",
                  startAdornment: (
                    <InputAdornment position="start">VNĐ</InputAdornment>
                  ),
                }}
                style={{ width: "380px" }}
                inputProps={{
                  maxLength: 20,
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
                id="outlined-end-adornment"
                onChange={handleChangeGiaTriToiDa}
                InputProps={{
                  inputMode: "numeric",
                  endAdornment: (
                    <InputAdornment position="end">đ</InputAdornment>
                  ),
                }}
                disabled={
                  selectDiscount === TypeDiscountString.VND ? true : false
                }
                style={{
                  width: "317px",
                }}
                inputProps={{
                  maxLength: 20,
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
                    value={ngayBatDau}
                    onChange={(e) => {
                      setNgayBatDau(e);
                      setNgayKetThuc(e);
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
                    value={ngayKetThuc}
                    format="HH:mm DD/MM/YYYY"
                    disablePast={true}
                    onChange={(e) => {
                      setNgayKetThuc(e);
                    }}
                    sx={{
                      width: "380px",
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
            onClick={() => {
              handleSubmit();
            }}
            className={
              !isLoading ? "loading" : undefined + " button-mui rounded-2"
            }
            type="primary"
            style={{ height: "40px", width: "auto", fontSize: "15px" }}
          >
            <div className="spinner" />
            <span
              className="text-loading"
              style={{ marginBottom: "2px", fontWeight: "500" }}
            >
              Xác Nhận
            </span>
          </Button>
          {/* <Button
            onClick={() => handleSubmit()}
            className="rounded-2 button-mui"
            type="primary"
            style={{ height: "40px", width: "auto", fontSize: "15px" }}
          >
            <span style={{ marginBottom: "2px", fontWeight: "500" }}>
              Xác Nhận
            </span>
          </Button> */}
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
        onClose={handleCloseDialogConfirmAdd}
        add={addVoucher}
        title={<Title />}
        header={<Header />}
      />
      {/* {!isLoading && <LoadingIndicator />} */}
    </>
  );
};

export default AddVoucher;
