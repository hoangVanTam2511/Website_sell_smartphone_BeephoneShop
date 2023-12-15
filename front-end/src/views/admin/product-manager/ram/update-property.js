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

  const [ramForm, setramForm] = useState({
    idRam: "",
    capacityRam: "",
  });
  const [capacityRamError, setcapacityRamError] = useState("");
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
    console.log(props.ram)
    setOpen(true);
    setramForm({
      idRam : props.ram.id,
      capacityRam : props.ram.kichThuocRam
    })
  };


  const handleOk = () => {
    setOpenModalConfirm(false)
    var flag = false;

    if (!ramForm.capacityRam) {
      setFormSubmitted(true);
      setcapacityRamError("Kích thước không được bỏ trống");
      flag = true;
    }

    props.rams.forEach((ram) => {
      if (ram.doPhanGiai === ramForm.capacityRam) {
        setFormSubmitted(true);
        setcapacityRamError(
          "Kích thước ram đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag === true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    request('POST',"/ram/save", ramForm);
    setTimeout(() => {
      props.loadData(props.currentPage)
      setLoading(false);
      setOpen(false);
    }, 300);
    showNotification("success", "Bạn đã sửa ram thành công")
    return;
  };


  const handleCancel = () => {
    setOpen(false);
  };


  const handleInputChangeFormcapacityRam = (e) => {
    const capacityRamValue = e.target.value.trim();
    if (isNaN(capacityRamValue)) {
      setcapacityRamError("Kích thước ram phải là số ");
    } else {
      setcapacityRamError("");
      setramForm({ ...ramForm, [e.target.name]: e.target.value });
    }
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
          Sửa ram
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Kích thước ram{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="capacityRam"
          value={ramForm.capacityRam}
          onChange={(e) => handleInputChangeFormcapacityRam(e)}
          error={
            (formSubmitted && !ramForm.capacityRam) ||
            !!capacityRamError
          }
          helperText={
            capacityRamError ||
            (formSubmitted &&
              !ramForm.capacityRam &&
              "Kích thước ram không được trống")
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
            Bạn có chắc sửa ram này ?
      </Modal>
    </>
  );
};

export default AddProperty;
