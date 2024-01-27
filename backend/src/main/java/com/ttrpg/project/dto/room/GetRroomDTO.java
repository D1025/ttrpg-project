package com.ttrpg.project.dto.room;

import com.ttrpg.project.model.enums.Status;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record GetRroomDTO(@NotNull Status status, UUID userId) {
}
