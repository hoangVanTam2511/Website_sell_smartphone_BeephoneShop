package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.converter.GenericConverter;
import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ManHinhConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.ManHinhRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ManHinhResponse;
import beephone_shop_projects.core.admin.product_managements.repository.DoPhanGiaiRepository;
import beephone_shop_projects.core.admin.product_managements.repository.ManHinhRepository;
import beephone_shop_projects.core.admin.product_managements.service.ManHinhService;
import beephone_shop_projects.entity.ManHinh;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ManHinhServiceImpl extends AbstractServiceImpl<ManHinh, ManHinhResponse, ManHinhRequest, String> implements ManHinhService {
    @Autowired
    private ManHinhRepository manHinhRepository;
    @Autowired
    private DoPhanGiaiRepository doPhanGiaiRepository;

    public ManHinhServiceImpl(ManHinhRepository repo, ManHinhConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<ManHinh> findAllManHinh(Integer pageNo) {
        Pageable pageable= PageRequest.of(pageNo-1,5);
        return manHinhRepository.findAll(pageable);
    }

    @Override
    public ManHinh add(ManHinhRequest manHinhRequest) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("DP%04d", number);
        ManHinh manHinh=new ManHinh().builder()
                .doPhanGiaiManHinh(doPhanGiaiRepository.findOneById(manHinhRequest.getDoPhanGiaiManHinh()))
                .loaiManHinh(manHinhRequest.getLoaiManHinh())
                .ma(code)
                .kichThuoc(manHinhRequest.getKichThuoc())
                .status(manHinhRequest.getStatus())
                .tanSoQuet(manHinhRequest.getTanSoQuet())
                .build();
        try {
            return manHinhRepository.save(manHinh);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
