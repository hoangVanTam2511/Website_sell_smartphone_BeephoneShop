package beephone_shop_projects.infrastructure.exeption.rest;

import beephone_shop_projects.infrastructure.exeption.BeePhoneProjectExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class BeePhoneProjectExceptionRestHandler<Z extends Exception>
        extends BeePhoneProjectExceptionHandler<ResponseEntity<?>, Z> {

  @Override
  protected ResponseEntity<?> wrap(Z ex) {
    return new ResponseEntity<>(wrapApi(ex), HttpStatus.BAD_REQUEST);
  }

  protected abstract Object wrapApi(Z ex);
}