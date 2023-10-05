package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SanPhamChiTietKhuyenMaiService {

    List<SanPhamChiTietKhuyenMaiResponseCustom> getAllSanPhamChiTietKhuyenMai(String id, Boolean check);

    List<SanPhamChiTietKhuyenMaiResponse> removeALL();

    List<SanPhamChiTietSauKhuyenMaiResponse> getOne(String id);

    List<KhuyenMaiChiTietResponse> getListKhuyenMai(String id);

}
