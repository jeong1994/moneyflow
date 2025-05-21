package com.mf.service;

import com.mf.dto.LoginDTO;
import com.mf.dto.SignupDTO;
import com.mf.entity.UsersEntity;
import com.mf.repository.UsersRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    // 이메일 중복
    public boolean isEmailExists(String email) {
        return email != null && usersRepository.existsByEmail(email);
    }

    // 핸드폰 중복
    public boolean isPhoneExists(String phone) {
        return phone != null && usersRepository.existsByPhone(phone);
    }

    // 닉네임 중복
    public boolean isNicknameExists(String nickname) {
        return nickname != null && usersRepository.existsByNickname(nickname);
    }
    
    // 회원가입
    public void signup(SignupDTO dto) {
        // 이메일 중복 확인
        if (usersRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        
        // 핸드폰 번호 중복 확인 (폰번호 있을 때만)
        if (dto.getPhone() != null && usersRepository.existsByPhone(dto.getPhone())) {
            throw new IllegalArgumentException("이미 사용 중인 휴대폰 번호입니다.");
        }

        // 닉네임 중복 확인 (닉네임 있을 때만)
        if (dto.getNickname() != null && usersRepository.existsByNickname(dto.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        // DTO -> Entity 변환 및 비밀번호 암호화
        UsersEntity user = new UsersEntity();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPhone(dto.getPhone());
        user.setNickname(dto.getNickname());

        // 저장
        usersRepository.save(user);
    }
    
    // 회원정보 리턴용
    public UsersEntity getLoginUser(LoginDTO dto) {
        Optional<UsersEntity> optionalUser = usersRepository.findByEmail(dto.getEmail());

        if (optionalUser.isPresent()) {
            UsersEntity user = optionalUser.get();
            if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
                return user; // 로그인 성공 시 사용자 정보 반환
            }
        }

        return null; // 실패
    }
    
    // 로그인
    public boolean login(LoginDTO dto) {
        Optional<UsersEntity> optionalUser = usersRepository.findByEmail(dto.getEmail());

        if (optionalUser.isPresent()) {
            UsersEntity user = optionalUser.get();
            return passwordEncoder.matches(dto.getPassword(), user.getPassword());
        }

        return false;
    }
}