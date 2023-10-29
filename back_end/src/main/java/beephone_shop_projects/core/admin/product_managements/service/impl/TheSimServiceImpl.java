package beephone_shop_projects.core.admin.product_managements.service.impl;

import beephone_shop_projects.core.admin.order_management.service.impl.AbstractServiceImpl;
import beephone_shop_projects.core.admin.product_managements.converter.TheSimConverter;
import beephone_shop_projects.core.admin.product_managements.model.request.TheSimRequest;
import beephone_shop_projects.core.admin.product_managements.model.response.TheSimResponse;
import beephone_shop_projects.core.admin.product_managements.repository.TheSimRepository;
import beephone_shop_projects.core.admin.product_managements.service.TheSimService;
import beephone_shop_projects.entity.ManHinh;
import beephone_shop_projects.entity.TheSim;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class TheSimServiceImpl extends AbstractServiceImpl<TheSim, TheSimResponse, TheSimRequest, String> implements TheSimService {

  @Autowired
  private TheSimRepository theSimRepository;
  public TheSimServiceImpl(TheSimRepository repo, TheSimConverter converter) {
    super(repo, converter);
  }

  @Override
  public Page<TheSim> findAllSimCards(Integer pageNo) {
    Pageable pageable= PageRequest.of(pageNo-1,5);
    return theSimRepository.findAll(pageable);
  }

//  @Override
//  public TheSim add(TheSimRequest theSimRequest) {
//    Random random = new Random();
//    int number = random.nextInt(10000);
//    String code = String.format("DP%04d", number);
//    TheSim sim=new TheSim().builder()
//            .ma(code)
//            .loaiTheSim(theSimRequest.getLoaiTheSim())
//            .simMultiple(theSimRequest.getSimMultiple())
//            .status(theSimRequest.getStatus())
//            .build();
//    try {
//      return theSimRepository.save(sim);
//    } catch (Exception e) {
//      throw new RuntimeException(e);
//    }
//  }

}
