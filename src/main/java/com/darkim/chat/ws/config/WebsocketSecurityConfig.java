package com.darkim.chat.ws.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

import static org.springframework.messaging.simp.SimpMessageType.*;

@Configuration
public class WebsocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    @Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
        messages
                .nullDestMatcher().authenticated()
                .simpDestMatchers("/app/**").fullyAuthenticated()
                .simpSubscribeDestMatchers("/user/queue/reply",
                        "/user/queue/errors", "/user/queue/status").fullyAuthenticated()
                .simpTypeMatchers(MESSAGE, SUBSCRIBE).denyAll();

    }

    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }
}
