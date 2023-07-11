package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.repository.IManHinhRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ManHinhRepository extends IManHinhRepository {
    Page<ManHinh> findAll(Pageable pageable);
}
