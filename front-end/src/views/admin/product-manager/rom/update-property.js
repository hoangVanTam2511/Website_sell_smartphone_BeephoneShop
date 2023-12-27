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

  const [romForm, setromForm] = useState({
    idRom: "",
    capacityRom: "",
  });
  const [capacityRomError, setcapacityRomError] = useState("");
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
    console.log(props.rom)
    setOpen(true);
    setromForm({
      idRom : props.rom.id,
      capacityRom : props.rom.kichThuocRom
    })
  };


  const handleOk = () => {
    setOpenModalConfirm(false)
    var flag = false;

    if (!romForm.capacityRom) {
      setFormSubmitted(true);
      setcapacityRomError("Kích thước không được bỏ trống");
      flag = true;
    }

    props.roms.forEach((rom) => {
      if (rom.doPhanGiai === romForm.capacityRom) {
        setFormSubmitted(true);
        setcapacityRomError(
          "Kích thước rom đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag == true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    request('POST',"/rom/save", romForm);
    setTimeout(() => {
      props.loadData(props.currentPage)
      setLoading(false);
      setOpen(false);
    }, 300);
    showNotification("success", "Bạn đã sửa rom thành công")
    return;
  };


  const handleCancel = () => {
    setOpen(false);
  };


  const handleInputChangeFormcapacityRom = (e) => {
    const capacityRomValue = e.target.value.trim();
    if (isNaN(capacityRomValue)) {
     
      setcapacityRomError("Kích thước rom phải là số ");
    } else {
      setcapacityRomError("");
      setromForm({ ...romForm, [e.target.name]: e.target.value });
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
          Sửa rom
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Kích thước rom{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="capacityRom"
          value={romForm.capacityRom}
          onChange={(e) => handleInputChangeFormcapacityRom(e)}
          error={
            (formSubmitted && !romForm.capacityRom) ||
            !!capacityRomError
          }
          helperText={
            capacityRomError ||
            (formSubmitted &&
              !romForm.capacityRom &&
              "Kích thước rom không được trống")
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
            Bạn có chắc sửa rom này ?
      </Modal>
    </>
  );
};

export default AddProperty;
