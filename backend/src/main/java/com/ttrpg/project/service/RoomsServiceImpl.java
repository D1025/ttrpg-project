package com.ttrpg.project.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ttrpg.project.dao.MessagesRepository;
import com.ttrpg.project.dao.RoomRepository;
import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.EditRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.exceptions.MessageException;
import com.ttrpg.project.mapper.RoomMapper;
import com.ttrpg.project.model.Room;
import com.ttrpg.project.model.Users;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomsServiceImpl implements RoomsService {

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final RoomMapper roomMapper;
    private final JwtAuthorization jwtAuthorization;
    private final MessagesRepository messagesRepository;


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
    public Page<RoomReturnDTO> getAllRooms(Status status, String authorizationHeader, Pageable pageable, String name) {
        boolean isPrivate = status == Status.PRIVATE;
        if (isPrivate) {
            jwtAuthorization.authorize(authorizationHeader);
        }
        Page<Room> rooms;
        if (name != null && !isPrivate) {
            rooms = roomRepository.findAllByPrivateRoomIsAndNameContaining(false, name, pageable);
        } else if(!isPrivate){
            rooms = roomRepository.findAllByPrivateRoomIs(false, pageable);
        }
        else if (name != null) {
            Users user = userService.getUserByToken(authorizationHeader);
            rooms = roomRepository.findAllByUsersContainsOrOwnerIsAndNameContaining(user, name, user, pageable);
        }
        else {
            Users user = userService.getUserByToken(authorizationHeader);
            rooms = roomRepository.findAllByUsersContainsOrOwnerIs(user, user, pageable);
        }
        return rooms.map(roomMapper::roomToRoomReturnDTO);
    }

    @Override
    public Page<RoomReturnDTO> getAllRooms(String authorizationHeader, Pageable pageable) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        if (!user.isAdmin()) {
            throw new MessageException("Niewystarczające uprawnienia");
        }
        return roomRepository.findAll(pageable).map(roomMapper::roomToRoomReturnDTO);
    }

    @Override
    @Transactional
    public RoomReturnDTO modifyRoom(EditRoom editRoom, UUID id, String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findById(id).orElseThrow(() -> new MessageException("Room not found"));
        if (!(room.getOwner().getId().equals(user.getId()) || user.isAdmin())) {
            throw new MessageException("You are not the owner of this room");
        }
        if (editRoom.name() != null) {
            room.setName(editRoom.name());
        }
        if (editRoom.description() != null) {
            room.setDescription(editRoom.description());
        }
        if (editRoom.image() != null) {
            room.setImage(editRoom.image());
        }
        if (editRoom.isPrivate() != null) {
            room.setPrivateRoom(editRoom.isPrivate());
        }
        if (editRoom.imageExtension() != null) {
            room.setImageExtension(editRoom.imageExtension());
        }
        roomRepository.save(room);
        return roomMapper.roomToRoomReturnDTO(room);
    }

    @Override
    public Page<RoomReturnDTO> getMyOwnedRooms(String authorizationHeader, Pageable pageable, String name) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        if (name != null) {
            return roomRepository.findAllByOwnerIdAndNameContaining(user.getId(), name, pageable).map(roomMapper::roomToRoomReturnDTO);
        }
        return roomRepository.findAllByOwnerId(user.getId(), pageable).map(roomMapper::roomToRoomReturnDTO);
    }

    @Override
    @Transactional
    public void deleteRoom(UUID id, String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findById(id).orElseThrow(() -> new MessageException("Room not found"));
        if (!(room.getOwner().getId().equals(user.getId()) || user.isAdmin())) {
            throw new MessageException("You are not the owner of this room");
        }
        messagesRepository.deleteByRoomId(id);
        roomRepository.delete(room);
    }

    @Override
    public String getInvitationLink(UUID id, String authorizationHeader) {
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findById(id).orElseThrow(() -> new MessageException("Room not found"));
        if (!(room.getOwner().getId().equals(user.getId()) || user.isAdmin())) {
            throw new MessageException("You are not the owner of this room");
        }
        return room.getInvitationLink();
    }

    @Override
    @Transactional
    public String regenerateInvitationLink(UUID id, String authorizationHeader) {
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findById(id).orElseThrow(() -> new MessageException("Room not found"));
        if (!(room.getOwner().getId().equals(user.getId()) || user.isAdmin())) {
            throw new MessageException("You are not the owner of this room");
        }
        room.setInvitationLink(generateInvitationLink());
        roomRepository.save(room);
        return room.getInvitationLink();
    }

    @Override
    public void deleteInvitationLink(UUID id, String authorizationHeader) {
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findById(id).orElseThrow(() -> new MessageException("Room not found"));
        if (!(room.getOwner().getId().equals(user.getId()) || user.isAdmin())) {
            throw new MessageException("You are not the owner of this room");
        }
        room.setInvitationLink(null);
        roomRepository.save(room);
    }

    @Override
    public void joinRoom(String authorizationHeader, String invitation) {
        Users user = userService.getUserByToken(authorizationHeader);
        Room room = roomRepository.findByInvitationLink(invitation);
        if (room == null) {
            throw new MessageException("Room not found");
        }
        List<Users> usersInRoom = room.getUsers();
        if (!usersInRoom.contains(user)) {
            room.getUsers().add(user);
            roomRepository.save(room);
        }
    }

    @Override
    public RoomReturnDTO getInfoAboutJoining(String invitation) {
        Room room = roomRepository.findByInvitationLink(invitation);
        if (room == null) {
            throw new MessageException("Room not found");
        }
        return roomMapper.roomToRoomReturnDTO(room);
    }

    private String generateInvitationLink() {
        return UUID.randomUUID().toString();
    }
}