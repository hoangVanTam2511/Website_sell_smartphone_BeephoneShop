import {
  Button,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKhuyenMai, apiURLSanPham } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { Box, Pagination } from "@mui/material";
import "../../../assets/scss/addPromotion.scss";
import { Link, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { Table } from "antd";
import { isEmpty, isBefore, isAfter, equals } from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuaKhuyenMai = () => {
  let [listKhuyenMai, setlistKhuyenMai] = useState([]);
  let [ma, setMa] = useState("");
  let [tenKhuyenMai, setTenKhuyenMai] = useState("");
  let [mucGiamGiaTheoPhanTram, setMucGiamGiaTheoPhanTram] = useState("");
  let [mucGiamGiaTheoSoTien, setMucGiamGiaTheoSoTien] = useState("");
  let [ngayBatDau, setNgayBatDau] = useState(dayjs());
  let [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  let [dieuKienGiamGia, setDieuKienGiamGia] = useState("");
  let [khuyenMai, setKhuyenMai] = useState({});
  const { id } = useParams();

  //san-pham
  let [listSanPham, setlistSanPham] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [validationMsg, setValidationMsg] = useState({});

  const redirectToHienThiKhuyenMai = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/khuyen-mai";
  };

  useEffect(() => {
    loadDatalistSanPham(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setMa(() => khuyenMai.ma);
    setTenKhuyenMai(() => khuyenMai.tenKhuyenMai);
    setMucGiamGiaTheoPhanTram(() => khuyenMai.mucGiamGiaTheoPhanTram);
    setMucGiamGiaTheoSoTien(() => khuyenMai.mucGiamGiaTheoSoTien);
    // setTenKhuyenMai(() => khuyenMai.ten);
    setNgayBatDau(() => khuyenMai.ngayBatDau);
    setNgayKetThuc(() => khuyenMai.ngayKetThuc);
    setDieuKienGiamGia(() => khuyenMai.dieuKienGiamGia);
  }, [khuyenMai]);

  // cutstom load data
  const loadDatalistSanPham = (currentPage) => {
    if (currentPage == undefined) currentPage = 0;
    axios
      .get(apiURLSanPham + "/view-all?page=" + currentPage)
      .then((response) => {
        const modifiedData = response.data.content.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setlistSanPham(modifiedData);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      });
  };

  const detailKhuyenMai = () => {
    axios
      .get(apiURLKhuyenMai + "/get-by-id/" + id)
      .then((response) => {
        setKhuyenMai(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    detailKhuyenMai();
  }, []);

  const suaKhuyenMai = () => {
    let obj = {
      tenKhuyenMai: tenKhuyenMai,
      mucGiamGiaTheoPhanTram: mucGiamGiaTheoPhanTram,
      mucGiamGiaTheoSoTien: mucGiamGiaTheoSoTien,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      dieuKienGiamGia: dieuKienGiamGia,
    };
    toast
      .promise(axios.put(apiURLKhuyenMai + "/update-khuyen-mai/" + id, obj), {
        success: {
          render({ data }) {
            toast.success("Cập nhật thành công!");
            setTimeout(() => {
              redirectToHienThiKhuyenMai();
            }, 3000);
          },
        },
        error: {
          render({ error }) {
            toast.error("Đã xảy ra lỗi khi cập nhật Khuyến Mãi.");
          },
        },
      })
      .catch((error) => {});
  };

  const validationAll = () => {
    const msg = {};
    // if (isEmpty(tenKhuyenMai)) {
    //   msg.tenKhuyenMai = "Không để trống Tên !!!";
    // }
    // if (isEmpty(mucGiamGiaTheoPhanTram)) {
    //   msg.mucGiamGiaTheoPhanTram = "Không để trống Mức GIảm Giá Theo Tên !!!";
    // }
    // if (isEmpty(mucGiamGiaTheoSoTien)) {
    //   msg.mucGiamGiaTheoSoTien = "Không để trống Mức Giảm Giá Theo Tiền !!!";
    // }
    // if (isEmpty(dieuKienGiamGia)) {
    //   msg.dieuKienGiamGia = "Không để trống Điều Kiện Giảm Giá !!!";
    // }

    // if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
    //   msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc !!!";
    // }

    // if (isAfter(String(ngayBatDau), String(ngayKetThuc))) {
    //   msg.ngayBatDau = "Ngày Bắt Đầu phải nhỏ hơn ngày kết thúc !!!";
    // }

    // if (equals(String(ngayBatDau), String(ngayKetThuc))) {
    //   msg.ngayKetThuc = "Ngày Kết Thúc phải lớn hơn Ngày Bắt Đầu !!!";
    // }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    suaKhuyenMai();
  };

  const dataTop = [
    { key: "1", name: "John", age: 28, address: "New York" },
    { key: "2", name: "Jane", age: 24, address: "Los Angeles" },
    // ...more data
  ];

  const dataBottom = [
    {
      key: "1",
      stt: "1",
      tenSP: "iphone14",
      mauSac: "vàng",
      hinhThuc: "99",
      soLuong: "1",
      donGia: "10000",
    },
    {
      key: "2",
      stt: "2",
      tenSP: "iphone14",
      mauSac: "hồng",
      hinhThuc: "99",
      soLuong: "2",
      donGia: "10000",
    },
    // ...more data
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      width: "10%",
      // ...getColumnSearchProps("mã"),
    },
    {
      title: "Tên sản phẩm ",
      dataIndex: "ten",
      width: "15%",
      editable: true,
      // ...getColumnSearchProps("Tên sản phẩm"),
    },
  ];
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  const columnsBottom = [
    { title: "STT", dataIndex: "stt", key: "stt" },
    { title: "Tên sản phẩm", dataIndex: "tenSP", key: "tenSP" },
    { title: "Màu sắc", dataIndex: "mauSac", key: "mauSac" },
    { title: "Hình thức", dataIndex: "hinhThuc", key: "hinhThuc" },
    { title: "Số lượng", dataIndex: "soLuong", key: "soLuong" },
    { title: "Đơn giá", dataIndex: "donGia", key: "donGia" },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="add-promotion-container">
            <h5 className="title-promotion" style={{ marginBottom: "2%" }}>
              Thêm Khuyến Mãi
            </h5>
            <div className="row-input">
              <div className="input-container">
                <TextField
                  label={tenKhuyenMai ? "" : "Tên Khuyến Mãi"}
                  value={
                    tenKhuyenMai !== "Tên Khuyến Mãi"
                      ? tenKhuyenMai
                      : khuyenMai.tenKhuyenMai
                  }
                  id="fullWidth"
                  onChange={(e) => {
                    setTenKhuyenMai(e.target.value);
                  }}
                  style={{ marginBottom: "0.1%", width: "20em" }}
                />
              </div>
              <div className="row-input">
                <span className="validate" style={{ color: "red" }}>
                  {validationMsg.tenKhuyenMai}
                </span>
              </div>
            </div>
            <div className="row-input">
              <div className="input-container">
                <TextField
                  label="Điều Kiện Giảm Giá:"
                  value={dieuKienGiamGia}
                  id="fullWidth"
                  onChange={(e) => {
                    setDieuKienGiamGia(e.target.value);
                  }}
                  style={{ width: "20em" }}
                />
              </div>
              <div className="row-input">
                <span className="validate" style={{ color: "red" }}>
                  {validationMsg.dieuKienGiamGia}
                </span>
              </div>
            </div>
            <div className="row-input">
              <div className="input-container">
                <TextField
                  label="Mức Giảm Giá Theo Phần Trăm:"
                  value={mucGiamGiaTheoPhanTram}
                  id="fullWidth"
                  onChange={(e) => {
                    setMucGiamGiaTheoPhanTram(e.target.value);
                  }}
                  style={{ marginBottom: "0.1%", width: "20em" }}
                />
              </div>
              <div className="row-input">
                <span className="validate" style={{ color: "red" }}>
                  {validationMsg.mucGiamGiaTheoPhanTram}
                </span>
              </div>
            </div>
            <div className="row-input">
              <div className="input-container">
                <TextField
                  label="Mức Giảm Giá Theo Số Tiền:"
                  value={mucGiamGiaTheoSoTien}
                  id="fullWidth"
                  onChange={(e) => {
                    setMucGiamGiaTheoSoTien(e.target.value);
                  }}
                  style={{ marginBottom: "0.1%", width: "20em" }}
                />
              </div>
              <div className="row-input">
                <span className="validate" style={{ color: "red" }}>
                  {validationMsg.mucGiamGiaTheoSoTien}
                </span>
              </div>
            </div>
            <div className="row-input">
              <div className="input-container">
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { width: "20em" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        ampm={true}
                        disablePast={true}
                        label={ngayBatDau ? "" : "Ngày Bắt Đầu"}
                        value={dayjs(ngayBatDau)}
                        format="HH:mm DD-MM-YYYY"
                        onChange={(e) => {
                          setNgayBatDau(e);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </div>
              <div className="row-input">
                <span className="validate" style={{ color: "red" }}>
                  {validationMsg.ngayBatDau}
                </span>
              </div>
            </div>
            <div className="row-input">
              <div className="input-container">
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { width: "20em" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        ampm={true}
                        disablePast={true}
                        label={ngayKetThuc ? "" : "Ngày Kết Thúc"}
                        value={dayjs(ngayKetThuc)}
                        format="HH:mm DD-MM-YYYY"
                        onChange={(e) => {
                          setNgayKetThuc(e);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </div>
              <div className="row-input">
                <span className="validate" style={{ color: "red" }}>
                  {validationMsg.ngayKetThuc}
                </span>
              </div>
            </div>
            <div className="btn-accept">
              <Button type="primary" onClick={handleSubmit}>
                Xác nhận{" "}
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ paddingLeft: "10px" }}
                />
              </Button>
              <ToastContainer />
              &nbsp;&nbsp;
              <Button
                type="primary"
                onClick={() => {
                  redirectToHienThiKhuyenMai();
                }}
                htmlType="submit"
              >
                Quay Về{" "}
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ paddingLeft: "10px" }}
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="col-8">
          <div className="table-container">
            <h4>Sản Phẩm</h4>
            <Table
              dataSource={listSanPham}
              columns={mergedColumns}
              pagination={false}
              rowKey="id"
              style={{ marginBottom: "20px" }}
            />
            <div className="phan-trang">
              <Pagination
                simplecurrent={currentPage + 1}
                onChange={(value) => {
                  setCurrentPage(value - 1);
                }}
                total={totalPages * 10}
              />
            </div>

            <h4 style={{ marginTop: "20px" }}>Chi tiết sản phẩm</h4>
            <Table dataSource={dataBottom} columns={columnsBottom} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuaKhuyenMai;
