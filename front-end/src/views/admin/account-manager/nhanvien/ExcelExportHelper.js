import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import moment from "moment";
import * as dayjs from "dayjs";
import { FaDownload } from "react-icons/fa6";

const ExcelExportHelper = ({ data }) => {
  const createDownLoadData = () => {
    handleExport().then((url) => {
      console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "danh_sach_nhan_vien.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    // console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    // console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      // console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const title = [{ A: "Danh sách nhân viên" }, {}];

    let table1 = [
      {
        A: "STT",
        B: "Mã",
        C: "Họ và tên",
        D: "Ngày sinh",
        E: "Email",
        F: "Căn cước công dân",
        G: "Số điện thoại",
        H: "Địa chỉ",
        I: "Phuờng/Xã",
        J: "Quận/huyện",
        K: "Tỉnh/Thành phố",
      },
    ];

    const employees = data.map((item, index) => ({
      stt: index + 1,
      ma: item.ma,
      hoVaTen: item.hoVaTen,
      ngaySinh:
        dayjs(item.ngaySinh).$D +
        "/" +
        (dayjs(item.ngaySinh).$M + 1) +
        "/" +
        dayjs(item.ngaySinh).$y,
      email: item.email,
      canCuocCongDan: item.canCuocCongDan,
      soDienThoai: item.soDienThoai,
      diaChi: item.diaChiList[0].diaChi,
      tinhThanhPho: item.diaChiList[0].tinhThanhPho,
      quanHuyen: item.diaChiList[0].quanHuyen,
      phuongXa: item.diaChiList[0].xaPhuong,
    }));

    employees.forEach((product) => {
      table1.push({
        A: product.stt,
        B: product.ma,
        C: product.hoVaTen,
        D: product.ngaySinh,
        E: product.email,
        F: product.canCuocCongDan,
        G: product.soDienThoai,
        H: product.diaChi,
        I: product.phuongXa,
        J: product.quanHuyen,
        K: product.tinhThanhPho,
      });
    });

    table1 = table1.concat([""]);

    const finalData = [...title, ...table1];

    console.log(finalData);

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "Danh sách nhân viên");

    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "STT" ? headerIndexes.push(index) : null
    );

    const totalRecords = data.length;

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:K2",
      tbodyRange: `A3:K${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:K${headerIndexes[0] + 1}`
          : null,
      theadRange1:
        headerIndexes?.length >= 2
          ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}`
          : null,
      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
          : null,
      tLastColumnRange:
        headerIndexes?.length >= 1
          ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}`
          : null,
      tLastColumnRange1:
        headerIndexes?.length >= 1
          ? `H${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[1] + 1}`
          : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.column("A").width(10);
        sheet.column("B").width(24);
        sheet.column("C").width(24);
        sheet.column("D").width(24);
        sheet.column("E").width(25);
        sheet.column("F").width(25);
        sheet.column("G").width(25);
        sheet.column("H").width(25);
        sheet.column("I").width(25);
        sheet.column("J").width(25);
        sheet.column("K").width(25);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
          fontSize: 16,
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
          });
        }

        console.log(dataInfo);

        sheet.range(dataInfo.theadRange).style({
          fill: "4472c4",
          bold: true,
          horizontalAlignment: "center",
          fontColor: "ffffff",
        });

        if (dataInfo.theadRange1) {
          sheet.range(dataInfo.theadRange1).style({
            fill: "808080",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }

        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({
            bold: true,
          });
        }

        // if (dataInfo.tLastColumnRange) {
        //   sheet.range(dataInfo.tLastColumnRange).style({
        //     // bold: true,
        //   });
        // }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <span
      onClick={() => {
        createDownLoadData();
      }}
      type="primary"
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
        className=""
        style={{ marginBottom: "2px", fontWeight: "500", marginLeft: "21px" }}
      >
        Export Excel
      </span>
    </span>
  );
};

export default ExcelExportHelper;
