package com.ttrpg.project.service;

import com.ttrpg.project.dao.ActiveUsersRepository;
import com.ttrpg.project.model.ActiveUsers;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActiveUsersServiceImpl implements ActiveUsersService {
    private final ActiveUsersRepository activeUsersRepository;

    @Override
    public void deleteByUserId(UUID userId) {
        activeUsersRepository.deleteByUserId(userId);
    }

    @Override
    public void deleteByRoomId(UUID roomId) {
        activeUsersRepository.deleteByRoomId(roomId);
    }

    @Override
    public void deleteByUserIdAndRoomId(UUID userId, UUID roomId) {
        activeUsersRepository.deleteByUserIdAndRoomId(userId, roomId);
    }

    @Override
    public ActiveUsers findByUserIdAndRoomId(UUID userId, UUID roomId) {
        return activeUsersRepository.findByUserIdAndRoomId(userId, roomId);
    }

    @Override
    public void save(ActiveUsers activeUsers) {
        activeUsersRepository.save(activeUsers);
    }

    @Override
    public void save(UUID userId, UUID roomId) {
        ActiveUsers activeUsers = new ActiveUsers();
        activeUsers.setUserId(userId);
        activeUsers.setRoomId(roomId);
        activeUsersRepository.save(activeUsers);
    }

    @Override
    public void deleteAll() {
        activeUsersRepository.deleteAll();
    }

    @Override
    public List<UUID> getActiveUsersIdByRoomId(UUID roomId) {
        return activeUsersRepository.findAllByRoomId(roomId).stream().map(ActiveUsers::getUserId).toList();
    }
}
