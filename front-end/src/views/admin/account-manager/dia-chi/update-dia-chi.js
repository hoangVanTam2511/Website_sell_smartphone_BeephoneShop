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
import AddressFormUpdate from "./DiaChiUpdate";
const AddressUpdate = ({
  idCustom,
  data,
  openAddress,
  close,
  setData,
  hoTenKH,
  xaPhuong,
  tinhThanhPho,
  quanHuyen,
  sdt,
  diaChi,
  setXaPhuong,
  setDiaChi,
  setTinhThanhPho,
  setHoTenKH,
  setSDT,
  setQuanHuyen,
  diaChiList,
}) => {
  const [hoTenKH1, setHoTenKH1] = useState("");
  const [quanHuyen1, setQuanHuyen1] = useState("");
  const [tinhThanhPho1, setTinhThanhPho1] = useState("");
  const [diaChi1, setDiaChi1] = useState("");
  const [soDienThoaiKhachHang1, setSoDienThoaiKhachHang1] = useState("");
  const [xaPhuong1, setXaPhuong1] = useState("");
  let [huy, setHuy] = useState(false);
  const [formSubmittedS, setFormSubmittedS] = useState(false);
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtkhError, setSDTKHError] = useState("");
  const [hoTenkhError, sethoTenKHError] = useState("");
  const [submittedS, setSubmittedS] = useState(false);
  let [trangThaiKH, setTrangThaiKH] = useState(0);
  useEffect(() => {
    if (openAddress) {
      setHoTenKH1(hoTenKH);
      setDiaChi1(diaChi);
      setXaPhuong1(xaPhuong);
      setQuanHuyen1(quanHuyen);
      setTinhThanhPho1(tinhThanhPho);
      setSoDienThoaiKhachHang1(sdt);
    }
  }, [diaChi, hoTenKH, openAddress, quanHuyen, sdt, tinhThanhPho, xaPhuong]);
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
  const handleCloseModal = () => {
    setFormSubmittedS(false);
    setDiaChi("");
    setHoTenKH("");
    sethoTenKHError("");
    setSDTKHError("");
    setDiaChiError("");
    setTrangThaiKH(0);
    setSoDienThoaiKhachHang1("");
    setHuy(true);
  };
  const handleSoDienThoaiChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;
    setSDT(value);
    console.log("hihi");
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
  const handleProvinceChange = (value) => {
    setTinhThanhPho1(value);
  };

  const handleDistrictChange = (value) => {
    setQuanHuyen1(value);
  };

  const handleWardChange = (value) => {
    setXaPhuong1(value);
  };
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const handleSaveChanges = async (id) => {
    // Gọi API để cập nhật thông tin địa chỉ
    setSubmittedS(true);
    setFormSubmittedS(true);
    if (
      !hoTenKH ||
      !sdt ||
      !diaChi ||
      !xaPhuong1 ||
      !quanHuyen1 ||
      !tinhThanhPho1
    ) {
      handleOpenAlertVariant("Vui lòng điền đủ thông tin", Notistack.ERROR);
      // setShowEditModal(true);
      return;
    }
    if (hoTenkhError || sdtkhError || diaChiError) {
      handleOpenAlertVariant(
        "Vui lòng điền đúng thông tin trước khi lưu.",
        Notistack.ERROR
      );
      // setShowEditModal(true);
      return;
    }
    // setShowEditModal(false);
    try {
      let updatedItem = {
        diaChi: diaChi,
        xaPhuong: xaPhuong1,
        quanHuyen: quanHuyen1,
        tinhThanhPho: tinhThanhPho1,
        soDienThoaiKhachHang: sdt,
        hoTenKH: hoTenKH,
        account: idCustom,
      };
      axios
        .put(
          `${apiURLKH}/dia-chi/update?id=${diaChiList.id}`, // Extract id from updatedData
          updatedItem
        )
        .then((response) => {
          if (response.status === 200) {
            handleOpenAlertVariant(
              "Cập nhật địa chỉ thành công",
              Notistack.SUCCESS
            ); // Cập nhật thông tin trong danh sách diaChiList
            close();
            const updatedItemIndex = data.map((address) =>
              address.id === id ? { ...address, ...updatedItem } : address
            );
            setData(updatedItemIndex);
          } else {
            handleOpenAlertVariant("Cập nhật thất bại", Notistack.ERROR);
          }
        }); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      // Xử lý lỗi
      handleOpenAlertVariant("Cập nhật thất bại", Notistack.ERROR);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "22px", fontWeight: "500" }}>
            Sửa Địa chỉ Giao Hàng
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
            value={sdt}
            onChange={handleSoDienThoaiChange}
            error={(formSubmittedS && !sdt) || !!sdtkhError}
            helperText={
              sdtkhError || (formSubmittedS && !sdt && "Số điện thoại trống")
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
          <AddressFormUpdate
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
              handleSaveChanges(diaChiList.id);
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

export default AddressUpdate;
