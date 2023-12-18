import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, TextField } from "@mui/material";

const host = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/";

const AddressFormUpdate = ({
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  selectedTinhThanhPho,
  selectedQuanHuyen,
  selectedXaPhuong,
  editing,
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
  const changeProvinceNameToID = () => {
    const selectedProvinceCode = provinces.find(
      (province) => province.ProvinceName === selectedTinhThanhPho
    )?.ProvinceID;
    setSelectedProvince(selectedProvinceCode);
    fetchDistricts(selectedProvinceCode);
  };
  const changeDistricNameToID = () => {
    const selectedDistrictCode = districts.find(
      (district) => district.DistrictName === selectedQuanHuyen
    )?.DistrictID;

    if (selectedDistrictCode) {
      setSelectedDistrict(selectedDistrictCode);
      fetchWards(selectedDistrictCode);
    }
  };
  const changedWardNameToID = () => {
    const selectedWardCode = wards.find(
      (ward) => ward.WardName === selectedXaPhuong
    )?.WardCode;
    setSelectedWard(selectedWardCode);
  };
  useEffect(() => {
    if (huy) {
      // Clear selections in the select boxes
      changeProvinceNameToID();
      changeDistricNameToID();
      changedWardNameToID();
    }
    // huyCallBack();
    set(false);
  }, [huy]);

  useEffect(() => {
    if (selectedTinhThanhPho && !editing) {
      changeProvinceNameToID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTinhThanhPho, provinces]);

  useEffect(() => {
    if (selectedQuanHuyen) {
      changeDistricNameToID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuanHuyen, districts]);

  useEffect(() => {
    if (selectedXaPhuong) {
      changedWardNameToID();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
      <div
        style={{
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <TextField
          select
          label="Chọn Tỉnh/Thành phố"
          value={selectedProvince}
          onChange={handleProvinceChange}
          error={formSubmitted && !selectedProvince}
          helperText={formSubmitted && !selectedProvince ? "Vui lòng chọn" : ""}
          style={{ width: "100%" }}
        >
          {provinces.map((province) => (
            <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
              {province.ProvinceName}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div
        className="text-f"
        style={{
          marginBottom: "20px",
          marginTop: "30px",
        }}
      >
        <TextField
          select
          label="Chọn Quận/Huyện"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          error={formSubmitted && !selectedDistrict}
          helperText={formSubmitted && !selectedDistrict ? "Vui lòng chọn" : ""}
          style={{ width: "100%" }}
        >
          {districts.map((district) => (
            <MenuItem key={district.DistrictID} value={district.DistrictID}>
              {district.DistrictName}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div
        className="text-f"
        style={{
          marginBottom: "20px",
          marginTop: "30px",
        }}
      >
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
      </div>
    </>
  );
};

export default AddressFormUpdate;
