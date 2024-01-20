package com.ttrpg.project.service;

import com.ttrpg.project.model.Users;

import java.util.UUID;

public interface UserService {

    Users getUserById(UUID id);

}
