package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.ManHinhConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.ManHinhRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.ManHinhResponse;
import beephone_shop_projects.core.admin.product_managements.repository.DoPhanGiaiRepository;
import beephone_shop_projects.core.admin.product_managements.repository.ManHinhRepository;
import beephone_shop_projects.core.admin.product_managements.service.ManHinhService;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ManHinhServiceImpl extends AbstractServiceImpl<ManHinh, ManHinhResponse, ManHinhRequest, String> implements ManHinhService {
    @Autowired
    private ManHinhRepository manHinhRepository;
    @Autowired
    private DoPhanGiaiRepository doPhanGiaiRepository;

    @Autowired
    private ManHinhConverter manHinhConverter;

    public ManHinhServiceImpl(ManHinhRepository repo, ManHinhConverter converter) {
        super(repo, converter);
    }

    @Override
    public Page<ManHinhResponse> findAllMH(FindFilterProductsRequest findFilterProductsRequest) {
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
        return manHinhConverter.convertToPageResponse(manHinhRepository.getAll(pageable, findFilterProductsRequest));

    }

    @Override
    public Page<ManHinh> findAllManHinh(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return manHinhRepository.findAll(pageable);
    }

    @Override
    public ManHinh add(ManHinhRequest manHinhRequest) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("DP%04d", number);
        ManHinh manHinh = new ManHinh().builder()
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

    @Override
    public ManHinh updateManHinh(ManHinhRequest request, String id) {
        ManHinh manHinh = manHinhRepository.findOneById(id);
        if (manHinh != null) {
            manHinh.setDoPhanGiaiManHinh(doPhanGiaiRepository.findOneById(request.getDoPhanGiaiManHinh()));
            manHinh.setLoaiManHinh(request.getLoaiManHinh());
            manHinh.setKichThuoc(request.getKichThuoc());
            manHinh.setTanSoQuet(request.getTanSoQuet());
        }
        try {
            return manHinhRepository.save(manHinh);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ManHinh doiTrangThai(String id) throws Exception {
        ManHinh manHinh = manHinhRepository.findOneById(id);
        if (manHinh.getStatus() == StatusCommon.ACTIVE) {
            manHinh.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            manHinh.setStatus(StatusCommon.ACTIVE);
        }
        return manHinhRepository.save(manHinh);
    }
}
