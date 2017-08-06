package com.github.ti0ma.expensesapp.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
	
	User findOneByEmail(String email);
	
}
