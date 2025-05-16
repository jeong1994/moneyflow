package com.mf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/transactions")
public class TransactionsController {
	
//	내역 관리 페이지 접속
	@GetMapping("/transactions")
	public String transactions() {

		return "transactions/transactions";
	}
}
