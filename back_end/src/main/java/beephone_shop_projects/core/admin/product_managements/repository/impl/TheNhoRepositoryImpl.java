package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.order_management.repository.impl.OrderRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.repository.TheNhoRepository;
import beephone_shop_projects.entity.TheNho;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class TheNhoRepositoryImpl extends AbstractRepositoryImpl<TheNho, String> implements TheNhoRepository {

    private static final Logger logger = LoggerFactory.getLogger(OrderRepositoryImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<TheNho> findAllTheNho(Pageable pageable, FindFilterProductsRequest findFilterProductsRequest) {
        return null;
    }
}
