package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.MauSacRepository;
import beephone_shop_projects.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class MauSacRepositoryImpl extends AbstractRepositoryImpl<MauSac, String> implements MauSacRepository {

    @Override
    public Page<MauSac> findAllMauSac() {
        return null;
    }
}
