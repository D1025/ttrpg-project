package com.ttrpg.project.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ttrpg.project.utils.Base64ToByteArrayDeserializer;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

public record EditUser(String nickname, @JsonDeserialize(using = Base64ToByteArrayDeserializer.class) @JdbcType(VarbinaryJdbcType.class) byte[] avatar, String avatarExtension, String email) {
}
