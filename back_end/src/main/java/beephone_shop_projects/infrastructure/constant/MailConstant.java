package beephone_shop_projects.infrastructure.constant;

public class MailConstant {
    public static final String LOGO_PATH1 = "/static/assets/logo/logo.png";
    public static final String CAM_KET = "/static/assets/images/1.png";
    public static final String LIEN_HE = "/static/assets/images/2.png";
    public static final String THEO_DOI = "/static/assets/images/3.png";
    public static final String CAM_ON = "/static/assets/images/Thank-You.png";
    public static final String HEADER = """
            <!DOCTYPE hmtl>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link
                      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                      rel="stylesheet"
                      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                      crossorigin="anonymous"
                    />
                <title>Document</title>
                <style>
                    .container {
                        max-width: 1140px;
                        margin: 0 auto;
                    }

                    .bg-secondary {
                        background-color: #6c757d !important;
                        color: #fff !important;
                    }

                    .border {
                        border: 1px solid #dee2e6 !important;
                    }

                    .border-2 {
                        border-width: 2px !important;
                    }

                    .text-center {
                        text-align: center !important;
                    }

                    .small {
                        font-size: 0.875rem !important;
                    }

                    .list-unstyled {
                        padding-left: 0;
                        list-style: none;
                    }

                    .border-bottom {
                        border-bottom: 3px solid #ddd;
                    }
                    .border-top {
                        border-top: 3px solid #ddd;
                    }
                   
                    table {
                        border: 1px solid black;
                        border-collapse: collapse;
                        font-size: larger;
                      }
                    
                      th, td {
                        border: 1px solid black;
                      }
                </style>
            </head>

            <body>
                <div
                    class="text-center border-bottom"
                    style="background-color: #132a4d; color: #fff"
                  >
                    <img src="cid:logoImage" height="80px" style="margin-top: 5px" />
                    <h3>Cảm ơn bạn đã đặt hàng tại BeePhoneShop</h3>
                  </div>
                        """;

    public static final String CONTENT_EVENT_MAIL = """
            <ul class="list-unstyled">
                                       <li>
                                         <h1>
                                           Thân gửi đến khách hàng
                                           <strong style="font-weight: bold"
                                             >{tenKhachHang}</strong
                                           >
                                         </h4>
                                       </li>
                                       <li style="font-size: larger;">
                                         BeePhoneShop đã nhận được yêu cầu đặt hàng với mã đơn hàng
                                         <strong style="font-weight: bold">{maDonHang}</strong>.
                                         <br />
                                         Chúng tôi sẽ kiểm tra số lượng tại kho hàng và gửi cập nhật đến bạn
                                         khi đơn hàng đã sẵn sàng.
                                       </li>
                                       <br />
                                       <li>
                                         <table class="table">
                                         <thead>
                                             <tr>
                                               <th scope="col">THÔNG TIN ĐƠN HÀNG</th>
                                               <th scope="col">ĐỊA CHỈ GIAO HÀNG</th>
                                             </tr>
                                           </thead>
                                           <tbody>
                                             <tr>
                                               <td scope="col">
                                                 <h6>
                                                   Mã đơn hàng:
                                                   <strong style="font-weight: bold"
                                                     >{maDonHang}</strong
                                                   >
                                                 </h6>
                                                 <h6>
                                                   Ngày đặt hàng:<strong style="font-weight: bold"
                                                     >{ngayDatHang}</strong
                                                   >
                                                 </h6>
                                                 <h6>
                                                   Phương thức thanh toán:<strong
                                                     style="font-weight: bold"
                                                     >{hinhThucThanhToan}</strong
                                                   >
                                                 </h6>
                                                 <h6>
                                                   Hình thức giao hàng:<strong
                                                     style="font-weight: bold"
                                                     >{hinhThucGiaoHang}</strong
                                                   >
                                                 </h6>
                                               </td>
                             
                                               <td scope="col">
                                                 <h6>
                                                   Tên khách hàng:<strong style="font-weight: bold"
                                                     >{tenKhachHang}</strong
                                                   >
                                                 </h6>
                                                 <h6>
                                                   Địa chỉ:<strong style="font-weight: bold"
                                                     >{diaChi}</strong
                                                   >
                                                 </h6>
                                                 <h6>
                                                   Số điện thoại nhận hàng:<strong
                                                     style="font-weight: bold"
                                                     >{sdtNhanHang}</strong
                                                   >
                                                 </h6>
                                               </td>
                                             </tr>
                                           </tbody>
                                         </table>
                                       </li>
                                       <br />
                                       <li><h3>CHI TIẾT ĐƠN HÀNG</h3></li>
                                       <li>
                                         <table class="table" style="border: 1px solid black">
                                           <thead>
                                             <tr>
                                               <th scope="col">Sản phẩm</th>
                                               <th scope="col">Tên sản phẩm</th>
                                               <th scope="col">Số lượng</th>
                                               <th scope="col">Giá</th>
                                             </tr>
                                           </thead>
                                           <tbody>
                                             <tr>
                                               <th scope="row">
                                                 <img
                                                   src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone15-pro-max-titan-xanh.jpg"
                                                   alt="sản phẩm"
                                                   width="150px"
                                                 />
                                               </th>
                                               <td>iPhone 15 Pro Max 256GB</td>
                                               <td>100</td>
                                               <td>300.000 VND</td>
                                             </tr>
                                           </tbody>
                                         </table>
                                       </li>
                             
                                       <div class="tongTien" style="font-size: larger;">
                                         <div>
                                           <span>Thành tiền:</span>
                                           <span>{thanhTien}</span>
                                         </div>
                                         <div>
                                           <span>Phí vận chuyển:</span>
                                           <span>{phiVanChuyen}</span>
                                         </div>
                                         <div>
                                           <span>Giảm giá:</span>
                                           <span>{giamGia}</span>
                                         </div>
                                         <div>
                                           <span>Tổng cộng:</span>
                                           <span>{tongCong}</span>
                                         </div>
                                       </div>
                                     </ul>
                             
                                     <div  class="text-center border-bottom"
                                            style="background-color: #003274; color: #fff">
                                            <div class="row">
                                            <img src="cid:camOnImage" height="300px" alt="Cảm ơn" />
                                            </div>
                                            <div class="row">
                                            <img src="cid:camKetImage" height="300px" alt="Cam kết" />
                                            </div>
                                     </div>
                                     <div style="font-size: larger;">
                                       
                                       <br />
                                       <div class="text-center border-bottom"
                                            style="background-color: #003274; color: #fff">
                                            <strong>BẠN CẦN HỖ TRỢ VỀ ĐƠN HÀNG?</strong>
                                       <br />
                                       <span
                                         >Vui lòng liên hệ đội ngũ CSKH của chúng tôi qua các kênh sau:
                                       </span>
                                       <img src="cid:lienHeImage" height="200px" alt="liên hệ" />
                                       <br />
                                       <img src="cid:theoDoiImage" height="200px" alt="Theo dõi" />
                                       </div>
                                     </div>
            """;
    public static final String FOOTER = """
                    </div>
                    <div class=" text-center border-top small" style="background-color: #132A4D; padding: 10px 10px;color: #FFF;">
                        <ul class="list-unstyled">
                            <li>Lưu ý : Đây là email tự động vui lòng không phải hồi email này.</li>
                            <li>Mọi thắc mắc xin liên hệ tới kênh CSKH của chúng tôi.</li>
                        </ul>
                    </div>
                </div>
                <script>
                      // Sử dụng JavaScript để tạo vòng lặp và thêm các số vào danh sách
                      var numberList = document.getElementById("numberList");
                
                      for (var i = 1; i <= 5; i++) {
                        var listItem = document.createElement("li");
                        listItem.textContent = i;
                        numberList.appendChild(listItem);
                      }
                    </script>
                    <script
                      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
                      crossorigin="anonymous"
                    ></script>
                    <script
                      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                      crossorigin="anonymous"
                    ></script>
                    <script
                      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
                      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
                      crossorigin="anonymous"
                    ></script>
            </body>
                  
            </html>
            """;
}
