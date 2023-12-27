import { Button, Checkbox, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookmark,
  faCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiURLKhuyenMai } from "../../../service/api";
import TextField from "@mui/material/TextField";
import "../../../assets/scss/HienThiNV.scss";
import {
  Alert,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs"; // Import thư viện Day.js
import { Table } from "antd";
import "react-toastify/dist/ReactToastify.css";
import numeral from "numeral";
import Badge from "@mui/material/Badge";
import {
  Notistack,
  StatusDiscountNumber,
  TypeDiscountNumber,
  TypeDiscountString,
} from "../order-manager/enum";
import useCustomSnackbar from "../../../utilities/notistack";
import { ConfirmDialog } from "../../../utilities/confirmModalDialoMui";
import { request } from "../../../store/helpers/axios_helper";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const SuaKhuyenMai = () => {
  const [ma, setMa] = useState("");
  const [tenKhuyenMai, setTenKhuyenMai] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState(dayjs());
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs());
  const { id } = useParams();
  const [idChiTietSanPham, setIdChiTietSanPham] = useState([]);
  const [idSanPham, setIdSanPham] = useState([]);
  const [searchRam, setSearchRam] = useState(6);
  const [searchRom, setSearchRom] = useState(6);
  //san-pham
  const [listSanPham, setListSanPham] = useState([]);
  const [listSanPhamChiTiet, setlistSanPhamChiTiet] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  const [selectDiscount, setSelectDiscount] = useState("");
  const [value, setValue] = React.useState();
  const [giaTriKhuyenMai, setGiaTriKhuyenMai] = useState(0);

  //khuyenmaichitiet
  const [idSanPhamChiTiet, setIdSanPhamChiTiet] = useState("");
  //check-box
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);
  //Lấy id ctsp
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  const [sanPhamChiTietKhuyenMai, setSanPhamChiTietKhuyenMai] = useState([]);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [idCheckboxdelete, setIdCheckboxdelete] = useState([]);
  const [sortValueProductDetail, setSortValueProductDetail] = useState("all");
  const [status, setStatus] = useState("");

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  let successfulCount = 0;
  let successfulCount1 = 0;

  const redirectToHienThiKhuyenMai = () => {
    navigate("/dashboard/discounts");
  };

  const handleOpenDialogConfirmAdd = () => {
    setOpenConfirm(true);
  };

  const handleCloseDialogConfirmAdd = () => {
    setOpenConfirm(false);
  };

  const Header = () => {
    return (
      <>
        <span className="">Xác nhận sửa giảm giá</span>
      </>
    );
  };
  const Title = () => {
    return (
      <>
        <span>
          Bạn có chắc chắc muốn sửa giá trị có tên là{" "}
          <span style={{ color: "red" }}>{tenKhuyenMai}</span> và với giá trị{" "}
          <span style={{ color: "red" }}>{value}</span>
          <span style={{ color: "red" }}>
            {selectDiscount === TypeDiscountString.VND ? "VND" : "%"}
          </span>{" "}
          không ?
        </span>
      </>
    );
  };

  const loadDatalistSanPham = () => {
    request("GET", "/san-pham-1")
      .then((response) => {
        setListSanPham(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const loadDatalistSanPhamChiTiet = (id, check) => {
    request("GET", "/san-pham-chi-tiet-1/" + id + "/" + check)
      .then((response) => {
        setlistSanPhamChiTiet(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const clear = () => {
    request("GET", "/san-pham-chi-tiet/removeALL")
      .then((response) => {
        setlistSanPhamChiTiet(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const handleChange = (event) => {
    if (selectDiscount === TypeDiscountString.VND) {
      const inputValue = event.target.value;
      const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));
      const formattedValue = inputValue
        .replace(/[^0-9]+/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setValue(formattedValue);
      setGiaTriKhuyenMai(numericValue);
      setIsInputChanged(true);
    }
    if (selectDiscount === TypeDiscountString.PERCENT) {
      let inputValue = event.target.value;
      // Loại bỏ các ký tự không phải số
      inputValue = inputValue.replace(/\D/g, "");
      // Xử lý giới hạn giá trị từ 1 đến 100
      if (isNaN(inputValue) || inputValue < 1) {
        inputValue = "0";
      } else if (inputValue > 100) {
        inputValue = "100";
      }
      setValue(inputValue);
      setGiaTriKhuyenMai(inputValue);
    }
  };

  const convertTien = (value) => {
    const numericValue1 = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
    const formattedValue1 = String(value)
      .replace(/[^0-9]+/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValue(formattedValue1);
    setGiaTriKhuyenMai(numericValue1);
  };

  const detailKhuyenMai = () => {
    request("GET", apiURLKhuyenMai + "/get-by-id/" + id)
      .then((response) => {
        console.log(response);
        setTenKhuyenMai(response.data.data.tenKhuyenMai);
        setSelectDiscount(
          response.data.data.loaiKhuyenMai == TypeDiscountNumber.VND
            ? TypeDiscountString.VND
            : TypeDiscountString.PERCENT
        );
        setStatus(response.data.data.trangThai);
        setValue(response.data.data.giaTriKhuyenMai);
        setNgayBatDau(response.data.data.ngayBatDau);
        setNgayKetThuc(response.data.data.ngayKetThuc);
        convertTien(response.data.data.giaTriKhuyenMai);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  const detailKhuyenMaiChiTiet = () => {
    request("GET", "/detail/khuyen-mai/" + id)
      .then((response) => {
        const data1 = response.data.data;
        const listIdSanPham = data1.map((item) => item.idSanPham);
        const uniqueSelectedRowKeys = Array.from(new Set(listIdSanPham));
        const listIdSanPhamChiTiet = data1.map((item) => item.idSanPhamChiTiet);
        setIdSanPham(uniqueSelectedRowKeys);
        uniqueSelectedRowKeys.forEach((idSanPham) => {
          loadDatalistSanPhamChiTiet(idSanPham, true);
        });
        setSelectedRowKeys(uniqueSelectedRowKeys);
        setSelectedRowKeys1(listIdSanPhamChiTiet);
        setIdSanPhamChiTiet(listIdSanPhamChiTiet);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  //Detail sản phẩm chi tiết đã áp dụng khuyến mãi
  const detailSanPhamSauKhuyenMai = (id) => {
    request("GET", "/san-pham-chi-tiet-khuyen-mai/detail/" + id)
      .then((response) => {
        console.log("SanPHamSauKhuyenMai" + response);
        setSanPhamChiTietKhuyenMai(response.data.data);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên.",
          Notistack.ERROR
        );
      });
  };

  useEffect(() => {
    detailKhuyenMai();
    detailKhuyenMaiChiTiet(idSanPham);
    loadDatalistSanPham();
    clear();
  }, []);

  const suaKhuyenMai = () => {
    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    let obj = {
      tenKhuyenMai: tenKhuyenMai,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      loaiKhuyenMai: selectDiscount,
      giaTriKhuyenMai: numericValue2,
    };
    request("PUT", apiURLKhuyenMai + "/update-khuyen-mai/" + id, obj)
      .then((response) => {
        idCheckboxdelete.forEach((idSP) => {
          deleteKhuyenMaiChiTiet(id, idSP);
        });
        idSanPhamChiTiet.forEach((idSP) => {
          updateKhuyenMaiChiTiet(id, idSP);
        });
        selectedProductDetails.forEach((idSanPhamChiTiet) => {
          successfulCount++;
          addKhuyenMaiChiTiet(id, idSanPhamChiTiet);
        });
        idSanPhamChiTiet.forEach((idSP) => {
          updateSanPhamChiTiet(idSP);
        });
        handleOpenAlertVariant("Cập nhật thành công.", Notistack.SUCCESS);
        setTimeout(() => {
          redirectToHienThiKhuyenMai();
        }, 1000);
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi khi sửa giảm giá.",
          Notistack.ERROR
        );
      });
  };

  const deleteKhuyenMaiChiTiet = (khuyenMaiID, idSP) => {
    request("DELETE", "/khuyen-mai-chi-tiet/update/" + khuyenMaiID + "/" + idSP)
      .then((response) => {
        console.log("Xóa thành công");
      })
      .catch((error) => {
        console.log("Xóa thất bại");
      });
  };

  const updateKhuyenMaiChiTiet = (khuyenMaiID, idSP) => {
    request(
      "PUT",
      "/khuyen-mai-chi-tiet/update-don-gia/" + khuyenMaiID + "/" + idSP
    )
      .then((response) => {
        console.log("Update thành công");
      })
      .catch((error) => {
        console.log("Update thất bại");
      });
  };

  const updateSanPhamChiTiet = (idSP) => {
    request("PUT", "/khuyen-mai-chi-tiet/update-san-pham/" + idSP)
      .then((response) => {
        console.log("Update thành công");
      })
      .catch((error) => {
        console.log("Update thất bại");
      });
  };

  const addKhuyenMaiChiTiet = (khuyenMaiID, idSanPhamChiTiet) => {
    let objKhuyenMaiChiTiet = {
      idKhuyenMai: khuyenMaiID,
      idSanPhamChiTiet: idSanPhamChiTiet,
    };
    request("POST", "/khuyen-mai-chi-tiet/add", objKhuyenMaiChiTiet)
      .then((response) => {
        successfulCount1++;
        if (successfulCount === successfulCount1) {
          handleOpenAlertVariant(
            "Áp dụng giảm giá thành công",
            Notistack.SUCCESS
          );
          console.log("Áp dụng thành công");
        }
      })
      .catch((error) => {
        handleOpenAlertVariant(
          "Đã xảy ra lỗi khi áp dụng giảm giá.",
          Notistack.ERROR
        );
      });
  };

  //Validate
  const validationAll = () => {
    const msg = {};

    if (!tenKhuyenMai.trim("")) {
      msg.tenKhuyenMai = "Tên không được để trống !!!";
    } else if (/^\s+|\s+$/.test(tenKhuyenMai)) {
      msg.tenKhuyenMai =
        "Tên không chứa ký tự khoảng trống ở đầu và cuối chuỗi";
    } else if (tenKhuyenMai.length < 5) {
      msg.tenKhuyenMai = "Tên phải có ít nhất 5 ký tự!";
    }

    const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
    if (value == null || value === "") {
      msg.giaTriKhuyenMai = "Giá trị giảm giá không được để trống !!!";
    }

    if (
      (selectDiscount === TypeDiscountString.VND && numericValue2 <= 0) ||
      (selectDiscount === TypeDiscountString.VND && numericValue2 > 100000000)
    ) {
      msg.giaTriKhuyenMai = "Giá trị giảm giá từ 1đ đến 100.000.000đ";
    }

    if (selectDiscount === TypeDiscountString.PERCENT && numericValue2 <= 0) {
      msg.giaTriKhuyenMai = "Giá trị tối đa chỉ nằm trong khoảng 1% - 100% !!!";
    }

    if (selectDiscount === TypeDiscountString.PERCENT && value <= 0) {
      msg.value = "Giá trị tối đa chỉ nằm trong khoảng 1% - 100% !!!";
    }

    if (
      dayjs(ngayKetThuc).isBefore(dayjs(ngayBatDau)) |
      (dayjs(ngayKetThuc) === dayjs(ngayBatDau))
    ) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu !!!";
    } else if (dayjs(ngayBatDau).isAfter(dayjs(ngayKetThuc))) {
      msg.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc !!!";
    }

    if (dayjs(ngayKetThuc).isBefore(dayjs())) {
      msg.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày hiện tại !!!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleSubmit = () => {
    const isValid = validationAll();
    if (!isValid) return;
    suaKhuyenMai();
  };

  // Code check box
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log("onSelectChange :" + newSelectedRowKeys);
    if (newSelectedRowKeys.length === 0) {
      clear();
    } else {
      clear();
      newSelectedRowKeys
        .reduce((prevPromise, id) => {
          return prevPromise.then(() => loadDatalistSanPhamChiTiet(id, true));
        }, Promise.resolve())
        .catch((error) => {
          console.log("Đã xảy ra lỗi");
        });
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  // Hàm xử lý sự kiện khi chọn (select) thay đổi
  const onSelectChange1 = (newSelectedRowKeys1) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys1);
    const previouslySelectedKeys = selectedRowKeys1;
    const deselectedKeys = previouslySelectedKeys.filter(
      (key) => !newSelectedRowKeys1.includes(key)
    );
    setIdCheckboxdelete((prevDeselectedIds) => [
      ...prevDeselectedIds,
      ...deselectedKeys,
    ]);
    console.log("Danh sách ID bỏ chọn: ", idCheckboxdelete);
    setSelectedRowKeys1(newSelectedRowKeys1);
    setSelectedProductDetails(newSelectedRowKeys1);
  };

  const rowSelection1 = {
    selectedRowKeys: selectedRowKeys1,
    onChange: onSelectChange1,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  //Column bảng Sản Phẩm
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
      render: (text, record, index) => (
        <span>{listSanPham.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Mã",
      dataIndex: "maSanPham",
      key: "maSanPham",
      width: "30%",
      align: "center",
    },
    {
      title: "Tên sản phẩm ",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      width: "30%",
      editable: true,
      align: "center",
    },
    {
      title: "Dòng sản phẩm ",
      dataIndex: "tenHang",
      key: "tenHang",
      width: "30%",
      editable: true,
      align: "center",
    },
  ];

  //Column bảng Sản Phẩm Chi Tiết
  const columns1 = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "10%",
      render: (text, record, index) => (
        <span>{listSanPhamChiTiet.indexOf(record) + 1}</span>
      ),
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      key: "duongDan",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <Badge
          showZero={true}
          className="ms-2"
          badgeContent={record.size}
          color="primary"
        >
          <div className="image-container" style={{ position: "relative" }}>
            <img
              src={record.duongDan}
              alt="Ảnh"
              style={{ width: "130px", height: "130px" }}
            />
            {/* {record.giaTriKhuyenMai !== null && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{
                    fontSize: "2.7em",
                    color: record.giaTriKhuyenMai > 5000000 ? "red" : "#ffcc00",
                    zIndex: 1,
                    position: "relative",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "43%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "11px",
                    color: record.giaTriKhuyenMai > 50 ? "white" : "black",
                    zIndex: 2,
                  }}
                >
                  <strong>
                    Giảm
                    <br /> {record.giaTriKhuyenMai}đ
                  </strong>
                </span>
              </div>
            )} */}

            {record.giaTriKhuyenMai !== null && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "43%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "11px",
                    color:
                      record.giaTriKhuyenMai > 10000000 ? "white" : "black",
                    zIndex: 2,
                  }}
                >
                  <div
                    className="category"
                    style={{
                      backgroundColor:
                        record.giaTriKhuyenMai > 10000000 ? "red" : "#ffcc00",
                      position: "relative",
                      top: "1px",
                      borderTopLeftRadius: `8px`,
                      borderTopRightRadius: `20px`,
                      borderBottomRightRadius: `20px`,
                      fontWeight: "600",
                      opacity: 1, // Change opacity to 1 to make it visible
                      padding: "4px 8px", // Add padding for better visibility
                      marginLeft: "100px",
                      marginTop: "25px",
                    }}
                  >
                    Giảm{" "}
                    {numeral(record.giaTriKhuyenMai).format("0,0 VND") + " ₫"}
                  </div>
                </span>
              </div>
            )}
          </div>
        </Badge>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      width: "20%",
      align: "center",
      maxWidth: "20%",
      render: (value, record) => {
        return (
          <span style={{ whiteSpace: "pre-line" }}>
            {record.tenSanPham} {record.kichThuocRam}GB/{record.kichThuocRom}GB{" "}
            {"("}
            {record.tenMauSac}
            {")"}
          </span>
        );
      },
    },
    {
      title: "Đơn giá ",
      dataIndex: "donGia",
      key: "donGia",
      width: "20%",
      editable: true,
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = numeral(record.donGia).format("0,0 VND") + " ₫";
        return <span>{formattedValue}</span>;
      },
    },

    {
      title: "Giảm giá",
      dataIndex: "giaTriKhuyenMai",
      key: "giaTriKhuyenMai",
      width: "10%",
      editable: true,
      align: "center",
      render: (_, record) => {
        let formattedValue;
        const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
        if (record.giaTriKhuyenMai === null) {
          formattedValue = numeral(numericValue2).format("0,0 VND") + " ₫";
        } else {
          if (value === "0" || value === "" || value == null) {
            formattedValue =
              numeral(record.giaTriKhuyenMai).format("0,0 VND") + " ₫";
          } else {
            const total = record.tong === null ? 0 : record.tong;
            formattedValue = Math.round(
              (total + parseInt(numericValue2)) / (record.size + 1)
            );
            formattedValue = numeral(formattedValue).format("0,0 VND") + " ₫";
          }
        }
        return <span>{formattedValue}</span>;
      },
    },

    {
      title: "Đơn giá sau giảm giá",
      dataIndex: "donGiaSauKhuyenMai",
      key: "donGiaSauKhuyenMai",
      width: "20%",
      editable: true,
      align: "center",
      whiteSpace: "pre-line",
      render: (_, record) => {
        const numericValue2 = parseFloat(value?.replace(/[^0-9.-]+/g, ""));
        let formattedValue = record.donGia;
        const validNumericValue2 = isNaN(numericValue2) ? 0 : numericValue2;
        if (record.giaTriKhuyenMai === null) {
          formattedValue = record.donGia - validNumericValue2;
        } else {
          if (value === "0" || value === "" || value == null) {
            formattedValue = record.donGia - record.giaTriKhuyenMai;
          } else {
            const total = record.tong === null ? 0 : record.tong;
            formattedValue =
              record.donGia -
              Math.round((total + numericValue2) / (record.size + 1));
          }
        }
        return <span>{numeral(formattedValue).format("0,0 VND") + " ₫"}</span>;
      },
    },
  ];

  const handleChangeToggleButtonDiscount = (event) => {
    const newAlignment = event.target.value;
    if (newAlignment != null) {
      setSelectDiscount(newAlignment);
    }

    if (newAlignment == null) {
      setSelectDiscount(null);
    }
    handleReset();
  };

  const handleReset = () => {
    setValue("");
  };

  const [openSelect, setOpenSelect] = useState(false);

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleSearchRamChange = (event) => {
    const selectedValue = event.target.value;
    setSearchRam(selectedValue);
    // setCurrentPage(1);
  };
  const [openSelect1, setOpenSelect1] = useState(false);

  const handleCloseSelect1 = () => {
    setOpenSelect1(false);
  };

  const handleOpenSelect1 = () => {
    setOpenSelect1(true);
  };

  const handleSearchRomChange = (event) => {
    const selectedValue = event.target.value;
    setSearchRom(selectedValue);
    // setCurrentPage(1);
  };

  const [openSelect3, setOpenSelect3] = useState(false);
  const handleCloseSelect3 = () => {
    setOpenSelect3(false);
  };

  const handleOpenSelect3 = () => {
    setOpenSelect3(true);
  };

  const handleSortValueProductDetail = (event) => {
    const selectedValue = event.target.value;
    setSortValueProductDetail(selectedValue);
    // setCurrentPage(1);
  };

  return (
    <>
      <div className="row">
        <div className="col-4">
          <div className="mt-3 add-promotion-container">
            <h5
              className="title-promotion ms-4"
              style={{ paddingBottom: "5px" }}
            >
              Sửa Giảm Giá
            </h5>
            <div className="ms-3 mb-3 mt-2">
              <div className="input-container">
                <TextField
                  label="Tên Giảm Giá:"
                  value={tenKhuyenMai}
                  id="fullWidth"
                  onChange={(e) => {
                    setTenKhuyenMai(e.target.value);
                  }}
                  style={{ width: "335px", marginTop: "10px" }}
                  inputProps={{
                    maxLength: 255, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.tenKhuyenMai !== undefined}
                  helperText={validationMsg.tenKhuyenMai}
                />
              </div>
            </div>

            <div className="d-flex ms-3" style={{ marginBottom: "5px" }}>
              {/* <div>
                <RadioGroup
                  orientation="horizontal"
                  aria-label="Alignment"
                  name="alignment"
                  variant="outlined"
                  value={selectDiscount}
                  onChange={handleChangeToggleButtonDiscount}
                  sx={{ borderRadius: "12px" }}
                >
                  {[TypeDiscountString.PERCENT, TypeDiscountString.VND].map(
                    (item) => (
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
                          value={
                            item === TypeDiscountString.VND
                              ? TypeDiscountString.VND
                              : TypeDiscountString.PERCENT
                          }
                          disableIcon
                          overlay
                          label={[
                            item === TypeDiscountString.VND
                              ? "VND"
                              : item === TypeDiscountString.PERCENT
                              ? "%"
                              : "",
                          ]}
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
                    )
                  )}
                </RadioGroup>
              </div> */}
              <div>
                <TextField
                  label="Nhập Giá Trị Giảm Giá"
                  value={value}
                  onChange={handleChange}
                  id="outlined-start-adornment"
                  InputProps={{
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">VNĐ</InputAdornment>
                    ),
                  }}
                  style={{
                    width: "335px",
                  }}
                  inputProps={{
                    maxLength: 20, // Giới hạn tối đa 10 ký tự
                  }}
                  error={validationMsg.giaTriKhuyenMai !== undefined}
                  helperText={validationMsg.giaTriKhuyenMai}
                />
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
                      value={dayjs(ngayBatDau)}
                      format="HH:mm DD/MM/YYYY"
                      onChange={(e) => {
                        setNgayBatDau(e);
                        setNgayKetThuc(e);
                      }}
                      sx={{ width: "335px" }}
                      slotProps={{
                        textField: {
                          error: validationMsg.ngayBatDau !== undefined,
                          helperText:
                            !!validationMsg.ngayBatDau !== undefined
                              ? validationMsg.ngayBatDau
                              : "",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
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
                      value={dayjs(ngayKetThuc)}
                      format="HH:mm DD/MM/YYYY"
                      onChange={(e) => {
                        setNgayKetThuc(e);
                      }}
                      sx={{ width: "335px", marginTop: "20px" }}
                      slotProps={{
                        textField: {
                          error: validationMsg.ngayKetThuc !== undefined,
                          helperText:
                            !!validationMsg.ngayKetThuc !== undefined
                              ? validationMsg.ngayKetThuc
                              : "",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="mt-2">
              {status === StatusDiscountNumber.HOAT_DONG ? (
                <Alert
                  severity="warning"
                  className="mx-auto"
                  style={{ maxWidth: "90%" }}
                >
                  Không thể sửa khi giảm giá ĐANG HOẠT ĐỘNG, hãy đổi trạng thái
                  thành tạm dừng!
                </Alert>
              ) : status === StatusDiscountNumber.DA_HUY ? (
                <Alert
                  severity="warning"
                  className="mx-auto"
                  style={{ maxWidth: "90%" }}
                >
                  Không thể sửa khi giảm giá ĐÃ HỦY!
                </Alert>
              ) : (
                ""
              )}
            </div>
            <div className="btn-accept mt-3">
              <Button
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "100px", fontSize: "15px" }}
                onClick={handleSubmit}
                disabled={
                  status === StatusDiscountNumber.HOAT_DONG
                    ? true
                    : status === StatusDiscountNumber.DA_HUY
                    ? true
                    : false
                }
              >
                <FontAwesomeIcon icon={faCheck} />
                <span
                  className="ms-1"
                  style={{ marginBottom: "3px", fontWeight: "500" }}
                >
                  Áp dụng
                </span>
              </Button>
              &nbsp;&nbsp;
              <Button
                className="rounded-2 button-mui"
                type="primary"
                style={{ height: "40px", width: "100px", fontSize: "15px" }}
                onClick={() => {
                  setTimeout(() => {
                    setIsLoading(false);
                    redirectToHienThiKhuyenMai();
                  }, 200);
                }}
                htmlType="submit"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span
                  className="ms-1"
                  style={{ marginBottom: "3px", fontWeight: "500" }}
                >
                  Quay về
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="col-8">
          <div className="add-promotion-inProduct-container">
            <div className="mt-3">
              <h5 className="title-product" style={{ paddingBottom: "15px" }}>
                Danh sách sản phẩm
              </h5>
              <div className="header-title mb-3 ms-3">
                <TextField
                  placeholder="Tìm theo mã, tên sản phẩm"
                  label="Tìm sản phẩm"
                  // value={searchTatCa}
                  // onChange={handleSearchTatCaChange}
                  InputLabelProps={{
                    sx: {
                      marginTop: "",
                      textTransform: "capitalize",
                    },
                  }}
                  inputProps={{
                    style: {
                      height: "23px",
                      width: "350px",
                    },
                  }}
                  size="small"
                  className=""
                />
                <Button
                  // onClick={() => {
                  //   handleReset();
                  // }}
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
              <Table
                className="table-container"
                style={{
                  margin: "0 18px",
                }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={listSanPham}
                rowKey="id"
                pagination={{
                  pageSize: 4,
                  position: ["bottomCenter"],
                }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 ms-1 mb-3 add-promotion-inProduct-detail-container">
          <h5
            style={{
              margin: "15px",
            }}
          >
            Danh sách sản phẩm chi tiết
          </h5>
          <div className="header-title mb-3 ms-3 d-flex">
            <TextField
              placeholder="Tìm theo mã, tên sản phẩm"
              label="Tìm sản phẩm chi tiết"
              // value={searchTatCa}
              // onChange={handleSearchTatCaChange}
              InputLabelProps={{
                sx: {
                  marginTop: "",
                  textTransform: "capitalize",
                },
              }}
              inputProps={{
                style: {
                  height: "23px",
                  width: "350px",
                },
              }}
              size="small"
              className=""
            />
            <Button
              // onClick={() => {
              //   handleReset();
              // }}
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
            <div
              className="d-flex ms-5"
              style={{
                height: "40px",
                // position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                // onClick={handleOpenSelect}
                className=""
                style={{ marginTop: "7px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  RAM:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  open={openSelect}
                  onClose={handleCloseSelect}
                  onOpen={handleOpenSelect}
                  value={searchRam}
                  onChange={handleSearchRamChange}
                >
                  <MenuItem className="" value={6}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={1}>2 GB</MenuItem>
                </Select>
              </FormControl>
              <div
                // onClick={handleOpenSelect}
                className=""
                style={{ marginTop: "7px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  ROM:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  open={openSelect1}
                  onClose={handleCloseSelect1}
                  onOpen={handleOpenSelect1}
                  value={searchRom}
                  onChange={handleSearchRomChange}
                >
                  <MenuItem className="" value={6}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value={1}>2 GB</MenuItem>
                </Select>
              </FormControl>
              <div
                // onClick={handleOpenSelect}
                className=""
                style={{ marginTop: "7px" }}
              >
                <span
                  className="ms-2 ps-1"
                  style={{ fontSize: "15px", fontWeight: "450" }}
                >
                  Sắp Xếp Đơn Giá:{" "}
                </span>
              </div>
              <FormControl
                sx={{
                  minWidth: 50,
                }}
                size="small"
              >
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: "7px",
                      },
                    },
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiSelect-select": {
                      color: "#2f80ed",
                      fontWeight: "500",
                    },
                  }}
                  open={openSelect3}
                  onClose={handleCloseSelect3}
                  onOpen={handleOpenSelect3}
                  value={sortValueProductDetail}
                  onChange={handleSortValueProductDetail}
                >
                  <MenuItem className="" value={"all"}>
                    Mặc định
                  </MenuItem>
                  <MenuItem value={"a-z"}>Tăng dần theo giá trị</MenuItem>
                  <MenuItem value={"z-a"}>Giảm dần theo giá trị</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Table
            className="table-container"
            rowSelection={rowSelection1}
            columns={columns1}
            dataSource={listSanPhamChiTiet}
            rowKey="id"
            pagination={{
              pageSize: 5,
              position: ["bottomCenter"],
            }}
          />
        </div>
      </div>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseDialogConfirmAdd}
        add={suaKhuyenMai}
        title={<Title />}
        header={<Header />}
      />
    </>
  );
};

export default SuaKhuyenMai;
