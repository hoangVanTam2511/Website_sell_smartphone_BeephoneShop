package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.repository.IChipRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChipRepository extends IChipRepository {

    Page<Chip> findAll(Pageable pageable);
}
