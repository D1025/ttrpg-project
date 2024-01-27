package com.ttrpg.project.controller;

import com.ttrpg.project.dto.LoginData;
import com.ttrpg.project.dto.PartialUsers;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.service.JwtAuthorization;
import com.ttrpg.project.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {
    
    private final LoginService loginService;
    private final JwtAuthorization jwtAuthorization;

    @PostMapping("/login")
    public ResponseEntity<UserReturnDTO> login(@RequestBody LoginData loginData) {
        return ResponseEntity.ok(loginService.login(loginData.email(), loginData.password(), loginData.rememberMe()));
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody PartialUsers registerForm) {
        return ResponseEntity.ok(loginService.register(registerForm));
    }

    @PostMapping("/logout")
    public ResponseEntity<HttpStatus> logout(@RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(loginService.logout(authorizationHeader));
    }
    
}
