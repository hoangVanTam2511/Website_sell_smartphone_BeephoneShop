import {
  Button,
  Select,
  Col,
  Row,
  Input,
  message,
  Upload,
  // DatePicker, Form, Input, Radio, Select
} from "antd";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLVoucher } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { format, parseISO } from "date-fns"; // Import các hàm liên quan đến ngày tháng
import "../../../assets/scss/addVoucher.scss";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AddVoucher = () => {
  let [listVoucher, setListVoucher] = useState([]);
  let [ma, setMa] = useState("");
  let [ten, setTen] = useState("");

  const [ngayBatDau, setNgayBatDau] = useState(
    format(new Date(), "HH:mm:ss MM-dd-yyyy")
  );

  let [ngayKetThuc, setNgayKetThuc] = useState("");
  let [giaTriVoucher, setGiaTriVoucher] = useState("");
  let [trangThai, setTrangThai] = useState("");

  const redirectToHienThiVoucher = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/voucher";
  };

  const formatDateTime = (dateTimeStr) => {
    const parsedDate = new Date(dateTimeStr);
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleTrangThaiChange = (event) => {
    setTrangThai(event.target.value);
  };

  const addVoucher = () => {
    let obj = {
      ma: ma,
      ten: ten,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      giaTriVoucher: giaTriVoucher,
      trangThai: trangThai,
    };

    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn thêm voucher này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(apiURLVoucher + "/addVoucher", obj)
          .then((response) => {
            console.log(response);
            // let res = response.data;
            let newVoucherResponse = {
              ma: ma,
              ten: ten,
              ngayBatDau: ngayBatDau,
              ngayKetThuc: ngayKetThuc,
              giaTriVoucher: giaTriVoucher,
              trangThai: trangThai,
            };

            setListVoucher([newVoucherResponse, ...listVoucher]);
            Swal.fire({
              icon: "success",
              title: "Thêm thành công!",
              text: "Voucher đã được thêm vào danh sách.",
            }).then(() => {
              redirectToHienThiVoucher();
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Thêm thất bại",
              text: "Đã có lỗi xảy ra khi thêm voucher.",
            });
          });
      }
    });
  };

  return (
    <>
      <div className="add-voucher-container">
        <h5 style={{ marginBottom: "3%" }}>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          &nbsp; */}
          Thêm Voucher
        </h5>
        <div className="row-input">
          <div className="input-container">
            <TextField
              label="Mã Voucher:"
              value={ma}
              id="fullWidth"
              onChange={(e) => {
                setMa(e.target.value);
              }}
              style={{ width: "25em" }}
            />
          </div>
          <div className="input-container">
            <TextField
              label="Tên Voucher:"
              value={ten}
              id="fullWidth"
              onChange={(e) => {
                setTen(e.target.value);
              }}
              style={{ width: "25em" }}
            />
          </div>
        </div>
        <div className="row-input">
          <div className="input-container">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "25em" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Ngày Bắt Đầu:"
                type="datetime-local"
                value={formatDateTime(ngayBatDau)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
                  },
                }}
                onChange={(e) => {
                  setNgayBatDau(e.target.value);
                }}
              />
            </Box>
          </div>
          <div className="input-container">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "25em" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Ngày Kết Thúc:"
                type="datetime-local"
                value={ngayKetThuc}
                format="yyyy-MM-dd'T'HH:mm:ss"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
                  },
                }}
                onChange={(e) => {
                  setNgayKetThuc(e.target.value);
                }}
              />
            </Box>
          </div>
        </div>
        <div className="input-container">
          <TextField
            label="Giá Trị Giảm Giá Theo VND:"
            value={giaTriVoucher}
            id="fullWidth"
            onChange={(e) => {
              setGiaTriVoucher(e.target.value);
            }}
            style={{ width: "25em" }}
          />
        </div>
        <div className="btn-accept">
          <Button type="primary" onClick={addVoucher} htmlType="submit">
            <FontAwesomeIcon icon={faCheck} />
            &nbsp; Xác nhận{" "}
          </Button>
          &nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              redirectToHienThiVoucher();
            }}
            htmlType="submit"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp; Quay Về{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddVoucher;
