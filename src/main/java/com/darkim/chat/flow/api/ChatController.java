package com.darkim.chat.flow.api;

import com.darkim.chat.flow.model.UserWatchRequest;
import com.darkim.chat.flow.service.ChatFlowService;
import com.darkim.chat.flow.model.UserIgnoreRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequestMapping("/api/flow")
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

    @RequestMapping(path = "/ignore", method = RequestMethod.POST)
    public ResponseEntity<Void> ignoreUsers(Principal principal, @RequestBody UserIgnoreRequest userIgnoreRequest) {
        chatFlowService.ignoreUsers(principal.getName(), userIgnoreRequest);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(path = "/watch", method = RequestMethod.POST)
    public ResponseEntity<Void> watchUsers(Principal principal, @RequestBody UserWatchRequest userWatchRequest) {
        chatFlowService.watchUsers(principal.getName(), userWatchRequest);
        return ResponseEntity.ok().build();
    }
}
