package com.ttrpg.project.mapper;

import com.ttrpg.project.dto.ChatMessage;
import com.ttrpg.project.dto.MessageType;
import com.ttrpg.project.model.Messages;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessagesMapper {

    @Mapping(source = "message", target = "content")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "timestamp", target = "time")
    @Mapping(target = "type", expression = "java(com.ttrpg.project.dto.MessageType.CHAT)")
    ChatMessage messageToChatMessage(Messages message);

    @Mapping(source = "message", target = "content")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "timestamp", target = "time")
    @Mapping(target = "type", expression = "java(com.ttrpg.project.dto.MessageType.JOIN)")
    List<ChatMessage> messagesToChatMessages(List<Messages> messages);
}
