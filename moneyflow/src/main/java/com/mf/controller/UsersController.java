package com.mf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/html/users")
public class UsersController {
	
    @GetMapping("/login.html")
    public String login() {
    	
        return "users/login";
    }
    
    @GetMapping("/signup.html")
    public String signup() {
    	
        return "users/signup";
    }
}
