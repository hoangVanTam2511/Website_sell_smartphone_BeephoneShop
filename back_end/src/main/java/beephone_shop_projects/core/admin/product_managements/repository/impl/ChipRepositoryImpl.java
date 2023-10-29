package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.ChipRepository;
import beephone_shop_projects.entity.Chip;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class ChipRepositoryImpl extends AbstractRepositoryImpl<Chip, String> implements ChipRepository {

    @Override
    public Page<Chip> findAllChip() {
        return null;
    }
}
