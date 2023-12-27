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
    setOpen(true);
  };


  const handleOk = () => {
    setOpenModalConfirm(false)
    var flag = false;

    if (!ramForm.capacityRam) {
      setFormSubmitted(true);
      setcapacityRamError("Kích thước không được bỏ trống");
      flag = true;
    }

    props.roms.forEach((rom) => {
      if (rom.kichThuocRom === ramForm.capacityRam) {
        setFormSubmitted(true);
        setcapacityRamError(
          "Kích thước ram đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag == true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    request('POST',"/ram/save", ramForm);
    setTimeout(() => {
      props.loadData()
      setLoading(false);
      setOpen(false);
    }, 300);
    showNotification("success", "Bạn đã thêm ram thành công")
    return;
  };


  const handleCancel = () => {
    setOpen(false);
  };


  const handleInputChangeFormcapacityRam = (e) => {
    const capacityRamValue = e.target.value.trim();
    if (isNaN(capacityRamValue)) {
      setcapacityRamError("Độ phân giải ram phải là số ");
    } else {
      setcapacityRamError("");
      setramForm({ ...ramForm, [e.target.name]: e.target.value });
    }
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
          Thêm ram
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
          Thêm ram
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Độ phân giải ram{" "}
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
              "Kích thước rom không được trống")
          }
          style={{ width: "100%" }}
        />

        {/* </Form.Group> */}
      </Modal>

      <Modal
            title="Xác nhận"
            open={openModalConfirm}
            onOk={handleOk}
            onCancel={() => setOpenModalConfirm(false)}
          >
            Bạn có chắc tạo ram này ?
      </Modal>
    </>
  );
};

export default AddProperty;
