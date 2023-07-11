package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.NhaSanXuat;
import beephone_shop_projects.repository.INhaSanXuatRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaSanXuatRepository extends INhaSanXuatRepository {
    Page<NhaSanXuat> findAll(Pageable pageable);
}
