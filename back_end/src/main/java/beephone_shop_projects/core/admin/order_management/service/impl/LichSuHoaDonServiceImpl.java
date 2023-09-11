package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.OrderHistoryConverter;
import beephone_shop_projects.core.admin.order_management.dto.OrderHistoryDto;
import beephone_shop_projects.core.admin.order_management.repository.LichSuHoaDonRepository;
import beephone_shop_projects.core.admin.order_management.service.LichSuHoaDonService;
import beephone_shop_projects.entity.LichSuHoaDon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LichSuHoaDonServiceImpl extends AbstractServiceImpl<LichSuHoaDon, OrderHistoryDto, String> implements LichSuHoaDonService {

  @Autowired
  private LichSuHoaDonRepository lichSuHoaDonRepository;

  @Autowired
  private OrderHistoryConverter orderHistoryConverter;

  public LichSuHoaDonServiceImpl(LichSuHoaDonRepository repo, OrderHistoryConverter converter) {
    super(repo, converter);
  }

  @Override
  public List<OrderHistoryDto> getOrderHistoriesByOrderId(String id) {
    List<LichSuHoaDon> orderHistories = lichSuHoaDonRepository.getOrderHistoriesByOrderId(id);
    return orderHistoryConverter.convertToListDto(orderHistories);
  }
}
