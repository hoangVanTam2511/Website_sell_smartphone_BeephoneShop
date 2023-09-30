import { Form, Table, message, Button, Popconfirm } from "antd";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link, useSearchParams } from "react-router-dom";
import { apiURLVoucher } from "../../../service/api";
import "../voucher-manager/style.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Select,
  IconButton,
  Tooltip,
  Pagination,
  TextField,
  Zoom,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import style from "./style.css";
import { parseInt } from "lodash";
import LoadingIndicator from "../../../utilities/loading";
import { id } from "date-fns/esm/locale";

//show
const HienThiVoucher = () => {
  const [form] = Form.useForm();
  let [listVoucher, setListVoucher] = useState([]);
  const [voucher, setVoucher] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchNgayBatDau, setSearchNgayBatDau] = useState("");
  const [searchNgayKetThuc, setSearchNgayKetThuc] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");
  let [searchTatCa, setSearchTatCa] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const loadDataListVoucher = (page) => {
    axios
      .get(`${apiURLVoucher}/vouchers`, {
        params: {
          keyword: searchTatCa,
          pageNo: page,
          trangThai: searchTrangThai,
          ngayBatDau: searchNgayBatDau,
          ngayKetThuc: searchNgayKetThuc,
        },
      })
      .then((response) => {
        setListVoucher(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadDataListVoucher(currentPage);
    const intervalId = setInterval(() => {
      loadDataListVoucher(currentPage);
    }, 10000);
    // Xóa interval khi component unmounted
    return () => clearInterval(intervalId);
  }, [
    searchTatCa,
    searchTrangThai,
    searchNgayBatDau,
    searchNgayKetThuc,
    currentPage,
    totalPages,
  ]);

  const handleReset = () => {
    setIsLoading(false);
    setTimeout(() => {
      setSearchTatCa("");
      setSearchNgayBatDau(null);
      setSearchNgayKetThuc(null);
      setSearchTrangThai("");
      setCurrentPage(1);
      setIsLoading(true);
    }, 200);
  };

  const doiTrangThaiVoucher = (id) => {
    setIsLoading(false);
    axios
      .put(`${apiURLVoucher}/deleteTrangThaiVoucher/${id}`)
      .then((response) => {
        loadDataListVoucher(currentPage);
        showToast("success", "Đổi trạng thái thành công");
        setIsLoading(true);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi đổi trạng thái");
        showToast("error", "Đã xảy ra lỗi khi đổi trạng thái");
      });
  };

  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(parseInt(selectedValue)); // Cập nhật giá trị khi Select thay đổi
    searchParams.set("trangThai", parseInt(selectedValue));
    setSearchParams(searchParams);
  };

  const handleSearchNgayBatDauChange = (selectedDate) => {
    const value = selectedDate.format("DD/MM/YYYY");
    setSearchNgayBatDau(value);
  };

  const handleSearchNgayKetThucChange = (selectedDate) => {
    const value = selectedDate.format("DD/MM/YYYY");
    setSearchNgayKetThuc(value); // Cập nhật giá trị khi Select thay đổi
  };

  //Ten column
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text, record) => <span>{listVoucher.indexOf(record) + 1}</span>,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      align: "center",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Giá Trị",
      dataIndex: "giaTriVoucher",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        if (record.loaiVoucher === "VNĐ") {
          formattedValue = record.giaTriVoucher.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        } else if (record.loaiVoucher === "%") {
          formattedValue = `${record.giaTriVoucher} %`;
        }
        return (
          <span className="txt-danger" style={{ fontWeight: "400" }}>
            {formattedValue}
          </span>
        );
      },
    },
    {
      title: "Giá Trị Tối Đa",
      dataIndex: "giaTriToiDa",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        if (record.loaiVoucher === "VNĐ") {
          formattedValue = "...";
        } else if (record.loaiVoucher === "%") {
          formattedValue = record.giaTriToiDa.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        }
        return (
          <span className="txt-danger" style={{ fontWeight: "400" }}>
            {formattedValue}
          </span>
        );
      },
    },
    {
      title: "Điều kiện",
      dataIndex: "dieuKienApDung",
      width: "25%",
      align: "center",
      render: (text, record) => (
        <>
          <span
            className=""
            style={{
              fontWeight: "400",
              whiteSpace: "pre-line",
              fontSize: "15px",
            }}
          >
            Đơn tối thiểu{" "}
            {record &&
              record.dieuKienApDung &&
              record.dieuKienApDung.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
          </span>
        </>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      width: "5%",
      align: "center",
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
              record.trangThai === 1 && isDatePast(record.ngayBatDau) === true
                ? "badge-light"
                : record.trangThai === 1 &&
                  isDateFuture(record.ngayKetThuc) === false
                ? "badge-primary"
                : record.trangThai === 2
                ? "badge-danger"
                : record.trangThai === 3
                ? "badge-light"
                : record.trangThai === 4 &&
                  isDateFuture(record.ngayKetThuc) === true
                ? "badge-danger"
                : record.trangThai === 4 &&
                  isDatePast(record.ngayBatDau) === true
                ? "badge-light"
                : record.trangThai === 4 &&
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
              className={`p-2 ${
                record.trangThai === 3
                  ? "text-dark"
                  : record.trangThai === 4 &&
                    isDatePast(record.ngayBatDau) === true
                  ? "text-dark"
                  : record.trangThai === 1 &&
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
          {record.trangThai === 1 ? (
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
          ) : record.trangThai === 2 ? (
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
          ) : record.trangThai === 3 ? (
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
          ) : record.trangThai === 4 ? (
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
      align: "center",
      width: "20%",
      render: (_, record) => {
        return (
          <>
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <Link to={`/dashboard/update-voucher/${record.id}`}>
                <IconButton size="">
                  <BorderColorOutlinedIcon color="primary" />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip
              TransitionComponent={Zoom}
              title={
                record.trangThai === 1 || record.trangThai === 3
                  ? "Ngừng kích hoạt"
                  : record.trangThai === 4 &&
                    isDatePast(record.ngayBatDau) === true
                  ? "Kích hoạt"
                  : record.trangThai === 4 &&
                    isRangeDate(record.ngayBatDau, record.ngayKetThuc) === true
                  ? "Kích hoạt"
                  : ""
              }
            >
              <IconButton
                disabled={
                  record.trangThai === 2 ||
                  (record.trangThai === 4 &&
                    isDateFuture(record.ngayKetThuc) === true)
                    ? true
                    : false
                }
                size=""
                className="ms-2"
                style={{ marginTop: "6px" }}
                onClick={() => doiTrangThaiVoucher(record.id)}
              >
                <AssignmentOutlinedIcon
                  color={
                    record.trangThai === 1 || record.trangThai === 3
                      ? "error"
                      : record.trangThai === 4 &&
                        isDatePast(record.ngayBatDau) === true
                      ? "success"
                      : record.trangThai === 4 &&
                        isRangeDate(record.ngayBatDau, record.ngayKetThuc) ===
                          true
                      ? "success"
                      : "disabled"
                  }
                />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    loadDataListVoucher(page);
  };

  const detailVoucher = (id) => {
    axios
      .get(apiURLVoucher + "/get-by-id/" + id)
      .then((response) => {
        setVoucher(response.data);
        console.log(voucher.ma);
      })
      .catch((error) => {});
  };

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
                label="Tìm voucher"
                value={searchTatCa}
                onChange={(e) => setSearchTatCa(e.target.value)}
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
              <Link to="/dashboard/add-voucher">
                <Button
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "140px", fontSize: "15px" }}
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
                    Tạo voucher
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
                  onChange={handleSearchTrangThaiChange}
                >
                  <MenuItem className="" value={5}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={1}>Hoạt động</MenuItem>
                  <MenuItem value={2}>Ngừng hoạt động</MenuItem>
                  <MenuItem value={3}>Chưa diễn ra</MenuItem>
                  <MenuItem value={4}>Đã hủy</MenuItem>
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
              dataSource={listVoucher}
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

export default HienThiVoucher;
