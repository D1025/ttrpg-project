package com.ttrpg.project.service;

import com.ttrpg.project.dto.EditUser;
import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.model.Users;

import java.util.List;
import java.util.UUID;

public interface UserService {

    Users getUserById(UUID id);

    Users getUserByToken(String token);

    List<PublicUserReturnDTO> getAllUsers();

    UserReturnDTO editUser(UUID id, EditUser editUser, String token);

    Users findById(UUID userId);
}
