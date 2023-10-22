package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.PinRepository;
import beephone_shop_projects.entity.Pin;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class PinRepositoryImpl extends AbstractRepositoryImpl<Pin, String> implements PinRepository {

    @Override
    public Page<Pin> findAllPin() {
        return null;
    }
}
