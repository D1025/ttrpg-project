package com.ttrpg.project.dto;

import java.util.UUID;

public record PublicUserReturnDTO(UUID id, String nickname, byte[] avatar, String avatarExtension) {
}
