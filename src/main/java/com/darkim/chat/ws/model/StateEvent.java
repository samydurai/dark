package com.darkim.chat.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StateEvent {

    private String username;

    private UserStatus userStatus;
}
