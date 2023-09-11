package beephone_shop_projects.core.admin.order_management.constant;

public class Constants {

  public class GhnApi {
    public static final String GHN_ROOT_TOKEN = "62124d79-4ffa-11ee-b1d4-92b443b7a897";
    public static final String GHN_ROOT_URL_PROVINCE = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
  }

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
