package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CameraTruocConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraTruocRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterCamerasRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CameraTruocRepository;
import beephone_shop_projects.core.admin.product_managements.service.CameraTruocService;
import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CameraTruocServiceImpl extends AbstractServiceImpl<CameraTruoc, CameraTruocResponse, CameraTruocRequest, String> implements CameraTruocService {

    public CameraTruocServiceImpl(CameraTruocRepository repo, CameraTruocConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private CameraTruocConverter cameraTruocConverter;

    @Autowired
    private CameraTruocRepository cameraTruocRepository;

    @Override
    public Page<CameraTruocResponse> findAllCameraTruoc(FindFilterCamerasRequest filterCamerasRequest) {
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
        return cameraTruocConverter.convertToPageResponse(cameraTruocRepository.findAllCameraTruoc(pageable, filterCamerasRequest));
    }


    @Override
    public CameraTruoc doiTrangThai(String id) throws Exception {
        CameraTruoc cameraTruoc = cameraTruocRepository.findOneById(id);
        if (cameraTruoc.getStatus() == StatusCommon.ACTIVE) {
            cameraTruoc.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            cameraTruoc.setStatus(StatusCommon.ACTIVE);
        }
        return cameraTruocRepository.save(cameraTruoc);
    }


}
