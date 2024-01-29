package com.ttrpg.project.service;

import com.ttrpg.project.dto.EditUser;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.model.Users;

import java.util.List;
import java.util.UUID;

public interface UserService {

    Users getUserById(UUID id);

    Users getUserByToken(String token);

    List<UserReturnDTO> getAllUsers();

    UserReturnDTO editUser(UUID id, EditUser editUser, String token);
}
