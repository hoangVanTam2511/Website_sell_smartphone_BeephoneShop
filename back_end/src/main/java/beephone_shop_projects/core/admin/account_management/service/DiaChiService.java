package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.DiaChiKhachHangRequest;
import beephone_shop_projects.entity.DiaChi;

import java.util.List;
import java.util.UUID;

public interface DiaChiService {
    List<DiaChi> getAllDiaChi();
    DiaChi getOne(UUID id);
    DiaChi addDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest, UUID id);
    DiaChi addKH(DiaChiKhachHangRequest request);
    DiaChi updateDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest,UUID id);

}
