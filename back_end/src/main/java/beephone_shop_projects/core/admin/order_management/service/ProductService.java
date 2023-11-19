package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductResponse;

public interface ProductService extends GenericService<ProductResponse, ProductRequest, String> {
  ProductCustomResponse createProduct(ProductItemConfigurationsRequest req) throws Exception;
}
