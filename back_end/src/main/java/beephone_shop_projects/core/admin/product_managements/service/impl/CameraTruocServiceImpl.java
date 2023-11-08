package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CameraTruocConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraTruocRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraTruocResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CameraTruocRepository;
import beephone_shop_projects.core.admin.product_managements.service.CameraTruocService;
import beephone_shop_projects.entity.CameraTruoc;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CameraTruocServiceImpl extends AbstractServiceImpl<CameraTruoc, CameraTruocResponse, CameraTruocRequest, String> implements CameraTruocService {

    public CameraTruocServiceImpl(CameraTruocRepository repo, CameraTruocConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private CameraTruocRepository cameraTruocRepository;

    @Override
    public Page<CameraTruoc> findAllCameraTruoc() {
        return null;
    }

    @Override
    public CameraTruoc updateCameraTruoc(CameraTruocRequest cameraTruocRequest, String id) throws Exception {
        CameraTruoc cameraTruoc = cameraTruocRepository.findOneById(id);
        if (cameraTruoc != null) {
            cameraTruoc.setDoPhanGiai(cameraTruocRequest.getDoPhanGiai());
            cameraTruoc.setCameraType(cameraTruocRequest.getCameraType());
            cameraTruoc.setStatus(cameraTruocRequest.getStatus());
            return cameraTruocRepository.save(cameraTruoc);
        }
        return null;
    }

    @Override
    public CameraTruoc doiTrangThai(String id) throws Exception {
        CameraTruoc cameraTruoc = cameraTruocRepository.findOneById(id);
        if (cameraTruoc.getStatus() == StatusCommon.ACTIVE) {
            cameraTruoc.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            cameraTruoc.setStatus(StatusCommon.IN_ACTIVE);
        }
        return cameraTruocRepository.save(cameraTruoc);
    }


}
