package com.ttrpg.project.dao;

import com.ttrpg.project.model.ActiveUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

public interface ActiveUsersRepository extends JpaRepository<ActiveUsers, UUID> {
    void deleteByUserId(UUID userId);
    void deleteByRoomId(UUID roomId);
    void deleteByUserIdAndRoomId(UUID userId, UUID roomId);
    ActiveUsers findByUserIdAndRoomId(UUID userId, UUID roomId);

    List<ActiveUsers> findAllByRoomId(UUID roomId);
}
