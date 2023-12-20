import { Button, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format } from "date-fns";
import axios from 'axios';
export const PrintBillAtTheCounterAuto = React.forwardRef((ref, props) => {

  useEffect(() => {
    getOrderItemsById();
  }, [])

  const [createdAt, setCreatedAt] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  const [phiShip, setPhiShip] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [khachPhaiTra, setKhachPhaiTra] = useState(0);
  const [tienKhachDua, setTienKhachDua] = useState(0);
  const [tienThua, setTienThua] = useState(0);
  const [order, setOrder] = useState({});

  const getOrderItemsById = async () => {
    await axios
      .get(`http://localhost:8080/api/orders/2023234245668`)
      .then((response) => {
        const data = response.data.data;
        setOrder(data)
        console.log(data);
        setOrderItems(data.orderItems);
        setTongTien(data.tongTien || 0);
        setPhiShip(data.phiShip || 0)
        setDiscount(data && data.voucher && data.voucher.giaTriVoucher || 0);

        const tongTien = data.tongTien || 0;
        const discount = data && data.voucher && data.voucher.giaTriVoucher || 0;
        const phiShip = data.phiShip || 0;

        const khachPhaiTra = tongTien - discount + phiShip;
        setKhachPhaiTra(khachPhaiTra);
        setTienKhachDua(data.tienKhachTra || 0);
        setTienThua(data.tienThua || 0);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const total = (price, amount) => {
    return price * amount;
  }

  return (
    <div className='wrap-printer p-3' style={{}} ref={ref}>
      <div className='mt-5 wrap-header-bill d-flex justify-content-between'>
        <div>
          <div className='ms-3'>
            <img className='' style={{ width: "330px", height: "82px" }} src="https://res.cloudinary.com/dj9e1otbm/image/upload/v1700643568/oeojgihz3v9gtovoijjg.png" alt="" />
          </div>
        </div>
        <div>
          <div className='address mt-2 ms-3 pt-1'>
            <span style={{ fontWeight: "500" }}>
              Địa chỉ: {" "}
            </span>
            Cao đẳng FPT Polytechnic, Bắc Từ Liêm, Hà Nội
            <div className='phone mt-1'>
              <span style={{ fontWeight: "500" }}>
                Điện thoại: {" "}
              </span>
              0978774487
            </div>
            <div className='email mt-1'>
              <span style={{ fontWeight: "500" }}>
                Email: {" "}
              </span>
              beephoneshop2023@gmail.com
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between' style={{}}>
        <div className='qrcode mt-4 ms-1' style={{}}>
          <img src={props.data.maQrCode} style={{ width: "100px", height: "100px" }} alt="" />
        </div>
        <div className='header-center text-center'>
          <div className='header-main mt-4'>
            <span style={{ fontSize: "30px", fontWeight: "550", color: "#dc1111" }}>HÓA ĐƠN BÁN HÀNG</span>
          </div>
          <div className='code mt-1'>
            <span style={{ fontWeight: "500" }}>
              Mã hóa đơn: {" "}
            </span>
            {props.data.ma}
          </div>
          <div className='code mt-1'>
            Ngày {format(new Date(createdAt), "dd")} tháng {format(new Date(createdAt), "MM")} năm {format(new Date(createdAt), "yyyy")}
          </div>
        </div>
        <div className='qrcode-none mt-4' style={{ backgroundColor: "transparent" }}>
          <img src="https://printplace.files.wordpress.com/2012/02/sample.png" style={{ width: "100px", height: "100px" }} alt="" />
        </div>

      </div>


      <div
        className="mt-1 ms-3"
        style={{
          borderBottom: "1px solid #C7C7C7",
          width: "100%",
          borderWidth: "1px",
          borderStyle: "dotted"
        }}
      ></div>
      <div className='customer mt-3 ms-3'>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            Nhân viên bán hàng: {" "}
          </span>
        </div>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            Khách hàng: {" "}
          </span>
          {props.data.hoVaTen}
        </div>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            SĐT: {" "}
          </span>
          {props.data.soDienThoai}
        </div>
      </div>

      <div className='ms-3'>
        <table className='table-pdf' border="1" cellpadding="5" cellspacing="10">
          <thead>
            <tr>
              <th align="center" class="col-stt">STT</th>
              <th align="center" class="col-name">Sản phẩm</th>
              <th align="center" class="col-quantity">Số lượng</th>
              <th align="center" class="col-price">Đơn giá</th>
              <th align="center" class="col-total">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => {
              return (
                <tr>
                  <td align='center'>{index + 1}</td>
                  <td align="center">{item.sanPhamChiTiet.sanPham.tenSanPham + " " + item.sanPhamChiTiet.ram.dungLuong + "/" + item.sanPhamChiTiet.rom.dungLuong + "GB " + item.sanPhamChiTiet.mauSac.tenMauSac}</td>
                  <td align="center">{item.soLuong}</td>
                  {item.donGiaSauGiam !== null && item.donGiaSauGiam !== 0 ?
                    <td align="center">{item.donGiaSauGiam.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}</td>
                    :
                    <td align="center">{item.donGia.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}</td>
                  }
                  <td align="center">{total(item.donGiaSauGiam !== null && item.donGiaSauGiam !== 0 ? item.donGiaSauGiam : item.donGia, item.soLuong).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='d-flex justify-content-end'>
        <div className="d-flex  mt-3">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Tổng tiền hàng:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {props.data.tongTien && props.data.tongTien.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex  mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Chiết khấu:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {discount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Khách phải trả:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", width: "100px", fontWeight: "500" }}>
            {khachPhaiTra.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Tiền khách đưa:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {tienKhachDua.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Tiền trả lại:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {tienThua.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>

      <div className='mt-5 text-center'>
        <span className='' style={{}}>Cảm ơn quý khách. Hẹn gặp lại!</span>
      </div>

    </div >
  );
})
export const PrintBillAtTheCounter = React.forwardRef((props, ref) => {

  const createdAt = props.data.createdAt instanceof Date ? props.data.createdAt : new Date();

  const orderItems = props.data.orderItems ? props.data.orderItems : [];

  const orderImeis = orderItems.flatMap((order) => {
    return order.imeisDaBan.map((item) => {
      return {
        ...order,
        soLuong: 1,
        imei: item,
      };
    });
  });

  const account = props.data.accountEmployee ? props.data.accountEmployee : null;

  const tongTien = props.data.tongTien ? props.data.tongTien : 0;
  const phiShip = props.data.phiShip ? props.data.phiShip : 0;
  const discount = props.data && props.data.voucher && props.data.voucher.giaTriVoucher || 0;
  const khachPhaiTra = tongTien - discount + phiShip;
  const tienKhachDua = props.data.tienKhachTra || 0;
  const tienThua = props.data.tienThua || 0;



  const total = (price, amount) => {
    return price * amount;
  }

  return (
    <div className='wrap-printer p-3' style={{}} ref={ref}>
      <div className='mt-5 wrap-header-bill d-flex justify-content-between'>
        <div>
          <div className='ms-3'>
            <img className='' style={{ width: "330px", height: "82px" }} src="https://res.cloudinary.com/dj9e1otbm/image/upload/v1700643568/oeojgihz3v9gtovoijjg.png" alt="" />
          </div>
        </div>
        <div>
          <div className='address mt-2 ms-3 pt-1'>
            <span style={{ fontWeight: "500" }}>
              Địa chỉ: {" "}
            </span>
            Cao đẳng FPT Polytechnic, Bắc Từ Liêm, Hà Nội
            <div className='phone mt-1'>
              <span style={{ fontWeight: "500" }}>
                Điện thoại: {" "}
              </span>
              0978774487
            </div>
            <div className='email mt-1'>
              <span style={{ fontWeight: "500" }}>
                Email: {" "}
              </span>
              beephoneshop2023@gmail.com
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between' style={{}}>
        <div className='qrcode mt-4 ms-1' style={{}}>
          <img src={props.data.maQrCode} style={{ width: "100px", height: "100px" }} alt="" />
        </div>
        <div className='header-center text-center'>
          <div className='header-main mt-4'>
            <span style={{ fontSize: "30px", fontWeight: "550", color: "#dc1111" }}>HÓA ĐƠN BÁN HÀNG</span>
          </div>
          <div className='code mt-1'>
            <span style={{ fontWeight: "500" }}>
              Mã hóa đơn: {" "}
            </span>
            {props.data.ma}
          </div>
          <div className='code mt-1'>
            Ngày {format(new Date(createdAt), "dd")} tháng {format(new Date(createdAt), "MM")} năm {format(new Date(createdAt), "yyyy")}
          </div>
        </div>
        <div className='qrcode-none mt-4' style={{ backgroundColor: "transparent" }}>
          <img src="https://printplace.files.wordpress.com/2012/02/sample.png" style={{ width: "100px", height: "100px" }} alt="" />
        </div>

      </div>


      <div
        className="mt-1 ms-3"
        style={{
          borderBottom: "1px solid #C7C7C7",
          width: "100%",
          borderWidth: "1px",
          borderStyle: "dotted"
        }}
      ></div>
      <div className='customer mt-3 ms-3'>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            Nhân viên bán hàng: {" "}
          </span>
          {account ? account.hoVaTen : ""}
        </div>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            Khách hàng: {" "}
          </span>
          {props.data.hoVaTen}
        </div>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            SĐT: {" "}
          </span>
          {props.data.soDienThoai}
        </div>
      </div>

      <div className='ms-3'>
        <table className='table-pdf' border="1" cellpadding="5" cellspacing="10">
          <thead>
            <tr>
              <th align="center" class="col-stt">STT</th>
              <th align="center" class="col-name">Sản phẩm</th>
              <th align="center" class="col-imei">Số Imei</th>
              <th align="center" class="col-price">Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {orderImeis.map((item, index) => {
              return (
                <tr>
                  <td align='center'>{index + 1}</td>
                  <td align="center">
                    {item.sanPhamChiTiet && item.sanPhamChiTiet.sanPham && item.sanPhamChiTiet.sanPham.tenSanPham}
                    {" "}
                    {item.sanPhamChiTiet && item.sanPhamChiTiet.ram && item.sanPhamChiTiet.ram.dungLuong}
                    {"/"}
                    {item.sanPhamChiTiet && item.sanPhamChiTiet.rom && item.sanPhamChiTiet.rom.dungLuong}
                    {"GB "}
                    {item.sanPhamChiTiet && item.sanPhamChiTiet.mauSac && item.sanPhamChiTiet.mauSac.tenMauSac}
                  </td>
                  <td align='center'>{item.imei ? item.imei.soImei : ""}</td>
                  {item.donGiaSauGiam && item.donGiaSauGiam !== null && item.donGiaSauGiam && item.donGiaSauGiam !== 0 ?
                    <td align="center">{item.donGiaSauGiam && item.donGiaSauGiam.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}</td>
                    :
                    <td align="center">{item.donGia && item.donGia.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}</td>
                  }
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


      <div className='d-flex justify-content-end'>
        <div className="d-flex mt-3">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Tổng số lượng:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {orderImeis.length}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex  mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Tổng tiền hàng:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {props.data.tongTien && props.data.tongTien.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex  mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Chiết khấu:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {discount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Khách phải trả:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", width: "100px", fontWeight: "500" }}>
            {khachPhaiTra.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Tiền khách đưa:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {tienKhachDua.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex mt-1">
          <span className="me-5 pe-5" style={{ fontSize: "15px", color: "", fontWeight: "500" }}>
            Tiền trả lại:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500", width: "100px" }}>
            {tienThua.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>

      <div className='mt-5 text-center'>
        <span className='' style={{}}>Cảm ơn quý khách. Hẹn gặp lại!</span>
      </div>

    </div >
  );
})

export const Print = ({ data, imeis }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className=''>
      <PrintBillAtTheCounter ref={componentRef} data={data} imeis={imeis} />
      <Button
        onClick={handlePrint}
        className="rounded-2 me-2"
        type="primary"
        style={{
          height: "40px",
          width: "130px",
          fontSize: "16px",
        }}
      >
        <span
          className="text-white"
          style={{ fontWeight: "500", marginBottom: "2px" }}
        >
          IN HÓA ĐƠN
        </span>
      </Button>
    </div>
  );
}

export const PrintDelivery = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className=''>
      <PrintBillDelivery ref={componentRef} data={data} />
      <Button
        onClick={handlePrint}
        className="rounded-2 me-2"
        type="primary"
        style={{
          height: "40px",
          width: "185px",
          fontSize: "16px",
        }}
      >
        <span
          className="text-white"
          style={{ fontWeight: "500", marginBottom: "2px" }}
        >
          IN PHIẾU GIAO HÀNG
        </span>
      </Button>
    </div>
  );
}

const PrintBillDelivery = React.forwardRef((props, ref, data) => {

  const createdAt = props.data.createdAt instanceof Date ? props.data.createdAt : new Date();

  const orderItems = props.data.orderItems ? props.data.orderItems : [];

  const totalAmount = () => {
    let total = 0;
    orderItems.map((item) => {
      total += item.soLuong;
    })
    return total;
  }

  const khachCanTra = props.data.khachCanTra ? props.data.khachCanTra : 0;
  const khachDaTra = props.data.tienKhachTra ? props.data.tienKhachTra : 0;

  const totalBill = khachCanTra - khachDaTra;

  const total = (price, amount) => {
    return price * amount;
  }

  return (
    <div className='wrap-printer-delivery p-3' style={{}} ref={ref}>
      <div
        className="mt-1 ms-3"
        style={{
          borderBottom: "1px solid #C7C7C7",
          width: "100%",
          borderWidth: "1px",
          borderStyle: "dotted"
        }}
      ></div>
      <div className='d-flex justify-content-center mt-1' style={{}}>
        <div className='header-center text-center'>
          <div className='header-main mt-2'>
            <span style={{ fontSize: "30px", fontWeight: "550" }}>THÔNG TIN ĐƠN HÀNG</span>
          </div>
          <div className='code mt-1'>
            <span style={{ fontWeight: "500" }}>
              Mã hóa đơn: {" "}
            </span>
            {props.data.ma}
          </div>
          <div className='code mt-1'>
            Ngày {format(new Date(createdAt), "dd")} tháng {format(new Date(createdAt), "MM")} năm {format(new Date(createdAt), "yyyy")}
          </div>
        </div>

      </div>


      <div
        className="ms-3 mt-3"
        style={{
          borderBottom: "1px solid #C7C7C7",
          width: "100%",
          borderWidth: "1px",
          borderStyle: "dotted"
        }}
      ></div>
      <div className='customer mt-3 ms-3' style={{}}>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500", textDecoration: "underline" }}>
            Người gửi: {"  "}
          </span>
          <span className='ms-2' style={{ fontWeight: "500" }}>
            BEEPHONE SHOP - 0978774487
          </span>
          <div className='email mt-1'>
            SN 12, Ngõ 40 Kiều Mai, Bắc Từ Liêm, Hà Nội
          </div>
        </div>
        <div className='phone mt-3'>
          <span style={{ fontWeight: "500", textDecoration: "underline" }}>
            Người nhận: {"  "}
          </span>
          <span className='ms-2' style={{ fontWeight: "500" }}>
            {props.data.tenNguoiNhan} - {props.data.soDienThoaiNguoiNhan}
          </span>
          <div className='email mt-1'>
            {props.data.diaChiNguoiNhan + ","} {props.data.xaPhuongNguoiNhan + ","} {props.data.quanHuyenNguoiNhan + ","} {props.data.tinhThanhPhoNguoiNhan}
          </div>
        </div>
      </div>

      <div className='ms-3'>
        <table className='table-pdf' border="1" cellpadding="5" cellspacing="10">
          <thead>
            <tr>
              <th align="center" class="col-stt">STT</th>
              <th align="center" class="col-name">Sản phẩm</th>
              <th align="center" class="col-quantity">Số lượng</th>
              <th align="center" class="col-price">Đơn giá</th>
              <th align="center" class="col-total">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => {
              return (
                <tr>
                  <td align='center'>{index + 1}</td>
                  <td align="center">{item.sanPhamChiTiet.sanPham.tenSanPham + " " + item.sanPhamChiTiet.ram.dungLuong + "/" + item.sanPhamChiTiet.rom.dungLuong + "GB " + item.sanPhamChiTiet.mauSac.tenMauSac}</td>
                  <td align="center">{item.soLuong}</td>
                  <td align="center">{item.donGia.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}</td>
                  <td align="center">{total(item.donGia, item.soLuong).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='ms-3'>
        <span style={{}}>
          Tổng số sản phẩm:
        </span>
        <span className='ms-1' style={{}}>
          {totalAmount()}
        </span>
      </div>
      <div className='ms-3'>
        <span style={{ textDecoration: "underline", fontWeight: "500" }}>
          Ghi chú:
        </span>
        <span className='ms-2' style={{}}>
          {props.data.ghiChu}
        </span>
      </div>

      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-3">
          <span className="mt-2" style={{ textDecoration: "underline", fontSize: "17px", color: "", width: "250px", fontWeight: "500" }}>
            Tổng thu người nhận:
          </span>
          <span className="text-dark" style={{ fontSize: "25px", fontWeight: "500" }}>
            {totalBill.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>

    </div >
  );
})

