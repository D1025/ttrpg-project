package com.ttrpg.project.service;

import java.time.LocalDateTime;
import java.util.Date;

import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.exceptions.MessageException;
import com.ttrpg.project.mapper.UserMapper;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ttrpg.project.configuration.ProjectProperties;
import com.ttrpg.project.dao.UsersRepository;
import com.ttrpg.project.dto.PartialUsers;
import com.ttrpg.project.model.Users;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    final private UsersRepository usersRepository;
    final private ProjectProperties projectProperties;
    final private UserMapper userMapper;
    
    @Override
    @Transactional
    public UserReturnDTO login(String email, String password, boolean rememberMe) {
        Users user = findUserByEmailAdress(email);
        if (user == null) {
            throw new MessageException("Nie znaleziono użytkownika");
        }
        if (user.getPassword().equals(password)) {
            user.setToken(generateToken(user));
            user.setTokenExpirationTime(LocalDateTime.now().plusHours(projectProperties.getExpirationTime()));
            usersRepository.save(user);
            return userMapper.userToUserReturnDTO(user);
        }

        throw new MessageException("Blędne hasło");
    }

    @Override
    public UserReturnDTO verify(String token) {
        return userMapper.userToUserReturnDTO(usersRepository.findByToken(token));
    }

    private String generateToken(Users user) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        JwtBuilder builder = Jwts.builder()
                .setIssuedAt(new Date())
                .setSubject(user.getEmail())
                .setIssuer("ttrpg")
                .signWith(signatureAlgorithm, projectProperties.getSecretKey());

        return builder.compact();
    }
    
    @Override
    public boolean validateToken(String token) {
        return false;
    }


    @Override
    public Users findUserByEmailAdress(String email) {
        return usersRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public HttpStatus register(PartialUsers registerForm) {
        if (isEmailValid(registerForm.email()) && !usersRepository.existsByEmail(registerForm.email())) {
            Users user = new Users();
            user.setEmail(registerForm.email());
            user.setPassword(registerForm.password());
            user.setNickname(registerForm.nickname());
            user.setAdmin(false);
            usersRepository.save(user);
            return HttpStatus.OK;
        }

        throw new MessageException("Email jest niepoprawny lub zajęty");
    }

    private boolean isEmailValid(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    @Override
    @Transactional
    public HttpStatus logout(String token) {
        Users user =  usersRepository.findByToken(token);
        if (user == null) {
            throw new MessageException("Nie znaleziono użytkownika");
        }
        user.setToken(null);
        user.setTokenExpirationTime(null);
        usersRepository.save(user);
        return HttpStatus.OK;
    }
}
