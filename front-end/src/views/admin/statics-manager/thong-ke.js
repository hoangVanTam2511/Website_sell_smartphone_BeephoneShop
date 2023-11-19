import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import Circularprogressbar from "../../../components/circularprogressbar";
// import Chart from "react-apexcharts";
import CountUp from "react-countup";
import { Card } from "@mui/joy";

const ThongKe = () => {
  useEffect(() => {
    const ctx = document.getElementById("mixedChart");

    const mixedChart = new Chart(ctx, {
      type: "bar", // Chọn loại biểu đồ cơ bản (ví dụ: bar)
      data: {
        datasets: [
          {
            type: "bar",
            label: "Bar Dataset",
            data: [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
            width: "150px",
          },
          //   {
          //     type: "line",
          //     label: "Line Dataset",
          //     data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
          //     fill: false,
          //     borderColor: "rgb(54, 162, 235)",
          //     borderWidth: 1,
          //   },
          // Các datasets khác (ví dụ: type: 'scatter', 'radar', 'pie', etc.)
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
          "September ",
          "October ",
          "November",
          "December ",
        ],
      },
      options: {
        // Các tùy chọn cho biểu đồ (ví dụ: scales, legend, tooltips, etc.)
      },
    });

    return () => {
      // Cleanup khi component unmount (nếu cần)
      mixedChart.destroy();
    };
  }, []);

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
              //   backgroundColor: "#ffffff",
              //   boxShadow: "0 0.1rem 0.3rem #00000010",
            }}
          >
            <Col>
              <Card variant="outlined">
                <h5>Doanh số tháng này</h5>
                <h5 style={{ color: "#2f80ed" }}>
                  5 đơn hàng / 130.000.000 VNĐ
                </h5>
              </Card>
            </Col>
            <Col>
              <Card variant="outlined">
                <h5>Doanh số hôm nay</h5>
                <h5 style={{ color: "#2f80ed" }}>
                  5 đơn hàng / 70.000.000 VNĐ
                </h5>
              </Card>
            </Col>
            <Col>
              <Card variant="outlined">
                <h5>Hàng bán được tháng này</h5>
                <h5 style={{ color: "#2f80ed" }}>34 sản phẩm</h5>
              </Card>
            </Col>
          </Row>
          <Row
            className="mt-3 mb-3"
            style={{
              margin: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0 0.1rem 0.3rem #00000010",
            }}
          >
            <h5>Biểu đồ thống kê</h5>
            <Col style={{ margin: "10px" }}>
              <div style={{ width: "1100px", height: "440px" }}>
                <canvas id="mixedChart" width="1100" height="440"></canvas>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ThongKe;
