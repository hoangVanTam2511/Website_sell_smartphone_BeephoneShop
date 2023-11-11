import { Button, Checkbox } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookmark,
  faCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKhuyenMai, apiURLSanPham } from "../../../service/api";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Table } from "antd";
import numeral from "numeral";
import style from "./style.css";

import Box from "@mui/joy/Box";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Badge from "@mui/joy/Badge";
import { Notistack, TypeDiscountString } from "../order-manager/enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import LoadingIndicator from "../../../utilities/loading";

const AddKhuyenMai = () => {
  //add-khuyen-mai
  const [tenKhuyenMai, setTenKhuyenMai] = useState("");
  const [giaTriKhuyenMai, setGiaTriKhuyenMai] = useState(0);
  const [ngayBatDau, setNgayBatDau] = useState(dayjs());
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  const [selectDiscount, setSeclectDiscount] = useState(
    TypeDiscountString.PERCENT
  );
  const [value, setValue] = React.useState();
  const [value2, setValue2] = React.useState();

  //san-pham
  const [listSanPham, setListSanPham] = useState([]);
  const [listSanPhamChiTiet, setlistSanPhamChiTiet] = useState([]);

  //khuyenmaichitiet
  const [validationMsg, setValidationMsg] = useState({});
  //check-box
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);

  //Lấy id ctsp
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  const [sanPhamChiTietKhuyenMai, setSanPhamChiTietKhuyenMai] = useState([]);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  let successfulCount = 0;
  let successfulCount1 = 0;

  const redirectToHienThiKhuyenMai = () => {
    window.location.href = "/khuyen-mai";
  };

  const handleOpenDialogConfirmAdd = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmAdd = () => {
    setOpenConfirm(false);
  };

  const Header = () => {
    return (
      <>
        <span className="">Xác nhận thêm giảm giá</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>
          Bạn có chắc chắc muốn thêm giá trị có tên là{" "}
          <span style={{ color: "red" }}>{tenKhuyenMai}</span> và với giá trị{" "}
          <span style={{ color: "red" }}>{value}</span>
          <span style={{ color: "red" }}>
            {selectDiscount === TypeDiscountString.VND ? "VND" : "%"}
          </span>{" "}
          không ?
        </span>
      </>
    );
  };

  const loadDatalistSanPham = () => {
    axios
      .get("http://localhost:8080/san-pham-1")
      .then((response) => {
        setListSanPham(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const loadDatalistSanPhamChiTiet = (id, check) => {
    axios
      .get(`http://localhost:8080/san-pham-chi-tiet-1/${id}/${check}`)
      .then((response) => {
        setlistSanPhamChiTiet(response.data.data);
        const data = response.data.data;
        const productDetailsIds = data.map((item) => item.id);
        setSelectedRowKeys1(productDetailsIds);
        setSelectedProductDetails(response.data.data.map((item) => item.id));
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const clear = () => {
    axios
      .get("http://localhost:8080/san-pham-chi-tiet/removeALL")
      .then((response) => {
        setlistSanPhamChiTiet(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  useEffect(() => {
    loadDatalistSanPham();
  }, []);

  const handleChange = (event) => {
    if (selectDiscount === TypeDiscountString.VND) {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(formattedValue);
      setGiaTriKhuyenMai(numericValue);
      setIsInputChanged(true);
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
      setGiaTriKhuyenMai(inputValue);
    }
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
    handleReset();
  };

  const handleReset = () => {
    setValue("");
  };

  //Detail sản phẩm chi tiết đã áp dụng khuyến mãi
  const detailSanPhamSauKhuyenMai = (id) => {
    axios
      .get("http://localhost:8080/san-pham-chi-tiet-khuyen-mai/detail/" + id)
      .then((response) => {
        setSanPhamChiTietKhuyenMai(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  //Hàm áp dụng khuyến mãi cho sản phẩm
  const addKhuyenMai = () => {
    let obj = {
      tenKhuyenMai: tenKhuyenMai,
      giaTriKhuyenMai: giaTriKhuyenMai,
      loaiKhuyenMai: selectDiscount,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
    };

    axios
      .post(apiURLKhuyenMai + "/add-khuyen-mai", obj)
      .then((response) => {
        const khuyenMaiID = response.data.data.id;
        selectedProductDetails.forEach((idSanPhamChiTiet) => {
          successfulCount++;
          addKhuyenMaiChiTiet(khuyenMaiID, idSanPhamChiTiet);
        });
        handleOpenAlertVariant("Thêm giảm giá thành công.", Notistack.SUCCESS);
        setTimeout(() => {
          redirectToHienThiKhuyenMai();
        }, 1000);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  // Hàm thêm vào khuyến mãi chi tiết
  const addKhuyenMaiChiTiet = (khuyenMaiID, idSanPhamChiTiet) => {
    let objKhuyenMaiChiTiet = {
      idKhuyenMai: khuyenMaiID,
      idSanPhamChiTiet: idSanPhamChiTiet,
    };
    axios
      .post(
        "http://localhost:8080/khuyen-mai-chi-tiet/add",
        objKhuyenMaiChiTiet
      )
      .then((response) => {
        successfulCount1++;
        if (successfulCount === successfulCount1) {
          handleOpenAlertVariant(
            "Áp dụng giảm giá thành công",
            Notistack.SUCCESS
          );
        }
      })
      .catch((error) => {
        successfulCount1++;
        if (successfulCount === successfulCount1) {
          handleOpenAlertVariant(
            "Đã xảy ra lỗi khi áp dụng giảm giá.",
            Notistack.ERROR
          );
        }
      });
  };

  //Validate
  const validationAll = () => {
    const msg = {};

    if (!tenKhuyenMai.trim("")) {
      msg.tenKhuyenMai = "Tên không được để trống!";
    } else if (/^\s+|\s+$/.test(tenKhuyenMai)) {
      msg.tenKhuyenMai =
        "Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi!";
    } else if (tenKhuyenMai.length < 5) {
      msg.tenKhuyenMai = "Tên phải có ít nhất 5 ký tự!";
    }
    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    if (value == null || value === "") {
      msg.giaTriKhuyenMai = "Giá trị giảm giá không được để trống!";
    }

    if (
      (selectDiscount === TypeDiscountString.VND && numericValue2 <= 0) ||
      (selectDiscount === TypeDiscountString.VND && numericValue2 > 100000000)
    ) {
      msg.giaTriKhuyenMai = "Giá trị giảm giá từ 1đ đến 100.000.000đ!";
    }

    if (selectDiscount === TypeDiscountString.PERCENT && numericValue2 <= 0) {
      msg.giaTriKhuyenMai = "Giá trị tối đa chỉ nằm trong khoảng 1% - 100%!";
    }

    if (ngayKetThuc.isBefore(ngayBatDau) | (ngayKetThuc === ngayBatDau)) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu!";
    } else if (ngayBatDau.isAfter(ngayKetThuc)) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!";
    }

    if (ngayBatDau.isBefore(dayjs())) {
      msg.ngayBatDau = "Ngày bắt đầu phải lớn hơn ngày hiện tại!";
    }

    if (ngayKetThuc.isBefore(dayjs())) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày hiện tại!";
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

  //Code check box
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length === 0) {
      clear();
    } else {
      clear();
      newSelectedRowKeys
        .reduce((prevPromise, id) => {
          return prevPromise.then(() => loadDatalistSanPhamChiTiet(id, true));
        }, Promise.resolve())
        .catch((error) => {
          console.log("Đã xảy ra lỗi");
        });
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const onSelectChange1 = (newSelectedRowKeys1) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys1);
    setSelectedRowKeys1(newSelectedRowKeys1);
    setSelectedProductDetails(newSelectedRowKeys1);
  };

  const rowSelection1 = {
    selectedRowKeys: selectedRowKeys1,
    onChange: onSelectChange1,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  //Column bảng Sản Phẩm
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
      render: (text, record, index) => (
        <span>{listSanPham.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Mã",
      dataIndex: "maSanPham",
      key: "maSanPham",
      width: "30%",
      align: "center",
    },
    {
      title: "Tên sản phẩm ",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      width: "30%",
      editable: true,
      align: "center",
    },
    {
      title: "Hãng ",
      dataIndex: "tenHang",
      key: "tenHang",
      width: "30%",
      editable: true,
      align: "center",
    },
  ];

  //Column bảng Sản Phẩm Chi Tiết
  const columns1 = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
      render: (text, record, index) => (
        <span>{listSanPhamChiTiet.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      key: "duongDan",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Badge
          showZero={true}
          className="ms-2"
          badgeContent={record.size}
          color="primary"
        >
          <div className="image-container" style={{ position: "relative" }}>
            <img
              src={record.duongDan}
              alt="Ảnh"
              style={{ width: "100px", height: "100px" }}
            />
            {record.giaTriKhuyenMai !== null && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{
                    fontSize: "2.7em",
                    color: record.giaTriKhuyenMai > 50 ? "red" : "#ffcc00",
                    zIndex: 1,
                    position: "relative",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "43%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "11px",
                    color: record.giaTriKhuyenMai > 50 ? "white" : "black",
                    zIndex: 2,
                  }}
                >
                  <strong>
                    Giảm
                    <br /> {record.giaTriKhuyenMai}%
                  </strong>
                </span>
              </div>
            )}
          </div>
        </Badge>
      ),
    },

    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      width: "20%",
      align: "center",
      maxWidth: "20%",
      render: (value, record) => {
        let tenSanPham = value;
        return (
          <span style={{ whiteSpace: "pre-line" }}>
            {record.tenSanPham} {record.kichThuocRam}GB/{record.kichThuocRom}GB
          </span>
        );
      },
    },
    {
      title: "Màu Sắc ",
      dataIndex: "tenMauSac",
      key: "tenMauSac",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "Đơn giá ",
      dataIndex: "donGia",
      key: "donGia",
      width: "20%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = numeral(record.donGia).format("0,0 VND") + " ₫";
        return <span>{formattedValue}</span>;
      },
    },

    {
      title: "Giảm giá",
      dataIndex: "giaTriKhuyenMai",
      key: "giaTriKhuyenMai",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        let formattedValue = value;
        if (selectDiscount === TypeDiscountString.VND) {
          formattedValue = numeral(value).format("0,0 VND") + " ₫";
        } else if (selectDiscount === TypeDiscountString.PERCENT) {
          formattedValue = value + " %";
        }
        return <span>{formattedValue}</span>;
      },
    },

    {
      title: "Đơn giá sau giảm giá",
      dataIndex: "donGiaSauKhuyenMai",
      key: "donGiaSauKhuyenMai",
      width: "20%",
      editable: true,
      align: "center",
      whiteSpace: "pre-line",
      render: (_, record) => {
        if (isInputChanged) {
          const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
          let giaTriKhuyenMai = record.donGia;
          if (selectDiscount === TypeDiscountString.VND) {
            giaTriKhuyenMai = record.donGia - numericValue2;
            return (
              <span>{numeral(giaTriKhuyenMai).format("0,0 VND") + " ₫"}</span>
            );
          } else if (selectDiscount === TypeDiscountString.PERCENT) {
            giaTriKhuyenMai =
              record.donGia - (record.donGia * numericValue2) / 100;
            return (
              <span>{numeral(giaTriKhuyenMai).format("0,0 VND") + " ₫"}</span>
            );
          }
        } else {
          let formattedValue = record.donGia;
          formattedValue = numeral(record.donGia).format("0,0 VND") + " ₫";
          return <span>{formattedValue}</span>;
        }
      },
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-5">
          <div className="mt-3 add-promotion-container">
            <h5
              className="title-promotion ms-3"
              style={{ paddingBottom: "2px", paddingLeft: "10px" }}
            >
              Thêm Giảm Giá
            </h5>
            <div className="ms-3 mb-3 mt-2">
              <div className="input-container">
                <TextField
                  label="Tên Giảm Giá:"
                  value={tenKhuyenMai}
                  id="fullWidth"
                  onChange={(e) => {
                    setTenKhuyenMai(e.target.value);
                  }}
                  style={{ width: "430px", marginTop: "10px" }}
                  inputProps={{
                    maxLength: 255, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.tenKhuyenMai !== undefined}
                  helperText={validationMsg.tenKhuyenMai}
                />
              </div>
            </div>

            <div className="d-flex ms-3">
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
                  {[TypeDiscountString.PERCENT, TypeDiscountString.VND].map(
                    (item) => (
                      <Box
                        key={item}
                        sx={(theme) => ({
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 47,
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
              <div>
                <TextField
                  label="Nhập Giá Trị Giảm Giá"
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
                    marginLeft: "15px",
                    width: "320px",
                  }}
                  inputProps={{
                    maxLength: 20, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.giaTriKhuyenMai !== undefined}
                  helperText={validationMsg.giaTriKhuyenMai}
                />
              </div>
            </div>
            <div className="row-input-date ms-3 mt-2">
              <div className="input-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      ampm={true}
                      disablePast={true}
                      label="Ngày Bắt Đầu"
                      value={ngayBatDau}
                      format="HH:mm DD/MM/YYYY"
                      onChange={(e) => {
                        setNgayBatDau(e);
                        setNgayKetThuc(e);
                      }}
                      sx={{ width: "430px" }}
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
            </div>
            <div className="row-input-date ms-3 mt-2">
              <div className="input-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      ampm={true}
                      disablePast={true}
                      label="Ngày Kết Thúc"
                      value={ngayKetThuc}
                      format="HH:mm DD/MM/YYYY"
                      onChange={(e) => {
                        setNgayKetThuc(e);
                      }}
                      sx={{ width: "430px", marginTop: "20px" }}
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
            <div className="btn-accept mt-3">
              <Button
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "35px", width: "100px", fontSize: "15px" }}
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faCheck} />
                <span
                  className="ms-1"
                  style={{ marginBottom: "3px", fontWeight: "500" }}
                >
                  Áp dụng
                </span>
              </Button>
              &nbsp;&nbsp;
              <Button
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "35px", width: "100px", fontSize: "15px" }}
                onClick={() => {
                  setTimeout(() => {
                    setIsLoading(false);
                    redirectToHienThiKhuyenMai();
                  }, 200);
                }}
                htmlType="submit"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span
                  className="ms-1"
                  style={{ marginBottom: "3px", fontWeight: "500" }}
                >
                  Quay về
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="mt-3 add-promotion-inProduct-container">
            <h5
              className="title-product mb-2"
              style={{ paddingBottom: "10px" }}
            >
              Danh sách sản phẩm
            </h5>
            <Table
              className="table-container"
              style={{
                margin: "0 18px",
              }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={listSanPham}
              rowKey="id"
              pagination={{
                pageSize: 5,
                position: ["bottomCenter"],
              }}
            />
          </div>
        </div>
      </div>

      <div className="row mt-3 ms-1 mb-3 add-promotion-inProduct-detail-container">
        <h5
          style={{
            margin: "15px",
          }}
        >
          Danh sách sản phẩm chi tiết
        </h5>
        <Table
          className="table-container"
          rowSelection={rowSelection1}
          columns={columns1}
          dataSource={listSanPhamChiTiet}
          rowKey="id"
          pagination={{
            pageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      </div>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseDialogConfirmAdd}
        add={addKhuyenMai}
        title={<Title />}
        header={<Header />}
      />
      {!isLoading && <LoadingIndicator />}
    </>
  );
};

export default AddKhuyenMai;
