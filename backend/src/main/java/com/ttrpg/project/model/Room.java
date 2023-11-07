package com.ttrpg.project.model;

import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

import com.ttrpg.project.model.enums.Systems;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
@Table(name = "Room")
public class Room extends Model{
    
    @NotNull
    @Size(max = 50)
    @Column(name = "name")
    private String name;

    @NotNull
    @Size(max = 60)
    @Column(name = "description")
    private String description;

    @JdbcType(VarbinaryJdbcType.class)
    @Column(name = "image")
    private byte[] image;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "system")
    private Systems system;

    @Column(name = "invitation_link")
    private String invitationLink;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private Users owner;

    @NotNull
    @Column(name = "private")
    private boolean privateRoom = false;
}
