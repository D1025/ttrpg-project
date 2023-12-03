package com.ttrpg.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class TtrpgApplication {

	public static void main(String[] args) {
		SpringApplication.run(TtrpgApplication.class, args);
	}

}
