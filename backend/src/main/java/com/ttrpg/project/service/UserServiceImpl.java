package com.ttrpg.project.service;

import com.ttrpg.project.dao.UsersRepository;
import com.ttrpg.project.dto.EditUser;
import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.EditUserPassword;
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
    public List<PublicUserReturnDTO> getAllUsers(String token) {
        Users user = getUserByToken(token);
        if (!user.isAdmin()) {
            throw new MessageException("Niewystarczające uprawnienia");
        }
        return userMapper.usersToPublicUserReturnDTOs(userRepository.findAll());
    }

    @Override
    @Transactional
    public UserReturnDTO editUser(UUID id, EditUser editUser, String token) {
        Users user = getUserById(id);
        if (user.getToken().equals(token) || user.isAdmin()) {
            if (editUser.nickname() != null) {
                user.setNickname(editUser.nickname());
            }
            if (editUser.avatar() != null) {
                user.setAvatar(editUser.avatar());
            }
            if (editUser.avatarExtension() != null) {
                user.setAvatarExtension(editUser.avatarExtension());
            }
            if (editUser.email() != null) {
                user.setEmail(editUser.email());
            }
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

    @Override
    @Transactional
    public PublicUserReturnDTO banUser(String id, String token) {
        Users user = getUserById(UUID.fromString(id));
        Users admin = getUserByToken(token);
        if (!admin.isAdmin()) {
            throw new MessageException("Niewystarczające uprawnienia");
        }
        user.setBanned(true);
        userRepository.save(user);
        return userMapper.userToPublicUserReturnDTO(user);
    }

    @Override
    @Transactional
    public PublicUserReturnDTO unbanUser(String id, String token) {
        Users user = getUserById(UUID.fromString(id));
        Users admin = getUserByToken(token);
        if (!admin.isAdmin()) {
            throw new MessageException("Niewystarczające uprawnienia");
        }
        user.setBanned(false);
        userRepository.save(user);
        return userMapper.userToPublicUserReturnDTO(user);
    }

    @Override
    @Transactional
    public UserReturnDTO editUserPassword(UUID id, EditUserPassword editUser, String token) {
        Users user = getUserById(id);
        if (user.getToken().equals(token)) {
            if (editUser.password() != null && editUser.newPassword() != null && editUser.password().equals(user.getPassword())){
                user.setPassword(editUser.password());
            }
            userRepository.save(user);
            return userMapper.userToUserReturnDTO(user);
        } else {
            throw new RuntimeException("You are not authorized to edit this user");
        }
    }
}
