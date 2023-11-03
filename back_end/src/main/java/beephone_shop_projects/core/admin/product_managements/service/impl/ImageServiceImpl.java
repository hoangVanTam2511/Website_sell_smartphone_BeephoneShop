package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ImageConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ImageRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ImageResponse;
import beephone_shop_projects.core.admin.product_managements.repository.ImageRepository;
import beephone_shop_projects.core.admin.product_managements.service.ImageService;
import beephone_shop_projects.entity.Image;
import beephone_shop_projects.utils.CloudinaryUtils;
import beephone_shop_projects.utils.RandomCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageServiceImpl extends AbstractServiceImpl<Image, ImageResponse, ImageRequest, String> implements ImageService {

    public ImageServiceImpl(ImageRepository repo, ImageConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CloudinaryUtils cloudinaryUtils;

    @Override
    public Image uploadImage(MultipartFile file, String id) throws Exception {
        Image image1 = new Image();
        String responseUrl = cloudinaryUtils.uploadImage(file, id);
        image1.setPath(responseUrl);
        image1.setMa(RandomCodeGenerator.generateRandomCode());
        image1.setStatus(1);
        Image image = imageRepository.save(image1);
        return image;
    }
}
