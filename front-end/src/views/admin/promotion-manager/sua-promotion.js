import { Button, Checkbox, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKhuyenMai } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { InputAdornment } from "@mui/material";
import { useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { Table } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import numeral from "numeral";
import Box from "@mui/joy/Box";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Badge from "@mui/material/Badge";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import {
  Notistack,
  TypeDiscountNumber,
  TypeDiscountString,
} from "../order-manager/enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";

const SuaKhuyenMai = () => {
  const [ma, setMa] = useState("");
  const [tenKhuyenMai, setTenKhuyenMai] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState(dayjs());
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  const { id } = useParams();
  const [idChiTietSanPham, setIdChiTietSanPham] = useState([]);
  const [idSanPham, setIdSanPham] = useState([]);

  //san-pham
  const [listSanPham, setListSanPham] = useState([]);
  const [listSanPhamChiTiet, setlistSanPhamChiTiet] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  const [selectDiscount, setSelectDiscount] = useState("");
  const [value, setValue] = React.useState();
  const [giaTriKhuyenMai, setGiaTriKhuyenMai] = useState(0);

  //khuyenmaichitiet
  const [idSanPhamChiTiet, setIdSanPhamChiTiet] = useState("");
  //check-box
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [selectAll1, setSelectAll1] = useState(false);
  //Lấy id ctsp
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  const [sanPhamChiTietKhuyenMai, setSanPhamChiTietKhuyenMai] = useState([]);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

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
        <span className="">Xác nhận sửa giảm giá</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>
          Bạn có chắc chắc muốn sửa giá trị có tên là{" "}
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
      .get("http://localhost:8080/san-pham-chi-tiet-1/" + id + "/" + check)
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

  const convertTien = (value) => {
    const numericValue1 = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
    const formattedValue1 = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(formattedValue1);
    setGiaTriKhuyenMai(numericValue1);
  };

  const detailKhuyenMai = () => {
    axios
      .get(apiURLKhuyenMai + "/get-by-id/" + id)
      .then((response) => {
        console.log(response);
        setTenKhuyenMai(response.data.data.tenKhuyenMai);
        setSelectDiscount(
          response.data.data.loaiKhuyenMai == TypeDiscountNumber.VND
            ? TypeDiscountString.VND
            : TypeDiscountString.PERCENT
        );
        setValue(response.data.data.giaTriKhuyenMai);
        setNgayBatDau(response.data.data.ngayBatDau);
        setNgayKetThuc(response.data.data.ngayKetThuc);
        convertTien(response.data.data.giaTriKhuyenMai);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const detailKhuyenMaiChiTiet = () => {
    axios
      .get("http://localhost:8080/detail/khuyen-mai/" + id)
      .then((response) => {
        const data1 = response.data.data;
        const selectedKeys = data1.map((item) => item.idSanPham);
        const selectedKeys1 = data1.map((item) => item.idSanPhamChiTiet);
        setIdSanPham(selectedKeys);
        selectedKeys.forEach((idSanPham) => {
          loadDatalistSanPhamChiTiet(idSanPham, true);
        });
        setSelectedRowKeys(selectedKeys);
        setSelectedRowKeys1(selectedKeys1);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  //Detail sản phẩm chi tiết đã áp dụng khuyến mãi
  const detailSanPhamSauKhuyenMai = (id) => {
    axios
      .get("http://localhost:8080/san-pham-chi-tiet-khuyen-mai/detail/" + id)
      .then((response) => {
        console.log("SanPHamSauKhuyenMai" + response);
        setSanPhamChiTietKhuyenMai(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  useEffect(() => {
    detailKhuyenMai();
    detailKhuyenMaiChiTiet(idSanPham);
    loadDatalistSanPham();
    clear();
  }, []);

  const suaKhuyenMai = () => {
    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    let obj = {
      tenKhuyenMai: tenKhuyenMai,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      loaiKhuyenMai: selectDiscount,
      giaTriKhuyenMai: numericValue2,
    };
    axios
      .put(apiURLKhuyenMai + "/update-khuyen-mai/" + id, obj)
      .then((response) => {
        handleOpenAlertVariant("Cập nhật thành công.", Notistack.SUCCESS);
        setTimeout(() => {
          redirectToHienThiKhuyenMai();
        }, 1000);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi khi sửa giảm giá.",
          Notistack.ERROR
        );
      });
  };

  //Validate
  const validationAll = () => {
    const msg = {};

    if (!tenKhuyenMai.trim("")) {
      msg.tenKhuyenMai = "Tên không được để trống !!!";
    } else if (/^\s+|\s+$/.test(tenKhuyenMai)) {
      msg.tenKhuyenMai =
        "Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi";
    } else if (tenKhuyenMai.length < 5) {
      msg.tenKhuyenMai = "Tên phải có ít nhất 5 ký tự!";
    }

    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    if (value == null || value === "") {
      msg.giaTriKhuyenMai = "Giá trị giảm giá không được để trống !!!";
    }

    if (
      (selectDiscount === TypeDiscountString.VND && numericValue2 <= 0) ||
      (selectDiscount === TypeDiscountString.VND && numericValue2 > 100000000)
    ) {
      msg.giaTriKhuyenMai = "Giá trị giảm giá từ 1đ đến 100.000.000đ";
    }

    if (selectDiscount === TypeDiscountString.PERCENT && numericValue2 <= 0) {
      msg.giaTriKhuyenMai = "Giá trị tối đa chỉ nằm trong khoảng 1% - 100% !!!";
    }

    if (selectDiscount === TypeDiscountString.PERCENT && value <= 0) {
      msg.value = "Giá trị tối đa chỉ nằm trong khoảng 1% - 100% !!!";
    }

    if (
      dayjs(ngayKetThuc).isBefore(dayjs(ngayBatDau)) |
      (dayjs(ngayKetThuc) === dayjs(ngayBatDau))
    ) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu !!!";
    } else if (dayjs(ngayBatDau).isAfter(dayjs(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (dayjs(ngayKetThuc).isBefore(dayjs())) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày hiện tại !!!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    suaKhuyenMai();
  };

  const handleCheckboxChange = (record, e) => {
    const id = record.id;
    if (e.target.checked) {
      setSelectedRowKeys([...selectedRowKeys, id]);
      setSelectedRows([...selectedRows, record]);
      loadDatalistSanPhamChiTiet(record.id, true);
    } else {
      loadDatalistSanPhamChiTiet(record.id, false);
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== id));
      setSelectedRows(selectedRows.filter((row) => row.id !== id));
    }
  };

  const handleRowClick = (record) => {
    const id = record.id;
    const checked = !selectedRowKeys.includes(id);
    handleCheckboxChange(record, { target: { checked } });
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys.filter((key) => idSanPham.includes(key)),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  //Xử lý khi checkbox trên tiêu đề cột thay đổi
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked === true) {
      setSelectAll(checked);
      const selectedKeys = checked ? listSanPham.map((item) => item.id) : [];
      selectedKeys.forEach((id) => {
        loadDatalistSanPhamChiTiet(id, true);
      });
      // console.log(listSanPhamChiTiet);
      setSelectedRowKeys(selectedKeys);
    } else {
      clear();
      setSelectAll(checked);
      const selectedKeys = checked ? listSanPham.map((item) => item.id) : [];
      setSelectedRowKeys(selectedKeys);
    }
  };

  // Thực hiện checkbox ListChiTietSanPham
  const handleCheckboxChange1 = (record, e) => {
    const id = record.id;
    if (e.target.checked) {
      setSelectedRowKeys1([...selectedRowKeys1, id]);
      setSelectedRows1([...selectedRows1, record]);
      setSelectedProductDetails([...selectedProductDetails, id]);
    } else {
      setSelectedRowKeys1(selectedRowKeys1.filter((key) => key !== id));
      setSelectedRows1(selectedRows1.filter((row) => row.id !== id));
      setSelectedProductDetails(
        selectedProductDetails.filter((productId) => productId !== id)
      );
    }
  };

  const handleRowClick1 = (record) => {
    const id = record.id;
    const checked = !selectedRowKeys1.includes(id);
    handleCheckboxChange1(record, { target: { checked } });
  };

  const rowSelection1 = {
    selectedRowKeys1,
    onChange: (selectedRowKeys1, selectedRows1) => {
      setSelectedRowKeys1(selectedRowKeys1);
      setSelectedRows1(selectedRows1);
    },
  };

  const handleSelectAllChange1 = (e) => {
    const checked = e.target.checked;
    setSelectAll1(checked);
    const selectedKeys1 = checked
      ? listSanPhamChiTiet.map((item) => item.id)
      : [];
    setSelectedProductDetails(selectedKeys1);
    setSelectedRowKeys1(selectedKeys1);
  };

  //Column bảng Sản Phẩm
  const columns = [
    {
      title: <Checkbox onChange={handleSelectAllChange} checked={selectAll} />,
      dataIndex: "selection",
      width: "5%",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record, e)}
          checked={selectedRowKeys.includes(record.id)}
        />
      ),
      align: "center",
    },
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span>{listSanPham.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Mã",
      dataIndex: "maSanPham",
      width: "10%",
      align: "center",
    },
    {
      title: "Tên sản phẩm ",
      dataIndex: "tenSanPham",
      width: "15%",
      editable: true,
      align: "center",
    },
  ];

  //Column bảng Sản Phẩm Chi Tiết
  const columns1 = [
    {
      title: (
        <Checkbox onChange={handleSelectAllChange1} checked={selectAll1} />
      ),
      dataIndex: "selection1",
      width: "5%",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange1(record, e)}
          checked={selectedRowKeys1.includes(record.id)}
        />
      ),
      align: "center",
    },
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span>{listSanPhamChiTiet.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Badge
          showZero={true}
          className="ms-2"
          badgeContent={record.size}
          color="primary"
        >
          <img
            src={record.duongDan}
            alt="Ảnh"
            style={{ width: "100px", height: "100px" }}
          />
        </Badge>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let tenSanPham = value;
        return <span style={{ whiteSpace: "pre-line" }}> {tenSanPham}</span>;
      },
    },
    {
      title: "ROM",
      dataIndex: "kichThuocRom",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = `${record.kichThuocRom} GB`;
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "RAM ",
      dataIndex: "kichThuocRam",
      width: "10%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = `${record.kichThuocRam} GB`;
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Màu Sắc ",
      dataIndex: "tenMauSac",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "Đơn giá ",
      dataIndex: "donGia",
      width: "10%",
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
      width: "10%",
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const mergedColumns1 = columns1.map((col1) => {
    if (!col1.editable) {
      return col1;
    }
    return {
      ...col1,
      onCell: (record) => ({
        record,
        dataIndex: col1.dataIndex,
        title: col1.title,
      }),
    };
  });

  const handleChangeToggleButtonDiscount = (event) => {
    const newAlignment = event.target.value;
    if (newAlignment != null) {
      setSelectDiscount(newAlignment);
    }

    if (newAlignment == null) {
      setSelectDiscount(null);
    }
    handleReset();
  };

  const handleReset = () => {
    setValue("");
  };

  return (
    <>
      <div className="row">
        <div className="col-5">
          <div className="mt-3 add-promotion-container">
            <h5 className="title-promotion ms-4">Sửa Giảm Giá</h5>
            <div className="ms-3 mb-4">
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

            <div className="d-flex ms-3" style={{ marginBottom: "5px" }}>
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
            <div className="row-input-date ms-3 mt-3">
              <div className="input-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      ampm={true}
                      disablePast={true}
                      label="Ngày Bắt Đầu"
                      value={dayjs(ngayBatDau)}
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
            <div className="row-input-date ms-3 mt-3">
              <div className="input-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      ampm={true}
                      disablePast={true}
                      label="Ngày Kết Thúc"
                      value={dayjs(ngayKetThuc)}
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
          <div className="add-promotion-inProduct-container">
            <div className="mt-3">
              <h4 className="title-product"> Danh sách sản phẩm</h4>
              <Table
                dataSource={listSanPham}
                columns={mergedColumns}
                pagination={{ pageSize: 4, position: ["bottomCenter"] }}
                rowKey="id"
                style={{ marginBottom: "20px" }}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      if (selectedRow === record) {
                        handleRowClick(record);
                      } else {
                        handleRowClick(record);
                        setSelectedRow(record);
                      }
                    },
                    className: selectedRow === record ? "selected-row" : "",
                  };
                }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 ms-1 mb-3 add-promotion-inProduct-detail-container">
          <h4 style={{ marginTop: "20px" }}>Danh sách sản phẩm chi tiết</h4>
          <Table
            dataSource={listSanPhamChiTiet}
            columns={mergedColumns1}
            pagination={{ pageSize: 5, position: ["bottomCenter"] }}
            rowKey="id"
            onRow={(record) => {
              return {
                onClick: () => {
                  handleRowClick1(record);
                  setSelectedRows1([record]);
                  setIdSanPhamChiTiet(record.id);
                  detailSanPhamSauKhuyenMai(record.id);
                },
                className: selectedRow === record.index ? "selected-row" : "",
              };
            }}
          />
        </div>
      </div>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseDialogConfirmAdd}
        add={suaKhuyenMai}
        title={<Title />}
        header={<Header />}
      />
    </>
  );
};

export default SuaKhuyenMai;
