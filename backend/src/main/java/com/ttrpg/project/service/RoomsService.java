package com.ttrpg.project.service;

import java.util.List;
import java.util.UUID;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.EditRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;

public interface RoomsService {

    RoomReturnDTO createRoom(CreateRoom room);

    List<RoomReturnDTO> getAllRooms(Status status, String authorizationHeader);

    RoomReturnDTO modifyRoom(EditRoom editRoom, UUID id);
}
