import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Col, Row } from "react-bootstrap";
import "./thong-ke.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpRightDots,
  faArrowUpWideShort,
  faMinus,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { Card, FormControl, MenuItem, Select } from "@mui/material";
import * as dayjs from "dayjs";
import Slider from "@material-ui/core/Slider";
import { Table, ArrowUpOutlined, Button, Image } from "antd";
import numeral from "numeral";
import { request } from "../../../store/helpers/axios_helper";
import { ButtonGroup } from "@mui/joy";
const ThongKeDoanhThu = () => {
  const [listDonHangAll, setListDonHangAll] = useState([]);
  // const [listDonHangInMonth, setListDonHangInMonth] = useState([]);
  const [listSanPham, setListSanPham] = useState([]);
  const [listSanPhambanChay, setListSanPhamBanChay] = useState([]);
  const [listSanPhamSapHet, setListSanPhamSapHet] = useState([]);
  const [listSanPhamDoiTra, setListSanPhamDoiTra] = useState([]);
  const [loaiBoLoc, setLoaiBoLoc] = useState("thang");
  const [loaiBoLocTDTT, setLoaiBoLocTDTT] = useState("thang");

  const [trangThaiDonHang, setTrangThaiDonHang] = useState([]);
  const [listSoLuongDonHangTheoNam, setListSoLuongDonHang] = useState([]);
  const [listSoLuongSanPhamTheoNam, setListSoLuongSanPham] = useState([]);
  const [listDonHangInMonth, setListDonHangInMonth] = useState([]);
  const [listDonHangInDay, setListDonHangInDay] = useState([]);
  const [searchStartDate, setSearchStartDate] = useState(dayjs());
  const [searchEndDate, setSearchEndDate] = useState(dayjs().add(7, "day"));
  const [searchMonth, setSearchMonth] = useState();

  const [searchNgayBatDau, setSearchNgayBatDau] = useState("");
  const [searchNgayKetThuc, setSearchNgayKetThuc] = useState("");

  const [searchNgayBatDau1, setSearchNgayBatDau1] = useState("");
  const [searchNgayKetThuc1, setSearchNgayKetThuc1] = useState("");

  const [tocDoTangTruong, setTocDoTangTruong] = useState([]);
  const [activeButton, setActiveButton] = useState("thang");
  const [activeButton1, setActiveButton1] = useState("thang");
  const [openDate, setOpenDate] = useState(false);

  const thongKeTheoNgay = () => {
    request("GET", `/thong-ke/in-day`)
      .then((response) => {
        setListDonHangInDay(response.data);
      })
      .catch((error) => { });
  };

  const thongKeTheoThang = () => {
    request("GET", `/thong-ke/in-month`)
      .then((response) => {
        setListDonHangInMonth(response.data);
      })
      .catch((error) => { });
  };

  const thongKeTheoSanPham = () => {
    request("GET", `/thong-ke/san-pham`)
      .then((response) => {
        setListSanPham(response.data);
      })
      .catch((error) => { });
  };

  const getSanPhamBanChay = () => {
    request("GET", `/thong-ke/san-pham-ban-chay?chonTheo=${loaiBoLoc}`)
      .then((response) => {
        setListSanPhamBanChay(response.data);
      })
      .catch((error) => { });
  };

  const getSanPhamSapHetHang = () => {
    request("GET", `/thong-ke/san-pham-sap-het-hang`)
      .then((response) => {
        setListSanPhamSapHet(response.data);
      })
      .catch((error) => { });
  };

  const getTocDoTangTruong = () => {
    request("GET", `/thong-ke/toc-do-tang-truong`)
      .then((response) => {
        setTocDoTangTruong(response.data);
      })
      .catch((error) => { });
  };

  const getSanPhamDoiTra = () => {
    request("GET", `/thong-ke/san-pham-doi-tra`)
      .then((response) => {
        setListSanPhamDoiTra(response.data);
      })
      .catch((error) => { });
  };

  // const getSanPhamBanChay = () => {
  //   axios
  //     .get(`http://localhost:8080/thong-ke/san-pham-khoang-ngay`, {
  //       params: {
  //         date1: searchNgayBatDau,
  //         date2: searchNgayKetThuc,
  //       },
  //     })
  //     .then((response) => {
  //       setListSoLuongSanPham(response.data);
  //     })
  //     .catch((error) => {});
  // };

  // const getDonHang = () => {
  //   axios
  //     .get(`http://localhost:8080/thong-ke/san-pham-khoang-ngay`, {
  //       params: {
  //         date1: searchNgayBatDau,
  //         date2: searchNgayKetThuc,
  //       },
  //     })
  //     .then((response) => {
  //       setListSoLuongSanPham(response.data);
  //     })
  //     .catch((error) => {});
  // };

  useEffect(() => {
    thongKeTheoNgay();
    thongKeTheoThang();
    thongKeTheoSanPham();
    getSanPhamBanChay();
    getSanPhamSapHetHang();
    getTocDoTangTruong();
    getSanPhamDoiTra();
  }, [loaiBoLoc]);

  const convertToVND = (number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  };

  // const [numberOfDays, setNumberOfDays] = useState(10);
  // const [chartData, setChartData] = useState({});
  // const currentDate = new Date();

  // const daysInMonth = new Date(
  //   currentDate.getFullYear(),
  //   currentDate.getMonth() + 1,
  //   0
  // ).getDate();

  // const allDaysInMonth = Array.from(
  //   { length: daysInMonth },
  //   (_, index) => index + 1
  // );

  // const formattedDays = allDaysInMonth.map((day) => {
  //   const formattedDay = day < 10 ? `0${day}` : `${day}`;
  //   const formattedMonth =
  //     currentDate.getMonth() + 1 < 10
  //       ? `0${currentDate.getMonth() + 1}`
  //       : `${currentDate.getMonth() + 1}`;
  //   return `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`;
  // });

  // const fetchData = (numberOfDays) => {
  //   const sanPhamPromise = request("GET", `/thong-ke/san-pham-khoang-ngay`, {
  //     params: {
  //       date1: searchNgayBatDau,
  //       date2: searchNgayKetThuc,
  //     },
  //   });

  //   const donHangPromise = request("GET", `/thong-ke/don-hang-khoang-ngay`, {
  //     params: {
  //       date1: searchNgayBatDau,
  //       date2: searchNgayKetThuc,
  //     },
  //   });
  //   Promise.all([sanPhamPromise, donHangPromise])
  //     .then(([sanPhamResponse, donHangResponse]) => {
  //       const sanPhamData = sanPhamResponse.data;
  //       const donHangData = donHangResponse.data;

  //       const availableDays = [
  //         ...new Set([
  //           ...sanPhamData.map((item) => item.ngayTao),
  //           ...donHangData.map((item) => item.ngayTao),
  //         ]),
  //       ];

  //       // Kết hợp dữ liệu của sanPhamData và donHangData
  //       const combinedData = formattedDays.map((day) => {
  //         const sanPhamItem = sanPhamData.find((item) => item.ngayTao === day);
  //         const donHangItem = donHangData.find((item) => item.ngayTao === day);

  //         return {
  //           ngayTao: day,
  //           soLuongSanPham: sanPhamItem ? sanPhamItem.soLuong : 0,
  //           soLuongDonHang: donHangItem ? donHangItem.soLuong : 0,
  //         };
  //       });

  //       // Tạo dữ liệu cho biểu đồ
  //       const labels = combinedData.map((item) => item.ngayTao);
  //       const dataSanPham = combinedData.map((item) => item.soLuongSanPham);
  //       const dataDonHang = combinedData.map((item) => item.soLuongDonHang);

  //       const truncatedData = combinedData.slice(-numberOfDays);
  //       const truncatedLabels = labels.slice(-numberOfDays);
  //       const truncatedDataSanPham = dataSanPham.slice(-numberOfDays);
  //       const truncatedDataDonHang = dataDonHang.slice(-numberOfDays);

  //       const filteredData = combinedData.filter((item) =>
  //         availableDays.includes(item.ngayTao)
  //       );

  //       // Cập nhật biểu đồ
  //       setChartData({
  //         labels: truncatedLabels,
  //         datasets: [
  //           {
  //             label: "Số lượng đơn hàng",
  //             data: truncatedDataDonHang,
  //             backgroundColor: "#2f80ed",
  //             borderColor: "#2f80ed",
  //             borderWidth: 1,
  //           },
  //           {
  //             label: "Sản phẩm",
  //             data: truncatedDataSanPham,
  //             backgroundColor: "#ff7b00",
  //             borderColor: "#ff7b00",
  //             borderWidth: 1,
  //           },
  //         ],
  //       });
  //     })
  //     .catch((error) => {
  //       // Xử lý lỗi nếu có
  //     });
  // };

  // useEffect(() => {
  //   fetchData(numberOfDays);
  // }, [numberOfDays, searchNgayBatDau, searchNgayKetThuc]);

  // useEffect(() => {
  //   const ctx = document.getElementById("mixedChart");

  //   let chartRef = null;
  //   if (ctx) {
  //     chartRef = new Chart(ctx, {
  //       type: "bar",
  //       data: chartData,
  //       options: {
  //         indexAxis: "x",
  //         plugins: {
  //           datalabels: {
  //             anchor: "end",
  //             align: "end",
  //           },
  //         },
  //       },
  //     });
  //   }

  //   return () => {
  //     if (chartRef) {
  //       chartRef.destroy();
  //     }
  //   };
  // }, [chartData]);

  // const handleSliderChange = (event, newValue) => {
  //   setNumberOfDays(newValue);
  //   fetchData(newValue);
  // };

  const handleSearchNgayBatDauChange = (date) => {
    setSearchNgayBatDau(dayjs(date).format("DD/MM/YYYY"));
  };

  const handleSearchNgayKetThucChange = (date) => {
    setSearchNgayKetThuc(dayjs(date).format("DD/MM/YYYY"));
  };

  const handleSearchNgayBatDauChange1 = (date) => {
    setSearchNgayBatDau1(dayjs(date).format("DD/MM/YYYY"));
  };

  const handleSearchNgayKetThucChange1 = (date) => {
    setSearchNgayKetThuc1(dayjs(date).format("DD/MM/YYYY"));
  };
  //thống kê trạng thái đơn hàng
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const handleReset = () => {
    setSearchNgayBatDau(null);
    setSearchNgayKetThuc(null);
  };

  useEffect(() => {
    const getTrangThaiDonHang = () => {
      request("GET", `/thong-ke/trang-thai-don-hang?chonTheo=${loaiBoLocTDTT}`)
        .then((response) => {
          setTrangThaiDonHang(response.data);
        })
        .catch((error) => { });
    };

    getTrangThaiDonHang();
  }, [loaiBoLocTDTT]);

  useEffect(() => {
    // const orderData = [2, 4, 8, 14, 18, 23, 5, 10, 16]; // Dữ liệu giả định

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const formattedData = trangThaiDonHang.map(
        (item) => `${item.phanTram.toString()}`
      );

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: trangThaiDonHang.map((item) =>
            item.trangThai === 1
              ? "Đã xác nhận"
              : item.trangThai === 0
                ? "Chờ xác nhận"
                : item.trangThai === 2
                  ? "Chuẩn bị"
                  : item.trangThai === 3
                    ? "Giao hàng"
                    : item.trangThai === 4
                      ? "Giao hàng thành công"
                      : item.trangThai === 5
                        ? "Đã hủy"
                        : item.trangThai === 6
                          ? "Chờ thanh toán"
                          : item.trangThai === 7
                            ? "Đã thanh toán"
                            : item.trangThai === 8
                              ? "Trả một phần"
                              : item.trangThai === 9
                                ? "Trả toàn bộ"
                                : ""
          ),
          datasets: [
            {
              label: "Tỉ lệ",
              data: formattedData,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
                "rgb(255, 0, 0)",
                "rgb(0, 255, 0)",
                "rgb(0, 0, 255)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    }
  }, [trangThaiDonHang]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text, record, index) => (
        <span>{listSanPhambanChay.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      key: "duongDan",
      width: "15%",
      align: "center",
      render: (text, record) => {
        return (
          <img
            src={record.duongDan}
            alt="Ảnh"
            style={{ width: "80px", height: "80px" }}
          />
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSanPham",
      width: "20%",
      align: "center",
      render: (value, record) => {
        return (
          <span style={{ whiteSpace: "pre-line" }}>
            {record.tenSanPham} {record.dungLuongRam}GB/{record.dungLuongRom}GB{" "}
            <br />
            {"("}
            {record.tenMauSac}
            {")"}
          </span>
        );
      },
    },
    {
      title: "Giá Bán",
      dataIndex: "donGia",
      width: "15%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = numeral(record.donGia).format("0,0 VND") + " ₫";
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "soLuong",
      width: "15%",
      align: "center",
    },
  ];

  const columns1 = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text, record, index) => (
        <span>{listSanPhamSapHet.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      key: "duongDan",
      width: "15%",
      align: "center",
      render: (text, record) => {
        return (
          <img
            src={record.duongDan}
            alt="Ảnh"
            style={{ width: "80px", height: "80px" }}
          />
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSanPham",
      width: "17%",
      align: "center",
      render: (value, record) => {
        return (
          <span style={{ whiteSpace: "pre-line" }}>
            {record.tenSanPham} {record.dungLuongRam}GB/{record.dungLuongRom}GB{" "}
            {"("}
            {record.tenMauSac}
            {")"}
          </span>
        );
      },
    },
    {
      title: "Giá Bán",
      dataIndex: "donGia",
      width: "15%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = numeral(record.donGia).format("0,0 VND") + " ₫";
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "soLuong",
      width: "15%",
      align: "center",
    },
  ];

  const columns2 = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "5%",
      align: "center",
      render: (text, record, index) => (
        <span>{listSanPhamDoiTra.indexOf(record) + 1}</span>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "duongDan",
      key: "duongDan",
      width: "15%",
      align: "center",
      render: (text, record) => {
        return (
          <img
            src={record.duongDan}
            alt="Ảnh"
            style={{ width: "80px", height: "80px" }}
          />
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSanPham",
      width: "17%",
      align: "center",
      render: (value, record) => {
        return (
          <span style={{ whiteSpace: "pre-line" }}>
            {record.tenSanPham} {record.dungLuongRam}GB/{record.dungLuongRom}GB{" "}
            {"("}
            {record.tenMauSac}
            {")"}
          </span>
        );
      },
    },
    {
      title: "Giá Bán",
      dataIndex: "donGia",
      width: "15%",
      align: "center",
      render: (value, record) => {
        let formattedValue = value;
        formattedValue = numeral(record.donGia).format("0,0 VND") + " ₫";
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "Số lượng đã trả",
      dataIndex: "soLuong",
      width: "15%",
      align: "center",
    },
  ];

  const [openSelect, setOpenSelect] = useState(false);

  const handleSearchLoaiBoLoc = (loaiBoLoc) => {
    setLoaiBoLoc(loaiBoLoc);
    setActiveButton(loaiBoLoc);
  };

  const [openSelect1, setOpenSelect1] = useState(false);

  const handleSearchLoaiBoLoc1 = (loaiBoLocTDTT) => {
    setLoaiBoLocTDTT(loaiBoLocTDTT);
    setActiveButton1(loaiBoLocTDTT);
  };

  return (
    <>
      <div className="mt-3">
        <div className="mt-4 text-center">
          <span style={{ fontWeight: "500", fontSize: "30px" }}>THỐNG KÊ</span>
          <Row
            className="mt-2"
            style={{
              padding: "10px",
              textAlign: "center",
            }}
          >
            <Col>
              <Card variant="outlined" style={{ padding: "20px" }}>
                <Row className="align-items-center">
                  <h5>Doanh thu tháng này</h5>
                  <h5 style={{ color: "#2f80ed" }}>
                    {listDonHangInMonth.soLuong == null
                      ? 0
                      : listDonHangInMonth.soLuong}{" "}
                    đơn hàng /{" "}
                    {listDonHangInMonth.tongTien == null
                      ? "0 ₫"
                      : convertToVND(listDonHangInMonth.tongTien)}
                  </h5>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card variant="outlined" style={{ padding: "20px" }}>
                <h5>Doanh thu hôm nay</h5>
                <h5 style={{ color: "#2f80ed" }}>
                  <h5 style={{ color: "#2f80ed" }}>
                    {listDonHangInDay.soLuong == null
                      ? 0
                      : listDonHangInDay.soLuong}{" "}
                    đơn hàng /{" "}
                    {listDonHangInDay.tongTien == null
                      ? "0 ₫"
                      : convertToVND(listDonHangInDay.tongTien)}
                  </h5>
                </h5>
              </Card>
            </Col>
            <Col>
              <Card variant="outlined" style={{ padding: "20px" }}>
                <h5>Sản phẩm đã bán trong tháng</h5>
                <h5 style={{ color: "#2f80ed" }}>
                  {listSanPham.soLuong == null ? 0 : listSanPham.soLuong} sản
                  phẩm
                </h5>
              </Card>
            </Col>
          </Row>
          {/* <Row
            className="mt-3"
            style={{
              margin: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0 0.1rem 0.3rem #00000010",
            }}
          >
            <h5>Biểu đồ thống kê</h5>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="d-flex mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Ngày Bắt Đầu"
                      value={
                        searchNgayBatDau
                          ? dayjs(searchNgayBatDau, "DD/MM/YYYY")
                          : null
                      }
                      format="DD/MM/YYYY"
                      onChange={handleSearchNgayBatDauChange}
                      slotProps={{ textField: { size: "small" } }}
                      sx={{
                        position: "relative",
                        width: "50px",
                        "& .MuiInputBase-root": {
                          width: "85%",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Ngày Kết Thúc"
                      value={
                        searchNgayKetThuc
                          ? dayjs(searchNgayKetThuc, "DD/MM/YYYY")
                          : null
                      }
                      format="DD/MM/YYYY"
                      onChange={handleSearchNgayKetThucChange}
                      slotProps={{ textField: { size: "small" } }}
                      sx={{
                        position: "relative",
                        width: "50px",
                        "& .MuiInputBase-root": {
                          width: "85%",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <div style={{ paddingTop: "7px" }}>
                  <Button
                    onClick={() => {
                      handleReset();
                    }}
                    type="warning"
                    style={{ width: "100px", fontSize: "15px" }}
                  >
                    <span className="text-dark" style={{ fontWeight: "500" }}>
                      Làm Mới
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <Col style={{ margin: "10px" }}>
              <div>
                <Slider
                  value={numberOfDays}
                  onChange={handleSliderChange}
                  min={1}
                  max={daysInMonth}
                  valueLabelDisplay="auto"
                  aria-label="Number of Days"
                />
                <div style={{ width: "1100px", height: "600px" }}>
                  <canvas id="mixedChart" width="1100" height="600"></canvas>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row
            className="mb-3 mt-3"
            style={{
              margin: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0 0.1rem 0.3rem #00000010",
            }}
          >
            <h5>
              <FontAwesomeIcon icon={faRankingStar} /> Sản phẩm bán chạy
            </h5>
            <div
              className="mt-3 mb-2"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className="d-flex"
                style={{
                  height: "40px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <ButtonGroup color="primary" spacing="0.5rem" aria-label="spacing button group">
                  <Button
                    onClick={() => {
                      handleSearchLoaiBoLoc("ngay");
                      setOpenDate(false);
                    }}
                    className={activeButton === "ngay" ? "button-active" : ""}
                    style={{
                      height: "40px",
                      width: "100px",
                      fontSize: "15px",
                    }}
                  >
                    Ngày
                  </Button>
                  <Button
                    onClick={() => {
                      handleSearchLoaiBoLoc("tuan");
                      setOpenDate(false);
                    }}
                    className={activeButton === "tuan" ? "button-active" : ""}
                    style={{
                      height: "40px",
                      width: "100px",
                      fontSize: "15px",
                    }}
                  >
                    Tuần
                  </Button>
                  <Button
                    onClick={() => {
                      handleSearchLoaiBoLoc("thang");
                      setOpenDate(false);
                    }}
                    className={activeButton === "thang" ? "button-active" : ""}
                    style={{
                      height: "40px",
                      width: "100px",
                      fontSize: "15px",
                    }}
                  >
                    Tháng
                  </Button>
                  <Button
                    onClick={() => {
                      handleSearchLoaiBoLoc("nam");
                      setOpenDate(false);
                    }}
                    className={activeButton === "nam" ? "button-active" : ""}
                    style={{
                      height: "40px",
                      width: "100px",
                      fontSize: "15px",
                    }}
                  >
                    Năm
                  </Button>
                  {/* <Button
                    onClick={() => {
                      handleSearchLoaiBoLoc("tuyChinh");
                      setOpenDate(true);
                    }}
                    className={
                      activeButton === "tuyChinh" ? "button-active" : ""
                    }
                    style={{
                      height: "40px",
                      width: "100px",
                      fontSize: "15px",
                    }}
                  >
                    Tùy chỉnh
                  </Button> */}

                  {/* {openDate && (
                    <div className="d-flex">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Ngày Bắt Đầu"
                            value={
                              searchNgayBatDau1
                                ? dayjs(searchNgayBatDau1, "DD/MM/YYYY")
                                : null
                            }
                            format="DD/MM/YYYY"
                            onChange={handleSearchNgayBatDauChange1}
                            slotProps={{ textField: { size: "small" } }}
                            sx={{
                              position: "relative",
                              width: "50px",
                              "& .MuiInputBase-root": {
                                width: "85%",
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Ngày Kết Thúc"
                            value={
                              searchNgayKetThuc1
                                ? dayjs(searchNgayKetThuc1, "DD/MM/YYYY")
                                : null
                            }
                            format="DD/MM/YYYY"
                            onChange={handleSearchNgayKetThucChange1}
                            slotProps={{ textField: { size: "small" } }}
                            sx={{
                              position: "relative",
                              width: "50px",
                              "& .MuiInputBase-root": {
                                width: "85%",
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  )} */}
                </ButtonGroup>
              </div>
            </div>
            <hr />
            <Table
              columns={columns}
              dataSource={listSanPhambanChay}
              pagination={{
                // simple: true,
                pageSize: "3",
              }}
            />
          </Row>
          <Row
            className="mb-3 mt-3"
            style={{
              margin: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0 0.1rem 0.3rem #00000010",
            }}
          >
            <h5>
              <FontAwesomeIcon icon={faRankingStar} /> Sản phẩm sắp hết hàng
              <hr />
            </h5>
            <Table
              columns={columns1}
              dataSource={listSanPhamSapHet}
              pagination={{
                // simple: true,
                pageSize: "3",
              }}
            />
          </Row>

          <Row
            className="mb-3 mt-3"
            style={{
              margin: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0 0.1rem 0.3rem #00000010",
            }}
          >
            <h5>
              <FontAwesomeIcon icon={faRankingStar} /> Sản phẩm trả hàng
              <hr />
            </h5>
            <Table
              columns={columns2}
              dataSource={listSanPhamDoiTra}
              pagination={{
                // simple: true,
                pageSize: "3",
              }}
            />
          </Row>
          <Row
            className="mt-3"
            style={{
              margin: "10px",
              padding: "10px",
              backgroundColor: "#ffffff",
              boxShadow: "0 0.1rem 0.3rem #00000010",
              justifyContent: "space-between", // Hoặc space-around
            }}
          >
            <Col span={11} style={{ marginRight: "10px" }}>
              <Card variant="outlined" style={{ paddingTop: "10px" }}>
                <h4>Tốc độ tăng trưởng cửa hàng</h4>
                <div>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-4">
                        <span style={{ fontWeight: "bolder" }}>
                          Doanh thu ngày:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>
                          {numeral(tocDoTangTruong.doanhThuNgay).format(
                            "0,0 VND"
                          ) + " ₫"}
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span
                          style={{
                            color:
                              tocDoTangTruong.tangTruongDoanhThuNgay < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {tocDoTangTruong.tangTruongDoanhThuNgay > 0 ? (
                            <FontAwesomeIcon icon={faArrowUpWideShort} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} />
                          )}
                          {tocDoTangTruong.tangTruongDoanhThuNgay > 100
                            ? 100
                            : tocDoTangTruong.tangTruongDoanhThuNgay}
                          %
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-4">
                        <span style={{ fontWeight: "bolder" }}>
                          Doanh thu tháng:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>
                          {numeral(tocDoTangTruong.doanhThuThang).format(
                            "0,0 VND"
                          ) + " ₫"}
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span
                          style={{
                            color:
                              tocDoTangTruong.tangTruongDoanhThuThang < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {tocDoTangTruong.tangTruongDoanhThuThang > 0 ? (
                            <FontAwesomeIcon icon={faArrowUpWideShort} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} />
                          )}
                          {tocDoTangTruong.tangTruongDoanhThuThang > 100
                            ? 100
                            : tocDoTangTruong.tangTruongDoanhThuThang}
                          %
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-4">
                        <span style={{ fontWeight: "bolder" }}>
                          Doanh thu năm:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>
                          {numeral(tocDoTangTruong.doanhThuNam).format(
                            "0,0 VND"
                          ) + " ₫"}
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span
                          style={{
                            color:
                              tocDoTangTruong.tangTruongDoanhThuNam < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {tocDoTangTruong.tangTruongDoanhThuNam > 0 ? (
                            <FontAwesomeIcon icon={faArrowUpWideShort} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} />
                          )}
                          {tocDoTangTruong.tangTruongDoanhThuNam > 100
                            ? 100
                            : tocDoTangTruong.tangTruongDoanhThuNam}
                          %
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-4">
                        <span style={{ fontWeight: "bolder" }}>
                          Sản phẩm tháng:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>{tocDoTangTruong.soSanPhamThang} sản phẩm</span>
                      </Col>
                      <Col className="col-4">
                        <span
                          style={{
                            color:
                              tocDoTangTruong.tangTruongSoSanPhamThang < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {tocDoTangTruong.tangTruongSoSanPhamThang > 0 ? (
                            <FontAwesomeIcon icon={faArrowUpWideShort} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} />
                          )}
                          {tocDoTangTruong.tangTruongSoSanPhamThang > 100
                            ? 100
                            : tocDoTangTruong.tangTruongSoSanPhamThang}
                          %
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-4">
                        <span style={{ fontWeight: "bolder" }}>
                          Hóa đơn ngày:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>{tocDoTangTruong.soHoaDonNgay} hóa đơn</span>
                      </Col>
                      <Col className="col-4">
                        <span
                          style={{
                            color:
                              tocDoTangTruong.tangTruongSoHoaDonNgay < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {tocDoTangTruong.tangTruongSoHoaDonNgay > 0 ? (
                            <FontAwesomeIcon icon={faArrowUpWideShort} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} />
                          )}
                          {tocDoTangTruong.tangTruongSoHoaDonNgay > 100
                            ? 100
                            : tocDoTangTruong.tangTruongSoHoaDonNgay}
                          %
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-4">
                        <span style={{ fontWeight: "bolder" }}>
                          Hóa đơn tháng:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>{tocDoTangTruong.soHoaDonThang} hóa đơn</span>
                      </Col>
                      <Col className="col-4">
                        <span
                          style={{
                            color:
                              tocDoTangTruong.tangTruongSoHoaDonThang < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {tocDoTangTruong.tangTruongSoHoaDonThang > 0 ? (
                            <FontAwesomeIcon icon={faArrowUpWideShort} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} />
                          )}
                          {tocDoTangTruong.tangTruongSoHoaDonThang > 100
                            ? 100
                            : tocDoTangTruong.tangTruongSoHoaDonThang}
                          %
                        </span>
                      </Col>
                    </Row>
                  </Card>

                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-4">
                        <span style={{ fontWeight: "bolder" }}>
                          Hóa đơn năm:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>{tocDoTangTruong.soHoaDonNam} hóa đơn</span>
                      </Col>
                      <Col className="col-4">
                        <span
                          style={{
                            color:
                              tocDoTangTruong.tangTruongSoHoaDonNam < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {tocDoTangTruong.tangTruongSoHoaDonNam > 0 ? (
                            <FontAwesomeIcon icon={faArrowUpWideShort} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDownWideShort} />
                          )}
                          {tocDoTangTruong.tangTruongSoHoaDonNam > 100
                            ? 100
                            : tocDoTangTruong.tangTruongSoHoaDonNam}
                          %
                        </span>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Card>
            </Col>
            <Col className="col-6">
              <Card
                variant="outlined"
                style={{ paddingTop: "10px", paddingRight: "55px" }}
              >
                <h4 className="ms-4">Biểu đồ trạng thái đơn hàng</h4>
                <div
                  className="mt-3 mb-2"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <div
                    className="d-flex"
                    style={{
                      height: "40px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <ButtonGroup
                      spacing="0.5rem"
                      aria-label="spacing button group"
                    >
                      <Button
                        onClick={() => {
                          handleSearchLoaiBoLoc1("ngay");
                        }}
                        className={
                          activeButton1 === "ngay" ? "button-active" : ""
                        }
                        style={{
                          height: "40px",
                          width: "100px",
                          fontSize: "15px",
                        }}
                      >
                        Ngày
                      </Button>
                      <Button
                        onClick={() => {
                          handleSearchLoaiBoLoc1("tuan");
                        }}
                        className={
                          activeButton1 === "tuan" ? "button-active" : ""
                        }
                        style={{
                          height: "40px",
                          width: "100px",
                          fontSize: "15px",
                        }}
                      >
                        Tuần
                      </Button>
                      <Button
                        onClick={() => {
                          handleSearchLoaiBoLoc1("thang");
                        }}
                        className={
                          activeButton1 === "thang" ? "button-active" : ""
                        }
                        style={{
                          height: "40px",
                          width: "100px",
                          fontSize: "15px",
                        }}
                      >
                        Tháng
                      </Button>
                      <Button
                        onClick={() => {
                          handleSearchLoaiBoLoc1("nam");
                        }}
                        className={
                          activeButton1 === "nam" ? "button-active" : ""
                        }
                        style={{
                          height: "40px",
                          width: "100px",
                          fontSize: "15px",
                        }}
                      >
                        Năm
                      </Button>
                      {/* <Button
                        onClick={() => {
                          handleSearchLoaiBoLoc1("nam");
                        }}
                        className={
                          activeButton1 === "nam" ? "button-active" : ""
                        }
                      >
                        Tùy Chỉnh
                      </Button> */}
                    </ButtonGroup>
                    {/*                    
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
                        value={loaiBoLocTDTT}
                        onChange={handleSearchLoaiBoLoc1}
                      >
                        <MenuItem value={"ngay"}>Ngày</MenuItem>
                        <MenuItem value={"tuan"}>Tuần</MenuItem>
                        <MenuItem value={"thang"}>Tháng</MenuItem>
                        <MenuItem value={"nam"}>Năm</MenuItem>
                      </Select>
                    </FormControl> */}
                  </div>
                </div>
                <div
                  className="mb-3"
                  style={{
                    width: "600px",
                    height: "450px",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "50px",
                  }}
                >
                  <canvas
                    ref={chartContainer}
                    width="600"
                    height="400"
                  ></canvas>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ThongKeDoanhThu;
