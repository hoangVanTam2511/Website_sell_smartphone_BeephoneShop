import {
  Form,
  Table,
  Input,
  Button,
  Space,
  Modal,
  AutoComplete,
} from "antd";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  faPencilAlt,
  faArrowsRotate,
  faPlus,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useSearchParams } from "react-router-dom";
import { apiURLVoucher } from "../../../service/api";
import "../../../assets/scss/quanLyVoucher.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Import thư viện Day.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import numeral from "numeral"; // Import thư viện numeral
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Select, IconButton, Tooltip, Pagination, TextField, Zoom } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import style from './style.css';
import { parseInt } from "lodash";

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
  const [statusVoucher, setStatusVoucher] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  // cutstom load data
  const loadDataListVoucher = (page) => {
    axios
      .get(`${apiURLVoucher}/vouchers`, {
        // params: {
        //   keyword: searchTatCa,
        //   pageNo: page,
        //   trangThai: searchTrangThai,
        //   ngayBatDau: searchNgayBatDau,
        //   ngayKetThuc: searchNgayKetThuc,
        // },
      })
      .then((response) => {
        setListVoucher(response.data.content);
        // setTotalPages(response.data.totalPages);
      });
  };

  useEffect(() => {
    loadDataListVoucher(currentPage);
    // const intervalId = setInterval(() => {
    //   loadDataListVoucher(currentPage);
    // }, 10000);
    // Xóa interval khi component unmounted
    // return () => clearInterval(intervalId);
  }, [
    // searchTatCa,
    // searchTrangThai,
    // searchNgayBatDau,
    // searchNgayKetThuc,
    // currentPage,
    // totalPages,
  ]);

  const handleReset = () => {
    setSearchTatCa("");
    setSearchNgayBatDau(null);
    setSearchNgayKetThuc(null);
    setSearchTrangThai("");
    setCurrentPage(1);
  };

  const doiTrangThaiVoucher = (id) => {
    axios
      .put(apiURLVoucher + "/deleteTrangThaiVoucher/" + id)
      .then((response) => {
        loadDataListVoucher(currentPage);
        showToast("success", "Đổi trạng thái thành công");
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi đổi trạng thái");
        showToast("error", "Đã xảy ra lỗi khi đổi trạng thái");
      });
  };

  const showToast = (type, message) => {
    // Replace with your actual toast notification implementation
    // Here's an example using the 'toast' library
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(parseInt(selectedValue)); // Cập nhật giá trị khi Select thay đổi
    searchParams.set("trangThai", parseInt(searchTrangThai));
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
      render: (text, record) => <span style={{ fontWeight: "400" }}>{record.ma}</span>,
    },
    // {
    //   title: "Tên",
    //   dataIndex: "ten",
    //   width: "15%",
    //   align: "center",
    //   render: (text, record) => (
    //     <span
    //       style={{
    //         maxWidth: "25%",
    //         whiteSpace: "pre-line",
    //         overflow: "hidden",
    //       }}
    //     >
    //       {record.ten}
    //     </span>
    //   ),
    // },
    {
      title: "Giá Trị",
      dataIndex: "giaTriVoucher",
      width: "10%",
      align: "center",
      render: (text, record) => <span className="txt-danger" style={{ fontWeight: "400" }}>
        {record && record.giaTriVoucher && record.giaTriVoucher.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </span>
    },
    {
      title: "Giá Trị Tối Đa",
      dataIndex: "giaTriToiDa",
      width: "10%",
      align: "center",
      render: (text, record) => {
        if (record.loaiVoucher === 1) {
          return <span>...</span>;
        }
        else {
          return
          <span className="txt-danger" style={{ fontWeight: "400" }}>
            {record && record.giaTriVoucher && record.giaTriVoucher.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        }
      },
    },
    {
      title: "Điều kiện",
      dataIndex: "dieuKienApDung",
      width: "25%",
      align: "center",
      render: (text, record) =>
        <>
          <span className="" style={{ fontWeight: "400", whiteSpace: "pre-line", fontSize: "15px" }}>
            Đơn tối thiểu {" "}
            {record && record.dieuKienApDung && record.dieuKienApDung.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </>
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
            className={`rounded-pill mx-auto ${(record.trangThai == 1) ? "badge-primary" :
              record.trangThai == 2 ? "badge-danger" :
                (record.trangThai == 3) ? "badge-light" :
                  (record.trangThai == 4 && isDateFuture(record.ngayKetThuc)
                    == true) ? "badge-danger" :
                    (record.trangThai == 4 && isDatePast(record.ngayBatDau)
                      == true) ? "badge-light" :
                      (record.trangThai == 4 && isRangeDate(record.ngayBatDau, record.ngayKetThuc)
                        == true) ? "badge-primary" :
                        ""}`}
            style={{
              height: "35px",
              width: "auto",
              padding: "4px",
            }}
          >
            <span
              className={`p-2 ${record.trangThai == 3 ? "text-dark" :
                (record.trangThai == 4 && isDatePast(record.ngayBatDau)
                  == true) ? "text-dark" :
                  "text-white"}`}
              style={{ fontSize: "14px" }}
            >
              {dayjs(record.ngayBatDau).format("DD/MM/YYYY")} {" "} - {" "}
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
              <span
                className="text-white p-2"
                style={{ fontSize: "14px" }}
              >
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
              <span
                className="text-white p-2"
                style={{ fontSize: "14px" }}
              >
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
              <span
                className="text-dark p-2"
                style={{ fontSize: "14px" }}
              >
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
              <span
                className="text-white p-2"
                style={{ fontSize: "14px" }}
              >
                Đã hủy
              </span>
            </div>
          ) : ""}
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
              <IconButton size="" >
                <BorderColorOutlinedIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom}
              title={record.trangThai == 1 || record.trangThai == 3
                ? "Ngừng kích hoạt" :
                (record.trangThai == 4 && isDatePast(record.ngayBatDau)
                  == true) ? "Kích hoạt" :
                  (record.trangThai == 4 && isRangeDate(record.ngayBatDau, record.ngayKetThuc)
                    == true) ? "Kích hoạt" : ""
              }
            >
              <IconButton size="" className='ms-2' style={{ marginTop: "6px" }}>
                <AssignmentOutlinedIcon color={record.trangThai == 1 || record.trangThai == 3
                  ? "error" :
                  (record.trangThai == 4 && isDatePast(record.ngayBatDau)
                    == true) ? "success" :
                    (record.trangThai == 4 && isRangeDate(record.ngayBatDau, record.ngayKetThuc)
                      == true) ? "success" : "disabled"
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const detailVoucher = (id) => {
    axios
      .get(apiURLVoucher + "/get-by-id/" + id)
      .then((response) => {
        // convertTien();
        setVoucher(response.data);
        console.log(voucher.ma);
      })
      .catch((error) => { });
  };

  const isDateFuture = (toDate) => {
    const currentDate = new Date();
    const getToDate = new Date(toDate);
    if (currentDate > getToDate) {
      return true;
    }
    return false;

  }
  const isDatePast = (fromDate) => {
    const currentDate = new Date();
    const getFromDate = new Date(fromDate);
    if (currentDate < getFromDate) {
      return true;
    }
    return false;

  }

  const isRangeDate = (fromDate, toDate) => {
    const currentDate = new Date();
    const getFromDate = new Date(fromDate);
    const getToDate = new Date(toDate);
    if (currentDate >= getFromDate && currentDate <= getToDate) {
      return true;
    }
    return false;
  }

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
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010" }}>
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
                // onClick={handleRefreshData}
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
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Ngày Bắt Đầu"
                    value={
                      searchNgayBatDau
                        ? dayjs(searchNgayBatDau, "DD/MM/YYYY")
                        : null
                    }
                    format="DD/MM/YYYY"
                    onChange={handleSearchNgayBatDauChange}
                    slotProps={{ textField: { size: 'small' } }}
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
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Ngày Kết Thúc"
                    value={
                      searchNgayKetThuc
                        ? dayjs(searchNgayKetThuc, "DD/MM/YYYY")
                        : null
                    }
                    format="DD/MM/YYYY"
                    onChange={handleSearchNgayKetThucChange}
                    slotProps={{ textField: { size: 'small' } }}
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
              <Link to="/them-voucher">
                <Button
                  className="rounded-2 button-mui"
                  type="primary"
                  style={{ height: "40px", width: "140px", fontSize: "15px" }}
                >
                  <PlusOutlined className="ms-1"
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
            <div className='d-flex me-3' style={{ height: "40px", position: "relative", cursor: "pointer" }}>
              <div onClick={handleOpenSelect} className="" style={{ marginTop: "7px" }}>
                <span className='ms-2 ps-1' style={{ fontSize: "15px", fontWeight: "450" }}>Trạng Thái: </span>
              </div>
              <FormControl sx={{
                minWidth: 50,
              }} size="small">
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: '7px',
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                    '& .MuiSelect-select': {
                      color: '#2f80ed',
                      fontWeight: "500",
                    },
                  }}
                  open={openSelect}
                  onClose={handleCloseSelect}
                  onOpen={handleOpenSelect}
                  defaultValue={5}
                >
                  <MenuItem className='' value={5}>Tất cả</MenuItem>
                  <MenuItem value={1}>Hoạt động</MenuItem>
                  <MenuItem value={2}>Ngừng hoạt động</MenuItem>
                  <MenuItem value={3}>Sắp diễn ra</MenuItem>
                  <MenuItem value={4}>Đã hủy</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='d-flex' style={{ height: "40px", position: "relative", cursor: "pointer" }}>
              <div onClick={handleOpenSelect1} className="" style={{ marginTop: "7px" }}>
                <span className='ms-2 ps-1' style={{ fontSize: "15px", fontWeight: "450" }}>Dành Cho: </span>
              </div>
              <FormControl sx={{
                minWidth: 50,
              }} size="small">
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: '7px',
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                    '& .MuiSelect-select': {
                      color: '#2f80ed',
                      fontWeight: "500",
                    },
                  }}
                  open={openSelect1}
                  onClose={handleCloseSelect1}
                  onOpen={handleOpenSelect1}
                  defaultValue={14}
                >
                  <MenuItem className='' value={14}>Tất cả</MenuItem>
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
          <div className='mx-auto'>
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
      {/*
      <Modal
        title="Voucher Details"
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
        height={AutoComplete}
        footer={[
          // Chỉ giữ lại nút "Cancel"
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div className="row detail-voucher">
          <div className="col-6">
            <h6>Mã: {voucher.ma}</h6>
          </div>
          <div className="col-6">
            <h6>Tên: {voucher.ten}</h6>
          </div>
        </div>
        <div className="row detail-voucher">
          <div className="col-6">
            <h6>Số lượng: {voucher.soLuong}</h6>
          </div>
          <div className="col-6">
            <h6>
              Điều kiện áp dụng:{" "}
              {numeral(voucher.dieuKienApDung).format("0,0 VND") + " VNĐ"}
            </h6>
          </div>
        </div>
        <div className="row detail-voucher">
          <div className="col-6">
            <h6>
              Giá trị voucher:{" "}
              {voucher.loaiVoucher === 1
                ? numeral(voucher.giaTriVoucher).format("0,0 VND") + " VNĐ"
                : voucher.giaTriVoucher + " %"}
            </h6>
          </div>
          <div className="col-6">
            <h6>
              Giá trị tối đa:{" "}
              {numeral(voucher.giaTriToiDa).format("0,0 VND") + " VNĐ"}
            </h6>
          </div>
        </div>
        <div className="row detail-voucher">
          <div className="col-6">
            <h6>
              Loại voucher:{" "}
              {voucher.loaiVoucher === 2
                ? " Giảm Giá Theo %"
                : "Giảm Giá Theo VNĐ"}
            </h6>
          </div>
          <div className="col-6">
            <h6>
              Trạng thái:{" "}
              {voucher.trangThai === 1
                ? "Còn hiệu lực"
                : voucher.trangThai === 2
                  ? "Hết hiệu lực"
                  : "Chưa bắt đầu"}
            </h6>
          </div>
        </div>
        <div className="row detail-voucher">
          <div className="col-6">
            <h6>
              Ngày bắt đầu:{" "}
              {dayjs(voucher.ngayBatDau).format("HH:mm - DD/MM/YYYY")}
            </h6>
          </div>
          <div className="col-6">
            <h6>
              Ngày kết thúc:{" "}
              {dayjs(voucher.ngayKetThuc).format("HH:mm - DD/MM/YYYY")}
            </h6>
          </div>
        </div>
      </Modal>
      <div className="search-component-container">
        <h6 className="boloc-voucher" style={{ color: "black" }}>
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
              />
            </Form>
          </span>
          <div className="btn-search"></div>
          &nbsp;&nbsp;&nbsp;
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
            <span className="boloc-nho">
              <FormControl sx={{ width: "15em", marginTop: "7px" }}>
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
                  <MenuItem value={parseInt(1)}>Còn Hiệu lực</MenuItem>
                  <MenuItem value={parseInt(2)}>Hết Hiệu lực</MenuItem>
                  <MenuItem value={parseInt(3)}>Chưa Bắt Đầu</MenuItem>
                </Select>
              </FormControl>
            </span>
          </div>
        </div>
      </div>
      <div className="your-component-container d-flex justify-content-between">
        <div className="btn-add">
          <Link to="/them-voucher">
            <Button
              className="rounded-2 button-mui"
              type="primary"
              style={{ height: "40px", width: "140px", fontSize: "15px" }}
            >
              <PlusOutlined className="ms-1"
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
        <div className="form-tbl">
          <Form form={form}>
            <div className="phan-trang">
            </div>
          </Form>
        </div>
      </div>
*/}
    </>
  );
};

export default HienThiVoucher;
