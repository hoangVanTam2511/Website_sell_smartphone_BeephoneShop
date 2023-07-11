package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.DongSanPham;
import beephone_shop_projects.repository.IDongSanPhamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface DongSanPhamRepository extends IDongSanPhamRepository {
    Page<DongSanPham> findAll(Pageable pageable);
}
