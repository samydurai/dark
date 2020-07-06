package com.darkim.chat.ws.api;

import com.darkim.chat.auth.error.BaseException;
import com.darkim.chat.auth.error.ErrorResponse;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.flow.dao.UserChatPreferenceRepository;
import com.darkim.chat.ws.model.*;
import com.darkim.chat.ws.util.MessageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Set;

import static com.darkim.chat.auth.error.MessageKey.DEST_NOT_REACHABLE;
import static com.darkim.chat.auth.error.MessageKey.SELF_MESSAGE;

@Controller
@Slf4j
public class ChatWebsocketController {

    private MessageUtil messageUtil;

    private MessageResolver messageResolver;

    private CacheManager cacheManager;

    private UserChatPreferenceRepository chatPreferenceRepository;

    @Autowired
    public void setChatPreferenceRepository(UserChatPreferenceRepository chatPreferenceRepository) {
        this.chatPreferenceRepository = chatPreferenceRepository;
    }

    @Autowired
    public void setCacheManager(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

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

    @MessageMapping("/ping")
    public void userPing(UserPingRequest userPingRequest, Principal principal) {
        if (userPingRequest != null) {
            UserStatus userStatus = userPingRequest.getUserStatus();
            if (UserStatus.ONLINE == userStatus) {
                String onlineUser = principal.getName();
                Cache userStateCache = cacheManager.getCache("user_state");
                boolean isFirstPing = userStateCache.get(onlineUser) == null;
                userStateCache.put(onlineUser, 1);
                if (isFirstPing) {
                    Set<String> usersWatchingTheOnlineUser = chatPreferenceRepository.getAllUsersWatching(onlineUser);
                    StateEvent stateEvent = StateEvent.builder()
                            .username(onlineUser)
                            .userStatus(UserStatus.ONLINE)
                            .build();
                    usersWatchingTheOnlineUser.forEach(user -> messageUtil.sendStateEvent(user, stateEvent));
                }
            }
        }
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
