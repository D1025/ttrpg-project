package com.ttrpg.project.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttrpg.project.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, UUID>{
    
    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Object> findByToken(String token);
}
