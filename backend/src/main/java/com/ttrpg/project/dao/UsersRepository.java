package com.ttrpg.project.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttrpg.project.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, UUID>{
    
    Optional<Users> findByEmail(String email);

    Page<Users> findAllByNicknameContainingIgnoreCaseOrEmailContainingIgnoreCase(String nickname, String email, Pageable pageable);

    boolean existsByEmail(String email);

    Users findByToken(String token);
}
