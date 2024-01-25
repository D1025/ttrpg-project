package com.ttrpg.project.controller;

import com.ttrpg.project.dto.LoginData;
import com.ttrpg.project.dto.UserReturnDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttrpg.project.dto.PartialUsers;
import com.ttrpg.project.service.LoginService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {
    
    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<UserReturnDTO> login(@RequestBody LoginData loginData) {
        return ResponseEntity.ok(loginService.login(loginData.email(), loginData.password(), loginData.rememberMe()));
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody PartialUsers registerForm) {
        return ResponseEntity.ok(loginService.register(registerForm));
    }
    
}
