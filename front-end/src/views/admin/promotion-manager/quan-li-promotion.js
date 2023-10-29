import { Form, Table, Input, Button, Popconfirm } from "antd";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";

import { Link, useSearchParams } from "react-router-dom";
import { apiURLKhuyenMai } from "../../../service/api";
// import "../promotion-manager/style.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import numeral from "numeral";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import style from "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  Select,
  Tooltip,
  IconButton,
  Pagination,
  TextField,
  Zoom,
  FormControl,
  MenuItem,
} from "@mui/material";
import {
  Notistack,
  StatusDiscount,
  StatusDiscountNumber,
  TypeDiscountNumber,
  TypeDiscountString,
} from "../order-manager/enum";
import { ConvertStatusVoucherNumberToString } from "../../../utilities/convertEnum";
import useCustomSnackbar from "../../../utilities/notistack";
import LoadingIndicator from "../../../utilities/loading";

//show
const HienThiKhuyenMai = () => {
  const [form] = Form.useForm();
  let [listKhuyenMai, setlistKhuyenMai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchNgayBatDau, setSearchNgayBatDau] = useState("");
  const [searchNgayKetThuc, setSearchNgayKetThuc] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [keySelect, setKeySelect] = useState(0);

  const handleReset = () => {
    setIsLoading(false);
    setTimeout(() => {
      loadDataListKhuyenMai(currentPage);
      setSearchTatCa("");
      setSearchNgayBatDau("");
      setSearchNgayKetThuc("");
      setSearchTrangThai("");
      setKeySelect(keySelect + 1);
      setSearchParams("");
      setIsLoading(true);
    }, 200);
  };

  // cutstom load data
  const loadDataListKhuyenMai = (page) => {
    setIsLoading(false);
    axios
      .get(`${apiURLKhuyenMai}/hien-thi`, {
        params: {
          keyword: searchTatCa,
          pageNo: page,
          trangThai: ConvertStatusVoucherNumberToString(searchTrangThai),
          ngayBatDau: searchNgayBatDau,
          ngayKetThuc: searchNgayKetThuc,
        },
      })
      .then((response) => {
        const modifiedData = response.data.data.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setlistKhuyenMai(modifiedData);
        setTotalPages(response.data.totalPages);
        setIsLoading(true);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const loadDataListKhuyenMai1 = (page) => {
    axios
      .get(`${apiURLKhuyenMai}/hien-thi`, {
        params: {
          keyword: searchTatCa,
          pageNo: page,
          trangThai: ConvertStatusVoucherNumberToString(searchTrangThai),
          ngayBatDau: searchNgayBatDau,
          ngayKetThuc: searchNgayKetThuc,
        },
      })
      .then((response) => {
        const modifiedData = response.data.data.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setlistKhuyenMai(modifiedData);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  useEffect(() => {
    loadDataListKhuyenMai1(currentPage);
    const intervalId = setInterval(() => {
      loadDataListKhuyenMai1(currentPage);
    }, 10000);
    // Xóa interval khi component unmounted
    return () => clearInterval(intervalId);
  }, [currentPage, searchTatCa, totalPages]);

  useEffect(() => {
    loadDataListKhuyenMai(currentPage);
  }, [searchTrangThai, searchNgayBatDau, searchNgayKetThuc]);

  const isDateFuture = (toDate) => {
    const currentDate = new Date();
    const getToDate = new Date(toDate);
    if (currentDate > getToDate) {
      return true;
    }
    return false;
  };
  const isDatePast = (fromDate) => {
    const currentDate = new Date();
    const getFromDate = new Date(fromDate);
    if (currentDate < getFromDate) {
      return true;
    }
    return false;
  };

  const isRangeDate = (fromDate, toDate) => {
    const currentDate = new Date();
    const getFromDate = new Date(fromDate);
    const getToDate = new Date(toDate);
    if (currentDate >= getFromDate && currentDate <= getToDate) {
      return true;
    }
    return false;
  };

  const handleOkConfirm = () => {
    doiTrangThaiKhuyenMai(id);
  };
  const handleCancelConfirm = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const doiTrangThaiKhuyenMai = (id) => {
    setIsLoading(false);
    axios
      .put(apiURLKhuyenMai + `/doi-trang-thai/${id}`)
      .then((response) => {
        loadDataListKhuyenMai(currentPage);
        handleOpenAlertVariant("Đổi trạng thái thành công!", Notistack.SUCCESS);
        setIsLoading(true);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
        setIsLoading(true);
      });
  };

  //Ten column
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.stt - b.stt,
    },

    {
      title: "Tên",
      dataIndex: "tenKhuyenMai",
      width: "20%",
      align: "center",
      render: (text, record) => (
        <span
          style={{
            maxWidth: "25%",
            whiteSpace: "pre-line",
            overflow: "hidden",
          }}
        >
          {record.tenKhuyenMai}
        </span>
      ),
    },
    {
      title: "Giảm Giá",
      dataIndex: "loaiKhuyenMai",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        if (record.loaiKhuyenMai === TypeDiscountString.VND) {
          formattedValue = record.giaTriKhuyenMai.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        } else if (record.loaiKhuyenMai === TypeDiscountString.PERCENT) {
          formattedValue = `${record.giaTriKhuyenMai} %`;
        }
        return (
          <span className="txt-danger" style={{ fontWeight: "400" }}>
            {formattedValue}
          </span>
        );
      },
    },
    {
      title: "Thời Gian",
      dataIndex: "thoiGian",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <>
          <div
            className={`rounded-pill mx-auto ${
              record.trangThai == StatusDiscount.HOAT_DONG
                ? "badge-primary"
                : record.trangThai == StatusDiscount.NGUNG_HOAT_DONG
                ? "badge-danger"
                : record.trangThai == StatusDiscount.CHUA_DIEN_RA
                ? "badge-light"
                : record.trangThai == StatusDiscount.DA_HUY &&
                  isDateFuture(record.ngayKetThuc) == true
                ? "badge-danger"
                : record.trangThai == StatusDiscount.DA_HUY &&
                  isDatePast(record.ngayBatDau) == true
                ? "badge-light"
                : record.trangThai == StatusDiscount.DA_HUY &&
                  isRangeDate(record.ngayBatDau, record.ngayKetThuc) == true
                ? "badge-primary"
                : ""
            }`}
            style={{
              height: "35px",
              width: "auto",
              padding: "4px",
            }}
          >
            <span
              className={`p-2 ${
                record.trangThai == StatusDiscount.CHUA_DIEN_RA
                  ? "text-dark"
                  : record.trangThai == StatusDiscount.DA_HUY &&
                    isDatePast(record.ngayBatDau) == true
                  ? "text-dark"
                  : "text-white"
              }`}
              style={{ fontSize: "14px" }}
            >
              {dayjs(record.ngayBatDau).format("DD/MM/YYYY")} -{" "}
              {dayjs(record.ngayKetThuc).format("DD/MM/YYYY")}
            </span>
          </div>
        </>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      width: "15%",
      align: "center",
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.trangThai === StatusDiscount.HOAT_DONG ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "110px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Hoạt động
              </span>
            </div>
          ) : record.trangThai === StatusDiscount.NGUNG_HOAT_DONG ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "auto",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Ngừng hoạt động
              </span>
            </div>
          ) : record.trangThai === StatusDiscount.CHUA_DIEN_RA ? (
            <div
              className="rounded-pill mx-auto badge-light"
              style={{
                height: "35px",
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-dark p-2" style={{ fontSize: "14px" }}>
                Chưa diễn ra
              </span>
            </div>
          ) : record.trangThai == StatusDiscount.DA_HUY ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "90px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Đã hủy
              </span>
            </div>
          ) : (
            ""
          )}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <Link to={`/sua-khuyen-mai/${record.id}`}>
                <IconButton size="">
                  <BorderColorOutlinedIcon color="primary" />
                </IconButton>
              </Link>
            </Tooltip>
            <Popconfirm
              okText="Đồng ý"
              cancelText="Hủy"
              description="Bạn có chắc chắn muốn đổi trạng thái giảm giá không?"
              onConfirm={handleOkConfirm}
              onCancel={handleCancelConfirm}
              onClick={() => setId(record.id)}
              placement="topLeft"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title={
                  record.trangThai === StatusDiscount.HOAT_DONG ||
                  record.trangThai === StatusDiscount.CHUA_DIEN_RA
                    ? "Ngừng kích hoạt"
                    : record.trangThai === StatusDiscount.DA_HUY &&
                      isDatePast(record.ngayBatDau) === true
                    ? "Kích hoạt"
                    : record.trangThai === StatusDiscount.DA_HUY &&
                      isRangeDate(record.ngayBatDau, record.ngayKetThuc) ===
                        true
                    ? "Kích hoạt"
                    : record.trangThai === StatusDiscount.NGUNG_HOAT_DONG
                    ? "Không thể đổi"
                    : ""
                }
              >
                <IconButton
                  size=""
                  // onClick={() => doiTrangThaiKhuyenMai(record.id)}
                  className="ms-2"
                  style={{ marginTop: "6px" }}
                  disabled={
                    record.trangThai === StatusDiscount.NGUNG_HOAT_DONG ||
                    (record.trangThai === StatusDiscount.DA_HUY &&
                      isDateFuture(record.ngayKetThuc) === true)
                      ? true
                      : false
                  }
                >
                  <AssignmentOutlinedIcon
                    color={
                      record.trangThai === StatusDiscount.HOAT_DONG ||
                      record.trangThai === StatusDiscount.CHUA_DIEN_RA
                        ? "error"
                        : record.trangThai === StatusDiscount.DA_HUY &&
                          isDatePast(record.ngayBatDau) === true
                        ? "success"
                        : record.trangThai === StatusDiscount.DA_HUY &&
                          isRangeDate(record.ngayBatDau, record.ngayKetThuc) ===
                            true
                        ? "success"
                        : "disabled"
                    }
                  />
                </IconButton>
              </Tooltip>
            </Popconfirm>
          </>
        );
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

  const handleSearchTatCaChange = (event) => {
    const searchTatCaInput = event.target.value;
    setSearchTatCa(searchTatCaInput);
    setCurrentPage(1);
  };

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(selectedValue); // Cập nhật giá trị khi Select thay đổi
    searchParams.set("trangThai", selectedValue);
    setSearchParams(searchParams);
    if (selectedValue === 5) {
      setSearchParams("");
    }
    setCurrentPage(1);
  };

  const handleSearchNgayBatDauChange = (selectedDate) => {
    const value = selectedDate.format("DD/MM/YYYY");
    setSearchNgayBatDau(value);
    setCurrentPage(1);
  };

  const handleSearchNgayKetThucChange = (selectedDate) => {
    const value = selectedDate.format("DD/MM/YYYY");
    setSearchNgayKetThuc(value); // Cập nhật giá trị khi Select thay đổi
    setCurrentPage(1);
  };

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    loadDataListKhuyenMai(page);
  };

  const [openSelect1, setOpenSelect1] = useState(false);

  const handleCloseSelect1 = () => {
    setOpenSelect1(false);
  };

  const handleOpenSelect1 = () => {
    setOpenSelect1(true);
  };

  const [openSelect, setOpenSelect] = useState(false);

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <Card className="">
          <Card.Header className="">
            <div className="header-title mt-2">
              <TextField
                label="Tìm giảm giá"
                value={searchTatCa}
                onChange={handleSearchTatCaChange}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "190px",
                  },
                }}
                size="small"
                className=""
              />
              <Button
                onClick={() => {
                  handleReset();
                }}
                className="rounded-2 ms-2"
                type="warning"
                style={{ width: "100px", fontSize: "15px" }}
              >
                <span
                  className="text-dark"
                  style={{ fontWeight: "500", marginBottom: "2px" }}
                >
                  Làm Mới
                </span>
              </Button>
            </div>
            <div className="d-flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Ngày Bắt Đầu"
                    value={
                      searchNgayBatDau
                        ? dayjs(searchNgayBatDau, "DD/MM/YYYY")
                        : null
                    }
                    format="DD/MM/YYYY"
                    onChange={handleSearchNgayBatDauChange}
                    slotProps={{ textField: { size: "small" } }}
                    sx={{
                      position: "relative",
                      width: "50px",
                      "& .MuiInputBase-root": {
                        width: "85%",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Ngày Kết Thúc"
                    value={
                      searchNgayKetThuc
                        ? dayjs(searchNgayKetThuc, "DD/MM/YYYY")
                        : null
                    }
                    format="DD/MM/YYYY"
                    onChange={handleSearchNgayKetThucChange}
                    slotProps={{ textField: { size: "small" } }}
                    sx={{
                      position: "relative",
                      width: "50px",
                      "& .MuiInputBase-root": {
                        width: "85%",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mt-2">
              <Link to="/them-khuyen-mai">
                <Button
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "160px", fontSize: "15px" }}
                >
                  <PlusOutlined
                    className="ms-1"
                    style={{
                      position: "absolute",
                      bottom: "12.5px",
                      left: "12px",
                    }}
                  />
                  <span
                    className="ms-3 ps-1"
                    style={{ marginBottom: "3px", fontWeight: "500" }}
                  >
                    Tạo giảm giá
                  </span>
                </Button>
              </Link>
            </div>
          </Card.Header>
          <div className="mt-3 pt-1 ms-auto me-2 pe-1 d-flex">
            <div
              className="d-flex me-3"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                onClick={handleOpenSelect}
                className=""
                style={{ marginTop: "7px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Trạng Thái:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  open={openSelect}
                  onClose={handleCloseSelect}
                  onOpen={handleOpenSelect}
                  defaultValue={5}
                  key={keySelect}
                  onChange={handleSearchTrangThaiChange}
                >
                  <MenuItem className="" value={5}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={StatusDiscountNumber.HOAT_DONG}>
                    Hoạt động
                  </MenuItem>
                  <MenuItem value={StatusDiscountNumber.NGUNG_HOAT_DONG}>
                    Ngừng hoạt động
                  </MenuItem>
                  <MenuItem value={StatusDiscountNumber.CHUA_DIEN_RA}>
                    Chưa diễn ra
                  </MenuItem>
                  <MenuItem value={StatusDiscountNumber.DA_HUY}>
                    Đã hủy
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="d-flex"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                onClick={handleOpenSelect1}
                className=""
                style={{ marginTop: "7px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Dành Cho:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  open={openSelect1}
                  onClose={handleCloseSelect1}
                  onOpen={handleOpenSelect1}
                  defaultValue={14}
                >
                  <MenuItem className="" value={14}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={15}>Khách hàng mới</MenuItem>
                  <MenuItem value={20}>Khách hàng cũ</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Card.Body>
            <Table
              dataSource={listKhuyenMai}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          </Card.Body>
          <div className="mx-auto">
            <Pagination
              page={parseInt(currentPage)}
              count={totalPages}
              onChange={chuyenTrang}
              color="primary"
            />
          </div>
          <div className="mt-4"></div>
        </Card>
        {!isLoading && <LoadingIndicator />}
      </div>
    </>
  );
};

export default HienThiKhuyenMai;
