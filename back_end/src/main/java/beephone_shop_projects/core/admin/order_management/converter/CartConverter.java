package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.dto.CartDto;
import beephone_shop_projects.core.admin.order_management.model.request.CartRequest;
import beephone_shop_projects.entity.GioHang;
import org.springframework.stereotype.Component;

@Component
public class CartConverter extends AbstractConverter<CartDto, GioHang, CartRequest> {
}
