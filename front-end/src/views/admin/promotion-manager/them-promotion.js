import { Button, Checkbox, Modal, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKhuyenMai, apiURLSanPham } from "../../../service/api";
import TextField from "@mui/material/TextField";
import { InputAdornment, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { Table } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import numeral from "numeral";
import style from "./style.css";

import Box from "@mui/joy/Box";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Badge from "@mui/material/Badge";

const AddKhuyenMai = () => {
  //add-khuyen-mai
  let [tenKhuyenMai, setTenKhuyenMai] = useState("");
  let [giaTriKhuyenMai, setGiaTriKhuyenMai] = useState(0);
  let [loaiKhuyenMai, setLoaiKhuyenMai] = useState("");
  let [ngayBatDau, setNgayBatDau] = useState(dayjs());
  let [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  const [selectDiscount, setSeclectDiscount] = useState("VNĐ");
  const [value, setValue] = React.useState();
  const [value2, setValue2] = React.useState();

  //san-pham
  let [listSanPham, setListSanPham] = useState([]);
  let [listSanPhamChiTiet, setlistSanPhamChiTiet] = useState([]);
  let [dataSanPhamChiTiet, setDataSanPhamChiTiet] = useState([]);
  let [selectedRow, setSelectedRow] = useState("");

  //khuyenmaichitiet
  let [idSanPhamChiTiet, setIdSanPhamChiTiet] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  //check-box
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [selectAll1, setSelectAll1] = useState(false);
  //Lấy id ctsp
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  let [sanPhamChiTietKhuyenMai, setSanPhamChiTietKhuyenMai] = useState([]);
  const [isInputChanged, setIsInputChanged] = useState(false);
  // Tạo một state để lưu danh sách các ID sản phẩm đã được chọn

  const redirectToHienThiKhuyenMai = () => {
    window.location.href = "/khuyen-mai";
  };

  const loadDatalistSanPham = () => {
    axios
      .get("http://localhost:8080/san-pham-1")
      .then((response) => {
        setListSanPham(response.data);
      })
      .catch((error) => {
        console.log("Lỗi do hiển thị dữ liệu sản phẩm");
      });
  };

  const loadDatalistSanPhamChiTiet = (id, check) => {
    axios
      .get("http://localhost:8080/san-pham-chi-tiet-1/" + id + "/" + check)
      .then((response) => {
        setlistSanPhamChiTiet(response.data);
      })
      .catch((error) => {
        console.log("Lỗi do hiển thị dữ liệu sản phẩm chi tiết");
      });
  };

  const clear = () => {
    axios
      .get("http://localhost:8080/san-pham-chi-tiet/removeALL")
      .then((response) => {
        setlistSanPhamChiTiet(response.data);
      })
      .catch((error) => {
        console.log("Lỗi do clear dữ liệu sản phẩm");
      });
  };

  useEffect(() => {
    loadDatalistSanPham();
    clear();
  }, [dataSanPhamChiTiet]);

  const handleChange = (event) => {
    if (selectDiscount === "VNĐ") {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(formattedValue);
      setGiaTriKhuyenMai(numericValue);
      setIsInputChanged(true);
    }
    if (selectDiscount === "%") {
      let inputValue = event.target.value;
      // Loại bỏ các ký tự không phải số
      inputValue = inputValue.replace(/\D/g, "");
      // Xử lý giới hạn giá trị từ 1 đến 100
      if (isNaN(inputValue) || inputValue < 1) {
        inputValue = 0;
      } else if (inputValue > 100) {
        inputValue = 100;
      }
      setValue(inputValue);
      setGiaTriKhuyenMai(inputValue);
    }
  };

  const handleChangeToggleButtonDiscount = (event, newAlignment) => {
    var oldAligment = event.target.value;

    if (newAlignment != null) {
      setSeclectDiscount(newAlignment);
      setValue2(null);
    }

    if (newAlignment == null) {
      setSeclectDiscount(oldAligment);
    }
    handleReset();
  };

  const handleReset = () => {
    setValue("");
  };

  //Detail sản phẩm chi tiết đã áp dụng khuyến mãi
  const detailSanPhamSauKhuyenMai = (id) => {
    axios
      .get("http://localhost:8080/san-pham-chi-tiet-khuyen-mai/detail/" + id)
      .then((response) => {
        setSanPhamChiTietKhuyenMai(response.data);
        console.log(sanPhamChiTietKhuyenMai);
      })
      .catch((error) => {
        "Lỗi do hiển thị sản phẩm sau khuyến mãi";
      });
  };

  const detailSanPhamSauKhuyenMai1 = (id) => {
    axios
      .get("http://localhost:8080/san-pham-chi-tiet-khuyen-mai/detail/" + id)
      .then((response) => {
        setSanPhamChiTietKhuyenMai(response.data);
        console.log(sanPhamChiTietKhuyenMai);
      })
      .catch((error) => {
        "Lỗi do hiển thị sản phẩm sau khuyến mãi";
      });
    return sanPhamChiTietKhuyenMai.length;
  };

  //Hàm áp dụng khuyến mãi cho sản phẩm
  const addKhuyenMai = () => {
    let obj = {
      tenKhuyenMai: tenKhuyenMai,
      giaTriKhuyenMai: giaTriKhuyenMai,
      loaiKhuyenMai: selectDiscount,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
    };

    axios
      .post(apiURLKhuyenMai + "/add-khuyen-mai", obj)
      .then((response) => {
        const khuyenMaiID = response.data.id;
        toast.success("Thêm thành công!");
        selectedProductDetails.forEach((idSanPhamChiTiet) => {
          addKhuyenMaiChiTiet(khuyenMaiID, idSanPhamChiTiet);
        });
        setTenKhuyenMai("");
        setValue("");
        setNgayBatDau(dayjs());
        setNgayKetThuc(dayjs());
        // clearSelectedItems();
      })
      .catch((error) => {
        toast.error("Đã xảy ra lỗi khi thêm Khuyến Mãi.");
      });
  };

  const clearSelectedItems = () => {
    setSelectedRowKeys([]);
    setSelectedRowKeys1([]);
    setSelectedRows([]);
    setSelectedRows1([]);
    setSelectedProductDetails([]);
  };

  // Hàm thêm vào khuyến mãi chi tiết
  const addKhuyenMaiChiTiet = (khuyenMaiID, idSanPhamChiTiet) => {
    let objKhuyenMaiChiTiet = {
      idKhuyenMai: khuyenMaiID,
      idSanPhamChiTiet: idSanPhamChiTiet,
    };
    console.log(khuyenMaiID, idSanPhamChiTiet);
    axios
      .post(
        "http://localhost:8080/khuyen-mai-chi-tiet/add",
        objKhuyenMaiChiTiet
      )
      .then((response) => {
        toast.success("Áp Dụng Thành Công!");
        setTenKhuyenMai("");
        setValue("");
        setNgayBatDau(dayjs());
        setNgayKetThuc(dayjs());
        // clearSelectedItems();
        // detailSanPhamSauKhuyenMai(idSPCTKM);
      })
      .catch((error) => {
        toast.error("Đã xảy ra lỗi khi áp dụng Khuyến Mãi vào sản phẩm.");
      });
  };

  //Validate
  const validationAll = () => {
    const msg = {};

    if (!tenKhuyenMai.trim("")) {
      msg.tenKhuyenMai = "Tên không được để trống !!!";
    }

    if (/^\s+|\s+$/.test(tenKhuyenMai)) {
      msg.tenKhuyenMai =
        "Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi";
    }
    if (ngayBatDau.isAfter(ngayKetThuc)) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    if (value == null || value === "") {
      msg.giaTriKhuyenMai = "Giá trị voucher không được để trống !!!";
    }

    if (
      (selectDiscount === "VNĐ" && numericValue2 <= 0) ||
      (selectDiscount === "VNĐ" && numericValue2 > 100000000)
    ) {
      msg.giaTriKhuyenMai = "Giá trị voucher từ 1đ đến 100.000.000đ";
    }

    if (ngayKetThuc.isBefore(ngayBatDau)) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu !!!";
    }

    if (ngayBatDau.isBefore(dayjs())) {
      msg.ngayBatDau = "Ngày bắt đầu phải lớn hơn ngày hiện tại !!!";
    }

    if (ngayKetThuc.isBefore(dayjs())) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày hiện tại !!!";
    }

    console.log(numericValue2);

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    addKhuyenMai();
  };

  const handleCheckboxChange = (record, e) => {
    const id = record.id;
    if (e.target.checked) {
      setSelectedRowKeys([...selectedRowKeys, id]);
      setSelectedRows([...selectedRows, record]);
      loadDatalistSanPhamChiTiet(record.id, true);
    } else {
      loadDatalistSanPhamChiTiet(record.id, false);
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== id));
      setSelectedRows(selectedRows.filter((row) => row.id !== id));
    }
  };

  const handleRowClick = (record) => {
    const id = record.id;
    const checked = !selectedRowKeys.includes(id);
    handleCheckboxChange(record, { target: { checked } });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  //Xử lý khi checkbox trên tiêu đề cột thay đổi
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked === true) {
      setSelectAll(checked);
      const selectedKeys = checked ? listSanPham.map((item) => item.id) : [];
      selectedKeys.forEach((id) => {
        loadDatalistSanPhamChiTiet(id, true);
      });
      console.log(listSanPhamChiTiet);
      setSelectedRowKeys(selectedKeys);
    } else {
      clear();
      setSelectAll(checked);
      const selectedKeys = checked ? listSanPham.map((item) => item.id) : [];
      setSelectedRowKeys(selectedKeys);
    }
  };

  // Thực hiện checkbox ListChiTietSanPham
  const handleCheckboxChange1 = (record, e) => {
    const id = record.id;
    if (e.target.checked) {
      setSelectedRowKeys1([...selectedRowKeys1, id]);
      setSelectedRows1([...selectedRows1, record]);
      setSelectedProductDetails([...selectedProductDetails, id]);
    } else {
      setSelectedRowKeys1(selectedRowKeys1.filter((key) => key !== id));
      setSelectedRows1(selectedRows1.filter((row) => row.id !== id));
      setSelectedProductDetails(
        selectedProductDetails.filter((productId) => productId !== id)
      );
    }
  };

  const handleRowClick1 = (record) => {
    const id = record.id;
    const checked = !selectedRowKeys1.includes(id);
    handleCheckboxChange1(record, { target: { checked } });
  };

  const rowSelection1 = {
    selectedRowKeys1,
    onChange: (selectedRowKeys1, selectedRows1) => {
      setSelectedRowKeys1(selectedRowKeys1);
      setSelectedRows1(selectedRows1);
    },
  };

  const handleSelectAllChange1 = (e) => {
    const checked = e.target.checked;
    setSelectAll1(checked);
    const selectedKeys1 = checked
      ? listSanPhamChiTiet.map((item) => item.id)
      : [];
    setSelectedProductDetails(selectedKeys1);
    setSelectedRowKeys1(selectedKeys1);
  };

  //Code Modal
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

  const thongBaoAnh = () => {};

  //Column bảng Sản Phẩm
  const columns = [
    {
      title: <Checkbox onChange={handleSelectAllChange} checked={selectAll} />,
      dataIndex: "selection",
      width: "5%",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record, e)}
          checked={selectedRowKeys.includes(record.id)}
        />
      ),
      align: "center",
    },
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span>{listSanPham.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Mã",
      dataIndex: "maSanPham",
      width: "10%",
      align: "center",
    },
    {
      title: "Tên sản phẩm ",
      dataIndex: "tenSanPham",
      width: "15%",
      editable: true,
      align: "center",
    },
  ];

  //Column bảng Sản Phẩm Chi Tiết
  const columns1 = [
    {
      title: (
        <Checkbox onChange={handleSelectAllChange1} checked={selectAll1} />
      ),
      dataIndex: "selection1",
      width: "5%",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange1(record, e)}
          checked={selectedRowKeys1.includes(record.id)}
        />
      ),
      align: "center",
    },
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      render: (text, record, index) => (
        <span>{listSanPhamChiTiet.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Badge
          showZero={true}
          className="ms-2"
          badgeContent={record.size}
          color="primary"
        >
          <img
            src={record.duongDan}
            alt="Ảnh"
            style={{ width: "100px", height: "100px" }}
          />
        </Badge>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let tenSanPham = value;
        return <span style={{ whiteSpace: "pre-line" }}> {tenSanPham}</span>;
      },
    },
    {
      title: "ROM",
      dataIndex: "kichThuocRom",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = `${record.kichThuocRom} GB`;
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "RAM ",
      dataIndex: "kichThuocRam",
      width: "10%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = `${record.kichThuocRam} GB`;
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Màu Sắc ",
      dataIndex: "tenMauSac",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "Đơn giá ",
      dataIndex: "donGia",
      width: "10%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = numeral(record.donGia).format("0,0 VND") + " VNĐ";
        return <span>{formattedValue}</span>;
      },
    },

    {
      title: "Giảm giá",
      dataIndex: "giaTriKhuyenMai",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        let formattedValue = value;
        if (selectDiscount === "VNĐ") {
          formattedValue = numeral(value).format("0,0 VND") + " VNĐ";
        } else if (selectDiscount === "%") {
          formattedValue = `${value} %`;
        }
        return <span>{formattedValue}</span>;
      },
    },

    {
      title: "Đơn giá khuyến mãi",
      dataIndex: "donGiaSauKhuyenMai",
      width: "10%",
      editable: true,
      align: "center",
      whiteSpace: "pre-line",
      render: (_, record) => {
        if (isInputChanged) {
          const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
          let giaTriKhuyenMai = record.donGia;
          if (selectDiscount === "VNĐ") {
            giaTriKhuyenMai =
              numeral(record.donGia - numericValue2).format("0,0 VND") + " VNĐ";
            return <span>{giaTriKhuyenMai}</span>;
          } else if (selectDiscount === "%") {
            giaTriKhuyenMai =
              numeral((record.donGia * numericValue2) / 100).format("0,0 VND") +
              " VNĐ";
          }
          return <span>{giaTriKhuyenMai}</span>;
        } else {
          let formattedValue = record.donGia;
          formattedValue = numeral(record.donGia).format("0,0 VND") + " VNĐ";
          return <span>{formattedValue}</span>;
        }
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhTrang",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <Tooltip title="Change">
                <Button
                  onClick={() => {
                    showModal();
                    detailSanPhamSauKhuyenMai(record.id);
                  }}
                  style={{ border: "none", background: "none" }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>{" "}
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const columns2 = [
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      width: "10%",
      render: (text, record) => (
        <img
          src={record.duongDan}
          style={{ width: "100px", height: "100px" }}
        />
      ),
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      width: "10%",
      align: "center",
    },
    {
      title: "ROM",
      dataIndex: "kichThuocRom",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = `${record.kichThuocRom} GB`;
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "RAM ",
      dataIndex: "kichThuocRam",
      width: "10%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = `${record.kichThuocRam} GB`;
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Màu Sắc ",
      dataIndex: "tenMauSac",
      width: "10%",
      editable: true,
      align: "center",
    },
    {
      title: "Tên Khuyến Mãi",
      dataIndex: "tenKhuyenMaiSPCT",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <span
          style={{
            maxWidth: "15%",
            whiteSpace: "pre-line",
            overflow: "hidden",
          }}
        >
          {record.tenKhuyenMaiSPCT}
        </span>
      ),
    },
    {
      title: "Giảm Giá",
      dataIndex: "loaiGiamGia",
      width: "10%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        if (record.loaiKhuyenMai === "VNĐ") {
          formattedValue =
            numeral(record.giaTriKhuyenMai).format("0,0 VND") + " VNĐ";
        } else if (record.loaiKhuyenMai === "%") {
          formattedValue = `${record.giaTriKhuyenMai} %`;
        }
        return (
          <span className="txt-danger" style={{ fontWeight: "400" }}>
            {formattedValue}
          </span>
        );
      },
    },
    {
      title: "Đơn giá ",
      dataIndex: "donGia",
      width: "10%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = numeral(record.donGia).format("0,0 VND") + " VNĐ";
        return <span>{formattedValue}</span>;
      },
    },

    {
      title: "Đơn giá sau khuyến mãi",
      dataIndex: "donGiaSauKhuyenMai",
      width: "10%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue =
          numeral(record.donGiaSauKhuyenMai).format("0,0 VND") + " VNĐ";
        return <span>{formattedValue}</span>;
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const mergedColumns1 = columns1.map((col1) => {
    if (!col1.editable) {
      return col1;
    }
    return {
      ...col1,
      onCell: (record) => ({
        record,
        dataIndex: col1.dataIndex,
        title: col1.title,
      }),
    };
  });

  const mergedColumns2 = columns2.map((col2) => {
    if (!col2.editable) {
      return col2;
    }
    return {
      ...col2,
      onCell: (record) => ({
        record,
        dataIndex: col2.dataIndex,
        title: col2.title,
      }),
    };
  });

  return (
    <>
      <div className="row mt-4 add-promotion-container">
        <div
          className="col-md-5 mt-3"
          style={{ borderRight: "1px solid black" }}
        >
          <h5 className="title-promotion ms-4">Thêm Khuyến Mãi</h5>
          <div className="row-input ms-3 mb-3">
            <div className="input-container">
              <TextField
                label="Tên Khuyến Mãi:"
                value={tenKhuyenMai}
                id="fullWidth"
                onChange={(e) => {
                  setTenKhuyenMai(e.target.value);
                }}
                style={{ width: "430px", marginTop: "10px" }}
                inputProps={{
                  maxLength: 100, // Giới hạn tối đa 10 ký tự
                }}
              />
            </div>
            <span className="validate" style={{ color: "red" }}>
              {validationMsg.tenKhuyenMai}
            </span>
          </div>

          <div className="d-flex ms-3" style={{ marginBottom: "5px" }}>
            <div>
              <RadioGroup
                orientation="horizontal"
                aria-label="Alignment"
                name="alignment"
                variant="outlined"
                value={selectDiscount}
                onChange={handleChangeToggleButtonDiscount}
                sx={{ borderRadius: "12px" }}
              >
                {["VNĐ", "%"].map((item) => (
                  <Box
                    key={item}
                    sx={(theme) => ({
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 47,
                      height: 54,
                      "&:not([data-first-child])": {
                        borderLeft: "1px solid",
                        borderdivor: "divider",
                      },
                      [`&[data-first-child] .${radioClasses.action}`]: {
                        borderTopLeftRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                        borderBottomLeftRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                      },
                      [`&[data-last-child] .${radioClasses.action}`]: {
                        borderTopRightRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                        borderBottomRightRadius: `calc(${theme.vars.radius.sm} + 5px)`,
                      },
                    })}
                  >
                    <Radio
                      value={item}
                      disableIcon
                      overlay
                      label={[item]}
                      variant={selectDiscount === item ? "solid" : "plain"}
                      slotProps={{
                        input: { "aria-label": item },
                        action: {
                          sx: { borderRadius: 0, transition: "none" },
                        },
                        label: { sx: { lineHeight: 0 } },
                      }}
                    />
                  </Box>
                ))}
              </RadioGroup>
            </div>
            <div>
              <TextField
                label="Nhập Giá Trị Khuyến Mãi"
                value={value}
                onChange={handleChange}
                id="outlined-start-adornment"
                InputProps={{
                  inputMode: "numeric",
                  startAdornment: (
                    <InputAdornment position="start">
                      {selectDiscount === "VNĐ" ? "VND" : "%"}
                    </InputAdornment>
                  ),
                }}
                style={{
                  marginLeft: "15px",
                  width: "320px",
                }}
                inputProps={{
                  maxLength: 20, // Giới hạn tối đa 10 ký tự
                }}
              />

              <span
                className="validate"
                style={{ color: "red", paddingLeft: "15px" }}
              >
                {validationMsg.giaTriKhuyenMai}
              </span>
            </div>
          </div>
          <div className="row-input-date ms-3 mt-3">
            <div className="input-container">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    ampm={true}
                    disablePast={true}
                    label="Ngày Bắt Đầu"
                    value={ngayBatDau}
                    format="HH:mm DD/MM/YYYY"
                    onChange={(e) => {
                      setNgayBatDau(e);
                    }}
                    sx={{ width: "430px" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="row-input">
              <span className="validate" style={{ color: "red" }}>
                {validationMsg.ngayBatDau}
              </span>
            </div>
          </div>
          <div className="row-input-date ms-3 mt-3">
            <div className="input-container">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    ampm={true}
                    disablePast={true}
                    label="Ngày Kết Thúc"
                    value={ngayKetThuc}
                    format="HH:mm DD-MM-YYYY"
                    onChange={(e) => {
                      setNgayKetThuc(e);
                    }}
                    sx={{ width: "430px", marginTop: "20px" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="row-input">
              <span className="validate" style={{ color: "red" }}>
                {validationMsg.ngayKetThuc}
              </span>
            </div>
          </div>
          <div className="btn-accept mt-3">
            <Button type="primary" onClick={handleSubmit}>
              Áp Dụng{" "}
              <FontAwesomeIcon icon={faCheck} style={{ paddingLeft: "10px" }} />
            </Button>
            <ToastContainer />
            &nbsp;&nbsp;
            <Button
              type="primary"
              onClick={() => {
                redirectToHienThiKhuyenMai();
              }}
              htmlType="submit"
            >
              Quay Về{" "}
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ paddingLeft: "10px" }}
              />
            </Button>
          </div>
        </div>

        <div className="col-7 mt-3">
          <div className="table-container">
            <h5 className="title-promotion" style={{ marginBottom: "2%" }}>
              Danh sách sản Phẩm
            </h5>
            <Table
              dataSource={listSanPham}
              columns={mergedColumns}
              pagination={{ pageSize: 3 }}
              rowKey="id"
              style={{ marginBottom: "20px" }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (selectedRow === record) {
                      handleRowClick(record);
                    } else {
                      handleRowClick(record);
                      setSelectedRow(record);
                    }
                  },
                  className: selectedRow === record ? "selected-row" : "",
                };
              }}
            />
          </div>
        </div>
        <hr style={{ width: "97.3%", border: "1px solid black " }} />
        <div className="row mt-3">
          <h5 style={{ marginTop: "20px", marginBottom: "10px" }}>
            Danh sách chi tiết sản phẩm
          </h5>
          <Table
            dataSource={listSanPhamChiTiet}
            columns={mergedColumns1}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            style={{ marginBottom: "20px" }}
            onRow={(record) => {
              return {
                onClick: () => {
                  handleRowClick1(record);
                  setSelectedRows1([record]);
                  setIdSanPhamChiTiet(record.id);
                  detailSanPhamSauKhuyenMai(record.id);
                },
                className: selectedRow === record.index ? "selected-row" : "",
              };
            }}
          />
        </div>
      </div>
      <Modal
        title="Sản phẩm áp dụng khuyến mãi"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={1200}
        centered={true}
      >
        {sanPhamChiTietKhuyenMai.length === 0 ? (
          <p>Sản phẩm chưa được áp dụng khuyến mãi !!!</p>
        ) : (
          <Table
            width={1200}
            dataSource={sanPhamChiTietKhuyenMai}
            columns={mergedColumns2}
            pagination={false}
            rowKey="id"
            style={{ marginBottom: "20px" }}
          />
        )}
      </Modal>
    </>
  );
};

export default AddKhuyenMai;
