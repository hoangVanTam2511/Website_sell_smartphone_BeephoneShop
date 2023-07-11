package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.repository.IMauSacRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface MauSacRepository extends IMauSacRepository {
    Page<MauSac> findAll(Pageable pageable);

}
