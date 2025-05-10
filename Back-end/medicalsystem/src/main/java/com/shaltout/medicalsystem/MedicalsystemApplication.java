package com.shaltout.medicalsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.shaltout.medicalsystem.entities")
public class MedicalsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicalsystemApplication.class, args);
	}

}
