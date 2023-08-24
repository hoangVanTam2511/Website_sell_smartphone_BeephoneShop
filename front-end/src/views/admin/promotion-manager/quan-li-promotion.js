import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Pagination,
  Space,
  Tooltip,
} from "antd";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faSave,
  faTimes,
  faMagnifyingGlass,
  faArrowsRotate,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/scss/HienThiNV.scss";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { apiURLKhuyenMai } from "../../../service/api";
import "../../../assets/scss/quanLyPromotion.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Import thư viện Day.js

//show
const HienThiKhuyenMai = () => {
  const [form] = Form.useForm();
  let [listKhuyenMai, setlistKhuyenMai] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingNgayBatDau, setEditingNgayBatDau] = useState(null);
  const [editingNgayKetThuc, setEditingNgayKetThuc] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchMaVoucher, setSearchMaVoucher] = useState("");
  const [searchTenVoucher, setSearchTenVoucher] = useState("");
  const [searchGiaTriVoucher, setSearchGiaTriVoucher] = useState("");

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchTatCa("");
  };

  useEffect(() => {
    loadDataListKhuyenMai(currentPage);
  }, [currentPage]);

  // cutstom load data
  const loadDataListKhuyenMai = (currentPage) => {
    if (currentPage == undefined) currentPage = 0;
    axios
      .get(apiURLKhuyenMai + "/hien-thi?page=" + currentPage)
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        console.log(response);
        setlistKhuyenMai(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      });
  };

  // set filter
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredDataSource = filterStatus
    ? listKhuyenMai.filter((item) => item.trangThai === filterStatus)
    : listKhuyenMai;
  //save
  // const save = async (id) => {
  //   try {
  //     const row = await form.validateFields();
  //     const newData = [...listKhuyenMai];
  //     const index = newData.findIndex((item) => id === item.id);
  //     if (index > -1) {
  //       const item = newData[index];
  //       const updatedItem = {
  //         ...item,
  //         ...row,
  //       };
  //       axios
  //         .put(`${apiURLKhuyenMai}/update-khuyen-mai/${id}`, updatedItem)
  //         .then((response) => {
  //           if (response.status === 200) {
  //             newData.splice(index, 1, updatedItem);
  //             setlistKhuyenMai(newData);
  //             loadDataListKhuyenMai();
  //           }
  //         })
  //         .catch((error) => {
  //           console.log("Failed to update record:", error);
  //         });
  //     } else {
  //       newData.push(row);
  //       setlistKhuyenMai(newData);
  //       setEditingNgayBatDau(null);
  //       setEditingNgayKetThuc(null);
  //     }
  //   } catch (errInfo) {
  //     console.log("Validate Failed:", errInfo);
  //   }
  // };

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

  const ConverttrangThai = (trangThai) => {
    return trangThai === true ? "Còn Hiệu Lực" : "Hết Hiệu Lực";
  };
  //Ten column
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      width: "10%",
    },
    {
      title: "Giảm Giá (%)",
      dataIndex: "mucGiamGiaTheoPhanTram",
      width: "10%",
    },
    {
      title: "Giảm Giá ($)",
      dataIndex: "mucGiamGiaTheoSoTien",
      width: "10%",
    },
    {
      title: "Thời Gian",
      dataIndex: "thoiGian",
      width: "10%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          {dayjs(record.ngayBatDau).format("HH:mm:ss DD-MM-YYYY")} -{" "}
          {dayjs(record.ngayKetThuc).format("HH:mm:ss DD-MM-YYYY")}
        </div>
      ),
    },
    {
      title: "Điều Kiện Giảm Giá",
      dataIndex: "dieuKienGiamGia",
      width: "10%",
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      width: "15%",
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {/*  eslint-disable-next-line eqeqeq */}
          {record.trangThai == true ? (
            <Button
              type="primary"
              onClick={() => {
                doiTrangThaiVoucher(record.id);
              }}
              style={{ borderRadius: "30px" }}
            >
              Còn Hiệu Lực
            </Button>
          ) : // eslint-disable-next-line eqeqeq
          record.trangThai == false ? (
            <Button
              type="primary"
              onClick={() => {
                doiTrangThaiVoucher(record.id);
              }}
              danger
              style={{ borderRadius: "30px" }}
            >
              Hết Hiệu Lực
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
      render: (_, record) => {
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <Tooltip title="Edit">
                <Link to={`/sua-voucher/${record.id}`}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>{" "}
              </Tooltip>
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
          {/* Search */}

          <div className="btn-search">
            <Link to="/search-voucher">
              <Button className="btn-search-voucher">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                &nbsp; Tìm Kiếm{" "}
              </Button>
            </Link>
          </div>

          <div className="btn-reset">
            <Button className="btn-search-reset">
              <FontAwesomeIcon icon={faArrowsRotate} />
              &nbsp; Làm Mới{" "}
            </Button>
          </div>
        </div>
        {/*Bộ Lọc trạng thái*/}
        <div className="boloc-trangThai">
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Mã Khuyến Mãi: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Mã Voucher"
                  value={searchMaVoucher}
                  onChange={(e) => setSearchMaVoucher(e.target.value)}
                />
              </Form>
            </span>
          </div>
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Tên Khuyến Mãi: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Tên Voucher"
                  value={searchTenVoucher}
                  onChange={(e) => setSearchTenVoucher(e.target.value)}
                />
              </Form>
            </span>
          </div>
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Trạng Thái: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Mã Voucher"
                  value={searchMaVoucher}
                  onChange={(e) => setSearchMaVoucher(e.target.value)}
                />
              </Form>
            </span>
          </div>
        </div>
        <div className="boloc-promotion">
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Giảm Giá: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Mã Voucher"
                  value={searchMaVoucher}
                  onChange={(e) => setSearchMaVoucher(e.target.value)}
                />
              </Form>
            </span>
          </div>
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Ngày Bắt Đầu: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Mã Voucher"
                  value={searchMaVoucher}
                  onChange={(e) => setSearchMaVoucher(e.target.value)}
                />
              </Form>
            </span>
          </div>
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Ngày Kết Thúc: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Tên Voucher"
                  value={searchTenVoucher}
                  onChange={(e) => setSearchTenVoucher(e.target.value)}
                />
              </Form>
            </span>
          </div>
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Điều Kiện Giảm Giá: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Giá Trị Khuyến Mãi"
                  value={searchGiaTriVoucher}
                  onChange={(e) => setSearchGiaTriVoucher(e.target.value)}
                />
              </Form>
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
            dataSource={filteredDataSource}
            columns={mergedColumns}
            pagination={false}
            rowKey="id"
            style={{ marginBottom: "20px" }}
          />

          <div className="phan-trang">
            <Pagination
              simplecurrent={currentPage + 1}
              onChange={(value) => {
                setCurrentPage(value - 1);
              }}
              total={totalPages * 10}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HienThiKhuyenMai;
