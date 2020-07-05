package com.darkim.chat.flow.api;

import com.darkim.chat.flow.model.UserProfile;
import com.darkim.chat.flow.model.UserWatchRequest;
import com.darkim.chat.flow.model.UserWatchResponse;
import com.darkim.chat.flow.service.ChatFlowService;
import com.darkim.chat.flow.model.UserIgnoreRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

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

    @RequestMapping(path = "/profile", method = RequestMethod.GET)
    public ResponseEntity<UserProfile> loadUserProfile(Principal principal) {
        UserProfile userProfile = UserProfile.builder()
                .username(principal.getName())
                .build();
        return ResponseEntity.ok(userProfile);
    }

    @RequestMapping(path = "/watch", method = RequestMethod.GET)
    public ResponseEntity<List<UserWatchResponse>> getWatchList(Principal principal) {
        return ResponseEntity.ok(chatFlowService.getWatchList(principal.getName()));
    }

    @RequestMapping(path = "/ignore", method = RequestMethod.GET)
    public ResponseEntity<Set<String>> getIgnoreList(Principal principal) {
        return ResponseEntity.ok(chatFlowService.getIgnoreList(principal.getName()));
    }
}
