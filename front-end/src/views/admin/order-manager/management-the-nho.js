import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Popconfirm, Table } from "antd";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
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
import LoadingIndicator from "../../../utilities/loading";
import CreateTheNho from "./create-the-nho";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import useCustomSnackbar from "../../../utilities/notistack";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { ConvertStatusProductsNumberToString } from "../../../utilities/convertEnum";
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

const ManagementTheNhos = () => {
  const navigate = useNavigate();
  const [listTheNho, setListTheNho] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );

  // const findOrdersByMultipleCriteriaWithPagination = (page) => {
  //   axios
  //     .get(`http://localhost:8080/api/orders`, {
  //       params: {
  //         currentPage: page,
  //         keyword: keyword,
  //         isPending: false,
  //       },
  //     })
  //     .then((response) => {
  //       setListTheNho(response.data.data);
  //       setTotalPages(response.data.totalPages);
  //       // setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // setIsLoading(false);
  //     });
  // };

  const getListTheNho = (page) => {
    request("GET", `/api/the-nhos`)
      .then((response) => {
        setListTheNho(response.data.data);
        getListProductSearchAndPage(currentPage);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

  const [productPages, setProductPages] = useState([]);
  const [pageShow, setPageShow] = useState(5);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");

  const getListProductSearchAndPage = (page) => {
    // setIsLoading(false);
    requestParam("GET", `/api/the-nhos/search`, {
      keyword: searchTatCa,
      currentPage: page,
      pageSize: pageShow,
      status: ConvertStatusProductsNumberToString(searchTrangThai),
    })
      .then((response) => {
        setProductPages(response.data.data);
        setTotalPages(response.data.totalPages);
        console.log(response.data.data);
        // setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

  const [openSelect, setOpenSelect] = useState(false);
  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
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
    getListProductSearchAndPage(currentPage);
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

  useEffect(() => {
    getListProductSearchAndPage(currentPage);
  }, [searchTatCa, pageShow, searchTrangThai, currentPage, totalPages]);

  const chuyenTrang = (event, page) => {
    setCurrentPage(page);
    getListProductSearchAndPage(page);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getListTheNho();
  }, []);

  const TheNhoTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={productPages}
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
          {productPages.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã Thẻ Nhớ",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Loại Thẻ Nhớ",
      align: "center",
      width: "15%",
      key: "loaiTheNho",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.loaiTheNho}</span>
      ),
    },

    {
      title: "Dung Lượng Tối Đa",
      align: "center",
      width: "15%",
      key: "dungLuongToiDa",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.dungLuongToiDa + " GB"}
        </span>
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
      render: (text, record) => (
        <>
          <div className="d-flex justify-content-center">
            <div className="button-container">
              <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
                <IconButton
                  onClick={() => {
                    handleClickOpen1(record.id);
                    setIdTheNho(record.id);
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
                    Bạn có chắc chắn đổi trạng thái thẻ nhớ?
                  </span>
                }
                onConfirm={() => {
                  doiTrangThaiProducts(record.id);
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
        </>
      ),
    },
  ];

  const [theNhoCode, setTheNhoCode] = useState("");
  const [status, setStatus] = useState("");
  const [loaiTheNho, setLoaiTheNho] = useState("");
  const [dungLuongToiDa, setDungLuongToiDa] = useState("");
  const [idTheNho, setIdTheNho] = useState("");
  const [createdAt, setCreatedAt] = React.useState("");

  const detailTheNhos = async (id) => {
    request("GET", `/api/the-nhos/${id}`)
      .then((response) => {
        setTheNhoCode(response.data.data.ma);
        setStatus(response.data.data.status);
        setDungLuongToiDa(response.data.data.dungLuongToiDa);
        setLoaiTheNho(response.data.data.loaiTheNho);
        setCreatedAt(new Date(response.data.data.createdAt));
      })
      .catch((error) => {});
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = (id) => {
    detailTheNhos(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setValidationMsg({});
  };

  const uniqueTheNho = listTheNho
    .map((option) => option.loaiTheNho)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const uniqueDungLuongToiDa = listTheNho
    .map((option) => option.dungLuongToiDa.toString())
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeLoaiTheNho = (event, value) => {
    setLoaiTheNho(value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDungLuongToiDa = (event, value) => {
    setDungLuongToiDa(value);
  };

  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    if (!dungLuongToiDa.trim("")) {
      msg.dungLuongToiDa = "Dung lượng thẻ nhớ không được trống.";
    }

    if (dungLuongToiDa < 1) {
      msg.dungLuongToiDa = "Dung lượng tối đa không được nhỏ hơn 1 GB.";
    }

    if (dungLuongToiDa > 300000) {
      msg.dungLuongToiDa = "Dung lượng tối đa không được lớn hơn 300.000 GB.";
    }

    if (!loaiTheNho.trim("")) {
      msg.loaiTheNho = "Loại thẻ nhớ không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateTheNho();
  };

  const updateTheNho = () => {
    let obj = {
      id: idTheNho,
      ma: theNhoCode,
      dungLuongToiDa: dungLuongToiDa,
      loaiTheNho: loaiTheNho,
      status: status,
    };
    request("PUT", `/api/the-nhos`, obj)
      .then((response) => {
        getListProductSearchAndPage(currentPage);
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const doiTrangThaiProducts = (idTheNho) => {
    request("PUT", `/api/the-nhos/${idTheNho}`)
      .then((response) => {
        getListProductSearchAndPage(currentPage);
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
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
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                placeholder="Tìm theo mã, loại thẻ nhớ, dung lượng tối đa"
                label="Tìm Thẻ Nhớ"
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
            <div
              className="d-flex mt-2"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                className="d-flex"
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
                    value={pageShow}
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
            <div className="mt-2">
              <Button
                onClick={handleClickOpen}
                className="rounded-2 button-mui"
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
                  Tạo Thẻ Nhớ
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <TheNhoTable />
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
      {/* {isLoading && <LoadingIndicator />} */}
      <CreateTheNho
        open={open}
        close={handleClose}
        getAll={getListProductSearchAndPage}
        theNhos={listTheNho}
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
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span
                  className=""
                  style={{ fontWeight: "550", fontSize: "29px" }}
                >
                  SỬA THẺ NHỚ
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={loaiTheNho}
                    onInputChange={handleChangeLoaiTheNho}
                    options={uniqueTheNho}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Loại Thẻ Nhớ"
                        error={validationMsg.loaiTheNho !== undefined}
                        helperText={validationMsg.loaiTheNho}
                      />
                    )}
                  />
                </div>
                <div className="mt-3">
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo-s1"
                    freeSolo
                    inputValue={String(dungLuongToiDa)}
                    onInputChange={handleChangeDungLuongToiDa}
                    options={uniqueDungLuongToiDa}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment
                                style={{ marginLeft: "5px" }}
                                position="start"
                              >
                                GB
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        label="Dung Lượng Tối Đa"
                        error={validationMsg.dungLuongToiDa !== undefined}
                        helperText={validationMsg.dungLuongToiDa}
                      />
                    )}
                  />
                </div>
                {/* <div className="mt-3" style={{}}>
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
                      // defaultValue={StatusCommonProductsNumber.ACTIVE}
                    >
                      <MenuItem value={StatusCommonProducts.ACTIVE}>
                        Hoạt Động
                      </MenuItem>
                      <MenuItem value={StatusCommonProducts.IN_ACTIVE}>
                        Ngừng Hoạt Động
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
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
          {/* {isLoading && <LoadingIndicator />} */}
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export default ManagementTheNhos;
