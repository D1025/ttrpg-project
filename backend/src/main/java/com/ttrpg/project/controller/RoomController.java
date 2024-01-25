package com.ttrpg.project.controller;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.model.enums.Status;
import com.ttrpg.project.service.RoomsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/{userId}/room")
public class RoomController {

    private final RoomsService roomsService;

    @PostMapping("/create")
    public ResponseEntity<RoomReturnDTO> createRoom(@RequestBody CreateRoom room, @PathVariable("userId") UUID userId) {
        return ResponseEntity.ok(roomsService.createRoom(room, userId));
    }

    @GetMapping
    public ResponseEntity<List<RoomReturnDTO>> getAllRooms(@PathVariable("userId") UUID userId, @RequestParam Status status) {
        return ResponseEntity.ok(roomsService.getAllRooms(userId, status));
    }

}
