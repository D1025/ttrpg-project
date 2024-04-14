package com.ttrpg.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.EditRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.model.enums.Status;

public interface RoomsService {

    RoomReturnDTO createRoom(CreateRoom room);

    Page<RoomReturnDTO> getAllRooms(Status status, String authorizationHeader , Pageable pageable, String name);

    List<RoomReturnDTO> getAllRooms(String authorizationHeader);

    Page<RoomReturnDTO> getMyOwnedRooms(String authorizationHeader, Pageable pageable, String name);

    RoomReturnDTO modifyRoom(EditRoom editRoom, UUID id, String authorizationHeader);

    void deleteRoom(UUID id, String authorizationHeader);

    String getInvitationLink(UUID id, String authorizationHeader);

    String regenerateInvitationLink(UUID id, String authorizationHeader);

    void deleteInvitationLink(UUID id, String authorizationHeader);

    void joinRoom(String authorizationHeader, String invitation);

    RoomReturnDTO getInfoAboutJoining(String invitation);
}
