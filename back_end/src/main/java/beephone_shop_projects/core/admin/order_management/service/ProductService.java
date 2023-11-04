package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationsResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductResponse;

public interface ProductService extends GenericService<ProductResponse, ProductRequest, String> {
  ProductItemConfigurationsResponse createProduct(ProductItemConfigurationsRequest req) throws Exception;
}
