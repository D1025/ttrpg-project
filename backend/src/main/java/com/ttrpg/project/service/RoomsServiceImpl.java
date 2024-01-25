package com.ttrpg.project.service;

import com.ttrpg.project.dao.RoomRepository;
import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.exceptions.MessageException;
import com.ttrpg.project.mapper.RoomMapper;
import com.ttrpg.project.model.Room;
import com.ttrpg.project.model.enums.Status;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomsServiceImpl implements RoomsService {

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final RoomMapper roomMapper;


    @Override
    @Transactional
    public RoomReturnDTO createRoom(CreateRoom room, UUID userId) {
        Room roomEntity = new Room();
        roomEntity.setName(room.name());
        roomEntity.setDescription(room.description());
        roomEntity.setImage(room.image());
        roomEntity.setSystem(room.system());
        roomEntity.setPrivateRoom(room.isPrivate());
        roomEntity.setInvitationLink(UUID.randomUUID().toString());
        roomEntity.setOwner(userService.getUserById(userId));
        roomRepository.save(roomEntity);
        return roomMapper.roomToRoomReturnDTO(roomEntity);
    }

    @Override
    public List<RoomReturnDTO> getAllRooms(UUID userId, Status status) {
        if (status == Status.ACTIVE) {
            return roomMapper.roomsToRoomReturnDTOs(roomRepository.findAllByPrivateRoomIs(false));
        } else if (status == Status.PRIVATE) {
            return roomMapper.roomsToRoomReturnDTOs(roomRepository.findAllByPrivateRoomIs(true));
        } else {
            throw new MessageException("Invalid status");
        }
    }
}
