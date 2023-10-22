package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.RomRepository;
import beephone_shop_projects.entity.Rom;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class RomRepositoryImpl extends AbstractRepositoryImpl<Rom, String> implements RomRepository {

    @Override
    public Page<Rom> findAllRom() {
        return null;
    }
}
