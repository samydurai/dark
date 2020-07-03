package com.darkim.chat.ws.api;

import com.darkim.chat.auth.error.BaseException;
import com.darkim.chat.auth.error.ErrorResponse;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.ws.model.ChatMessage;
import com.darkim.chat.ws.model.ConvertedChatMessage;
import com.darkim.chat.ws.util.MessageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

import static com.darkim.chat.auth.error.MessageKey.DEST_NOT_REACHABLE;
import static com.darkim.chat.auth.error.MessageKey.SELF_MESSAGE;

@Controller
@Slf4j
public class ChatWebsocketController {

    private MessageUtil messageUtil;

    private MessageResolver messageResolver;

    @Autowired
    public void setMessageResolver(MessageResolver messageResolver) {
        this.messageResolver = messageResolver;
    }

    @Autowired
    public void setMessageUtil(MessageUtil messageUtil) {
        this.messageUtil = messageUtil;
    }

    @MessageMapping("/chat")
    public void sendMessage(ChatMessage chatMessage, Principal principal) {
        if (principal.getName().equals(chatMessage.getTo())) {
            log.info("Cannot send messages to himself.  So not sending it back.");
            throw new BaseException(SELF_MESSAGE, messageResolver.resolve(SELF_MESSAGE.getKey()));
        }
        messageUtil.sendToUser(principal, chatMessage);
    }

    @MessageExceptionHandler
    @SendToUser(value="/queue/errors", broadcast=false)
    public ErrorResponse handleException(Exception e) {
        ErrorResponse errorResponse = new ErrorResponse();
        if (e instanceof BaseException) {
            BaseException be = (BaseException) e;
            errorResponse.setFailedAt(be.getMessageKey());
            errorResponse.setFailureReason(be.getFailureReason());
        } else {
            errorResponse.setFailureReason(e.getMessage());
        }
        return errorResponse;
    }
}
