package beephone_shop_projects.infrastructure.constant;

public enum HttpStatus {

  SUCCESS_CODE(200),
  NO_CONTENT_CODE(204),
  NOT_FOUND(404),
  BAD_REQUEST(400),
  SERVER_ERROR_COMMON(500);

  private Integer statusCode;

  HttpStatus(Integer statusCode) {
    this.statusCode = statusCode;
  }

  public Integer getStatusCode() {
    return statusCode;
  }

  public void setStatusCode(Integer statusCode) {
    this.statusCode = statusCode;
  }
}
