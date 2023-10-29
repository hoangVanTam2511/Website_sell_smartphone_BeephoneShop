package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.PinResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.RamResponce;
import beephone_shop_projects.entity.Pin;
import beephone_shop_projects.repository.IPinRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PinRepository extends IPinRepository {
    Page<Pin> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  pin SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<Pin> findAllByDelected(Boolean delected);

    List<Pin> findByDungLuong(Integer dungLuong);

    @Query(value = """
    SELECT SUBSTRING(ma,5) + 1 FROM pin ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

    @Query(value = """
            SELECT ROW_NUMBER() OVER() AS stt, pin.id, pin.ma, pin.dung_luong AS dung_luong_pin FROM pin
            WHERE (pin.dung_luong LIKE :text OR pin.ma LIKE :text) AND delected = :delected
            """, nativeQuery = true)
    Page<PinResponce> searchPinByDelected(@Param("text") String text, Pageable pageable, @Param("delected") Integer delected);
}
