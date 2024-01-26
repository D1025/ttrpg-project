package com.ttrpg.project.service;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;

import java.util.UUID;

public interface RoomsService {

    RoomReturnDTO createRoom(CreateRoom room, UUID userId);
}
