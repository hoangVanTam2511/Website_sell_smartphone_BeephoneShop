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

  const [chipForm, setchipForm] = useState({
    idChip: "",
    nameChip: "",
  });
  const [nameChipError, setnameChipError] = useState("");
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

    if (!chipForm.nameChip) {
      setFormSubmitted(true);
      setnameChipError("Tên chip không được bỏ trống");
      flag = true;
    }

    props.chips.forEach((chip) => {
      if (chip.tenChip === chipForm.nameChip) {
        setFormSubmitted(true);
        setnameChipError(
          "Tên chip đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag == true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    request('POST',"/chip/save", chipForm);
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


  const handleInputCchipeFormnameChip = (e) => {
    setnameChipError("");
    setchipForm({ ...chipForm, [e.target.name]: e.target.value });
  };


  return (
    <>
      <ToastContainer />
      <Button
        className="rounded-2 button-mui"
        type="primary"
        style={{ height: "40px", width: "150px", fontSize: "15px" }}
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
          Thêm chip
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
          Thêm chip
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Tên chip{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="nameChip"
          value={chipForm.nameChip}
          onChange={(e) => handleInputCchipeFormnameChip(e)}
          error={
            (formSubmitted && !chipForm.nameChip) ||
            !!nameChipError
          }
          helperText={
            nameChipError ||
            (formSubmitted &&
              !chipForm.nameChip &&
              "Tên chip không được trống")
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
            Bạn có chắc tạo chip này ?
      </Modal>
    </>
  );
};

export default AddProperty;
