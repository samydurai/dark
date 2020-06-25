package com.darkim.chat.flow.api;

import com.darkim.chat.flow.service.ChatFlowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public class ChatController {

    private ChatFlowService chatFlowService;

    @Autowired
    public void setChatFlowService(ChatFlowService chatFlowService) {
        this.chatFlowService = chatFlowService;
    }

    @RequestMapping(path = "/user/{userId}/check", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> isUserExists(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(chatFlowService.isUserExists(userId));
    }
}
