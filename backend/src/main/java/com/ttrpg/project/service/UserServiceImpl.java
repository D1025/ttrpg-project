package com.ttrpg.project.service;

import com.ttrpg.project.dao.UsersRepository;
import com.ttrpg.project.model.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UsersRepository userRepository;


    @Override
    public Users getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow();
    }
}
