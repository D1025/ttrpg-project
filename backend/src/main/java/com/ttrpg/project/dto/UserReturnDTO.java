package com.ttrpg.project.dto;

public record UserReturnDTO(String email, String nickname, String token, boolean admin , byte[] avatar) {
}
