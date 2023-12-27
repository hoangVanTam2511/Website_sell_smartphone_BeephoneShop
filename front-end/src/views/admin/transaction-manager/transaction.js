import {
  FormControl,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import useCustomSnackbar from "../../../utilities/notistack";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import "./style.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Button, Table } from "antd";
import Card from "../../../components/Card";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import * as dayjs from "dayjs";
import { Notistack } from "../order-manager/enum";
import axios from "axios";
import { format } from "date-fns";
import { request, requestParam } from "../../../store/helpers/axios_helper";

const Transaction = () => {
  const [form] = useForm();
  const [listTransaction, setListTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTrangThai, setSearchTrangThai] = useState(6);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchLoaiThanhToan, setSearchLoaiThanhToan] = useState(3);
  const [searchHinhThucThanhToan, setSearchHinhThucThanhToan] = useState(3);
  const [sortTransaction, setSortTransaction] = useState("all");
  const [showPage, setShowPage] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [searchNgayBatDau, setSearchNgayBatDau] = useState(null);
  const [searchNgayKetThuc, setSearchNgayKetThuc] = useState(null);
  const [openSelect2, setOpenSelect2] = useState(false);
  const [idNhanVien, setIdNhanVien] = useState("");

  const loadDataListTransaction = (page) => {
    const request = {
      pageNo: page,
      keyword: searchTatCa,
      hinhThucThanhToan: searchHinhThucThanhToan,
      loaiThanhToan: searchLoaiThanhToan,
      trangThai: searchTrangThai,
      ngayBatDau: searchNgayBatDau,
      ngayKetThuc: searchNgayKetThuc,
    };
    requestParam("GET", `/transaction/transactions`, request)
      .then((response) => {
        setListTransaction(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
        console.log(error);
      });
  };

  useEffect(() => {
    loadDataListTransaction(currentPage);
  }, [
    searchNgayBatDau,
    searchNgayKetThuc,
    searchTrangThai,
    searchLoaiThanhToan,
    searchTatCa,
    searchHinhThucThanhToan,
    currentPage,
    totalPages,
  ]);

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

  const handleSearchTypeTransaction = (event) => {
    const selectedValue = event.target.value;
    setSearchLoaiThanhToan(selectedValue);
    if (loadDataListTransaction(currentPage) === null)
      setCurrentPage(totalPages);
  };

  const handleSearchFormTransaction = (event) => {
    const selectedValue = event.target.value;
    setSearchHinhThucThanhToan(selectedValue);
    setCurrentPage(1);
  };

  const handleSortValueTransaction = (event) => {
    const selectedValue = event.target.value;
    setSortTransaction(selectedValue);
    setCurrentPage(1);
  };

  const handleSearchTatCaChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTatCa(selectedValue);
    setCurrentPage(1);
  };

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(selectedValue);
    setCurrentPage(1);
  };

  const handleSearchNgayBatDauChange = (selectedDate) => {
    const formattedDate = selectedDate
      ? dayjs(selectedDate).startOf("day").format("DD/MM/YYYY HH:mm:ss")
      : dayjs().startOf("day").format("DD/MM/YYYY HH:mm:ss"); // Nếu không có giá trị selectedDate, sử dụng ngày và thời gian bắt đầu của ngày hiện tại

    setSearchNgayBatDau(formattedDate);
    setCurrentPage(1);
  };

  const handleSearchNgayKetThucChange = (selectedDate) => {
    const formattedDate = selectedDate
      ? dayjs(selectedDate).endOf("day").format("DD/MM/YYYY HH:mm:ss")
      : dayjs().endOf("day").format("DD/MM/YYYY HH:mm:ss"); // Nếu không có giá trị selectedDate, sử dụng ngày hiện tại

    setSearchNgayKetThuc(formattedDate); // Cập nhật giá trị khi Select thay đổi
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTatCa("");
    setSearchLoaiThanhToan(3);
    setSortTransaction("all");
    setSearchHinhThucThanhToan(3);
    setSearchTrangThai(6);
    setCurrentPage(1);
    setSearchNgayBatDau(null);
    setSearchNgayKetThuc(null);
    setSearchParams("");
    loadDataListTransaction(currentPage);
  };

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    loadDataListTransaction(page);
  };

  const navigate = useNavigate();

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text, record) => (
        <span>{listTransaction.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Mã Đơn Hàng",
      dataIndex: "maHoaDon",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.maHoaDon}</span>
      ),
    },
    {
      title: "Số Tiền",
      dataIndex: "soTienThanhToan",
      width: "15%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = record.soTienThanhToan.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
        return (
          <span className="txt-danger" style={{ fontWeight: "400" }}>
            {formattedValue}
          </span>
        );
      },
    },
    {
      title: "Thời Gian",
      dataIndex: "ngayTao",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <span>
          <span style={{ fontWeight: "", whiteSpace: "pre-line" }}>
            {record &&
              record.ngayTao &&
              format(new Date(record.ngayTao), "HH:mm:ss, dd/MM/yyyy")}
          </span>
        </span>
      ),
    },

    {
      title: "Loại Thanh Toán",
      dataIndex: "loaiThanhToan",
      width: "10%",
      align: "center",
      onFilter: (value, record) => record.trangThai === value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.loaiThanhToan === 1 ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Hoàn Trả
              </span>
            </div>
          ) : record.loaiThanhToan === 0 ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Thanh Toán
              </span>
            </div>
          ) : (
            ""
          )}
        </span>
      ),
    },

    {
      title: "Hình Thức Thanh Toán",
      dataIndex: "hinhThucThanhToan",
      width: "10%",
      align: "center",
      onFilter: (value, record) => record.trangThai === value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.hinhThucThanhToan === 1 ? (
            <div
              className="rounded-pill mx-auto badge-success"
              style={{
                height: "35px",
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Tiền Mặt
              </span>
            </div>
          ) : record.hinhThucThanhToan === 2 ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                CK Thường
              </span>
            </div>
          ) : record.hinhThucThanhToan === 0 ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                CK VNPay
              </span>
            </div>
          ) : (
            ""
          )}
        </span>
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
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Thành Công
              </span>
            </div>
          ) : record.trangThai === 0 ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "120px",
                padding: "4px",
              }}
            >
              <span className="text-white p-2" style={{ fontSize: "14px" }}>
                Thất Bại
              </span>
            </div>
          ) : (
            ""
          )}
        </span>
      ),
    },
    {
      title: "Người Xác Nhận",
      dataIndex: "nguoiXacNhan",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <span
          className="underline-custom"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/dashboard/update-employee/${record.idNhanVien}`);
          }}
        >
          {record.nguoiXacNhan}
        </span>
      ),
    },
  ];

  return (
    <>
      <div
        className="mt-3"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                placeholder="Tìm theo mã và số tiền giao dịch."
                label="Tìm giao dịch"
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
                    width: "350px",
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
          </Card.Header>
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <div
              className="mt-3 pt-1 ms-auto text-center me-2 pe-1 d-flex"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                className="d-flex"
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
                      Mặc Định
                    </MenuItem>
                    <MenuItem value={1}>Thành Công</MenuItem>
                    <MenuItem value={0}>Thất Bại</MenuItem>
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
                    Loại Thanh Toán:{" "}
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
                    value={searchLoaiThanhToan}
                    onChange={handleSearchTypeTransaction}
                  >
                    <MenuItem className="" value={3}>
                      Mặc Định
                    </MenuItem>
                    <MenuItem value={1}>Hoàn Tiền</MenuItem>
                    <MenuItem value={0}>Thanh Toán</MenuItem>
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
                    Hình Thức Thanh Toán:{" "}
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
                    value={searchHinhThucThanhToan}
                    onChange={handleSearchFormTransaction}
                  >
                    <MenuItem className="" value={3}>
                      Mặc Định
                    </MenuItem>
                    <MenuItem value={0}>Chuyển Khoản VN Pay</MenuItem>
                    <MenuItem value={2}>Chuyển Khoản Thường</MenuItem>
                    <MenuItem value={1}>Tiền Mặt</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* <div
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
                    open={openSelect3}
                    onClose={handleCloseSelect3}
                    onOpen={handleOpenSelect3}
                    value={sortTransaction}
                    onChange={handleSortValueTransaction}
                  >
                    <MenuItem className="" value={"all"}>
                      Mặc định
                    </MenuItem>
                    <MenuItem value={"a-z"}>Tăng dần theo giá trị</MenuItem>
                    <MenuItem value={"z-a"}>Giảm dần theo giá trị</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
            </div>
          </div>
          <Card.Body>
            <Table
              className="table-container"
              dataSource={listTransaction}
              columns={columns}
              pagination={false}
              rowKey="id"
              size="middle"
            />
          </Card.Body>
          <div className="mx-auto mb-3" style={{ textAlign: "center" }}>
            <Pagination
              page={parseInt(currentPage)}
              count={totalPages}
              onChange={chuyenTrang}
              color="primary"
            />
          </div>
        </Card>
      </div>
    </>
  );
};
export default Transaction;
