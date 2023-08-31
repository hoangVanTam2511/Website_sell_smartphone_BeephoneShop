import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Button, Card, Checkbox, Modal, message } from "antd";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ImageUploadComponent from "./AnhUpdate";
import AddressForm from "./DiaChi";
import AddressTable from "./HienThiDiaChi";
import AddressFormUpdate from "./DiaChiUpdate";

const UpdateKH = () => {
  const { id } = useParams();
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [hoTenKH, setHoTenKH] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [diaChi, setDiaChi] = useState("");
  let [soDienThoaiKhachHang, setSoDienThoaiKhachHang] = useState("");
  let [id1, setId] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [ma, setMa] = useState("");
  let [matKhau, setMatKhau] = useState("");
  let [trangThai, setTrangThai] = useState(1);
  let [trangThaiKH, setTrangThaiKH] = useState(0); // Khởi tạo mặc định là 0
  let [anhDaiDien, setAnhDaiDien] = useState("");
  const [diaChiList, setDiaChiList] = useState([
    {
      diaChi: "",
      xaPhuong: "",
      tinhThanhPho: "",
      quanHuyen: "",
      soDienThoaiKhachHang: "",
      hoTenKH: "",
      account: id,
      id: "",
      trangThai: trangThaiKH,
    },
  ]);

  useEffect(() => {
    fetchDiaChiList();
  }, []);

  //hiển thị diaChi
  const fetchDiaChiList = async () => {
    try {
      const response = await fetch(apiURLKH + "/dia-chi/hien-thi/" + id);
      const data = await response.json();
      setDiaChiList(data);
    } catch (error) {
      console.error("Error fetching dia chi list:", error);
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  //fetch detail khachHang
  useEffect(() => {
    getKHById(id);
  }, [id]);
  const getKHById = (id) => {
    axios
      .get(apiURLKH + `/hien-thi-theo/${id}`)
      .then((response) => {
        const data = response.data;
        setMa(data.ma);
        setGioiTinh(data.gioiTinh);
        setTen(data.hoVaTen);
        setNgaySinh(data.ngaySinh);
        setMatKhau(data.matKhau);
        setTrangThai(data.trangThai);
        setAnhDaiDien(data.anhDaiDien);
        setEmail(data.email);
        setSdt(data.soDienThoai);
      })
      .catch((error) => {
        console.error("Error fetching customer information:", error);
      });
  };
  //validate diaChi
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmptySDT, setIsEmptySDT] = useState(false);
  const [isEmptyDiaChiKH, setIsEmptyDiaChiKH] = useState(false);
  let [showSpecialCharWarning, setShowSpecialCharWarning] = useState(false);
  let [sdtWarning, setSdtWarning] = useState(false);

  const hasSpecialCharacter = (str) => {
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharPattern.test(str);
  };
  const checkSpecialCharacterWarning = (inputValue) => {
    setShowSpecialCharWarning(hasSpecialCharacter(inputValue));
  };
  const checkPhoneNumberWarning = (inputValue) => {
    setSdtWarning(validatePhoneNumber(inputValue));
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^(\\+?84|0)\\d{9,10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };
  //handle diaChi
  const handleHoTenChange = (e) => {
    const inputValue = e.target.value;
    setHoTenKH(inputValue);
    setIsEmpty(false);
    if (inputValue.trim() === "") {
      setIsEmpty(true);
    }
  };
  const handleSoDienThoaiChange = (e) => {
    const inputValue = e.target.value;
    setSoDienThoaiKhachHang(inputValue);
    setIsEmptySDT(false);

    if (inputValue.trim() === "") {
      setIsEmptySDT(true);
    }
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
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleCheckboxChange = (e) => {
    setTrangThaiKH(e.target.checked ? 1 : 0); // Nếu tích checkbox thì trangThaiKH là 1, ngược lại là 0
  };
  const redirectToHienThiKH = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/update-khach-hang/" + id;
  };
  //add diaChi
  const addDiaChiList = () => {
    setFormSubmitted(true);
    setSubmitted(true);
    let newAddress = {
      diaChi: diaChi,
      xaPhuong: xaPhuong,
      quanHuyen: quanHuyen,
      tinhThanhPho: tinhThanhPho,
      soDienThoaiKhachHang: soDienThoaiKhachHang,
      hoTenKH: hoTenKH,
      account: id,
      id: id1,
      trangThai: trangThaiKH,
    };
    if (
      !hoTenKH ||
      !soDienThoaiKhachHang ||
      isEmpty ||
      isEmptySDT ||
      !tinhThanhPho ||
      !diaChi ||
      !quanHuyen ||
      !xaPhuong ||
      isEmptyDiaChiKH
    ) {
      message.error("Chưa điền đủ thông tin");
      setIsModalVisible(true);
      return; // Stop form submission if any required field is empty
    }

    if (
      hasSpecialCharacter(hoTenKH) ||
      validatePhoneNumber(soDienThoaiKhachHang)
    ) {
      message.error("Thông tin không hợp lệ");
      setIsModalVisible(true);
      return;
    }
    setIsModalVisible(false);
    axios
      .post(`${apiURLKH}/dia-chi/add?id=${id}`, newAddress)
      .then((response) => {
        // let res = response.data;
        redirectToHienThiKH();
        let newKhachHangResponse = {
          diaChi: diaChi,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
          tinhThanhPho: tinhThanhPho,
          soDienThoaiKhachHang: soDienThoaiKhachHang,
          hoTenKH: hoTenKH,
          account: id,
          id: id1,
          trangThai: trangThaiKH,
        };
        setDiaChiList([newKhachHangResponse, ...diaChiList]);

        setId(response.data.id);
        message.success({
          content: "Thêm địa chỉ thành công",
          //   style: {
          //     position: "absolute",
          //     top: "10px",
          //     right: "10px",
          //     background: "#1890ff", // Màu xanh biển
          //     color: "white", // Màu chữ trắng
          //   },
        });
      })
      .catch((error) => {
        alert("Thêm thất bại");
        console.log("hahah");
      });
  };
  //update diaChi
  const updateDiaChiList = (updatedList) => {
    setDiaChiList(updatedList);
  };
  const save = async (id) => {
    try {
      const updatedItem = {
        ma: ma,
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        gioiTinh: gioiTinh,
        // diaChi: diaChi,
        email: email,
        anhDaiDien: anhDaiDien,
        trangThai: trangThai,
        matKhau: matKhau,
      };

      axios
        .put(`${apiURLKH}/update/${id}`, updatedItem)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Customer information updated successfully!");
          } else {
            toast.error("Failed to update customer information.");
          }
        })
        .catch((error) => {
          console.error("Failed to update customer information:", error);
          toast.error("An error occurred while updating customer information.");
        });
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };
  return (
    <>
      {" "}
      <Card bordered={false} style={{ width: "100%" }}>
        <Grid container justifyContent="space-between">
          {/* Left column */}
          <Grid item xs={5.4}>
            <Card
              title={
                <span style={{ color: "gray" }}>Thông tin Khách Hàng</span>
              }
              bordered={false}
              headStyle={{ borderLeft: "4px solid #e2e2e2", borderRadius: 0 }}
            >
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
                  existingImageUrl={anhDaiDien}
                  hoten={hoVaTen}
                />
              </div>
              <div style={{ width: "100%" }}>
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
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              title={<span style={{ color: "gray" }}>Thông tin Địa Chỉ </span>}
              bordered={false}
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
                  marginBottom: "20px",
                }}
                size="large"
                onClick={() => {
                  setIsModalVisible(true);
                  // handleAddressChange(); // Open the modal when the button is clicked
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
                      onClick={() => {
                        // add();
                        addDiaChiList();
                        // Đóng modal sau khi thêm
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
                      value={hoTenKH}
                      id="fullWidth"
                      onChange={handleHoTenChange}
                      onInput={(e) =>
                        checkSpecialCharacterWarning(e.target.value)
                      }
                      maxlength="30"
                      error={
                        formSubmitted &&
                        (!hoTenKH || hasSpecialCharacter(hoTenKH) || isEmpty)
                      }
                      helperText={
                        (formSubmitted && !hoTenKH && "Họ và tên trống") ||
                        (isEmpty && "Họ và tên trống") ||
                        (showSpecialCharWarning &&
                          "Họ và tên không được chứa ký tự đặc biệt")
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="text-f" style={{ marginBottom: "30px" }}>
                    <TextField
                      label="Số điện thoại"
                      id="fullWidth"
                      value={soDienThoaiKhachHang}
                      onChange={handleSoDienThoaiChange}
                      onInput={(e) => checkPhoneNumberWarning(e.target.value)}
                      error={
                        formSubmitted &&
                        (!soDienThoaiKhachHang ||
                          validatePhoneNumber(soDienThoaiKhachHang) ||
                          isEmptySDT)
                      }
                      helperText={
                        (formSubmitted &&
                          !soDienThoaiKhachHang &&
                          "Số điện thoại trống") ||
                        (isEmptySDT && "Số điện thoại trống") ||
                        (sdtWarning && "Số điện thoại không đúng định dạng")
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
                        const inputValue = e.target.value;
                        setIsEmptyDiaChiKH(false);

                        if (inputValue.trim() === "") {
                          setIsEmptyDiaChiKH(true);
                        }
                      }}
                      error={(formSubmitted && !diaChi) || isEmptyDiaChiKH}
                      helperText={
                        (formSubmitted && !diaChi && "Địa chỉ trống") ||
                        (isEmptyDiaChiKH && "Địa chỉ trống")
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <AddressFormUpdate
                      // onDiaChiChange={handleAddressChange}
                      required={true}
                      submitted={submitted}
                      onProvinceChange={handleProvinceChange}
                      onDistrictChange={handleDistrictChange}
                      onWardChange={handleWardChange}
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <Checkbox
                    size="large"
                    style={{
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                    onChange={handleCheckboxChange}
                  >
                    Địa chỉ mặc định
                  </Checkbox>{" "}
                </div>
              </Modal>
              <div style={{ clear: "both" }}>
                <AddressTable
                  diaChiList={diaChiList}
                  account={id}
                  updateDiaChiList={updateDiaChiList}
                />
              </div>{" "}
            </Card>{" "}
          </Grid>{" "}
        </Grid>

        <div style={{ marginRight: "20px", float: "right" }}>
          <Button type="primary" onClick={() => save(id)} size={"large"}>
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
export default UpdateKH;
