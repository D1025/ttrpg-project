package com.ttrpg.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.ttrpg.project.configuration.ProjectProperties;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@EnableConfigurationProperties(ProjectProperties.class)
public class TtrpgApplication {

	public static void main(String[] args) {
		SpringApplication.run(TtrpgApplication.class, args);
	}

}
