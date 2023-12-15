package beephone_shop_projects.core.admin.order_management.repository;

import beephone_shop_projects.core.admin.order_management.model.response.OrderView;
import beephone_shop_projects.entity.HoaDon;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderCustomRepository extends JpaRepository<HoaDon, String> {

  @EntityGraph(attributePaths = "account")
  @Query("""
              SELECT new beephone_shop_projects.entity.HoaDon(H.id, a)
              FROM HoaDon H left join H.account a
          """)
  List<HoaDon> getAll();


}
