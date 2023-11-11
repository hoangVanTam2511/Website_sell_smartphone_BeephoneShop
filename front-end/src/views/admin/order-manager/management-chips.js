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
import CreateChip from "./create-chip";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import useCustomSnackbar from "../../../utilities/notistack";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementChips = () => {
  const navigate = useNavigate();
  const [listChip, setListChip] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [idChip, setIdChip] = React.useState("");
  const [maChip, setMaChip] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [tenChip, setTenChip] = React.useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );

  const findOrdersByMultipleCriteriaWithPagination = (page) => {
    axios
      .get(`http://localhost:8080/api/orders`, {
        params: {
          currentPage: page,
          keyword: keyword,
          isPending: false,
        },
      })
      .then((response) => {
        setListChip(response.data.data);
        setTotalPages(response.data.totalPages);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const getListChip = (page) => {
    axios
      .get(`http://localhost:8080/api/chips`)
      .then((response) => {
        setListChip(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const detailChip = async (idChip) => {
    await axios
      .get(`http://localhost:8080/api/chips/${idChip}`)
      .then((response) => {
        setMaChip(response.data.data.ma);
        setStatus(response.data.data.status);
        setTenChip(response.data.data.tenChip);
      })
      .catch((error) => {});
  };

  const doiTrangThaiChip = (idChip) => {
    axios
      .put(`http://localhost:8080/api/chips/${idChip}`)
      .then((response) => {
        getListChip();
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleClickOpen1 = (id) => {
    detailChip(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    getListChip();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateChip = () => {
    let obj = {
      id: idChip,
      ma: maChip,
      tenChip: tenChip,
      status: status,
    };
    axios
      .put(`http://localhost:8080/api/chips`, obj)
      .then((response) => {
        getListChip();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
        setOpen1(false);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const uniqueChip = listChip
    .map((option) => option.tenChip)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeChip = (event, value) => {
    setTenChip(value);
  };

  const OrderTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={listChip}
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
          {listChip.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "Mã Chip",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.ma}</span>
      ),
    },
    {
      title: "Tên Chip",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.tenChip}</span>
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
        <>
          <div className="d-flex justify-content-center">
            <div className="button-container">
              <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
                <IconButton
                  onClick={() => {
                    handleClickOpen1(record.id);
                    setIdChip(record.id);
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
                  onClick={() => doiTrangThaiChip(record.id)}
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
                label="Tìm Chip"
                // onChange={handleGetValueFromInputTextField}
                // value={keyword}
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
                  Tạo Chip
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <OrderTable />
          </Card.Body>
          <div className="mx-auto">
            <Pagination
              color="primary" /* page={parseInt(currentPage)} key={refreshPage} count={totalPages} */
              // onChange={handlePageChange}
            />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
      <CreateChip
        open={open}
        close={handleClose}
        getAll={getListChip}
        chips={listChip}
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
                  SỬA CHIP
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={tenChip}
                    onInputChange={handleChangeChip}
                    options={uniqueChip}
                    renderInput={(params) => (
                      <TextField {...params} label="Tên Chip" />
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
                </div>
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => updateChip()}
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
          {isLoading && <LoadingIndicator />}
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export default ManagementChips;
