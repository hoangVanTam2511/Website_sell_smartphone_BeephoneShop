package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.entity.Camera;
import beephone_shop_projects.entity.Chip;
import beephone_shop_projects.repository.IChipRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChipRepository extends IChipRepository {

    Page<Chip> findAllByDelected(Boolean delected, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = """
           UPDATE  chip SET delected = :delected 
           where id = :id
          """,nativeQuery = true)
    void updateDelected(@Param("delected") Boolean delected, @Param("id")String id);
}
