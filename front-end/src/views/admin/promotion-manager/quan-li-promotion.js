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
  Menu,
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
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import { request, requestParam } from "../../../store/helpers/axios_helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

//show
const HienThiKhuyenMai = () => {
  const [form] = Form.useForm();
  let [listKhuyenMai, setlistKhuyenMai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchNgayBatDau, setSearchNgayBatDau] = useState("");
  const [searchNgayKetThuc, setSearchNgayKetThuc] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState(6);
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const [ma, setMa] = useState("");
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [keySelect, setKeySelect] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortVoucher, setSortVoucher] = useState("all");
  const [showPage, setShowPage] = useState(5);
  const [checkStatus, setCheckStatus] = useState("");

  const handleReset = () => {
    setIsLoading(false);
    setTimeout(() => {
      loadDataListKhuyenMai(currentPage);
      setSearchTatCa("");
      setSortVoucher("all");
      setSearchNgayBatDau(null);
      setSearchNgayKetThuc(null);
      setShowPage(5);
      setSearchTrangThai(6);
      setKeySelect(keySelect + 1);
      setSearchParams("");
      setCurrentPage(1);
      setIsLoading(true);
    }, 200);
  };

  // cutstom load data
  const loadDataListKhuyenMai = (page) => {
    setIsLoading(false);
    requestParam("GET", `${apiURLKhuyenMai}/hien-thi`, {
      keyword: searchTatCa,
      pageNo: page,
      pageSize: showPage,
      trangThai: ConvertStatusVoucherNumberToString(searchTrangThai),
      sortType: sortVoucher,
      ngayBatDau: searchNgayBatDau,
      ngayKetThuc: searchNgayKetThuc,
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
    request("GET", `${apiURLKhuyenMai}/hien-thi`, {
      params: {
        keyword: searchTatCa,
        pageNo: page,
        pageSize: showPage,
        trangThai: ConvertStatusVoucherNumberToString(searchTrangThai),
        sortType: sortVoucher,
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
    }, 5000);
    // Xóa interval khi component unmounted
    return () => clearInterval(intervalId);
  }, [
    searchTatCa,
    currentPage,
    totalPages,
    showPage,
    searchTrangThai,
    searchNgayBatDau,
    searchNgayKetThuc,
    sortVoucher,
  ]);

  useEffect(() => {
    loadDataListKhuyenMai(currentPage);
  }, [
    searchTrangThai,
    searchNgayBatDau,
    searchNgayKetThuc,
    showPage,
    sortVoucher,
  ]);

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

  // const handleOkConfirm = () => {
  //   doiTrangThaiKhuyenMai();
  // };
  // const handleCancelConfirm = () => {
  //   console.log("Clicked cancel button");
  //   setOpen(false);
  // };

  const doiTrangThaiKhuyenMai = () => {
    let obj = {
      status: selectedStatus,
    };
    setIsLoading(false);
    console.log(obj.status);

    request("PUT", `${apiURLKhuyenMai}/doi-trang-thai/${id}`, obj)
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

  const kichHoatKhuyenMai = () => {
    setIsLoading(false);
    request("PUT", `${apiURLKhuyenMai}/kich-hoat-promotion/${id}`)
      .then((response) => {
        loadDataListKhuyenMai(currentPage);
        handleOpenAlertVariant("Kích hoạt thành công!", Notistack.SUCCESS);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi kích hoạt giảm giá");
        handleOpenAlertVariant(
          "Đã xảy ra lỗi khi kích hoạt giảm giá!",
          Notistack.ERROR
        );
        setIsLoading(true);
      });
  };

  const handleClickChangeStatus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseChangeStatus = () => {
    setAnchorEl(null);
  };

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenDialogConfirmUpdate = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmUpdate = () => {
    setOpenConfirm(false);
    handleCloseChangeStatus();
  };

  const Header = () => {
    return (
      <>
        <span>Xác nhận đổi trạng thái giảm giá</span>
      </>
    );
  };

  const Title = () => {
    return (
      <>
        {selectedStatus === StatusDiscount.DA_HUY ? (
          <span>Bạn có chắc muốn hủy giảm giá {ma} này không?</span>
        ) : selectedStatus === StatusDiscount.TAM_DUNG ? (
          <span>Bạn có chắc chắn muốn tạm dừng giảm giá {ma} này không?</span>
        ) : (
          <span>Bạn có chắc chắn muốn kích hoạt giảm giá {ma} này không?</span>
        )}
      </>
    );
  };

  //Ten column
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text) => <span>{text}</span>,
      render: (text, record) => (
        <span>{listKhuyenMai.indexOf(record) + 1}</span>
      ),
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
            className={`rounded-pill mx-auto ${record.trangThai === StatusDiscount.HOAT_DONG &&
              isDatePast(record.ngayBatDau) === true
              ? "badge-light"
              : record.trangThai === StatusDiscount.HOAT_DONG &&
                isDateFuture(record.ngayKetThuc) === false
                ? "badge-primary"
                : record.trangThai === StatusDiscount.NGUNG_HOAT_DONG
                  ? "badge-danger"
                  : record.trangThai === StatusDiscount.CHUA_DIEN_RA
                    ? "badge-light"
                    : record.trangThai === StatusDiscount.DA_HUY &&
                      isDateFuture(record.ngayKetThuc) === true
                      ? "badge-danger"
                      : record.trangThai === StatusDiscount.DA_HUY &&
                        isDatePast(record.ngayBatDau) === true
                        ? "badge-light"
                        : record.trangThai === StatusDiscount.DA_HUY &&
                          isRangeDate(record.ngayBatDau, record.ngayKetThuc) === true
                          ? "badge-primary"
                          : record.trangThai === StatusDiscount.TAM_DUNG &&
                            isDateFuture(record.ngayKetThuc) === true
                            ? "badge-danger"
                            : record.trangThai === StatusDiscount.TAM_DUNG &&
                              isDatePast(record.ngayBatDau) === true
                              ? "badge-light"
                              : record.trangThai === StatusDiscount.TAM_DUNG &&
                                isRangeDate(record.ngayBatDau, record.ngayKetThuc) === true
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
              className={`p-2 ${record.trangThai === StatusDiscount.CHUA_DIEN_RA
                ? "text-dark"
                : record.trangThai === StatusDiscount.DA_HUY &&
                  isDatePast(record.ngayBatDau) === true
                  ? "text-dark"
                  : record.trangThai === StatusDiscount.HOAT_DONG &&
                    isDatePast(record.ngayBatDau) === true
                    ? "text-dark"
                    : record.trangThai === StatusDiscount.TAM_DUNG &&
                      isDatePast(record.ngayBatDau) === true
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
      width: "10%",
      align: "center",
      onFilter: (value, record) => record.trangThai === value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.trangThai === StatusDiscount.HOAT_DONG ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "135px",
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
                width: "135px",
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
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-dark p-2" style={{ fontSize: "14px" }}>
                Chưa diễn ra
              </span>
            </div>
          ) : record.trangThai === StatusDiscount.DA_HUY ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Đã hủy
              </span>
            </div>
          ) : record.trangThai === StatusDiscount.TAM_DUNG ? (
            <div
              className="rounded-pill mx-auto badge-warning"
              style={{
                height: "35px",
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-dark p-2" style={{ fontSize: "14px" }}>
                Tạm Dừng
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
              <Link to={`/dashboard/update-discount/${record.id}`}>
                <IconButton size="">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="sm"
                    style={{
                      color: "#2f80ed",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title={"Đổi trạng thái"}>
              <IconButton
                disabled={
                  record.trangThai === StatusDiscount.NGUNG_HOAT_DONG ||
                    // (
                    record.trangThai === StatusDiscount.DA_HUY
                    ? // && isDateFuture(record.ngayKetThuc) === true)
                    true
                    : false
                }
                className="ms-2"
                style={{ marginTop: "6px" }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event) => {
                  handleClickChangeStatus(event);
                  setId(record.id);
                  setMa(record.tenKhuyenMai);
                  setCheckStatus(record.trangThai);
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  size="sm"
                  transform={{ rotate: 90 }}
                  style={{
                    cursor: "pointer",
                    color:
                      record.trangThai === StatusDiscount.HOAT_DONG ||
                        record.trangThai === StatusDiscount.CHUA_DIEN_RA
                        ? "#e5383b"
                        : record.trangThai === StatusDiscount.DA_HUY &&
                          isDatePast(record.ngayBatDau) === true
                          ? "disabled"
                          : record.trangThai === StatusDiscount.DA_HUY &&
                            isRangeDate(record.ngayBatDau, record.ngayKetThuc) ===
                            true
                            ? "disabled"
                            : record.trangThai === StatusDiscount.TAM_DUNG &&
                              isDatePast(record.ngayBatDau) === true
                              ? "#09a129"
                              : record.trangThai === StatusDiscount.TAM_DUNG &&
                                isRangeDate(record.ngayBatDau, record.ngayKetThuc) ===
                                true
                                ? "#09a129"
                                : "disabled",
                  }}
                />
              </IconButton>
            </Tooltip>
            {/* </Popconfirm> */}
          </>
        );
      },
    },
  ];

  const handleSearchTatCaChange = (event) => {
    const searchTatCaInput = event.target.value;
    setSearchTatCa(searchTatCaInput);
    setCurrentPage(1);
  };

  const handleShowPageVoucher = (event) => {
    const selectedValue = event.target.value;
    setShowPage(parseInt(selectedValue));
    setCurrentPage(1);
  };

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(selectedValue); // Cập nhật giá trị khi Select thay đổi
    searchParams.set("trangThai", selectedValue);
    setSearchParams(searchParams);
    if (selectedValue === 6) {
      setSearchParams("");
    }
    setCurrentPage(1);
  };

  const handleSortValueVoucher = (event) => {
    const selectedValue = event.target.value;
    setSortVoucher(selectedValue);
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

  // const [openSelect1, setOpenSelect1] = useState(false);

  // const handleCloseSelect1 = () => {
  //   setOpenSelect1(false);
  // };

  // const handleOpenSelect1 = () => {
  //   setOpenSelect1(true);
  // };

  const [openSelect, setOpenSelect] = useState(false);

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const [openSelect2, setOpenSelect2] = useState(false);

  const handleCloseSelect2 = () => {
    setOpenSelect2(false);
  };

  const handleOpenSelect2 = () => {
    setOpenSelect2(true);
  };

  const [openSelect3, setOpenSelect3] = useState(false);
  const handleCloseSelect3 = () => {
    setOpenSelect3(false);
  };

  const handleOpenSelect3 = () => {
    setOpenSelect3(true);
  };

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseChangeStatus}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          disabled={
            checkStatus === StatusDiscount.HOAT_DONG
              ? true
              : checkStatus === StatusDiscount.CHUA_DIEN_RA
                ? true
                : false
          }
          onClick={() => {
            handleOpenDialogConfirmUpdate();
            setSelectedStatus(5);
          }}
          style={{ color: "black" }}
        >
          Kích Hoạt
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDialogConfirmUpdate();
            setSelectedStatus(StatusDiscount.TAM_DUNG);
          }}
          style={{ color: "black" }}
          disabled={checkStatus === StatusDiscount.TAM_DUNG ? true : false}
        >
          Tạm Dừng
        </MenuItem>
        <MenuItem
          disabled={checkStatus === StatusDiscount.DA_HUY ? true : false}
          onClick={() => {
            handleOpenDialogConfirmUpdate();
            setSelectedStatus(StatusDiscount.DA_HUY);
          }}
          style={{ color: "black" }}
        >
          Hủy Giảm Giá
        </MenuItem>
      </Menu>
      <div
        className="mt-4"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
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
              <Link to="/dashboard/create-discount">
                <Button
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "170px", fontSize: "15px" }}
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
                    Tạo đợt giảm giá
                  </span>
                </Button>
              </Link>
            </div>
          </Card.Header>
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <div
              className="mt-3 pt-1 ms-auto me-2 pe-1 d-flex"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
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
                    value={searchTrangThai}
                    onChange={handleSearchTrangThaiChange}
                  >
                    <MenuItem className="" value={6}>
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
                    <MenuItem value={StatusDiscountNumber.TAM_DUNG}>
                      Tạm dừng
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
                  onClick={handleOpenSelect2}
                  className=""
                  style={{ marginTop: "7px" }}
                >
                  <span
                    className="ms-2 ps-1"
                    style={{ fontSize: "15px", fontWeight: "450" }}
                  >
                    Sắp Xếp:{" "}
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
                    open={openSelect2}
                    onClose={handleCloseSelect2}
                    onOpen={handleOpenSelect2}
                    value={sortVoucher}
                    onChange={handleSortValueVoucher}
                  >
                    <MenuItem className="" value={"all"}>
                      Mặc định
                    </MenuItem>
                    <MenuItem value={"a-z"}>Tăng dần theo giá trị</MenuItem>
                    <MenuItem value={"z-a"}>Giảm dần theo giá trị</MenuItem>
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
                  onClick={handleOpenSelect3}
                  className=""
                  style={{ marginTop: "7px" }}
                >
                  <span
                    className="ms-2 ps-1"
                    style={{ fontSize: "15px", fontWeight: "450" }}
                  >
                    Hiển Thị:{" "}
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
                    open={openSelect3}
                    onClose={handleCloseSelect3}
                    onOpen={handleOpenSelect3}
                    value={showPage}
                    onChange={handleShowPageVoucher}
                  >
                    <MenuItem className="" value={5}>
                      Mặc định
                    </MenuItem>
                    <MenuItem value={10}>10/Pages</MenuItem>
                    <MenuItem value={20}>20/Pages</MenuItem>
                    <MenuItem value={50}>50/Pages</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <Card.Body>
            <Table
              className="table-container"
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
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseDialogConfirmUpdate}
          add={selectedStatus === 5 ? kichHoatKhuyenMai : doiTrangThaiKhuyenMai}
          title={<Title />}
          header={<Header />}
        />
        {!isLoading && <LoadingIndicator />}
      </div>
    </>
  );
};

export default HienThiKhuyenMai;
