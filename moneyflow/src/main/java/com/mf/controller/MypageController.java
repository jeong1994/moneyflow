package com.mf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MypageController {

//	마이페이지 접속
	@GetMapping("/mypage")
	public String mypage() {

		return "mypage/mypage";
	}
}
