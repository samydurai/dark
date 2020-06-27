package com.darkim.chat.flow.service;

import com.darkim.chat.auth.dao.UserRepository;
import com.darkim.chat.auth.entity.User;
import com.darkim.chat.auth.error.BaseException;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChatFlowService {

    private UserRepository userRepository;

    private MessageResolver messageResolver;

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

    public void ignoreUsers(String userId, UserIgnoreRequest userIgnoreRequest) {
        if (StringUtils.isEmpty(userId)) {
            throw new BaseException(MessageKey.INVALID_USER_NAME, messageResolver.resolve(MessageKey.INVALID_USER_NAME.getKey()));
        }
        User user = userRepository.findActiveUser(userId);
        if (user == null) {
            throw new BaseException(MessageKey.INVALID_USER_NAME, messageResolver.resolve(MessageKey.INVALID_USER_NAME.getKey()));
        }
        if (CollectionUtils.isEmpty(userIgnoreRequest.getIgnoreUsers())
                && CollectionUtils.isEmpty(userIgnoreRequest.getEnableUsers())) {
            return;
        }
        Set<String> usernamesToBeIgnored = userIgnoreRequest.getIgnoreUsers();

    }
}
