package beephone_shop_projects.core.admin.promotion_management.controller;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/khuyen-mai/")
@CrossOrigin("*")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping("hien-thi")
    public Page<KhuyenMaiResponse> hienThiKhuyenMai(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return khuyenMaiService.getAll(pageable);
    }

    @PostMapping("add-khuyen-mai")
    public ResponseEntity addKhuyenMai(@RequestBody CreateKhuyenMaiRequest request) {
        return new ResponseEntity(khuyenMaiService.addKhuyenMai(request), HttpStatus.CREATED);
    }

    @PutMapping("update-khuyen-mai/{id}")
    public ResponseEntity updateKhuyenMai(@RequestBody UpdateKhuyenMaiRequest request,
                                          @PathVariable("id") String id) {
        return new ResponseEntity(khuyenMaiService.updateKhuyenMai(request, id), HttpStatus.OK);
    }

    @DeleteMapping("delete-khuyen-mai/{id}")
    public ResponseEntity deleteKhuyenMai(@PathVariable("id") String id) {
        return new ResponseEntity(khuyenMaiService.deleteVoucher(id), HttpStatus.OK);
    }

    @GetMapping("get-by-id/{ma}")
    public ResponseEntity getOneKhuyenMai(@PathVariable("ma") String ma) {
        return new ResponseEntity(khuyenMaiService.getOne(ma), HttpStatus.OK);
    }

}
