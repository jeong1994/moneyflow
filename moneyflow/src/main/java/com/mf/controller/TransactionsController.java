package com.mf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("html/transactions")
public class TransactionsController {
	
	@GetMapping("/transactions.html")
	public String transactions() {

		return "transactions/transactions";
	}
}
