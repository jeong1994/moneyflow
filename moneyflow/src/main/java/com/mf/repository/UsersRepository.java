package com.mf.repository;

import com.mf.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional; // findBy 계열 메서드에서 null 체크에 유리

// UsersEntity를 위한 레포지토리 인터페이스
// 엔티티 클래스, PK 타입 지정
public interface UsersRepository extends JpaRepository<UsersEntity, Long> { // Spring Data JPA에서 JpaRepository를 상속

    // 이메일 중복 체크
    boolean existsByEmail(String email);

    // 핸드폰 중복 체크
    boolean existsByPhone(String phone);

    // 닉네임 중복 체크
    boolean existsByNickname(String nickname);

    // 로그인
//  Optional<UsersEntity> findByEmailAndPassword(String email, String password);
//  비밀번호는 보통 암호화(예: BCrypt)된 상태로 저장되므로, 평문 비교 방식 지양
//  이후 서비스단에서 BCrypt.matches() 등으로 비밀번호 비교
	Optional<UsersEntity> findByEmail(String email);
}