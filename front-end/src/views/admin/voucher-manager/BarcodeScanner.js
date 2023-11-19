// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

// const BarcodeScanner = () => {
//   const [scannedData, setScannedData] = useState("");
//   const videoRef = useRef < HTMLVideoElement > null;
//   const reader = useRef(new BrowserMultiFormatReader());
//   useEffect(() => {
//     if (!videoRef.current) return;
//     reader.current.decodeFromConstraints(
//       {
//         audio: false,
//         video: {
//           facingMode: "environment",
//         },
//       },
//       videoRef.current,
//       (result, error) => {
//         if (result) {
//           setScannedData(result);
//         }
//         if (error) console.log(error);
//       }
//     );
//     return () => {
//       reader.current.reset();
//     };
//   }, [videoRef]);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <video
//         ref={videoRef}
//         style={{ maxWidth: "100%", maxHeight: "80vh", margin: "auto" }}
//       />
//       {scannedData && <p>Scanned Data: {scannedData}</p>}
//     </div>
//   );
// };

// export default BarcodeScanner;

import React, { useEffect, useRef } from "react";
import { BarcodePicker, ScanResult, Barcode } from "scandit-sdk"; // Import thêm Barcode từ scandit-sdk

const BarcodeScanner = () => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const configureScandit = async () => {
      try {
        await BarcodePicker.create(document.getElementById("scanner"), {
          // Thực hiện cấu hình Scandit SDK
          enableCameraSwitcher: true, // Cho phép chuyển đổi camera (nếu có nhiều camera)
          singleImageMode: false, // Hiển thị khung hình chuyển động của camera
          // Thêm các thiết lập khác tùy thuộc vào nhu cầu
          licenseKey:
            "AcjTIh1QOcT/Qs9bMD3LefEY0SQUD2S2WUQoVmt/ioPyKQoY0H/kPy4tv/51QUjQPAHD3+pniKYXRKvielZLrvwD3sFcJ4tLcRse189k2lP6bcCuCGzRDQhNbVEuQgREAGTXqTF28KJha/xsulsD+OJCFoq1RJBS/VZV311xftNjcKALE1VAi3B18gvgMzIVBXviJMBPn4vCb0PKzSzBvzVhOAH2e4Ja8HHnkmloS1iVJmnugWM1++p86pXGSUOvACtOyZ9Xilp8QxApLXS/9+d4EGmdR4LVo0v8tfBVtzENWffv1Xsoi1NKjVSJJZlFTmfcropleCZlXAlQs3Zem+xeulN5KIINvmBGV0RzI7ZaaPpv2VXnz7dqpoOedvXRpj0M1xlBRTH7frarRFiwmztZzAh/JdYRbH/qiHxzD9jtU5h5m1CRV9NkdyY0crmr60AN63tXEP1ZCPCAA1u1/CspR6vHZOpGQ3t3xVJieDXAUc1TZXGRkvBXsGW5UXxZHHtIGF9kjPSqarsm7RYPmD9gXkW2DJE0mAsY1XoO+jWHO6d00w4DF9zYZDOdknfoJZuDAdoydHZMXsytptC83cNyj2cW6mAFlEjnqxAEHDrWo2sD60oSEwOu4uGZXOikgjJ7t6FI3VwrW4hiv1sAaq92ozowcwI7Ub9mReMsIpLWGo3P562irONnelqL2hC2W1CcaGbkZC+tCWM4juPh4B1H2o8QlB4y7KuwJWqGkVAM96tkSw8J1oUAgBwinH6UjO3/sE9KzkeuBsl+cl/Z/YpxsSiHvKxIeNekMG5e3T9xOBZZlr/NouQM6YdEEfONMSekapXuEVtzYD/sHy74o6K6Lf/LTsvMA6byy3n4rx88VSwy17Vxl1yj0imQJUZRWjNcG7VZVoxUajiBaiwrfhElKmuPiOZA1FHEgtU2Lt3D2HWcc+acxAUotNZfuhAEITQP7/Yv1TCkbUOlxhtaXAT0uE7GHvVViNMKYergG7OCxB3BtXeWEeVvJYYZjdmCi9IuF1EdPwhg1Ql+tmFC79bWmXDMN0+mUFX5mNANfMC3muj0NAl7OHwD6Rrt7eamlScHDkhC4fTdpcItkRxW3iUGbT8unSEEMtQyzLH/65vQ7lyrGE5ymFVQHfbm/3l6B4taUAcYlbV7elfWIN5/ja7obVaVc8KulI9+kWos+gO42eMrPOohYAbD8UIke51Pj4lIeioN8iBrC95CwzwRarGLy/QziHg=",
          engineLocation: "path/to/scandit-engine.wasm",
          reader: {
            code128Enabled: true,
          },
        }).then((barcodePicker) => {
          // Xử lý sự kiện khi quét thành công
          barcodePicker.onScan((scanResult) => {
            const barcodes = scanResult.barcodes.map((barcode) => barcode.data);

            // Hiển thị dữ liệu quét lên màn hình (ví dụ: trong console)
            console.log("Barcodes scanned:", barcodes);
          });

          // Khởi động quét barcode
          barcodePicker.startScanning();
        });
      } catch (error) {
        console.error("Error configuring Scandit SDK:", error);
      }
    };

    configureScandit();
  }, []);

  return <div id="scanner" style={{ width: "100%", height: "400px" }} />;
};

export default BarcodeScanner;
