package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.repository.ProductItemCustomRepository;
import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ImageConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ImageRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ImageResponse;
import beephone_shop_projects.core.admin.product_managements.repository.ImageRepository;
import beephone_shop_projects.core.admin.product_managements.service.ImageService;
import beephone_shop_projects.entity.Image;
import beephone_shop_projects.entity.SanPhamChiTiet;
import beephone_shop_projects.utils.CloudinaryUtils;
import beephone_shop_projects.utils.RandomCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
public class ImageServiceImpl extends AbstractServiceImpl<Image, ImageResponse, ImageRequest, String> implements ImageService {

  public ImageServiceImpl(ImageRepository repo, ImageConverter converter) {
    super(repo, converter);
  }

  @Autowired
  private ImageRepository imageRepository;

  @Autowired
  private CloudinaryUtils cloudinaryUtils;

  @Autowired
  private ProductItemCustomRepository productItemRepository;

  @Override
  public void uploadImage(MultipartFile[] files, String ma) throws Exception {
    List<SanPhamChiTiet> products = productItemRepository.getProductsByMa(ma);
    Map<String, SanPhamChiTiet> productMap = new ConcurrentHashMap<>();
    for (SanPhamChiTiet product : products) {
      productMap.put(product.getMa(), product);
    }

    ExecutorService executorService = Executors.newFixedThreadPool(10);

    Arrays.stream(files)
            .parallel()
            .forEach(file -> {
              SanPhamChiTiet product = productMap.get(file.getOriginalFilename());
              if (product != null) {
                CompletableFuture.runAsync(() -> {
                  try {
                    System.out.println(file.getOriginalFilename());
                    String responseUrl = cloudinaryUtils.uploadImage(file, RandomCodeGenerator.generateRandomCode());
                    Image image = new Image();
                    image.setPath(responseUrl);
                    image.setMa(RandomCodeGenerator.generateRandomCode());
                    image.setStatus(1);
                    Image createdImage = imageRepository.save(image);
                    product.setImage(createdImage);
                    productItemRepository.save(product);
                  } catch (Exception e) {
                    throw new RuntimeException(e);
                  }
                }, executorService);
              }
            });

    executorService.shutdown();
    executorService.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
  }
}
