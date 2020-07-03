package com.darkim.chat.auth.api;

import com.darkim.chat.auth.model.AuthenticationRequest;
import com.darkim.chat.auth.model.AuthenticationResponse;
import com.darkim.chat.auth.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private AuthenticationService authenticationService;

    private String domain;

    @Autowired
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @RequestMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> register(@RequestBody @Valid AuthenticationRequest authenticationRequest) {
        authenticationService.register(authenticationRequest);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(path = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<Void> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse res) throws Exception {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(authenticationRequest);
        res.addCookie(getJWTTokenCookie(authenticationResponse.getToken()));
        res.addCookie(getCSRFTokenCookie(authenticationResponse.getCsrfToken()));
        return ResponseEntity.ok().build();
    }

    private Cookie getCSRFTokenCookie(String csrfToken) {
        Cookie cookie = new Cookie("XSRF-TOKEN", csrfToken);
        cookie.setPath("/");
        cookie.setMaxAge(Integer.parseInt(Long.valueOf(TimeUnit.HOURS.toSeconds(24)).toString()));
        return cookie;
    }

    @RequestMapping(path = "/test", method = RequestMethod.GET)
    public String test() {
        return "Hello Human!";
    }

    private Cookie getJWTTokenCookie(String jwtToken) {
        Cookie cookie = new Cookie("COOKIE_BEARER", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(Integer.parseInt(Long.valueOf(TimeUnit.HOURS.toSeconds(24)).toString()));
        return cookie;
    }
}
