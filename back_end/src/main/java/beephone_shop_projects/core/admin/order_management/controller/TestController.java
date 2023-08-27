package beephone_shop_projects.core.admin.order_management.controller;

import beephone_shop_projects.core.admin.order_management.repository.HoaDonRepository;
import beephone_shop_projects.core.admin.order_management.service.impl.HoaDonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.InvocationTargetException;

@RestController
@RequestMapping("/api/test")
public class TestController {

  @Autowired
  private HoaDonServiceImpl hoaDonService;

  @Autowired
  private HoaDonRepository hoaDonRepository;

  @GetMapping
  public ResponseEntity<?> home() {
    return ResponseEntity.ok(null);
  }

  @GetMapping("/orders")
  public ResponseEntity<?> home1(@RequestParam(value = "currentPage", defaultValue = "1") Integer currentPage) throws InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
    return ResponseEntity.ok(hoaDonRepository.getMaxEntityCode());
  }
}
