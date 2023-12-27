package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ImeiProductConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterImeisRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.ImeiProductRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ImeiProductResponse;
import beephone_shop_projects.core.admin.product_managements.repository.ImeiProductRepository;
import beephone_shop_projects.core.admin.product_managements.service.ImeiProductService;
import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.infrastructure.constant.StatusImei;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ImeiProductServiceImpl extends AbstractServiceImpl<Imei, ImeiProductResponse, ImeiProductRequest, String> implements ImeiProductService {

    public ImeiProductServiceImpl(ImeiProductRepository repo, ImeiProductConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private ImeiProductRepository imeiProductRepository;

    @Autowired
    private ImeiProductConverter imeiProductConverter;

    @Override
    public Imei getOneImei(String id) {
        return imeiProductRepository.findOneById(id);
    }

    @Override
    public Page<ImeiProductResponse> findAllImei(FindFilterImeisRequest findFilterImeisRequest) {
        if (findFilterImeisRequest.getCurrentPage() == null) {
            findFilterImeisRequest.setCurrentPage(1);
        }
        if (findFilterImeisRequest.getPageSize() == null) {
            findFilterImeisRequest.setPageSize(5);
        }
        if (findFilterImeisRequest.getKeyword() == null) {
            findFilterImeisRequest.setKeyword("");
        }
        Pageable pageable = PageRequest.of(findFilterImeisRequest.getCurrentPage() - 1, findFilterImeisRequest.getPageSize(), Sort.by("createdAt").descending());
        return imeiProductConverter.convertToPageResponse(imeiProductRepository.findAllImei(pageable, findFilterImeisRequest));

    }

    @Override
    public Imei doiTrangThai(String id) throws Exception {
        Imei imei = imeiProductRepository.findOneById(id);
        if (imei.getTrangThai() == StatusImei.NOT_SOLD) {
            imei.setTrangThai(StatusImei.IN_ACTIVE);
        } else {
            imei.setTrangThai(StatusImei.NOT_SOLD);
        }
        return imeiProductRepository.save(imei);
    }


}
