package com.ttrpg.project.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.EditRoom;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.service.JwtAuthorization;
import com.ttrpg.project.service.RoomsService;
import com.ttrpg.project.model.enums.Status;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/room")
public class RoomController {

    private final RoomsService roomsService;

    private final JwtAuthorization jwtAuthorization;

    @PostMapping("/create")
    public ResponseEntity<RoomReturnDTO> createRoom(@RequestBody CreateRoom room, @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(roomsService.createRoom(room));
    }

    @GetMapping
    public ResponseEntity<List<RoomReturnDTO>> getAllRooms(@RequestParam Status status, @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        return ResponseEntity.ok(roomsService.getAllRooms(status, authorizationHeader));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomReturnDTO> modifyRoom(@RequestBody EditRoom editRoom, @PathVariable UUID id, @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(roomsService.modifyRoom(editRoom, id));
    }


}
