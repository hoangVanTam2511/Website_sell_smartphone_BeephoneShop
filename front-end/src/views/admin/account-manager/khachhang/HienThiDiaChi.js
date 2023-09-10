import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Collapse, Modal, Row, message } from "antd";
import "../../../../assets/scss/edit-dia-chi.scss";
import { apiURLKH } from "../../../../service/api";
import axios from "axios";
import AddressFormUpdate from "./DiaChiUpdate";
import { TextField } from "@mui/material";

function AddressTable({ diaChiList, account, updateDiaChiList }) {
  const { Panel } = Collapse;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  let [hoTenKH, setHoTenKH] = useState("");
  let [quanHuyen, setQuanHuyen] = useState("");
  let [tinhThanhPho, setTinhThanhPho] = useState("");
  let [diaChi, setDiaChi] = useState("");
  let [soDienThoaiKhachHang, setSoDienThoaiKhachHang] = useState("");
  let [xaPhuong, setXaPhuong] = useState("");
  let [trangThaiKH, setTrangThaiKH] = useState(1);
  let [idKH, setIDKH] = useState("");
  const [editingTrangThai, setEditingTrangThai] = useState(trangThaiKH === 1);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [showEditModals, setShowEditModals] = useState(
    Array(diaChiList.length).fill(false)
  );
  const openEditModal = (diaChiList) => {
    setHoTenKH(diaChiList.hoTenKH);
    setXaPhuong(diaChiList.xaPhuong);
    setQuanHuyen(diaChiList.quanHuyen);
    setTinhThanhPho(diaChiList.tinhThanhPho);
    setDiaChi(diaChiList.diaChi);
    setSoDienThoaiKhachHang(diaChiList.soDienThoaiKhachHang);
    setTrangThaiKH(diaChiList.trangThai);
    setEditingAddressIndex(diaChiList.id);
    setShowEditModal(true);
    setEditingTrangThai(diaChiList.trangThai === 1);
    setIDKH(diaChiList.id);
    setEditingAddressIndex(diaChiList.id);
    setShowEditModals((prevModals) => {
      const updatedModals = [...prevModals];
      updatedModals[diaChiList.id] = true;
      return updatedModals;
    });
  };
  const handleDelete = (diaChiList) => {
    setDeleteId(diaChiList.id);
    setShowDeleteModal(true);
  };
  const redirectToHienThiKH = () => {
    // Thực hiện điều hướng tới trang "Hiển thị nhân viên"
    window.location.href = "/update-khach-hang/" + account;
  };
  const confirmDelete = (id) => {
    // Gọi API xóa địa chỉ ở đây
    fetch(apiURLKH + `/dia-chi/delete?id=${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        message.success("Xóa thành công");
        // Cập nhật diaChiList bằng cách gọi callback function
        const updatedDiaChiList = diaChiList.filter(
          (address) => address.id !== id
        );
        updateDiaChiList(updatedDiaChiList);
        setShowDeleteModal(false);
      } else {
        message.error("Lỗi khi xóa địa chỉ");
      }
    });
  };
  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowSetDefaultModal(false);
  };
  function sortAddressesByDefaultFirst(addresses) {
    const defaultAddresses = addresses.filter(
      (address) => address.trangThai === 1
    );
    const nonDefaultAddresses = addresses.filter(
      (address) => address.trangThai !== 1
    );
    return [...defaultAddresses, ...nonDefaultAddresses];
  }
  const sortedDiaChiList = sortAddressesByDefaultFirst(diaChiList);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEdit = (index) => {
    setEditingAddressIndex(index.id);
    handleCloseModals(); // Close any open modals
    setShowEditModal(true);
    // redirectToHienThiKH();
  };
  const [showSetDefaultModal, setShowSetDefaultModal] = useState(false);
  const handleSaveChanges = async (id) => {
    // Gọi API để cập nhật thông tin địa chỉ
    try {
      const updatedItem = {
        diaChi: diaChi,
        xaPhuong: xaPhuong,
        quanHuyen: quanHuyen,
        tinhThanhPho: tinhThanhPho,
        soDienThoaiKhachHang: soDienThoaiKhachHang,
        hoTenKH: hoTenKH,
        account: account,
      };

      axios
        .put(
          `${apiURLKH}/dia-chi/update/${id}`, // Extract id from updatedData
          updatedItem
        )
        .then((response) => {
          if (response.status === 200) {
            message.success("Cập nhật địa chỉ thành công");
            // Cập nhật thông tin trong danh sách diaChiList
            const updatedDiaChiList = diaChiList.map((address) =>
              address.id === id ? { ...address, ...updatedItem } : address
            );
            updateDiaChiList(updatedDiaChiList);
            setShowEditModal(false);
            console.log(updatedDiaChiList);
          }
        }); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      // Xử lý lỗi
      message.error("Cập nhật địa chỉ thất bại");
    }
  };
  const handleSetDefault = (id) => {
    // Gọi API để thiết lập địa chỉ mặc định
    fetch(apiURLKH + `/dia-chi/thiet-lap-md/${id}?account=${account}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          message.success("Thiết lập địa chỉ mặc định thành công");
          const updatedDiaChiList = diaChiList.map((address) =>
            address.id === id
              ? { ...address, trangThai: 1 }
              : { ...address, trangThai: 0 }
          );
          updateDiaChiList(updatedDiaChiList);
          setShowSetDefaultModal(false); // Đóng modal sau khi cập nhật thành công
        } else {
          message.error("Lỗi khi thiết lập địa chỉ mặc định");
        }
      })
      .catch((error) => {
        message.error("Lỗi khi thiết lập địa chỉ mặc định");
      });
  };
  const handleHoTenKHChange = (e) => {
    setHoTenKH(e.target.value);
  };

  const handleSoDienThoaiChange = (e) => {
    setSoDienThoaiKhachHang(e.target.value);
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
  return (
    <div className="address-container">
      <Collapse accordion bordered={false}>
        {sortedDiaChiList.map((diaChiList, index) => (
          <Panel
            key={diaChiList.id}
            header={`Địa chỉ ${index + 1}`}
            className="collapse-panel"
          >
            <Row gutter={20}>
              <Col span={17}>
                <div className="address-content">
                  <div className="address-field">
                    <span className="field-value">
                      {diaChiList.hoTenKH} |{" "}
                      <span style={{ color: "gray" }}>
                        {diaChiList.soDienThoaiKhachHang}
                      </span>
                    </span>
                  </div>
                  <div className="address-field">
                    <div className="field-value">{diaChiList.diaChi}</div>{" "}
                    {diaChiList.tinhThanhPho} {diaChiList.quanHuyen}{" "}
                    {diaChiList.xaPhuong}
                  </div>
                </div>{" "}
                {diaChiList.trangThai === 1 && (
                  <Button
                    danger
                    size="small"
                    style={{ marginTop: "10px", paddingBottom: "25px" }}
                  >
                    Mặc định
                  </Button>
                )}
              </Col>
              <Col span={7}>
                <div className="address-actions">
                  <button
                    className="edit-button"
                    onClick={() => {
                      // handleViewUpdate(index);
                      openEditModal(diaChiList);
                      handleEdit(diaChiList);
                    }}
                  >
                    Sửa
                  </button>
                  {showEditModals[diaChiList.id] && (
                    <Modal
                      open={showEditModal}
                      onCancel={() => setShowEditModal(false)}
                      footer={[
                        <Button
                          key="cancel"
                          onClick={() => setShowEditModal(false)}
                          size="large"
                          type="text"
                          style={{
                            borderRadius: 0,
                          }}
                        >
                          Hủy
                        </Button>,
                        <Button
                          key="save"
                          type="primary"
                          onClick={() => handleSaveChanges(idKH)}
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
                        </Button>,
                      ]}
                      width={600}
                      height={900}
                    >
                      <div style={{ width: "95%", margin: "0 auto" }}>
                        <h4 style={{ color: "gray" }}>Sửa địa chỉ</h4>
                        <div
                          className="text-f"
                          style={{ marginBottom: "30px", marginTop: "30px" }}
                        >
                          <TextField
                            label="Họ và tên"
                            value={hoTenKH}
                            id="fullWidth"
                            onChange={handleHoTenKHChange}
                            // error={formSubmitted && !hoTenKH}
                            // helperText={
                            //   formSubmitted && !hoTenKH && "Họ và tên trống"
                            // }
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div
                          className="text-f"
                          style={{ marginBottom: "30px" }}
                        >
                          <TextField
                            label="Số điện thoại"
                            id="fullWidth"
                            value={soDienThoaiKhachHang}
                            onChange={handleSoDienThoaiChange}
                            //   error={formSubmitted && !soDienThoaiKhachHang}
                            //   helperText={
                            //     formSubmitted &&
                            //     !soDienThoaiKhachHang &&
                            //     "Số điện thoại trống"
                            //   }
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div
                          className="text-f"
                          style={{ marginBottom: "30px" }}
                        >
                          <TextField
                            label="Địa chỉ"
                            id="fullWidth"
                            value={diaChi}
                            onChange={(e) => {
                              setDiaChi(e.target.value);
                            }}
                            //   error={formSubmitted && !diaChi}
                            //   helperText={formSubmitted && !diaChi && "Địa chỉ trống"}
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                          <AddressFormUpdate
                            // onDiaChiChange={handleDiaChiChange}
                            //   required={true}
                            //   submitted={submitted}
                            onProvinceChange={handleProvinceChange}
                            onDistrictChange={handleDistrictChange}
                            onWardChange={handleWardChange}
                            selectedTinhThanhPho={diaChiList.tinhThanhPho}
                            selectedQuanHuyen={diaChiList.quanHuyen}
                            selectedXaPhuong={diaChiList.xaPhuong}
                          />
                        </div>
                        <Checkbox
                          size="large"
                          style={{
                            fontSize: "16px",
                            marginBottom: "20px",
                          }}
                          checked={editingTrangThai}
                          onChange={(e) =>
                            setEditingTrangThai(e.target.checked)
                          }
                          defaultChecked={false}
                          disabled
                        >
                          Địa chỉ mặc định
                        </Checkbox>{" "}
                      </div>
                    </Modal>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(diaChiList)}
                    disabled={diaChiList.trangThai === 1}
                    style={{
                      backgroundColor:
                        diaChiList.trangThai === 1 ? "#ff9191" : "#ff4b4b",
                      cursor:
                        diaChiList.trangThai === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </div>{" "}
                <Button
                  className="mac-dinh-button"
                  disabled={diaChiList.trangThai === 1}
                  // onClick={() => handleDelete(index)}
                  type="primary"
                  style={{
                    backgroundColor:
                      diaChiList.trangThai === 1 ? "#c8c8c8" : "#5e5b5b",
                    marginTop: "10px",
                    cursor:
                      diaChiList.trangThai === 1 ? "not-allowed" : "pointer",
                  }}
                  onClick={() => setShowSetDefaultModal(true)}
                >
                  Thiết lập mặc định
                </Button>
              </Col>
            </Row>
            {showDeleteModal && (
              <Modal
                title="Xác nhận xóa"
                open={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                footer={[
                  <Button
                    key="cancel"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Hủy
                  </Button>,
                  <Button
                    key="delete"
                    type="primary"
                    onClick={() => confirmDelete(deleteId)}
                  >
                    Xóa
                  </Button>,
                ]}
              >
                Bạn có chắc muốn xóa?
              </Modal>
            )}
            {showSetDefaultModal && (
              <Modal
                title="Xác nhận thiết lập mặc định"
                open={showSetDefaultModal}
                onCancel={() => setShowSetDefaultModal(false)}
                footer={[
                  <Button
                    key="cancel"
                    onClick={() => setShowSetDefaultModal(false)}
                  >
                    Hủy
                  </Button>,
                  <Button
                    key="confirm"
                    type="primary"
                    onClick={() => {
                      handleSetDefault(diaChiList.id);
                      setShowSetDefaultModal(false);
                    }}
                  >
                    Xác nhận
                  </Button>,
                ]}
              >
                Bạn có chắc muốn thiết lập địa chỉ này làm mặc định?
              </Modal>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
export default AddressTable;
