package com.ttrpg.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttrpg.project.dto.PartialUsers;
import com.ttrpg.project.model.Users;
import com.ttrpg.project.service.LoginService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("api/v1/auth")
public class LoginController {
    
    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestBody String email, @RequestBody String password) {
        return ResponseEntity.ok(loginService.login(email, password));
    }

    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody PartialUsers registerForm) {
        return ResponseEntity.ok(loginService.register(registerForm));
    }
    
}
