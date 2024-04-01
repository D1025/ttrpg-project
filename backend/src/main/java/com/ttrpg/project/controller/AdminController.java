package com.ttrpg.project.controller;

import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ttrpg.project.service.JwtAuthorization;
import com.ttrpg.project.service.RoomsService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final RoomsService roomsService;
    private final UserService userService;

    @GetMapping("/rooms")
    public ResponseEntity<List<RoomReturnDTO>> getAllRooms(@RequestHeader(name = "Authorization") String authorizationHeader) {
        return ResponseEntity.ok(roomsService.getAllRooms(authorizationHeader));
    }

    @GetMapping("/users")
    public ResponseEntity<List<PublicUserReturnDTO>> getAllUsers(@RequestHeader(name = "Authorization") String authorizationHeader) {
        return ResponseEntity.ok(userService.getAllUsers(authorizationHeader));
    }

    @PostMapping("/users/{id}/ban")
    public ResponseEntity<PublicUserReturnDTO> banUser(@PathVariable String id, @RequestHeader(name = "Authorization") String authorizationHeader) {
        return ResponseEntity.ok(userService.banUser(id, authorizationHeader));
    }

    @PostMapping("/users/{id}/unban")
    public ResponseEntity<PublicUserReturnDTO> unbanUser(@PathVariable String id, @RequestHeader(name = "Authorization") String authorizationHeader) {
        return ResponseEntity.ok(userService.unbanUser(id, authorizationHeader));
    }
}
