package com.ttrpg.project.controller;

import com.ttrpg.project.dto.EditUser;
import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.service.JwtAuthorization;
import com.ttrpg.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ttrpg.project.dto.EditUserPassword;


import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final JwtAuthorization jwtAuthorization;

    private final UserService userService;
    @GetMapping
    public ResponseEntity<List<PublicUserReturnDTO>> getAllUsers(@RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserReturnDTO> editUserData(@RequestHeader(name = "Authorization", required = false) String authorizationHeader, @PathVariable UUID id, @RequestBody EditUser editUser) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(userService.editUser(id, editUser, authorizationHeader));
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<UserReturnDTO> editUserPassword(@RequestHeader(name = "Authorization", required = false) String authorizationHeader, @PathVariable UUID id, @RequestBody EditUserPassword passwords) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(userService.editUserPassword(id, passwords, authorizationHeader));
    }

}
