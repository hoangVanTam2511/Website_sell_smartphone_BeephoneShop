package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ChipConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ChipRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ChipResponse;
import beephone_shop_projects.core.admin.product_managements.repository.ChipRepository;
import beephone_shop_projects.core.admin.product_managements.service.ChipService;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ChipServiceImpl extends AbstractServiceImpl<Chip, ChipResponse, ChipRequest, String> implements ChipService {

    public ChipServiceImpl(ChipRepository repo, ChipConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private ChipRepository chipRepository;

    @Autowired
    private ChipConverter chipConverter;

    @Override
    public Page<ChipResponse> findAllChip(FindFilterProductsRequest findFilterProductsRequest) {
        if (findFilterProductsRequest.getCurrentPage() == null) {
            findFilterProductsRequest.setCurrentPage(1);
        }
        if (findFilterProductsRequest.getPageSize() == null) {
            findFilterProductsRequest.setPageSize(5);
        }
        if (findFilterProductsRequest.getKeyword() == null) {
            findFilterProductsRequest.setKeyword("");
        }
        Pageable pageable = PageRequest.of(findFilterProductsRequest.getCurrentPage() - 1, findFilterProductsRequest.getPageSize(), Sort.by("createdAt").descending());
        return chipConverter.convertToPageResponse(chipRepository.findAllChip(pageable, findFilterProductsRequest));

    }


    @Override
    public Chip doiTrangThai(String id) throws Exception {
        Chip chip = chipRepository.findOneById(id);
        if (chip.getStatus() == StatusCommon.ACTIVE) {
            chip.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            chip.setStatus(StatusCommon.ACTIVE);
        }
        return chipRepository.save(chip);
    }


}
