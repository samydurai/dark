package com.darkim.chat.cache;

import com.darkim.chat.flow.dao.UserChatPreferenceRepository;
import com.darkim.chat.ws.model.StateEvent;
import com.darkim.chat.ws.model.UserStatus;
import com.darkim.chat.ws.util.MessageUtil;
import com.github.benmanes.caffeine.cache.RemovalCause;
import com.github.benmanes.caffeine.cache.RemovalListener;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.checkerframework.checker.nullness.qual.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class CacheRemovalListener implements RemovalListener<String, Integer> {

    private MessageUtil messageUtil;

    private UserChatPreferenceRepository chatPreferenceRepository;

    @Autowired
    public void setMessageUtil(MessageUtil messageUtil) {
        this.messageUtil = messageUtil;
    }

    @Autowired
    public void setChatPreferenceRepository(UserChatPreferenceRepository chatPreferenceRepository) {
        this.chatPreferenceRepository = chatPreferenceRepository;
    }

    @Override
    public void onRemoval(@Nullable String userWentOffline, @Nullable Integer integer, @NonNull RemovalCause removalCause) {
        Set<String> usersWatchingOfflineUser = chatPreferenceRepository.getAllUsersWatching(userWentOffline);
        StateEvent stateEvent = StateEvent.builder()
                .username(userWentOffline)
                .userStatus(UserStatus.OFFLINE)
                .build();
        usersWatchingOfflineUser.forEach(user -> messageUtil.sendStateEvent(user, stateEvent));
    }
}
