package com.ttrpg.project.dto;

import java.util.UUID;

public record UserReturnDTO(UUID id, String email, String nickname, String token, boolean admin, boolean banned, byte[] avatar, String extension) {
}
