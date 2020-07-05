package com.darkim.chat.ws.util;

import com.darkim.chat.auth.error.BaseException;
import com.darkim.chat.auth.error.ErrorResponse;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.ws.model.ChatMessage;
import com.darkim.chat.ws.model.ConvertedChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

import java.security.Principal;

import static com.darkim.chat.auth.error.MessageKey.DEST_NOT_REACHABLE;
import static com.darkim.chat.auth.error.MessageKey.INVALID_CREDENTIALS;

@Component
public class MessageUtil {

    private SimpMessagingTemplate simpMessagingTemplate;

    private MessageResolver messageResolver;

    @Autowired
    public void setMessageResolver(MessageResolver messageResolver) {
        this.messageResolver = messageResolver;
    }

    @Autowired
    public void setSimpMessagingTemplate(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public void sendErrorMessage(StompHeaderAccessor accessor) {
        String sessionId = accessor.getSessionId();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setFailedAt(INVALID_CREDENTIALS);
        errorResponse.setFailureReason(messageResolver.resolve(INVALID_CREDENTIALS.getKey()));
        simpMessagingTemplate.convertAndSendToUser(sessionId,"/queue/error",
                errorResponse, createHeaders(sessionId));
    }

    public void sendToUser(Principal principal, ChatMessage chatMessage) {
        ConvertedChatMessage convertedChatMessage = ConvertedChatMessage.builder()
                .from(principal.getName())
                .to(chatMessage.getTo())
                .message(chatMessage.getMessage())
                .build();
        try {
            simpMessagingTemplate
                    .convertAndSendToUser(convertedChatMessage.getTo(), "/queue/reply", convertedChatMessage);
        } catch (Exception e) {
            throw new BaseException(DEST_NOT_REACHABLE, messageResolver.resolve(DEST_NOT_REACHABLE.getKey()));
        }
    }

    private MessageHeaders createHeaders(String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }
}
