package com.ttrpg.project.controller;

import java.util.UUID;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.ttrpg.project.dto.ChatMessage;
import com.ttrpg.project.dto.JoinChat;
import com.ttrpg.project.service.ChatService;

import lombok.RequiredArgsConstructor;


record UserId (UUID id) {}


@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/{roomId}/sendMessage")
    @SendTo("/topic/rooms/{roomId}")
    public ChatMessage sendMessage(@DestinationVariable UUID roomId, ChatMessage chatMessage) {

        return chatService.sendMessage(roomId, chatMessage);
    }

    @MessageMapping("/chat/{roomId}/addUser")
    @SendTo("/topic/rooms/{roomId}")
    public JoinChat addUser(@DestinationVariable UUID roomId, UserId user, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        headerAccessor.getSessionAttributes().put("room_id", roomId);

        return chatService.joinChat(user.id(), roomId);
    }
}