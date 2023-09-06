package beephone_shop_projects.core.admin.order_management.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ErrorResponse {

  private Integer statusCode;

  private String message;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private Date timestamp;

  public ErrorResponse(Integer statusCode, String message) {
    this.statusCode = statusCode;
    this.message = message;
  }


}
