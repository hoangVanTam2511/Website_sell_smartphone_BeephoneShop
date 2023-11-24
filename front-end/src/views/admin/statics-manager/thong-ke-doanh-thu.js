import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Col, Row } from "react-bootstrap";
import "./thong-ke.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpRightDots,
  faMinus,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
import Slider from "@material-ui/core/Slider";
import { Table, ArrowUpOutlined, Button } from "antd";

const ThongKeDoanhThu = () => {
  const [listDonHangAll, setListDonHangAll] = useState([]);
  // const [listDonHangInMonth, setListDonHangInMonth] = useState([]);
  const [listSanPham, setListSanPham] = useState([]);
  const [listSanPhamTop5, setListSanPhamTop5] = useState([]);
  const [listDonHangTheoNam, setListDonHangTheoNam] = useState([]);
  const [searchMonth, setSearchMonth] = useState();
  const [searchYear, setSearchYear] = useState(dayjs());
  const currentYear = new Date().getFullYear();
  const [searchNgayBatDau, setSearchNgayBatDau] = useState("");
  const [searchNgayKetThuc, setSearchNgayKetThuc] = useState("");
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const thongKeTheoNgay = () => {
    axios
      .get(`http://localhost:8080/thong-ke/in-day`)
      .then((response) => {
        setListDonHangAll(response.data);
      })
      .catch((error) => {});
  };

  // const thongKeTheoThang = () => {
  //   axios
  //     .get(`http://localhost:8080/thong-ke/in-month`)
  //     .then((response) => {
  //       setListDonHangInMonth(response.data);
  //     })
  //     .catch((error) => {});
  // };

  const thongKeTheoSanPham = () => {
    axios
      .get(`http://localhost:8080/thong-ke/san-pham`)
      .then((response) => {
        setListSanPham(response.data);
      })
      .catch((error) => {});
  };

  const getSanPhamTop5 = () => {
    axios
      .get(`http://localhost:8080/thong-ke/san-pham-top5`)
      .then((response) => {
        setListSanPhamTop5(response.data);
      })
      .catch((error) => {});
  };

  const getDonHangTheoNam = () => {
    axios
      .get(`http://localhost:8080/thong-ke/don-hang-year`, {
        params: {
          month: 11,
          year: 2023,
        },
      })
      .then((response) => {
        setListDonHangTheoNam(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    thongKeTheoNgay();
    thongKeTheoSanPham();
    getDonHangTheoNam();
    getSanPhamTop5();
  }, []);

  const convertToVND = (number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  };

  const [numberOfDays, setNumberOfDays] = useState(10);
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null);

  const generateRandomData = () => {
    // Hàm tạo dữ liệu giả cho số lượng đơn hàng và sản phẩm
    const daysInMonth = new Date().getDate(); // Số ngày trong tháng hiện tại
    const donHangTheoNgayData = Array.from({ length: daysInMonth }, () =>
      Math.floor(Math.random() * 30)
    );
    const sanPhamTheoNgayData = Array.from({ length: daysInMonth }, () =>
      Math.floor(Math.random() * 50)
    );
    return { donHangTheoNgayData, sanPhamTheoNgayData };
  };

  const fetchData = (days) => {
    const { donHangTheoNgayData, sanPhamTheoNgayData } = generateRandomData();
    const slicedDonHangData = donHangTheoNgayData.slice(-days);
    const slicedSanPhamData = sanPhamTheoNgayData.slice(-days);

    const dateLabels = Array.from({ length: days }, (_, index) => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - (days - index - 1));
      return currentDate.getDate();
    });

    setChartData({
      labels: dateLabels,
      datasets: [
        {
          label: "Đơn hàng",
          data: slicedDonHangData,
          backgroundColor: "#2f80ed",
          borderColor: "#2f80ed",
          borderWidth: 1,
        },
        {
          label: "Sản phẩm",
          data: slicedSanPhamData,
          backgroundColor: "#ff7b00",
          borderColor: "#ff7b00",
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    fetchData(numberOfDays);
  }, [numberOfDays]);

  useEffect(() => {
    const ctx = document.getElementById("mixedChart");

    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "x",
        plugins: {
          // Tùy chỉnh để tạo biểu đồ cột nhóm
          datalabels: {
            anchor: "end",
            align: "end",
          },
        },
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  const handleSliderChange = (event, newValue) => {
    setNumberOfDays(newValue);
  };

  const handleSearchNgayBatDauChange = (selectedDate) => {
    const formattedDate = selectedDate
      ? dayjs(selectedDate).format("DD/MM/YYYY")
      : "";
    setSearchNgayBatDau(formattedDate);
  };

  const handleSearchNgayKetThucChange = (selectedDate) => {
    const value = selectedDate.format("DD/MM/YYYY");
    setSearchNgayKetThuc(value);
  };
  //thống kê trạng thái đơn hàng
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const orderData = [2, 4, 8, 14, 18, 23, 5, 10, 16]; // Dữ liệu giả định

    console.log(orderData); // Kiểm tra dữ liệu được log ở đây

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "Đã thành công",
            "Đã thanh toán",
            "Xác nhận",
            "Chờ xác nhận",
            "Tạo hóa đơn",
            "Trả hàng",
            "Vận chuyển",
            "Chờ vận chuyển",
            "Đã hủy",
          ],
          datasets: [
            {
              label: "Trạng thái đơn hàng",
              data: orderData,
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
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
    },
    {
      title: "Ảnh",
      dataIndex: "path",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "soLuong",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
  const data = [
    {
      stt: "1",
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      stt: "2",
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      stt: "3",
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    { stt: "4", key: "4", name: "Jim Red", chinese: 88, math: 99, english: 89 },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
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
                  {/* <Col xs="auto">
                    <FontAwesomeIcon icon={faSackDollar} size="2xl" />
                  </Col> */}
                  <h5>Doanh thu tháng này</h5>
                  <h5 style={{ color: "#2f80ed" }}>
                    {listDonHangAll.tongTien == null
                      ? "0 ₫"
                      : convertToVND(listDonHangAll.tongTien)}
                  </h5>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card variant="outlined" style={{ padding: "20px" }}>
                <h5>Doanh thu hôm nay</h5>
                <h5 style={{ color: "#2f80ed" }}>
                  {listDonHangAll.soLuong == null ? 0 : listDonHangAll.soLuong}
                </h5>
              </Card>
            </Col>
            <Col>
              <Card variant="outlined" style={{ padding: "20px" }}>
                <h5>Sản phẩm đã bán trong ngày</h5>
                <h5 style={{ color: "#2f80ed" }}>
                  {listSanPham.soLuong == null ? 0 : listSanPham.soLuong} sản
                  phẩm
                </h5>
              </Card>
            </Col>
          </Row>
          <Row
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
              <div className="d-flex">
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
              <FontAwesomeIcon icon={faRankingStar} />
              Top sản phẩm bán chạy
              <hr />
            </h5>
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
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
              <FontAwesomeIcon icon={faRankingStar} />
              Sản phẩm sắp hết hàng
              <hr />
            </h5>
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
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
              <FontAwesomeIcon icon={faRankingStar} />
              Sản phẩm đổi trả
              <hr />
            </h5>
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
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
                      <Col className="col-5">
                        <span style={{ fontWeight: "bolder" }}>
                          Doanh thu ngày:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>80.000.000 đ</span>
                      </Col>
                      <Col className="col-2">
                        <span style={{ color: "red" }}>
                          <FontAwesomeIcon icon={faArrowDownWideShort} />
                          2%
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-5">
                        <span style={{ fontWeight: "bolder" }}>
                          Doanh thu tháng:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>80.000.000 đ</span>
                      </Col>
                      <Col className="col-2">
                        <span style={{ color: "red" }}>
                          <FontAwesomeIcon icon={faArrowDownWideShort} />
                          2%
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-5">
                        <span style={{ fontWeight: "bolder" }}>
                          Doanh thu năm:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>80.000.000 đ</span>
                      </Col>
                      <Col className="col-2">
                        <span style={{ color: "red" }}>
                          <FontAwesomeIcon icon={faArrowDownWideShort} />
                          2%
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-5">
                        <span style={{ fontWeight: "bolder" }}>
                          Sản phẩm tháng:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>80.000.000 đ</span>
                      </Col>
                      <Col className="col-2">
                        <span style={{ color: "red" }}>
                          <FontAwesomeIcon icon={faArrowDownWideShort} />
                          2%
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-5">
                        <span style={{ fontWeight: "bolder" }}>
                          Hóa đơn ngày:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>80.000.000 đ</span>
                      </Col>
                      <Col className="col-2">
                        <span style={{ color: "red" }}>
                          <FontAwesomeIcon icon={faArrowDownWideShort} />
                          2%
                        </span>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    variant="outlined"
                    style={{ padding: "20px", margin: "15px" }}
                  >
                    <Row>
                      <Col className="col-5">
                        <span style={{ fontWeight: "bolder" }}>
                          Hóa đơn tháng:
                        </span>
                      </Col>
                      <Col className="col-4">
                        <span>80.000.000 đ</span>
                      </Col>
                      <Col className="col-2">
                        <span style={{ color: "red" }}>
                          <FontAwesomeIcon icon={faArrowDownWideShort} />
                          2%
                        </span>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Card>
            </Col>
            <Col className="col-6">
              <Card variant="outlined" style={{ paddingTop: "10px" }}>
                <h4>Biểu đồ trạng thái đơn hàng</h4>
                <div style={{ width: "600px", height: "400px" }}>
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
