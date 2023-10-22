package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CameraSauConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraSauRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CameraSauRepository;
import beephone_shop_projects.core.admin.product_managements.service.CameraSauService;
import beephone_shop_projects.entity.CameraSau;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CameraSauServiceImpl extends AbstractServiceImpl<CameraSau, CameraSauResponse, CameraSauRequest, String> implements CameraSauService {

    public CameraSauServiceImpl(CameraSauRepository repo, CameraSauConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<CameraSau> findAllCameraSau() {
        return null;
    }


}
