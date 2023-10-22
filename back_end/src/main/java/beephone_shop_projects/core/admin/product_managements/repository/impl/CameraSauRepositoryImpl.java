package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.CameraSauRepository;
import beephone_shop_projects.entity.CameraSau;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class CameraSauRepositoryImpl extends AbstractRepositoryImpl<CameraSau, String> implements CameraSauRepository {

    @Override
    public Page<CameraSau> findAllCameraSau() {
        return null;
    }
}
