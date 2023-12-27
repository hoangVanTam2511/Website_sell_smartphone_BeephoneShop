package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterImeisRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.entity.Imei;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ImeiProductRepository extends GenericRepository<Imei, String> {

    Page<Imei> findAllImei(Pageable pageable, FindFilterImeisRequest findFilterImeisRequest);

}
