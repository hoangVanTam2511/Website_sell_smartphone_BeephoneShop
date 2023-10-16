import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import TextField from "@mui/material/TextField";
import { FormLabel } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddProperty = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  const [displayForm, setdisplayForm] = useState({
    idDisplay: "",
    sizeDisplay: "",
    resolutionDisplay: "",
  });
  const [sizeDisplayError, setsizeDisplayError] = useState("");
  const [resolutionDisplayError, setresolutionDisplayError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);


  const showNotification = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  
  const handleClick = () => {
    setOpen(true);  
    setresolutionDisplayError("")
    setsizeDisplayError("")
  };


  const handleOk = () => {
    setOpenModalConfirm(false)
    var flag = false;

    if (!displayForm.sizeDisplay) {
      setFormSubmitted(true);
      setsizeDisplayError("Kích thước không được bỏ trống");
      flag = true;
    }

    if (!displayForm.resolutionDisplay) {
      setFormSubmitted(true);
      setsizeDisplayError("Độ phân giải không được bỏ trống");
      flag = true;
    }

    props.displays.forEach((display) => {
      if (display.kichCoManHinh === displayForm.sizeDisplay) {
        setFormSubmitted(true);
        setsizeDisplayError(
          "Kích cỡ màn hình đã tồn tại trong hệ thống"
        );
        flag = true;
      }
      if (display.doPhanGiai === displayForm.resolutionDisplay) {
        setFormSubmitted(true);
        setsizeDisplayError(
          "Độ phân giải màn hình đã tồn tại trong hệ thống"
        );
        flag = true;
      }
    });

    if (flag == true) {
      showNotification("error", "Đã có lỗi.Vui lòng kiểm tra và thử lại")
      return;
    }

    setLoading(true);
    axios.post("http://localhost:8080/man-hinh/save", displayForm);
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


  const handleInputDisplay = (e) => {
    if(e.target.name === "sizeDisplay"){
      var sizeOfDisplayValue = e.target.value
      if(isNaN(sizeOfDisplayValue)){
        setsizeDisplayError("Kích thước màn hình phải là số")
        return;
      }
    }
     
    setsizeDisplayError("");
    setdisplayForm({ ...displayForm, [e.target.name]: e.target.value });
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
          Thêm màn hình
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
          Thêm màn hình
        </h2>

        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Kích cỡ màn hình{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="sizeDisplay"
          value={displayForm.sizeDisplay}
          onChange={(e) => handleInputDisplay(e)}
          error={
            (formSubmitted && !displayForm.sizeDisplay) ||
            !!sizeDisplayError
          }
          helperText={
            sizeDisplayError ||
            (formSubmitted &&
              !displayForm.sizeDisplay &&
              "Kích cỡ màn hình không được trống")
          }
          style={{ width: "100%" }}
        />

        <br/>
        <FormLabel style={{ marginLeft: `9px`, fontSize: `14px` }}>
          {" "}
          Độ phân giải màn hình{" "}
        </FormLabel>
        <TextField
          label=""
          id="fullWidth"
          name="resolutionDisplay"
          value={displayForm.resolutionDisplay}
          onChange={(e) => handleInputDisplay(e)}
          error={
            (formSubmitted && !displayForm.resolutionDisplay) ||
            !!resolutionDisplayError
          }
          helperText={
            resolutionDisplayError ||
            (formSubmitted &&
              !displayForm.resolutionDisplay   &&
              "Độ phân phải màn hình không được trống")
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
            Bạn có chắc tạo màn hình này ?
      </Modal>
    </>
  );
};

export default AddProperty;
