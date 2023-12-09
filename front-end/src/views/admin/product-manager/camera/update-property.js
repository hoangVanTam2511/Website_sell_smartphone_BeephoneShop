import React, { useEffect, useState } from "react";
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

  const [cameraForm, setCameraForm] = useState({
    idCamera: "",
    resolutionCamera: "",
  });
  const [resolutionCameraError, setResoluTionCameraError] = useState("");
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
    console.log(props.camera)
    setOpen(true);
    setCameraForm({
      idCamera : props.camera.id,
      resolutionCamera : props.camera.doPhanGiai
    })
  };


  const handleOk = () => {
    setOpenModalConfirm(false)
    var flag = false;

    if (!cameraForm.resolutionCamera) {
      setFormSubmitted(true);
      setResoluTionCameraError("Độ phân giải không được bỏ trống");
      flag = true;
    }

    props.cameras.forEach((camera) => {
      if (camera.doPhanGiai === cameraForm.resolutionCamera) {
        setFormSubmitted(true);
        setResoluTionCameraError(
          "Độ phân giải camera đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag == true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    request('POST',"/camera/save", cameraForm);
    setTimeout(() => {
      props.loadData(props.currentPage)
      setLoading(false);
      setOpen(false);
    }, 300);
    showNotification("success", "Bạn đã sửa camera thành công")
    return;
  };


  const handleCancel = () => {
    setOpen(false);
  };


  const handleInputChangeFormresolutionCamera = (e) => {
    const resolutionCameraValue = e.target.value.trim();
    if (isNaN(resolutionCameraValue)) {
     
      setResoluTionCameraError("Độ phân giải camera phải là số ");
    } else {
      setResoluTionCameraError("");
      setCameraForm({ ...cameraForm, [e.target.name]: e.target.value });
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
          Sửa camera
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Độ phân giải camera{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="resolutionCamera"
          value={cameraForm.resolutionCamera}
          onChange={(e) => handleInputChangeFormresolutionCamera(e)}
          error={
            (formSubmitted && !cameraForm.resolutionCamera) ||
            !!resolutionCameraError
          }
          helperText={
            resolutionCameraError ||
            (formSubmitted &&
              !cameraForm.resolutionCamera &&
              "Độ phân giải camera không được trống")
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
            Bạn có chắc sửa camera này ?
      </Modal>
    </>
  );
};

export default AddProperty;
