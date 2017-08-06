package com.github.ti0ma.expensesapp.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	/**
	 * Dummy service to check if the user is logged in
	 */
	@PreAuthorize("#oauth2.hasScope('read')")
	@RequestMapping(method = RequestMethod.GET, value = "/api/status")
	public @ResponseBody ResponseEntity<String> status() {
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
}
