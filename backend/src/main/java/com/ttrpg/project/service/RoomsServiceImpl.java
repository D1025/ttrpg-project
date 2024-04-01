package com.ttrpg.project.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ttrpg.project.dao.RoomRepository;
import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.EditRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.exceptions.MessageException;
import com.ttrpg.project.mapper.RoomMapper;
import com.ttrpg.project.model.Room;
import com.ttrpg.project.model.Users;
import com.ttrpg.project.model.enums.Status;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomsServiceImpl implements RoomsService {

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final RoomMapper roomMapper;
    private final JwtAuthorization jwtAuthorization;


    @Override
    @Transactional
    public RoomReturnDTO createRoom(CreateRoom room) {
        Room roomEntity = new Room();
        roomEntity.setName(room.name());
        roomEntity.setDescription(room.description());
        roomEntity.setImage(room.image());
        roomEntity.setImageExtension(room.extension());
        roomEntity.setSystem(room.system());
        roomEntity.setPrivateRoom(room.isPrivate());
        roomEntity.setInvitationLink(UUID.randomUUID().toString());
        roomEntity.setOwner(userService.getUserById(room.ownerId()));
        roomRepository.save(roomEntity);
        return roomMapper.roomToRoomReturnDTO(roomEntity);
    }

    @Override
    public List<RoomReturnDTO> getAllRooms(Status status, String authorizationHeader) {
        if (status == Status.PUBLIC) {
            return roomMapper.roomsToRoomReturnDTOs(roomRepository.findAllByPrivateRoomIs(false));
        } else if (status == Status.PRIVATE ) {
            jwtAuthorization.authorize(authorizationHeader);
            Users user = userService.getUserByToken(authorizationHeader);
            return roomMapper.roomsToRoomReturnDTOs(roomRepository.findAllByPrivateRoomIsAndOwnerId(true, user.getId()));
        } else {
            throw new MessageException("Invalid status");
        }
    }

    @Override
    public List<RoomReturnDTO> getAllRooms(String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        if (!user.isAdmin()) {
            throw new MessageException("Niewystarczające uprawnienia");
        }
        return roomMapper.roomsToRoomReturnDTOs(roomRepository.findAll());
    }

    @Override
    @Transactional
    public RoomReturnDTO modifyRoom(EditRoom editRoom, UUID id, String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findById(id).orElseThrow(() -> new MessageException("Room not found"));
        if (!room.getOwner().getId().equals(user.getId()) && !user.isAdmin()) {
            throw new MessageException("You are not the owner of this room");
        }
        room.setName(editRoom.name());
        room.setDescription(editRoom.description());
        room.setImage(editRoom.image());
        room.setPrivateRoom(editRoom.isPrivate());
        room.setImageExtension(editRoom.imageExtension());
        roomRepository.save(room);
        return roomMapper.roomToRoomReturnDTO(room);
    }

    @Override
    public List<RoomReturnDTO> getMyOwnedRooms(String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        return roomMapper.roomsToRoomReturnDTOs(roomRepository.findAllByOwnerId(user.getId()));
    }

    @Override
    @Transactional
    public void deleteRoom(UUID id, String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findById(id).orElseThrow(() -> new MessageException("Room not found"));
        if (!room.getOwner().getId().equals(user.getId()) || user.isAdmin()) {
            throw new MessageException("You are not the owner of this room");
        }
        roomRepository.delete(room);
    }
}