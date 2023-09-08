import { Button, Modal, Card, Checkbox, message } from "antd";
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
  let [hoTenKH, setHoTenKH] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [diaChi, setDiaChi] = useState("");
  let [soDienThoaiKhachHang, setSoDienThoaiKhachHang] = useState("");
  let [id1, setId] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [trangThaiKH, setTrangThaiKH] = useState(1); // Khởi tạo mặc định là 0

  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      soDienThoaiKhachHang: "",
      hoTenKH: "",
      account: "",
      id: "",
      trangThaiKH: "",
    },
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showConfirm = () => {
    setShowConfirmModal(true);
  };

  const redirectToHienThiKH = (generatedMaKhachHang) => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/update-khach-hang/" + generatedMaKhachHang;
  };
  const handleAddressChange = (result) => {
    setDiaChi(result); // Cập nhật giá trị diaChi trong thành phần cha
  };
  const handleProvinceChange = (value) => {
    setTinhThanhPho(value);
  };

  const handleDistrictChange = (value) => {
    setQuanHuyen(value);
  };

  const handleWardChange = (value) => {
    setXaPhuong(value);
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
      const generatedMaKhachHang = khachHangResponse.data.id;

      // Thêm các địa chỉ mặc định cho khách hàng
      await addDiaChiList(generatedMaKhachHang);
      redirectToHienThiKH(generatedMaKhachHang);

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
      message.success({
        content: "Thêm khách hàng thành công",
      });

      // redirectToHienThiKH();
    } catch (error) {
      // Xử lý lỗi
      alert("Thêm khách hàng thất bại");
      console.log(error);
    }
  };

  const addDiaChiList = (generatedMaKhachHang) => {
    let newAddress = {
      diaChi: diaChi,
      xaPhuong: xaPhuong,
      quanHuyen: quanHuyen,
      tinhThanhPho: tinhThanhPho,
      soDienThoaiKhachHang: soDienThoaiKhachHang,
      hoTenKH: hoTenKH,
      account: generatedMaKhachHang,
      trangThai: trangThaiKH,
    };
    axios
      .post(`${apiURLKH}/dia-chi/add?id=${generatedMaKhachHang}`, newAddress)
      .then((response) => {
        // let res = response.data;
        let newKhachHangResponse = {
          diaChi: diaChi,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          soDienThoaiKhachHang: soDienThoaiKhachHang,
          hoTenKH: hoTenKH,
          account: generatedMaKhachHang,
          trangThai: trangThaiKH,
        };
        setDiaChiList([newKhachHangResponse, ...diaChiList]);
        setId(response.data.id);
        // toast.info("Add success!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      })
      .catch((error) => {
        alert("Thêm thất bại");
        console.log("hahah");
      });
  };

  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  return (
    <>
      <Card bordered="false" style={{ width: "100%" }}>
        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={5.3}>
            <Card
              title={
                <span style={{ color: "gray" }}>Thông tin Khách Hàng</span>
              }
              bordered="false"
              headStyle={{ borderLeft: "4px solid #e2e2e2", borderRadius: 0 }}
            >
              <div style={{ width: "90%", margin: "0 auto" }}>
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
                <div
                  className="text-f"
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
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
                    }}
                  ></div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              title={
                <span style={{ color: "gray" }}>
                  Thông tin Địa chỉ mặc định
                </span>
              }
              bordered="false"
              headStyle={{
                borderLeft: "4px solid #e2e2e2",
                borderRadius: 0,
              }}
              style={{ borderRadius: 0 }}
            >
              {/* <h4 style={{ color: "gray" }}>Địa chỉ mặc định</h4> */}

              <div style={{ width: "95%", margin: "0 auto" }}>
                <div
                  className="text-f"
                  style={{ marginBottom: "30px", marginTop: "20px" }}
                >
                  <TextField
                    label="Họ và tên"
                    value={hoTenKH}
                    id="fullWidth"
                    onChange={(e) => {
                      setHoTenKH(e.target.value);
                    }}
                    error={formSubmitted && hoTenKH}
                    helperText={formSubmitted && hoTenKH && "Họ và tên trống"}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="text-f" style={{ marginBottom: "30px" }}>
                  <TextField
                    label="Số điện thoại"
                    id="fullWidth"
                    value={soDienThoaiKhachHang}
                    onChange={(e) => {
                      setSoDienThoaiKhachHang(e.target.value);
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
                    value={diaChi}
                    onChange={(e) => {
                      setDiaChi(e.target.value);
                    }}
                    error={formSubmitted && !diaChi}
                    helperText={formSubmitted && !diaChi && "Địa chỉ trống"}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <AddressForm
                    onDiaChiChange={handleAddressChange}
                    required={true}
                    submitted={submitted}
                    onProvinceChange={handleProvinceChange}
                    onDistrictChange={handleDistrictChange}
                    onWardChange={handleWardChange}
                  />
                </div>
                {/* <Checkbox
                  size="large"
                  style={{
                    fontSize: "16px",
                    marginBottom: "20px",
                  }}
                  // onChange={handleCheckboxChange}
                >
                  Địa chỉ mặc định
                </Checkbox>{" "} */}
              </div>
            </Card>
          </Grid>{" "}
        </Grid>
        <div style={{ marginRight: "20px", float: "right" }}>
          <Button type="primary" onClick={showConfirm} size={"large"}>
            <FontAwesomeIcon
              icon={faFloppyDisk}
              style={{ paddingRight: "5px" }}
            />
            Lưu Khách Hàng{" "}
          </Button>
          <Modal
            title="Xác nhận"
            open={showConfirmModal}
            onOk={AddKH}
            onCancel={() => setShowConfirmModal(false)}
          >
            Bạn có chắc muốn lưu khách hàng?
          </Modal>
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
