package com.darkim.chat.flow.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserIgnoreRequest {

    private Set<String> ignore = new HashSet<>();

    private Set<String> enable = new HashSet<>();
}
