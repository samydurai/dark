package com.darkim.chat.auth.api;

import com.darkim.chat.auth.AuthenticationService;
import com.darkim.chat.auth.model.AuthenticationRequest;
import com.darkim.chat.auth.model.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.UUID;
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
    public ResponseEntity<Void> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse res, @RequestHeader String host) throws Exception {
        String jwtToken = authenticationService.authenticate(authenticationRequest);
        res.addCookie(getJWTTokenCookie(jwtToken, host));
        res.addCookie(getCSRFTokenCookie(host));
        return ResponseEntity.ok().build();
    }

    private Cookie getCSRFTokenCookie(String host) {
        Cookie cookie = new Cookie("XSRF-TOKEN", UUID.randomUUID().toString());
        cookie.setPath("/");
        cookie.setMaxAge(Integer.parseInt(Long.valueOf(TimeUnit.HOURS.toSeconds(24)).toString()));
        return cookie;
    }

    @RequestMapping(path = "/test", method = RequestMethod.GET)
    public String test() {
        return "Hello Human!";
    }

    private Cookie getJWTTokenCookie(String jwtToken, String host) {
        Cookie cookie = new Cookie("COOKIE_BEARER", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(Integer.parseInt(Long.valueOf(TimeUnit.HOURS.toSeconds(24)).toString()));
        return cookie;
    }
}
