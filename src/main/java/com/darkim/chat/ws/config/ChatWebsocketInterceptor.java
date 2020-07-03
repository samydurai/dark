package com.darkim.chat.ws.config;

import com.darkim.chat.auth.error.ErrorResponse;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.auth.jwt.JWTUtil;
import com.darkim.chat.auth.provider.config.ChatUserDetailsService;
import com.darkim.chat.ws.util.MessageUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static com.darkim.chat.auth.error.MessageKey.INVALID_CREDENTIALS;

@Component
public class ChatWebsocketInterceptor implements ChannelInterceptor {

    private JWTUtil jwtUtil;

    private ChatUserDetailsService userDetailsService;

    private MessageUtil messageUtil;

    @Autowired
    public void setMessageUtil(MessageUtil messageUtil) {
        this.messageUtil = messageUtil;
    }

    @Autowired
    public void setUserDetailsService(ChatUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void setJwtUtil(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Message<?> preSend(final Message<?> message, final MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT == accessor.getCommand()) {
            Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
            String jwt = (String) sessionAttributes.get("jwtToken");
            String serverSetXSRFToken = (String) sessionAttributes.get("xsrfToken");
            List<String> authorization = accessor.getNativeHeader("CSRF-TOKEN");
            String xsrfFromRequestHeader = authorization.get(0);
            String username = jwtUtil.extractUsername(jwt);
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, Collections.singleton((GrantedAuthority) () -> "USER"));
                Claims claims = jwtUtil.extractAllClaims(jwt);
                String csrfTokenInJWT = (String) claims.getOrDefault("csrf-token", null);
                if (serverSetXSRFToken != null && (serverSetXSRFToken.equals(xsrfFromRequestHeader))) {
                    if (serverSetXSRFToken.equals(csrfTokenInJWT)) {
                        accessor.setUser(usernamePasswordAuthenticationToken);
                    }
                } else {
                    throwAuthenticationException(accessor);
                }
            } else {
                throwAuthenticationException(accessor);
            }
        }
        return message;
    }

    private void throwAuthenticationException(StompHeaderAccessor accessor) {
        messageUtil.sendErrorMessage(accessor);
        throw new BadCredentialsException("Please login to chat.");
    }
}
