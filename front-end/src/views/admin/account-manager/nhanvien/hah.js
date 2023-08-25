import React, { useRef } from "react";
import axios from "axios";
import { apiURLKH } from "../../../../service/api";

const YourComponent = () => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(apiURLKH + "/import", formData);
      // Handle successful response from the API
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleFilePickerClick = () => {
    // Programmatically trigger the file picker dialog
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div>
      {/* Hide the input element */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleFilePickerClick}>Choose File</button>
    </div>
  );
};

export default YourComponent;
