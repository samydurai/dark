package com.darkim.chat.auth.api;

import com.darkim.chat.auth.AuthenticationService;
import com.darkim.chat.auth.model.AuthenticationRequest;
import com.darkim.chat.auth.model.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AuthenticationController {

    private AuthenticationService authenticationService;

    @Autowired
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @RequestMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> register(@RequestBody @Valid AuthenticationRequest authenticationRequest) {
        authenticationService.register(authenticationRequest);
        return ResponseEntity.accepted().build();
    }

    @RequestMapping(path = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody @Valid AuthenticationRequest authenticationRequest) throws Exception {
        return ResponseEntity.ok(new AuthenticationResponse(authenticationService.authenticate(authenticationRequest)));
    }

    @RequestMapping(path = "/test", method = RequestMethod.GET)
    public String test() {
        return "Hello Human!";
    }
}
