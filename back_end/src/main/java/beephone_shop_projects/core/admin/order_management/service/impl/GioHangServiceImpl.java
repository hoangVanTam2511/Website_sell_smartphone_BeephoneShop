package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.CartConverter;
import beephone_shop_projects.core.admin.order_management.dto.CartDto;
import beephone_shop_projects.core.admin.order_management.repository.impl.GioHangRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.GioHangService;
import beephone_shop_projects.entity.GioHang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GioHangServiceImpl extends AbstractServiceImpl<GioHang, CartDto, String> implements GioHangService {

  @Autowired
  private GioHangRepositoryImpl gioHangRepository;

  @Autowired
  private CartConverter cartConverter;

  public GioHangServiceImpl(GioHangRepositoryImpl repo, CartConverter converter) {
    super(repo, converter);
  }

  @Override
  public CartDto getCartByOrderId(String id) {
    GioHang cart = gioHangRepository.getCartByOrderId(id);
    return cartConverter.convertToDto(cart);
  }
}
