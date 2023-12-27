package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.ImageRepository;
import beephone_shop_projects.entity.Image;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class ImageRepositoryImpl extends AbstractRepositoryImpl<Image, String> implements ImageRepository {
    private static final Logger logger = LoggerFactory.getLogger(ImageRepositoryImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Image> findAllImage() {
        return null;
    }

}