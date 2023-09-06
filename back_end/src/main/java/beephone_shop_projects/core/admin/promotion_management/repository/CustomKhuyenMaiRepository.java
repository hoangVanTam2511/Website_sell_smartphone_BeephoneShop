package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.request.FindKhuyenMaiRequest;
import beephone_shop_projects.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomKhuyenMaiRepository {
    Page<KhuyenMai> findAllKhuyenMai(Pageable pageable, FindKhuyenMaiRequest request);
}
