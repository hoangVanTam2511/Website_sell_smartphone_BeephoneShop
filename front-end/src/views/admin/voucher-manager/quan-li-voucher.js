import {
  Form,
  Table,
  Input,
  Button,
  Tooltip,
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
import Select from "@mui/material/Select";
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
import { Box, Pagination } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

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
      });
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
      width: "1%",
      align: "center",
      render: (text, record) => <span>{listVoucher.indexOf(record) + 1}</span>,
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      width: "1%",
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "ten",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <span
          style={{
            maxWidth: "25%",
            whiteSpace: "pre-line",
            overflow: "hidden",
          }}
        >
          {record.ten}
        </span>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      width: "1%",
      align: "center",
    },

    {
      title: "Giá Trị",
      dataIndex: "giaTriVoucher",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value; // Mặc định là giữ nguyên giá trị

        if (record.loaiVoucher === 1) {
          formattedValue = numeral(value).format("0,0 VND") + " VNĐ";
        } else if (record.loaiVoucher === 2) {
          formattedValue = `${value} %`;
        }

        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Thời Gian",
      dataIndex: "thoiGian",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <>
          {dayjs(record.ngayBatDau).format("DD/MM/YYYY")} -{" "}
          {dayjs(record.ngayKetThuc).format("DD/MM/YYYY")}
        </>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      width: "1%",
      align: "center",
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.trangThai === 1 ? (
            <Button
              type="primary"
              style={{
                borderRadius: "30px",
                pointerEvents: "none",
                cursor: "default",
              }}
            >
              Còn Hiệu Lực
            </Button>
          ) : record.trangThai === 2 ? (
            <Button
              type="primary"
              danger
              style={{
                borderRadius: "30px",
                pointerEvents: "none",
                cursor: "default",
              }}
            >
              Hết Hiệu Lực
            </Button>
          ) : record.trangThai === 3 ? (
            <Button
              type="primary"
              style={{
                borderRadius: "30px",
                pointerEvents: "none",
                cursor: "default",
                background: "teal",
              }}
            >
              Chưa Bắt Đầu
            </Button>
          ) : record.trangThai === 4 ? (
            <Button
              type="primary"
              style={{
                borderRadius: "30px",
                pointerEvents: "none",
                cursor: "default",
                background: "olive",
              }}
            >
              Hết Lượt Dùng
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                borderRadius: "30px",
                pointerEvents: "none",
                cursor: "default",
                background: "black",
              }}
            >
              Không Xác Định
            </Button>
          )}
        </span>
      ),
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      width: "1%",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                paddingLeft: "10px",
              }}
            >
              <div>
                <Tooltip title="Details">
                  <Button
                    onClick={() => {
                      detailVoucher(record.id);
                      showModal();
                    }}
                    style={{ border: "none", background: "none", padding: "0" }}
                  >
                    {/* <FontAwesomeIcon icon={faRotateRight} /> */}
                    <RemoveRedEyeIcon
                      fontSize="small"
                      style={{ color: "blue" }}
                    />
                  </Button>
                  <ToastContainer />
                </Tooltip>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <Tooltip title="Edit">
                  <Link to={`/sua-voucher/${record.id}`}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Link>
                </Tooltip>
              </div>
            </div>
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
      .catch((error) => {});
  };

  return (
    <>
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
                value={searchTatCa}
                onChange={(e) => setSearchTatCa(e.target.value)}
              />
            </Form>
          </span>
          <div className="btn-search"></div>
          {/* Search */}
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
        {/*Bộ Lọc trạng thái*/}
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
      <div className="your-component-container">
        <h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          &nbsp; Danh Sách Voucher
        </h6>
        <div className="btn-add">
          {/* Search */}
          <FontAwesomeIcon style={{ marginLeft: "5px" }} />
          <span className="bl-add">
            <Link to="/them-voucher">
              <Button className="btn-add-voucher">
                {/* <FontAwesomeIcon icon={faPlus} /> */}
                <AddIcon fontSize="small" />
                &nbsp; Thêm voucher{" "}
              </Button>
            </Link>
          </span>
        </div>
        <div className="form-tbl">
          <Form form={form}>
            <Table
              bordered
              dataSource={listVoucher}
              columns={columns}
              rowClassName="editable-row"
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
          </Form>
        </div>
      </div>
    </>
  );
};

export default HienThiVoucher;
