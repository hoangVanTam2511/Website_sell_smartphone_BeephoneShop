package beephone_shop_projects.core.admin.promotion_management.controller;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.KhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.CreateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.model.request.UpdateKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.service.KhuyenMaiService;
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
    public ResponseEntity hienThiKhuyenMai(@ModelAttribute FindKhuyenMaiRequest request) {
        return new ResponseEntity( khuyenMaiService.getAll(request), HttpStatus.OK);
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

    @GetMapping("get-by-id/{id}")
    public ResponseEntity getOneKhuyenMai(@PathVariable("id") String id) {
        return new ResponseEntity(khuyenMaiService.getOne(id), HttpStatus.OK);
    }

    @PutMapping("doi-trang-thai/{id}")
    public ResponseEntity doiTrangThai(@PathVariable("id") String id){
        return new ResponseEntity(khuyenMaiService.doiTrangThai(id),HttpStatus.OK);
    }

}
