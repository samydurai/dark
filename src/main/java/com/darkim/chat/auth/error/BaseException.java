package com.darkim.chat.auth.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BaseException extends RuntimeException {

    private MessageKey messageKey;

    private String failureReason;
}
