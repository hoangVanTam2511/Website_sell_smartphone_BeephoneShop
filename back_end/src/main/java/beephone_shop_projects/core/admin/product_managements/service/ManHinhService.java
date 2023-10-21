package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.ManHinhRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ManHinhResponse;
import beephone_shop_projects.entity.ManHinh;
import org.springframework.data.domain.Page;


public interface ManHinhService  extends GenericService<ManHinhResponse, ManHinhRequest, String> {
    Page<ManHinh> findAllManHinh(Integer pageNo);
    ManHinh add(ManHinhRequest manHinhRequest);
}
