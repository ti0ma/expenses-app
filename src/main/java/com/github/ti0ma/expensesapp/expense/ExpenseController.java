package com.github.ti0ma.expensesapp.expense;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.ti0ma.expensesapp.user.User;
import com.github.ti0ma.expensesapp.user.UserRepository;

@RestController
public class ExpenseController {
	private static final String BASE_URL = "/api/expenses";
	private static final String BASE_URL_ID = BASE_URL + "/{id}";
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@PreAuthorize("#oauth2.hasScope('read')")
	@RequestMapping(method = RequestMethod.GET, value = BASE_URL_ID)
	public @ResponseBody ResponseEntity<?> get(@PathVariable("id") Long id, @AuthenticationPrincipal UserDetails userDetails) {
		Expense expense = expenseRepository.findOneByIdAndUserEmail(id, userDetails.getUsername());
		if(expense != null) {
			return new ResponseEntity<>(expense, HttpStatus.OK);
		}
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
	}
	
	@PreAuthorize("#oauth2.hasScope('write')")
	@RequestMapping(method = RequestMethod.POST, value = BASE_URL)
	public ResponseEntity<?> add(@RequestBody(required = true) Expense expense, @AuthenticationPrincipal UserDetails userDetails) {
		User user = userRepository.findOneByEmail(userDetails.getUsername());
		expense.setUser(user);
		
		if (expense.getDate() == null) {
			expense.setDate(new Date());
		}
		
		Expense savedExpense = expenseRepository.save(expense);
		return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
	}
	
	@PreAuthorize("#oauth2.hasScope('read')")
	@RequestMapping(method = RequestMethod.GET, value = BASE_URL)
	public @ResponseBody ResponseEntity<?> list(@AuthenticationPrincipal UserDetails userDetails) {
		List<Expense> expenses = expenseRepository.findAllByUserEmailOrderByDateDesc(userDetails.getUsername());
		if(expenses != null) {
			return new ResponseEntity<>(expenses, HttpStatus.OK);
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK); 
	}
	
	@PreAuthorize("#oauth2.hasScope('write')")
	@RequestMapping(method = RequestMethod.PUT, value = BASE_URL_ID)
	public ResponseEntity<String> update(
		@PathVariable("id") Long expenseId,
		@RequestBody(required = true) Expense updateExpense,
		@AuthenticationPrincipal UserDetails userDetails
	) {
		Expense expense = expenseRepository.findOneByIdAndUserEmail(expenseId, userDetails.getUsername());
		if(expense != null) {
			expense.merge(updateExpense);
			expenseRepository.save(expense);
			return new ResponseEntity<String>(HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);	
	}
}
