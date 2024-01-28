package com.ttrpg.project.dto.room;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ttrpg.project.utils.Base64ToByteArrayDeserializer;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

public record EditRoom(String name, String description, @JsonDeserialize(using = Base64ToByteArrayDeserializer.class) @JdbcType(VarbinaryJdbcType.class) byte[] image, boolean isPrivate) {
}
