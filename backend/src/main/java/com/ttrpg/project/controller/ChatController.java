package com.ttrpg.project.controller;

import java.util.UUID;

import com.ttrpg.project.service.ActiveUsersService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.ttrpg.project.dto.ChatMessage;
import com.ttrpg.project.dto.JoinChat;
import com.ttrpg.project.service.ChatService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


record UserId (UUID id) {}


@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/chat/{roomId}/sendMessage")
    @SendTo("/topic/rooms/{roomId}")
    public ChatMessage sendMessage(@DestinationVariable UUID roomId, ChatMessage chatMessage) {

        return chatService.sendMessage(roomId, chatMessage);
    }

    @MessageMapping("/chat/{roomId}/addUser")
    @SendTo("/topic/rooms/{roomId}")
    public JoinChat addUser(@DestinationVariable UUID roomId, UserId user, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("room_id", roomId);
        headerAccessor.getSessionAttributes().put("user_id", user.id());

        return chatService.joinChat(user.id(), roomId);
    }

    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {
        Message<byte[]> message = event.getMessage();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        UUID roomId = (UUID) accessor.getSessionAttributes().get("room_id");
        UUID userId = (UUID) accessor.getSessionAttributes().get("user_id");
        messagingTemplate.convertAndSend("/topic/rooms/" + roomId, chatService.leaveChat(userId));
    }

}

