package com.ttrpg.project.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Rolls")
public class Roll extends Model {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "roll", nullable = false)
    private String roll; // JSON format

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;
}
