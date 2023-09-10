package beephone_shop_projects.core.admin.promotion_management.service;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamKhuyenMaiResponse;
import beephone_shop_projects.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SanPhamKhuyenMaiService {
    List<SanPhamKhuyenMaiResponse> getAllSanPham();
}
