package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.dto.CartDto;
import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.CartRequest;
import beephone_shop_projects.core.admin.order_management.model.response.CartItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.CartResponse;
import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.GioHangChiTiet;
import org.springframework.stereotype.Component;

@Component
public class CartItemConverter extends AbstractConverter<CartItemResponse, GioHangChiTiet, CartItemRequest> {
}
