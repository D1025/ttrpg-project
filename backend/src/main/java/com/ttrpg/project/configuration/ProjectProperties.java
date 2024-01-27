package com.ttrpg.project.configuration;

import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@ConfigurationProperties(prefix = "project")
@Getter
@Setter
public class ProjectProperties {
    private Integer expirationTime;

    private String secretKey;
}
