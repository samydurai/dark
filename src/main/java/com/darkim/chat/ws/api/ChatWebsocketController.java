package com.darkim.chat.ws.api;

import com.darkim.chat.ws.model.ChatMessage;
import com.darkim.chat.ws.model.ConvertedChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatWebsocketController {

    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public void setSimpMessagingTemplate(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/chat")
    public void sendMessage(ChatMessage chatMessage, Principal principal) {
        ConvertedChatMessage convertedChatMessage = ConvertedChatMessage.builder()
                .from(principal.getName())
                .to(chatMessage.getTo())
                .message(chatMessage.getMessage())
                .build();
        simpMessagingTemplate
                .convertAndSendToUser(convertedChatMessage.getTo(), "/queue/reply", convertedChatMessage);
    }

    /*@Scheduled(fixedDelay = 5000)
    public void sendMessage() {
        ConvertedChatMessage convertedChatMessage = ConvertedChatMessage.builder()
                .from("qwerty")
                .to("qwerty")
                .message("Hello man!")
                .build();
        simpMessagingTemplate
                .convertAndSendToUser("qwerty", "/queue/reply", convertedChatMessage);
    }

    @MessageExceptionHandler
    @SendToUser(value="/queue/errors", broadcast=false)
    public ApplicationError handleException(MyBusinessException exception) {
        // ...
        return appError;
    }*/
}
