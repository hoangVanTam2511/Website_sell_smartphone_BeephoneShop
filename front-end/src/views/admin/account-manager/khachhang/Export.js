import React from "react";
import { apiURLKH } from "../../../../service/api";
import { Button } from "react-bootstrap";
import "../../../../assets/scss/NhapTuFile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../../../../assets/scss/HienThiNV.scss";
import { EXCEL_KHACH_HANG_BASE_64 } from "../../../../utilities/excelContants";
import FileSaver from "file-saver";
import { request } from "../../../../store/helpers/axios_helper"
const ExportButton = () => {
  const handleExport = () => {
    // request(
    //   "POST", 
    //   apiURLKH + "/get-excel-template",
    //   {}, { responseType: 'blob' }
    //   )
    //   .then((response) => {
    //     console.log(response)
    //     // const url = window.URL.createObjectURL(new Blob([response.data]));
    //     // const link = document.createElement('a');
    //     // link.href = url;
    //     // link.setAttribute('download', 'Mẫu Import Khách Hàng.xlsx');
    //     // document.body.appendChild(link);
    //     // link.click();
    //     // document.body.removeChild(link);
    //   })

     let sliceSize = 1024;
     let byteCharacters = atob(EXCEL_KHACH_HANG_BASE_64);
     let bytesLength = byteCharacters.length;
     let slicesCount = Math.ceil(bytesLength / sliceSize);
     let byteArrays = new Array(slicesCount);
     for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
       let begin = sliceIndex * sliceSize;
       let end = Math.min(begin + sliceSize, bytesLength);
       let bytes = new Array(end - begin);
       for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
         bytes[i] = byteCharacters[offset].charCodeAt(0);
       }
       byteArrays[sliceIndex] = new Uint8Array(bytes);
     }
     FileSaver.saveAs(
       new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
       "Template mẫu import khách hàng.xlsx"
     );
  };

  return (
    <Button onClick={handleExport} style={{ marginRight: "10px" }}>
      <FontAwesomeIcon icon={faDownload} style={{ paddingRight: "10px" }} />
      Tải File Mẫu
    </Button>
  );
};

export default ExportButton;
