import { Button, Table } from 'antd';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
const PrintBillAtTheCounter = React.forwardRef((props, ref, data) => {

  const total = 2000000;

  return (
    <div className='wrap-printer p-3' style={{}} ref={ref}>
      <div className='mt-5 wrap-header-bill d-flex'>
        <div className='mt-1'>
          <img className='ms-3 logo' style={{ width: "309px", height: "82px" }} src="https://res.cloudinary.com/dj9e1otbm/image/upload/v1700643568/oeojgihz3v9gtovoijjg.png" alt="" />
        </div>
        <div className='address mt-2 ms-3 pt-1'>
          <span style={{ fontWeight: "500" }}>
            Địa chỉ: {" "}
          </span>
          SN 12, Ngõ 40 Kiều Mai, Bắc Từ Liêm, Hà Nội
          <div className='phone mt-1'>
            <span style={{ fontWeight: "500" }}>
              Điện thoại: {" "}
            </span>
            0978.774.487
          </div>
          <div className='email mt-1'>
            <span style={{ fontWeight: "500" }}>
              Email: {" "}
            </span>
            beephoneshop2023@gmail.com
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between' style={{}}>
        <div className='qrcode mt-4 ms-1' style={{}}>
          <img src="https://printplace.files.wordpress.com/2012/02/sample.png" style={{ width: "100px", height: "100px" }} alt="" />
        </div>
        <div className='header-center text-center'>
          <div className='header-main mt-4'>
            <span style={{ fontSize: "30px", fontWeight: "550", color: "#dc1111" }}>HÓA ĐƠN BÁN HÀNG</span>
          </div>
          <div className='code mt-1'>
            <span style={{ fontWeight: "500" }}>
              Mã hóa đơn: {" "}
            </span>
            HD0000001
          </div>
          <div className='code mt-1'>
            Ngày 21 tháng 11 năm 2023
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
          Trần Quang Hà
        </div>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            Khách hàng: {" "}
          </span>
          0978.774.487
        </div>
        <div className='phone mt-1'>
          <span style={{ fontWeight: "500" }}>
            SĐT: {" "}
          </span>
          0978.774.487
        </div>
        <div className='email mt-1'>
          <span style={{ fontWeight: "500" }}>
            Địa chỉ: {" "}
          </span>
          beephoneshop2023@gmail.com
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
            <tr>
              <td align='center'>1</td>
              <td align="center">Iphone 14 Pro Max Chính Hãng 256GB BLUE</td>
              <td align="center">20</td>
              <td align="center">500,000,000</td>
              <td align="center">500,000,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-3">
          <span className="" style={{ fontSize: "15px", color: "", width: "250px", fontWeight: "500" }}>
            Tổng tiền hàng:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500" }}>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-1">
          <span className="" style={{ fontSize: "15px", color: "", width: "250px", fontWeight: "500" }}>
            Chiết khấu:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500" }}>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-1">
          <span className="" style={{ fontSize: "15px", color: "", width: "250px", fontWeight: "500" }}>
            Khách phải trả:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500" }}>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-1">
          <span className="" style={{ fontSize: "15px", color: "", width: "250px", fontWeight: "500" }}>
            Tiền khách đưa:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500" }}>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-1">
          <span className="" style={{ fontSize: "15px", color: "", width: "250px", fontWeight: "500" }}>
            Tiền trả lại:
          </span>
          <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500" }}>
            {total.toLocaleString("vi-VN", {
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

export const Print = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className=''>
      <PrintBillAtTheCounter ref={componentRef} />
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

const PrintBillDelivery = React.forwardRef((props, ref, data) => {

  const total = 2000000;


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
      <div className='d-flex justify-content-between mt-1' style={{}}>
        <div className='qrcode ms-1 mt-2' style={{}}>
          <img src="https://printplace.files.wordpress.com/2012/02/sample.png" style={{ width: "100px", height: "100px" }} alt="" />
        </div>
        <div className='header-center text-center'>
          <div className='header-main mt-2'>
            <span style={{ fontSize: "30px", fontWeight: "550" }}>THÔNG TIN ĐƠN HÀNG</span>
          </div>
          <div className='code mt-1'>
            <span style={{ fontWeight: "500" }}>
              Mã hóa đơn: {" "}
            </span>
            HD0000001
          </div>
          <div className='code mt-1'>
            Ngày 21 tháng 11 năm 2023
          </div>
        </div>
        <div className='qrcode-none mt-4' style={{ backgroundColor: "transparent" }}>
          <img src="https://printplace.files.wordpress.com/2012/02/sample.png" style={{ width: "100px", height: "100px" }} alt="" />
        </div>

      </div>


      <div
        className="ms-3"
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
            BEEPHONE SHOP - 0978.774.487
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
            BEEPHONE SHOP - 0978.774.487
          </span>
          <div className='email mt-1'>
            SN 12, Ngõ 40 Kiều Mai, Bắc Từ Liêm, Hà Nội
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
            <tr>
              <td align='center'>1</td>
              <td align="center">Iphone 14 Pro Max Chính Hãng 256GB BLUE</td>
              <td align="center">20</td>
              <td align="center">500,000,000</td>
              <td align="center">500,000,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='ms-3'>
        <span style={{}}>
          Tổng số sản phẩm:
        </span>
        <span className='ms-1' style={{}}>
          1
        </span>
      </div>
      <div className='ms-3'>
        <span style={{ textDecoration: "underline", fontWeight: "500" }}>
          Ghi chú:
        </span>
        <span className='ms-2' style={{}}>
          Không cho xem hàng
        </span>
      </div>

      <div className='d-flex justify-content-end'>
        <div className="d-flex justify-content-between mt-3">
          <span className="mt-2" style={{ textDecoration: "underline", fontSize: "17px", color: "", width: "250px", fontWeight: "500" }}>
            Tổng thu người nhận:
          </span>
          <span className="text-dark" style={{ fontSize: "25px", fontWeight: "500" }}>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
      </div>

    </div >
  );
})

const SendEmailOrder = React.forwardRef(() => {

  const total = 2000000;

  return (
    <div className='send-main mx-auto' style={{ width: "80%" }}>
      <div className='wrap-header-bill text-center'>
        <div className=''>
          <img className='logo' style={{ width: "330px", height: "82px" }} src="https://res.cloudinary.com/dj9e1otbm/image/upload/v1700643568/oeojgihz3v9gtovoijjg.png" alt="" />
        </div>
      </div>
      <div className='text-center mt-1'>
        <span style={{ fontWeight: "500", fontSize: "25px", color: "#2f80ed" }}>Cảm ơn quý khách đã đặt hàng tại BEEPHONESHOP!</span>
      </div>

      <div className='mt-4'>
        <span style={{ fontSize: "20px" }}>
          Xin chào <span className='' style={{ fontWeight: "500" }}>Thúy Hằng</span>
        </span>
      </div>
      <div className='mt-2'>
        <span>
          <span style={{ fontWeight: "500" }}>
            BEEPHONESHOP {" "}
          </span>
          đã nhận được yêu cầu đặt hàng của bạn và đang trong quá trình xử lý. Bạn
          sẽ nhận được thông báo tiếp theo khi đơn hàng đã sẵn sàng được giao.
        </span>
        <div className='text-center'>
          <a href="">
            <button
              className="view-order-state mt-3 me-4"
            >
              <span
                class=""
                style={{ fontSize: "17.5px", fontWeight: "450" }}
              >
                TÌNH TRẠNG ĐƠN HÀNG
              </span>
            </button>
          </a>
        </div>
      </div>

      <div className='mt-4'>
        <table className='table-info-order' border="1" cellpadding="5" cellspacing="10">
          <thead>
            <tr className=''>
              <th colSpan="2" class="col-info p-2">Thông tin đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            <tr className=''>
              <td className='p-2' style={{ width: "50%" }}>
                <div className='phone'>
                  <span style={{ fontWeight: "500" }}>
                    Mã đơn hàng: {" "}
                  </span>
                  <span className='ms-1' style={{ fontWeight: "500" }}>
                    #200392032093
                  </span>
                </div>
                <div className='phone mt-1'>
                  <span style={{ fontWeight: "500" }}>
                    Ngày đặt hàng: {" "}
                  </span>
                  <span className='ms-1' style={{}}>
                    200392032093
                  </span>
                </div>
                <div className='phone mt-1'>
                  <span style={{ fontWeight: "500" }}>
                    Phương thức thanh toán: {" "}
                  </span>
                  <span className='ms-1' style={{}}>
                    Thanh toán khi nhận hàng
                  </span>
                </div>
                <div className='phone mt-1'>
                  <span style={{ fontWeight: "500" }}>
                    Phương thức vận chuyển: {" "}
                  </span>
                  <span className='ms-1' style={{}}>
                    Giao hàng nhanh
                  </span>
                </div>
              </td>
              <td style={{ width: "50%" }} className="p-2" >
                <div className='phone'>
                  <span style={{ fontWeight: "500" }}>
                    Họ và tên: {" "}
                  </span>
                  <span className='ms-1' style={{}}>
                    Trần Quang Hà
                  </span>
                </div>
                <div className='phone mt-1'>
                  <span style={{ fontWeight: "500" }}>
                    Số điện thoại: {" "}
                  </span>
                  <span className='ms-1' style={{}}>
                    09018239831
                  </span>
                </div>
                <div className='phone mt-1'>
                  <span style={{ fontWeight: "500" }}>
                    Email: {" "}
                  </span>
                  <span className='ms-1' style={{}}>
                    haog@gmail.com
                  </span>
                </div>
                <div className='phone mt-1'>
                  <span style={{ fontWeight: "500" }}>
                    Trạng thái đơn hàng: {" "}
                  </span>
                  <span className='ms-1' style={{}}>
                    Chờ xác nhận
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='mt-4'>
        <table className='table-info-order' border="1" cellpadding="5" cellspacing="10">
          <thead>
            <tr className=''>
              <th colSpan="2" class="col-info p-2">Địa chỉ nhận hàng</th>
            </tr>
          </thead>
          <tbody>
            <tr className=''>
              <td className='p-2' style={{}}>
                Trần Quang Hà - 09787444387 - SN 12 Ngõ 40 Phú Kiều, Kiều mai, bắc từ Liêm Hà nỘi
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='mt-4'>
        <table className='table-info-order' border="1" cellpadding="5" cellspacing="10">
          <thead>
            <tr className=''>
              <th style={{ textAlign: "center" }} class="col-info p-2">Sản phẩm</th>
              <th style={{ textAlign: "center" }} class="col-info p-2">Số lượng</th>
              <th style={{ textAlign: "center" }} class="col-info p-2">Đơn giá</th>
              <th style={{ textAlign: "center" }} class="col-info p-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr className=''>
              <td className='p-4' style={{ textAlign: "center" }}>
                <div className="d-flex">
                  <div className="product-img">
                    <img
                      src={
                        "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/v/_/v_ng_20.png"
                      }
                      class=""
                      alt=""
                      style={{ width: "125px", height: "125px" }}
                    />
                  </div>
                  <div className="product ms-3 text-start" title='Xem sản phẩm'>
                    <div classNamountme="product-name" style={{ cursor: "pointer" }}>
                      <span
                        className="underline-custom"
                        style={{
                          whiteSpace: "pre-line",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Iphone 14 Pro Max 256GB BLUE
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className='p-4' style={{ textAlign: "center", width: "15%" }}>
                1
              </td>
              <td className='p-4' style={{ textAlign: "center" }}>
                500,000,000
              </td>
              <td className='p-4' style={{ textAlign: "center" }}>
                500,000,000
              </td>
            </tr>
            <tr className=''>
              <td className='p-2' colSpan="3" style={{ textAlign: "end", fontWeight: "500" }}>
                Tổng tiền hàng:
              </td>
              <td className='p-2' colSpan="1" style={{ textAlign: "center" }}>
                500,000,000
              </td>
            </tr>
            <tr className=''>
              <td className='p-2' colSpan="3" style={{ textAlign: "end", fontWeight: "500" }}>
                Giảm giá:
              </td>
              <td className='p-2' colSpan="1" style={{ textAlign: "center" }}>
                50,000
              </td>
            </tr>
            <tr className=''>
              <td className='p-2' colSpan="3" style={{ textAlign: "end", fontWeight: "500" }}>
                Phí vận chuyển:
              </td>
              <td className='p-2' colSpan="1" style={{ textAlign: "center" }}>
                50,000
              </td>
            </tr>
            <tr className=''>
              <td className='p-2' colSpan="3" style={{ textAlign: "end", fontWeight: "500" }}>
                Tổng cần thanh toán:
              </td>
              <td className='p-2' colSpan="1" style={{ textAlign: "center" }}>
                50,000,000
              </td>
            </tr>
          </tbody>
        </table>

        <div className='mt-3 text-center'>
          <span>
            Nếu bạn có bất kì câu hỏi nào, hoặc cần hỗ trợ về đơn hàng. Vui lòng liên hệ với chúng tôi qua Hotline:
            <span className='underline-custom ms-1' style={{ cursor: "pointer" }}>
              0978774487 {" "}
            </span>
            hoặc Email:
            <span className='underline-custom ms-1' style={{ cursor: "pointer" }}>
              beephoneshop@gmail.vn
            </span>!

          </span>
        </div>

      </div>


    </div >
  );
})
