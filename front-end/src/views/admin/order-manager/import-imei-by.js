import React, { useRef, useState } from "react";
import { read, utils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Dialog, DialogContent, IconButton, Slide, TextField, Tooltip, Zoom } from "@mui/material";
import { Button, Empty, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { format } from "date-fns";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack } from "./enum";
import LoadingIndicator from "../../../utilities/loading";

export const ImportExcelImei = ({ get, ma }) => {
  const getImeis = (listImei) => {
    get(listImei, ma);
  }
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const handleUploadClick = () => {
    inputRef.current.click();
  };
  const [imeis, setImeis] = useState([]);

  const handleImport = ($event) => {
    setIsLoading(true);
    setTimeout(() => {
      const files = $event.target.files;
      if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const wb = read(event.target.result, { type: 'array' });
          const sheet = wb.Sheets[wb.SheetNames[0]];

          const imeis = [];
          const duplicateSet = new Set(); // Đối tượng Set để theo dõi giá trị trùng lặp

          const range = XLSX.utils.decode_range(sheet['!ref']);
          for (let row = 4; row < range.e.r; row++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: 2 }); // Cột C
            const cellValue = sheet[cellAddress] ? sheet[cellAddress].v : '';

            if (cellValue !== '') {
              const isNumeric = /^\d+$/.test(cellValue);
              if (!isNumeric) {
                setIsLoading(false);
                handleOpenAlertVariant("IMEI không hợp lệ!", Notistack.ERROR);
                $event.target.value = null;
                return; // Kết thúc hàm nếu có giá trị trùng lặp
              }
              if (duplicateSet.has(cellValue)) {
                setIsLoading(false);
                handleOpenAlertVariant("IMEI không được trùng lặp!", Notistack.ERROR);
                $event.target.value = null;
                return; // Kết thúc hàm nếu có giá trị trùng lặp
              }
              duplicateSet.add(cellValue); // Thêm giá trị vào đối tượng Set
              imeis.push({ imei: cellValue, createdAt: new Date() });
            }
            // else {
            //   alert("null");
            //   setIsLoading(false);
            //   handleOpenAlertVariant("IMEI không hợp lệ!", Notistack.ERROR);
            //   $event.target.value = null;
            //   return; // Kết thúc hàm nếu có giá trị trùng lặp
            // }
          }
          getImeis(imeis);
          setIsLoading(false);
          handleOpenAlertVariant("Import IMEI thành công!", Notistack.SUCCESS);
          $event.target.value = null;
        }
        reader.readAsArrayBuffer(file);
      }
    }, 250)

  }
  return (
    <>
      <Tooltip title="Import IMEI" TransitionComponent={Zoom}>
        <IconButton onClick={handleUploadClick}
          className="me-2">
          <FaUpload color="#2f80ed" />
          <input style={{ display: "none" }} ref={inputRef} type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </IconButton>
      </Tooltip>
      {isLoading && <LoadingIndicator />}
    </>
  )
};


