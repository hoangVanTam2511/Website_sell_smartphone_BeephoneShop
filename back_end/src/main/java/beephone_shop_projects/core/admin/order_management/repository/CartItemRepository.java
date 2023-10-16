package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.core.admin.order_management.model.request.CartItemRequest;
import beephone_shop_projects.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends GenericRepository<GioHangChiTiet, String> {

//  @Query("select g from GioHangChiTiet g where g.sanPhamChiTiet.id = ?1 and g.gioHang.id = ?2")
  Optional<GioHangChiTiet> findProductAlreadyExistInCart(CartItemRequest req);

//  GioHangChiTiet findProductAlreadyExistInCart(CartItemRequest req);

}
