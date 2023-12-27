package beephone_shop_projects.core.admin.product_managements.controller;

import beephone_shop_projects.core.admin.product_managements.model.response.ImageResponse;
import beephone_shop_projects.core.admin.product_managements.service.impl.ImageServiceImpl;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.infrastructure.constant.ApiConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.ApiSystems.API_IMAGE_URI)
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @Autowired
    private ImageServiceImpl imageService;


    @GetMapping
    public ResponseObject<List<ImageResponse>> getMauSac() {
        List<ImageResponse> img = imageService.findAll();
        return new ResponseObject<>(img);
    }

//    @PostMapping
//    public ResponseObject uploadImage(@RequestParam("file") MultipartFile file, String id) throws Exception {
//        return new ResponseObject(imageService.uploadImage(file, id));
//    }

}
