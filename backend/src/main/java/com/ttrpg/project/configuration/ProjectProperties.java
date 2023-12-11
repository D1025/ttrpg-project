package com.ttrpg.project.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@ConfigurationProperties(prefix = "project")
@Getter
public class ProjectProperties {
    private Integer expirationTime;
}
