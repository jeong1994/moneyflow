package com.mf.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🔒 시큐리티 필터 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRF 비활성화 (프론트-백 통신 편하게)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/api/**", "/css/**", "/js/**", "/image/**", "/html/**").permitAll() // 접근 허용
                .anyRequest().permitAll()
            )
            .formLogin(login -> login.disable()) // 기본 로그인 페이지 비활성화
            .httpBasic(httpBasic -> httpBasic.disable()); // HTTP 기본 인증도 비활성화

        return http.build();
    }
}
