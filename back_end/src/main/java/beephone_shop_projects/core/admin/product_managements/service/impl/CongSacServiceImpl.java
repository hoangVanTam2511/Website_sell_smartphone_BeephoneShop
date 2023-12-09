package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CongSacConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CongSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CongSacResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CongSacRepository;
import beephone_shop_projects.core.admin.product_managements.service.CongSacService;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CongSacServiceImpl extends AbstractServiceImpl<CongSac, CongSacResponse, CongSacRequest, String> implements CongSacService {

    public CongSacServiceImpl(CongSacRepository repo, CongSacConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private CongSacRepository congSacRepository;

    @Autowired
    private CongSacConverter congSacConverter;

    @Override
    public Page<CongSacResponse> findAllCongSac(FindFilterProductsRequest findFilterProductsRequest) {
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
        return congSacConverter.convertToPageResponse(congSacRepository.findAllCongSac(pageable, findFilterProductsRequest));
    }


    @Override
    public CongSac doiTrangThai(String id) throws Exception {
        CongSac congSac = congSacRepository.findOneById(id);
        if (congSac.getStatus() == StatusCommon.ACTIVE) {
            congSac.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            congSac.setStatus(StatusCommon.ACTIVE);
        }
        return congSacRepository.save(congSac);
    }


}
