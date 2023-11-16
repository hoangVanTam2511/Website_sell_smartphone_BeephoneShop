package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.RamConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.RamRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.RamResponse;
import beephone_shop_projects.core.admin.product_managements.repository.RamRepository;
import beephone_shop_projects.core.admin.product_managements.service.RamService;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class RamServiceImpl extends AbstractServiceImpl<Ram, RamResponse, RamRequest, String> implements RamService {

    public RamServiceImpl(RamRepository repo, RamConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private RamRepository ramRepository;

    @Autowired
    private RamConverter ramConverter;

    @Override
    public Page<Ram> findAllRam(FindFilterProductsRequest findFilterProductsRequest) {
        return null;
    }

    @Override
    public Ram doiTrangThai(String id) throws Exception {
        Ram ram = ramRepository.findOneById(id);
        if (ram.getStatus() == StatusCommon.ACTIVE) {
            ram.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            ram.setStatus(StatusCommon.ACTIVE);
        }
        return ramRepository.save(ram);
    }

}
