package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.RamRepository;
import beephone_shop_projects.entity.Ram;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class RamRepositoryImpl extends AbstractRepositoryImpl<Ram, String> implements RamRepository {

    @Override
    public Page<Ram> findAllRam() {
        return null;
    }
}
