package com.ttrpg.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.ttrpg.project.configuration.ProjectProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication()
@EnableConfigurationProperties(ProjectProperties.class)
@EnableJpaAuditing
public class TtrpgApplication {
	public static void main(String[] args) {
		SpringApplication.run(TtrpgApplication.class, args);
	}

}
