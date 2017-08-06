package com.github.ti0ma.expensesapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.github.ti0ma.expensesapp.user.User;
import com.github.ti0ma.expensesapp.user.UserRepository;

@SpringBootApplication
@EnableAutoConfiguration
public class ExpensesappApplication {
	
	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(ExpensesappApplication.class, args);
		
		// Adding a user
		UserRepository userRepo = ctx.getBean(UserRepository.class);
		PasswordEncoder passwordEncoder = ctx.getBean(PasswordEncoder.class);
		
		User user = new User();
		user.setEmail("test@test.com");
		user.setPassword(passwordEncoder.encode("password"));
		userRepo.save(user);
	}
}
