package com.ttrpg.project.controller;

import com.ttrpg.project.dto.room.CreateRoom;
import com.ttrpg.project.dto.room.GetRroomDTO;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.service.JwtAuthorization;
import com.ttrpg.project.service.RoomsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<RoomReturnDTO>> getAllRooms(@RequestBody GetRroomDTO roomDTO, @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        return ResponseEntity.ok(roomsService.getAllRooms(roomDTO, authorizationHeader));
    }

}
