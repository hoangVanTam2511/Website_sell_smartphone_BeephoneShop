package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.dto.CartDto;
import beephone_shop_projects.core.admin.order_management.dto.OrderDto;
import beephone_shop_projects.core.admin.order_management.service.GioHangService;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.HoaDon;
import org.springframework.stereotype.Component;

@Component
public class CartConverter extends AbstractConverter<CartDto, GioHang> {
}
