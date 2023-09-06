package beephone_shop_projects.core.admin.order_management.utils;

import beephone_shop_projects.entity.HoaDon;

import java.util.HashMap;
import java.util.Map;

import static beephone_shop_projects.core.admin.order_management.constant.Constants.EntityCode.PREFIX_CODE_ORDER;
import static beephone_shop_projects.core.admin.order_management.constant.Constants.EntityCode.SUFFIX_CODE;

public class ConstantCodeEntityMapper {
  private Map<Object, String> constantMap;

  public ConstantCodeEntityMapper() {
    constantMap = new HashMap<>();
    constantMap.put(HoaDon.class, PREFIX_CODE_ORDER + SUFFIX_CODE);
  }

  public String getConstantEntityCodeByClazz(Class<?> clazz) {
    String constantEntityCode = constantMap.get(clazz);
    if (constantEntityCode != null) {
      return constantEntityCode;
    }
    return null;
  }
}
