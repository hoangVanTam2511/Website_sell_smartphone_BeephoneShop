package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.entity.TheNho;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TheNhoRepository extends GenericRepository<TheNho, String> {

    Page<TheNho> findAllTheNho(Pageable pageable, FindFilterProductsRequest findFilterProductsRequest);

}
