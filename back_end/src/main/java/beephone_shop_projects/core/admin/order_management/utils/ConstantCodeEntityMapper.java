package beephone_shop_projects.core.admin.order_management.utils;

import beephone_shop_projects.entity.GioHang;
import beephone_shop_projects.entity.HinhThucThanhToan;
import beephone_shop_projects.entity.HoaDon;

import java.util.HashMap;
import java.util.Map;

import static beephone_shop_projects.core.admin.order_management.constant.Constants.EntityCode.CODE_CART_FIRST;
import static beephone_shop_projects.core.admin.order_management.constant.Constants.EntityCode.CODE_ORDER_FIRST;
import static beephone_shop_projects.core.admin.order_management.constant.Constants.EntityCode.CODE_PAYMENT_FIRST;

public class ConstantCodeEntityMapper {
  private Map<Object, String> constantMap;

  public ConstantCodeEntityMapper() {
    constantMap = new HashMap<>();
    constantMap.put(HoaDon.class, CODE_ORDER_FIRST);
    constantMap.put(GioHang.class, CODE_CART_FIRST);
    constantMap.put(HinhThucThanhToan.class, CODE_PAYMENT_FIRST);
  }

  public String getConstantEntityCodeByClazz(Class<?> clazz) {
    String constantEntityCode = constantMap.get(clazz);
    if (constantEntityCode != null) {
      return constantEntityCode;
    }
    return null;
  }

  public int getStartIndex(String firstEntityCode) {
    StringBuilder stringBuilder = new StringBuilder();
    for (char c : firstEntityCode.toCharArray()) {
      if (Character.isLetter(c)) {
        stringBuilder.append(c);
      }
    }

    return stringBuilder.length() + 1;
  }

}
