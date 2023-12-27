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

  const [productLineForm, setproductLineForm] = useState({
    idProductLine: "",
    nameProductLine: "",
  });
  const [nameProductLineError, setnameProductLineError] = useState("");
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
    console.log(props.productLine)
    setOpen(true);
    setproductLineForm({
      idProductLine : props.productLine.id,
      nameProductLine : props.productLine.tenDongSanPham
    })
  };


  const handleOk = () => {
    setOpenModalConfirm(false)
    var flag = false;

    if (!productLineForm.nameProductLine) {
      setFormSubmitted(true);
      setnameProductLineError("Tên dòng sản phẩm không được bỏ trống");
      flag = true;
    }

    props.productLines.forEach((productLine) => {
      if (productLine.tenDongSanPham === productLineForm.nameProductLine) {
        setFormSubmitted(true);
        setnameProductLineError(
          "Tên dòng sản phẩm đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag == true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    request('POST',"/dong-san-pham/save", productLineForm);
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


  const handleInputChangeFormnameProductLine = (e) => {
    const nameProductLineValue = e.target.value.trim();
      setnameProductLineError("");
      setproductLineForm({ ...productLineForm, [e.target.name]: e.target.value });
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
          Tên productLine{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="nameProductLine"
          value={productLineForm.nameProductLine}
          onChange={(e) => handleInputChangeFormnameProductLine(e)}
          error={
            (formSubmitted && !productLineForm.nameProductLine) ||
            !!nameProductLineError
          }
          helperText={
            nameProductLineError ||
            (formSubmitted &&
              !productLineForm.nameProductLine &&
              "Tên dòng sản phẩm không được trống")
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
