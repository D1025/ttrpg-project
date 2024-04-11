package com.ttrpg.project.dao;

import java.util.List;
import java.util.UUID;

import com.ttrpg.project.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttrpg.project.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
    List<Room> findAllByPrivateRoomIs(boolean privateRoom);

    List<Room> findAllByPrivateRoomIsAndOwnerId(boolean privateRoom, UUID ownerId);

    List<Room> findByUsers_Id(UUID userId);

    List<Room> findAllByOwnerId(UUID ownerId);
}