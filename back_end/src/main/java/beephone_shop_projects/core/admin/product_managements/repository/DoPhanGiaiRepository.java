package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DoPhanGiaiRepository extends GenericRepository<DoPhanGiaiManHinh, String> {

//    Page<DoPhanGiaiManHinh> getAllDoPhanGiai(Pageable pageable);
}
