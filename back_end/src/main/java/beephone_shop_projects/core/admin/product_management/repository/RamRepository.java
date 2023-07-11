package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.repository.IRamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RamRepository extends IRamRepository {
    Page<Ram> findAll(Pageable pageable);
}
