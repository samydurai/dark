package com.darkim.chat.flow.api;

import com.darkim.chat.flow.service.ChatFlowService;
import com.darkim.chat.flow.service.UserIgnoreRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@RestController
public class ChatController {

    private ChatFlowService chatFlowService;

    @Autowired
    public void setChatFlowService(ChatFlowService chatFlowService) {
        this.chatFlowService = chatFlowService;
    }

    @RequestMapping(path = "/user/{userId}/check", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Boolean> isUserExists(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(chatFlowService.isUserExists(userId));
    }

    @RequestMapping(path = "/user/{userId}/ignore", method = RequestMethod.POST)
    public ResponseEntity<Void> ignoreUsers(@PathVariable("userId") String userId, @RequestBody UserIgnoreRequest userIgnoreRequest) {
        chatFlowService.ignoreUsers(userId, userIgnoreRequest);
        return ResponseEntity.ok().build();
    }
}
