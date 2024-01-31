package com.ttrpg.project.service;

import com.ttrpg.project.dto.ChatMessage;
import com.ttrpg.project.dto.JoinChat;

import java.util.UUID;

public interface ChatService {

    JoinChat joinChat(UUID userId, UUID roomId);

    ChatMessage sendMessage(UUID roomId, ChatMessage chatMessage);
}
