package beephone_shop_projects.repository;

import beephone_shop_projects.entity.KhuyenMaiChiTiet;
import beephone_shop_projects.entity.KhuyenMaiChiTietId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IKhuyenMaiChiTietRepository extends JpaRepository<KhuyenMaiChiTiet, KhuyenMaiChiTietId> {
}
