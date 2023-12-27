package beephone_shop_projects.core.admin.order_management.service;

import beephone_shop_projects.core.admin.order_management.model.request.ImeisRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterProductDto;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ImeiResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductsItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductsResponse;
import beephone_shop_projects.core.common.base.ResponsePage;
import com.google.zxing.WriterException;

import java.io.IOException;

public interface ProductService extends GenericService<ProductResponse, ProductRequest, String> {
  ProductCustomResponse createProduct(ProductItemConfigurationsRequest req) throws Exception;

  ResponsePage<ProductsResponse> findAllProducts(SearchFilterProductDto searchFilter);

  ProductsItemResponse updateProduct(ProductItemRequest req);

  void addImeiProduct(ImeisRequest req) throws Exception;
}
