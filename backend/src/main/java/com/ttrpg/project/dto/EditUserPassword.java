package com.ttrpg.project.dto;

import jakarta.validation.constraints.NotNull;

public record EditUserPassword(@NotNull String password, @NotNull String newPassword) {
}