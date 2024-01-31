package com.ttrpg.project.dto.room;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ttrpg.project.model.enums.Systems;
import com.ttrpg.project.utils.Base64ToByteArrayDeserializer;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

import java.util.UUID;

public record CreateRoom(@NotNull String name, String description, @JsonDeserialize(using = Base64ToByteArrayDeserializer.class) @JdbcType(VarbinaryJdbcType.class) byte[] image, String extension, @NotNull Systems
        system, boolean isPrivate, @NotNull UUID ownerId) {
}

