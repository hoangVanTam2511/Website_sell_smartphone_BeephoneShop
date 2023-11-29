package beephone_shop_projects.core.admin.rank_management.service.impl;

import beephone_shop_projects.core.admin.rank_management.model.request.CreateRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.request.FindRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.request.UpdateRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.response.RankResponse;
import beephone_shop_projects.core.admin.rank_management.repository.RankRepository;
import beephone_shop_projects.core.admin.rank_management.service.RankService;
import beephone_shop_projects.entity.XepHang;
import beephone_shop_projects.infrastructure.constant.StatusCommon;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.security.SecureRandom;
import java.util.List;

@Service
@Validated
@Component
public class RankServiceImpl implements RankService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 10;

    @Autowired
    private RankRepository rankRepository;

    @Override
    public RankResponse getOne(String id) {
        return rankRepository.getOneRank(id);
    }

    public String generateRandomCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            code.append(randomChar);
        }
        return code.toString();
    }

    @Override
    public XepHang addRank(@Valid CreateRankRequest request) {
//        if (rankRepository.getOneRank(request.getMa()) == null) {
//            // in ra lỗi trùng mã
//            throw new RestApiException("Tên rank đã tồn tại !!!");
//        }
        XepHang xepHang = XepHang.builder()
                .ma(generateRandomCode())
                .ten(request.getTen().trim())
                .dieuKienToiThieu(request.getDieuKienToiThieu())
                .dieuKienToiDa(request.getDieuKienToiDa())
                .uuDai(request.getUuDai())
                .status(request.getStatus())
                .build();
        return rankRepository.save(xepHang);

    }

    @Override
    public XepHang updateRank(@Valid UpdateRankRequest request, String id) {
        XepHang xepHang = rankRepository.findById(id).get();

        if (xepHang != null) {
            xepHang.setMa(request.getMa());
            xepHang.setTen(request.getTen().trim());
            xepHang.setDieuKienToiThieu(request.getDieuKienToiThieu());
            xepHang.setDieuKienToiDa(request.getDieuKienToiDa());
            xepHang.setUuDai(request.getUuDai());
            xepHang.setStatus(request.getStatus());
            return rankRepository.save(xepHang);
        }

        return null;
    }


    @Override
    public XepHang doiTrangThai(String id) {
        XepHang xepHang = rankRepository.findById(id).get();
        if (xepHang.getStatus() == StatusCommon.ACTIVE) {
            xepHang.setStatus(StatusCommon.IN_ACTIVE);
        } else {
            xepHang.setStatus(StatusCommon.ACTIVE);
        }
        return rankRepository.save(xepHang);
    }


    @Override
    public Page<RankResponse> getAll(Integer pageNo, FindRankRequest request) {
        if (request.getPageSize() == null){
            request.setPageSize(5);
        }
        Pageable pageable = PageRequest.of(pageNo - 1, request.getPageSize());
        return rankRepository.getAll(pageable, request);
    }

    @Override
    public List<XepHang> findAll() {
        return rankRepository.findAll();
    }

}
