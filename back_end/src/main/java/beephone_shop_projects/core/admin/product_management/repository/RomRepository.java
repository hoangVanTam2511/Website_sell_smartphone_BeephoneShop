package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.RomResponce;
import beephone_shop_projects.entity.Rom;
import beephone_shop_projects.repository.IRomRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RomRepository extends IRomRepository {
    Page<Rom> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
             UPDATE  rom SET delected = :delected 
             where id = :id
            """, nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id") String id);

    List<Rom> findAllByDelected(Boolean delected);

    Rom findByDungLuong(Integer kichThuoc);

    @Query(value = """
            SELECT SUBSTRING(ma,5) + 1 FROM rom ORDER BY ma DESC LIMIT 0,1
            """, nativeQuery = true)
    String getNewCode();

    @Query(value = """
            SELECT ROW_NUMBER() OVER() AS stt, rom.id, rom.ma, rom.kich_thuoc AS kich_thuoc_rom FROM rom
            WHERE (rom.kich_thuoc LIKE :text OR rom.ma LIKE :text) AND delected = :delected
            """, nativeQuery = true)
    Page<RomResponce> searchRomByDelected(@Param("text") String text, Pageable pageable, @Param("delected") Integer delected);

}
