package com.ttrpg.project.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;
}
