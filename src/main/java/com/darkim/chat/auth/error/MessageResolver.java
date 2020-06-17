package com.darkim.chat.auth.error;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MessageResolver {

    private static final Locale DEFAULT_LOCALE = Locale.US;

    private MessageSource messageSource;

    @Autowired
    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String resolve(String key) {
        return messageSource.getMessage(key, new Object[]{}, DEFAULT_LOCALE);
    }
}
