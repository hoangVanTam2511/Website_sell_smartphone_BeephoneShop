package beephone_shop_projects.infrastructure.constant;

import beephone_shop_projects.utils.PropertiesReader;

public enum Message {

  SUCCESS("Success"),
  SERVER_ERROR_COMMON("Lỗi hệ thống, vui lòng thử lại sau!"),
  ORDER_NOT_EXIST(PropertiesReader.getProperty(PropertyKeys.ORDER_NOT_EXISTS));

  private String message;

  Message(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
