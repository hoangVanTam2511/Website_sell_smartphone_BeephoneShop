package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.RamResponce;
import beephone_shop_projects.entity.Ram;
import beephone_shop_projects.repository.IRamRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RamRepository extends IRamRepository {
    Page<Ram> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  ram SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);

    List<Ram> findAllByDelected(Boolean delected);

    Ram findByDungLuong(Integer kichThuoc);

    @Query(value = """
    SELECT SUBSTRING(ma,5) + 1  FROM ram ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

    @Query(value = """
            SELECT ROW_NUMBER() OVER() AS stt, ram.id, ram.ma, ram.kich_thuoc AS kich_thuoc_ram FROM ram
            WHERE (ram.kich_thuoc LIKE :text OR ram.ma LIKE :text) AND delected = :delected
            """, nativeQuery = true)
    Page<RamResponce> searchRamByDelected(@Param("text") String text, Pageable pageable, @Param("delected")Integer delected);
}
