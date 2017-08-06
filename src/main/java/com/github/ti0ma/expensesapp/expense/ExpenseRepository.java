package com.github.ti0ma.expensesapp.expense;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends PagingAndSortingRepository<Expense, Long> {
	
	Expense findOneByIdAndUserEmail(Long id, String email);
	
	List<Expense> findAllByUserEmailOrderByDateDesc(String email);
	
}
