package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_management.repository.ProductDetailRepository;
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
  private ProductDetailRepository productItemRepository;

  @Override
  public void uploadImage(MultipartFile[] files) throws Exception {
    Arrays.stream(files)
            .parallel()
            .forEach(file -> {
              List<SanPhamChiTiet> products = productItemRepository.getProducts();
              products.parallelStream()
                      .filter(item -> item.getMa().equals(file.getOriginalFilename()))
                      .forEach(item -> {
                        System.out.println(file.getOriginalFilename());
                        String responseUrl = cloudinaryUtils.uploadImage(file, RandomCodeGenerator.generateRandomCode());
                        Image image = new Image();
                        image.setPath(responseUrl);
                        image.setMa(RandomCodeGenerator.generateRandomCode());
                        image.setStatus(1);
                        Image createdImage = null;
                        try {
                          createdImage = imageRepository.save(image);
                        } catch (Exception e) {
                          throw new RuntimeException(e);
                        }
                        item.setImage(createdImage);
                        productItemRepository.save(item);
                      });
            });
}
}
