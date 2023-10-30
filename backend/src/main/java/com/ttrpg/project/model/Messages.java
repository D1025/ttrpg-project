package com.ttrpg.project.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "Messages")
public class Messages extends Model {
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Users user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    @NotNull
    private String message;

    @NotNull
    private LocalDateTime timestamp;
}
