package com.ttrpg.project.service;

import com.ttrpg.project.dao.UsersRepository;
import com.ttrpg.project.dto.EditUser;
import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.exceptions.MessageException;
import com.ttrpg.project.mapper.UserMapper;
import com.ttrpg.project.model.Users;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UsersRepository userRepository;
    private final UserMapper userMapper;


    @Override
    public Users getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public Users getUserByToken(String token) {
        return (Users) userRepository.findByToken(token).orElseThrow();
    }

    @Override
    public List<PublicUserReturnDTO> getAllUsers() {
        return userMapper.usersToPublicUserReturnDTOs(userRepository.findAll());
    }

    @Override
    @Transactional
    public UserReturnDTO editUser(UUID id, EditUser editUser, String token) {
        Users user = getUserById(id);
        if (user.getToken().equals(token) || user.isAdmin()) {
            user.setNickname(editUser.nickname());
            user.setAvatar(editUser.avatar());
            user.setAvatarExtension(editUser.avatarExtension());
            userRepository.save(user);
            return userMapper.userToUserReturnDTO(user);
        } else {
            throw new RuntimeException("You are not authorized to edit this user");
        }
    }

    @Override
    public Users findById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new MessageException("User not found"));
    }
}
