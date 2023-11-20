package beephone_shop_projects.core.admin.order_management.converter;

import beephone_shop_projects.core.admin.order_management.model.request.RomRequest;
import beephone_shop_projects.core.admin.order_management.model.response.PaymentMethodResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.RomResponse;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.Rom;
import org.springframework.stereotype.Component;

@Component
public class PaymentConverter extends AbstractConverter<PaymentMethodResponse, HinhThucThanhToan, PaymentMethodResponse> {
}
