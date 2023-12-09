package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.entity.CongSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CongSacRepository extends GenericRepository<CongSac, String> {

    Page<CongSac> findAllCongSac(Pageable pageable, FindFilterProductsRequest findFilterProductsRequest);

}
