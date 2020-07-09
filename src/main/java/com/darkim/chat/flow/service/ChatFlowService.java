package com.darkim.chat.flow.service;

import com.darkim.chat.auth.dao.UserRepository;
import com.darkim.chat.flow.model.User;
import com.darkim.chat.auth.error.BaseException;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.flow.dao.UserChatPreferenceRepository;
import com.darkim.chat.flow.model.*;
import com.darkim.chat.ws.model.StateEvent;
import com.darkim.chat.ws.model.UserStatus;
import com.darkim.chat.ws.util.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ChatFlowService {

    private UserRepository userRepository;

    private MessageResolver messageResolver;

    private UserChatPreferenceRepository chatPreferenceRepository;

    private CacheManager cacheManager;

    private MessageUtil messageUtil;

    @Autowired
    public void setMessageUtil(MessageUtil messageUtil) {
        this.messageUtil = messageUtil;
    }

    @Autowired
    public void setCacheManager(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @Autowired
    public void setChatPreferenceRepository(UserChatPreferenceRepository chatPreferenceRepository) {
        this.chatPreferenceRepository = chatPreferenceRepository;
    }

    @Autowired
    public void setMessageResolver(MessageResolver messageResolver) {
        this.messageResolver = messageResolver;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean isUserExists(String userId) {
        if (StringUtils.isEmpty(userId)) {
            return false;
        }
        return userRepository.findActiveUser(userId) != null;
    }

    @Transactional
    public void ignoreUsers(String username, UserIgnoreRequest userIgnoreRequest) {
        User loggedInUser = getLoggedInUser(username);
        if (CollectionUtils.isEmpty(userIgnoreRequest.getIgnore())
                && CollectionUtils.isEmpty(userIgnoreRequest.getEnable())) {
            return;
        }
        ignoreUsers(userIgnoreRequest, loggedInUser);
        enableUsers(userIgnoreRequest, loggedInUser);

    }

    private void enableUsers(UserIgnoreRequest userIgnoreRequest, User loggedInUser) {
        Set<String> enableUsers = userIgnoreRequest.getEnable();
        enableUsers.removeIf(user -> loggedInUser.getUserName().equals(user));
        if (CollectionUtils.isEmpty(enableUsers)) {
            return;
        }
        Set<UserChatPreference> usersToBeEnabled = chatPreferenceRepository.getUsersToBeEnabled(loggedInUser.getUserName(), enableUsers);
        chatPreferenceRepository.deleteAll(usersToBeEnabled);
    }

    private void ignoreUsers(UserIgnoreRequest userIgnoreRequest, User loggedInUser) {
        String loggedInUserName = loggedInUser.getUserName();
        Set<String> usernamesToBeIgnored = userIgnoreRequest.getIgnore();
        usernamesToBeIgnored.removeIf(loggedInUserName::equals);
        Set<String> usernamesAlreadyIgnored = chatPreferenceRepository.getAllIgnoredUsers(loggedInUserName);
        usernamesToBeIgnored.removeIf(usernamesAlreadyIgnored::contains);
        Map<String, User> usernameToUserMap = userRepository.findAllUsers(usernamesToBeIgnored).stream()
                .collect(Collectors.toMap(User::getUserName, Function.identity()));
        List<UserChatPreference> userChatPreferences = usernamesToBeIgnored.stream()
                .map(usernameToUserMap::get)
                .map(userToBeIgnored -> UserChatPreference.from(loggedInUser, userToBeIgnored, PreferenceType.IGNORE))
                .collect(Collectors.toList());
        chatPreferenceRepository.saveAll(userChatPreferences);
    }

    @Transactional
    public void watchUsers(String username, UserWatchRequest userWatchRequest) {
        User loggedInUser = getLoggedInUser(username);
        if (CollectionUtils.isEmpty(userWatchRequest.getWatch())) {
            return;
        }
        watchUsers(loggedInUser, userWatchRequest);
        unwatchUsers(loggedInUser, userWatchRequest);
    }

    private void unwatchUsers(User loggedInUser, UserWatchRequest userWatchRequest) {
        Set<String> usernamesToBeUnwatched = userWatchRequest.getUnwatch();
        usernamesToBeUnwatched.removeIf(user -> loggedInUser.getUserName().equals(user));
        if (CollectionUtils.isEmpty(usernamesToBeUnwatched)) {
            return;
        }
        Set<UserChatPreference> usersToBeUnwatched = chatPreferenceRepository.getUsersToBeEnabled(loggedInUser.getUserName(), usernamesToBeUnwatched);
        chatPreferenceRepository.deleteAll(usersToBeUnwatched);
    }

    private void watchUsers(User loggedInUser, UserWatchRequest userWatchRequest) {
        Set<String> usersToWatch = userWatchRequest.getWatch();
        usersToWatch.removeIf(user -> loggedInUser.getUserName().equals(user));
        Set<String> usersBeingWatched = chatPreferenceRepository.getUsersBeingWatched(loggedInUser.getUserName());
        usersToWatch.removeIf(usersBeingWatched::contains);
        Map<String, User> usernameToUserMap = userRepository.findAllUsers(usersToWatch).stream()
                .collect(Collectors.toMap(User::getUserName, Function.identity()));
        List<UserChatPreference> userChatPreferences = usersToWatch.stream()
                .map(usernameToUserMap::get)
                .map(userToBeWatched -> UserChatPreference.from(loggedInUser, userToBeWatched, PreferenceType.WATCH))
                .collect(Collectors.toList());
        chatPreferenceRepository.saveAll(userChatPreferences);
        for (String userToWatch : usersToWatch) {
            Cache userStateCache = cacheManager.getCache("user_state");
            boolean isUserOnline = userStateCache.get(userToWatch) != null;
            StateEvent stateEvent = StateEvent.builder()
                    .username(userToWatch)
                    .userStatus(isUserOnline ? UserStatus.ONLINE : UserStatus.OFFLINE)
                    .build();
            messageUtil.sendStateEvent(loggedInUser.getUserName(), stateEvent);
        }


    }

    private User getLoggedInUser(String username) {
        if (StringUtils.isEmpty(username)) {
            throw new BaseException(MessageKey.INVALID_USER_NAME, messageResolver.resolve(MessageKey.INVALID_USER_NAME.getKey()));
        }
        User loggedInUser = userRepository.findActiveUser(username);
        if (loggedInUser == null) {
            throw new BaseException(MessageKey.INVALID_USER_NAME, messageResolver.resolve(MessageKey.INVALID_USER_NAME.getKey()));
        }
        return loggedInUser;
    }

    public List<UserWatchResponse> getWatchList(String username) {
        User loggedInUser = getLoggedInUser(username);
        Set<String> watchListOfLoggedInUser = chatPreferenceRepository.getWatchList(loggedInUser.getUserName());
        if (CollectionUtils.isEmpty(watchListOfLoggedInUser)) {
            return Collections.emptyList();
        }
        Cache userStateCache = cacheManager.getCache("user_state");
        List<UserWatchResponse> userWatchResponses = new ArrayList<>();
        for (String user : watchListOfLoggedInUser) {
            if (userStateCache.get(user) != null) {
                UserWatchResponse userWatchResponse = UserWatchResponse.builder()
                        .username(user)
                        .userStatus(UserStatus.ONLINE)
                        .build();
                userWatchResponses.add(userWatchResponse);
            } else {
                UserWatchResponse userWatchResponse = UserWatchResponse.builder()
                        .username(user)
                        .userStatus(UserStatus.OFFLINE)
                        .build();
                userWatchResponses.add(userWatchResponse);
            }
        }
        return userWatchResponses;
    }

    public Set<String> getIgnoreList(String username) {
        User loggedInUser = getLoggedInUser(username);
        return chatPreferenceRepository.getIgnoreList(loggedInUser.getUserName());
    }
}
