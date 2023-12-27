package beephone_shop_projects.core.admin.rank_management.service;

import beephone_shop_projects.core.admin.rank_management.model.request.CreateRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.request.FindRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.request.UpdateRankRequest;
import beephone_shop_projects.core.admin.rank_management.model.response.RankResponse;
import beephone_shop_projects.entity.XepHang;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RankService {

    RankResponse getOne(String id);

    XepHang addRank(@Valid CreateRankRequest request);

    XepHang updateRank(@Valid UpdateRankRequest request, String ma);

    XepHang doiTrangThai(String id);

    Page<RankResponse> getAll(Integer pageNo, FindRankRequest request);

    List<XepHang> findAll();

}
