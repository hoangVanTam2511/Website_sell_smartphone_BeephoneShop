package beephone_shop_projects.infrastructure.exeption.rest;

import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ApiError {

  private Integer code;

  private String message;

  private Object data;

  private String codeMessage;

  public ApiError(HttpStatus code, String message, Object data) {
    this.code = code.getStatusCode();
    this.message = message;
    this.data = data;
  }

  public ApiError(HttpStatus code, Message message, Object data, Message codeMessage) {
    this.code = code.getStatusCode();
    this.message = message.getMessage();
    this.data = data;
    this.codeMessage = codeMessage.name();
  }
}
