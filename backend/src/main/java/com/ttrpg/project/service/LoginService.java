package com.ttrpg.project.service;

import com.ttrpg.project.dto.PartialUsers;
import com.ttrpg.project.model.Users;

public interface LoginService {
    
    Users login(String email, String password, boolean rememberMe);

    Users register(PartialUsers registerForm);

    boolean validateToken(String token);

    Users findUserByEmailAdress(String email);
}
