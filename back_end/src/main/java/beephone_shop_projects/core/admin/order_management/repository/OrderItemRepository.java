package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.core.admin.order_management.model.request.OrderItemRequest;
import beephone_shop_projects.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<HoaDonChiTiet, String> {

  @Query("SELECT C FROM HoaDonChiTiet C WHERE C.sanPhamChiTiet.id = ?1 AND C.hoaDon.id = ?2")
  Optional<HoaDonChiTiet> findProductAlreadyExistInCartItemOrder(String idProduct, String idOrder);



}
