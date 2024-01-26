package com.ttrpg.project.mapper;

import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.model.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomReturnDTO roomToRoomReturnDTO(Room room);
}
