package beephone_shop_projects.core.admin.promotion_management.controller;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.ChangeStatusPromotionRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiService;
import beephone_shop_projects.core.common.base.ResponseObject;
import beephone_shop_projects.core.common.base.ResponsePage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/khuyen-mai/")
@CrossOrigin("*")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping("hien-thi")
    public ResponsePage hienThiKhuyenMai(@ModelAttribute FindKhuyenMaiRequest request) {
        return new ResponsePage( khuyenMaiService.getAll(request));
    }

    @PostMapping("add-khuyen-mai")
    public ResponseObject addKhuyenMai(@RequestBody CreateKhuyenMaiRequest request) {
        return new ResponseObject(khuyenMaiService.addKhuyenMai(request));
    }

    @PutMapping("update-khuyen-mai/{id}")
    public ResponseObject updateKhuyenMai(@RequestBody UpdateKhuyenMaiRequest request,
                                          @PathVariable("id") String id) {
        return new ResponseObject(khuyenMaiService.updateKhuyenMai(request, id));
    }

    @DeleteMapping("delete-khuyen-mai/{id}")
    public ResponseObject deleteKhuyenMai(@PathVariable("id") String id) {
        return new ResponseObject(khuyenMaiService.deleteKhuyenMai(id));
    }

    @GetMapping("get-by-id/{id}")
    public ResponseObject getOneKhuyenMai(@PathVariable("id") String id) {
        return new ResponseObject(khuyenMaiService.getOne(id));
    }

    @PutMapping("doi-trang-thai/{id}")
    public ResponseObject doiTrangThai(@PathVariable("id") String id,@RequestBody ChangeStatusPromotionRequest request){
        return new ResponseObject(khuyenMaiService.doiTrangThai(request, id));
    }

    @PutMapping("/kich-hoat-promotion/{id}")
    public ResponseObject kichHoatKhuyenMai(@PathVariable("id") String id) {
        return new ResponseObject(khuyenMaiService.kichHoatKhuyenMai(id));
    }

}
