package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterProductDto;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductsResponse;
import beephone_shop_projects.core.common.base.ResponsePage;

public interface ProductService extends GenericService<ProductResponse, ProductRequest, String> {
  ProductCustomResponse createProduct(ProductItemConfigurationsRequest req) throws Exception;

  ResponsePage<ProductsResponse> findAllProducts(SearchFilterProductDto searchFilter);
}
