package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.TheNhoConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.FindFilterProductsRequest;
import beephone_shop_projects.core.admin.product_managements.model.request.TheNhoRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheNhoResponse;
import beephone_shop_projects.core.admin.product_managements.repository.TheNhoRepository;
import beephone_shop_projects.core.admin.product_managements.service.TheNhoService;
import beephone_shop_projects.entity.TheNho;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TheNhoServiceImpl extends AbstractServiceImpl<TheNho, TheNhoResponse, TheNhoRequest, String> implements TheNhoService {

    public TheNhoServiceImpl(TheNhoRepository repo, TheNhoConverter converter) {
        super(repo, converter);
    }

    @Autowired
    private TheNhoRepository theNhoRepository;

    @Autowired
    private TheNhoConverter theNhoConverter;

    @Override
    public Page<TheNhoResponse> findAllTheNho(FindFilterProductsRequest findFilterProductsRequest) {
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
        return theNhoConverter.convertToPageResponse(theNhoRepository.findAllTheNho(pageable, findFilterProductsRequest));
    }

    @Override
    public TheNho doiTrangThai(String id) throws Exception {
        TheNho theNho = theNhoRepository.findOneById(id);
        if (theNho.getStatus() == StatusCommon.ACTIVE) {
            theNho.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            theNho.setStatus(StatusCommon.ACTIVE);
        }
        return theNhoRepository.save(theNho);
    }


}
