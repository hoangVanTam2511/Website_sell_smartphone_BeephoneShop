package beephone_shop_projects.core.admin.promotion_management.controller;

import beephone_shop_projects.core.admin.promotion_management.model.request.FindSanPhamKhuyenMaiRequest;
import beephone_shop_projects.core.admin.promotion_management.service.SanPhamChiTietKhuyenMaiService;
import beephone_shop_projects.core.admin.promotion_management.service.SanPhamKhuyenMaiService;
import beephone_shop_projects.core.common.base.ResponseObject;
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
    public ResponseObject hienThiSanPham(final FindSanPhamKhuyenMaiRequest request){
        return new ResponseObject(sanPhamKhuyenMaiService.getAllSanPham(request));
    }

    @GetMapping("/san-pham-chi-tiet-1/{id}/{check}")
    public ResponseObject hienThiSanPhamChiTiet(@PathVariable("id") String id,@PathVariable("check") Boolean check){
        return new ResponseObject(sanPhamChiTietKhuyenMaiService.getAllSanPhamChiTietKhuyenMai(id, check));
    }

    @GetMapping("/san-pham-chi-tiet/removeALL")
    public ResponseObject removeAll(){
        return new ResponseObject(sanPhamChiTietKhuyenMaiService.removeALL());
    }

    @GetMapping("/san-pham-chi-tiet-khuyen-mai/detail/{id}")
    public ResponseObject detailSanPhamChiTietKhuyenMai(@PathVariable("id") String id){
        return new ResponseObject(sanPhamChiTietKhuyenMaiService.getOne(id));
    }

    @GetMapping("/chi-tiet-khuyen-mai/detail/{id}")
    public ResponseObject detailChiTietKhuyenMai(@PathVariable("id") String id){
        return new ResponseObject(sanPhamChiTietKhuyenMaiService.getListKhuyenMai(id));
    }

    @GetMapping("/detail/khuyen-mai/{id}")
    public ResponseObject detailKhuyenMai(@PathVariable("id") String id){
        return new ResponseObject(sanPhamChiTietKhuyenMaiService.getDetailKhuyenMai(id));
    }

    @GetMapping("/size/khuyen-mai-chi-tiet/{id}")
    public Integer size(@PathVariable("id") String id){
        return sanPhamChiTietKhuyenMaiService.getSize(id);
    }

}
