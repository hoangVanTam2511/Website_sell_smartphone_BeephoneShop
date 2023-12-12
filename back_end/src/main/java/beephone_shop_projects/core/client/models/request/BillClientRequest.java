package beephone_shop_projects.core.client.models.request;

import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.Voucher;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class BillClientRequest {

    private BigDecimal tongTien;

    private BigDecimal tienThua;

    private String idKhachHang;

    private BigDecimal tongTienSauKhiGiam;

    private BigDecimal tienKhachTra;

    private OrderStatus trangThai;

    private OrderType loaiHoaDon;

    private BigDecimal phiShip;

    private String soDienThoaiNguoiNhan;

    private String tenNguoiNhan;

    private String diaChiNguoiNhan;

    private String tinhThanhPhoNguoiNhan;

    private String quanHuyenNguoiNhan;

    private String xaPhuongNguoiNhan;

    private Boolean isPayment;

    private Boolean isUpdateInfo;

    private Boolean isUpdateVoucher;

    private String ghiChu;

    private Voucher voucher;

    private Integer paymentMethod;

    private String ngayNhanHang;

    private String email;
}
