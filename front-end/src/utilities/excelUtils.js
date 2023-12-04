import React, { useEffect, useRef, useState } from "react";
import { read, utils, writeFile } from 'xlsx';
import LoadingIndicator from './loading.js';
import axios from 'axios';
import { Dialog, DialogContent, IconButton, Pagination, Slide, TextField, Tooltip, Zoom } from "@mui/material";
import { Button, Empty, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
import useCustomSnackbar from "./notistack.js";
import { format } from "date-fns";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImportAndExportExcelImei = ({ open, close, imeis, productName, view }) => {
  // const getImeis = () => {
  //   get(imeis);
  // }
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = imeis.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const itemsOnCurrentPage = imeis.slice(startIndex, endIndex);

  // useEffect(() => {
  //   setCurrentPage(1);
  //   setSelectedImei(imeisChuaBan);
  // }, [refresh]);
  // const [imeis, setImeis] = useState(listImei);
  //
  // useEffect(() => {
  //   setImeis(listImei);
  // }, [listImei])

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

          const nonEmptyRows = rows.filter(row => {
            return Object.values(row).some(cellValue => cellValue !== null && cellValue.trim() !== "");
          });
          const updatedRows = nonEmptyRows.map(row => {
            return {
              imei: row.IMEI,
              createdAt: new Date(),
            };
          });
          // setImeis(updatedRows);
          // getImeis(nonEmptyRows);
        }
        $event.target.value = null;
      }
      reader.readAsArrayBuffer(file);
    }
  }
  const handleExport = () => {
    if (!imeis) {
      handleOpenAlertVariant("Không thể export vì chưa có dữ liệu!", "warning");
    }
    else {
      const request = {
        imeis
      };
      setIsLoading(true);
      axios
        .post('http://localhost:8080/api/export-excel-by', request, { responseType: 'blob' }) // Sử dụng phương thức POST
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Danh sách imei của${" " + productName}.xlsx`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        }
        );
    }
    // const headings = [['IMEI']];
    // const wb = utils.book_new();
    // const ws = utils.json_to_sheet([]);
    // 
    // utils.sheet_add_aoa(ws, headings);
    // utils.sheet_add_json(ws, imeis, { origin: 'A2', skipHeader: true });
    // utils.book_append_sheet(wb, ws, 'Danh sách imei');
  }

  const handleDownloadSample = () => {
    setIsLoading(true);
    axios
      .post('http://localhost:8080/api/create-excel-template-by', {}, { responseType: 'blob' }) // Sử dụng phương thức POST
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Mẫu Import IMEI.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      }
      );
  }

  const TableImei = () => {
    return (
      <>
        <Table
          className="table-container"
          columns={columns}
          rowKey="id"
          dataSource={itemsOnCurrentPage}
          pagination={false}
          locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        />
      </>
    );
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      width: "10%",
      render: (text, record, index) => (
        <span style={{ fontWeight: "400" }}>
          {imeis.indexOf(record) + 1}
        </span>
      ),
    },
    {
      title: "IMEI",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{!view ? record.soImei : record.imei}</span>
      ),
    },
    {
      title: "Trạng thái",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <span style={{ fontWeight: "400" }}>{record.trangThai}</span>
      ),
    },
    {
      title: "Barcode",
      align: "center",
      width: "15%",
      hide: view ? true : false,
      render: (text, record) => (
        <img src={record.barcode} style={{ width: "200px", height: "50px" }} alt="" />
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <>
          <div className="d-flex justify-content-center">
            <div className="button-container">
              <Tooltip title="Cập Nhật" TransitionComponent={Zoom}>
                <IconButton size="" className="me-2" onClick={() => {

                }}>
                  <FaPencilAlt color="#2f80ed" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa" TransitionComponent={Zoom}>
                <IconButton size="" onClick={() => {

                }}>
                  <FaTrashAlt color="#e5383b" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      ),
    },
  ].filter((item) => !item.hide);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        maxWidth="xxl"
        maxHeight="xxl"
      // sx={{ marginBottom: !imeis ? "170px" : "" }}
      >
        <DialogContent className="">
          <div className="mt-2" style={{ width: "1100px" }}>
            <div className="container" style={{}}>
              <div className="text-center" style={{}}>
                <span className="" style={{ fontWeight: "550", fontSize: "29px" }}>
                  {"Danh sách IMEI của " + productName}
                </span>
              </div>
              <div className="d-flex mt-4 justify-content-between">
                <div className="header-title">
                  <TextField
                    label="Tìm kiếm IMEI"
                    // onChange={handleGetValueFromInputTextField}
                    // value={keyword}
                    InputLabelProps={{
                      sx: {
                        marginTop: "",
                        textTransform: "capitalize",
                      },
                    }}
                    inputProps={{
                      style: {
                        height: "23px",
                        width: "200px",
                      },
                    }}
                    size="small"
                    className=""
                  />
                  <Button
                    onClick={() => console.log()}
                    className="rounded-2 ms-2"
                    type="warning"
                    style={{ width: "100px", fontSize: "15px" }}
                  >
                    <span
                      className="text-dark"
                      style={{ fontWeight: "500", marginBottom: "2px" }}
                    >
                      Làm Mới
                    </span>
                  </Button>
                </div>
                <div className="">
                  <Button
                    onClick={handleUploadClick}
                    className="rounded-2 button-mui me-2"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <FaUpload
                      className="ms-1"
                      style={{
                        position: "absolute",
                        bottom: "13.5px",
                        left: "10px",
                      }}
                    />
                    <span
                      className="ms-3 ps-1"
                      style={{ marginBottom: "3px", fontWeight: "500" }}
                    >
                      Import Excel

                      <input style={{ display: "none" }} ref={inputRef} type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </span>
                  </Button>
                  {!view &&
                    <Button
                      onClick={handleExport}
                      className="rounded-2 button-mui me-2"
                      type="primary"
                      style={{ height: "40px", width: "auto", fontSize: "15px" }}
                    >
                      <FaDownload
                        className="ms-1"
                        style={{
                          position: "absolute",
                          bottom: "13.5px",
                          left: "10px",
                        }}
                      />
                      <span
                        className="ms-3 ps-1"
                        style={{ marginBottom: "3px", fontWeight: "500" }}
                      >
                        Export Excel
                      </span>
                    </Button>
                  }
                  <Button
                    onClick={handleDownloadSample}
                    className="rounded-2 button-mui"
                    type="primary"
                    style={{ height: "40px", width: "auto", fontSize: "15px" }}
                  >
                    <FaDownload
                      className="ms-1"
                      style={{
                        position: "absolute",
                        bottom: "13.5px",
                        left: "10px",
                      }}
                    />
                    <span
                      className="ms-3 ps-1"
                      style={{ marginBottom: "3px", fontWeight: "500" }}
                    >
                      Tải Mẫu
                    </span>
                  </Button>
                </div>
              </div>
              <div className="mx-auto mt-3">
                <TableImei />
              </div>
              <div className="d-flex justify-content-center mt-3">
                <Pagination
                  color="primary"
                  page={parseInt(currentPage)}
                  count={totalPages}
                  onChange={(event, page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="mt-3"></div>
      </Dialog>
      {isLoading && <LoadingIndicator />}
    </>

  );
};

export default ImportAndExportExcelImei;

