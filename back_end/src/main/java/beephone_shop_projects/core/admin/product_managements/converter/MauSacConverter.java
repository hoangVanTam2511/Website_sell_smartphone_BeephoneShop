package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.entity.MauSac;
import org.springframework.stereotype.Component;

@Component
public class MauSacConverter extends AbstractConverter<MauSacResponse, MauSac, MauSacRequest> {
}
