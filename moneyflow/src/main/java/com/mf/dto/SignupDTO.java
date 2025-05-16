package com.mf.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//	회원가입 페이지
public class SignupDTO {

    private String email;
    private String password;
    private String phone;
    private String nickname;
}