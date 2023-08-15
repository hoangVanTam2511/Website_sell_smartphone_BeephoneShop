package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Camera;
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

    Pin findByDungLuong(Integer dungLuong);
}
