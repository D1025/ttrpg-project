package com.ttrpg.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Users")
public class Users extends Model {

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "token")
    private String token;

    @Column(name = "token_expiration_time")
    private Timestamp tokenExpirationTime;

    @Column(name = "admin", nullable = false)
    private boolean admin;

    @Column(name = "avatar")
    private byte[] avatar;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private List<Room> ownedRooms;

    @ManyToMany
    @JoinTable(
            name = "User_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id")
    )
    private List<Room> joinedRooms;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<RememberMe> rememberMeTokens;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Characters> characters;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Messages> messages;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Roll> rolls;

}