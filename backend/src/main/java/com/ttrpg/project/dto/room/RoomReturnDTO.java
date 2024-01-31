package com.ttrpg.project.dto.room;

import com.ttrpg.project.model.enums.Systems;

import java.util.UUID;

public record RoomReturnDTO(UUID id, String name, String description, byte[] image, String imageExtension, Systems system, String invitationLink, boolean isPrivate, UUID ownerId, String ownerNickname, byte[] ownerAvatar, String ownerAvatarExtension) {
}
