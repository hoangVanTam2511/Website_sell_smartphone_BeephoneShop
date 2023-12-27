package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.HangConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.HangRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.HangResponse;
import beephone_shop_projects.core.admin.product_managements.repository.HangRepository;
import beephone_shop_projects.core.admin.product_managements.service.HangService;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.entity.Hang;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class HangServiceImpl extends AbstractServiceImpl<Hang, HangResponse, HangRequest, String> implements HangService {

    public HangServiceImpl(HangRepository repo, HangConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private HangRepository hangRepository;

    @Autowired
    private HangConverter hangConverter;

    @Override
    public Page<HangResponse> findAllHang(FindFilterProductsRequest findFilterProductsRequest) {
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
        return hangConverter.convertToPageResponse(hangRepository.findAllHang(pageable, findFilterProductsRequest));
    }

    @Override
    public Hang doiTrangThai(String id) throws Exception {
        Hang hang = hangRepository.findOneById(id);
        if (hang.getStatus() == StatusCommon.ACTIVE) {
            hang.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            hang.setStatus(StatusCommon.ACTIVE);
        }
        return hangRepository.save(hang);
    }
}
