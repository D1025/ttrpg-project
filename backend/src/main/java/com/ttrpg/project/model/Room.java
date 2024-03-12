package com.ttrpg.project.model;

import java.util.List;

import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

import com.ttrpg.project.model.enums.Systems;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_room",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<Users> users;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Characters> characters;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Messages> messages;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Roll> rolls;
}

