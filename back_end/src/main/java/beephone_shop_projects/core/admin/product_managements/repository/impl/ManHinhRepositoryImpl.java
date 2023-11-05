package beephone_shop_projects.core.admin.product_managements.repository.impl;


import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.ManHinhRepository;
import beephone_shop_projects.entity.ManHinh;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class ManHinhRepositoryImpl extends AbstractRepositoryImpl<ManHinh, String> implements ManHinhRepository {
    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);
}
