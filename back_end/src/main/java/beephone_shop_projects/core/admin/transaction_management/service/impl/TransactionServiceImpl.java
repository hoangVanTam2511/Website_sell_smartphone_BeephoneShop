package beephone_shop_projects.core.admin.transaction_management.service.impl;

import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.transaction_management.model.request.TransactionRequest;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionCustomResponse;
import beephone_shop_projects.core.admin.transaction_management.model.response.TransactionResponse;
import beephone_shop_projects.core.admin.transaction_management.repository.TransactionRepository;
import beephone_shop_projects.core.admin.transaction_management.service.TransactionService;
import beephone_shop_projects.core.common.base.PageableResponse;
import beephone_shop_projects.core.common.base.ResponsePage;
import beephone_shop_projects.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Component
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public ResponsePage<TransactionCustomResponse> getAll(TransactionRequest request) {

        if (request.getPageNo() == null) {
            request.setPageNo(1);
        }
        if (request.getPageSize() == null) {
            request.setPageSize(5);
        }
        if (request.getKeyword() == null) {
            request.setKeyword("");
        }


        Pageable pageable = PageRequest.of(request.getPageNo() - 1, request.getPageSize());

        ResponsePage<TransactionCustomResponse> pageCustomResponses = new ResponsePage<>();

        List<TransactionCustomResponse> listCustomResponses = new ArrayList<>();

        Page<TransactionResponse> pageGetAll = transactionRepository.getAll(pageable, request);

        for (TransactionResponse response : pageGetAll.getContent()) {

            TransactionCustomResponse response1 = new TransactionCustomResponse();

            Optional<Account> idEmployee = accountRepository.findById(response.getIdNhanVien());

            response1.setId(response.getId());
            response1.setMa(response.getMa());
            response1.setMaHoaDon(response.getMaHoaDon());
            response1.setSoTienThanhToan(response.getSoTienThanhToan());
            response1.setLoaiThanhToan(response.getLoaiThanhToan());
            response1.setHinhThucThanhToan(response.getHinhThucThanhToan());
            response1.setTrangThai(response.getTrangThai());
            response1.setIdHoaDon(response.getIdHoaDon());
            response1.setNgayTao(response.getNgayTao());
            response1.setMaHoaDon(response.getMaHoaDon());
            response1.setIdNhanVien(response.getIdNhanVien());

            if (idEmployee.isPresent()) {
                if (idEmployee.get().getId().equals(response.getIdNhanVien())) {
                    response1.setNguoiXacNhan(idEmployee.get().getHoVaTen());
                }
            }
            listCustomResponses.add(response1);
        }

        PageableResponse pageableResponse = new PageableResponse();
        pageableResponse.setPageSize(pageable.getPageSize());
        pageableResponse.setCurrentPage(pageable.getPageNumber());

        pageCustomResponses.setData(listCustomResponses);
        pageCustomResponses.setPageable(pageableResponse);
        pageCustomResponses.setTotalPages(pageGetAll.getTotalPages());

        return pageCustomResponses;
    }
}
