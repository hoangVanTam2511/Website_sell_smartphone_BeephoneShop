package beephone_shop_projects.utils;

import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;

import java.util.HashMap;
import java.util.Map;

import static beephone_shop_projects.infrastructure.constant.ConstantSystems.EntityCode.CODE_CART;
import static beephone_shop_projects.infrastructure.constant.ConstantSystems.EntityCode.CODE_ORDER;
import static beephone_shop_projects.infrastructure.constant.ConstantSystems.EntityCode.CODE_PAYMENT;

public class EntityCodeMapper {
  private Map<Object, String> constantMap;

  public EntityCodeMapper() {
    constantMap = new HashMap<>();
    constantMap.put(HoaDon.class, CODE_ORDER);
    constantMap.put(GioHang.class, CODE_CART);
    constantMap.put(HinhThucThanhToan.class, CODE_PAYMENT);
  }

  public String getConstantEntityCodeByClazz(Class<?> clazz) {
    String constantEntityCode = constantMap.get(clazz);
    if (constantEntityCode != null) {
      return constantEntityCode;
    }
    return null;
  }

  public int getStartIndex(String entityCode) {
    StringBuilder stringBuilder = new StringBuilder();
    for (char c : entityCode.toCharArray()) {
      if (Character.isLetter(c)) {
        stringBuilder.append(c);
      }
    }

    return stringBuilder.length() + 1;
  }

}
