package beephone_shop_projects.infrastructure.exeption.rest;

import beephone_shop_projects.infrastructure.constant.HttpStatus;
import beephone_shop_projects.infrastructure.constant.Message;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Path;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestControllerAdvice
public final class RestExceptionHandler extends
        BeePhoneProjectExceptionRestHandler<ConstraintViolationException> {

  // Bad Request
  @ExceptionHandler(RestApiException.class)
  public ResponseEntity<?> handlerRestApiExceptionGlobal(RestApiException restApiException) {
    ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST,
            restApiException.getMessage(), null);
    return new ResponseEntity<>(apiError, org.springframework.http.HttpStatus.BAD_REQUEST);
  }
//
//  // Exception common
//  @ExceptionHandler(RuntimeException.class)
//  public ResponseEntity<?> handlerExceptionGlobal(RuntimeException runtimeException) {
//    ApiError apiError = new ApiError(HttpStatus.SERVER_ERROR_COMMON,
//            Message.SERVER_ERROR_COMMON, null, Message.SERVER_ERROR_COMMON);
//    return new ResponseEntity<>(apiError, org.springframework.http.HttpStatus.BAD_REQUEST);
//  }

  @Override
  protected Object wrapApi(ConstraintViolationException ex) {
    Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
    List<ErrorModel> errors = violations.stream().map(violation ->
            new ErrorModel(getPropertyName(violation.getPropertyPath()),
                    violation.getMessage())).collect(Collectors.toList());
//    HashMap<String, String> error = new HashMap<>();
//    violations.forEach(el -> {
//      error.put(getPropertyName(el.getPropertyPath()), el.getMessage());
//    });
    return errors;
  }

  private String getPropertyName(Path path) {
    String pathStr = path.toString();
    String[] comps = pathStr.split("\\.");
    if (comps.length > 0) {
      return comps[comps.length - 1];
    } else {
      return pathStr;
    }
  }
}
