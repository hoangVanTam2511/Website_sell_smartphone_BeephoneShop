package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.RomRepository;
import beephone_shop_projects.entity.Rom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class RomRepositoryImpl extends AbstractRepositoryImpl<Rom, String> implements RomRepository {
    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);
    @Override
    public Page<Rom> findAllRom() {
        return null;
    }
}
