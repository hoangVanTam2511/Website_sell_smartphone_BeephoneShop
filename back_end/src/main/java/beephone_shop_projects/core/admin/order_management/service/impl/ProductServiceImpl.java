package beephone_shop_projects.core.admin.order_management.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.ProductColorConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductItemCustomConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductRamConverter;
import beephone_shop_projects.core.admin.order_management.converter.ProductRomConverter;
import beephone_shop_projects.core.admin.order_management.model.request.ImeiRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ImeisRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemConfigurationsRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemCustomRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemImeiRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductItemRequest;
import beephone_shop_projects.core.admin.order_management.model.request.ProductRequest;
import beephone_shop_projects.core.admin.order_management.model.request.SearchFilterProductDto;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductItemCustomResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductsItemResponse;
import beephone_shop_projects.core.admin.order_management.model.response.product_response.ProductsResponse;
import beephone_shop_projects.core.admin.order_management.repository.CameraSauDienThoaiRepository;
import beephone_shop_projects.core.admin.order_management.repository.CameraSauRepository;
import beephone_shop_projects.core.admin.order_management.repository.CameraTruocDienThoaiRepository;
import beephone_shop_projects.core.admin.order_management.repository.CameraTruocRepository;
import beephone_shop_projects.core.admin.order_management.repository.ProductItemCustomRepository;
import beephone_shop_projects.core.admin.order_management.repository.impl.DanhMucDienThoaiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ImeiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ProductItemRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.ProductRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.TheSimDienThoaiRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.service.ProductService;
import beephone_shop_projects.core.common.base.PageableResponse;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.entity.CameraSauDienThoai;
import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.entity.CameraTruocDienThoai;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.entity.DanhMucDienThoai;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.entity.TheSim;
import beephone_shop_projects.entity.TheSimDienThoai;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import beephone_shop_projects.infrastructure.exeption.rest.RestApiException;
import beephone_shop_projects.utils.BarcodeGenerator;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl extends AbstractServiceImpl<SanPham, ProductResponse, ProductRequest, String> implements ProductService {

  @Autowired
  private ProductConverter productConverter;

  @Autowired
  private TheSimDienThoaiRepositoryImpl theSimDienThoaiRepository;

  @Autowired
  private DanhMucDienThoaiRepositoryImpl danhMucDienThoaiRepository;

  @Autowired
  private CameraSauDienThoaiRepository cameraSauDienThoaiRepository;

  @Autowired
  private CameraTruocDienThoaiRepository cameraTruocDienThoaiRepository;

  @Autowired
  private CameraSauRepository cameraSauRepository;

  @Autowired
  private CameraTruocRepository cameraTruocRepository;

  @Autowired
  private ProductRepositoryImpl productRepositoryImpl;

  @Autowired
  private ProductItemCustomConverter productItemConverter;

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
  private ProductItemCustomRepository productItemCustomRepository;

  @Autowired
  private BarcodeGenerator barcodeGenerator;

  public ProductServiceImpl(ProductRepositoryImpl repo, ProductConverter converter) {
    super(repo, converter);
  }

  @Override
  public ProductCustomResponse createProduct(ProductItemConfigurationsRequest req) throws Exception {
    ProductCustomResponse response = new ProductCustomResponse();
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

      if (getProduct.getDanhMucDienThoais() != null) {
        for (DanhMuc d : getProduct.getDanhMucDienThoais()) {
          DanhMucDienThoai danhMucDienThoai = new DanhMucDienThoai();
          danhMucDienThoai.setDanhMuc(d);
          danhMucDienThoai.setSanPham(productConverter.convertResponseToEntity(createdProduct));
          danhMucDienThoaiRepository.save(danhMucDienThoai);
        }
      }

      if (getProduct.getCameraSauDienThoais() != null) {
        for (CameraSauDienThoai c : getProduct.getCameraSauDienThoais()) {
          Optional<CameraSau> findCamera = cameraSauRepository.findById(c.getId());
          if (findCamera.isPresent()) {
            CameraSauDienThoai cameraSauDienThoai = new CameraSauDienThoai();
            cameraSauDienThoai.setCameraSau(findCamera.get());
            cameraSauDienThoai.setIsCameraMain(c.getIsCameraMain());
            cameraSauDienThoai.setSanPham(productConverter.convertResponseToEntity(createdProduct));
            cameraSauDienThoaiRepository.save(cameraSauDienThoai);
          }
        }
      }

      if (getProduct.getCameraTruocDienThoais() != null) {
        for (CameraTruocDienThoai c : getProduct.getCameraTruocDienThoais()) {
          Optional<CameraTruoc> findCamera = cameraTruocRepository.findById(c.getId());
          if (findCamera.isPresent()) {
            CameraTruocDienThoai cameraTruocDienThoai = new CameraTruocDienThoai();
            cameraTruocDienThoai.setCameraTruoc(findCamera.get());
            cameraTruocDienThoai.setIsCameraMain(c.getIsCameraMain());
            cameraTruocDienThoai.setSanPham(productConverter.convertResponseToEntity(createdProduct));
            cameraTruocDienThoaiRepository.save(cameraTruocDienThoai);
          }
        }
      }

      if (req.getProductItems() != null) {
        List<ProductItemCustomResponse> productItems = new ArrayList<>();
        for (ProductItemCustomRequest item : req.getProductItems()) {
          SanPhamChiTiet product = new SanPhamChiTiet();
          product.setSanPham(productConverter.convertResponseToEntity(createdProduct));
          product.setSoLuongTonKho(item.getSoLuongTonKho());
          product.setMa(item.getMa());
          product.setMaCauHinh(item.getId());
          product.setTrangThai(req.getProduct().getTrangThai());
          product.setDonGia(item.getDonGia() == null ? new BigDecimal(0) : item.getDonGia());
          product.setMauSac(productColorConverter.convertRequestToEntity(item.getColor()));
          product.setRam(productRamConverter.convertRequestToEntity(item.getRam()));
          product.setRom(productRomConverter.convertRequestToEntity(item.getRom()));
          SanPhamChiTiet createdProductItem = productItemRepositoryImpl.save(product);
          productItems.add(productItemConverter.convertEntityToResponse(createdProductItem));

          if (item.getImeis() != null) {
            for (ProductItemImeiRequest imei : item.getImeis()) {
              String uri = barcodeGenerator.generateBarcodeImageBase64Url(imei.getImei(), BarcodeFormat.CODE_128);
              Imei productImei = new Imei();
              productImei.setSoImei(imei.getImei());
              productImei.setBarcode(uri);
              productImei.setCreatedAt(imei.getCreatedAt());
              productImei.setSanPhamChiTiet(createdProductItem);
              productImei.setTrangThai(imei.getTrangThai());
              imeiRepositoryImpl.save(productImei);
            }
          }
        }
        response.setProductItems(productItems);
      }
    }

    return response;
  }

  @Override
  public ResponsePage<ProductsResponse> findAllProducts(SearchFilterProductDto searchFilter) {
    if (searchFilter.getKeyword() == null) {
      searchFilter.setKeyword("");
    }
    if (searchFilter.getCurrentPage() == null) {
      searchFilter.setCurrentPage(1);
    }
    if (searchFilter.getPageSize() == null) {
      searchFilter.setPageSize(10);
    }
    Pageable pageable = PageRequest.of(searchFilter.getCurrentPage() - 1, searchFilter.getPageSize());

    Page<SanPham> pageProducts = productRepositoryImpl.findProductByMultipleWithPagination(pageable, searchFilter);
    List<ProductsResponse> data = new ArrayList<>();

    for (SanPham product : pageProducts.getContent()) {
      ProductsResponse productsResponse = new ProductsResponse();
      productsResponse.setId(product.getId());
      productsResponse.setMa(product.getMa());
      productsResponse.setTenSanPham(product.getTenSanPham());
      productsResponse.setOperatingType(product.getOperatingType());
      productsResponse.setHang(product.getHang());
      productsResponse.setTrangThai(product.getTrangThai());

      String urlImage = "";
      int quantityVerison = product.getProductItems().size();
      int quantityImei = 0;

      for (SanPhamChiTiet productItem : product.getProductItems()) {
        for (Imei imei : productItem.getImeis()){
          if (imei.getTrangThai().equals(StatusImei.NOT_SOLD)){
            quantityImei++;
          }
        }
      }

      List<SanPhamChiTiet> findProductItemById = productItemCustomRepository.getProductsById(product.getId());

      for (SanPhamChiTiet productItem : findProductItemById) {
        if (productItem.getImage() != null) {
          urlImage = productItem.getImage().getPath();
        }
      }

      productsResponse.setQuantityInstock(quantityImei);
      productsResponse.setQuantityVersion(quantityVerison);
      productsResponse.setUrlImage(urlImage);

      data.add(productsResponse);

    }

    PageableResponse pageableResponse = new PageableResponse();
    pageableResponse.setCurrentPage(pageable.getPageNumber());
    pageableResponse.setPageSize(pageable.getPageSize());

    ResponsePage<ProductsResponse> pageResponse = new ResponsePage<>();
    pageResponse.setData(data);
    pageResponse.setCode(200);
    pageResponse.setMessage("Success");
    pageResponse.setPageable(pageableResponse);
    pageResponse.setTotalPages(pageProducts.getTotalPages());

    return pageResponse;
  }

  @Override
  public ProductsItemResponse updateProduct(ProductItemRequest req) {
    Optional<SanPhamChiTiet> findProduct = productItemCustomRepository.findById(req.getId());
    ProductsItemResponse response = new ProductsItemResponse();
    if (findProduct.isPresent()) {
      findProduct.get().setTrangThai(req.getTrangThai());
      findProduct.get().setDonGia(req.getDonGia());
      SanPhamChiTiet sanPhamChiTiet = productItemCustomRepository.save(findProduct.get());

      response.setDonGia(sanPhamChiTiet.getDonGia());
      response.setTrangThai(sanPhamChiTiet.getTrangThai());
      response.setId(sanPhamChiTiet.getId());
    } else {
      throw new RestApiException("Không tìm thấy sản phẩm này!");
    }
    return response;
  }

  @Override
  public void addImeiProduct(ImeisRequest req) throws Exception {
    Optional<SanPhamChiTiet> findProduct = productItemCustomRepository.findProductById(req.getId());
    if (findProduct.isPresent()) {
      for (ImeiRequest imeiRequest : req.getImeis()) {
        Imei imei = new Imei();
        imei.setSoImei(imeiRequest.getImei());
        imei.setTrangThai(StatusImei.NOT_SOLD);
        String uri = barcodeGenerator.generateBarcodeImageBase64Url(imei.getSoImei(), BarcodeFormat.CODE_128);
        imei.setBarcode(uri);
        imei.setSanPhamChiTiet(findProduct.get());
        imeiRepositoryImpl.save(imei);
      }
    }

  }
}
