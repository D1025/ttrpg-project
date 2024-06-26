package com.ttrpg.project.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatMessage {
    private String content;
    private UUID userId;
    private MessageType type;
    private LocalDateTime time;
}
