package beephone_shop_projects.core.admin.promotion_management.repository;

import beephone_shop_projects.core.admin.promotion_management.model.reponse.SanPhamKhuyenMaiResponse;
import beephone_shop_projects.core.admin.promotion_management.model.request.FindSanPhamKhuyenMaiRequest;
import beephone_shop_projects.core.admin.voucher_management.model.request.FindVoucherRequest;
import beephone_shop_projects.repository.ISanPhamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface SanPhamKhuyenMaiRepository extends ISanPhamRepository {

    @Query(value = """
            SELECT a.id, a.ma, a.ten_san_pham, a.delected, a.id_hang, h.ten_hang
            FROM san_pham a LEFT JOIN hang h ON a.id_hang = h.id WHERE a.trang_thai = 0
            AND ((:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR a.ma LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR a.ten_san_pham LIKE :#{'%' + #request.keyword + '%'}) 
             OR (:#{#request.keyword} IS NULL OR :#{#request.keyword} = '' OR h.ten_hang LIKE :#{'%' + #request.keyword + '%'}))
            ORDER BY a.created_at DESC 
            """, nativeQuery = true)
    List<SanPhamKhuyenMaiResponse> findSanPhamKhuyenMai(@Param("request") FindSanPhamKhuyenMaiRequest request);
}
