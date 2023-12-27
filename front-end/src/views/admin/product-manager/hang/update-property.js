import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import TextField from "@mui/material/TextField";
import { FormLabel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  faPencilAlt, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { request } from '../../../../store/helpers/axios_helper'

const AddProperty = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  const [brandForm, setbrandForm] = useState({
    idBrand: "",
    nameBrand: "",
  });
  const [nameBrandError, setnameBrandError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);


  // toast notification
  const showNotification = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  
  const handleClick = () => {
    console.log(props.brand)
    setOpen(true);
    setbrandForm({
      idBrand : props.brand.id,
      nameBrand : props.brand.tenHang
    })
  };


  const handleOk = () => {
    setOpenModalConfirm(false)
    var flag = false;

    if (!brandForm.nameBrand) {
      setFormSubmitted(true);
      setnameBrandError("Tên hãng không được bỏ trống");
      flag = true;
    }

    props.brands.forEach((brand) => {
      if (brand.tenHang === brandForm.nameBrand) {
        setFormSubmitted(true);
        setnameBrandError(
          "Tên hãng đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag == true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    request('POST',"/hang/save", brandForm);
    setTimeout(() => {
      props.loadData(props.currentPage)
      setLoading(false);
      setOpen(false);
    }, 300);
    showNotification("success", "Bạn đã sửa thành công")
    return;
  };


  const handleCancel = () => {
    setOpen(false);
  };


  const handleInputChangeFormnameBrand = (e) => {
    const nameBrandValue = e.target.value.trim();
      setnameBrandError("");
      setbrandForm({ ...brandForm, [e.target.name]: e.target.value });
  };


  return (
    <>
      <ToastContainer />

      <FontAwesomeIcon
              icon={faPencilAlt}
              onClick={handleClick}
              style={{
                cursor: "pointer",
                color: "green",
              }}
            />
      
      <Modal
        open={open}
        onOk={() => setOpenModalConfirm(true)}
        onCancel={handleCancel}
        footer={[
          <Button
            type="danger"
            style={{ height: 40, marginRight: `3%` }}
            onClick={handleCancel}
          >
            Huỷ
          </Button>,
          <Button
            type="primary"
            loading={loading}
            style={{ height: 40, marginRight: `36%` }}
            onClick={handleOk}
          >
            Sửa
          </Button>,
        ]}
      >
        <h2
          style={{ marginBottom: `2%`, textAlign: `center`, fontSize: `27px` }}
        >
          Sửa 
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Tên hãng{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="nameBrand"
          value={brandForm.nameBrand}
          onChange={(e) => handleInputChangeFormnameBrand(e)}
          error={
            (formSubmitted && !brandForm.nameBrand) ||
            !!nameBrandError
          }
          helperText={
            nameBrandError ||
            (formSubmitted &&
              !brandForm.nameBrand &&
              "Tên hãng không được trống")
          }
          style={{ width: "100%" }}
        />

        {/* </Form.Group> */}
      </Modal>

      {/* delete model */}
      <Modal
            title="Xác nhận"
            open={openModalConfirm}
            onOk={handleOk}
            onCancel={() => setOpenModalConfirm(false)}
          >
            Bạn có chắc sửa này ?
      </Modal>
    </>
  );
};

export default AddProperty;
