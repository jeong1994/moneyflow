package com.mf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("html/mypage")
public class MypageController {

	@GetMapping("/mypage.html")
	public String mypage() {

		return "mypage/mypage";
	}
}
