package com.darkim.chat.auth.provider.config;

import com.darkim.chat.auth.dao.UserRepository;
import com.darkim.chat.flow.model.User;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Collections;

@Component
public class ChatUserDetailsService implements UserDetailsService {

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

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        if (StringUtils.isEmpty(userName)) {
            throw new UsernameNotFoundException(messageResolver.resolve(MessageKey.USER_NOT_FOUND.getKey()));
        }
        User activeUser = userRepository.findActiveUser(userName);
        if (activeUser == null) {
            throw new UsernameNotFoundException(messageResolver.resolve(MessageKey.USER_NOT_FOUND.getKey()));
        }
        return org.springframework.security.core.userdetails.User.builder()
                .authorities(Collections.emptyList())
                .username(userName)
                .password(activeUser.getPassword())
                .build();

    }
}
