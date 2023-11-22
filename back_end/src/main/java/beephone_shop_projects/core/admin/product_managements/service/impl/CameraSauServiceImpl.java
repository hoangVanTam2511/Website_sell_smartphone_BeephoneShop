package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CameraSauConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraSauRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CameraSauRepository;
import beephone_shop_projects.core.admin.product_managements.service.CameraSauService;
import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CameraSauServiceImpl extends AbstractServiceImpl<CameraSau, CameraSauResponse, CameraSauRequest, String> implements CameraSauService {

    public CameraSauServiceImpl(CameraSauRepository repo, CameraSauConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private CameraSauRepository cameraSauRepository;

    @Autowired
    private CameraSauConverter cameraSauConverter;

    @Override
    public Page<CameraSauResponse> findAllCameraSau(FindFilterCamerasRequest filterCamerasRequest) {
        if (filterCamerasRequest.getCurrentPage() == null) {
            filterCamerasRequest.setCurrentPage(1);
        }
        if (filterCamerasRequest.getPageSize() == null) {
            filterCamerasRequest.setPageSize(5);
        }
        if (filterCamerasRequest.getKeyword() == null) {
            filterCamerasRequest.setKeyword("");
        }
        Pageable pageable = PageRequest.of(filterCamerasRequest.getCurrentPage() - 1, filterCamerasRequest.getPageSize(), Sort.by("createdAt").descending());
        return cameraSauConverter.convertToPageResponse(cameraSauRepository.findAllCameraSau(pageable, filterCamerasRequest));

    }


    @Override
    public CameraSau doiTrangThai(String id) throws Exception {
        CameraSau cameraSau = cameraSauRepository.findOneById(id);
        if (cameraSau.getStatus() == StatusCommon.ACTIVE) {
            cameraSau.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            cameraSau.setStatus(StatusCommon.ACTIVE);
        }
        return cameraSauRepository.save(cameraSau);
    }


}
