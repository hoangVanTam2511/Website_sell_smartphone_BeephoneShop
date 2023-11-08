package beephone_shop_projects.core.admin.product_managements.service;

import beephone_shop_projects.core.admin.order_management.service.GenericService;
import beephone_shop_projects.core.admin.product_managements.model.request.ChipRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ChipResponse;
import beephone_shop_projects.entity.Chip;
import org.springframework.data.domain.Page;

public interface ChipService extends GenericService<ChipResponse, ChipRequest, String> {

    Page<Chip> findAllChip();

    Chip updateChip(ChipRequest chipRequest, String id) throws Exception;

    Chip doiTrangThai(String id) throws Exception;

}
