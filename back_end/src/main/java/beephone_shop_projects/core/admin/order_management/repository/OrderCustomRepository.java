package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.core.admin.order_management.model.response.OrderView;
import beephone_shop_projects.entity.HoaDon;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderCustomRepository extends JpaRepository<HoaDon, String> {

  @EntityGraph(attributePaths = "account")
  @Query("""
              SELECT new beephone_shop_projects.entity.HoaDon(H.id, a)
              FROM HoaDon H left join H.account a
          """)
  List<HoaDon> getAll();

  @Query("SELECT h FROM HoaDon h WHERE  h.loaiHoaDon = 0 AND h.trangThai = 7 ORDER BY h.createdAt DESC LIMIT 1")
  Optional<HoaDon> getOrderAtTheCounterAfterPayment();


}
