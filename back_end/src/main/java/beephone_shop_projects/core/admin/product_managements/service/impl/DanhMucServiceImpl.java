package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.DanhMucConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DanhMucResponse;
import beephone_shop_projects.core.admin.product_managements.repository.DanhMucRepository;
import beephone_shop_projects.core.admin.product_managements.service.DanhMucService;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DanhMucServiceImpl extends AbstractServiceImpl<DanhMuc, DanhMucResponse, DanhMucRequest, String> implements DanhMucService {

    public DanhMucServiceImpl(DanhMucRepository repo, DanhMucConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private DanhMucRepository danhMucRepository;

    @Autowired
    private DanhMucConverter danhMucConverter;

    @Override
    public Page<DanhMucResponse> findAllDanhMuc(FindFilterProductsRequest findFilterProductsRequest) {
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
        return danhMucConverter.convertToPageResponse(danhMucRepository.findAllDanhMuc(pageable, findFilterProductsRequest));
    }


    @Override
    public DanhMuc doiTrangThai(String id) throws Exception {
        DanhMuc danhMuc = danhMucRepository.findOneById(id);
        if (danhMuc.getStatus() == StatusCommon.ACTIVE) {
            danhMuc.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            danhMuc.setStatus(StatusCommon.ACTIVE);
        }
        return danhMucRepository.save(danhMuc);
    }

}
