package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.PointOfSaleColorResponce;
import beephone_shop_projects.entity.MauSac;
import beephone_shop_projects.repository.IMauSacRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MauSacRepository extends IMauSacRepository {
    Page<MauSac> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  mau_sac SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<MauSac> findAllByDelected(Boolean delected);

    MauSac findByTenMauSac(String tenMauSac);

    @Query(value = """
    SELECT CONCAT( 'MAUSAC_',IF(count(*)  = 0,0,SUBSTRING(ma,8) + 1))   FROM mau_sac
    """,nativeQuery = true)
    String getNewCode();

    @Query(value = """
    		 SELECT distinct  ms.ten_mau_sac,anh.duong_dan from san_pham_chi_tiet spct
              JOIN anh  ON anh.id_chi_tiet_san_pham = spct.id
               JOIN cau_hinh  ch ON ch.id = spct.id_cau_hinh
               JOIN san_pham  sp ON sp.id = spct.id_san_pham
               JOIN mau_sac  ms ON ms.id = ch.id_mau_sac
               WHERE sp.id = :idProduct AND anh.trang_thai = 1
    """,nativeQuery = true)
    List<PointOfSaleColorResponce> getListMauSacByIdProduct(@Param("idProduct")String idProduct);

}
