package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.HangConverter;
import beephone_shop_projects.core.admin.product_managements.converter.PinConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.PinRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.core.admin.product_managements.model.response.PinResponse;
import beephone_shop_projects.core.admin.product_managements.repository.HangRepository;
import beephone_shop_projects.core.admin.product_managements.repository.PinRepository;
import beephone_shop_projects.core.admin.product_managements.service.HangService;
import beephone_shop_projects.core.admin.product_managements.service.PinService;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.entity.Pin;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class PinServiceImpl extends AbstractServiceImpl<Pin, PinResponse, PinRequest, String> implements PinService {

    public PinServiceImpl(PinRepository repo, PinConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<Pin> findAllPin() {
        return null;
    }


}
