import { Form, Table, Input, Button } from "antd";
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

  const handleReset = () => {
    loadDataListKhuyenMai(currentPage);
    setSearchTatCa("");
    setSearchNgayBatDau("");
    setSearchNgayKetThuc("");
    setSearchTrangThai("");
  };

  // cutstom load data
  const loadDataListKhuyenMai = (page) => {
    axios
      .get(`${apiURLKhuyenMai}/hien-thi`, {
        params: {
          keyword: searchTatCa,
          pageNo: page,
          trangThai: searchTrangThai,
          ngayBatDau: searchNgayBatDau,
          ngayKetThuc: searchNgayKetThuc,
        },
      })
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setlistKhuyenMai(modifiedData);
        setTotalPages(response.data.totalPages);
      });
  };

  useEffect(() => {
    loadDataListKhuyenMai(currentPage);
    const intervalId = setInterval(() => {
      loadDataListKhuyenMai(currentPage);
    }, 10000);
    // Xóa interval khi component unmounted
    return () => clearInterval(intervalId);
  }, [
    searchTatCa,
    searchTrangThai,
    searchNgayBatDau,
    searchNgayKetThuc,
    currentPage,
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

  const doiTrangThaiKhuyenMai = (id) => {
    axios
      .put(apiURLKhuyenMai + `/doi-trang-thai/${id}`)
      .then((response) => {
        loadDataListKhuyenMai(currentPage);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi đổi trạng thái");
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
      dataIndex: "loaiGiamGia",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        if (record.loaiKhuyenMai === "VNĐ") {
          formattedValue =
            numeral(record.giaTriKhuyenMai).format("0,0 VND") + " VNĐ";
        } else if (record.loaiKhuyenMai === "%") {
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
              record.trangThai == 1
                ? "badge-primary"
                : record.trangThai == 2
                ? "badge-danger"
                : record.trangThai == 3
                ? "badge-light"
                : record.trangThai == 4 &&
                  isDateFuture(record.ngayKetThuc) == true
                ? "badge-danger"
                : record.trangThai == 4 && isDatePast(record.ngayBatDau) == true
                ? "badge-light"
                : record.trangThai == 4 &&
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
                record.trangThai == 3
                  ? "text-dark"
                  : record.trangThai == 4 &&
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
          ) : record.trangThai == 4 ? (
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
                size=""
                onClick={() => doiTrangThaiKhuyenMai(record.id)}
                className="ms-2"
                style={{ marginTop: "6px" }}
                disabled={
                  record.trangThai === 2 ||
                  (record.trangThai === 4 &&
                    isDateFuture(record.ngayKetThuc) === true)
                    ? true
                    : false
                }
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

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(selectedValue); // Cập nhật giá trị khi Select thay đổi
    searchParams.set("trangThai", selectedValue);
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
                label="Tìm khuyến mãi"
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
                    Tạo khuyến mãi
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
      </div>
      {/* <div className="search-component-container">
        <h6 className="boloc-voucher">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
          </svg>
          &nbsp; Bộ Lọc
        </h6>
        <div className="row-search">
          <span>
            <Form style={{ width: "20em", display: "inline-block" }}>
              <Input
                placeholder="Search"
                value={searchTatCa}
                onChange={(e) => setSearchTatCa(e.target.value)}
              />
            </Form>
          </span>
          &nbsp;
          <div className="btn-reset">
            <Button
              className="btn-search-reset"
              onClick={() => {
                handleReset();
              }}
            >
              <FontAwesomeIcon icon={faArrowsRotate} />
              &nbsp; Làm Mới{" "}
            </Button>
          </div>
        </div>
        <div className="boloc-trangThai">
          <div className="search1">
            <span className="boloc-nho">
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
                  />
                </DemoContainer>
              </LocalizationProvider>
            </span>
          </div>

          <div className="search1">
            <span className="boloc-nho">
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
                  />
                </DemoContainer>
              </LocalizationProvider>
            </span>
          </div>
          <div className="search1">
            <span className="boloc-nho"></span>
            <FormControl sx={{ width: "15em" }}>
              <InputLabel id="demo-select-small-label">
                Chọn Trạng Thái
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={searchTrangThai}
                label="Chọn Trạng Thái"
                onChange={handleSearchTrangThaiChange}
              >
                <MenuItem value="">
                  <em>Tất cả</em>
                </MenuItem>
                <MenuItem value={1}>Còn Hiệu lực</MenuItem>
                <MenuItem value={2}>Hết Hiệu lực</MenuItem>
                <MenuItem value={3}>Chưa Bắt Đầu</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="your-component-container">
        <h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          &nbsp; Danh Sách Khuyến Mãi
        </h6>
        <div className="btn-add">
          <FontAwesomeIcon style={{ marginLeft: "5px" }} />
          <span className="bl-add">
            <Link to="/them-khuyen-mai">
              <Button className="btn-add-voucher">
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Thêm Khuyến Mãi{" "}
              </Button>
            </Link>
          </span>
        </div>
        <div className="form-tbl">
          <Table
            bordered
            dataSource={listKhuyenMai}
            columns={mergedColumns}
            pagination={false}
            rowKey="id"
            style={{ marginBottom: "20px" }}
          />

          <div className="phan-trang">
            <Pagination
              count={totalPages}
              onChange={chuyenTrang}
              color="primary"
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HienThiKhuyenMai;
