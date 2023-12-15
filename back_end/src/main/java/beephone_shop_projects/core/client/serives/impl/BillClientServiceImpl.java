package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.converter.VoucherConverter;
import beephone_shop_projects.core.admin.order_management.repository.OrderItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.LichSuHoaDonRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.LichSuHoaDonServiceImpl;
import beephone_shop_projects.core.client.models.request.BillClientRequest;
import beephone_shop_projects.core.client.models.request.BillDetailClientRequest;
import beephone_shop_projects.core.client.models.response.BillClientResponce;
import beephone_shop_projects.core.client.models.response.ProductOfBillDetail;
import beephone_shop_projects.core.client.repositories.*;
import beephone_shop_projects.entity.*;
import beephone_shop_projects.infrastructure.config.mail.EmailService;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import beephone_shop_projects.utils.RandomCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BillClientServiceImpl {

    @Autowired
    private OrderRepositoryImpl hoaDonRepository;

    @Autowired
    private LichSuHoaDonServiceImpl orderHistoryServiceImpl;

    @Autowired
    private LichSuHoaDonRepositoryImpl lichSuHoaDonRepository;

    @Autowired
    private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

    @Autowired
    private OrderConverter orderConverter;

    @Autowired
    private VoucherConverter voucherConverter;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AccountClientRepository accountClientRepository;

    @Autowired
    private BillClientRepository billClientRepository;

    @Autowired
    private BillDetailClientRepository billDetailRepository;

    @Autowired
    private ProductDetailClientRepository productDetailClientRepository;

    @Autowired
    private CartClientRepository cartClientRepository;

    @Autowired
    private CartDetailClientRepository cartDetailClientRepository;

    @Autowired
    private BillDetailClientRepository billDetailClientRepository;

    @Autowired
    private EmailService emailService;

    public HoaDon createBillClient(BillClientRequest orderRequest) throws Exception {

        Account khachHang = null;
        if(!orderRequest.getIdKhachHang().isEmpty()){
            khachHang= accountClientRepository.findById(orderRequest.getIdKhachHang()).get();
        }

        String code =  RandomCodeGenerator.generateRandomNumber();
        HoaDon newOrder = new HoaDon();
        newOrder.setMa(code);
        newOrder.setAccount(orderRequest.getIdKhachHang().isEmpty() ? null : khachHang);
        newOrder.setVoucher(orderRequest.getVoucher());
        newOrder.setLoaiHoaDon(OrderType.DELIVERY);
        newOrder.setGhiChu(orderRequest.getGhiChu());
        newOrder.setDiaChiNguoiNhan(orderRequest.getDiaChiNguoiNhan());
        newOrder.setXaPhuongNguoiNhan(orderRequest.getXaPhuongNguoiNhan());
        newOrder.setQuanHuyenNguoiNhan(orderRequest.getQuanHuyenNguoiNhan());
        newOrder.setTinhThanhPhoNguoiNhan(orderRequest.getTinhThanhPhoNguoiNhan());
        newOrder.setSoDienThoaiNguoiNhan(orderRequest.getSoDienThoaiNguoiNhan());
        newOrder.setTenNguoiNhan(orderRequest.getTenNguoiNhan());
        newOrder.setTrangThai(OrderStatus.PENDING_CONFIRM);
        newOrder.setTongTien(orderRequest.getTongTien());
        newOrder.setTongTienSauKhiGiam(orderRequest.getTongTienSauKhiGiam());
        newOrder.setKhachCanTra(orderRequest.getTienKhachTra());
        newOrder.setPhiShip(orderRequest.getPhiShip());
        newOrder.setCreatedAt(new Date());
        newOrder.setTongTien(orderRequest.getTongTien());
        newOrder.setNgayMongMuonNhan(new Date(orderRequest.getNgayNhanHang()));
        newOrder.setEmail(orderRequest.getEmail());
        HoaDon createdOrder = hoaDonRepository.save(newOrder);

        LichSuHoaDon orderHistory = new LichSuHoaDon();
        orderHistory.setHoaDon(createdOrder);
        orderHistory.setCreatedAt(new Date());
        orderHistory.setThaoTac("Đặt Hàng Thành Công");
        orderHistory.setMoTa("Khách hàng đặt hàng online");
        orderHistory.setLoaiThaoTac(0);
        lichSuHoaDonRepository.save(orderHistory);

        HinhThucThanhToan hinhThucThanhToan = new HinhThucThanhToan();
//        hinhThucThanhToan.setMa(hinhThucThanhToanRepository.getMaxEntityCodeByClass());
//        hinhThucThanhToan.setHoaDon(createdOrder);
//        hinhThucThanhToan.setSoTienThanhToan(new BigDecimal(0));
//        hinhThucThanhToan.setLoaiThanhToan(0);
//        hinhThucThanhToan.setHinhThucThanhToan(orderRequest.getPaymentMethod());
//        hinhThucThanhToan.setTrangThai(null);
//        hinhThucThanhToan.setCreatedAt(new Date());
//        hinhThucThanhToan.setNguoiXacNhan("Admin");
        hinhThucThanhToanRepository.save(hinhThucThanhToan);

       return createdOrder;
    }

    public String createBillDetail(BillDetailClientRequest bd) throws Exception {
        if(!bd.getIdKhachHang().isEmpty()){
            GioHang gioHang = cartClientRepository.getGioHangByIDKhachHang(bd.getIdKhachHang());
            cartDetailClientRepository.deleteCartDetailByIdGioHangAndIdCTSP(gioHang.getId(), bd.getIdSanPhamChiTiet());
        }

        HoaDon bill = billClientRepository.findById(bd.getIdHoaDon()).get();
        HoaDonChiTiet orderItem = new HoaDonChiTiet();
        orderItem.setHoaDon(bill);
        orderItem.setDonGia(bd.getDonGia());
        orderItem.setSoLuong(bd.getSoLuong());
        orderItem.setDonGiaSauGiam(bd.getDonGiaSauKhiGiam());
        orderItem.setSanPhamChiTiet(productDetailClientRepository.findById(bd.getIdSanPhamChiTiet()).get());
        orderItemRepository.save(orderItem);
        return "Thành công";
    }

    public List<BillClientResponce> getHoaDonByIDKhachHang(String idKhachHang) {
        ArrayList<HoaDon> listBill =  billClientRepository.getHoaDonByIDKhachHang(idKhachHang);
        ArrayList<BillClientResponce> billClientResponces = new ArrayList<>();

        for(HoaDon hoaDon : listBill) {
            BillClientResponce billClientResponce = new BillClientResponce();
            billClientResponce.setId(hoaDon.getId());
            billClientResponce.setMa(hoaDon.getMa());

            ArrayList<ProductOfBillDetail> productOfBillDetails = billDetailClientRepository.getProductOfDetailsByIDBill(hoaDon.getId());

            if (!productOfBillDetails.isEmpty()) {
//                throw new RuntimeException("Không tìm thấy hoá đơn chi tiết nào trong hoá đơn!");
                billClientResponce.setDuongDan(productOfBillDetails.get(0).getDuongDan());
                billClientResponce.setRom(productOfBillDetails.get(0).getRom());
                billClientResponce.setRam(productOfBillDetails.get(0).getRam());
                billClientResponce.setSoLuongSanPham(productOfBillDetails.size());
                billClientResponce.setTenMauSac(productOfBillDetails.get(0).getTenMauSac());
                billClientResponce.setTenSanPham(productOfBillDetails.get(0).getTenSanPham());
                billClientResponce.setTrangThai(String.valueOf(hoaDon.getTrangThai()));
                billClientResponce.setTongTienSauKhiGiam(hoaDon.getTongTienSauKhiGiam());
                billClientResponces.add(billClientResponce);
            }
        }
        return billClientResponces;
    }

    public HoaDon getHoaDonByIDHoaDon(String idHoaDon) throws Exception {
        return billClientRepository.findById(idHoaDon).orElseThrow(()-> new Exception("Không tìm thấy hoá đơn"));
    }

    public HoaDon getHoaDonBySoDienThoaiVaMaHoaDon(String soDienThoai, String maHoaDon) throws Exception {
        ArrayList<HoaDon> listHoaDon =  billClientRepository.getHoaDonByMaHoaDonVaSoDienThoai(soDienThoai, maHoaDon);
        if(listHoaDon.isEmpty()){
            throw new Exception("Không tìm thấy hoá đơn");
        }
        return listHoaDon.get(0);
    }

    public List<LichSuHoaDon> getLichSuHoaDon(String idHoaDon) {
        return lichSuHoaDonRepository.getOrderHistoriesByOrderId(idHoaDon);
    }

    public String sendEmail(String idHoaDon) throws Exception {
        HoaDon bill = billClientRepository.findById(idHoaDon).orElseThrow(()-> new Exception("Không tìm thấy hoá đơn"));
        ArrayList<ProductOfBillDetail> productOfBillDetails = billDetailClientRepository.getProductOfDetailsByIDBill(bill.getId());

        //send email
        Context context = new Context();

        context.setVariable("bill", bill);
        context.setVariable("billDetails", productOfBillDetails);

        emailService.sendEmailWithHtmlTemplate(bill.getEmail(), "Thông tin đơn hàng " + bill.getMa(), "email-template", context);
        return "Send email successfully";
    }
}
