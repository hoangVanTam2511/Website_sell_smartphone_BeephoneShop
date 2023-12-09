import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, Grid, TextField } from "@mui/material";
import { request } from '../../../../store/helpers/axios_helper'

const host = "https://provinces.open-api.vn/api/";

const AddressFormUpdate = ({
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  selectedTinhThanhPho,
  selectedQuanHuyen,
  selectedXaPhuong,
  editing,
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

  useEffect(() => {
    if (selectedTinhThanhPho && !editing) {
      const selectedProvinceCode = provinces.find(
        (province) => province.name === selectedTinhThanhPho
      )?.code;
      setSelectedProvince(selectedProvinceCode);
      fetchDistricts(selectedProvinceCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTinhThanhPho, provinces]);

  useEffect(() => {
    if (selectedQuanHuyen) {
      const selectedDistrictCode = districts.find(
        (district) => district.name === selectedQuanHuyen
      )?.code;

      if (selectedDistrictCode) {
        setSelectedDistrict(selectedDistrictCode);
        fetchWards(selectedDistrictCode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuanHuyen, districts]);

  useEffect(() => {
    if (selectedXaPhuong) {
      const selectedWardCode = wards.find(
        (ward) => ward.name === selectedXaPhuong
      )?.code;
      setSelectedWard(selectedWardCode);
    }
  }, [selectedXaPhuong, wards]);

  const callAPI = async (api) => {
    const response = await axios.get( api);
    return response.data;
  };

  const fetchProvinces = () => {
    callAPI(host + "?depth=2")
      .then((data) => {
        setProvinces(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  };

  const fetchDistricts = (provinceCode) => {
    if (provinceCode) {
      // Kiểm tra nếu provinceCode không phải là undefined
      callAPI(host + "p/" + provinceCode + "?depth=2")
        .then((data) => {
          if (data && data.districts) {
            setDistricts(data.districts);
            setSelectedDistrict("");
          }
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
  };

  const fetchWards = (districtCode) => {
    callAPI(host + "d/" + districtCode + "?depth=2")
      .then((data) => {
        setWards(data.wards);
        setSelectedWard("");
      })
      .catch((error) => {
        console.error("Error fetching wards:", error);
      });
  };

  const handleProvinceChange = (event) => {
    const selectedProvinceValue = event.target.value || ""; // Đảm bảo giá trị không bao giờ là null hoặc undefined
    setSelectedProvince(selectedProvinceValue);
    setSelectedDistrict("");
    setSelectedWard("");
    if (selectedProvince) {
      onDistrictChange("");
      onWardChange("");
    }
    setDistricts([]);
    setWards([]);
    fetchDistricts(selectedProvinceValue);
    onProvinceChange(selectedProvinceValue);
  };

  const handleDistrictChange = (value) => {
    const selectedDistrictValue = value.target.value || ""; // Đảm bảo giá trị không bao giờ là null hoặc undefined

    setSelectedDistrict(selectedDistrictValue);
    setSelectedWard("");
    fetchWards(selectedDistrictValue);
    onDistrictChange(selectedDistrictValue);
    onWardChange("");
    setWards([]);
  };

  const handleWardChange = (value) => {
    const selectedWardValue = value.target.value || ""; // Đảm bảo giá trị không bao giờ là null hoặc undefined

    setSelectedWard(selectedWardValue);
    onWardChange(selectedWardValue);
  };
  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceName = provinces.find(
        (province) => province.code === selectedProvince
      )?.name;
      onProvinceChange(selectedProvinceName);
    }
  }, [selectedProvince, onProvinceChange, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictName = districts.find(
        (district) => district.code === selectedDistrict
      )?.name;
      onDistrictChange(selectedDistrictName);
    }
  }, [selectedDistrict, onDistrictChange, districts]);

  useEffect(() => {
    if (selectedWard) {
      const selectedWardName = wards.find(
        (ward) => ward.code === selectedWard
      )?.name;
      onWardChange(selectedWardName);
    }
  }, [selectedWard, onWardChange, wards]);
  return (
    <div>
      <Grid container spacing={3.3}>
        <Grid item xs={4}>
          <TextField
            select
            label="Chọn Tỉnh/Thành phố"
            value={selectedProvince || ""}
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
            value={selectedDistrict || ""}
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
            value={selectedWard || ""}
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
  );
};

export default AddressFormUpdate;
