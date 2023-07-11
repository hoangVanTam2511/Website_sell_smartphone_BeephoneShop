package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.repository.ISanPhamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamRepository extends ISanPhamRepository {
    Page<SanPham> findAll(Pageable pageable);
}
