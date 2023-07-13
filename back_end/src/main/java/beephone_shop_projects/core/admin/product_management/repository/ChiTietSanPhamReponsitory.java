package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.ChiTietSanPham;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.repository.IChiTietSanPhamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietSanPhamReponsitory extends IChiTietSanPhamRepository {

    Page<ChiTietSanPham> findAll(Pageable pageable);
}
