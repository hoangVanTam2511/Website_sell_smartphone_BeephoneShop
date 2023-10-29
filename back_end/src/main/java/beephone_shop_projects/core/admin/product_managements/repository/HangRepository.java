package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.entity.Hang;
import org.springframework.data.domain.Page;

public interface HangRepository extends GenericRepository<Hang, String> {

    Page<Hang> findAllHang();

}
