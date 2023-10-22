package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.CameraTruocRepository;
import beephone_shop_projects.entity.CameraTruoc;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class CameraTruocRepositoryImpl extends AbstractRepositoryImpl<CameraTruoc, String> implements CameraTruocRepository {

    @Override
    public Page<CameraTruoc> findAllCameraTruoc() {
        return null;
    }
}
