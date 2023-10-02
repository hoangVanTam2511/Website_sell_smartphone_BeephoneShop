package beephone_shop_projects.infrastructure.constant;

public class ConstantSystems {

  public static final String ENCODING_UTF8 = "UTF-8";

  public class FileProperties {
    private FileProperties() {
    }

    public static final String VERSION = "v1.0";
    public static final String PROPERTIES_APPLICATION = "application.properties";
    public static final String PROPERTIES_VALIDATION = "messages.properties";
  }

  public class PaginationConstants {
    public static final Integer currentPage = 1;
    public static final Integer pageSize = 5;
  }

  public class EntityCode {
    public static final String PREFIX_CODE_ORDER = "HD";
    public static final String PREFIX_CODE_CART = "CART";
    public static final String PREFIX_CODE_PAYMENT = "PAYM";
    public static final String SUFFIX_CODE = "000000";

    public static final String CODE_ORDER = PREFIX_CODE_ORDER + SUFFIX_CODE;
    public static final String CODE_CART = PREFIX_CODE_CART + SUFFIX_CODE;
    public static final String CODE_PAYMENT = PREFIX_CODE_PAYMENT + SUFFIX_CODE;
  }

}
