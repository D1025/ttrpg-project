package com.ttrpg.project.dto.room;

import com.ttrpg.project.model.enums.Systems;
import jakarta.validation.constraints.NotNull;

public record CreateRoom(@NotNull String name, String description, byte[] image, @NotNull Systems
        system, boolean isPrivate) {
}
