package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductResponse;

import java.util.List;

public interface ProductItemService extends GenericService<ProductItemConfigurationResponse, ProductItemConfigurationRequest, String> {
  List<ProductItemConfigurationResponse> createProductItemConfiguration(ProductItemConfigurationsRequest req) throws Exception;
}
