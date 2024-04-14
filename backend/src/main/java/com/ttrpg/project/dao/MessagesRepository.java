package com.ttrpg.project.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttrpg.project.model.Messages;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, UUID> {
    void deleteByRoomId(UUID roomId);
    void deleteByUserId(UUID userId);
    Messages findByUserIdAndRoomId(UUID userId, UUID roomId);
}
