package com.ttrpg.project.service;

import com.ttrpg.project.dao.MessagesRepository;
import com.ttrpg.project.dao.RoomRepository;
import com.ttrpg.project.dto.ChatMessage;
import com.ttrpg.project.dto.JoinChat;
import com.ttrpg.project.dto.MessageType;
import com.ttrpg.project.exceptions.MessageException;
import com.ttrpg.project.mapper.MessagesMapper;
import com.ttrpg.project.mapper.UserMapper;
import com.ttrpg.project.model.Messages;
import com.ttrpg.project.model.Room;
import com.ttrpg.project.model.Users;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final UserMapper userMapper;
    private final MessagesRepository messagesRepository;
    private final MessagesMapper messagesMapper;

    Random rand = new Random();

    @Override
    @Transactional
    public JoinChat joinChat(UUID userId, UUID roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new MessageException("Room not found"));
        if (userId == null) {
            throw new MessageException("User not found");
        }
        Users user = userService.findById(userId);
        List<Users> users = room.getUsers();
        if (!users.contains(user)) {
            users.add(user);
            room.setUsers(users);
            roomRepository.save(room);
        }
        return new JoinChat(userId, userMapper.usersToPublicUserReturnDTOs(users), messagesMapper.messagesToChatMessages(room.getMessages()), MessageType.JOIN);
    }

    @Override
    @Transactional
    public ChatMessage sendMessage(UUID roomId, ChatMessage chatMessage) {
        Users user = userService.findById(chatMessage.getUserId());
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new MessageException("Room not found"));
        if (chatMessage.getType() == MessageType.CHAT) {
            Messages message = new Messages(user, room, chatMessage.getContent(), LocalDateTime.now());
            room.getMessages().add(message);
            roomRepository.save(room);
            messagesRepository.save(message);
            return chatMessage;
        } else if (chatMessage.getType() == MessageType.ROLL) {
            chatMessage.setContent("You rolled " + rand.nextInt(20) + 1);
            Messages message = new Messages(user, room, chatMessage.getContent(), LocalDateTime.now());
            room.getMessages().add(message);
            messagesRepository.save(message);
            roomRepository.save(room);
            return chatMessage;
        } else {
            throw new MessageException("Message type not found");
        }
    }
}
