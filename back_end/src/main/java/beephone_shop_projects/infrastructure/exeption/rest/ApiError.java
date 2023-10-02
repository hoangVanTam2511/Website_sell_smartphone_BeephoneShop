package beephone_shop_projects.infrastructure.exeption.rest;

import beephone_shop_projects.infrastructure.constant.HttpStatusCode;
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

//  private String codeMessage;
//
//  private String codeMessageValue;

  public ApiError(HttpStatusCode code, Message message, Object data) {
    this.code = code.getStatusCode();
    this.message = message.getMessage();
    this.data = data;
  }

}
