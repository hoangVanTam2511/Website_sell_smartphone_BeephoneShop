import React, { useEffect, useState } from "react";
import ModalAddDiaChiKhachHang from "./ModalAddDiaChiKhachHang";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { Notistack } from "../../order-manager/enum";
import useCustomSnackbar from "../../../../utilities/notistack";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import PropTypes from "prop-types";
import { Button } from "antd";
const AddressNew = ({ idCustom, data, openAddress, close, setData }) => {
  let [hoTenKH, setHoTenKH] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [diaChi, setDiaChi] = useState("");
  let [soDienThoaiKhachHang, setSoDienThoaiKhachHang] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [huy, setHuy] = useState(false);
  const [formSubmittedS, setFormSubmittedS] = useState(false);
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtkhError, setSDTKHError] = useState("");
  const [hoTenkhError, sethoTenKHError] = useState("");
  const [submittedS, setSubmittedS] = useState(false);
  let [trangThaiKH, setTrangThaiKH] = useState(0);
  let [maDC, setMaDC] = useState("");
  //   let [idCustom, setIDCustom] = useState("");
  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      soDienThoaiKhachHang: "",
      hoTenKH: "",
      account: "",
      id: "",
      trangThai: trangThaiKH,
      ma: maDC,
    },
  ]);
  useEffect(() => {
    if (!openAddress) {
      handleCloseModal();
      close();
    }
  }, [close, openAddress]);
  const handleHoTenChange = (e) => {
    const value = e.target.value;
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    setHoTenKH(value);
    if (!value.trim()) {
      sethoTenKHError("Họ và tên không được trống");
    } else if (specialCharPattern.test(value)) {
      sethoTenKHError("Họ và tên không được chứa ký tự đặc biệt");
    } else if (value.length < 5) {
      sethoTenKHError("Họ và tên phải có ít nhất 5 ký tự");
    } else if (/^\s+|\s+$/.test(value)) {
      sethoTenKHError("Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi");
    } else if (huy) {
      sethoTenKHError("");
    } else {
      sethoTenKHError("");
    }
  };
  const handleSoDienThoaiChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;
    setSoDienThoaiKhachHang(value);
    if (!value.trim()) {
      setSDTKHError("Số điện thoại không được trống");
    } else if (!parn.test(value)) {
      setSDTKHError("Sai định dạng số điện thoại");
    } else if (huy) {
      setSDTKHError("");
    } else {
      setSDTKHError("");
    }
  };
  const handleDiaChi = (e) => {
    const value = e.target.value;
    setDiaChi(value);
    const trimmedValue = value.replace(/\s/g, "");
    if (!value.trim()) {
      setDiaChiError("Địa chỉ không được trống");
    } else if (trimmedValue.length < 5) {
      setDiaChiError("Địa chỉ phải có ít nhất 5 ký tự");
    } else {
      setDiaChiError("");
    }
  };
  const generateRandomCode = () => {
    const getRandomInt = () => {
      return Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
    };

    let randomCode = "DC";
    for (let i = 0; i < 10; i++) {
      randomCode += getRandomInt();
    }
    return randomCode;
  };
  const handleProvinceChange = (value) => {
    setTinhThanhPho(value);
  };

  const handleDistrictChange = (value) => {
    setQuanHuyen(value);
  };

  const handleWardChange = (value) => {
    setXaPhuong(value);
  };
  const handleCloseModal = () => {
    setIsModalVisibleS(false);
    setFormSubmittedS(false);
    setDiaChi("");
    setHoTenKH("");
    sethoTenKHError("");
    setSDTKHError("");
    setDiaChiError("");
    setTrangThaiKH(0);
    setSoDienThoaiKhachHang("");
    setHuy(true);
  };
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [isModalVisibleS, setIsModalVisibleS] = useState(false);

  const addDiaChiList = () => {
    setSubmittedS(true);
    setFormSubmittedS(true);
    // setIDCustom(idCus);
    let newAddress = {
      diaChi: diaChi,
      xaPhuong: xaPhuong,
      quanHuyen: quanHuyen,
      tinhThanhPho: tinhThanhPho,
      soDienThoaiKhachHang: soDienThoaiKhachHang,
      hoTenKH: hoTenKH,
      account: idCustom,
      trangThai: trangThaiKH,
      ma: generateRandomCode(),
    };
    if (
      !hoTenKH ||
      !soDienThoaiKhachHang ||
      !diaChi ||
      !xaPhuong ||
      !quanHuyen ||
      !tinhThanhPho
    ) {
      handleOpenAlertVariant("Chưa điền đủ thông tin", Notistack.ERROR);
      setIsModalVisibleS(true);
      return;
    }
    if (hoTenkhError || sdtkhError || diaChiError) {
      handleOpenAlertVariant(
        "Vui lòng điền đúng thông tin trước khi lưu.",
        Notistack.ERROR
      );
      setIsModalVisibleS(true);
      return;
    }
    setIsModalVisibleS(false);
    axios
      .post(`${apiURLKH}/dia-chi/add?id=${idCustom}`, newAddress)
      .then((response) => {
        let newKhachHangResponse = {
          diaChi: diaChi,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          soDienThoaiKhachHang: soDienThoaiKhachHang,
          hoTenKH: hoTenKH,
          account: idCustom,
          trangThai: trangThaiKH,
          ma: maDC,
        };
        setData([...data, newKhachHangResponse]);
        setMaDC(response.data.ma);
        handleOpenAlertVariant("Thêm thành công", Notistack.SUCCESS);
        close();
        handleCloseModal();
        // getAddress();

        return;
      })
      .catch((error) => {
        handleOpenAlertVariant("Thêm thất bại", Notistack.ERROR);
      });
  };
  return (
    <div>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "22px", fontWeight: "500" }}>
            Thêm Địa chỉ Giao Hàng
          </span>
        </div>
        <div
          className="text-f"
          style={{ marginBottom: "30px", marginTop: "25px" }}
        >
          <TextField
            label="Họ và tên người nhận"
            value={hoTenKH}
            id="fullWidth"
            onChange={handleHoTenChange}
            error={(formSubmittedS && !hoTenKH) || !!hoTenkhError}
            helperText={
              hoTenkhError || (formSubmittedS && !hoTenKH && "Họ và tên trống")
            }
            style={{ width: "100%" }}
          />
        </div>
        <div className="text-f" style={{ marginBottom: "30px" }}>
          <TextField
            label="Số điện thoại người nhận"
            id="fullWidth"
            value={soDienThoaiKhachHang}
            onChange={handleSoDienThoaiChange}
            error={(formSubmittedS && !soDienThoaiKhachHang) || !!sdtkhError}
            helperText={
              sdtkhError ||
              (formSubmittedS && !soDienThoaiKhachHang && "Số điện thoại trống")
            }
            style={{ width: "100%" }}
          />
        </div>
        <div className="text-f" style={{ marginBottom: "30px" }}>
          <TextField
            label="Địa chỉ"
            id="fullWidth"
            value={diaChi}
            onChange={handleDiaChi}
            error={(formSubmittedS && !diaChi) || !!diaChiError}
            helperText={
              diaChiError || (formSubmittedS && !diaChi && "Địa chỉ trống")
            }
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <ModalAddDiaChiKhachHang
            required={true}
            submitted={submittedS}
            onProvinceChange={handleProvinceChange}
            onDistrictChange={handleDistrictChange}
            onWardChange={handleWardChange}
            selectedTinhThanhPho={tinhThanhPho}
            selectedQuanHuyen={quanHuyen}
            selectedXaPhuong={xaPhuong}
            formSubmitted={formSubmittedS}
            huy={huy}
            set={setHuy}
            openCustomer={openAddress}
          />
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        {" "}
        <div style={{ float: "right" }}>
          <Button
            type="primary"
            // onClick={showConfirm}
            size={"large"}
            onClick={() => {
              // add();
              addDiaChiList();
            }}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ paddingRight: "5px" }}
            />
            Lưu Địa Chỉ{" "}
          </Button>
          {/* <Modal
              title="Xác nhận"
              open={isConfirmVisible}
              onOk={() => save(id)}
              onCancel={handleCancel}
            >
              <p>Bạn có chắc chắn muốn lưu khách hàng?</p>
            </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default AddressNew;
