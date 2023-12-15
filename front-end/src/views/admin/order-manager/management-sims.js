import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import {
  Autocomplete,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
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
  SimMultiple,
  SimStatus,
  StatusCommonProducts,
  StatusCommonProductsNumber,
} from "./enum";
import LoadingIndicator from "../../../utilities/loading";
import CreateSimCard from "./create-simcard";
import { apiURLSimCard } from "../../../service/api";
import "./style.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConvertStatusProductsNumberToString } from "../../../utilities/convertEnum";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementSims = () => {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );

  const handleRedirectCreateSimCard = () => {
    navigate(`/dashboard/sim/create`);
  };

  const [sims, setSims] = useState([]);

  const loadDataList = () => {
    axios
      .get(apiURLSimCard + "/all")
      .then((response) => {
        setSims(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [productPages, setProductPages] = useState([]);
  const [pageShow, setPageShow] = useState(5);
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");

  const getListProductSearchAndPage = (page) => {
    // setIsLoading(false);
    axios
      .get(`http://localhost:8080/api/sim-cards/search`, {
        params: {
          keyword: searchTatCa,
          currentPage: page,
          pageSize: pageShow,
          status: ConvertStatusProductsNumberToString(searchTrangThai),
        },
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

  useEffect(() => {
    loadDataList(currentPage);
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const OrderTable = () => {
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
      title: "Mã Thẻ SIM",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Loại Thẻ SIM",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>
          {record.simMultiple === SimMultiple.SINGLE_SIM
            ? " 1 "
            : record.simMultiple === SimMultiple.DUAL_SIM
            ? " 2 "
            : record.simMultiple === SimMultiple.TRIPLE_SIM
            ? " 3 "
            : " 4 "}{" "}
          {record.loaiTheSim}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "simStatus",
      render: (text, record) => (
        <span>
          {record.status === SimStatus.ACTIVE ? (
            <div
              className="rounded-pill mx-auto badge-primary"
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
          ) : record.status === SimStatus.IN_ACTIVE ? (
            <div
              className="rounded-pill mx-auto badge-danger"
              style={{
                height: "35px",
                width: "140px",
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
                width: "130px",
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
      width: "15%",
      render: (text, record) => (
        <>
          <div className="d-flex justify-content-center">
            <div className="button-container">
              <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
                <IconButton
                  onClick={() => {
                    handleClickOpen1(record.id);
                    setIdTheSim(record.id);
                    setSimType(record.simMultiple);
                  }}
                >
                  <BorderColorOutlinedIcon color="primary" />
                </IconButton>
              </Tooltip>

              {/* Hàm đổi trạng thái */}

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
                <IconButton
                  className="ms-2"
                  style={{ marginTop: "6px" }}
                  onClick={() => doiTrangThaiProducts(record.id)}
                >
                  <AssignmentOutlinedIcon
                    color={
                      record.status === StatusCommonProducts.IN_ACTIVE
                        ? "error"
                        : record.status === StatusCommonProducts.ACTIVE
                        ? "success"
                        : "disabled"
                    }
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      ),
    },
  ];

  const [theSimCode, setTheSimCode] = useState("");
  const [status, setStatus] = useState("");
  const [loaiTheSim, setLoaiTheSim] = useState("");
  const [idTheSim, setIdTheSim] = useState("");
  const [simType, setSimType] = useState("");

  const detailTheSims = async (id) => {
    await axios
      .get(`http://localhost:8080/api/sim-cards/${id}`)
      .then((response) => {
        const data = response.data.data;
        setTheSimCode(data.ma);
        setStatus(data.status);
        setLoaiTheSim(data.loaiTheSim);
        console.log(data);
        if (data.simMultiple === SimMultiple.SINGLE_SIM) {
          setCheckedSingleSim(true);
          setCheckedDualSim(false);
        } else {
          setCheckedDualSim(true);
          setCheckedSingleSim(false);
        }
      })
      .catch((error) => {});
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = (id) => {
    detailTheSims(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setValidationMsg({});
  };

  const uniqueTheSim = productPages
    .map((option) => option.loaiTheSim)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeLoaiTheSim = (event, value) => {
    setLoaiTheSim(value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const [checkedDualSim, setCheckedDualSim] = React.useState(false);
  const [checkedSingleSim, setCheckedSingleSim] = React.useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    if (!loaiTheSim.trim("")) {
      msg.loaiTheSim = "Loại thẻ sim không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateTheSim();
  };

  const updateTheSim = () => {
    let obj = {
      id: idTheSim,
      ma: theSimCode,
      simMultiple: simType,
      loaiTheSim: loaiTheSim,
      status: status,
    };
    axios
      .put(`http://localhost:8080/api/sim-cards`, obj)
      .then((response) => {
        getListProductSearchAndPage();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const doiTrangThaiProducts = (idTheSim) => {
    axios
      .put(`http://localhost:8080/api/sim-cards/${idTheSim}`)
      .then((response) => {
        getListProductSearchAndPage();
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };
  const handleChangeCheckedSingleSim = (event) => {
    setCheckedSingleSim(event.target.checked);
  };
  const handleChangeCheckedDualSim = (event) => {
    setCheckedDualSim(event.target.checked);
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
                placeholder="Tìm theo mã, loại thẻ sim"
                label="Tìm Thẻ SIM"
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
                    value={5}
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
                  Tạo Thẻ SIM
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <OrderTable />
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
      <CreateSimCard
        open={open}
        close={handleClose}
        getAll={loadDataList}
        sims={sims}
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
                  SỬA THẺ SIM
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={loaiTheSim}
                    onInputChange={handleChangeLoaiTheSim}
                    options={uniqueTheSim}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Loại Thẻ Sim"
                        error={validationMsg.loaiTheSim !== undefined}
                        helperText={validationMsg.loaiTheSim}
                      />
                    )}
                  />
                </div>

                <div className="mt-3" style={{}}>
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
                <div className="mt-3 d-flex">
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChangeCheckedSingleSim}
                          checked={checkedSingleSim}
                          disabled
                        />
                      }
                      label="1 SIM"
                    />
                  </div>
                  <div className="ms-3">
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChangeCheckedDualSim}
                          checked={checkedDualSim}
                          disabled
                        />
                      }
                      label="2 SIM"
                    />
                  </div>
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
          {/* {isLoading && <LoadingIndicator />} */}
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export default ManagementSims;
