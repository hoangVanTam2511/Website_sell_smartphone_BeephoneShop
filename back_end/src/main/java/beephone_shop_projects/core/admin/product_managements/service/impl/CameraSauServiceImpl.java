package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CameraSauConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CameraSauRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CameraSauResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CameraSauRepository;
import beephone_shop_projects.core.admin.product_managements.service.CameraSauService;
import beephone_shop_projects.entity.CameraSau;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CameraSauServiceImpl extends AbstractServiceImpl<CameraSau, CameraSauResponse, CameraSauRequest, String> implements CameraSauService {

    public CameraSauServiceImpl(CameraSauRepository repo, CameraSauConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private CameraSauRepository cameraSauRepository;

    @Override
    public Page<CameraSau> findAllCameraSau() {
        return null;
    }

    @Override
    public CameraSau updateCameraSau(CameraSauRequest cameraSauRequest, String id) throws Exception {
        CameraSau cameraSau = cameraSauRepository.findOneById(id);
        if (cameraSau != null) {
            cameraSau.setDoPhanGiai(cameraSauRequest.getDoPhanGiai());
            cameraSau.setCameraType(cameraSauRequest.getCameraType());
            cameraSau.setStatus(cameraSauRequest.getStatus());
            return cameraSauRepository.save(cameraSau);
        }
        return null;
    }

    @Override
    public CameraSau doiTrangThai(String id) throws Exception {
        CameraSau cameraSau = cameraSauRepository.findOneById(id);
        if (cameraSau.getStatus() == StatusCommon.ACTIVE) {
            cameraSau.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            cameraSau.setStatus(StatusCommon.IN_ACTIVE);
        }
        return cameraSauRepository.save(cameraSau);
    }


}
