package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.RamConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.RamRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RamResponse;
import beephone_shop_projects.core.admin.product_managements.repository.RamRepository;
import beephone_shop_projects.core.admin.product_managements.service.RamService;
import beephone_shop_projects.entity.Ram;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class RamServiceImpl extends AbstractServiceImpl<Ram, RamResponse, RamRequest, String> implements RamService {

    public RamServiceImpl(RamRepository repo, RamConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<Ram> findAllRam() {
        return null;
    }


}
