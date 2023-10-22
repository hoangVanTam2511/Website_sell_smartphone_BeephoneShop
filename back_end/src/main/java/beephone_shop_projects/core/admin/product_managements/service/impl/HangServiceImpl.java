package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.HangConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.core.admin.product_managements.repository.HangRepository;
import beephone_shop_projects.core.admin.product_managements.service.HangService;
import beephone_shop_projects.entity.Hang;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class HangServiceImpl extends AbstractServiceImpl<Hang, HangResponse, HangRequest, String> implements HangService {

    public HangServiceImpl(HangRepository repo, HangConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<Hang> findAllHang() {
        return null;
    }


}
