package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.CongSacConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.CongSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.CongSacResponse;
import beephone_shop_projects.core.admin.product_managements.repository.CongSacRepository;
import beephone_shop_projects.core.admin.product_managements.service.CongSacService;
import beephone_shop_projects.entity.CongSac;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CongSacServiceImpl extends AbstractServiceImpl<CongSac, CongSacResponse, CongSacRequest, String> implements CongSacService {

    public CongSacServiceImpl(CongSacRepository repo, CongSacConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private CongSacRepository congSacRepository;

    @Override
    public Page<CongSac> findAllCongSac() {
        return null;
    }

    @Override
    public CongSac updateCongSac(CongSacRequest congSacRequest, String id) throws Exception {
        CongSac congSac = congSacRepository.findOneById(id);
        if (congSac != null) {
            congSac.setLoaiCongSac(congSacRequest.getLoaiCongSac());
            congSac.setStatus(congSacRequest.getStatus());
            return congSacRepository.save(congSac);
        }
        return null;
    }

    @Override
    public CongSac doiTrangThai(String id) throws Exception {
        CongSac congSac = congSacRepository.findOneById(id);
        if (congSac.getStatus() == StatusCommon.ACTIVE) {
            congSac.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            congSac.setStatus(StatusCommon.IN_ACTIVE);
        }
        return congSacRepository.save(congSac);
    }


}
