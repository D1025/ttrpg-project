package com.ttrpg.project.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttrpg.project.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, UUID>{
    
}
