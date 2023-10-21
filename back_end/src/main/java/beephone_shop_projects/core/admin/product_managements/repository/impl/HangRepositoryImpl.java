package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.HangRepository;
import beephone_shop_projects.entity.Hang;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class HangRepositoryImpl extends AbstractRepositoryImpl<Hang, String> implements HangRepository {

    @Override
    public Page<Hang> findAllHang() {
        return null;
    }
}
