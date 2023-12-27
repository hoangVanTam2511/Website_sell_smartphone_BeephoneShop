import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Popconfirm, Table } from "antd";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import axios from "axios";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Zoom from "@mui/material/Zoom";
import {
  Notistack,
  StatusCommonProducts,
  StatusCommonProductsNumber,
} from "./enum";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoadingIndicator from "../../../utilities/loading";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConvertStatusProductsNumberToString } from "../../../utilities/convertEnum";
import CreateDanhMuc from "./create-danh-muc";
import { request, requestParam } from "../../../store/helpers/axios_helper";
import {
  faArrowsRotate,
  faHouse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementDanhMuc = () => {
  const navigate = useNavigate();
  const [danhMuc, setDanhMuc] = useState([]);
  const [danhMucPages, setDanhMucPages] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [danhMucCode, setDanhMucCode] = useState("");
  const [status, setStatus] = React.useState("");
  const [danhMucName, setDanhMucName] = useState("");
  const [idDanhMuc, setIdDanhMuc] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageShow, setPageShow] = useState(5);
  const [openSelect, setOpenSelect] = useState(false);
  const [createdAt, setCreatedAt] = React.useState("");

  const getListDanhMuc = () => {
    request("GET", `/api/danh-mucs`)
      .then((response) => {
        setDanhMuc(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getListDanhMucSearchAndPage = (page) => {
    // setIsLoading(false);
    requestParam("GET", `/api/danh-mucs/search`, {
      keyword: searchTatCa,
      currentPage: page,
      pageSize: pageShow,
      status: ConvertStatusProductsNumberToString(searchTrangThai),
    })
      .then((response) => {
        setDanhMucPages(response.data.data);
        setTotalPages(response.data.totalPages);
        // setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

  const detailDanhMuc = async (id) => {
    request("GET", `/api/danh-mucs/${id}`)
      .then((response) => {
        setDanhMucCode(response.data.data.ma);
        setStatus(response.data.data.status);
        setDanhMucName(response.data.data.tenDanhMuc);
        setCreatedAt(new Date(response.data.data.createdAt));
      })
      .catch((error) => {});
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleSearchTrangThaiChange = (event) => {
    const selectedValue = event.target.value;
    setSearchTrangThai(parseInt(selectedValue)); // Cập nhật giá trị khi Select thay đổi
    searchParams.set("trangThai", parseInt(selectedValue));
    setSearchParams(searchParams);
    if (selectedValue === 5) {
      setSearchParams("");
    }
    setCurrentPage(1);
  };

  const handleShowPageVoucher = (event) => {
    const selectedValue = event.target.value;
    setPageShow(parseInt(selectedValue));
    setCurrentPage(1);
  };

  const [openSelect3, setOpenSelect3] = useState(false);
  const handleCloseSelect3 = () => {
    setOpenSelect3(false);
  };

  const handleOpenSelect3 = () => {
    setOpenSelect3(true);
  };

  const handleSearchTatCaChange = (event) => {
    const searchTatCaInput = event.target.value;
    setSearchTatCa(searchTatCaInput);
    setCurrentPage(1);
  };

  const handleRefreshData = () => {
    setSearchTatCa("");
    setPageShow(5);
    setSearchTrangThai(5);
    if (searchTrangThai === 5) {
      setSearchParams("");
    }
    getListDanhMucSearchAndPage(currentPage);
  };

  const handleClickOpen1 = (id) => {
    detailDanhMuc(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setValidationMsg({});
  };

  useEffect(() => {
    getListDanhMucSearchAndPage(currentPage);
  }, [searchTatCa, searchTrangThai, currentPage, totalPages, pageShow]);

  useEffect(() => {
    getListDanhMuc();
  }, []);

  const handleClickOpen = () => {
    getListDanhMuc();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doiTrangThaiDanhMuc = (idDanhMuc) => {
    request("PUT", `/api/danh-mucs/${idDanhMuc}`)
      .then((response) => {
        getListDanhMucSearchAndPage(currentPage);
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };
  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getListDanhMucSearchAndPage(page);
  };

  const DanhMucTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={danhMucPages}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>
          {danhMucPages.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Tên Danh Mục",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.tenDanhMuc}</span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "status",
      render: (type) =>
        type === StatusCommonProducts.ACTIVE ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "96px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Hoạt động
            </span>
          </div>
        ) : type === StatusCommonProducts.IN_ACTIVE ? (
          <div
            className="rounded-pill badge-danger mx-auto"
            style={{ height: "35px", width: "140px", padding: "4px" }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Ngừng hoạt động
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <div className="button-container">
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                  handleClickOpen1(record.id);
                  setIdDanhMuc(record.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="sm"
                  style={{
                    color: "#2f80ed",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Tooltip>

            {/* Hàm đổi trạng thái */}
            <Popconfirm
              title={
                <span style={{ fontSize: "16px" }}>
                  Bạn có chắc chắn đổi trạng thái danh mục?
                </span>
              }
              onConfirm={() => {
                doiTrangThaiDanhMuc(record.id);
              }}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title={
                  record.status === StatusCommonProducts.ACTIVE
                    ? "Ngừng kích hoạt"
                    : record.status === StatusCommonProducts.IN_ACTIVE
                    ? "Kích hoạt"
                    : ""
                }
              >
                <IconButton className="ms-2" style={{ marginTop: "6px" }}>
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    size="sm"
                    transform={{ rotate: 90 }}
                    style={{
                      cursor: "pointer",
                      color:
                        record.status === StatusCommonProducts.IN_ACTIVE
                          ? "#e5383b"
                          : record.status === StatusCommonProducts.ACTIVE
                          ? "#09a129"
                          : "disabled",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    const isDuplicate = danhMuc.some(
      (product) =>
        product.tenDanhMuc === danhMucName && product.id !== idDanhMuc
    );

    if (isDuplicate) {
      handleOpenAlertVariant("Danh mục đã tồn tại", Notistack.ERROR);
      msg = "Đã tồn tại";
    }

    if (!danhMucName.trim("")) {
      msg.danhMucName = "Tên danh mục không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateDanhMuc();
  };

  const updateDanhMuc = () => {
    let obj = {
      id: idDanhMuc,
      ma: danhMucCode,
      tenDanhMuc: danhMucName,
      status: status,
      createdAt: createdAt,
    };
    request("PUT", `/api/danh-mucs`, obj)
      .then((response) => {
        getListDanhMuc();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const uniqueTenDanhMuc = danhMuc
    .map((option) => option.tenDanhMuc)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeDanhMuc = (event, value) => {
    setDanhMucName(value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundDanhMuc: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                placeholder="Tìm theo mã, tên danh mục"
                label="Tìm danh mục"
                onChange={handleSearchTatCaChange}
                value={searchTatCa}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    textTransform: "capitalize",
                  },
                }}
                inputProps={{
                  style: {
                    height: "23px",
                    width: "300px",
                  },
                }}
                size="small"
                className=""
              />
              <Button
                onClick={() => handleRefreshData()}
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

            <div className="d-flex mt-2">
              <div
                className="d-flex me-5"
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
                    <MenuItem className="" value={5}>
                      Tất cả
                    </MenuItem>
                    <MenuItem value={StatusCommonProductsNumber.ACTIVE}>
                      Hoạt động
                    </MenuItem>
                    <MenuItem value={StatusCommonProductsNumber.IN_ACTIVE}>
                      Ngừng hoạt động
                    </MenuItem>
                  </Select>
                </FormControl>

                <div
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
                      Hiển Thị:{" "}
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
                      value={pageShow}
                      onChange={handleShowPageVoucher}
                    >
                      <MenuItem className="" value={5}>
                        Mặc định
                      </MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <Button
                onClick={handleClickOpen}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "145px", fontSize: "15px" }}
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
                  Tạo Danh Mục
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <DanhMucTable />
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
      <CreateDanhMuc
        open={open}
        close={handleClose}
        getAll={getListDanhMuc}
        danhMucs={danhMuc}
      />
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "170px",
        }}
      >
        <DialogContent>
          <div className="mt-4" style={{ width: "700px" }}>
            <div className="container">
              <div className="text-center">
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  SỬA DANH MỤC
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div style={{ display: "flex" }}>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={danhMucName}
                    onInputChange={handleChangeDanhMuc}
                    options={uniqueTenDanhMuc}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tên Danh Mục"
                        error={validationMsg.danhMucName !== undefined}
                        helperText={validationMsg.danhMucName}
                      />
                    )}
                  />
                </div>

                <div className="mt-3">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Trạng Thái
                    </InputLabel>
                    <Select
                      className="custom"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Trạng Thái"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={StatusCommonProducts.ACTIVE}>
                        Hoạt Động
                      </MenuItem>
                      <MenuItem value={StatusCommonProducts.IN_ACTIVE}>
                        Ngừng Hoạt Động
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => handleSubmit()}
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <span
                      className=""
                      style={{ marginBottom: "2px", fontWeight: "500" }}
                    >
                      Xác Nhận
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
      {/* {!isLoading && <LoadingIndicator />} */}
    </>
  );
};
export default ManagementDanhMuc;
