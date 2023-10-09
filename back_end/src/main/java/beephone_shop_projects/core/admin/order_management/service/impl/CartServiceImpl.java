package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.CartConverter;
import beephone_shop_projects.core.admin.order_management.model.request.CartRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartResponse;
import beephone_shop_projects.core.admin.order_management.repository.impl.CartRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.CartService;
import beephone_shop_projects.entity.GioHang;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl extends AbstractServiceImpl<GioHang, CartResponse, CartRequest, String> implements CartService {

  public CartServiceImpl(CartRepositoryImpl repo, CartConverter converter) {
    super(repo, converter);
  }

}
