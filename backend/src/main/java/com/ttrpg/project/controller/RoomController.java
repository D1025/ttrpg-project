package com.ttrpg.project.controller;

import java.util.List;
import java.util.UUID;

import com.ttrpg.project.dto.room.InvitationLink;
import com.ttrpg.project.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    private final PageUtils pageUtils;

    @PostMapping("/create")
    public ResponseEntity<RoomReturnDTO> createRoom(@RequestBody CreateRoom room, @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(roomsService.createRoom(room));
    }

    @GetMapping
    public ResponseEntity<Page<RoomReturnDTO>> getAllRooms(@RequestParam Status status, @RequestHeader(name = "Authorization", required = false) String authorizationHeader, @RequestParam(defaultValue = "0") Integer page, @RequestParam(required = false)  String name) {
        Pageable pageable = pageUtils.getPageable(page, 10);
        return ResponseEntity.ok(roomsService.getAllRooms(status, authorizationHeader, pageable, name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomReturnDTO> modifyRoom(@RequestBody EditRoom editRoom, @PathVariable UUID id, @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        return ResponseEntity.ok(roomsService.modifyRoom(editRoom, id, authorizationHeader));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable UUID id, @RequestHeader(name = "Authorization") String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        roomsService.deleteRoom(id, authorizationHeader);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    public ResponseEntity<Page<RoomReturnDTO>> getMyOwnedRooms(@RequestHeader(name = "Authorization") String authorizationHeader, @RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(required = false) String name) {
        jwtAuthorization.authorize(authorizationHeader);
        Pageable pageable = pageUtils.getPageable(pageNumber, 10);
        return ResponseEntity.ok(roomsService.getMyOwnedRooms(authorizationHeader, pageable, name));
    }

    @GetMapping("/{id}/invitations")
    public ResponseEntity<InvitationLink> getInvitationLink(@PathVariable UUID id, @RequestHeader(name = "Authorization") String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(new InvitationLink(roomsService.getInvitationLink(id, authorizationHeader)));
    }

    @PutMapping("/{id}/invitations")
    public ResponseEntity<InvitationLink> regenerateInvitationLink(@PathVariable UUID id, @RequestHeader(name = "Authorization") String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        return ResponseEntity.ok(new InvitationLink(roomsService.regenerateInvitationLink(id, authorizationHeader)));
    }

    @DeleteMapping("/{id}/invitations")
    public ResponseEntity<Void> deleteInvitationLink(@PathVariable UUID id, @RequestHeader(name = "Authorization") String authorizationHeader) {
        jwtAuthorization.authorize(authorizationHeader);
        roomsService.deleteInvitationLink(id, authorizationHeader);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/join/{invitation}")
    public ResponseEntity<RoomReturnDTO> getInfoAboutJoining(@PathVariable String invitation) {

        return ResponseEntity.ok(roomsService.getInfoAboutJoining(invitation));
    }

    @PostMapping("/join/{invitation}")
    public ResponseEntity<Void> joinRoom(@RequestHeader(name = "Authorization") String authorizationHeader, @PathVariable String invitation) {
        jwtAuthorization.authorize(authorizationHeader);
        roomsService.joinRoom(authorizationHeader, invitation);
        return ResponseEntity.ok().build();
    }

}
