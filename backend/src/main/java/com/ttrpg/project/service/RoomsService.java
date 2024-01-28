package com.ttrpg.project.service;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.EditRoom;
import com.ttrpg.project.dto.room.GetRroomDTO;
import com.ttrpg.project.dto.room.RoomReturnDTO;

import java.util.List;
import java.util.UUID;

public interface RoomsService {

    RoomReturnDTO createRoom(CreateRoom room);

    List<RoomReturnDTO> getAllRooms(GetRroomDTO roomDTO, String authorizationHeader);

    RoomReturnDTO modifyRoom(EditRoom editRoom, UUID id);
}
