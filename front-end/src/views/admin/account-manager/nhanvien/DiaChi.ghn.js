import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Space } from "antd";
import "../../../../assets/scss/HoHo.scss";

const host = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";

const Haha = ({ onDiaChiChange }) => {
  const { Option } = Select;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    fetchProvinces();
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

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedWard("");
    fetchDistricts(value);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWard("");
    fetchWards(value);
  };

  const handleWardChange = (value) => {
    setSelectedWard(value);
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

      const resultString =
        selectedWardName +
        " " +
        selectedDistrictName +
        " " +
        selectedProvinceName;

      onDiaChiChange(resultString);
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);

  return (
    <div>
      <Space wrap>
        <div
          style={{
            border: "1px #cec8c8 solid",
            padding: "20px 10px",
            borderRadius: "3px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-15px",
              left: "10px",
              backgroundColor: "#fff",
              padding: "0 10px",
              fontSize: "13px",
              color: "#666666",
            }}
          >
            Địa chỉ
          </div>
          <Select
            id="province"
            onChange={handleProvinceChange}
            value={selectedProvince}
            style={{ width: 200, marginRight: "10px" }}
            size={"large"}
          >
            <Option disabled value="">
              Chọn Tỉnh/Thành phố
            </Option>
            {provinces.map((province) => (
              <Option key={province.ProvinceID} value={province.ProvinceID}>
                {province.ProvinceName}
              </Option>
            ))}
          </Select>
          <Select
            id="district"
            onChange={handleDistrictChange}
            value={selectedDistrict}
            style={{ width: 180, marginRight: "15px" }}
            disabled={!districts.length}
            size={"large"}
          >
            <Option disabled value="">
              Chọn Quận/Huyện
            </Option>
            {districts.map((district) => (
              <Option key={district.DistrictID} value={district.DistrictID}>
                {district.DistrictName}
              </Option>
            ))}
          </Select>

          <Select
            id="ward"
            onChange={handleWardChange}
            value={selectedWard}
            style={{ width: 170 }}
            disabled={!wards.length}
            size={"large"} // Disable the select until data is available
          >
            <Option disabled value="">
              Chọn Phường/Xã
            </Option>
            {wards.map((ward) => (
              <Option key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </Option>
            ))}
          </Select>
        </div>
      </Space>
      {/* <div>
        <label>Kết quả:</label>
        <div id="result">{result}</div>
      </div> */}
    </div>
  );
};

export default Haha;
