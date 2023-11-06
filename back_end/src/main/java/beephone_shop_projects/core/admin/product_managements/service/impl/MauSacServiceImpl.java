package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.MauSacConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.MauSacRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.MauSacResponse;
import beephone_shop_projects.core.admin.product_managements.repository.MauSacRepository;
import beephone_shop_projects.core.admin.product_managements.service.MauSacService;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import beephone_shop_projects.repository.IMauSacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MauSacServiceImpl extends AbstractServiceImpl<MauSac, MauSacResponse, MauSacRequest, String> {

    public MauSacServiceImpl(MauSacRepository repo, MauSacConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private MauSacRepository mauSacRepository;

    public Page<MauSac> findAllMauSac() {
        return null;
    }

    public MauSac updateMauSac(MauSacRequest mauSacRequest, String id) throws Exception {
        MauSac mauSac = mauSacRepository.findOneById(id);
        if (mauSac != null) {
            mauSac.setTenMauSac(mauSacRequest.getTenMauSac());
            mauSac.setStatus(mauSacRequest.getStatus());
            return mauSacRepository.save(mauSac);
        }
        return null;
    }

    public MauSac doiTrangThai(String id) throws Exception {
        MauSac mauSac = mauSacRepository.findOneById(id);
        if (mauSac.getStatus() == StatusCommon.ACTIVE){
            mauSac.setStatus(StatusCommon.IN_ACTIVE);
        }else {
            mauSac.setStatus(StatusCommon.ACTIVE);
        }
        return mauSacRepository.save(mauSac);
    }

    public List<MauSacResponse> searchMauSac(MauSacRequest mauSacRequest) {
        return null;
    }


}
