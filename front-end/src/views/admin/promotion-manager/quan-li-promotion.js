import { Form, Table, Input, Button, Tooltip } from "antd";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faArrowsRotate,
  faPlus,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/scss/HienThiNV.scss";
import { Link, useSearchParams } from "react-router-dom";
import { apiURLKhuyenMai } from "../../../service/api";
import "../../../assets/scss/quanLyPromotion.scss";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Pagination } from "@mui/material";
import numeral from "numeral";

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
  }, [
    searchTatCa,
    searchTrangThai,
    searchNgayBatDau,
    searchNgayKetThuc,
    currentPage,
  ]);

  const doiTrangThaiVoucher = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn thay đổi trạng thái?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(apiURLKhuyenMai + "/doi-trang-thai/" + id)
          .then((response) => {
            loadDataListKhuyenMai(currentPage);
            Swal.fire({
              icon: "success",
              title: "Thành công!",
              text: "Trạng thái đã được thay đổi",
            });
          })
          .catch((error) => {
            console.error("Đã xảy ra lỗi khi đổi trạng thái");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Đã xảy ra lỗi khi đổi trạng thái",
            });
          });
      }
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
      title: "Mã",
      dataIndex: "ma",
      width: "10%",
      align: "center",
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
        if (record.loaiKhuyenMai === 1) {
          formattedValue =
            numeral(record.giaTriKhuyenMai).format("0,0 VND") + " VNĐ";
        } else if (record.loaiKhuyenMai === 2) {
          formattedValue = `${record.giaTriKhuyenMai} %`;
        }
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Thời Gian Bắt Đầu - Kết Thúc",
      dataIndex: "thoiGian",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          {dayjs(record.ngayBatDau).format("DD/MM/YYYY")} -{" "}
          {dayjs(record.ngayKetThuc).format("DD/MM/YYYY")}
        </div>
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
          {record.trangThai == 1 ? (
            <Button type="primary" style={{ borderRadius: "30px" }}>
              Còn Hiệu Lực
            </Button>
          ) : record.trangThai == 2 ? (
            <Button type="primary" danger style={{ borderRadius: "30px" }}>
              Hết Hiệu Lực
            </Button>
          ) : record.trangThai == 3 ? (
            <Button type="primary" danger style={{ borderRadius: "30px" }}>
              Chưa bắt đầu
            </Button>
          ) : (
            <Button type="primary" style={{ borderRadius: "30px" }}>
              Không xác định
            </Button>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Tooltip title="Change">
                  <Button
                    onClick={() => {
                      doiTrangThaiVoucher(record.id);
                    }}
                    style={{ border: "none", background: "none" }}
                  >
                    <FontAwesomeIcon icon={faRotateRight} />
                  </Button>{" "}
                </Tooltip>
              </div>
              <div style={{ textAlign: "center", paddingLeft: "20px" }}>
                <Tooltip title="Edit">
                  <Link to={`/sua-khuyen-mai/${record.id}`}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Link>{" "}
                </Tooltip>
              </div>
            </div>
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
    // searchParams.set("trangThai", searchTrangThai);
    // setSearchParams(searchParams);
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

  return (
    <>
      <div className="search-component-container">
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
                <DatePicker
                  label="Ngày Bắt Đầu"
                  value={dayjs(searchNgayBatDau, "DD/MM/YYYY")}
                  format="DD/MM/YYYY"
                  onChange={handleSearchNgayBatDauChange}
                />
              </LocalizationProvider>
            </span>
          </div>

          <div className="search1">
            <span className="boloc-nho">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày Kết Thúc"
                  value={dayjs(searchNgayKetThuc, "DD/MM/YYYY")}
                  format="DD/MM/YYYY"
                  onChange={handleSearchNgayKetThucChange}
                />
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
          {/* Search */}
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
      </div>
    </>
  );
};

export default HienThiKhuyenMai;
