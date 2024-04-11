package com.ttrpg.project.service;

import java.util.List;
import java.util.UUID;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.EditRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.model.enums.Status;

public interface RoomsService {

    RoomReturnDTO createRoom(CreateRoom room);

    List<RoomReturnDTO> getAllRooms(Status status, String authorizationHeader);

    List<RoomReturnDTO> getAllRooms(String authorizationHeader);

    List<RoomReturnDTO> getMyOwnedRooms(String authorizationHeader);

    RoomReturnDTO modifyRoom(EditRoom editRoom, UUID id, String authorizationHeader);

    void deleteRoom(UUID id, String authorizationHeader);

    String getInvitationLink(UUID id, String authorizationHeader);

    String regenerateInvitationLink(UUID id, String authorizationHeader);

    void deleteInvitationLink(UUID id, String authorizationHeader);

    void joinRoom(String authorizationHeader, String invitation);
}
