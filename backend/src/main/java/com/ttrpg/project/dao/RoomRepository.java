package com.ttrpg.project.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttrpg.project.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
    Page<Room> findAllByPrivateRoomIs(boolean privateRoom, Pageable pageable);

    Page<Room> findAllByPrivateRoomIsAndNameContaining(boolean privateRoom, String name, Pageable pageable);

    List<Room> findAllByPrivateRoomIsAndOwnerId(boolean privateRoom, UUID ownerId);

    Page<Room> findByUsers_Id(UUID userId, Pageable pageable);

    List<Room> findAllByOwnerId(UUID ownerId);

    Page<Room> findAllByOwnerId(UUID ownerId, Pageable pageable);

    Page<Room> findAllByOwnerIdAndNameContaining(UUID ownerId, String name, Pageable pageable);

    Room findByInvitationLink(String invitationLink);
}