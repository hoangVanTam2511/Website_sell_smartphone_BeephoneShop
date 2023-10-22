package beephone_shop_projects.core.admin.product_managements.repository.impl;

import beephone_shop_projects.core.admin.order_management.repository.impl.AbstractRepositoryImpl;
import beephone_shop_projects.core.admin.product_managements.repository.TheSimRepository;
import beephone_shop_projects.entity.TheSim;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public class TheSimRepositoryImpl extends AbstractRepositoryImpl<TheSim, String> implements TheSimRepository {

  @Override
  public Page<TheSim> findAllSimCards() {
    return null;
  }
}
