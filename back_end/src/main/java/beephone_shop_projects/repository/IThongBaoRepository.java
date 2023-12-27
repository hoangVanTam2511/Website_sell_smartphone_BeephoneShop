package beephone_shop_projects.repository;

import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import beephone_shop_projects.entity.KhuyenMaiChiTietId;
import beephone_shop_projects.entity.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IThongBaoRepository extends JpaRepository<ThongBao, String> {
}
