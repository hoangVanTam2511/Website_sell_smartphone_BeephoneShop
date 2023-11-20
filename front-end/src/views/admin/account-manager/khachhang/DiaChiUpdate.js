import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, Grid, TextField } from "@mui/material";

const host = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/";

const AddressFormUpdate = ({
  submitted,
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
        (province) => province.ProvinceName === selectedTinhThanhPho
      )?.ProvinceID;
      setSelectedProvince(selectedProvinceCode);
      fetchDistricts(selectedProvinceCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTinhThanhPho, provinces]);

  useEffect(() => {
    if (selectedQuanHuyen) {
      const selectedDistrictCode = districts.find(
        (district) => district.DistrictName === selectedQuanHuyen
      )?.DistrictID;

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
        (ward) => ward.WardName === selectedXaPhuong
      )?.WardCode;
      setSelectedWard(selectedWardCode);
    }
  }, [selectedXaPhuong, wards]);

  const callAPI = async (api) => {
    return axios
      .get(api, {
        headers: {
          token: "62124d79-4ffa-11ee-b1d4-92b443b7a897",
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

  const fetchDistricts = (provinceCode) => {
    callAPI(host + "district?province_id=" + provinceCode)
      .then((data) => {
        setDistricts(data.data);
        setSelectedDistrict(""); // Reset selected district when fetching new districts
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  const fetchWards = (districtCode) => {
    callAPI(host + "ward?district_id=" + districtCode)
      .then((data) => {
        setWards(data.data);
        setSelectedWard(""); // Reset selected ward when fetching new wards
      })
      .catch((error) => {
        console.error("Error fetching wards:", error);
      });
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
    if (selectedProvince) {
      onDistrictChange("");
      onWardChange("");
    }
    setDistricts([]);
    setWards([]);
    fetchDistricts(event.target.value);
    onProvinceChange(event.target.value);
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

  // useEffect(() => {
  //   if (selectedProvince && selectedDistrict && selectedWard) {
  //     const selectedProvinceName = provinces.find(
  //       (province) => province.ProvinceID === selectedProvince
  //     )?.ProvinceName;

  //     const selectedDistrictName = districts.find(
  //       (district) => district.DistrictID === selectedDistrict
  //     )?.DistrictName;

  //     const selectedWardName = wards.find(
  //       (ward) => ward.WardCode === selectedWard
  //     )?.WardName;

  //     onProvinceChange(selectedProvinceName);
  //     onDistrictChange(selectedDistrictName);
  //     onWardChange(selectedWardName);
  //   }
  // }, [
  //   selectedProvince,
  //   selectedDistrict,
  //   selectedWard,
  //   onProvinceChange,
  //   onDistrictChange,
  //   onWardChange,
  //   provinces,
  //   districts,
  //   wards,
  // ]);
  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceName = provinces.find(
        (province) => province.ProvinceID === selectedProvince
      )?.ProvinceName;
      onProvinceChange(selectedProvinceName);
    }
  }, [selectedProvince, onProvinceChange, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictName = districts.find(
        (district) => district.DistrictID === selectedDistrict
      )?.DistrictName;
      onDistrictChange(selectedDistrictName);
    }
  }, [selectedDistrict, onDistrictChange, districts]);

  useEffect(() => {
    if (selectedWard) {
      const selectedWardName = wards.find(
        (ward) => ward.WardCode === selectedWard
      )?.WardName;
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
    </div>
  );
};

export default AddressFormUpdate;
