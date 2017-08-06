package com.github.ti0ma.expensesapp.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
	
	/**
	 * Support for angular app
	 */
	@RequestMapping({ "/expenses", "/login" })
	public String index() {
		return "forward:index.html";
	}
	
}
