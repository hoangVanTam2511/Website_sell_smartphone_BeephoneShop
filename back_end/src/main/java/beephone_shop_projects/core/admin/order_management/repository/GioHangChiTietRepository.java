package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet, String> {

  @Query("select g from GioHangChiTiet g where g.gioHang.id = ?1")
  List<GioHangChiTiet> getAllByIdCart(String id);


}
