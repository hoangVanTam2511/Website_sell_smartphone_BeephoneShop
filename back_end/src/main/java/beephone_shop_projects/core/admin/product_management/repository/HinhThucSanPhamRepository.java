package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.repository.IHinhThucSanPhamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HinhThucSanPhamRepository extends IHinhThucSanPhamRepository {
    Page<HinhThucSanPham> findAll(Pageable pageable);
}
