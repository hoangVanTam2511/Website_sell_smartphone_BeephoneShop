package beephone_shop_projects.infrastructure.exeption.rest;

import beephone_shop_projects.infrastructure.constant.Message;

public class RestApiException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  private String message;

  public RestApiException() {

  }

  public RestApiException(Message message) {
    this.message = message.getMessage();
  }

  public RestApiException(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

}
