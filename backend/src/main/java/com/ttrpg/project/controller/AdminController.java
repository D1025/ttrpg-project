package com.ttrpg.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.room.RoomReturnDTO;
import com.ttrpg.project.service.RoomsService;
import com.ttrpg.project.service.UserService;
import com.ttrpg.project.utils.PageUtils;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final RoomsService roomsService;
    private final UserService userService;
    private final PageUtils pageUtils;

    @GetMapping("/rooms")
    public ResponseEntity<Page<RoomReturnDTO>> getAllRooms(@RequestHeader(name = "Authorization") String authorizationHeader, @RequestParam(defaultValue = "0") Integer page) {
        Pageable pageable = pageUtils.getPageable(page, 10);
        return ResponseEntity.ok(roomsService.getAllRooms(authorizationHeader, pageable));
    }

    @GetMapping("/users")
    public ResponseEntity<Page<PublicUserReturnDTO>> getAllUsers(@RequestHeader(name = "Authorization") String authorizationHeader, @RequestParam(defaultValue = "0") Integer page,  @RequestParam(required = false) String name) {
        Pageable pageable = pageUtils.getPageable(page, 10);
        return ResponseEntity.ok(userService.getAllUsers(authorizationHeader, name, pageable));
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
