package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.TheNhoConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.TheNhoRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheNhoResponse;
import beephone_shop_projects.core.admin.product_managements.repository.TheNhoRepository;
import beephone_shop_projects.core.admin.product_managements.service.TheNhoService;
import beephone_shop_projects.entity.TheNho;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class TheNhoServiceImpl extends AbstractServiceImpl<TheNho, TheNhoResponse, TheNhoRequest, String> implements TheNhoService {

    public TheNhoServiceImpl(TheNhoRepository repo, TheNhoConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<TheNho> findAllTheNho() {
        return null;
    }


}
