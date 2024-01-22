package com.ttrpg.project.service;

import com.ttrpg.project.dto.PartialUsers;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.model.Users;
import org.springframework.http.HttpStatus;

public interface LoginService {

    UserReturnDTO login(String email, String password, boolean rememberMe);

    HttpStatus register(PartialUsers registerForm);

    boolean validateToken(String token);

    Users findUserByEmailAdress(String email);
}
