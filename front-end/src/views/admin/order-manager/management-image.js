import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Empty, Popconfirm, Table, Upload } from "antd";
import {
  Autocomplete,
  Box,
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
import { format } from "date-fns";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

import { parseInt } from "lodash";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Zoom from "@mui/material/Zoom";
import * as dayjs from "dayjs";
import {
  Notistack,
  OrderStatusString,
  OrderTypeString,
  StatusCommonProducts,
} from "./enum";
import LoadingIndicator from "../../../utilities/loading";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagementImage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [colorCode, setImageCode] = useState("");
  const [status, setStatus] = React.useState("");
  const [colorName, setImageName] = useState("");
  const [idImage, setIdImage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const [isExisted, setIsExisted] = useState(true);
  const [selectedImageChange, setSelectedImageChange] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isSelectedImages, setIsSelectedImages] = useState(false);
  const [id, setId] = useState("");

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("currentPage") || 1
  );

  const handleImageUpload = (info) => {
    if (info.file.status === "uploading") {
      setSelectedImageChange(info.file.originFileObj);
      setIsSelectedImages(true);
      setIsExisted(false);
    }
  };

  const handleSaveImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedImageChange); // `file` là đối tượng File hoặc Blob
    formData.append("id", id);
    await axios
      .post(`http://localhost:8080/api/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSelectedImage(res.data.data);
        console.log(res);
        alert("Cập nhật thành công ảnh standee");
      })
      .catch((err) => {
        alert("Cập nhật thất bại");
        setSelectedImage("");
      });
  };

  // const getListImage = async () => {
  //   await axios
  //     .get(`http://localhost:8080/api/image`)
  //     .then((response) => {
  //       setImage(response.data);
  //     })
  //     .catch((error) => {
  //       // console.error(error);
  //       setIsLoading(false);
  //     });
  // };

  const detailImage = async (id) => {
    await axios
      .get(`http://localhost:8080/api/image/${id}`)
      .then((response) => {
        setImageCode(response.data.data.ma);
        setStatus(response.data.data.status);
        setImageName(response.data.data.ten);
      })
      .catch((error) => {});
  };

  const handleClickOpen1 = (id) => {
    detailImage(id);
    setOpen1(true);
    console.log(colorName);
  };

  useEffect(() => {
    // getListImage();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const doiTrangThaiImage = (idImage) => {
    axios
      .put(`http://localhost:8080/api/image/doi-trang-thai/${idImage}`)
      .then((response) => {
        // getListImage();
        handleOpenAlertVariant(
          "Đổi trạng thái thành công!!!",
          Notistack.SUCCESS
        );
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const handleOkConfirm = () => {
    doiTrangThaiImage(idImage);
  };
  const handleCancelConfirm = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const ImageTable = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={image}
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
        <span style={{ fontWeight: "400" }}>{image.indexOf(record) + 1}</span>
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
      title: "Đường dẫn",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.path}</span>
      ),
    },
    {
      title: "Trạng Thái",
      width: "15%",
      align: "center",
      dataIndex: "status",
      render: (type) =>
        type === 1 ? (
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
        ) : type === 2 ? (
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
                  handleClickOpen1(record.id);
                  setIdImage(record.id);
                }}
              >
                {/* <BorderImageOutlinedIcon color="primary" /> */}
              </IconButton>
            </Tooltip>

            {/* Hàm đổi trạng thái */}
            <Popconfirm
              description="Bạn có chắc chắn muốn đổi trạng thái không?"
              onConfirm={handleOkConfirm}
              onCancel={handleCancelConfirm}
              placement="topLeft"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title={
                  record.status === 1
                    ? "Ngừng kích hoạt"
                    : record.status === 2
                    ? "Kích hoạt"
                    : ""
                }
              >
                <IconButton
                  className="ms-2"
                  style={{ marginTop: "6px" }}
                  onClick={() => setIdImage(record.id)}
                >
                  <AssignmentOutlinedIcon
                    color={
                      record.status === 2
                        ? "error"
                        : record.status === 1
                        ? "success"
                        : "disabled"
                    }
                  />
                </IconButton>
              </Tooltip>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const handleOpenDialogConfirmAdd = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmAdd = () => {
    setOpenConfirm(false);
  };

  const Header = () => {
    return (
      <>
        <span style={{ fontWeight: "bold" }}>Xác nhận sửa màu sắc</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>
          Bạn có chắc chắc muốn sửa thành màu{" "}
          <span style={{ color: "red" }}>"{colorName}"</span> không ?
        </span>
      </>
    );
  };

  const updateImage = () => {
    let obj = {
      ma: colorCode,
      ten: colorName,
      status: status,
    };
    axios
      .put(`http://localhost:8080/api/image/${idImage}`, obj)
      .then((response) => {
        // getListImage();
        handleOpenAlertVariant("Sửa thành công!!!", Notistack.SUCCESS);
      })
      .catch((error) => {
        handleOpenAlertVariant(error.response.data.message, Notistack.ERROR);
      });
  };

  const uniqueTen = image
    .map((option) => option.path)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const handleChangeImage = (event, value) => {
    setImageName(value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundImage: "#ffffff",
          boxShadow: "0 0.1rem 0.3rem #00000010",
        }}
      >
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                label="Tìm Ảnh"
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
                  Tạo Ảnh
                </span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <ImageTable />
          </Card.Body>
          <div className="mx-auto">
            <Pagination
              color="primary" /* page={parseInt(currentPage)} key={refreshPage} count={totalPages} */
              // onChange={handlePageChange}
            />
          </div>

          <div>
            <Upload
              showUploadList={false}
              onChange={handleImageUpload}
              accept=".jpg,.jpeg,.png"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            <Button onClick={() => handleSaveImage()}>Lưu ảnh</Button>
          </div>
          <div>
            {isExisted === true ? (
              <div>
                <h4>Ảnh đã lưu:</h4>
                {image != null ? (
                  <img
                    src={image}
                    style={{ maxWidth: "300px", borderRadius: "8px" }}
                    alt="Ảnh đã lưu"
                  />
                ) : (
                  <Empty description="Không có ảnh background" />
                )}
              </div>
            ) : (
              isExisted === false && (
                <div>
                  <h4>Ảnh đã chọn:</h4>
                  <img
                    src={URL.createObjectURL(selectedImageChange)}
                    alt="Selected"
                    style={{ maxWidth: "300px", borderRadius: "8px" }}
                  />
                </div>
              )
            )}
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
      {isLoading && <LoadingIndicator />}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        maxHeight="md"
        sx={{
          marginBottom: "170px",
        }}
      >
        {/* <DialogContent className="">
          <Create close={handleClose} getAll={getListImage} image={image} />
        </DialogContent> */}
        <div className="mt-3"></div>
      </Dialog>

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
                  SỬA ẢNH
                </span>
              </div>
              <div className="mx-auto mt-3 pt-2">
                <div style={{ display: "flex" }}>
                  <Autocomplete
                    fullWidth
                    className="custom"
                    id="free-solo-demo"
                    freeSolo
                    inputValue={colorName}
                    onInputChange={handleChangeImage}
                    options={uniqueTen}
                    renderInput={(params) => (
                      <TextField {...params} label="Tên Màu Sắc" />
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
                      <MenuItem value={1}>Hoạt Động</MenuItem>
                      <MenuItem value={2}>Ngừng Hoạt Động</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-4 pt-1 d-flex justify-content-end">
                  <Button
                    onClick={() => handleOpenDialogConfirmAdd()}
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
          <ConfirmDialog
            open={openConfirm}
            onClose={handleCloseDialogConfirmAdd}
            add={updateImage}
            title={<Title />}
            header={<Header />}
          />
          {isLoading && <LoadingIndicator />}
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
    </>
  );
};
export default ManagementImage;
