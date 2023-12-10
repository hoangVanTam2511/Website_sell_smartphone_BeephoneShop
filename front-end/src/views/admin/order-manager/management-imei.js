import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Card from "../../../components/Card";
import axios from "axios";
import Zoom from "@mui/material/Zoom";
import { Notistack, StatusImei } from "./enum";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoadingIndicator from "../../../utilities/loading";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConvertStatusProductsNumberToString } from "../../../utilities/convertEnum";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementImei = () => {
  const navigate = useNavigate();
  const [imei, setImei] = useState([]);
  const [imeiPages, setImeiPages] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTatCa, setSearchTatCa] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [trangThai, setTrangThai] = React.useState("");
  const [idImei, setIdImei] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelect, setOpenSelect] = useState(false);

  const getListImei = () => {
    axios
      .get(`http://localhost:8080/api/imeis`)
      .then((response) => {
        setImei(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getListImeiSearchAndPage = (page) => {
    // setIsLoading(false);
    axios
      .get(`http://localhost:8080/api/imeis/search`, {
        params: {
          keyword: searchTatCa,
          currentPage: page,
          trangThai: ConvertStatusProductsNumberToString(searchTrangThai),
        },
      })
      .then((response) => {
        // const data = response.data.data;
        // data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setImeiPages(response.data.data);
        setTotalPages(response.data.totalPages);
        // setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
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

  const handleSearchTatCaChange = (event) => {
    const searchTatCaInput = event.target.value;
    setSearchTatCa(searchTatCaInput);
    setCurrentPage(1);
  };

  useEffect(() => {
    getListImeiSearchAndPage(currentPage);
  }, [searchTatCa, searchTrangThai, currentPage, totalPages]);

  useEffect(() => {
    getListImei();
  }, []);

  const doiTrangThaiImei = (idImei) => {
    axios
      .put(`http://localhost:8080/api/imeis/${idImei}`)
      .then((response) => {
        getListImei();
        console.log(response);
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
    getListImeiSearchAndPage(page);
  };

  const ImeiTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={imeiPages}
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
          {imeiPages.indexOf(record) + 1}
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
        <span style={{ fontWeight: "400" }}>{record.soImei}</span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "trangThai",
      render: (type) =>
        type === StatusImei.SOLD ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "96px",
              padding: "4px",
            }}
          >
            <span className="text-white" style={{ fontSize: "14px" }}>
              Đã Bán
            </span>
          </div>
        ) : type === StatusImei.NOT_SOLD ? (
          <div
            className="rounded-pill badge-warning mx-auto"
            style={{ height: "35px", width: "140px", padding: "4px" }}
          >
            <span className="" style={{ fontSize: "14px" }}>
              Chưa Bán
            </span>
          </div>
        ) : type === StatusImei.IN_ACTIVE ? (
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
                size=""
                onClick={() => {
                  setIdImei(record.id);
                  handleClickOpen1(record.id);
                }}
              >
                <BorderColorOutlinedIcon color="primary" />
              </IconButton>
            </Tooltip>

            {/* Hàm đổi trạng thái */}

            <Tooltip
              TransitionComponent={Zoom}
              title={
                record.trangThai === StatusImei.NOT_SOLD
                  ? "Chưa Bán"
                  : record.trangThai === StatusImei.IN_ACTIVE
                  ? "Ngừng kích hoạt"
                  : ""
              }
            >
              <IconButton
                className="ms-2"
                style={{ marginTop: "6px" }}
                onClick={() => doiTrangThaiImei(record.id)}
              >
                <AssignmentOutlinedIcon
                  color={
                    record.trangThai === StatusImei.IN_ACTIVE
                      ? "error"
                      : record.trangThai === StatusImei.NOT_SOLD
                      ? "primary"
                      : "disabled"
                  }
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const [soImei, setSoImei] = useState("");
  const [idSanPhamChiTiet, setIdSanPhamChiTiet] = useState("");
  const [barcode, setBarcode] = useState("");
  const [validationMsg, setValidationMsg] = useState({});

  const validationAll = () => {
    const msg = {};

    if (!soImei.trim("")) {
      msg.soImei = "Số imei không được trống.";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    updateImei();
  };

  const detailImei = async (id) => {
    await axios
      .get(`http://localhost:8080/api/imeis/${id}`)
      .then((response) => {
        setIdImei(response.data.data.id);
        setIdSanPhamChiTiet(response.data.data.sanPhamChiTiet.id);
        setBarcode(response.data.data.barcode);
        setSoImei(response.data.data.soImei);
        setTrangThai(response.data.data.trangThai);
      })
      .catch((error) => {});
  };

  const updateImei = () => {
    let obj = {
      id: idImei,
      soImei: soImei,
      trangThai: trangThai,
      sanPhamChiTiet: { id: idSanPhamChiTiet },
      barcode: barcode,
    };
    axios
      .put(`http://localhost:8080/api/imeis`, obj)
      .then((response) => {
        console.log(response);
        getListImeiSearchAndPage();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleChangeSoImei = (event) => {
    setSoImei(event.target.value);
  };

  const handleClickOpen1 = (id) => {
    detailImei(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setValidationMsg({});
  };

  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundImei: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <Card className="">
          <Card.Header className="d-flex">
            <div className="header-title mt-2">
              <TextField
                label="Tìm Imei"
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
                    width: "200px",
                  },
                }}
                size="small"
                className=""
              />

              <Button
                // onClick={handleRefreshData}
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
              className="d-flex"
              style={{
                height: "40px",
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
                  <MenuItem value={StatusImei.NOT_SOLD}>Chưa Bán</MenuItem>
                  <MenuItem value={StatusImei.SOLD}>Đã Bán</MenuItem>
                  <MenuItem value={StatusImei.IN_ACTIVE}>
                    Ngưng Hoạt Động
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Card.Header>
          <Card.Body>
            <ImeiTable />
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
                  SỬA SỐ IMEI
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div style={{ display: "flex" }}>
                  <TextField
                    className="custom"
                    fullWidth
                    label="Số Imei"
                    value={soImei}
                    id="fullWidth"
                    onChange={handleChangeSoImei}
                    inputProps={{
                      maxLength: 14, // Giới hạn tối đa 10 ký tự
                    }}
                    error={validationMsg.soImei !== undefined}
                    helperText={validationMsg.soImei}
                  />
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
export default ManagementImei;
