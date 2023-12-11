package com.ttrpg.project.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttrpg.project.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {

}