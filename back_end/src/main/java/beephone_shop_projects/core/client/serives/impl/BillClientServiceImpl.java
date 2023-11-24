package beephone_shop_projects.core.client.serives.impl;

import beephone_shop_projects.core.admin.order_management.converter.AccountConverter;
import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductItemConverter;
import beephone_shop_projects.core.admin.order_management.converter.VoucherConverter;
import beephone_shop_projects.core.admin.order_management.model.request.CartRequest;
import beephone_shop_projects.core.admin.order_management.model.request.OrderRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.OrderResponse;
import beephone_shop_projects.core.admin.order_management.repository.OrderItemRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.HinhThucThanhToanRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.LichSuHoaDonRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.CartServiceImpl;
import beephone_shop_projects.core.admin.order_management.service.impl.LichSuHoaDonServiceImpl;
import beephone_shop_projects.core.client.models.request.BillClientRequest;
import beephone_shop_projects.core.client.models.request.BillDetailClientRequest;
import beephone_shop_projects.core.client.repositories.*;
import beephone_shop_projects.entity.*;
import beephone_shop_projects.infrastructure.constant.OrderStatus;
import beephone_shop_projects.infrastructure.constant.OrderType;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

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
    private BillDetailRepository billDetailRepository;

    @Autowired
    private ProductDetailClientRepository productDetailClientRepository;

    @Autowired
    private CartClientRepository cartClientRepository;

    @Autowired
    private CartDetailClientRepository cartDetailClientRepository;

    public HoaDon createBillClient(BillClientRequest orderRequest) throws Exception {
        Account khachHang = orderRequest.getIdKhachHang();

        if(orderRequest.getIdKhachHang().getMa() == "" || orderRequest.getIdKhachHang().getMa() == null){
            Random random = new Random();
            int number = random.nextInt(10000);
            String code = String.format("KH%04d", number);

            khachHang.setMa(code);
            accountClientRepository.save(khachHang);
        }

        Random random = new Random();
        int number = random.nextInt(1000000);
        String code = String.format("HD%04d", number);
        HoaDon newOrder = new HoaDon();
        newOrder.setMa(code);
        newOrder.setAccount(khachHang);
        newOrder.setVoucher(orderRequest.getVoucher());
        newOrder.setLoaiHoaDon(OrderType.DELIVERY);
        newOrder.setGhiChu(orderRequest.getGhiChu());
        newOrder.setDiaChiNguoiNhan(khachHang.getDiaChi());
        newOrder.setXaPhuongNguoiNhan(khachHang.getXaPhuong());
        newOrder.setQuanHuyenNguoiNhan(khachHang.getQuanHuyen());
        newOrder.setTinhThanhPhoNguoiNhan(khachHang.getTinhThanhPho());
        newOrder.setSoDienThoaiNguoiNhan(khachHang.getSoDienThoai());
        newOrder.setTenNguoiNhan(khachHang.getHoVaTen());
        newOrder.setTrangThai(OrderStatus.PENDING_CONFIRM);
        newOrder.setTongTien(orderRequest.getTongTien());
        newOrder.setTongTienSauKhiGiam(orderRequest.getTongTienSauKhiGiam());
        newOrder.setKhachCanTra(orderRequest.getTienKhachTra());
        newOrder.setPhiShip(new BigDecimal(25600));
        newOrder.setCreatedAt(new Date());
        newOrder.setTongTien(orderRequest.getTongTien());
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
        GioHang gioHang = cartClientRepository.getGioHangByIDKhachHang(bd.getIdKhachHang());
        cartDetailClientRepository.deleteCartDetailByIdGioHangAndIdCTSP(gioHang.getId(), bd.getIdSanPhamChiTiet());
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

    public List<HoaDon> getHoaDonByIDKhachHang(String idKhachHang) {
        return billClientRepository.getHoaDonByIDKhachHang(idKhachHang);
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
}
