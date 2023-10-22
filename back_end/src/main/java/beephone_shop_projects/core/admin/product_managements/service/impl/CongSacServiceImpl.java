package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CongSacConverter;
import beephone_shop_projects.core.admin.product_managements.converter.HangConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CongSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CongSacResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CongSacRepository;
import beephone_shop_projects.core.admin.product_managements.repository.HangRepository;
import beephone_shop_projects.core.admin.product_managements.service.CongSacService;
import beephone_shop_projects.core.admin.product_managements.service.HangService;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.entity.Hang;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CongSacServiceImpl extends AbstractServiceImpl<CongSac, CongSacResponse, CongSacRequest, String> implements CongSacService {

    public CongSacServiceImpl(CongSacRepository repo, CongSacConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<CongSac> findAllCongSac() {
        return null;
    }


}
