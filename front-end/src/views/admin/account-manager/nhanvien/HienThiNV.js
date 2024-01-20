import { Form, Popconfirm, Table, Button, message } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLNV } from "../../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faHouse,
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
import { StatusAccountCus, StatusCusNumber } from "../khachhang/enum";
import { Notistack } from "../../order-manager/enum";
import useCustomSnackbar from "../../../../utilities/notistack";
import { request } from "../../../../store/helpers/axios_helper";
import ExcelExportHelper from "../nhanvien/ExcelExportHelper";
import { PlusOutlined } from "@ant-design/icons";
//show
const HienThiNV = () => {
  const [form] = Form.useForm();
  let [listNV, setListNV] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [targetPage, setTargetPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(0);
  const handleSearch = async (page = currentPage) => {
    try {
      if (!searchText) {
        setCurrentPage(targetPage);
        loadDataListRole(targetPage);
        return;
      }
      const response = request("GET", apiURLNV + "/search-all", {
        params: {
          tenKH: searchText,
          page: page,
          trangThai: filterStatus,
        },
      });
      if (searchText && response.data.data.length === 0 && page !== 1) {
        setCurrentPage(1); // Chuyển về trang 1
        return;
      }
      setListNV(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error searching accounts:", error);
    }
  };
  useEffect(() => {
    loadDataListRole(1); // Nếu không có searchText, tải danh sách ban đầu cho trang hiện tại
  }, [searchText]);
  // load
  const loadDataListRole = (currentPage) => {
    request(
      "GET",
      apiURLNV +
      "/search-all?page=" +
      currentPage +
      "&tenKH=" +
      searchText +
      "&trangThai=" +
      filterStatus
    )
      .then((response) => {
        setListNV(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch(() => { });
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(currentPage); // Set the current page to 1 when the filter changes
  };

  useEffect(() => {
    loadDataListRole(1);
  }, [filterStatus]);
  // const fetchEmployeeList = async (currentPage) => {
  //   try {
  //     const response = await axios.get(apiURLNV + "/filter", {
  //       params: {
  //         trangThai: filterStatus,
  //         page: currentPage,
  //       },
  //     });
  //     setListNV(response.data.content);
  //     setTotalPages(response.data.totalPages);
  //   } catch (error) {
  //     console.error("Error fetching employee data:", error);
  //   }
  // };
  useEffect(() => {
    loadDataListRole(currentPage);
  }, [currentPage]);
  const [keySelect, setKeySelect] = useState(0);
  const handleReset = () => {
    loadDataListRole(1);
    setSearchText("");
    setKeySelect(keySelect + 1);
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
    navigate(`/dashboard/update-employee/${record.id}`);
    setEditingKey(record.id);
  };
  const doChangeTrangThai = (id) => {
    request("PUT", apiURLNV + `/${id}/doi-tt`)
      .then((response) => {
        loadDataListRole(currentPage);
        handleOpenAlertVariant("Đổi trạng thái thành công", Notistack.SUCCESS);
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
      width: "10%",
      editable: true,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
      editable: true,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      width: "10%",
      // onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.trangThai === StatusAccountCus.LAM_VIEC ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-white" style={{ fontSize: "14px" }}>
                Làm việc
              </span>
            </div>
          ) : record.trangThai === StatusAccountCus.DA_NGHI ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-white" style={{ fontSize: "14px" }}>
                Đã nghỉ
              </span>
            </div>
          ) : (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-white" style={{ fontSize: "14px" }}>
                Không xác định
              </span>
            </div>
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
                  color: "#2f80ed",
                }}
                size="lg"
              />
            </Tooltip>
            <Popconfirm
              title={`Bạn có chắc chắn đổi trạng thái tài khoản? `}
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
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  style={{
                    cursor: "pointer",
                    // eslint-disable-next-line eqeqeq
                    color:
                      record.trangThai === StatusAccountCus.LAM_VIEC
                        ? "#e5383b"
                        : "#09a129",
                    paddingLeft: "20px",
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
            className="mt-1"
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
                    className="me-3 d-flex"
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
                        key={keySelect}
                      >
                        <MenuItem className="" value={0}>
                          Tất cả
                        </MenuItem>
                        <MenuItem value={StatusCusNumber.LAM_VIEC}>
                          Làm việc
                        </MenuItem>
                        <MenuItem value={StatusCusNumber.DA_NGHI}>
                          Đã nghỉ
                        </MenuItem>
                      </SelectMui>
                    </FormControl>
                  </div>
                  <Link to="/dashboard/create-employee" className="me-3">
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
                        Tạo tài khoản
                      </span>
                    </Button>
                  </Link>

                  <Button
                    // onClick={handleCreateNewOrderPending}
                    className="rounded-2 button-mui me-2"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <ExcelExportHelper data={listNV} />
                  </Button>

                  {/* <Button
                    // onClick={handleCreateNewOrderPending}
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <NhapTuFile />
                  </Button> */}
                </div>
              </Card.Header>
              <Card.Body>
                <Table
                  dataSource={listNV}
                  columns={columns}
                  pagination={false}
                  className="table-container"
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
