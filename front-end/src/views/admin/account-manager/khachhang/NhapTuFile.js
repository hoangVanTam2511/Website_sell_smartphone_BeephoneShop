import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import "../../../../assets/scss/NhapTuFile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import ExportButton from "./Export";
import "../../../../assets/scss/HienThiNV.scss";
import * as XLSX from "xlsx";
import { request } from "../../../../store/helpers/axios_helper";
import { apiURLKH } from "../../../../service/api";
import { Notistack } from "../../order-manager/enum";
import useCustomSnackbar from "../../../../utilities/notistack";
import * as dayjs from "dayjs";
import { FaUpload } from "react-icons/fa6";

const NhapTuFile = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  const getAllCustomer = () => {
    // request
    //   ('GET', apiURLKH + "/hien-thi-tat-ca")
    //   .then((res) => {
    //     res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleHoVaTenKH = (e) => {
    const value = e;
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const trimmedValue = value.replace(/\s/g, "");

    if (!value.trim()) {
      return false;
    } else if (specialCharPattern.test(value)) {
      return false;
    } else if (trimmedValue.length < 5) {
      return false;
    } else if (/^\s+|\s+$/.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e;
    const parn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!value.trim()) {
      return false;
    } else if (!parn.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const handleSDT = (e) => {
    const value = e;
    const parn = /^(?:\+84|0)[1-9]\d{8}$/;

    if (!parn.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    var allCustomers = [];

    request("GET", apiURLKH + "/hien-thi-tat-ca")
      .then((res) => {
        res.data.forEach((item) => {
          allCustomers.push(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(allCustomers)
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      var customers = [];

      for (var i = 2; i < parsedData.length; i++) {
        var flag = false;
        var ma = String(parsedData[i].__EMPTY);
        var ten = String(parsedData[i].__EMPTY_1);
        var gioiTinh = String(parsedData[i].__EMPTY_2);
        var email = String(parsedData[i].__EMPTY_3);
        var sdt = String(parsedData[i].__EMPTY_4);

        if (
          ma === "" ||
          ten === "" ||
          email === "" ||
          sdt === "" ||
          gioiTinh === "" ||
          ma === null ||
          ten === null ||
          email === null ||
          sdt === null ||
          gioiTinh === null
        ) {
          handleOpenAlertVariant(
            "Import file thất bại.Vui lòng không được để trống các trường.",
            Notistack.SUCCESS
          );
          return;
        }

        if (
          ma.trim() === "" ||
          ten.trim() === "" ||
          email.trim() === "" ||
          sdt.trim() === "" ||
          gioiTinh.trim() === ""
        ) {
          handleOpenAlertVariant(
            "Import file thất bại.Vui lòng không được để trống các trường",
            Notistack.ERROR
          );
          return;
        }

        if (handleHoVaTenKH(ten) === false) {
          handleOpenAlertVariant(
            "Import file thất bại.Vui lòng kiểm tra lại cột họ tên",
            Notistack.ERROR
          );
          return;
        }

        if (handleEmailChange(email) === false) {
          handleOpenAlertVariant(
            "Import file thất bại.Vui lòng kiểm tra lại cột email",
            Notistack.ERROR
          );
          return;
        }

        if (handleSDT(sdt) === false) {
          handleOpenAlertVariant(
            "Import file thất bại.Vui lòng kiểm tra lại cột số điện thoại",
            Notistack.ERROR
          );
          return;
        }

        allCustomers.forEach((e) => {
          if (
            String(e.ma) === String(ma) &&
            String(e.email) === String(email) &&
            String(e.sdt) === String(sdt) &&
            String(e.ten) === String(ten)
          ) {
            flag = true;
          }
        });

        if (!flag) {
          customers.push({
            ma: ma,
            ten: ten,
            email: email,
            sdt: sdt,
            gioiTinh: gioiTinh === "Nam" || gioiTinh === "nam" ? true : false,
          });
        }
      }

      customers.forEach((customer) => {
        try {
          // Tạo khách hàng mới với thông tin đã nhập
          const khachHangData = {
            ma: customer.ma,
            hoVaTen: customer.ten,
            ngaySinh: null,
            soDienThoai: customer.sdt,
            gioiTinh: customer.gioiTinh,
            diaChiList: [],
            email: customer.email,
            anhDaiDien: "",
          };
          // Gọi API tạo khách hàng mới
          request("POST", apiURLKH + "/add-with-excel", khachHangData).then(
            (response) => {
              if (response.status === 200) {
                // handleOpenAlertVariant("Thêm thành công", Notistack.SUCCESS);
              }
            }
          );
        } catch (error) {
          // Xử lý lỗi
          alert("Thêm khách hàng thất bại");
          console.log(error);
        }
      });
    };

    // sau khi thêm xong
    handleOk();
    props.loadAfterImport();
    handleOpenAlertVariant("Import thành công", Notistack.SUCCESS);
    e.target.value = null;
  };

  return (
    <>
      <FaUpload
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
        Import Khách Hàng
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
            <Button className="custom-button1" style={{ height: "44px" }}>
              <FontAwesomeIcon
                icon={faUpload}
                style={{ paddingRight: "10px" }}
              />
              <input
                type="file"
                accept=".xlsx, .xls"
                style={{
                  opacity: 0,
                  position: "absolute",
                  height: "40px",
                  top: "0px",
                  left: "0px",
                  width: "123px",
                }}
                onChange={handleFileUpload}
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
