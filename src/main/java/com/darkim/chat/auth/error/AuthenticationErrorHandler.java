package com.darkim.chat.auth.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class AuthenticationErrorHandler {

    @ExceptionHandler(value = BaseException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handle(BaseException baseException) {
        log.error("Base exception: key - {}, reason {}",
                baseException.getMessageKey(), baseException.getFailureReason(), baseException);
        return ErrorResponse.builder()
                .failedAt(baseException.getMessageKey())
                .failureReason(baseException.getFailureReason())
                .build();
    }

}
