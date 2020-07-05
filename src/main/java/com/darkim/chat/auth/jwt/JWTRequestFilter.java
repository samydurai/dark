package com.darkim.chat.auth.jwt;

import com.darkim.chat.auth.error.ErrorResponse;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.auth.provider.config.ChatUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    private final ChatUserDetailsService userDetailsService;

    private final JWTUtil jwtUtil;

    private final MessageResolver messageResolver;

    public JWTRequestFilter(ChatUserDetailsService userDetailsService, JWTUtil jwtUtil, MessageResolver messageResolver) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.messageResolver = messageResolver;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            String jwtToken = "COOKIE_BEARER";
            String csrfToken = "XSRF-TOKEN";
            String clientSetXSRFToken = "X-XSRF-TOKEN";
            Map<String, String> cookieToValueMap = Arrays.stream(cookies)
                    .collect(Collectors.toMap(Cookie::getName, Cookie::getValue));

            String username = null;
            String jwt = cookieToValueMap.get(jwtToken);
            String serverSetXSRFToken = cookieToValueMap.get(csrfToken);
            String xsrfFromRequestHeader = request.getHeader(clientSetXSRFToken);
            if (jwt != null) {
                username = jwtUtil.extractUsername(jwt);
            }
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                    if (jwtUtil.validateToken(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        usernamePasswordAuthenticationToken
                                .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        Claims claims = jwtUtil.extractAllClaims(jwt);
                        String csrfTokenInJWT = (String) claims.getOrDefault("csrf-token", null);
                        if (serverSetXSRFToken != null && (serverSetXSRFToken.equals(xsrfFromRequestHeader))) {
                            if (serverSetXSRFToken.equals(csrfTokenInJWT)) {
                                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                            }
                        }
                    }
                } catch (Exception e) {
                    ErrorResponse errorResponse = ErrorResponse.builder()
                            .failedAt(null)
                            .failureReason(messageResolver.resolve(MessageKey.INVALID_USER_NAME.getKey()))
                            .build();
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
                    return;
                }
            }
        }
        chain.doFilter(request, response);
    }
}
