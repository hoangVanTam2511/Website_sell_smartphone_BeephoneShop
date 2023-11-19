package beephone_shop_projects.core.admin.statistic_management.repository;

import beephone_shop_projects.core.admin.statistic_management.model.response.ThongKeDonHangResponse;
import org.springframework.data.jpa.repository.Query;

public interface ThongKeDonHangRepository {

    @Query(value = """

            """, nativeQuery = true)
    ThongKeDonHangResponse getDonHang();
}
