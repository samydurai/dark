package com.darkim.chat.ws.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ConvertedChatMessage {

    private String from;

    private String to;

    private String message;
}
