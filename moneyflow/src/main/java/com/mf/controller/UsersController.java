package com.mf.controller;

import com.mf.dto.LoginDTO;
import com.mf.dto.SignupDTO;
import com.mf.entity.UsersEntity;
import com.mf.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpSession;

// HTML 뷰 렌더링 컨트롤러
@Controller
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    // 로그인 페이지 이동
    @GetMapping("/login")
    public String login() {
        return "users/login"; // templates/users/login.html
    }

    // 회원가입 페이지 이동
    @GetMapping("/signup")
    public String signupForm(Model model) {
        model.addAttribute("signupDTO", new SignupDTO());
        return "users/signup"; // templates/users/signup.html
    }
    
    @GetMapping("/check-email")
    @ResponseBody
    public boolean checkEmail(@RequestParam("email") String email) {
        return usersService.isEmailExists(email);
    }

    @GetMapping("/check-nickname")
    @ResponseBody
    public boolean checkNickname(@RequestParam("nickname") String nickname) {
        return usersService.isNicknameExists(nickname);
    }

    @GetMapping("/check-phone")
    @ResponseBody
    public boolean checkPhone(@RequestParam("phone") String phone) {
        return usersService.isPhoneExists(phone);
    }

    // 회원가입 폼 제출 처리 (POST 방식)
    @PostMapping("/signup")
    public String signupSubmit(@RequestBody SignupDTO signupDTO, Model model) {
        try {
            usersService.signup(signupDTO); // 서비스 호출
            return "redirect:/users/login"; // 성공 시 로그인 페이지로 이동
        } catch (IllegalArgumentException e) {
            // 중복 이메일/닉네임 등의 예외 발생 시 다시 회원가입 페이지로
            model.addAttribute("errorMessage", e.getMessage());
            return "users/signup";
        }
    }
    
    // 로그인 처리
    @PostMapping("/login")
    @ResponseBody
    public String loginSubmit(@RequestBody LoginDTO loginDTO, HttpSession session) {
        UsersEntity user = usersService.getLoginUser(loginDTO);

        if (user != null) {
            session.setAttribute("loginUser", user.getUserNumber()); // 회원번호 저장
            return "success";
        } else {
            return "fail";
        }
    }
    
    // 로그아웃 처리
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // 세션 초기화
        return "redirect:/";  // 메인 페이지 등으로 이동
    }
}