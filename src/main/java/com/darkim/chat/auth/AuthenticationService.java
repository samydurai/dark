package com.darkim.chat.auth;

import com.darkim.chat.auth.dao.UserRepository;
import com.darkim.chat.auth.entity.User;
import com.darkim.chat.auth.error.BaseException;
import com.darkim.chat.auth.error.MessageKey;
import com.darkim.chat.auth.error.MessageResolver;
import com.darkim.chat.auth.jwt.JWTUtil;
import com.darkim.chat.auth.model.AuthenticationRequest;
import com.darkim.chat.auth.provider.config.ChatUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthenticationService {

    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;

    private AuthenticationManager authenticationManager;

    private MessageResolver messageResolver;

    private ChatUserDetailsService userDetailsService;

    private JWTUtil jwtUtil;

    @Autowired
    public void setJwtUtil(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Autowired
    public void setUserDetailsService(ChatUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void setMessageResolver(MessageResolver messageResolver) {
        this.messageResolver = messageResolver;
    }

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public void register(AuthenticationRequest authenticationRequest) {
        String userName = authenticationRequest.getUsername();
        User activeUser = userRepository.findActiveUser(userName);
        if (activeUser != null) {
            log.error("An attempt to create a duplicate user. userName - {}", userName);
            throw new BaseException(MessageKey.USER_ID_TAKEN,
                    messageResolver.resolve(MessageKey.USER_ID_TAKEN.getKey()));
        }
        User user = User.builder()
                .active(true)
                .password(passwordEncoder.encode(authenticationRequest.getPassword()))
                .userName(authenticationRequest.getUsername())
                .build();
        userRepository.save(user);
    }

    public String authenticate(AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            log.error("An invalid attempt to login detected. userName - {}", authenticationRequest.getUsername());
            throw new BaseException(MessageKey.INVALID_CREDENTIALS, messageResolver.resolve(MessageKey.INVALID_CREDENTIALS.getKey()));
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        return jwtUtil.generateToken(userDetails);
    }
}
