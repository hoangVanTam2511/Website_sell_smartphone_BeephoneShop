package beephone_shop_projects.infrastructure.exeption.rest;

import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public final class UnknownExceptionRestHandler extends
        BeePhoneProjectExceptionRestHandler<Exception> {

    @Override
    protected Object wrapApi(Exception ex) {
        return ex.getMessage();
    }
}

