package com.darkim.chat.flow.service;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UserIgnoreRequest {

    private Set<String> ignoreUsers = new HashSet<>();

    private Set<String> enableUsers = new HashSet<>();
}
