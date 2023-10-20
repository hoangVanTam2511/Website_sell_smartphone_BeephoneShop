package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.TheSimConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.TheSimRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheSimResponse;
import beephone_shop_projects.core.admin.product_managements.repository.TheSimRepository;
import beephone_shop_projects.core.admin.product_managements.service.TheSimService;
import beephone_shop_projects.entity.TheSim;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class TheSimServiceImpl extends AbstractServiceImpl<TheSim, TheSimResponse, TheSimRequest, String> implements TheSimService {

  public TheSimServiceImpl(TheSimRepository repo, TheSimConverter converter) {
    super(repo, converter);
  }

  @Override
  public Page<TheSim> findAllSimCards() {
    return null;
  }


}
