import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import TextField from "@mui/material/TextField";
import { FormLabel } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    setOpen(true);
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
      props.loadData()
      setLoading(false);
      setOpen(false);
    }, 300);
    showNotification("success", "Bạn đã thêm thành công")
    return;
  };


  const handleCancel = () => {
    setOpen(false);
  };


  const handleInputCproductLineeFormnameProductLine = (e) => {
    setnameProductLineError("");
    setproductLineForm({ ...productLineForm, [e.target.name]: e.target.value });
  };


  return (
    <>
      <ToastContainer />
      <Button
        className="rounded-2 button-mui"
        type="primary"
        style={{ height: "40px", width: "250px", fontSize: "15px" }}
        onClick={handleClick}
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
          style={{ marginBottom: "0px", fontWeight: "500" }}
        >
          Thêm dòng sản phẩm
        </span>
      </Button>

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
            + Thêm mới
          </Button>,
        ]}
      >
        <h2
          style={{ marginBottom: `2%`, textAlign: `center`, fontSize: `27px` }}
        >
          Thêm dòng sản phẩm
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Tên dòng sản phẩm{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="nameProductLine"
          value={productLineForm.nameProductLine}
          onChange={(e) => handleInputCproductLineeFormnameProductLine(e)}
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
            Bạn có chắc tạo dòng sản phẩm này ?
      </Modal>
    </>
  );
};

export default AddProperty;
