import React from "react";
import { apiURLNV } from "../../../../service/api";
import { Button } from "react-bootstrap";
import "../../../../assets/scss/NhapTuFile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
const ExportButton = () => {
  const handleExport = () => {
    fetch(apiURLNV + "/export")
      .then((response) => response.blob())
      .then((blob) => {
        // Tạo một URL đối tượng để tải xuống file
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "Thông tin nhân viên.xlsx";
        a.click();
      });
  };

  return (
    <Button onClick={handleExport} style={{ marginRight: "10px" }}>
      <FontAwesomeIcon icon={faDownload} style={{ paddingRight: "10px" }} />
      Tải File Mẫu
    </Button>
  );
};

export default ExportButton;
