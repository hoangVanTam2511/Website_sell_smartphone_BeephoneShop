import { Form, Popconfirm, Table, Button, message } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import { Link, useNavigate } from "react-router-dom";
import NhapTuFile from "../nhanvien/NhapTuFile";
import Card from "../../../../components/Card";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  TextField,
  Tooltip,
  Select as SelectMui,
  MenuItem,
  Pagination,
  FormControl,
} from "@mui/material";
import { StatusAccountCus } from "../khachhang/enum";

//show
const HienThiNV = () => {
  const [form] = Form.useForm();
  let [listNV, setListNV] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [
    targetPage,
    //  setTargetPage
  ] = useState(1);
  const [searchText, setSearchText] = useState("");
  const handleSearch = async () => {
    try {
      if (!searchText) {
        // Nếu searchText bị xóa và bạn muốn tìm trang khác, đặt currentPage thành targetPage
        setCurrentPage(targetPage);
        loadDataListRole(targetPage); // Tải danh sách từ trang targetPage
        return;
      }
      const response = await axios.get(apiURLNV + "/search-all", {
        params: {
          tenKH: searchText,
          page: currentPage,
        },
      });
      setListNV(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(targetPage);
    } catch (error) {
      console.log("Error searching accounts:", error);
    }
  };
  useEffect(() => {
    // Gọi hàm tìm kiếm khi searchText thay đổi
    if (searchText) {
      handleSearch();
    }
    if (!searchText) {
      loadDataListRole(currentPage); // Gọi hàm để tải danh sách ban đầu khi searchText bị xóa
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, currentPage]);
  const [filterStatus, setFilterStatus] = useState(0);

  const handleFilter = (status) => {
    setFilterStatus(status);
    // setCurrentPage(1); // Set the current page to 1 when the filter changes
  };
  useEffect(() => {
    if (filterStatus === 0) {
      loadDataListRole(currentPage);
      setSearchText("");
    }
    fetchEmployeeList(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, currentPage]);
  const fetchEmployeeList = async (currentPage) => {
    try {
      const response = await axios.get(apiURLNV + "/filter", {
        params: {
          trangThai: filterStatus,
          page: currentPage,
        },
      });
      setListNV(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(targetPage);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  useEffect(() => {
    loadDataListRole(currentPage);
  }, [currentPage]);
  // load
  const loadDataListRole = (currentPage) => {
    axios
      .get(apiURLNV + "/hien-thi?page=" + currentPage)
      .then((response) => {
        setListNV(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch(() => {});
  };
  const handleReset = () => {
    loadDataListRole(currentPage);
    setSearchText("");
    // handleFilter(0);
    // setCurrentPage(1);
  };
  const navigate = useNavigate();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    const ngaySinh = moment(record.ngaySinh, "mm/dd/yyyy"); // Tạo đối tượng Moment hiện tại
    form.setFieldsValue({
      ma: record.ma,
      hoVaTen: record.hoVaTen,
      id: record.id,
      email: record.email,
      ngaySinh: ngaySinh.format("mm/dd/yyyy"),
      trangThai: record.trangThai,
      diaChi: record.diaChi,
      matKhau: record.matKhau,
      soDienThoai: record.soDienThoai,
      xaPhuong: record.xaPhuong,
      quanHuyen: record.quanHuyen,
      tinhThanhPho: record.tinhThanhPho,
      gioiTinh: record.gioiTinh,
      anhDaiDien: record.anhDaiDien,
    });
    navigate(`/update-nhan-vien/${record.id}`);
    setEditingKey(record.id);
  };
  const doChangeTrangThai = (id) => {
    axios
      .put(apiURLNV + `/${id}/doi-tt`)
      .then((response) => {
        loadDataListRole(currentPage);
        message.success("Đổi trạng thái thành công");
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi thay đổi trạng thái", error);
      });
  };
  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    loadDataListRole(page);
  };

  const [openSelect, setOpenSelect] = useState(false);
  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  //Ten column
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text, record) => <span>{listNV.indexOf(record) + 1}</span>,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      width: "8%",
      align: "center",
      // ...getColumnSearchProps("ma"),
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      width: "15%",
      editable: true,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: true,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "14%",
      editable: true,
      align: "center",
    },
    {
      title: "Địa chỉ",
      width: "10%",
      editable: true,
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        return (
          <span>
            {record.diaChi} {record.xaPhuong}
            {record.quanHuyen} {record.tinhThanhPho}
          </span>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "10%",
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.trangThai === StatusAccountCus.LAM_VIEC ? (
            <Button type="primary" style={{ borderRadius: "30px" }}>
              Làm việc
            </Button>
          ) : record.trangThai === StatusAccountCus.DA_NGHI ? (
            <Button type="primary" danger style={{ borderRadius: "30px" }}>
              Đã nghỉ
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
        const editable = isEditing(record);
        return editable ? (
          ""
        ) : (
          <>
            <Tooltip title="Sửa Nhân Viên" color={"black"} placement="bottom">
              <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={() => edit(record)}
                style={{
                  cursor: "pointer",
                  color: editingKey === record.id ? "red" : "green",
                }}
                size="lg"
              />
            </Tooltip>
            <Popconfirm
              title={`Đổi trạng thái tài khoản từ ${
                record.trangThai === StatusAccountCus.LAM_VIEC
                  ? `"Làm việc"`
                  : `"Đã nghỉ"`
              } sang ${
                record.trangThai === StatusAccountCus.LAM_VIEC
                  ? `"Đã nghỉ"`
                  : `"Làm việc"`
              } `}
              onConfirm={() => {
                doChangeTrangThai(record.id);
              }}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Tooltip
                title="Đổi Trạng Thái"
                color={"black"}
                placement="bottom"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  style={{
                    cursor: "pointer",
                    // eslint-disable-next-line eqeqeq
                    color:
                      record.trangThai === StatusAccountCus.LAM_VIEC
                        ? "#e5383b"
                        : "#2f80ed",
                  }}
                  transform={{ rotate: 90 }}
                  size="lg"
                />
              </Tooltip>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="form-tbl">
        <Form form={form} component={false} initialValues={{}}>
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
                    label="Tìm nhân viên"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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

                <div className="mt-2 d-flex">
                  <div
                    className="ms-4 me-5 d-flex"
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
                      <SelectMui
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
                        defaultValue={0}
                        onChange={(e) => handleFilter(e.target.value)}
                      >
                        <MenuItem className="" value={0}>
                          Tất cả
                        </MenuItem>
                        <MenuItem value={StatusAccountCus.LAM_VIEC}>
                          Làm việc
                        </MenuItem>
                        <MenuItem value={StatusAccountCus.DA_NGHI}>
                          Đã nghỉ
                        </MenuItem>
                      </SelectMui>
                    </FormControl>
                  </div>
                  <Link to="/them-nhan-vien" className="me-3">
                    <Button
                      // onClick={handleCreateNewOrderPending}
                      className="rounded-2 button-mui"
                      type="primary"
                      style={{
                        height: "40px",
                        width: "auto",
                        fontSize: "15px",
                      }}
                    >
                      {/* <PlusOutlined
                    className="ms-1"
                    style={{
                      position: "absolute",
                      bottom: "12.5px",
                      left: "12px",
                    }}
                  /> */}
                      <span style={{ marginBottom: "3px", fontWeight: "500" }}>
                        + Tạo tài khoản
                      </span>
                    </Button>
                  </Link>

                  <Button
                    // onClick={handleCreateNewOrderPending}
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <NhapTuFile />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Table
                  dataSource={listNV}
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
        </Form>
      </div>
    </>
  );
};

export default HienThiNV;
