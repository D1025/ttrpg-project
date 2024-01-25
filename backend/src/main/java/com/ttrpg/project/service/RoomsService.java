package com.ttrpg.project.service;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.model.enums.Status;

import java.util.List;
import java.util.UUID;

public interface RoomsService {

    RoomReturnDTO createRoom(CreateRoom room, UUID userId);

    List<RoomReturnDTO> getAllRooms(UUID userId, Status status);
}
