package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamKhuyenMaiResponse;
import beephone_shop_projects.repository.ISanPhamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface SanPhamKhuyenMaiRepository extends ISanPhamRepository {

    @Query(value = """
            SELECT a.id,a.ma,a.ten_san_pham,a.delected
            FROM san_pham a 
            ORDER BY a.created_at DESC 
            """, nativeQuery = true)
    List<SanPhamKhuyenMaiResponse> findSanPhamKhuyenMai();
}
