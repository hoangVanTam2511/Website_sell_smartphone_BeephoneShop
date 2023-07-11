package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.repository.IRomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RomRepository extends IRomRepository {
    Page<Rom> findAll(Pageable pageable);
}
