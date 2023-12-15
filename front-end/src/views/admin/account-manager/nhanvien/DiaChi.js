/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, Grid, TextField } from "@mui/material";
import { request } from '../../../../store/helpers/axios_helper'

const host = "https://provinces.open-api.vn/api/";

const AddressForm = ({
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  formSubmitted,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  useEffect(() => {
    fetchProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callAPI = async (api) => {
    const response = await axios.get(api);
    return response.data;
  };

  const fetchProvinces = () => {
    callAPI(host + "?depth=2")
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  };

  const fetchDistricts = (provinceCode) => {
    callAPI(host + "p/" + provinceCode + "?depth=2")
      .then((data) => {
        setDistricts(data.districts);
        setSelectedDistrict("");
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  const fetchWards = (districtCode) => {
    callAPI(host + "d/" + districtCode + "?depth=2")
      .then((data) => {
        setWards(data.wards);
        setSelectedWard(""); // Reset selected ward when fetching new wards
      })
      .catch((error) => {
        console.error("Error fetching wards:", error);
      });
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
    fetchDistricts(value.target.value);
    onProvinceChange(value.target.value);
    setDistricts([]);
    setWards([]);
    onDistrictChange("");
    onWardChange("");
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value.target.value);
    setSelectedWard(""); // Đặt xã thành rỗng
    fetchWards(value.target.value);
    onDistrictChange(value.target.value);
    onWardChange("");
    setWards([]);
  };
  const handleWardChange = (value) => {
    setSelectedWard(value.target.value);
    onWardChange(value.target.value);
  };
  useEffect(() => {
    if (selectedDistrict && selectedProvince && selectedWard) {
      const selectedProvinceName = provinces.find(
        (province) => province.code === selectedProvince
      ).name;
      const selectedDistrictName = districts.find(
        (district) => district.code === selectedDistrict
      ).name;
      const selectedWardName = wards.find(
        (ward) => ward.code === selectedWard
      ).name;
      onProvinceChange(selectedProvinceName);
      onDistrictChange(selectedDistrictName);
      onWardChange(selectedWardName);
    }
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    provinces,
    districts,
    wards,
    onProvinceChange,
    onDistrictChange,
    onWardChange,
  ]);

  return (
    <>
      <div>
        <Grid container spacing={3.3}>
          <Grid item xs={4}>
            <TextField
              select
              label="Chọn Tỉnh/Thành phố"
              value={selectedProvince}
              onChange={handleProvinceChange}
              error={formSubmitted && !selectedProvince}
              helperText={
                formSubmitted && !selectedProvince ? "Vui lòng chọn" : ""
              }
              style={{ width: "100%" }}
            >
              {provinces.map((province) => (
                <MenuItem key={province.code} value={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Chọn Quận/Huyện"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              error={formSubmitted && !selectedDistrict}
              helperText={
                formSubmitted && !selectedDistrict ? "Vui lòng chọn" : ""
              }
              style={{ width: "100%" }}
            >
              {districts.map((district) => (
                <MenuItem key={district.code} value={district.code}>
                  {district.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Chọn Phường/Xã"
              value={selectedWard}
              onChange={handleWardChange}
              error={formSubmitted && !selectedWard}
              helperText={formSubmitted && !selectedWard ? "Vui lòng chọn" : ""}
              style={{ width: "100%" }}
            >
              {wards.map((ward) => (
                <MenuItem key={ward.code} value={ward.code}>
                  {ward.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddressForm;
