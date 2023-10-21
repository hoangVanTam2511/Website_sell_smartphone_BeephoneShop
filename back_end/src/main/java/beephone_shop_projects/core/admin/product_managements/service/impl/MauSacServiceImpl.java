package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.MauSacConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.core.admin.product_managements.repository.MauSacRepository;
import beephone_shop_projects.core.admin.product_managements.service.MauSacService;
import beephone_shop_projects.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class MauSacServiceImpl extends AbstractServiceImpl<MauSac, MauSacResponse, MauSacRequest, String> implements MauSacService {

    public MauSacServiceImpl(MauSacRepository repo, MauSacConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<MauSac> findAllMauSac() {
        return null;
    }

}
