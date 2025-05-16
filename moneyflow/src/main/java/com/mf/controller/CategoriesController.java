package com.mf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/categories")
public class CategoriesController {

//	카테고리 관리 페이지 접속
	@GetMapping("/categories")
	public String categories() {

		return "categories/categories";
	}
}
