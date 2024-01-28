package com.ttrpg.project.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ttrpg.project.utils.Base64ToByteArrayDeserializer;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

public record EditUser(@NotNull String nickname, @JsonDeserialize(using = Base64ToByteArrayDeserializer.class) @JdbcType(VarbinaryJdbcType.class) byte[] avatar) {
}
