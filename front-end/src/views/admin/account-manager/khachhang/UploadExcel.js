import React from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";
import { request } from '../../../../store/helpers/axios_helper'
const YourComponent = () => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = request('POST', apiURLKH + "/import", formData);
      // Xử lý phản hồi thành công từ API
      console.log(response.data.content);
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default YourComponent;
