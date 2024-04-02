package com.ttrpg.project.service;

import com.ttrpg.project.dto.EditUser;
import com.ttrpg.project.dto.EditUserPassword;
import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.model.Users;

import java.util.List;
import java.util.UUID;

public interface UserService {

    Users getUserById(UUID id);

    Users getUserByToken(String token);

    List<PublicUserReturnDTO> getAllUsers();

    List<PublicUserReturnDTO> getAllUsers(String token);

    UserReturnDTO editUser(UUID id, EditUser editUser, String token);

    Users findById(UUID userId);

    PublicUserReturnDTO banUser(String id, String token);

    PublicUserReturnDTO unbanUser(String id, String token);

    UserReturnDTO editUserPassword(UUID id, EditUserPassword editUser, String token);
}
