import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, ListItemText, MenuItem, Pagination, Select as SelectMui, TextField, Tooltip, Checkbox as CheckBoxMui } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Zoom from '@mui/material/Zoom';
import * as dayjs from "dayjs";
import { OrderStatusString, OrderTypeString } from "./enum";
import LoadingIndicator from '../../../utilities/loading';
import { FaPencilAlt } from "react-icons/fa";
import ManagementProductItems from "./management-product-items";
import { FaDownload, FaEye, FaUpload } from "react-icons/fa6";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { request, requestParam } from '../../../store/helpers/axios_helper'

const ManagementProducts = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [refreshPage, setRefreshPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [openCategory, setOpenCategory] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openOpera, setOpenOpera] = useState(false);
  const [openCpu, setOpenCpu] = useState(false);
  const [openScreen, setOpenScreen] = useState(false);
  const [openPin, setOpenPin] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [openPage, setOpenPage] = useState(false);

  const handleOpenSort = () => {
    setOpenSort(true);
  };

  const handleCloseOpenSort = () => {
    setOpenSort(false);
  };

  const handleOpenPage = () => {
    setOpenPage(true);
  };

  const handleCloseOpenPage = () => {
    setOpenPage(false);
  };


  const handleRedirectCreateProduct = () => {
    navigate(`/dashboard/create-product`);
  }

  const handleCloseOpenCategory = () => {
    setOpenCategory(false);
  };

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleCloseBrand = () => {
    setOpenBrand(false);
  };

  const handleOpenBrand = () => {
    setOpenBrand(true);
  };
  const handleCloseOpera = () => {
    setOpenOpera(false);
  };

  const handleOpenOpera = () => {
    setOpenOpera(true);
  };
  const handleCloseCpu = () => {
    setOpenCpu(false);
  };

  const handleOpenCpu = () => {
    setOpenCpu(true);
  };

  const handleCloseScreen = () => {
    setOpenScreen(false);
  };

  const handleOpenScreen = () => {
    setOpenScreen(true);
  };
  const handleClosePin = () => {
    setOpenPin(false);
  };

  const handleOpenPin = () => {
    setOpenPin(true);
  };

  const [selectedValueCategorys, setSelectedValueCategorys] = React.useState([
    0,
  ]);
  const [selectedValueBrands, setSelectedValueBrands] = React.useState([0]);
  const [selectedValueOperas, setSelectedValueOperas] = React.useState([
    "None",
  ]);
  const [selectedValueCpus, setSelectedValueCpus] = React.useState([0]);
  const [selectedValueScreens, setSelectedValueScreens] = React.useState([0]);
  const [selectedValuePins, setSelectedValuePins] = React.useState([0]);

  const [categorys, setCategorys] = useState([]);
  const getListDanhMuc = () => {
    axios
      .get(`http://localhost:8080/api/danh-mucs`)
      .then((response) => {
        setCategorys(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [listHang, setListHang] = useState([]);
  const getListHang = () => {
    axios
      .get(`http://localhost:8080/api/brands`)
      .then((response) => {
        setListHang(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listChip, setListChip] = useState([]);
  const getListChip = () => {
    axios
      .get(`http://localhost:8080/api/chips`)
      .then((response) => {
        setListChip(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listPin, setListPin] = useState([]);
  const getListPin = () => {
    axios
      .get(`http://localhost:8080/api/pins`)
      .then((response) => {
        setListPin(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [listManHinh, setListManHinh] = useState([]);
  const getListManHinh = () => {
    axios
      .get(`http://localhost:8080/api/display`)
      .then((response) => {
        setListManHinh(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [sort, setSort] = useState("");
  const [size, setSize] = useState(10);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const operas = ["ANDROID", "IOS"];

  const findProductsByMultipleCriteriaWithPagination = (page) => {
    const params = new URLSearchParams();
    params.append("currentPage", page);
    params.append("pageSize", size);
    params.append("keyword", keyword);
    params.append(
      "danhMucs",
      selectedValueCategorys.length === 1 && selectedValueCategorys[0] === 0
        ? []
        : selectedValueCategorys && selectedValueCategorys.filter((item) => item !== 0)
    );
    params.append(
      "hangs",
      selectedValueBrands.length === 1 && selectedValueBrands[0] === 0
        ? []
        : selectedValueBrands && selectedValueBrands.filter((item) => item !== 0)
    );
    params.append(
      "heDieuHanhs",
      selectedValueOperas.length === 1 && selectedValueOperas[0] === "None"
        ? operas
        : selectedValueOperas && selectedValueOperas.filter((item) => item !== "None")
    );
    params.append(
      "chips",
      selectedValueCpus.length === 1 && selectedValueCpus[0] === 0
        ? []
        : selectedValueCpus && selectedValueCpus.filter((item) => item !== 0)
    );
    params.append(
      "manHinhs",
      selectedValueScreens.length === 1 && selectedValueScreens[0] === 0
        ? []
        : selectedValueScreens && selectedValueScreens.filter((item) => item !== 0)
    );
    params.append(
      "pins",
      selectedValuePins.length === 1 && selectedValuePins[0] === 0
        ? []
        : selectedValuePins && selectedValuePins.filter((item) => item !== 0)
    );
    axios
      .get(
        `http://localhost:8080/api/products/products/page?${params}`,
        {}
      )
      .then((response) => {
        const data = response.data.data;
        setProducts(data);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    findProductsByMultipleCriteriaWithPagination(currentPage);
  }, [
    currentPage,
    keyword,
    size,
    selectedValuePins,
    selectedValueScreens,
    selectedValueCpus,
    selectedValueBrands,
    selectedValueOperas,
    selectedValueCategorys,
  ]);

  useEffect(() => {
    getListDanhMuc();
    getListHang();
    getListManHinh();
    getListChip();
    getListPin();
  }, []);

  const OrderTable = () => {
    return (
      <>
        <Table className="table-container"
          columns={columns}
          rowKey="ma"
          dataSource={products}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };

  // const totalAmountInStock = (item) => {
  //   let total = 0;
  //   item.map((product) => {
  //     total += product.soLuongTonKho;
  //   })
  //   return total;
  // }


  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>{products.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Ảnh",
      align: "center",
      width: "15%",
      render: (text, item) => (
        <>
          <div style={{ position: "relative" }}>
            {
              item.urlImage !== "" ?
                <img
                  src={
                    item.urlImage
                  }
                  class=""
                  alt=""
                  style={{ width: "125px", height: "125px" }}
                />
                :
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90" style={{ width: "125px", height: "125px", color: "rgb(232, 234, 235)", margin: "0px auto" }}><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2ZM5 19V5h14l.002 14H5Z" fill="currentColor"></path><path d="m10 14-1-1-3 4h12l-5-7-3 4ZM8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor"></path></svg>
            }
          </div>
        </>
      ),
    },
    {
      title: "Mã Sản Phẩm",
      align: "center",
      key: "ma",
      width: "15%",
      dataIndex: "ma",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{"SP00000" + products.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      key: "tenSanPham",
      width: "15%",
      dataIndex: "tenSanPham",
      render: (text, record) => (
        <span className="" style={{ fontWeight: "400" }}>{record.tenSanPham}</span>
      ),
    },
    {
      title: "Hãng",
      align: "center",
      width: "15%",
      dataIndex: "hang",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.hang.tenHang}</span>
      ),
    },
    {
      title: "Hệ Điều Hành",
      align: "center",
      width: "15%",
      render: (text, record) => (
        record.operatingType
      ),
    },
    {
      title: "Số Lượng Tồn",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <div>
          <span style={{ fontWeight: "400", whiteSpace: "pre-line" }}>{record.quantityInstock}
          </span>
          <span style={{ color: "gray", fontSize: "14px", display: "block" }}>({record.quantityVersion} phiên bản)</span>
        </div>
      ),
    },
    {
      title: "Trạng Thái",
      align: "center",
      width: "15%",
      dataIndex: "trangThai",
      render: (type) =>
        type == 0 ? (
          <div
            className="rounded-pill mx-auto badge-success"
            style={{
              height: "35px",
              width: "96px",
              padding: "4px",
            }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px" }}
            >
              Kinh doanh
            </span>
          </div>
        ) : 1 ? (
          <div
            className="rounded-pill badge-danger mx-auto"
            style={{ height: "35px", width: "150px", padding: "4px" }}
          >
            <span
              className="text-white"
              style={{ fontSize: "14px" }}
            >
              Ngừng kinh doanh
            </span>
          </div>
        ) : (
          ""
        ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "20%",
      dataIndex: "ma",
      render: (text, record) => (
        <>
          <div className="button-container">
            <Tooltip title="Cập nhật" TransitionComponent={Zoom}>
              <IconButton size="" className="me-2" onClick={() => {
                navigate(`/dashboard/update-product/${record.id}`);
              }}
              >
                <FaPencilAlt color="#2f80ed" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem chi tiết các phiên bản" TransitionComponent={Zoom}>
              <IconButton size="" className=""
                onClick={() => {
                  navigate(`/dashboard/products/${record.id}`);
                }}
              >
                <FaEye color="#2f80ed" />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ),
    },
  ];



  return (
    <>
      <div className="mt-4" style={{ backgroundColor: "#ffffff", boxShadow: "0 0.1rem 0.3rem #00000010" }}>
        <Card className="">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title mt-2">
              <TextField
                label="Tìm kiếm sản phẩm theo mã, tên"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                InputLabelProps={{
                  sx: {
                    marginTop: "",
                    // textTransform: "capitalize",
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
                onClick={() => {
                  setKeyword("");
                  setCurrentPage(1);
                  setSelectedValueCpus([0]);
                  setSelectedValueCategorys([0]);
                  setSelectedValueScreens([0]);
                  setSelectedValueBrands([0]);
                  setSelectedValueOperas(["None"]);
                  setSelectedValuePins([0]);
                  setSize(10);
                  setSort("New");
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
            <div className="mt-2">
              <Button
                // onClick={handleUploadClick}
                className="rounded-2 button-mui me-2"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                <FaUpload
                  className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "13.5px",
                    left: "10px",
                  }}
                />
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500", marginLeft: "21px" }}
                >
                  Import IMEI
                </span>
              </Button>
              <Button
                // onClick={handleUploadClick}
                className="rounded-2 button-mui me-2"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                <FaDownload
                  className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "13.5px",
                    left: "10px",
                  }}
                />
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500", marginLeft: "21px" }}
                >
                  Tải Mẫu Import IMEI
                </span>
              </Button>
              <Button
                // onClick={handleUploadClick}
                className="rounded-2 button-mui me-2"
                type="primary"
                style={{ height: "40px", width: "auto", fontSize: "15px" }}
              >
                <FaDownload
                  className="ms-1"
                  style={{
                    position: "absolute",
                    bottom: "13.5px",
                    left: "10px",
                  }}
                />
                <span
                  className=""
                  style={{ marginBottom: "2px", fontWeight: "500", marginLeft: "21px" }}
                >
                  Export Excel
                </span>
              </Button>
              <Button
                onClick={handleRedirectCreateProduct}
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "150px", fontSize: "15px" }}
              >
                <PlusOutlined className="ms-1"
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
                  Tạo sản phẩm
                </span>
              </Button>
            </div>
          </Card.Header>
          <div className="d-flex justify-content-center mt-4">
            <div
              className="d-flex"
              style={{ height: "40px", cursor: "pointer" }}
            >
              <div onClick={handleOpenCategory} className="mt-2">
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Danh Mục:{" "}
                </span>
              </div>
              <FormControl sx={{ maxWidth: 200 }} size="small">
                <SelectMui
                  multiple
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
                      color: "#288ad6",
                      fontWeight: "500",
                    },
                  }}
                  open={openCategory}
                  onClose={handleCloseOpenCategory}
                  onOpen={handleOpenCategory}
                  defaultValue={selectedValueCategorys}
                  value={selectedValueCategorys}
                  onChange={(e) => {
                    setSelectedValueCategorys(e.target.value);
                  }}
                  renderValue={(selected) =>
                    selected && selected.length > 1
                      ? selected
                        .filter((id) =>
                          categorys.find((c) => c.id === id)
                        ) // Loại bỏ các giá trị không hợp lệ
                        .map(
                          (id) =>
                            categorys.find((c) => c.id === id).tenDanhMuc
                        ) // Lấy tên danh mục tương ứng
                        .join(", ")
                      : "Chọn Danh Mục"
                  }
                >
                  {categorys.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <CheckBoxMui
                        checked={selectedValueCategorys.indexOf(c.id) > -1}
                      />
                      <ListItemText primary={c.tenDanhMuc} />
                    </MenuItem>
                  ))}
                </SelectMui>
              </FormControl>
            </div>

            <div
              className="ms-2 d-flex"
              style={{ height: "40px", cursor: "pointer" }}
            >
              <div onClick={handleOpenBrand} className="mt-2">
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Hãng:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 150,
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
                      color: "#288ad6",
                      fontWeight: "500",
                    },
                  }}
                  open={openBrand}
                  onClose={handleCloseBrand}
                  onOpen={handleOpenBrand}
                  defaultValue={selectedValueBrands}
                  value={selectedValueBrands}
                  onChange={(e) => {
                    setSelectedValueBrands(e.target.value);
                    console.log(e.target.value);
                  }}
                  multiple
                  renderValue={(selected) =>
                    selected && selected.length > 1
                      ? selected
                        .filter((id) => listHang.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                        .map(
                          (id) =>
                            listHang.find((c) => c.id === id).tenHang
                        ) // Lấy tên danh mục tương ứng
                        .join(", ")
                      : "Chọn Hãng"
                  }
                >
                  {listHang.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <CheckBoxMui
                        checked={selectedValueBrands.indexOf(c.id) > -1}
                      />
                      <ListItemText primary={c.tenHang} />
                    </MenuItem>
                  ))}
                </SelectMui>
              </FormControl>
            </div>

            <div
              className="ms-2 d-flex"
              style={{ height: "40px", cursor: "pointer" }}
            >
              <div onClick={handleOpenOpera} className="mt-2">
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Hệ Điều Hành:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 200,
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
                      color: "#288ad6",
                      fontWeight: "500",
                    },
                  }}
                  open={openOpera}
                  onClose={handleCloseOpera}
                  onOpen={handleOpenOpera}
                  multiple
                  defaultValue={selectedValueOperas}
                  value={selectedValueOperas}
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setSelectedValueOperas(["None"]);
                    } else {
                      const values = e.target.value.filter(
                        (value) => value !== "None"
                      );
                      setSelectedValueOperas(values);
                    }
                  }}
                  renderValue={(selected) =>
                    selected &&
                      selected.filter((value) => value !== "None").length > 0
                      ? selected
                        .filter((id) =>
                          ["ANDROID", "IOS"].find((c) => c === id)
                        ) // Loại bỏ các giá trị không hợp lệ
                        .map((id) =>
                          ["ANDROID", "IOS"].find((c) => c === id)
                        ) // Lấy tên danh mục tương ứng
                        .join(", ")
                      : "Chọn Hệ Điều Hành"
                  }
                >
                  {["ANDROID", "IOS"].map((c) => (
                    <MenuItem key={c} value={c}>
                      <CheckBoxMui
                        checked={selectedValueOperas.indexOf(c) > -1}
                      />
                      <ListItemText primary={c} />
                    </MenuItem>
                  ))}
                </SelectMui>
              </FormControl>
            </div>
            <div
              className="ms-2 d-flex"
              style={{ height: "40px", cursor: "pointer" }}
            >
              <div onClick={handleOpenCpu} className="mt-2">
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Chip:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 150,
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
                      color: "#288ad6",
                      fontWeight: "500",
                    },
                  }}
                  open={openCpu}
                  onClose={handleCloseCpu}
                  onOpen={handleOpenCpu}
                  defaultValue={selectedValueCpus}
                  value={selectedValueCpus}
                  onChange={(e) => {
                    setSelectedValueCpus(e.target.value);
                  }}
                  multiple
                  renderValue={(selected) =>
                    selected && selected.length > 1
                      ? selected
                        .filter((id) => listChip.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                        .map(
                          (id) =>
                            listChip.find((c) => c.id === id).tenChip
                        ) // Lấy tên danh mục tương ứng
                        .join(", ")
                      : "Chọn Chip"
                  }
                >
                  {listChip.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <CheckBoxMui
                        checked={selectedValueCpus.indexOf(c.id) > -1}
                      />
                      <ListItemText primary={c.tenChip} />
                    </MenuItem>
                  ))}
                </SelectMui>
              </FormControl>
            </div>
            <div
              className="d-flex ms-2"
              style={{ height: "40px", cursor: "pointer" }}
            >
              <div onClick={handleOpenPin} className="mt-2">
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Pin:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 150,
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
                      color: "#288ad6",
                      fontWeight: "500",
                    },
                  }}
                  open={openPin}
                  onClose={handleClosePin}
                  onOpen={handleOpenPin}
                  defaultValue={selectedValuePins}
                  value={selectedValuePins}
                  onChange={(e) => {
                    setSelectedValuePins(e.target.value);
                  }}
                  multiple
                  renderValue={(selected) =>
                    selected && selected.length > 1
                      ? selected
                        .filter((id) => listPin.find((c) => c.id === id)) // Loại bỏ các giá trị không hợp lệ
                        .map(
                          (id) =>
                            listPin.find((c) => c.id === id).loaiPin +
                            " " +
                            listPin.find((c) => c.id === id).dungLuong +
                            " mAh"
                        ) // Lấy tên danh mục tương ứng
                        .join(", ")
                      : "Chọn Pin"
                  }
                >
                  {listPin.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <CheckBoxMui
                        checked={selectedValuePins.indexOf(c.id) > -1}
                      />
                      <ListItemText
                        primary={c.loaiPin + " " + c.dungLuong + " mAh"}
                      />
                    </MenuItem>
                  ))}
                </SelectMui>
              </FormControl>
            </div>

          </div>

          <div className="d-flex justify-content-center mt-3">
            <div
              className="ms-2 d-flex"
              style={{ height: "40px", cursor: "pointer" }}
            >
              <div onClick={handleOpenScreen} className="mt-2">
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Màn hình:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 200,
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
                      color: "#288ad6",
                      fontWeight: "500",
                    },
                  }}
                  open={openScreen}
                  onClose={handleCloseScreen}
                  onOpen={handleOpenScreen}
                  defaultValue={selectedValueScreens}
                  value={selectedValueScreens}
                  onChange={(e) => {
                    setSelectedValueScreens(e.target.value);
                  }}
                  multiple
                  renderValue={(selected) =>
                    selected && selected.length > 1
                      ? selected
                        .filter((id) =>
                          listManHinh.find((c) => c.id === id)
                        ) // Loại bỏ các giá trị không hợp lệ
                        .map(
                          (id) =>
                            listManHinh.find((c) => c.id === id)
                              .loaiManHinh +
                            " " +
                            `(${listManHinh.find((c) => c.id === id)
                              .doPhanGiaiManHinh.chieuRong +
                            " x " +
                            listManHinh.find((c) => c.id === id)
                              .doPhanGiaiManHinh.chieuDai
                            } pixels) ` +
                            listManHinh.find((c) => c.id === id)
                              .kichThuoc +
                            `"`
                        ) // Lấy tên danh mục tương ứng
                        .join(", ")
                      : "Chọn Màn Hình"
                  }
                >
                  {listManHinh.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <CheckBoxMui
                        checked={selectedValueScreens.indexOf(c.id) > -1}
                      />
                      <ListItemText
                        primary={
                          c.loaiManHinh +
                          " " +
                          `(${c.doPhanGiaiManHinh.chieuRong +
                          " x " +
                          c.doPhanGiaiManHinh.chieuDai
                          } pixels) ` +
                          c.kichThuoc +
                          `"`
                        }
                      />
                    </MenuItem>
                  ))}
                </SelectMui>
              </FormControl>
            </div>
            <div
              className="d-flex ms-2"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                onClick={handleOpenSort}
                className=""
                style={{ marginTop: "8px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Trạng Thái:{""}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 170,
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
                  open={openSort}
                  onClose={handleCloseOpenSort}
                  onOpen={handleOpenSort}
                  defaultValue={"New"}
                >
                  <MenuItem value={"New"}>Mới</MenuItem>
                  <MenuItem value={"Old"}>Cũ</MenuItem>
                </SelectMui>
              </FormControl>
            </div>
            <div
              className="d-flex ms-2"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                onClick={handleOpenSort}
                className=""
                style={{ marginTop: "8px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Sắp Xếp:{""}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 170,
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
                  open={openSort}
                  onClose={handleCloseOpenSort}
                  onOpen={handleOpenSort}
                  defaultValue={"New"}
                >
                  <MenuItem value={"New"}>Mới</MenuItem>
                  <MenuItem value={"Old"}>Cũ</MenuItem>
                </SelectMui>
              </FormControl>
            </div>
            <div
              className="d-flex ms-2"
              style={{
                height: "40px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                onClick={handleOpenPage}
                className=""
                style={{ marginTop: "8px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Hiển Thị:{""}
                </span>
              </div>
              <FormControl
                sx={{
                  maxWidth: 170,
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
                  open={openPage}
                  onClose={handleCloseOpenPage}
                  onOpen={handleOpenPage}
                  defaultValue={10}
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  <MenuItem value={10}>10/Pages</MenuItem>
                  <MenuItem value={20}>20/Pages</MenuItem>
                  <MenuItem value={50}>50/Pages</MenuItem>
                </SelectMui>
              </FormControl>
            </div>
          </div>

          <Card.Body>
            <OrderTable />
          </Card.Body>
          <div className='mx-auto'>
            <Pagination color="primary" page={parseInt(currentPage)} key={refreshPage} count={totalPages}
              onChange={handlePageChange}
            />
          </div>
          <div className="mt-4"></div>
        </Card>
      </div>
      {isLoading && <LoadingIndicator />}
    </>
  )

}
export default ManagementProducts;
