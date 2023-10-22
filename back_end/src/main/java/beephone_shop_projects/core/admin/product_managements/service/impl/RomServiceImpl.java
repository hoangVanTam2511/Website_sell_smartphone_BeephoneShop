package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.RomConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.RomRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RomResponse;
import beephone_shop_projects.core.admin.product_managements.repository.RomRepository;
import beephone_shop_projects.core.admin.product_managements.service.RomService;
import beephone_shop_projects.entity.Rom;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class RomServiceImpl extends AbstractServiceImpl<Rom, RomResponse, RomRequest, String> implements RomService {

    public RomServiceImpl(RomRepository repo, RomConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<Rom> findAllRom() {
        return null;
    }


}
