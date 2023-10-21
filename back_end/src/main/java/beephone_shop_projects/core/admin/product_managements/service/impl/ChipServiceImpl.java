package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ChipConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ChipRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ChipResponse;
import beephone_shop_projects.core.admin.product_managements.repository.ChipRepository;
import beephone_shop_projects.core.admin.product_managements.service.ChipService;
import beephone_shop_projects.entity.Chip;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class ChipServiceImpl extends AbstractServiceImpl<Chip, ChipResponse, ChipRequest, String> implements ChipService {

    public ChipServiceImpl(ChipRepository repo, ChipConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<Chip> findAllChip() {
        return null;
    }


}
