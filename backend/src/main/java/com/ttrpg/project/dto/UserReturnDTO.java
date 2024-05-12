package com.ttrpg.project.dto;

import java.util.UUID;

public record UserReturnDTO(UUID id, String email, String nickname, String token,boolean banned, boolean admin , byte[] avatar, String extension) {
}
