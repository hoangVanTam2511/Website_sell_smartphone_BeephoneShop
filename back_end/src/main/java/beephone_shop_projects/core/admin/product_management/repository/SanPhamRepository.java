package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.SanPham;
import beephone_shop_projects.repository.ISanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends ISanPhamRepository {
    Page<SanPham> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  san_pham SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<SanPham> findAllByDelected(Boolean delected);


    SanPham findByTen(String ten);
}
