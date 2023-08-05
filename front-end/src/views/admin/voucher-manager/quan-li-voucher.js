import {
  Form,
  Popconfirm,
  Table,
  Input,
  Button,
  Pagination,
  Space,
  Dropdown,
  MenuProps,
  Tooltip,
  Modal,
  Select,
  DatePicker,
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
import { DownOutlined } from "@ant-design/icons";
import { apiURLVoucher } from "../../../service/api";
import "../../../assets/scss/quanLyVoucher.scss";
import { format, parse } from "date-fns";
import { TextField, colors } from "@mui/material";
import { is } from "date-fns/locale";

const currentDate = new Date().toISOString().split("T")[0];

//show
const HienThiVoucher = () => {
  const [form] = Form.useForm();
  let [listVoucher, setlistVoucher] = useState([]);
  let [listSearch, setlistSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingThoiGian, setEditingThoiGian] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchMaVoucher, setSearchMaVoucher] = useState("");
  const [searchTenVoucher, setSearchTenVoucher] = useState("");
  const [searchGiaTriVoucher, setSearchGiaTriVoucher] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const voucher = {
    ma: "",
    ten: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    giaTriVoucher: "",
    trangThai: "",
  };

  // const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const formatDateTime = (dateTime) => {
    const parsedDate = new Date(dateTime);
    return format(parsedDate, "HH:mm:ss dd-MM-yyyy");
  };

  const handleChange = (value) => {
    console.log(value);
  };

  useEffect(() => {
    loadDataListVoucher(currentPage);
  }, [currentPage]);

  // cutstom load data
  const loadDataListVoucher = (currentPage) => {
    axios
      .get(apiURLVoucher + "/hien-thi?page=" + currentPage)
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setlistVoucher(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
        console.log(modifiedData);
      });
  };

  const searchVoucher = (currentPage) => {
    axios
      .get(apiURLVoucher + "/searchVoucher")
      .then((response) => {
        setlistSearch(response.data);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi đổi trạng thái");
        setIsSearching(false);
      });
  };

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
          .put(apiURLVoucher + "/deleteTrangThaiVoucher/" + id)
          .then((response) => {
            loadDataListVoucher(currentPage);
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
  // set filter
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredDataSource = filterStatus
    ? listVoucher.filter((item) => item.trangThai === filterStatus)
    : listVoucher;

  //edit

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  // ham edit
  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      ma: record.ma,
      ten: record.ten,
      ngayBatDau: record.ngayBatDau,
      ngayKetThuc: record.ngayKetThuc,
      thoiGian: record.thoiGian,
      giaTriVoucher: record.giaTriVoucher,
      trangThai: record.trangThai,
    });
    setEditingKey(record.id);
  };

  //show modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // save
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...listVoucher];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };
        axios
          .put(`${apiURLVoucher}/updateVoucher/${id}`, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              newData.splice(index, 1, updatedItem);
              setlistVoucher(newData);
              setEditingKey("");
              loadDataListVoucher();
            }
          })
          .catch((error) => {
            console.log("Failed to update record:", error);
          });
      } else {
        newData.push(row);
        setlistVoucher(newData);
        setEditingKey("");
        setEditingThoiGian(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  //Ten column
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "1%",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã Voucher",
      dataIndex: "ma",
      width: "10%",
    },
    {
      title: "Tên Voucher",
      dataIndex: "ten",
      width: "10%",
    },
    {
      title: "Thời Gian",
      dataIndex: "thoiGian",
      width: "10%",
      editable: true,
      render: (text, record) =>
        `${formatDateTime(record.ngayBatDau)} - ${formatDateTime(
          record.ngayKetThuc
        )}`,
    },
    {
      title: "Giá Trị Voucher",
      dataIndex: "giaTriVoucher",
      width: "10%",
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      width: "1%",
      // eslint-disable-next-line eqeqeq
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      // editable: true,
      render: (text, record) => (
        <span>
          {/*  eslint-disable-next-line eqeqeq */}
          {record.trangThai == 1 ? (
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
          record.trangThai == 2 ? (
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
      // render: (trangThai) => trangThaiVoucher(trangThai),
    },
    {
      title: "Thao Tác",
      dataIndex: "operation",
      width: "1%",
      render: (_, record) => {
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <Tooltip title="Edit">
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  onClick={showModal}
                  style={{
                    cursor: "pointer",
                    // opacity: editingKey === record.id ? 0.5 : 1,
                    color: editingKey === record.id ? "red" : "green",
                  }}
                  disabled={editingKey !== ""}
                />
                <Modal
                  title="Basic Modal"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  {/* <div className="row-input">
                    <div className="input-container">
                      <TextField
                        label="Mã Voucher:"
                        value={ma}
                        id="fullWidth"
                        onChange={(e) => {
                          setMa(e.target.value);
                        }}
                        style={{ width: "25em" }}
                      />
                    </div>
                    <div className="input-container">
                      <TextField
                        label="Tên Voucher:"
                        value={ten}
                        id="fullWidth"
                        onChange={(e) => {
                          setTen(e.target.value);
                        }}
                        style={{ width: "25em" }}
                      />
                    </div>
                  </div> */}
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
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
        editing: isEditing(record),
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
            <h6 style={{ marginTop: 6 }}>Mã Voucher: &nbsp;</h6>
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
            <h6 style={{ marginTop: 6 }}>Tên Voucher: &nbsp;</h6>
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
            <Select
              defaultValue="Tất Cả"
              style={{ width: "15em" }}
              onChange={handleChange}
              options={[
                { value: "0", label: "Tất Cả" },
                { value: "1", label: "Còn Hiệu Lực" },
                { value: "2", label: "Sắp Hết Hiệu Lực" },
                { value: "3", label: "Hết Hiệu Lực" },
              ]}
            />
          </div>
        </div>
        <div className="boloc-trangThai">
          <div className="search1">
            <h6 style={{ marginTop: 6 }}>Ngày Bắt Đầu: &nbsp;</h6>
            <span>
              {/* <Space direction="vertical" size={12}>
                <DatePicker showTime onChange={onChange} onOk={onOk} />
                <RangePicker
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                />
              </Space>{" "} */}
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
            <h6 style={{ marginTop: 6 }}>Giá Trị Voucher: &nbsp;</h6>
            <span>
              <Form
                style={{
                  width: "15em",
                  display: "inline-block",
                }}
              >
                <Input
                  placeholder="Search Giá Trị Voucher"
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
          &nbsp; Danh Sách Voucher
        </h6>
        <div className="btn-add">
          {/* Search */}
          <FontAwesomeIcon style={{ marginLeft: "5px" }} />
          <span className="bl-add">
            <Link to="/them-voucher">
              <Button className="btn-add-voucher">
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Thêm voucher{" "}
              </Button>
            </Link>
          </span>
        </div>
        <div className="form-tbl">
          <Form
            form={form}
            component={false}
            initialValues={editingThoiGian || {}}
          >
            <Table
              bordered
              dataSource={filteredDataSource}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
              rowKey="id"
              style={{ marginBottom: "20px" }}
            />
            <div className="phan-trang">
              <Pagination
                simple
                current={currentPage + 1}
                onChange={(value) => {
                  setCurrentPage(value - 1);
                }}
                total={totalPages * 10}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default HienThiVoucher;
