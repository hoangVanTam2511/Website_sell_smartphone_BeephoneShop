package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.HinhThucSanPham;
import beephone_shop_projects.repository.IHinhThucSanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface HinhThucSanPhamRepository extends IHinhThucSanPhamRepository {
    Page<HinhThucSanPham> findAllByDelected(Boolean delected, Pageable pageable);
    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  hinh_thuc_san_pham SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<HinhThucSanPham> findAllByDelected(Boolean delected);

    HinhThucSanPham findByHinhThuc(BigDecimal hinhThuc);
}
