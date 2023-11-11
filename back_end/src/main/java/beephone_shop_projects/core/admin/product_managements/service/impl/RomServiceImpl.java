package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.RomConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.RomRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RomResponse;
import beephone_shop_projects.core.admin.product_managements.repository.RomRepository;
import beephone_shop_projects.core.admin.product_managements.service.RomService;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class RomServiceImpl extends AbstractServiceImpl<Rom, RomResponse, RomRequest, String> implements RomService {

    public RomServiceImpl(RomRepository repo, RomConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private RomRepository romRepository;

    @Autowired
    private RomConverter romConverter;

    @Override
    public Page<Rom> findAllRom(FindFilterProductsRequest findFilterProductsRequest) {
        return null;
    }

    @Override
    public Rom doiTrangThai(String id) throws Exception {
        Rom rom = romRepository.findOneById(id);
        if (rom.getStatus() == StatusCommon.ACTIVE) {
            rom.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            rom.setStatus(StatusCommon.IN_ACTIVE);
        }
        return romRepository.save(rom);
    }

}
