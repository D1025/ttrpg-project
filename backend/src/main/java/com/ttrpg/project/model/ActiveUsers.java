package com.ttrpg.project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "active_users")
public class ActiveUsers extends Model {

    @Column(name = "user_id", nullable = false)
    UUID userId;

    @Column(name = "room_id", nullable = false)
    UUID roomId;
}
