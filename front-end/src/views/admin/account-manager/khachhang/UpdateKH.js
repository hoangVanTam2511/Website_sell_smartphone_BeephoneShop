import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Button, Card, Checkbox, Modal, message } from "antd";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFloppyDisk,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ImageUploadComponent from "./AnhUpdate";
import AddressTable from "./HienThiDiaChi";
import ModalAddDiaChiKhachHang from "./ModalAddDiaChiKhachHang";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isModalVisibleS, setIsModalVisibleS] = useState(false);
  const [formSubmittedS, setFormSubmittedS] = useState(false);
  const [submittedS, setSubmittedS] = useState(false);
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
  const [hoVaTenError, setHoVaTenError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [diaChiError, setDiaChiError] = useState("");
  const [sdtError, setSDTError] = useState("");
  const [sdtkhError, setSDTKHError] = useState("");
  const [hoTenkhError, sethoTenKHError] = useState("");
  const handleHoVaTenChange = (e) => {
    const value = e.target.value;
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const trimmedValue = value.replace(/\s/g, "");
    setTen(value);
    if (!value.trim()) {
      setHoVaTenError("Họ và tên không được trống");
    } else if (specialCharPattern.test(value)) {
      setHoVaTenError("Họ và tên không được chứa ký tự đặc biệt");
    } else if (trimmedValue.length < 5) {
      setHoVaTenError("Họ và tên phải có ít nhất 5 ký tự");
    } else {
      setHoVaTenError("");
    }
  };
  const handleSDT = (e) => {
    const value = e.target.value.trim();
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;
    setSdt(value);
    if (!value.trim()) {
      setSDTError("Số điện thoại không được trống");
    } else if (!parn.test(value)) {
      setSDTError("Sai định dạng số điện thoại");
    } else {
      setSDTError("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^[a-zA-Z0-9._-]+@gmail\.com$/i;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("Email không được trống");
    } else if (!parn.test(value)) {
      setEmailError("Email sai định dạng hoặc không phải là Gmail");
    } else {
      setEmailError("");
    }
  };
  //handle diaChi
  const handleHoTenChange = (e) => {
    const value = e.target.value;
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    setHoTenKH(value);
    if (!value.trim()) {
      sethoTenKHError("Họ và tên không được trống");
    } else if (specialCharPattern.test(value)) {
      sethoTenKHError("Họ và tên không được chứa ký tự đặc biệt");
    } else if (value.length < 5) {
      sethoTenKHError("Họ và tên phải có ít nhất 5 ký tự");
    } else {
      sethoTenKHError("");
    }
  };
  const handleSoDienThoaiChange = (e) => {
    const value = e.target.value.trim();
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;
    setSoDienThoaiKhachHang(value);
    if (!value.trim()) {
      setSDTKHError("Số điện thoại không được trống");
    } else if (!parn.test(value)) {
      setSDTKHError("Sai định dạng số điện thoại");
    } else {
      setSDTKHError("");
    }
  };
  const handleDiaChi = (e) => {
    const value = e.target.value;
    setDiaChi(value);
    const trimmedValue = value.replace(/\s/g, "");
    if (!value.trim()) {
      setDiaChiError("Địa chỉ không được trống");
    } else if (trimmedValue.length < 5) {
      setDiaChiError("Địa chỉ phải có ít nhất 5 ký tự");
    } else {
      setDiaChiError("");
    }
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

  const handleCheckboxChange = (e) => {
    setTrangThaiKH(e.target.checked ? 1 : 0); // Nếu tích checkbox thì trangThaiKH là 1, ngược lại là 0
  };
  const redirectToHienThiKH = () => {
    window.location.href = "/update-khach-hang/" + id;
  };
  const redirectTable = () => {
    window.location.href = "/khach-hang/";
  };
  const handleCloseModal = () => {
    setIsModalVisibleS(false);
    redirectToHienThiKH();
  };
  //add diaChi
  const addDiaChiList = () => {
    setSubmittedS(true);
    setFormSubmittedS(true);
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
    if (!hoTenKH || !soDienThoaiKhachHang || !diaChi) {
      message.error("Chưa điền đủ thông tin");
      setIsModalVisibleS(true);
      return; // Stop form submission if any required field is empty
    }
    setIsModalVisibleS(false);
    axios
      .post(`${apiURLKH}/dia-chi/add?id=${id}`, newAddress)
      .then((response) => {
        // let res = response.data;
        // redirectToHienThiKH();
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
        });
        redirectToHienThiKH();
        return;
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
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const showConfirm = () => {
    setIsConfirmVisible(true); // Mở hộp thoại xác nhận
  };

  const showRetable = () => {
    redirectTable();
  };
  const handleCancel = () => {
    setIsConfirmVisible(false); // Đóng hộp thoại xác nhận khi người dùng hủy
  };

  const save = async (id) => {
    setSubmitted(true);
    setFormSubmitted(true);
    if (!hoVaTen || ngaySinh == null || !email || !soDienThoai) {
      message.error("Vui lòng điền đủ thông tin trước khi lưu.");
      setIsConfirmVisible(false);
      return;
    }
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
            message.success("Sửa thành công");
            setIsConfirmVisible(false);
          } else {
            message.error("Sửa thất bại");
            setIsConfirmVisible(false);
          }
        })
        .catch((error) => {
          console.error("Failed to update customer information:", error);
          message.error(
            "An error occurred while updating customer information."
          );
        });
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };
  const today = new Date().toISOString().split("T")[0];
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
                  width: "95%",
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
                    onChange={handleHoVaTenChange}
                    error={(formSubmitted && !hoVaTen) || !!hoVaTenError}
                    helperText={
                      hoVaTenError ||
                      (formSubmitted && !hoVaTen && "Họ và tên trống")
                    }
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
                        inputProps={{
                          max: today, // Set the maximum allowed date to today
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
                    onChange={handleEmailChange}
                    error={(formSubmitted && !email) || !!emailError} // Show error if form submitted and hoVaTen is empty
                    helperText={
                      emailError || (formSubmitted && !email && "Email trống")
                    }
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
                    onChange={handleSDT}
                    error={(formSubmitted && !soDienThoai) || !!sdtError} // Show error if form submitted and hoVaTen is empty
                    helperText={
                      sdtError ||
                      (formSubmitted && !soDienThoai && "Số điện thoại trống")
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              </div>{" "}
            </Card>
          </Grid>{" "}
          <Grid item xs={6}>
            <Card
              title={<span style={{ color: "gray" }}>Thông tin Địa Chỉ </span>}
              bordered={false}
              headStyle={{
                // backgroundColor: "#d5dbfa",
                borderLeft: "4px solid #e2e2e2",
                borderRadius: 0,
              }}
              style={{
                height: "100%", // Set Card height to 100% of its parent container
                overflowY: "auto", // Add a vertical scrollbar when content overflows
                maxHeight: "calc(120vh - 100px)",
              }}
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
                  setIsModalVisibleS(true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> &nbsp; Thêm địa chỉ
              </Button>
              <Modal
                closable={false}
                open={isModalVisibleS}
                onCancel={() => {
                  setIsModalVisibleS(false); // Close the modal when cancel is clicked
                }}
                maskClosable={false}
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
                      error={(formSubmittedS && !hoTenKH) || !!hoTenkhError}
                      helperText={
                        hoTenkhError ||
                        (formSubmittedS && !hoTenKH && "Họ và tên trống")
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
                      error={
                        (formSubmittedS && !soDienThoaiKhachHang) ||
                        !!sdtkhError
                      }
                      helperText={
                        sdtkhError ||
                        (formSubmittedS &&
                          !soDienThoaiKhachHang &&
                          "Số điện thoại trống")
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="text-f" style={{ marginBottom: "30px" }}>
                    <TextField
                      label="Địa chỉ"
                      id="fullWidth"
                      value={diaChi}
                      onChange={handleDiaChi}
                      error={(formSubmittedS && !diaChi) || !!diaChiError}
                      helperText={
                        diaChiError ||
                        (formSubmittedS && !diaChi && "Địa chỉ trống")
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <ModalAddDiaChiKhachHang
                      // onDiaChiChange={handleAddressChange}
                      required={true}
                      submitted={submittedS}
                      onProvinceChange={handleProvinceChange}
                      onDistrictChange={handleDistrictChange}
                      onWardChange={handleWardChange}
                      formSubmitted={formSubmittedS}
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
        <div style={{ marginTop: "10px" }}>
          {" "}
          <Button size={"large"} onClick={showRetable}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ paddingRight: "5px" }}
            />
            Quay lại
          </Button>{" "}
          <div style={{ float: "right" }}>
            <Button type="primary" onClick={showConfirm} size={"large"}>
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{ paddingRight: "5px" }}
              />
              Lưu Khách Hàng{" "}
            </Button>
            <Modal
              title="Xác nhận"
              open={isConfirmVisible}
              onOk={() => save(id)}
              onCancel={handleCancel}
            >
              <p>Bạn có chắc chắn muốn lưu khách hàng?</p>
            </Modal>
          </div>
        </div>
      </Card>
    </>
  );
};
export default UpdateKH;
