package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamChiTietKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamChiTietSauKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamKhuyenMaiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SanPhamChiTietKhuyenMaiService {

    List<SanPhamChiTietKhuyenMaiResponse> getAllSanPhamChiTietKhuyenMai(String id, Boolean check);

    List<SanPhamChiTietKhuyenMaiResponse> removeALL();

    List<SanPhamChiTietSauKhuyenMaiResponse> getOne(String id);

}
