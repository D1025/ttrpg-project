package com.ttrpg.project.service;

import com.ttrpg.project.exceptions.AuthorizationException;
import com.ttrpg.project.model.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JwtAuthorization {

    private final UserService userService;

    public void authorize(String token) {
        if (token == null) {
            throw new AuthorizationException();
        }
        Users user = userService.getUserByToken(token);

        if (user == null) {
            throw new AuthorizationException();
        }
    }
}
