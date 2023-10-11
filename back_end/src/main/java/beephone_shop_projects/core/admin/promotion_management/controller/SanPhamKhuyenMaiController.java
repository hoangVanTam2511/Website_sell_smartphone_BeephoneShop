package beephone_shop_projects.core.admin.promotion_management.controller;

import beephone_shop_projects.core.admin.promotion_management.service.SanPhamChiTietKhuyenMaiService;
import beephone_shop_projects.core.admin.promotion_management.service.SanPhamKhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class SanPhamKhuyenMaiController {

    @Autowired
    private SanPhamKhuyenMaiService sanPhamKhuyenMaiService;

    @Autowired
    private SanPhamChiTietKhuyenMaiService sanPhamChiTietKhuyenMaiService;

    @GetMapping("/san-pham-1")
    public ResponseEntity hienThiSanPham(){
        return new ResponseEntity(sanPhamKhuyenMaiService.getAllSanPham(), HttpStatus.OK);
    }

    @GetMapping("/san-pham-chi-tiet-1/{id}/{check}")
    public ResponseEntity hienThiSanPhamChiTiet(@PathVariable("id") String id,@PathVariable("check") Boolean check){
        return new ResponseEntity(sanPhamChiTietKhuyenMaiService.getAllSanPhamChiTietKhuyenMai(id, check), HttpStatus.OK);
    }

    @GetMapping("/san-pham-chi-tiet/removeALL")
    public ResponseEntity removeAll(){
        return new ResponseEntity(sanPhamChiTietKhuyenMaiService.removeALL(), HttpStatus.OK);
    }

    @GetMapping("/san-pham-chi-tiet-khuyen-mai/detail/{id}")
    public ResponseEntity detailSanPhamChiTietKhuyenMai(@PathVariable("id") String id){
        return new ResponseEntity(sanPhamChiTietKhuyenMaiService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/chi-tiet-khuyen-mai/detail/{id}")
    public ResponseEntity detailChiTietKhuyenMai(@PathVariable("id") String id){
        return new ResponseEntity(sanPhamChiTietKhuyenMaiService.getListKhuyenMai(id), HttpStatus.OK);
    }

    @GetMapping("/detail/khuyen-mai/{id}")
    public ResponseEntity detailKhuyenMai(@PathVariable("id") String id){
        return new ResponseEntity(sanPhamChiTietKhuyenMaiService.getDetailKhuyenMai(id), HttpStatus.OK);
    }

}
