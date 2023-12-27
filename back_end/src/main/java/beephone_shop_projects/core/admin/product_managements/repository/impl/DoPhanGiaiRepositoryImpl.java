package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.DoPhanGiaiRepository;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class DoPhanGiaiRepositoryImpl  extends AbstractRepositoryImpl<DoPhanGiaiManHinh, String> implements DoPhanGiaiRepository {
    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);
}
