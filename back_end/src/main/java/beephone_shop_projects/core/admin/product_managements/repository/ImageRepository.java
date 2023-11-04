package beephone_shop_projects.core.admin.product_managements.repository;

import beephone_shop_projects.core.admin.order_management.repository.GenericRepository;
import beephone_shop_projects.entity.Image;
import org.springframework.data.domain.Page;

public interface ImageRepository extends GenericRepository<Image, String> {

    Page<Image> findAllImage();


}
