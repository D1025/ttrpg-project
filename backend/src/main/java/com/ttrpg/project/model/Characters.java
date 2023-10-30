package com.ttrpg.project.model;

import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType;

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
@Table(name = "Characters")
public class Characters extends Model {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Users user;

    @JdbcType(VarbinaryJdbcType.class)
    private byte[] avatar;

    @NotNull
    private String data;
}
