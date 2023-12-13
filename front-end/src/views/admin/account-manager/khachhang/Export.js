import React from "react";
import { apiURLKH } from "../../../../service/api";
import { Button } from "react-bootstrap";
import "../../../../assets/scss/NhapTuFile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import { request } from "../../../../store/helpers/axios_helper"
const ExportButton = () => {
  const handleExport = () => {
    request(
      "POST", 
      apiURLKH + "/get-excel-template",
      {}, { responseType: 'blob' }
      )
      .then((response) => {
        // console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Mẫu Import Khách Hàng.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
     
  };

  return (
    <Button onClick={handleExport} style={{ marginRight: "10px" }}>
      <FontAwesomeIcon icon={faDownload} style={{ paddingRight: "10px" }} />
      Tải File Mẫu
    </Button>
  );
};

export default ExportButton;
