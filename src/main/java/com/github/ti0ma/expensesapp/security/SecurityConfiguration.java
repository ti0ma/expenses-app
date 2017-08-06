package com.github.ti0ma.expensesapp.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		
		// By default, pertmitAll to all the app. The api endpoints are secured in
		// the resource server.
		http.authorizeRequests()
			.antMatchers("/*").permitAll();
	}
	
}
