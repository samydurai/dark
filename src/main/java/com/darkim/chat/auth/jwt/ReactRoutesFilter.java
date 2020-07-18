package com.darkim.chat.auth.jwt;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
@Order(99)
public class ReactRoutesFilter extends OncePerRequestFilter {

    private static Set<String> REACT_ROUTES = Set
            .of("/login", "/register", "/chat");


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String requestURI = httpServletRequest.getRequestURI();
        if (REACT_ROUTES.contains(requestURI)) {
            httpServletResponse.sendRedirect("/");
            return;
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
