package com.ttrpg.project.dto;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JoinChat {
    private UUID userId;
    private List<PublicUserReturnDTO> users;
    private List<UUID> activeUsers;
    private List<ChatMessage> messages;
    private MessageType type;
}
