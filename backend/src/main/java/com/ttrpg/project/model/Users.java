package com.ttrpg.project.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


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
    private LocalDateTime tokenExpirationTime;

    @Column(name = "admin", nullable = false)
    private boolean admin;


    @Column(name = "avatar")
    @JdbcType(VarbinaryJdbcType.class)
    private byte[] avatar;

    @Column(name = "avatar_extension")
    private String avatarExtension;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private List<Room> ownedRooms;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_room",
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