package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Imei;
import beephone_shop_projects.repository.IImeiRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ImeiRepository extends IImeiRepository {

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  imei SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected,@Param("id")String id);

    Page<Imei> findAllByDelected(Boolean delected, Pageable pageable);


    @Query(value = """
            SELECT * FROM imei
            WHERE id_chi_tiet_san_pham = :idChiTietSanPham and trang_thai = :trangThai
            """,nativeQuery = true)
    Page<Imei> findAllByIdChiTietSanPhamAndDelected(@Param("idChiTietSanPham") String idChiTietSanPham,
                                                    @Param("trangThai")Integer trangThai, Pageable pageable);
}
