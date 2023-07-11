package beephone_shop_projects.repository;

import beephone_shop_projects.entity.GioHangChiTiet;
import beephone_shop_projects.entity.GioHangChiTietId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IGioHangChiTietRepository extends JpaRepository<GioHangChiTiet, GioHangChiTietId> {
}
