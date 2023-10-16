package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.core.admin.product_management.model.responce.ChipResponce;
import beephone_shop_projects.core.admin.product_management.model.responce.PinResponce;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.repository.IChipRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChipRepository extends IChipRepository {

    Page<Chip> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  chip SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);


    List<Chip> findAllByDelected(Boolean delected);

    List<Chip> findByTenChip(String tenChip);


    @Query(value = """
    SELECT SUBSTRING(ma,6) + 1  FROM chip ORDER BY ma DESC LIMIT 0,1
    """,nativeQuery = true)
    String getNewCode();

    @Query(value = """
            SELECT ROW_NUMBER() OVER() AS stt, chip.id, chip.ma, chip.ten_chip FROM chip
            WHERE (chip.ten_chip LIKE :text OR chip.ma LIKE :text) and delected = :delected
            """, nativeQuery = true)
    Page<ChipResponce> searchChip(@Param("text") String text, Pageable pageable, @Param("delected") Integer delected);

}
