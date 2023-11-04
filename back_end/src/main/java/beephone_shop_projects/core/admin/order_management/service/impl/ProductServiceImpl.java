package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.ProductColorConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductImeiConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductItemConfigurationConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductRamConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductRomConverter;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemImeiRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationsResponse;
import beephone_shop_projects.core.admin.order_management.model.response.ProductResponse;
import beephone_shop_projects.core.admin.order_management.repository.impl.ImeiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ProductItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ProductRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.TheSimDienThoaiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.ProductService;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.entity.TheSimDienThoai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl extends AbstractServiceImpl<SanPham, ProductResponse, ProductRequest, String> implements ProductService {

  @Autowired
  private ProductConverter productConverter;

  @Autowired
  private TheSimDienThoaiRepositoryImpl theSimDienThoaiRepository;

  @Autowired
  private ProductRepositoryImpl productRepositoryImpl;

  @Autowired
  private ProductItemConfigurationConverter productItemConverter;
  @Autowired
  private ProductImeiConverter productImeiConverter;

  @Autowired
  private ProductRomConverter productRomConverter;
  @Autowired
  private ProductRamConverter productRamConverter;
  @Autowired
  private ProductColorConverter productColorConverter;

  @Autowired
  private ProductItemRepositoryImpl productItemRepositoryImpl;

  @Autowired
  private ImeiRepositoryImpl imeiRepositoryImpl;

  public ProductServiceImpl(ProductRepositoryImpl repo, ProductConverter converter) {
    super(repo, converter);
  }

  @Override
  public ProductItemConfigurationsResponse createProduct(ProductItemConfigurationsRequest req) throws Exception {
    ProductItemConfigurationsResponse response = new ProductItemConfigurationsResponse();
    if (req.getProduct() != null) {
      ProductRequest getProduct = req.getProduct();
      if (getProduct.getTheNho().getId() == null) {
        getProduct.setTheNho(null);
      }

      ProductResponse createdProduct = this.save(getProduct);
      response.setId(createdProduct.getId());
      response.setMa(createdProduct.getMa());
      response.setTenSanPham(createdProduct.getTenSanPham());

      if (getProduct.getTheSimDienThoais() != null) {
        for (TheSim t : getProduct.getTheSimDienThoais()) {
          TheSimDienThoai theSimDienThoai = new TheSimDienThoai();
          theSimDienThoai.setTheSim(t);
          theSimDienThoai.setSanPham(productConverter.convertResponseToEntity(createdProduct));
          theSimDienThoaiRepository.save(theSimDienThoai);
        }
      }

      if (req.getProductItems() != null) {
        List<ProductItemConfigurationResponse> productItems = new ArrayList<>();
        for (ProductItemConfigurationRequest item : req.getProductItems()) {
          SanPhamChiTiet product = new SanPhamChiTiet();
          product.setSanPham(productConverter.convertResponseToEntity(createdProduct));
          product.setSoLuongTonKho(item.getSoLuongTonKho());
          product.setMa(item.getMa());
          product.setMaCauHinh(item.getId());
          product.setDonGia(item.getDonGia() == null ? new BigDecimal(0) : item.getDonGia());
          product.setMauSac(productColorConverter.convertRequestToEntity(item.getColor()));
          product.setRam(productRamConverter.convertRequestToEntity(item.getRam()));
          product.setRom(productRomConverter.convertRequestToEntity(item.getRom()));
          SanPhamChiTiet createdProductItem = productItemRepositoryImpl.save(product);
          productItems.add(productItemConverter.convertEntityToResponse(createdProductItem));

          if (item.getImeis() != null) {
            for (ProductItemImeiRequest imei : item.getImeis()) {
              Imei productImei = new Imei();
              productImei.setSoImei(imei.getImei());
              productImei.setCreatedAt(imei.getCreatedAt());
              productImei.setSanPhamChiTiet(createdProductItem);
              imeiRepositoryImpl.save(productImei);
            }
          }
        }
        response.setProductItems(productItems);
      }
    }

    return response;
  }
}
