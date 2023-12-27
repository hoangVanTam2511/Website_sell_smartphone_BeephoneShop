package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemCustomRepository extends JpaRepository<GioHangChiTiet, String> {

  @Query("""
          SELECT C FROM GioHangChiTiet C WHERE C.sanPhamChiTiet.id = ?1 AND C.gioHang.id = ?2
          """)
  Optional<GioHangChiTiet> findCartItemAlready(String productId, String cartId);
}
