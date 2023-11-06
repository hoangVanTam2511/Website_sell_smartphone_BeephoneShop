import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, MenuItem, TextField } from "@mui/material";

const host = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";

const ModalAddDiaChiKhachHang = ({
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  formSubmitted,
  huy,
  set,
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

  const callAPI = (api) => {
    return axios
      .get(api, {
        headers: {
          token: "c2f01f86-3164-11ee-af43-6ead57e9219a",
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  const fetchProvinces = () => {
    callAPI(host + "province")
      .then((data) => {
        setProvinces(data.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  };
  useEffect(() => {
    if (huy) {
      // Clear selections in the select boxes
      setSelectedDistrict("");
      setSelectedProvince("");
      setSelectedWard("");
    }
    // huyCallBack();
    set(false);
  }, [huy]);
  const fetchDistricts = (provinceCode) => {
    callAPI(host + "district?province_id=" + provinceCode)
      .then((data) => {
        setDistricts(data.data);
        setSelectedDistrict("");
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  const fetchWards = (districtCode) => {
    callAPI(host + "ward?district_id=" + districtCode)
      .then((data) => {
        setWards(data.data);
        setSelectedWard("");
      })
      .catch((error) => {
        console.error("Error fetching wards:", error);
      });
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    fetchDistricts(value.target.value);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value.target.value);
    setSelectedWard("");
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
        (province) => province.ProvinceID === selectedProvince
      ).ProvinceName;
      const selectedDistrictName = districts.find(
        (district) => district.DistrictID === selectedDistrict
      ).DistrictName;
      const selectedWardName = wards.find(
        (ward) => ward.WardCode === selectedWard
      ).WardName;
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
              <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                {province.ProvinceName}
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
              <MenuItem key={district.DistrictID} value={district.DistrictID}>
                {district.DistrictName}
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
              <MenuItem key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};

export default ModalAddDiaChiKhachHang;
