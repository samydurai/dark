package com.darkim.chat.auth.error;

import lombok.Getter;

@Getter
public enum MessageKey {
    USER_NOT_FOUND("user_not_found"),
    AUTH_HEADER_NOT_FOUND("auth_header_not_found"),
    INVALID_CREDENTIALS("invalid_credentials"),
    USER_ID_TAKEN("user_id_taken");

    private String key;

    MessageKey(String key) {
        this.key = key;
    }
}
