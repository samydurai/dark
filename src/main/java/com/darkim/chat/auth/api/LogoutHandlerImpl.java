package com.darkim.chat.auth.api;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LogoutHandlerImpl implements LogoutHandler {

    @Override
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) {
        Cookie csrfCookie = new Cookie("XSRF-TOKEN", null);
        csrfCookie.setPath("/");
        csrfCookie.setMaxAge(0);
        Cookie jwtCookie = new Cookie("COOKIE_BEARER", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        httpServletResponse.addCookie(csrfCookie);
        httpServletResponse.addCookie(jwtCookie);
    }
}
