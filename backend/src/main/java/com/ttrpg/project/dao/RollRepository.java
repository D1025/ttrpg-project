package com.ttrpg.project.dao;

import com.ttrpg.project.model.Roll;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

@Repository
public interface RollRepository extends JpaRepository<Roll, UUID> {
}
