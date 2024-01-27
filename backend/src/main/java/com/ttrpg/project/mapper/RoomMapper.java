package com.ttrpg.project.mapper;

import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.model.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "ownerNickname", source = "owner.nickname")
    @Mapping(target = "ownerAvatar", source = "owner.avatar")
    @Mapping(target = "isPrivate", source = "privateRoom")
    RoomReturnDTO roomToRoomReturnDTO(Room room);

    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "ownerNickname", source = "owner.nickname")
    @Mapping(target = "ownerAvatar", source = "owner.avatar")
    @Mapping(target = "isPrivate", source = "privateRoom")
    List<RoomReturnDTO> roomsToRoomReturnDTOs(List<Room> rooms);
}
