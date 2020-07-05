package com.darkim.chat.ws.model;

import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ConvertedChatMessage {

    private String from;

    private String to;

    private String message;

    private Instant sentAt;
}
