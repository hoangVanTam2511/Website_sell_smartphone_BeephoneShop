import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Col, Row } from "react-bootstrap";
import "./thong-ke.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
import { Empty } from "antd";
import { request } from '../../../store/helpers/axios_helper'

const ThongKe = () => {
  const [listDonHangAll, setListDonHangAll] = useState([]);
  // const [listDonHangInMonth, setListDonHangInMonth] = useState([]);
  const [listSanPham, setListSanPham] = useState([]);
  const [listSanPhamTop5, setListSanPhamTop5] = useState([]);
  const [listDonHangTheoNam, setListDonHangTheoNam] = useState([]);
  const [searchMonth, setSearchMonth] = useState();
  const [searchYear, setSearchYear] = useState(dayjs());

  const thongKeTheoNgay = () => {
    request('GET',`/thong-ke/don-hang-all`)
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
    request('GET',`/thong-ke/san-pham`)
      .then((response) => {
        setListSanPham(response.data);
      })
      .catch((error) => {});
  };

  const getSanPhamTop5 = () => {
    request('GET',`/thong-ke/san-pham-ban-chay`)
      .then((response) => {
        setListSanPhamTop5(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  };

  const getDonHangTheoNam = () => {
    request('GET',`/thong-ke/don-hang-year`, {
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

  const fetchData = async (selectedYear) => {
    try {
      // Lấy dữ liệu cho tất cả các tháng trong năm
      const dataPromises = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1; // Tháng bắt đầu từ 1
        return  request('GET',`/thong-ke/don-hang-year`, {
          params: {
            month,
            year: 2023,
          },
        });
      });

      const dataList = await Promise.all(dataPromises);

      // Xử lý dữ liệu để lấy số lượng đơn hàng của từng tháng
      const donHangTheoNamData = dataList.map(
        (response) => response.data.tongTien
      );

      // Tạo biểu đồ
      const ctx = document.getElementById("mixedChart");
      const mixedChart = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: [
            {
              type: "bar",
              label: "Doanh thu theo tháng",
              data: donHangTheoNamData,
              backgroundColor: "#2f80ed",
              borderColor: "#2f80ed",
              borderWidth: 1,
              width: "150px",
            },
          ],
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        options: {},
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData(searchYear);
  }, [searchYear]);

  const handleSearchYear = (selectedDate) => {
    if (dayjs.isDayjs(selectedDate)) {
      setSearchYear(selectedDate.format("YYYY"));
      console.log("Selected Date:", selectedDate.format("YYYY"));
    } else {
      console.error("Invalid date object:", selectedDate);
    }
  };

  const years = Array.from({ length: 200 }, (_, index) => 1900 + index);

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
                  <h5>Thống kê doanh thu</h5>
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
                <h5>Thống kê đơn hàng</h5>
                <h5 style={{ color: "#2f80ed" }}>
                  {listDonHangAll.soLuong == null ? 0 : listDonHangAll.soLuong}
                </h5>
              </Card>
            </Col>
            <Col>
              <Card variant="outlined" style={{ padding: "20px" }}>
                <h5>Tổng sản phẩm bán được</h5>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    label="Select Year"
                    views={["year"]}
                    value={searchYear}
                    format="YYYY"
                    onChange={handleSearchYear}
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
            <Col style={{ margin: "10px" }}>
              <div style={{ width: "1100px", height: "440px" }}>
                <canvas id="mixedChart" width="1100" height="440"></canvas>
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
              Top 3 sản phẩm bán chạy
              <hr />
            </h5>
            {listSanPhamTop5 === null ? (
              <Empty />
            ) : (
              listSanPhamTop5.map((item, index) => (
                <Col key={index} xs={4} className="product-selling">
                  <div className="img-product-selling">
                    <img
                      src={item.duongDan}
                      alt="Ảnh"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="product-info">
                    <a href="http" style={{ display: "block" }}>
                      <span>{item.tenSanPham}</span>
                    </a>
                    {/* <div>
                      <span>
                        {item.kichThuocRam}GB/{item.kichThuocRom}GB {"("}
                        {item.tenMauSac}
                        {")"}
                      </span>
                    </div> */}
                    <div>
                      <span>
                        {item.soLuong == null ? 0 : item.soLuong} {"Sản phẩm"}
                      </span>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default ThongKe;
