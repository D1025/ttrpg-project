package com.ttrpg.project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
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
@Table(name = "Remember_me")
public class RememberMe extends Model {

    @NotNull
    @JoinColumn(name = "user_id")
    private Users user;

    @NotNull
    @Column(name = "remember_token")
    private String rememberToken;

}
