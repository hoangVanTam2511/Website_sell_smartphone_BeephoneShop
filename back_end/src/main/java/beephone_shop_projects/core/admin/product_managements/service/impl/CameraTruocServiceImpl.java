package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CameraTruocConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraTruocRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CameraTruocRepository;
import beephone_shop_projects.core.admin.product_managements.service.CameraTruocService;
import beephone_shop_projects.entity.CameraTruoc;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CameraTruocServiceImpl extends AbstractServiceImpl<CameraTruoc, CameraTruocResponse, CameraTruocRequest, String> implements CameraTruocService {

    public CameraTruocServiceImpl(CameraTruocRepository repo, CameraTruocConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<CameraTruoc> findAllCameraTruoc() {
        return null;
    }


}
