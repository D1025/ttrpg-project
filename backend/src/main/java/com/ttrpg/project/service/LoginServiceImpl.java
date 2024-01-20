package com.ttrpg.project.service;

import java.time.LocalDateTime;
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
    
    @Override
    @Transactional
    public Users login(String email, String password, boolean rememberMe) {
        Users user = findUserByEmailAdress(email);
        if (user.getPassword().equals(password)) {
            user.setToken(generateToken(user));
            user.setTokenExpirationTime(LocalDateTime.now().plusHours(projectProperties.getExpirationTime()));
            usersRepository.save(user);
            return user;
        }

        return null;
    }

    private String generateToken(Users user) {
        //generate random token based on user data
//        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
//        long nowMillis = System.currentTimeMillis();
//        Date now = new Date(nowMillis);
//
//        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("secret key variable");
//        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
//
//        JwtBuilder builder = Jwts.builder().setId(user.getId().toString())
//                .setIssuedAt(now)
//                .setSubject(user.getEmail())
//                .setIssuer("TODO")
//                .signWith(signatureAlgorithm, signingKey);
//
//        if (projectProperties.getExpirationTime() >= 0) {
//            long expMillis = nowMillis + projectProperties.getExpirationTime();
//            Date exp = new Date(expMillis);
//            builder.setExpiration(exp);
//        }
//
//        return builder.compact();
        return "FANCY TOKEN HERE";
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
    public Users register(PartialUsers registerForm) {
        if (isEmailValid(registerForm.email()) && !usersRepository.existsByEmail(registerForm.email())) {
            Users user = new Users();
            user.setEmail(registerForm.email());
            user.setPassword(registerForm.password());
            user.setNickname(registerForm.nickname());
            user.setAdmin(false);
            return usersRepository.save(user);
        }

        throw new RuntimeException("Email is not valid or already exists");
    }

    private boolean isEmailValid(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
