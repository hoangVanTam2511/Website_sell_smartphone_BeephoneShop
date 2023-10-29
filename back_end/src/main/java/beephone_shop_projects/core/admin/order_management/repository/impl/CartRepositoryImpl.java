package beephone_shop_projects.core.admin.order_management.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.CartRepository;
import beephone_shop_projects.entity.GioHang;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class CartRepositoryImpl extends AbstractRepositoryImpl<GioHang, String> implements CartRepository {
  private static final Logger logger = LoggerFactory.getLogger(CartRepository.class);

}