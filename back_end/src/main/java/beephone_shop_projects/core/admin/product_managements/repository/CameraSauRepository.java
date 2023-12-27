package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.entity.CameraSau;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CameraSauRepository extends GenericRepository<CameraSau, String> {

    Page<CameraSau> findAllCameraSau(Pageable pageable, FindFilterCamerasRequest filterCamerasRequest);

}
