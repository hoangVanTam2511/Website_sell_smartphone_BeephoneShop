//package beephone_shop_projects.core.admin.account_management.service.impl;
//
//import beephone_shop_projects.core.admin.account_management.model.request.FindAccountRequest;
//import beephone_shop_projects.core.admin.account_management.repository.CustomKhachHangRepositoryImpl;
//import beephone_shop_projects.core.admin.account_management.repository.KhachHangRepository;
//import beephone_shop_projects.core.admin.account_management.service.KhachHangCustomService;
//import beephone_shop_projects.entity.Account;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//@Service
//
//public class KhachHangServiceImplCustom implements KhachHangCustomService {
//    @Autowired
//    private CustomKhachHangRepositoryImpl khachHangRepository;
//    @Override
//    public Page<Account> findAllKH(FindAccountRequest search) {
//        if (search.getPageNo() == null) {
//            search.setPageNo(1);
//        }
//        if (search.getPageSize() == null) {
//            search.setPageSize(5);
//        }
//        if (search.getKeyword() == null) {
//            search.setKeyword("");
//        }
//        Pageable pageable = PageRequest.of(search.getPageNo()-1, search.getPageSize());
//        Page<Account> page = khachHangRepository.findAllKH(pageable, search);
//        return page;
//    }
//}
