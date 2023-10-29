import { Button, Modal } from "antd";
import { useState } from "react";
import "../../../../assets/scss/NhapTuFile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import ExportButton from "./Export";
import "../../../../assets/scss/HienThiNV.scss";
const NhapTuFile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <FontAwesomeIcon icon={faPlus} /> &nbsp;
      <span type="primary" onClick={showModal}>
        import
      </span>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ textAlign: "center" }}
      >
        <h3
          style={{ textAlign: "center", color: "gray", marginBottom: "10px" }}
        >
          NHẬP TỪ FILE{" "}
        </h3>
        <span>
          <ExportButton />
          <label htmlFor="file-upload">
            <Button className="custom-button1">
              <FontAwesomeIcon
                icon={faUpload}
                style={{ paddingRight: "10px" }}
              />
              Tải File Lên
            </Button>
          </label>
        </span>
      </Modal>
    </>
  );
};
export default NhapTuFile;
