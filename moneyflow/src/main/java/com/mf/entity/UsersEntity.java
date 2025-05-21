package com.mf.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity // JPA의 엔티티(=DB 테이블과 매핑되는 객체)임을 선언
@Table(name = "USERS") // USERS 테이블에 매핑
@Getter // 모든 필드 getter 자동 생성
@Setter // 모든 필드 setter 자동 생성
public class UsersEntity {

    @Id // 기본 키(PK) 지정
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_users") // 시퀀스 전략으로 자동 생성 (아래 @SequenceGenerator와 연결됨)
    @SequenceGenerator(name = "seq_users", sequenceName = "SEQ_USERS", allocationSize = 1) // 사용할 시퀀스 생성기 이름과 실제 DB 시퀀스 이름 명시
    @Column(name = "USER_NUMBER") // USER_NUMBER 컬럼과 매핑됨
    private Long userNumber; // 회원 번호 (PK)

    @Column(name = "EMAIL", nullable = false, unique = true, length = 100) // EMAIL 컬럼: NULL 불가, 유니크, 최대 길이 100
    private String email; // 이메일

    @Column(name = "PASSWORD", nullable = false, length = 100) // PASSWORD 컬럼: NULL 불가, 최대 길이 100
    private String password; // 비밀번호

    @Column(name = "PHONE", unique = true, length = 20) // PHONE 컬럼: 유니크, 최대 길이 20
    private String phone; // 핸드폰 번호 (선택 입력)

    @Column(name = "NICKNAME", unique = true, length = 50) // NICKNAME 컬럼: 유니크, 최대 길이 50
    private String nickname; // 닉네임 (선택 입력)
}