package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.PinConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.PinRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.PinResponse;
import beephone_shop_projects.core.admin.product_managements.repository.PinRepository;
import beephone_shop_projects.core.admin.product_managements.service.PinService;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PinServiceImpl extends AbstractServiceImpl<Pin, PinResponse, PinRequest, String> implements PinService {

    @Autowired
    private PinRepository pinRepository;

    @Autowired
    private PinConverter pinConverter;

    public PinServiceImpl(PinRepository repo, PinConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<PinResponse> findAllPin(FindFilterProductsRequest findFilterProductsRequest) {
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
        return pinConverter.convertToPageResponse(pinRepository.findAllPin(pageable, findFilterProductsRequest));
    }

    @Override
    public Pin doiTrangThai(String id) throws Exception {
        Pin pin = pinRepository.findOneById(id);
        if (pin.getStatus() == StatusCommon.ACTIVE) {
            pin.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            pin.setStatus(StatusCommon.ACTIVE);
        }
        return pinRepository.save(pin);
    }
}
