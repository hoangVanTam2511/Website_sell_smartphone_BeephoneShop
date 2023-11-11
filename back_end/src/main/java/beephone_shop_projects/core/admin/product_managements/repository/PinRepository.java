package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.entity.Pin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PinRepository extends GenericRepository<Pin, String> {

    Page<Pin> findAllPin(Pageable pageable, FindFilterProductsRequest findFilterProductsRequest);

}
