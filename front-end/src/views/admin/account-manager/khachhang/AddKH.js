import { Button, Modal, Card, Checkbox } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../../assets/scss/HienThiNV.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  FormControl,
  FormControlLabel,
  // FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressForm from "./DiaChi";
import ImageUploadComponent from "./Anh";
import { Collapse } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
const { Panel } = Collapse;
const AddKH = () => {
  let [listKH, setListKH] = useState([]);
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [anhDaiDien, setAnhDaiDien] = useState("");
  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      soDienThoai: "",
      hoTenKH: "",
      account: "",
    },
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCollapse, setShowCollapse] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle closing the modal
  const handleAddDiaChi = () => {
    const newAddress = {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      soDienThoai: "",
      hoTenKH: "",
      account: "",
    };

    setDiaChiList([...diaChiList, newAddress]);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const redirectToHienThiKH = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/khach-hang";
  };
  const handleAddressChange = (index, field, value) => {
    const updatedDiaChiList = diaChiList.map((address, idx) => {
      if (idx === index) {
        return { ...address, [field]: value };
      }
      return address;
    });
    setDiaChiList(updatedDiaChiList);
  };
  const AddKH = async () => {
    try {
      // Tạo khách hàng mới với thông tin đã nhập
      const khachHangData = {
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        diaChiList: [], // Bạn có thể để trống danh sách địa chỉ ở đây
        email: email,
        anhDaiDien: anhDaiDien,
      };

      // Gọi API tạo khách hàng mới
      const khachHangResponse = await axios.post(
        apiURLKH + "/add",
        khachHangData
      );

      // Lấy mã khách hàng từ response
      const generatedMaKhachHang = khachHangResponse.data.ma;

      // Thêm các địa chỉ mặc định cho khách hàng
      await addDiaChiList(generatedMaKhachHang);

      // Cập nhật danh sách khách hàng và hiển thị thông báo
      const newKhachHangResponse = {
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        diaChiList: [], // Không cần thêm địa chỉ ở đây vì đã thêm ở bước trước
        email: email,
        anhDaiDien: anhDaiDien,
      };

      setListKH([newKhachHangResponse, ...listKH]);
      toast.info("Thêm khách hàng và địa chỉ thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      redirectToHienThiKH();
    } catch (error) {
      // Xử lý lỗi
      alert("Thêm khách hàng thất bại");
      console.log(error);
    }
  };

  const addDiaChiList = async (generatedMaKhachHang) => {
    const newDiaChiList = diaChiList.map((diaChi) => ({
      diaChi: diaChi.diaChi,
      xaPhuong: diaChi.xaPhuong,
      tinhThanhPho: diaChi.tinhThanhPho,
      quanHuyen: diaChi.quanHuyen,
      hoTenKH: diaChi.hoTenKH,
      soDienThoai: diaChi.soDienThoai,
      account: generatedMaKhachHang.ma,
    }));

    const diaChiData = {
      diaChiList: newDiaChiList,
    };

    try {
      // Gửi danh sách địa chỉ mới
      await axios.post(
        apiURLKH + "/dia-chi/add?ma=" + generatedMaKhachHang.ma,
        diaChiData
      );

      // Thành công: cập nhật danh sách địa chỉ và hiển thị thông báo
      setDiaChiList(newDiaChiList);
      toast.info("Thêm địa chỉ thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      // Xử lý lỗi
      alert("Thêm địa chỉ thất bại");
      console.log(error);
    }
  };
  // const handleAddDiaChi = (newDiaChi) => {
  //   setDiaChiList([...diaChiList, newDiaChi]);
  // };
  const handleProvinceChange = (index, value) => {
    handleAddressChange(index, "tinhThanhPho", value);
  };
  const handleDistrictChange = (index, value) => {
    handleAddressChange(index, "quanHuyen", value);
  };
  const handleWardChange = (index, value) => {
    handleAddressChange(index, "xaPhuong", value);
    // ... (rest of the function)
  };
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  // const checkCollapse1Filled = () => {
  //   for (let i = 0; i < diaChiList.length - 1; i++) {
  //     if (
  //       !diaChiList[i].hoTenKH ||
  //       !diaChiList[i].soDienThoai ||
  //       !diaChiList[i].diaChi
  //     ) {
  //       return false; // If any collapse is not filled, return false
  //     }
  //   }
  //   return true;
  // };
  // useEffect(() => {
  //   setIsCollapse1Filled(checkCollapse1Filled());
  // }, [diaChiList]);
  return (
    <>
      <Card bordered="false" style={{ width: "100%" }}>
        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={5.4}>
            <Card
              title={
                <span style={{ color: "gray" }}>Thông tin Khách Hàng</span>
              }
              bordered="false"
              headStyle={{ borderLeft: "4px solid #e2e2e2", borderRadius: 0 }}
            >
              {/* <Grid item xs={8}> */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                <ImageUploadComponent
                  setAnhDaiDien={handleAnhDaiDienChange}
                  hoten={hoVaTen}
                />
              </div>
              {/* </Grid> */}
              <div style={{ width: "100%", float: "left" }}>
                <div
                  className="text-f"
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  <TextField
                    label="Họ và tên"
                    value={hoVaTen}
                    id="fullWidth"
                    onChange={(e) => {
                      setTen(e.target.value);
                    }}
                    error={formSubmitted && !hoVaTen}
                    helperText={formSubmitted && !hoVaTen && "Họ và tên trống"}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "right" }}>
                  <div
                    className="text-f"
                    style={{
                      marginBottom: "15px",
                      textAlign: "left",
                      width: "47%",
                    }}
                  >
                    {/* Ngày sinh */}
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": {
                          mt: 2,
                          width: "100%",
                          mb: 2,
                        },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="Ngày sinh"
                        type="date"
                        value={ngaySinh}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setNgaySinh(e.target.value); // Cập nhật giá trị ngaySinh sau khi thay đổi
                        }}
                        error={formSubmitted && !ngaySinh} // Show error if form submitted and hoVaTen is empty
                        helperText={
                          formSubmitted && !ngaySinh && "Ngày sinh trống"
                        }
                      />
                    </Box>
                  </div>
                  <div
                    className="text-f"
                    style={{
                      marginBottom: "15px",
                      marginLeft: "50px",
                      marginTop: "20px",
                    }}
                  >
                    {/* Giới tính */}
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="gioiTinh"
                        name="gioiTinh"
                        value={gioiTinh}
                        onChange={(e) => {
                          setGioiTinh(e.target.value === "true"); // Convert the string to a boolean value
                        }}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio style={{ borderRadius: "50%" }} />} // Add border radius to the radio button
                          label="Nam"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio style={{ borderRadius: "50%" }} />} // Add border radius to the radio button
                          label="Nữ"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <div
                  className="text-f"
                  style={{ textAlign: "center", marginBottom: "30px" }}
                >
                  <TextField
                    label="Email"
                    value={email}
                    // id="fullWidth"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    error={formSubmitted && !email} // Show error if form submitted and hoVaTen is empty
                    helperText={formSubmitted && !email && "Email trống"}
                    style={{ width: "100%" }}
                  />
                </div>
                <div
                  className="text-f"
                  style={{ textAlign: "center", marginBottom: "30px" }}
                >
                  <TextField
                    label="Số điện thoại"
                    id="fullWidth"
                    value={soDienThoai}
                    onChange={(e) => {
                      setSdt(e.target.value);
                    }}
                    error={formSubmitted && !soDienThoai} // Show error if form submitted and hoVaTen is empty
                    helperText={
                      formSubmitted && !soDienThoai && "Số điện thoại trống"
                    }
                    style={{ width: "100%" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "center",
                      // marginLeft: "10px",
                    }}
                  >
                    {/* <ImageUploadComponent
                      setAnhDaiDien={handleAnhDaiDienChange}
                    /> */}
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              title={<span style={{ color: "gray" }}>Thông tin Địa Chỉ </span>}
              bordered="false"
              headStyle={{
                // backgroundColor: "#d5dbfa",
                borderLeft: "4px solid #e2e2e2",
                borderRadius: 0,
              }}
              style={{ borderRadius: 0 }}
            >
              <Button
                style={{
                  backgroundColor: "#4b69ff",
                  color: "white",
                  float: "right",
                }}
                size="large"
                onClick={() => {
                  setIsModalVisible(true);
                  handleAddDiaChi(); // Open the modal when the button is clicked
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> &nbsp; Thêm địa chỉ
              </Button>

              <Modal
                closable={false}
                open={isModalVisible}
                onCancel={() => {
                  setIsModalVisible(false); // Close the modal when cancel is clicked
                }}
                footer={[
                  <React.Fragment key="modal-footer">
                    <Button
                      onClick={handleCloseModal}
                      size="large"
                      type="text"
                      style={{
                        borderRadius: 0,
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={(generatedMaKhachHang) => {
                        const newDiaChi = {
                          diaChi: diaChiList[diaChiList.length - 1].diaChi,
                          xaPhuong: diaChiList[diaChiList.length - 1].xaPhuong,
                          tinhThanhPho:
                            diaChiList[diaChiList.length - 1].tinhThanhPho,
                          quanHuyen:
                            diaChiList[diaChiList.length - 1].quanHuyen,
                          hoTenKH: diaChiList[diaChiList.length - 1].hoTenKH,
                          soDienThoai:
                            diaChiList[diaChiList.length - 1].soDienThoai,
                          account: generatedMaKhachHang.ma,
                        };
                        handleAddDiaChi(newDiaChi);
                        addDiaChiList([...diaChiList]);
                        setIsModalVisible(false); // Đóng modal sau khi thêm
                      }}
                      size="large"
                      style={{
                        marginRight: "10px",

                        borderRadius: 0,
                        backgroundColor: "#4b69ff",
                        color: "white",
                      }}
                      bordered="false"
                    >
                      Lưu
                    </Button>
                  </React.Fragment>,
                ]} // Hide default footer buttons
              >
                <div>
                  <h4 style={{ color: "gray" }}>Địa chỉ mới</h4>
                  <div
                    className="text-f"
                    style={{ marginBottom: "30px", marginTop: "25px" }}
                  >
                    <TextField
                      label="Họ và tên"
                      value={diaChiList[diaChiList.length - 1].hoTenKH}
                      id="fullWidth"
                      onChange={(e) => {
                        const updatedDiaChiList = [...diaChiList];
                        updatedDiaChiList[diaChiList.length - 1].hoTenKH =
                          e.target.value;
                        setDiaChiList(updatedDiaChiList);
                      }}
                      error={
                        formSubmitted &&
                        !diaChiList[diaChiList.length - 1].hoTenKH
                      }
                      helperText={
                        formSubmitted &&
                        !diaChiList[diaChiList.length - 1].hoTenKH &&
                        "Họ và tên trống"
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="text-f" style={{ marginBottom: "30px" }}>
                    <TextField
                      label="Số điện thoại"
                      id="fullWidth"
                      value={diaChiList[diaChiList.length - 1].soDienThoai}
                      onChange={(e) => {
                        const updatedDiaChiList = [...diaChiList];
                        updatedDiaChiList[diaChiList.length - 1].soDienThoai =
                          e.target.value;
                        setDiaChiList(updatedDiaChiList);
                      }}
                      error={
                        formSubmitted &&
                        !diaChiList[diaChiList.length - 1].soDienThoai
                      }
                      helperText={
                        formSubmitted &&
                        !diaChiList[diaChiList.length - 1].soDienThoai &&
                        "Số điện thoại trống"
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="text-f" style={{ marginBottom: "30px" }}>
                    <TextField
                      label="Địa chỉ"
                      id="fullWidth"
                      value={diaChiList[diaChiList.length - 1].diaChi}
                      onChange={(e) => {
                        const updatedDiaChiList = [...diaChiList];
                        updatedDiaChiList[diaChiList.length - 1].diaChi =
                          e.target.value;
                        setDiaChiList(updatedDiaChiList);
                      }}
                      error={
                        formSubmitted &&
                        !diaChiList[diaChiList.length - 1].diaChi
                      }
                      helperText={
                        formSubmitted &&
                        !diaChiList[diaChiList.length - 1].diaChi &&
                        "Địa chỉ trống"
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <AddressForm
                      onDiaChiChange={handleAddressChange}
                      required={true}
                      submitted={submitted}
                      onProvinceChange={(value) =>
                        handleProvinceChange(diaChiList.length - 1, value)
                      }
                      onDistrictChange={(value) =>
                        handleDistrictChange(diaChiList.length - 1, value)
                      }
                      onWardChange={(value) =>
                        handleWardChange(diaChiList.length - 1, value)
                      }
                      selectedTinhThanhPho={
                        diaChiList[diaChiList.length - 1].tinhThanhPho
                      }
                      selectedQuanHuyen={
                        diaChiList[diaChiList.length - 1].quanHuyen
                      }
                      selectedXaPhuong={
                        diaChiList[diaChiList.length - 1].xaPhuong
                      }
                    />
                  </div>
                  <Checkbox
                    size="large"
                    style={{
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Địa chỉ mặc định
                  </Checkbox>{" "}
                </div>
              </Modal>
              <div
                className=""
                style={{ marginBottom: "20px", float: "right" }}
              ></div>
            </Card>
          </Grid>{" "}
        </Grid>
        <div style={{ marginRight: "20px", float: "right" }}>
          <Button type="primary" onClick={AddKH} size={"large"}>
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ paddingRight: "5px" }}
            />
            Lưu Khách Hàng{" "}
          </Button>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Card>
    </>
  );
};

export default AddKH;
