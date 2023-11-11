package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.MauSacConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.core.admin.product_managements.repository.MauSacRepository;
import beephone_shop_projects.core.admin.product_managements.service.MauSacService;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MauSacServiceImpl extends AbstractServiceImpl<MauSac, MauSacResponse, MauSacRequest, String> implements MauSacService {

    public MauSacServiceImpl(MauSacRepository repo, MauSacConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private MauSacRepository mauSacRepository;

    @Autowired
    private MauSacConverter mauSacConverter;


    @Override
    public Page<MauSacResponse> findAllMauSac(FindFilterProductsRequest findFilterProductsRequest) {
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
        return mauSacConverter.convertToPageResponse(mauSacRepository.findAllMauSac(pageable, findFilterProductsRequest));
    }

    @Override
    public MauSac doiTrangThai(String id) throws Exception {
        MauSac mauSac = mauSacRepository.findOneById(id);
        if (mauSac.getStatus() == StatusCommon.ACTIVE) {
            mauSac.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            mauSac.setStatus(StatusCommon.ACTIVE);
        }
        return mauSacRepository.save(mauSac);
    }

    @Override
    public List<MauSacResponse> searchMauSac(MauSacRequest mauSacRequest) {
        return null;
    }

}
