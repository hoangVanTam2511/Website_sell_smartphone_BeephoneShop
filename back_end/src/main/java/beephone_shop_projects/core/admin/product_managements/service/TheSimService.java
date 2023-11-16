package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.TheSimRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheSimResponse;
import beephone_shop_projects.entity.TheSim;
import org.springframework.data.domain.Page;

public interface TheSimService extends GenericService<TheSimResponse, TheSimRequest, String> {

    Page<TheSim> findAllSimCards(Integer pageNo);

    TheSim doiTrangThai(String id) throws Exception;

}
