package beephone_shop_projects.infrastructure.constant;

public class MailConstant {
    public static final String LOGO_PATH = "/static/assets/images/logo.png";
    public static final String CAM_KET = "/static/assets/images/camket.png";
    public static final String LIEN_HE = "/static/assets/images/lien-he.png";
    public static final String CAM_ON = "/static/assets/images/Thank-You.png";
    public static final String HEADER = """
            <!DOCTYPE hmtl>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                </style>
            </head>

            <body>
                <div class="container">
                    <div class=" text-center border-bottom" style="background-color: #132A4D;">
                        <img src="cid:logoImage" height="80px">
                        <h3> Cảm ơn bạn đã đặt hàng tại BeePhoneShop </h3>
                    </div>
                    <div class="container" style="margin: 10px 10px;">
                    <h3>{title}</h3>
                        """;

    public static final String CONTENT_EVENT_MAIL = """
            <ul class="list-unstyled">
                        <li> <h2>Thân gửi các tới khách hàng <strong style="text-transform: uppercase;">{clientBeePhoneShop}</strong> </h2> </li>
                        <li>BeePhoneShop đã nhận được yêu cầu đặt hàng với mã đơn hàng {maDonHang}. Chúng tôi sẽ kiểm tra số lượng tại kho hàng và
                         gửi cập nhật đến bạn khi đơn hàng đã sẵn sàng.
                        </li>
                        <br>
                        <li>
                            Mong nhận được nhiều sự góp ý hơn của các bạn.
                        </li>
                       </ul>
            """;
    public static final String FOOTER = """
                    </div>
                    <div class=" text-center border-top small" style="background-color: #132A4D; padding: 10px 10px;color: #FFF;">
                        <ul class="list-unstyled">
                            <li>Lưu ý : Đây là email tự động vui lòng không phải hồi email này.</li>
                            <li>Mọi thắc mắc xin liên hệ xưởng dự án của Bộ môn Phát Triển Phần Mềm.</li>
                        </ul>
                    </div>
                </div>
            </body>
                  
            </html>
            """;
}
