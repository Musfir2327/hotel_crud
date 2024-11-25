package com.example.Hotel_log;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.Hotel_log")
@EnableJpaRepositories(basePackages = "com.example.Hotel_log.Repository")
public class HotelLogSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelLogSpringApplication.class, args);
	}

}
