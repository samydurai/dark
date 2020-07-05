package com.darkim.chat.flow.model;

import com.darkim.chat.ws.model.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserWatchResponse {

    private String username;

    private UserStatus userStatus;
}
