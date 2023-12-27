package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.ImageRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ImageResponse;
import beephone_shop_projects.entity.Image;
import beephone_shop_projects.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService extends GenericService<ImageResponse, ImageRequest, String> {

    void uploadImage(MultipartFile[] files, String ma) throws Exception;
//
//    //Hiển thị ảnh trong hire design
//    OhdlImageEventResponse getImageById(String id);
//
//    //Delete images
//    boolean delete(String id);
}
