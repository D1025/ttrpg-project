package com.ttrpg.project.service;

import com.ttrpg.project.model.ActiveUsers;

import java.util.List;
import java.util.UUID;

public interface ActiveUsersService {
    void deleteByUserId(UUID userId);
    void deleteByRoomId(UUID roomId);
    void deleteByUserIdAndRoomId(UUID userId, UUID roomId);
    ActiveUsers findByUserIdAndRoomId(UUID userId, UUID roomId);
    void save(ActiveUsers activeUsers);
    void save(UUID userId, UUID roomId);
    void deleteAll();

    List<UUID> getActiveUsersIdByRoomId(UUID roomId);
}
