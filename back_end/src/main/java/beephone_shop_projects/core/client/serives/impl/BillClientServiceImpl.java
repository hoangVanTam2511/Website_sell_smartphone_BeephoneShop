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

@Service
public class BillClientServiceImpl {

    @Autowired
    private OrderRepositoryImpl hoaDonRepository;

    @Autowired
    private LichSuHoaDonServiceImpl orderHistoryServiceImpl;

    @Autowired
    private LichSuHoaDonRepositoryImpl lichSuHoaDonRepository;

    @Autowired
    private CartRepositoryImpl gioHangRepository;

    @Autowired
    private HinhThucThanhToanRepositoryImpl hinhThucThanhToanRepository;

    @Autowired
    private OrderConverter orderConverter;

    @Autowired
    private CartServiceImpl gioHangService;

    @Autowired
    private LichSuHoaDonServiceImpl lichSuHoaDonService;

    @Autowired
    private AccountConverter accountConverter;

    @Autowired
    private VoucherConverter voucherConverter;

    @Autowired
    private ProductItemConverter productItemConverter;

    @Autowired
    private OrderItemRepository orderItemRepository;


    public OrderResponse placeOrder(OrderRequest orderRequest) throws Exception {
        HoaDon newOrder = new HoaDon();
        newOrder.setMa(hoaDonRepository.getMaxEntityCodeByClass());
        newOrder.setAccount(null);
        newOrder.setVoucher(null);
        newOrder.setLoaiHoaDon(OrderType.DELIVERY);
        newOrder.setGhiChu("Ok");
        newOrder.setDiaChiNguoiNhan("Thanh Xuân, Hà Nội");
        newOrder.setSoDienThoaiNguoiNhan("08345738123");
        newOrder.setTenNguoiNhan("Nguyễn Hữu Tùng");
        newOrder.setTrangThai(OrderStatus.PENDING_CONFIRM);
        newOrder.setCreatedAt(new Date());
        newOrder.setTongTien(new BigDecimal(30000000));
        HoaDon createdOrder = hoaDonRepository.save(newOrder);
        LichSuHoaDon orderHistory = new LichSuHoaDon();
        orderHistory.setHoaDon(createdOrder);
        orderHistory.setCreatedAt(new Date());
        orderHistory.setThaoTac("Đặt Hàng");
        orderHistory.setMoTa("Khách hàng đặt hàng online");
        orderHistory.setLoaiThaoTac(0);
        lichSuHoaDonRepository.save(orderHistory);
        return orderConverter.convertEntityToResponse(createdOrder);
    }

    public Page<OrderResponse> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilter) throws Exception {
        if (searchFilter.getKeyword() == null) {
            searchFilter.setKeyword("");
        }
        if (searchFilter.getCurrentPage() == null) {
            searchFilter.setCurrentPage(1);
        }
        if (searchFilter.getPageSize() == null) {
            searchFilter.setPageSize(5);
        }
        Pageable pageable = PageRequest.of(searchFilter.getCurrentPage() - 1, searchFilter.getPageSize(), Sort.by("createdAt").ascending());
        Page<HoaDon> orders = hoaDonRepository.findOrdersByMultipleCriteriaWithPagination(pageable, searchFilter);
        return orderConverter.convertToPageResponse(orders);
    }

    public OrderResponse updateStatusOrderDelivery(OrderRequest req, String id) throws Exception {
//        OrderResponse orderCurrent = getOrderDetailsById(id);
        OrderResponse orderCurrent = new OrderResponse();
        if (orderCurrent == null) {
            throw new RestApiException("Đơn hàng không tồn tại!");
        }
        if (req.getTrangThai().equals(OrderStatus.CANCELLED) && req.getOrderHistory().getMoTa().isBlank()) {
            throw new RestApiException("Bạn chưa nhập lý do hủy đơn hàng!");
        }
        orderCurrent.setTrangThai(req.getTrangThai());
        orderHistoryServiceImpl.save(req.getOrderHistory());
        HoaDon updatedOrderCurrent = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
        return orderConverter.convertEntityToResponse(updatedOrderCurrent);
    }

    public OrderResponse createOrderPending() throws Exception {
        HoaDon newOrderPending = new HoaDon();
        newOrderPending.setMa(hoaDonRepository.getMaxEntityCodeByClass());
        newOrderPending.setCreatedAt(new Date());
        newOrderPending.setTrangThai(OrderStatus.PENDING_PAYMENT);
        newOrderPending.setLoaiHoaDon(OrderType.AT_COUNTER);
        newOrderPending.setTongTien(new BigDecimal(0));

        GioHang cart = new GioHang();
        cart.setMa(gioHangRepository.getMaxEntityCodeByClass());
        GioHang createdCart = gioHangRepository.save(cart);
        newOrderPending.setCart(createdCart);
        HoaDon createdOrderPending = hoaDonRepository.save(newOrderPending);

        LichSuHoaDon orderHistory = new LichSuHoaDon();
        orderHistory.setHoaDon(createdOrderPending);
        orderHistory.setCreatedAt(new Date());
        orderHistory.setThaoTac("Tạo Đơn Hàng");
        orderHistory.setMoTa("Nhân viên tạo đơn cho khách");
        orderHistory.setLoaiThaoTac(0);
        lichSuHoaDonRepository.save(orderHistory);
        return orderConverter.convertEntityToResponse(createdOrderPending);
    }

    public OrderResponse updateOrPaymentOrderPending(OrderRequest req, String id) throws Exception {
//        OrderResponse orderCurrent = getOrderPendingById(id);
        OrderResponse orderCurrent = new OrderResponse();
        if (orderCurrent == null) {
            throw new RestApiException("Đơn hàng không tồn tại!");
        }

        if (req.getIsPayment()) {
            orderCurrent.setCart(null);
            orderCurrent.setTrangThai(req.getTrangThai());
            orderCurrent.setTongTien(req.getTongTien());
            orderCurrent.setTongTienSauKhiGiam(req.getTongTienSauKhiGiam());
            orderCurrent.setTienKhachTra(req.getTienKhachTra());
            orderCurrent.setTienThua(req.getTienThua());
            orderCurrent.setLoaiHoaDon(req.getLoaiHoaDon());
            orderCurrent.setPhiShip(req.getPhiShip());
            orderCurrent.setTenNguoiNhan(req.getTenNguoiNhan());
            orderCurrent.setSoDienThoaiNguoiNhan(req.getSoDienThoaiNguoiNhan());
            orderCurrent.setDiaChiNguoiNhan(req.getDiaChiNguoiNhan());

            HinhThucThanhToan hinhThucThanhToan = new HinhThucThanhToan();
            hinhThucThanhToan.setMa(hinhThucThanhToanRepository.getMaxEntityCodeByClass());
            hinhThucThanhToan.setHoaDon(orderConverter.convertResponseToEntity(orderCurrent));
            hinhThucThanhToan.setSoTienThanhToan(req.getTienKhachTra());
            hinhThucThanhToan.setLoaiThanhToan(0);
            hinhThucThanhToan.setHinhThucThanhToan(1);
            hinhThucThanhToan.setTrangThai(1);
            hinhThucThanhToan.setCreatedAt(new Date());
            hinhThucThanhToan.setNguoiXacNhan("Admin");
            hinhThucThanhToanRepository.save(hinhThucThanhToan);

            HoaDon paymentOrder = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
            gioHangService.deleteById(req.getCart().getId());

            if (req.getCart() != null) {
                System.out.println(req.getCart().getCartItems().size());
                CartRequest cartRequest = req.getCart();
                List<HoaDonChiTiet> orderItems = new ArrayList<>();
                for (CartItemResponse cartItem : cartRequest.getCartItems()) {
                    HoaDonChiTiet orderItem = new HoaDonChiTiet();
                    orderItem.setHoaDon(paymentOrder);
                    orderItem.setDonGia(cartItem.getDonGia());
                    orderItem.setSoLuong(cartItem.getSoLuong());
                    orderItem.setSanPhamChiTiet(productItemConverter.convertResponseToEntity(cartItem.getSanPhamChiTiet()));
                    orderItems.add(orderItem);
                }
                orderItemRepository.saveAll(orderItems);
            }
            if (req.getOrderHistory() != null) {
                orderHistoryServiceImpl.save(req.getOrderHistory());
            }

            List<HoaDon> ordersPending = hoaDonRepository.getOrdersPending();
            if (ordersPending.isEmpty()) {
                createOrderPending();
            }
            return orderConverter.convertEntityToResponse(paymentOrder);

        } else if (req.getIsUpdateInfo()) {
            orderCurrent.setLoaiHoaDon(req.getLoaiHoaDon());
            orderCurrent.setTenNguoiNhan(req.getTenNguoiNhan());
            orderCurrent.setSoDienThoaiNguoiNhan(req.getSoDienThoaiNguoiNhan());
            orderCurrent.setDiaChiNguoiNhan(req.getDiaChiNguoiNhan());
            if (req.getAccount().getId() != null) {
                orderCurrent.setAccount(accountConverter.convertRequestToResponse(req.getAccount()));
            } else {
                orderCurrent.setAccount(null);
            }
            HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
            return orderConverter.convertEntityToResponse(updateOrderPending);

        } else if (req.getIsUpdateVoucher()) {
            if (req.getVoucher().getId() == null) {
                orderCurrent.setVoucher(null);
            } else {
                orderCurrent.setVoucher(voucherConverter.convertRequestToResponse(req.getVoucher()));
            }

            HoaDon updateOrderPending = hoaDonRepository.save(orderConverter.convertResponseToEntity(orderCurrent));
            return orderConverter.convertEntityToResponse(updateOrderPending);
        }
        return orderCurrent;

    }
}
