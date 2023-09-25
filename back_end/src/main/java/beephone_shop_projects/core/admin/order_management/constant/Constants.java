package beephone_shop_projects.core.admin.order_management.constant;

public class Constants {

  public class Api {
    public static final String API_ORDER_URI = "/api/orders";
    public static final String API_CART_URI = "/api/carts";
  }

  public class EntityCode {
    public static final String PREFIX_CODE_ORDER = "HD";
    public static final String PREFIX_CODE_CART = "CART";
    public static final String PREFIX_CODE_PAYMENT = "PAYM";
    public static final String SUFFIX_CODE = "000000";

    public static final String CODE_ORDER_FIRST = PREFIX_CODE_ORDER + SUFFIX_CODE;
    public static final String CODE_CART_FIRST = PREFIX_CODE_CART + SUFFIX_CODE;
    public static final String CODE_PAYMENT_FIRST = PREFIX_CODE_PAYMENT + SUFFIX_CODE;
  }


}
