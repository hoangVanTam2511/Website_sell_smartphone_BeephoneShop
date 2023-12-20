import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";

const IDScan = ({ onScanData }) => {
  const [qrData, setQRData] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  useEffect(() => {
    // Check if qrData has a value (scanning successful)
    if (qrData) {
      // Close the modal when scanning is successful
      stopScanning();
    }
  }, [qrData]);
  const handleScan = (data) => {
    if (data) {
      setQRData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };
  const formatDate = (dateString) => {
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);

    // Handle cases where month is greater than 12
    const formattedMonth = parseInt(month) <= 12 ? month : day;
    const formattedDay = parseInt(month) <= 12 ? day : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  const renderInfo = () => {
    if (!qrData) {
      return <p>Chưa quét mã QR</p>;
    }

    const firstPart = qrData.text.split("||")[0];
    const restParts = qrData.text.split("||").slice(1);

    const infoArr = [firstPart, ...restParts.join("||").split("|")];

    if (infoArr.length !== 6) {
      onScanData(null);
      return <p>Thông tin không hợp lệ</p>;
    }

    const [cccd, hoVaTen, ngaySinh, gioiTinh, diaChi, ngayCap] = infoArr;
    const formattedNgaySinh = formatDate(ngaySinh);
    const addressParts = diaChi.split(",").map((part) => part.trim());
    const thon = addressParts[0];
    const xaPhuong = addressParts[1];

    const quanHuyen = addressParts[2];
    const tinhThanhPho = addressParts[3];
    const isMale = gioiTinh === "Nam";
    onScanData({
      cccd,
      hoVaTen,
      ngaySinh: formattedNgaySinh,
      gioiTinh: isMale,
      diaChi: thon,
      xaPhuong,
      quanHuyen,
      tinhThanhPho,
      ngayCap,
    });
  };
  return (
    <div>
      {isScanning ? (
        <Modal
          open={true}
          onCancel={stopScanning}
          footer={null}
          width={400}
          centered
        >
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%" }}
          />
          {renderInfo()}

          {/* 034303011829||Nguyễn Thị Hoa|21032003|Nữ|Thôn Lai Ổn, An Quý, Quỳnh Phụ, Thái Bình|14082021 */}
        </Modal>
      ) : (
        <Button
          onClick={startScanning}
          type="primary"
          className="rounded-2 me-2"
          style={{ height: "38px", width: "120px", fontSize: "15px" }}
        >
          <span
            className=""
            style={{
              fontSize: "15px",
              fontWeight: "500",
              marginBottom: "2px",
            }}
          >
            <FontAwesomeIcon icon={faQrcode} style={{ paddingRight: "5px" }} />
            Quét CCCD
          </span>
        </Button>
        //   <Button
        //   onClick={() => {
        //     handleOpenScanner();
        //     setScannerRef([]);
        //   }}
        //   className="rounded-2 me-2"
        //   type="warning"
        //   style={{ height: "38px", width: "120px", fontSize: "15px" }}
        // >
        //   <span
        //     className=""
        //     style={{
        //       fontSize: "15px",
        //       fontWeight: "500",
        //       marginBottom: "2px",
        //     }}
        //   >
        //     Quét Barcode
        //   </span>
        // </Button>
      )}
    </div>
  );
};

export default IDScan;
