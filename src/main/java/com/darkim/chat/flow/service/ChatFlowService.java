package com.darkim.chat.flow.service;

import com.darkim.chat.auth.dao.UserRepository;
import com.darkim.chat.auth.entity.User;
import com.darkim.chat.auth.error.BaseException;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.flow.dao.UserChatPreferenceRepository;
import com.darkim.chat.flow.model.PreferenceType;
import com.darkim.chat.flow.model.UserChatPreference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ChatFlowService {

    private UserRepository userRepository;

    private MessageResolver messageResolver;

    private UserChatPreferenceRepository chatPreferenceRepository;

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
    public void ignoreUsers(String userId, UserIgnoreRequest userIgnoreRequest) {
        if (StringUtils.isEmpty(userId)) {
            throw new BaseException(MessageKey.INVALID_USER_NAME, messageResolver.resolve(MessageKey.INVALID_USER_NAME.getKey()));
        }
        User loggedInUser = userRepository.findActiveUser(userId);
        if (loggedInUser == null) {
            throw new BaseException(MessageKey.INVALID_USER_NAME, messageResolver.resolve(MessageKey.INVALID_USER_NAME.getKey()));
        }
        if (CollectionUtils.isEmpty(userIgnoreRequest.getIgnoreUsers())
                && CollectionUtils.isEmpty(userIgnoreRequest.getEnableUsers())) {
            return;
        }
        ignoreUsers(userIgnoreRequest, loggedInUser);
        enableUsers(userIgnoreRequest, loggedInUser);

    }

    private void enableUsers(UserIgnoreRequest userIgnoreRequest, User loggedInUser) {
        Set<String> enableUsers = userIgnoreRequest.getEnableUsers();
        enableUsers.removeIf(user -> loggedInUser.getUserName().equals(user));
        if (CollectionUtils.isEmpty(enableUsers)) {
            return;
        }
        Set<UserChatPreference> usersToBeEnabled = chatPreferenceRepository.getUsersToBeEnabled(loggedInUser.getUserName(), enableUsers);
        chatPreferenceRepository.deleteAll(usersToBeEnabled);
    }

    private void ignoreUsers(UserIgnoreRequest userIgnoreRequest, User loggedInUser) {
        String loggedInUserName = loggedInUser.getUserName();
        Set<String> usernamesToBeIgnored = userIgnoreRequest.getIgnoreUsers();
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
}
