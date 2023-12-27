package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.DoPhanGiaiConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.DoPhanGiaiRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.DoPhanGiaiResponse;
import beephone_shop_projects.core.admin.product_managements.repository.DoPhanGiaiRepository;
import beephone_shop_projects.core.admin.product_managements.service.DoPhanGiaiService;
import beephone_shop_projects.entity.DoPhanGiaiManHinh;
import beephone_shop_projects.infrastructure.constant.ResolutionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class DoPhanGiaiServiceImpl extends AbstractServiceImpl<DoPhanGiaiManHinh, DoPhanGiaiResponse, DoPhanGiaiRequest, String> implements DoPhanGiaiService {
    @Autowired
    private DoPhanGiaiRepository doPhanGiaiRepository;

    public DoPhanGiaiServiceImpl(DoPhanGiaiRepository repo, DoPhanGiaiConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<DoPhanGiaiManHinh> findAllDoPhanGiai(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return doPhanGiaiRepository.findAll(pageable);
    }

    @Override
    public DoPhanGiaiManHinh add(DoPhanGiaiRequest doPhanGiaiRequest) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("RE%04d", number);
        DoPhanGiaiManHinh doPhanGiaiManHinh = new DoPhanGiaiManHinh().builder()
                .chieuDai(doPhanGiaiRequest.getChieuDai())
                .ma(code)
                .chieuRong(doPhanGiaiRequest.getChieuRong())
                .resolutionType(ResolutionType.HD)
                .build();
        try {
            return doPhanGiaiRepository.save(doPhanGiaiManHinh);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public DoPhanGiaiManHinh updateDoPhanGiai(DoPhanGiaiRequest doPhanGiaiRequest, String id) {
        DoPhanGiaiManHinh doPhanGiaiManHinh = doPhanGiaiRepository.findOneById(id);
        if (doPhanGiaiManHinh != null){
            doPhanGiaiManHinh.setChieuDai(doPhanGiaiRequest.getChieuDai());
            doPhanGiaiManHinh.setChieuRong(doPhanGiaiRequest.getChieuRong());
        }
        try {
            return doPhanGiaiRepository.save(doPhanGiaiManHinh);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public DoPhanGiaiManHinh doiTrangThai(String id) throws Exception {
//        DoPhanGiaiManHinh doPhanGiai = doPhanGiaiRepository.findOneById(id);
//        if (doPhanGiai.get() == StatusCommon.ACTIVE) {
//            doPhanGiai.setStatus(StatusCommon.IN_ACTIVE);
//        } else {
//            doPhanGiai.setStatus(StatusCommon.IN_ACTIVE);
//        }
//        return doPhanGiaiRepository.save(doPhanGiai);
        return null;
    }

}
