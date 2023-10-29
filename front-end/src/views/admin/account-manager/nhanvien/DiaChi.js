import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
} from "@mui/material";

const host = "https://provinces.open-api.vn/api/";

const AddressForm = ({
  required,
  submitted,
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
  const [provinceError, setProvinceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [wardError, setWardError] = useState(false);

  useEffect(() => {
    fetchProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callAPI = (api) => {
    if (!selectedProvince) {
      setProvinceError(true);
    }
    if (!selectedDistrict) {
      setDistrictError(true);
    }
    if (!selectedWard) {
      setWardError(true);
    }

    return axios.get(api).then((response) => {
      return response.data;
    });
  };

  const fetchProvinces = () => {
    callAPI(host + "?depth=1")
      .then((data) => {
        setProvinces(data);
        // console.log(data.provinceCode);
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
    if (submitted) {
      // Nếu đã ấn nút "Lưu" thì kiểm tra trạng thái select
      if (!value.target.value) {
        setProvinceError(true);
        setSelectedProvince("");
      }
    }
    setSelectedProvince(value.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
    fetchDistricts(value.target.value);
    onProvinceChange(value.target.value);
    setProvinceError(false);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value.target.value);
    setSelectedWard("");
    fetchWards(value.target.value);
    onDistrictChange(value.target.value);
    setDistrictError(false);
    if (submitted) {
      // Nếu đã ấn nút "Lưu" thì kiểm tra trạng thái select
      if (!value.target.value) {
        setDistrictError(true);
        setSelectedDistrict("");
      }
    }
  };

  const handleWardChange = (value) => {
    setSelectedWard(value.target.value);
    onWardChange(value.target.value);
    setWardError(false);
    if (formSubmitted) {
      // Nếu đã ấn nút "Lưu" thì kiểm tra trạng thái select
      if (!value.target.value) {
        setWardError(true);
        setSelectedWard("");
      }
    }
  };

  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceName = provinces.find(
        (province) => province.code === selectedProvince
      )?.name;
      onProvinceChange(selectedProvinceName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince, onProvinceChange]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictName = districts.find(
        (district) => district.code === selectedDistrict
      )?.name;
      onDistrictChange(selectedDistrictName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict, onDistrictChange]);

  useEffect(() => {
    if (selectedWard) {
      const selectedWardName = wards.find(
        (ward) => ward.code === selectedWard
      )?.name;
      onWardChange(selectedWardName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWard, onWardChange]);

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
