package beephone_shop_projects.core.admin.product_management.repository;

import beephone_shop_projects.entity.Anh;
import beephone_shop_projects.repository.IAnhRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;



@Repository
public interface AnhRepository extends IAnhRepository  {

    Page<Anh> findAll(Pageable pageable);
}
