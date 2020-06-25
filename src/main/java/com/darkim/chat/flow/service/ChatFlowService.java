package com.darkim.chat.flow.service;

import com.darkim.chat.auth.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ChatFlowService {

    private UserRepository userRepository;

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
}
