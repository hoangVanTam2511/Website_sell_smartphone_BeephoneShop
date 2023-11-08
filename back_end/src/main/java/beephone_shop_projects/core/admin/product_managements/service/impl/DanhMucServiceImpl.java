package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.DanhMucConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.DanhMucRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DanhMucResponse;
import beephone_shop_projects.core.admin.product_managements.repository.DanhMucRepository;
import beephone_shop_projects.core.admin.product_managements.service.DanhMucService;
import beephone_shop_projects.entity.DanhMuc;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class DanhMucServiceImpl extends AbstractServiceImpl<DanhMuc, DanhMucResponse, DanhMucRequest, String> implements DanhMucService {

    public DanhMucServiceImpl(DanhMucRepository repo, DanhMucConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private DanhMucRepository danhMucRepository;

    @Override
    public Page<DanhMuc> findAllDanhMuc() {
        return null;
    }

    @Override
    public DanhMuc updateDanhMuc(DanhMucRequest danhMucRequest, String id) throws Exception {
        DanhMuc danhMuc = danhMucRepository.findOneById(id);
        if (danhMuc != null) {
            danhMuc.setTenDanhMuc(danhMucRequest.getTenDanhMuc());
            danhMuc.setStatus(danhMucRequest.getStatus());
            return danhMucRepository.save(danhMuc);
        }
        return null;
    }

    @Override
    public DanhMuc doiTrangThai(String id) throws Exception {
        DanhMuc danhMuc = danhMucRepository.findOneById(id);
        if (danhMuc.getStatus() == StatusCommon.ACTIVE) {
            danhMuc.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            danhMuc.setStatus(StatusCommon.IN_ACTIVE);
        }
        return danhMucRepository.save(danhMuc);
    }

}
