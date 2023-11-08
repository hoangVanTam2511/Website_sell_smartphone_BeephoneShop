package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ChipConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ChipRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ChipResponse;
import beephone_shop_projects.core.admin.product_managements.repository.ChipRepository;
import beephone_shop_projects.core.admin.product_managements.service.ChipService;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class ChipServiceImpl extends AbstractServiceImpl<Chip, ChipResponse, ChipRequest, String> implements ChipService {

    public ChipServiceImpl(ChipRepository repo, ChipConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private ChipRepository chipRepository;

    @Override
    public Page<Chip> findAllChip() {
        return null;
    }

    @Override
    public Chip updateChip(ChipRequest chipRequest, String id) throws Exception {
        Chip chip = chipRepository.findOneById(id);
        if (chip != null) {
            chip.setTenChip(chipRequest.getTenChip());
            chip.setStatus(chipRequest.getStatus());
            return chipRepository.save(chip);
        }
        return null;
    }

    @Override
    public Chip doiTrangThai(String id) throws Exception {
        Chip chip = chipRepository.findOneById(id);
        if (chip.getStatus() == StatusCommon.ACTIVE) {
            chip.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            chip.setStatus(StatusCommon.IN_ACTIVE);
        }
        return chipRepository.save(chip);
    }


}
