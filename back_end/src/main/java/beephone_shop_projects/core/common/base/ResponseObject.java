package beephone_shop_projects.core.common.base;

import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseObject<T> {

  private Integer code;
  private String message;
  private T data;

  public ResponseObject(T data) {
    success(data);
  }

  public ResponseObject(HttpStatus code, Message message) {
    error(code, message);
  }

  public void success(T data) {
    if (data != null) {
      this.code = HttpStatus.SUCCESS_CODE.getStatusCode();
      this.message = Message.SUCCESS.getMessage();
      this.data = data;
    }
  }

  public void error(HttpStatus code, Message message) {
    this.code = code.getStatusCode();
    this.message = message.getMessage();
  }

}
