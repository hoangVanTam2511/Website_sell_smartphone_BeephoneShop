import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message } from 'antd';
import { useState } from "react";
import * as XLSX from 'xlsx'

import { Fab } from "@material-ui/core";
import "../../../../assets/scss/NhapTuFile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
const NhapTuFile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excelFile, setexcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setexcelData] = useState(null);


  const handleFile = (e) =>{
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setexcelFile(e.target.result);
          console.log(e.target.result)
        }
        if(excelFile!==null){
          const workbook = XLSX.read(excelFile,{type: 'buffer'});
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          setexcelData(data.slice(0,10));
        }
        // console.log(excelData)
      }
      else{
        setTypeError('Please select only excel file types');
        setexcelFile(null);
      }
    }
    else{
      console.log('Please select your file');
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <span type="primary" onClick={showModal}>
        + Upload file excel
      </span>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ textAlign: "center" }}
      >
        <h2 style={{ textAlign: "center", color: "gray" }}>NHẬP TỪ FILE </h2>
        <br />
        <span>
          <Button className="custom-button">
            <FontAwesomeIcon
              icon={faDownload}
              style={{ paddingRight: "10px" }}
            />
            Tải File Mẫu
          </Button>
          {/* <Upload  {...props} className="custom-button1">
            <Button icon={<UploadOutlined />}>Nhấn để tải file </Button>
          </Upload> */}
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={handleFile}
            />
            <Fab
              color="primary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <FontAwesomeIcon
                icon={faDownload}
                style={{ paddingRight: "10px" }}
              /> 
              Upload file
            </Fab>


          </label>
        </span>
      </Modal>
    </>
  );
};
export default NhapTuFile;
