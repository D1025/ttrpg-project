package com.ttrpg.project.model;

import jakarta.persistence.*;

import com.ttrpg.project.model.enums.Systems;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Rooms")
public class Room extends Model {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    @JdbcType(VarbinaryJdbcType.class)
    private byte[] image;

    @Column(name = "image_extension")
    private String imageExtension;

    @Column(name = "system", nullable = false)
    @Enumerated(EnumType.STRING)
    private Systems system;

    @Column(name = "invitation_link", nullable = false)
    private String invitationLink;

    @ManyToOne
    @JoinColumn(name = "owner", nullable = false)
    private Users owner;

    @Column(name = "private", nullable = false)
    private boolean privateRoom;

    @ManyToMany(mappedBy = "joinedRooms", fetch = FetchType.LAZY)
    private List<Users> users;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Characters> characters;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Messages> messages;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Roll> rolls;
}

