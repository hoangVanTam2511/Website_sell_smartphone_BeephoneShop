package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.ProductColorConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductImeiConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductItemConfigurationConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductItemConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductRamConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductRomConverter;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemImeiRequest;
import beephone_shop_projects.core.admin.order_management.model.response.ProductItemConfigurationResponse;
import beephone_shop_projects.core.admin.order_management.repository.impl.ImeiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ProductItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.ProductItemService;
import beephone_shop_projects.core.admin.product_managements.repository.impl.ImageRepositoryImpl;
import beephone_shop_projects.entity.Image;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.utils.CloudinaryUtils;
import beephone_shop_projects.utils.RandomCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductItemServiceImpl extends AbstractServiceImpl<SanPhamChiTiet, ProductItemConfigurationResponse, ProductItemConfigurationRequest, String> implements ProductItemService {

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

  @Autowired
  private CloudinaryUtils cloudinaryUtils;

  @Autowired
  private ImageRepositoryImpl imageRepository;

  public ProductItemServiceImpl(ProductItemRepositoryImpl repo, ProductItemConverter converter) {
    super(repo, converter);
  }

  @Override
  public List<ProductItemConfigurationResponse> createProductItemConfiguration(ProductItemConfigurationsRequest reqs) throws Exception {
    List<ProductItemConfigurationResponse> response = new ArrayList<>();
    for (ProductItemConfigurationRequest req : reqs.getProductItems()) {
      SanPhamChiTiet product = new SanPhamChiTiet();
      product.setSoLuongTonKho(req.getSoLuongTonKho());
      product.setMa(req.getMa());
      product.setMaCauHinh(req.getId());
      product.setDonGia(req.getDonGia());
      product.setMauSac(productColorConverter.convertRequestToEntity(req.getColor()));
      product.setRam(productRamConverter.convertRequestToEntity(req.getRam()));
      product.setRom(productRomConverter.convertRequestToEntity(req.getRom()));

      SanPhamChiTiet createdProductItem = productItemRepositoryImpl.save(product);
      response.add(productItemConverter.convertEntityToResponse(createdProductItem));

      if (req.getImeis() != null) {
        for (ProductItemImeiRequest imei : req.getImeis()) {
          Imei productImei = new Imei();
          productImei.setSoImei(imei.getImei());
          productImei.setCreatedAt(imei.getCreatedAt());
          productImei.setSanPhamChiTiet(createdProductItem);
          imeiRepositoryImpl.save(productImei);
        }
      }

    }
    return response;
  }
}
