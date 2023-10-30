package com.ttrpg.project.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Collection;

import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Users")
public class Users extends Model {
    
    @NotNull
    @Size(max = 50)
    @Column(name = "nickname")
    private String nickname;

    @NotNull
    @Size(max = 60)
    @Column(name = "email")
    private String email;

    @NotNull
    @Size(max = 20)
    @Column(name = "password")
    private String password;

    @Column(name = "token")
    private String token;

    @Column(name = "token_expiration_time")
    private LocalDateTime tokenExpirationTime;

    @NotNull
    @Column(name = "admin")
    private boolean admin = false;

    @JdbcType(VarbinaryJdbcType.class)
    @Column(name = "avatar")
    private byte[] avatar;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(name = "User_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    @ToString.Exclude
    private Collection<Room> rooms;
}
