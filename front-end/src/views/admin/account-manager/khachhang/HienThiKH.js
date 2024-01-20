import { Form, Popconfirm, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../../components/Card";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import "../../../../assets/scss/HienThiNV.scss";
import { Link, useNavigate } from "react-router-dom";
import NhapTuFile from "./NhapTuFile";
import {
  TextField,
  Tooltip,
  Select as SelectMui,
  MenuItem,
  Pagination,
  FormControl,
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import ExcelExportHelper from "../khachhang/ExcelExportHelper";
import { StatusCusNumber } from "./enum";
import * as React from "react";
import ModalAddKhachHang from "./ModalAddKhachHang";
import { Notistack } from "../../order-manager/enum";
import useCustomSnackbar from "../../../../utilities/notistack";
import { request, requestParam } from "../../../../store/helpers/axios_helper";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//show
const HienThiKH = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const [openSelect, setOpenSelect] = useState(false);

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  let [listKH, setListKH] = useState([]);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(0);
  const [loadAgain, setLoadAgain] = useState(0);

  const handleFilter = (status) => {
    setFilterStatus(status);
    // setCurrentPage(0); // Reset current page to 1 when applying filters
  };
  const [keySelect, setKeySelect] = useState(0);
  const handleReset = () => {
    loadDataListRole(currentPage);
    setSearchText("");
    setKeySelect(keySelect + 1);
    // setCurrentPage(targetPage);
  };

  useEffect(() => {
    if (filterStatus === 0) {
      handleReset();
    }
    fetchEmployeeList(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, currentPage]);
  const fetchEmployeeList = async (currentPage) => {
    try {
      // const response = await axios.get(apiURLKH + '/filter', {
      //   params: {
      //     trangThai: filterStatus,
      //     page: currentPage
      //   }
      // })
      // setListKH(response.data.content)
      // setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  const [targetPage] = useState(1);
  const handleSearch = async () => {
    try {
      if (!searchText) {
        // Nếu searchText bị xóa và bạn muốn tìm trang khác, đặt currentPage thành targetPage
        setCurrentPage(targetPage);
        loadDataListRole(targetPage); // Tải danh sách từ trang targetPage
        return;
      }
      requestParam("GET", apiURLKH + "/search-all", {
        tenKH: searchText,
        page: currentPage,
      }).then((response) => {
        setTotalPages(response.data.totalPages);
        // setCurrentPage(targetPage);
        setListKH(response.data.data);
      });
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

  useEffect(() => {
    if (filterStatus === 0) {
      handleReset();
    }
    fetchEmployeeList(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, currentPage]);

  useEffect(() => {
    loadDataListRole(currentPage);
  }, [currentPage, loadAgain]);
  // load
  const loadDataListRole = (currentPage) => {
    request("GET", apiURLKH + "/hien-thi?pageNo=" + currentPage)
      .then((response) => {
        setListKH(response.data.data);
        console.log(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch(() => { });
  };
  //edit
  const navigate = useNavigate();
  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    loadDataListRole(page);
  };

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    const ngaySinh = moment(record.ngaySinh, "YYYY-MM-DD"); // Tạo đối tượng Moment hiện tại
    form.setFieldsValue({
      ma: record.ma,
      hoVaTen: record.hoVaTen,
      id: record.id,
      email: record.email,
      ngaySinh: ngaySinh.format("YYYY-MM-DD"),
      trangThai: record.trangThai,
      matKhau: record.matKhau,
      soDienThoai: record.soDienThoai,
    });
    navigate(`/dashboard/update-customer/${record.id}`);
    setEditingKey(record.id);
  };

  const doChangeTrangThai = (id) => {
    request("PUT", apiURLKH + `/${id}/doi-tt`)
      .then((response) => {
        loadDataListRole(currentPage);
        handleOpenAlertVariant("Đổi trạng thái thành công", Notistack.SUCCESS);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Đã xảy ra lỗi khi thay đổi trạng thái", error);
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text, record) => <span>{listKH.indexOf(record) + 1}</span>,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      align: "center",
      render: (text, record) => <span>{record.soDienThoai || "..."}</span>,
    },
    {
      title: "Trạng thái",
      align: "center",
      dataIndex: "trangThai",
      // eslint-disable-next-line eqeqeq
      onFilter: (value, record) => record.trangThai == value,
      filterSearch: true,
      render: (text, record) => (
        <span>
          {record.trangThai === StatusCusNumber.HOAT_DONG ? (
            <div
              className="rounded-pill mx-auto badge-primary"
              style={{
                height: "35px",
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-white" style={{ fontSize: "14px" }}>
                Hoạt động
              </span>
            </div>
          ) : record.trangThai === StatusCusNumber.NGUNG_HOAT_DONG ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "135px",
                padding: "4px",
              }}
            >
              <span className="text-white" style={{ fontSize: "14px" }}>
                Ngừng hoạt động
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
      align: "center",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          ""
        ) : (
          <>
            <Tooltip title="Sửa Khách Hàng" color={"black"} placement="bottom">
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                onClick={() => edit(record)}
                style={{
                  cursor: "pointer",
                  color: "#2f80ed",
                  marginRight: "20px",
                }}
                disabled={editingKey !== ""}
              />
            </Tooltip>
            <Popconfirm
              title={`Đổi trạng thái tài khoản từ ${record.trangThai === 0 ? `"Hoạt Động"` : `"Ngừng Hoạt Động"`
                } sang ${record.trangThai === 0 ? `"Ngừng Hoạt Động"` : `"Hoạt Động"`
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
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  size="lg"
                  transform={{ rotate: 90 }}
                  style={{
                    cursor: "pointer",
                    // eslint-disable-next-line eqeqeq
                    color: record.trangThai == 0 ? "#e5383b" : "#09a129",
                    marginRight: "20px",
                  }}
                />
              </Tooltip>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const loadAfterImport = () => {
    setLoadAgain(2);
  };

  return (
    <>
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
                  label="Tìm khách hàng"
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
                      defaultValue={5}
                      key={keySelect}
                      onChange={(e) => handleFilter(e.target.value)}
                    >
                      <MenuItem className="" value={5}>
                        Tất cả
                      </MenuItem>
                      <MenuItem value={StatusCusNumber.HOAT_DONG}>
                        Hoạt động
                      </MenuItem>
                      <MenuItem value={StatusCusNumber.NGUNG_HOAT_DONG}>
                        Ngừng hoạt động
                      </MenuItem>
                    </SelectMui>
                  </FormControl>
                </div>
                <Link to="/dashboard/create-customer" className="">
                  <Button
                    // onClick={handleCreateNewOrderPending}
                    className="rounded-2 button-mui me-2"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
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
                      Tạo tài khoản
                    </span>
                  </Button>
                </Link>

                <Button
                  className="rounded-2 button-mui me-2"
                  type="success"
                  style={{
                    height: "40px",
                    width: "auto",
                    fontSize: "15px",
                  }}
                >
                  <ExcelExportHelper data={listKH} />
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table
                className="table-container"
                dataSource={listKH}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "unset",
          overflowX: "hidden", // Ngăn việc cuộn ngang
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "84vw",
            maxHeight: "unset", // Loại bỏ giới hạn chiều cao nếu cần
          },
        }}
      >
        <DialogContent className="">
          <ModalAddKhachHang close={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HienThiKH;
