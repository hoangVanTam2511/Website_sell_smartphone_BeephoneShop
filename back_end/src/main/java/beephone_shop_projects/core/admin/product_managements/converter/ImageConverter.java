package beephone_shop_projects.core.admin.product_managements.converter;

import beephone_shop_projects.core.admin.order_management.converter.AbstractConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ImageRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ImageResponse;
import beephone_shop_projects.entity.Image;
import org.springframework.stereotype.Component;

@Component
public class ImageConverter extends AbstractConverter<ImageResponse, Image, ImageRequest> {
}
