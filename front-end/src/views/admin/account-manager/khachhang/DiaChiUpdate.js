import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material";

const host = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";

const AddressFormUpdate = ({
  required,
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
  const [provinceError, setProvinceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [wardError, setWardError] = useState(false);
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
        // Fetch wards based on selected district
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
    if (!selectedProvince) {
      setProvinceError(true);
    }
    if (!selectedDistrict) {
      setDistrictError(true);
    }
    if (!selectedWard) {
      setWardError(true);
    }
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
    setProvinceError(false);
    if (submitted) {
      // Nếu đã ấn nút "Lưu" thì kiểm tra trạng thái select
      if (!event.target.value) {
        setProvinceError(true);
        setSelectedProvince("");
      }
    }
    const selectedValue = event.target.value;
    setSelectedProvince(selectedValue);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    if (selectedValue === "") {
      onProvinceChange("");
    } else {
      fetchDistricts(selectedValue);
      onProvinceChange(selectedValue);
    }
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value.target.value);
    setSelectedWard(""); // Reset selectedWard khi chọn lại quận/huyện mới
    fetchWards(value.target.value);
    setWards([]);
    onDistrictChange(value.target.value);
    setDistrictError(false);
    if (submitted) {
      // Nếu đã ấn nút "Lưu" thì kiểm tra trạng thái select
      if (!value.target.value) {
        setDistrictError(true);
      }
    }
  };

  const handleWardChange = (value) => {
    setSelectedWard(value.target.value);
    onWardChange(value.target.value);
    setWardError(false);
    if (submitted) {
      // Nếu đã ấn nút "Lưu" thì kiểm tra trạng thái select
      if (!value.target.value) {
        setWardError(true);
      }
    }
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
  }, [selectedProvince, selectedDistrict, selectedWard]);

  return (
    <div>
      <Grid container spacing={3.3}>
        <Grid item xs={4}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              Chọn Tỉnh/Thành phố
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Chọn Tỉnh/Thành phố"
              onChange={handleProvinceChange}
              value={selectedProvince}
              size="large"
              className={
                formSubmitted && !selectedProvince ? "error-select" : ""
              }
            >
              {provinces.map((province) => (
                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </MenuItem>
              ))}
            </Select>
            {/* {required && submitted && provinceError && (
              <p
                style={{
                  color: " #d32f2f",
                  paddingLeft: "15px",
                  fontSize: "12px",
                }}
              >
                Vui lòng chọn
              </p>
            )} */}
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              Chọn Quận/Huyện
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Chọn Quận/Huyện"
              onChange={handleDistrictChange}
              value={selectedDistrict}
              size="large"
              error={formSubmitted && !selectedDistrict}
            >
              {districts.map((district) => (
                <MenuItem key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </MenuItem>
              ))}
            </Select>
            {required && submitted && districtError && (
              <p
                style={{
                  color: " #d32f2f",
                  paddingLeft: "15px",
                  fontSize: "12px",
                }}
              >
                Vui lòng chọn
              </p>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl style={{ textAlign: "center", width: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              Chọn Phường/Xã
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Chọn Phường/Xã"
              onChange={handleWardChange}
              value={selectedWard}
              size="large"
              error={formSubmitted && !selectedWard}
            >
              {wards.map((ward) => (
                <MenuItem key={ward.WardCode} value={ward.WardCode}>
                  {ward.WardName}
                </MenuItem>
              ))}
            </Select>
            {required && submitted && wardError && (
              <p
                style={{
                  color: " #d32f2f",
                  fontSize: "12px",
                  textAlign: "left",
                  paddingLeft: "15px",
                }}
              >
                Vui lòng chọn
              </p>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressFormUpdate;
