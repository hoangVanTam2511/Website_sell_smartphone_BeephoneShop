package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.repository.IPinRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PinRepository extends IPinRepository {
    Page<Pin> findAll(Pageable pageable);
}
