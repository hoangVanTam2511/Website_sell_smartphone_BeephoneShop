package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.entity.MauSac;
import org.springframework.data.domain.Page;

public interface MauSacRepository extends GenericRepository<MauSac, String> {

    Page<MauSac> findAllMauSac();



}
