package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.OrderConverter;
import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
import beephone_shop_projects.core.admin.order_management.dto.SearchFilterOrderDto;
import beephone_shop_projects.core.admin.order_management.dto.UpdateOrderDto;
import beephone_shop_projects.core.admin.order_management.repository.HoaDonRepository;
import beephone_shop_projects.core.admin.order_management.repository.LichSuHoaDonRepository;
import beephone_shop_projects.core.admin.order_management.service.HoaDonService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.HoaDon;
import beephone_shop_projects.entity.LichSuHoaDon;
import beephone_shop_projects.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class HoaDonServiceImpl extends AbstractServiceImpl<HoaDon, OrderDto, String> implements HoaDonService {

  @Autowired
  private HoaDonRepository hoaDonRepository;

  @Autowired
  private LichSuHoaDonRepository lichSuHoaDonRepository;

  @Autowired
  private OrderConverter orderConverter;

  public HoaDonServiceImpl(HoaDonRepository repo, OrderConverter converter) {
    super(repo, converter);
  }

  @Override
  public OrderDto getOrderDetailsById(String id) {
    HoaDon order = hoaDonRepository.getOrderDetailsById(id);
    OrderDto dto = orderConverter.convertToDto(order);
    return dto;
  }

  @Override
  public OrderDto placeOrder(Account account, Voucher voucher) {
    HoaDon newOrder = new HoaDon();
    newOrder.setMa(this.getCode());
    newOrder.setAccount(null);
    newOrder.setVoucher(null);
    newOrder.setLoaiHoaDon(1);
    newOrder.setGhiChu("Ok");
    newOrder.setDiaChiNguoiNhan("Thanh Xuân, Hà Nội");
    newOrder.setSoDienThoaiNguoiNhan("08345738123");
    newOrder.setTenNguoiNhan("Nguyễn Hữu Tùng");
    newOrder.setTrangThai(0);
    newOrder.setCreatedAt(new Date());
    newOrder.setTongTien(new BigDecimal(30000000));
    HoaDon createdOrder = hoaDonRepository.save(newOrder);
    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setHoaDon(createdOrder);
    orderHistory.setCreatedAt(new Date());
    orderHistory.setThaoTac("Tạo Đơn Hàng");
    orderHistory.setMoTa("Khách hàng đặt hàng online");
    orderHistory.setLoaiThaoTac(0);
    lichSuHoaDonRepository.save(orderHistory);
    return orderConverter.convertToDto(createdOrder);
  }

  @Override
  public Page<OrderDto> findOrdersByMultipleCriteriaWithPagination(SearchFilterOrderDto searchFilter) {
    Pageable pageable = PageRequest.of(searchFilter.getCurrentPage() - 1, searchFilter.getPageSize(), Sort.by("createdAt").descending());
    Page<HoaDon> pageOrder = hoaDonRepository.findOrdersByMultipleCriteriaWithPagination(pageable, searchFilter);
    return orderConverter.convertToPageDto(pageOrder);
  }

  @Override
  public OrderDto updateOrder(UpdateOrderDto updateOrderDto, OrderDto orderDto) {
    orderDto.setTrangThai(updateOrderDto.getOrderStatus());
    OrderDto updatedOrderDto = this.update(orderDto);
    LichSuHoaDon orderHistory = new LichSuHoaDon();
    orderHistory.setCreatedAt(updateOrderDto.getOrderHistory().getCreatedAt());
    orderHistory.setMoTa(updateOrderDto.getOrderHistory().getMoTa());
    orderHistory.setThaoTac(updateOrderDto.getOrderHistory().getThaoTac());
    orderHistory.setLoaiThaoTac(updateOrderDto.getOrderHistory().getLoaiThaoTac());
    orderHistory.setHoaDon(orderConverter.convertToEntity(updatedOrderDto));
    lichSuHoaDonRepository.save(orderHistory);
    return updatedOrderDto;
  }

}
