import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Button, Card, Checkbox, Modal } from "antd";
import { Collapse } from "antd";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
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
import AddressFormUpdate from "./DiaChiUpdate";
import ImageUploadComponent from "./AnhUpdate";

const { Panel } = Collapse;

const UpdateKH = () => {
  const { id } = useParams();
  let [listNV, setListNV] = useState([]);
  let [hoVaTen, setTen] = useState("");
  let [ngaySinh, setNgaySinh] = useState("");
  let [soDienThoai, setSdt] = useState("");
  let [email, setEmail] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [diaChi, setDiaChi] = useState("");
  let [ma, setMa] = useState("");
  let [matKhau, setMatKhau] = useState("");
  let [trangThai, setTrangThai] = useState(1);
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  // let [diaChiKhachHang, setDiaChiKhachHang] = useState([]);
  let [editing, setEditing] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
        setDiaChi(data.diaChi);
        setXaPhuong(data.xaPhuong);
        setQuanHuyen(data.quanHuyen);
        setTinhThanhPho(data.tinhThanhPho);
      })
      .catch((error) => {
        console.error("Error fetching customer information:", error);
      });
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
  const handleDiaChiChange = (diaChi) => {
    setDiaChi(diaChi); // Cập nhật giá trị diaChi trong thành phần cha
  };
  const handleAnhDaiDienChange = (imageURL) => {
    setAnhDaiDien(imageURL);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
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
  const addDiaChiList = async () => {
    const newDiaChiList = diaChiList.map((diaChi) => ({
      diaChi: diaChi.diaChi,
      xaPhuong: diaChi.xaPhuong,
      tinhThanhPho: diaChi.tinhThanhPho,
      quanHuyen: diaChi.quanHuyen,
      hoTenKH: diaChi.hoTenKH,
      soDienThoai: diaChi.soDienThoai,
      account: id,
    }));

    const diaChiData = {
      diaChiList: newDiaChiList,
    };

    try {
      // Gửi danh sách địa chỉ mới
      await axios.post(apiURLKH + "/dia-chi/add?id=" + id, diaChiData);

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
  const save = async (id) => {
    try {
      const updatedItem = {
        ma: ma,
        hoVaTen: hoVaTen,
        ngaySinh: ngaySinh,
        soDienThoai: soDienThoai,
        xaPhuong: xaPhuong,
        quanHuyen: quanHuyen,
        tinhThanhPho: tinhThanhPho,
        gioiTinh: gioiTinh,
        diaChi: diaChi,
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
            // Show an error message using react-toastify
            toast.error("Failed to update customer information.");
          }
        })
        .catch((error) => {
          console.error("Failed to update customer information:", error);

          // Show an error message using react-toastify
          toast.error("An error occurred while updating customer information.");
        });
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };
  const [showCollapse, setShowCollapse] = useState(true);
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
                    <AddressFormUpdate
                      onDiaChiChange={handleDiaChiChange}
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
              {/* {showCollapse && (
                <Collapse style={{ backgroundColor: "#c6daff" }}>
                  <Panel
                    header={<span>Địa chỉ 1</span>}
                    showArrow={true}
                    bordered={false}
                  >
                    <div
                      className="text-f"
                      style={{ textAlign: "center", marginBottom: "30px" }}
                    >
                      <TextField
                        label="Họ và tên"
                        value={hoVaTen}
                        id="fullWidth"
                        onChange={(e) => {
                          setTen(e.target.value);
                        }}
                        error={formSubmitted && !hoVaTen}
                        helperText={
                          formSubmitted && !hoVaTen && "Họ và tên trống"
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
                        onChange={(e) => {
                          setSdt(e.target.value);
                        }}
                        error={formSubmitted && !soDienThoai}
                        helperText={
                          formSubmitted && !soDienThoai && "Số điện thoại trống"
                        }
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div
                      className="text-f"
                      style={{ textAlign: "center", marginBottom: "30px" }}
                    >
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
                    <div
                      className="text-f"
                      style={{
                        marginBottom: "30px",
                      }}
                    >
                      <AddressFormUpdate
                        onDiaChiChange={handleDiaChiChange}
                        required={true}
                        submitted={submitted}
                        onProvinceChange={handleProvinceChange}
                        onDistrictChange={handleDistrictChange}
                        onWardChange={handleWardChange}
                        selectedTinhThanhPho={tinhThanhPho}
                        selectedQuanHuyen={quanHuyen}
                        selectedXaPhuong={xaPhuong}
                        editing={editing}
                      />
                    </div>
                    <Checkbox>Checkbox</Checkbox>
                    <div className="" style={{ float: "right" }}>
                      <Button
                        style={{
                          backgroundColor: "#4b69ff",
                          borderRadius: "100px",
                          color: "white",
                          width: "30px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                  </Panel>
                </Collapse>
              )} */}
            </Card>
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
