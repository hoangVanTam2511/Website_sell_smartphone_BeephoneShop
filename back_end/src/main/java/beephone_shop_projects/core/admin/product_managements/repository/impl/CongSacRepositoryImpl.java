package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.CongSacRepository;
import beephone_shop_projects.entity.CongSac;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class CongSacRepositoryImpl extends AbstractRepositoryImpl<CongSac, String> implements CongSacRepository {

    @Override
    public Page<CongSac> findAllCongSac() {
        return null;
    }
}
