// 유효성 상태 저장용 객체
const validation = {
	email: false,
	password: false,
	confirmPassword: false,
	terms: false
};

// 이메일 형식 검사 (간단한 정규표현식)
const emailInput = document.getElementById('email');
const emailMessage = document.getElementById('emailMessage');

emailInput.addEventListener('input', async () => { // 백엔드에서 async 추가
	const email = emailInput.value.trim();
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!regex.test(email)) {
		emailMessage.textContent = '올바른 이메일 형식이 아닙니다.';
		emailMessage.className = 'input-message error';
		validation.email = false;
		return;
	}/* else { // 퍼블리싱 단계
    emailMessage.textContent = '사용 가능한 이메일 형식입니다.';
    emailMessage.className = 'input-message success';
    validation.email = true;
  }*/

	try { // 백엔드
		const res = await fetch(`/users/check-email?email=${encodeURIComponent(email)}`);
		const exists = await res.json();

		if (exists) {
			emailMessage.textContent = '이미 사용 중인 이메일입니다.';
			emailMessage.className = 'input-message error';
			validation.email = false;
		} else {
			emailMessage.textContent = '사용 가능한 이메일입니다.';
			emailMessage.className = 'input-message success';
			validation.email = true;
		}
	} catch (err) {
		console.error('이메일 중복 확인 실패', err);
		validation.email = false;
	}
});

// 비밀번호 유효성 검사
const pwInput = document.getElementById('password');
const pwMessage = document.getElementById('passwordMessage');

pwInput.addEventListener('input', () => {
	const pw = pwInput.value;
	const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
	if (!regex.test(pw)) {
		pwMessage.textContent = '영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.';
		pwMessage.className = 'input-message error';
		validation.password = false;
	} else {
		pwMessage.textContent = '사용 가능한 비밀번호입니다.';
		pwMessage.className = 'input-message success';
		validation.password = true;
	}
});

// 비밀번호 확인 검사
const confirmInput = document.getElementById('confirmPassword');
const confirmMessage = document.getElementById('confirmMessage');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirm = document.getElementById('toggleConfirm');
const passwordInput = document.getElementById('password');

confirmInput.addEventListener('input', () => {
	if (confirmInput.value !== pwInput.value) {
		confirmMessage.textContent = '비밀번호가 일치하지 않습니다.';
		confirmMessage.className = 'input-message error';
		validation.confirmPassword = false;
	} else {
		confirmMessage.textContent = '비밀번호가 일치합니다.';
		confirmMessage.className = 'input-message success';
		validation.confirmPassword = true;
	}
});

togglePassword.addEventListener('click', () => {
	const type = passwordInput.type === 'password' ? 'text' : 'password';
	passwordInput.type = type;
	togglePassword.textContent = type === "password" ? "👁" : "👁‍🗨";
});

toggleConfirm.addEventListener('click', () => {
	const type = confirmInput.type === 'password' ? 'text' : 'password';
	confirmInput.type = type;
	toggleConfirm.textContent = type === "password" ? "👁" : "👁‍🗨";
});

// 휴대폰 번호
const phoneInput = document.getElementById('phone');
const verifyBtn = document.getElementById('verifyPhone');
const phoneMessage = document.getElementById('phoneMessage');
const codeSection = document.getElementById('codeSection');
const codeInput = document.getElementById('verificationCode');
const confirmCodeBtn = document.getElementById('confirmCode');
const codeMessage = document.getElementById('codeMessage');

let phoneVerified = false;


// 휴대폰 검사
verifyBtn.addEventListener('click', async () => { // 백엔드 async 추가
	const phone = phoneInput.value.trim();
	const phoneRegex = /^010\d{8}$/;

	if (!phoneRegex.test(phone)) {
		phoneMessage.textContent = '형식을 확인하세요. -제외';
		phoneMessage.className = 'input-message error';
		codeSection.style.display = 'none';
		phoneVerified = false;
		return;
	} /*else { // 프론트에서 백 넘어가면 변경
    phoneMessage.textContent = '인증번호가 발송되었습니다.';
    phoneMessage.className = 'input-message success';
    codeSection.style.display = 'flex';
  }*/
	try { // 백엔드
		const res = await fetch(`/users/check-phone?phone=${encodeURIComponent(phone)}`);
		const exists = await res.json();

		if (exists) {
			phoneMessage.textContent = '이미 가입된 번호입니다.';
			phoneMessage.className = 'input-message error';
			codeSection.style.display = 'none';
			phoneVerified = false;
		} else {
			phoneMessage.textContent = '인증번호가 발송되었습니다.';
			phoneMessage.className = 'input-message success';
			codeSection.style.display = 'flex';
		}
	} catch (err) {
		console.error('휴대폰 중복 확인 실패', err);
	}
});

confirmCodeBtn.addEventListener('click', () => {
	const code = codeInput.value.trim();

	if (code === '123456') {
		codeMessage.textContent = '인증이 완료되었습니다.';
		codeMessage.className = 'input-message success';
		phoneVerified = true;
	} else {
		codeMessage.textContent = '인증번호가 일치하지 않습니다.';
		codeMessage.className = 'input-message error';
		phoneVerified = false;
	}
});

// 닉네임 검사
const nicknameInput = document.getElementById('nickname');
const nicknameMessage = document.getElementById('nicknameMessage');

nicknameInput.addEventListener('input', async () => { //백엔드 async 추가
	const nickname = nicknameInput.value;
	const trimmed = nickname.trim();
	const noWhitespace = /^\S+$/;
	const validPattern = /^[a-zA-Z0-9가-힣]{2,6}$/;

	if (!trimmed || !validPattern.test(trimmed) || !noWhitespace.test(nickname)) {
		nicknameMessage.textContent = '닉네임은 공백없이 2~6자의 한글, 영문, 숫자만 가능합니다.';
		nicknameMessage.className = 'input-message error';
		return;
	}/* else { //프론트
		nicknameMessage.textContent = '사용 가능한 닉네임입니다.';
		nicknameMessage.className = 'input-message success';
	}*/
	try {
		const res = await fetch(`/users/check-nickname?nickname=${encodeURIComponent(nickname)}`);
		const exists = await res.json();

		if (exists) {
			nicknameMessage.textContent = '이미 사용 중인 닉네임입니다.';
			nicknameMessage.className = 'input-message error';
		} else {
			nicknameMessage.textContent = '사용 가능한 닉네임입니다.';
			nicknameMessage.className = 'input-message success';
		}
	} catch (err) {
		console.error('닉네임 중복 확인 실패', err);
	}
});

// 체크박스 검사
const checkAll = document.getElementById('checkAll');
const requiredChecks = document.querySelectorAll('#checkAge, #checkTerms, #checkPrivacy');

checkAll.addEventListener('change', () => {
	requiredChecks.forEach(chk => chk.checked = checkAll.checked);
	validation.terms = checkAll.checked;
});

requiredChecks.forEach(chk => {
	chk.addEventListener('change', () => {
		const allChecked = [...requiredChecks].every(c => c.checked);
		checkAll.checked = allChecked;
		validation.terms = allChecked;
	});
});

// 최종 제출
document.getElementById('signupForm').addEventListener('submit', async (e) => {
	e.preventDefault();

	if (!Object.values(validation).every(v => v)) {
		alert('입력 정보를 모두 정확히 입력해주세요.');
		return;
	}

	const nickname = nicknameInput.value.trim();
	const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,6}$/;
	const hasWhitespace = /\s/;

	if (nickname !== '' && (!nicknameRegex.test(nickname) || hasWhitespace.test(nickname))) {
		alert('닉네임은 공백 없이 2~6자의 한글, 영문, 숫자만 가능합니다.');
		return;
	}

	const phone = phoneInput.value.trim();
	if (phone !== '' && !phoneVerified) {
		alert('휴대폰 번호 인증을 완료해주세요.');
		return;
	}

	// 백엔드에 전달할 데이터 구성
	const data = {
		email: emailInput.value.trim(),
		password: passwordInput.value,
		phone: phone === '' ? null : phone,
		nickname: nickname === '' ? null : nickname
	};

	try {
		const res = await fetch('/users/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (res.ok) {
			alert('회원가입이 완료되었습니다!');
			window.location.href = '/users/login';
		} else {
			const error = await res.text();
			alert('회원가입 실패');
			console.log(error);
		}
	} catch (err) {
		console.error('회원가입 요청 실패:', err);
		alert('서버와의 통신 중 문제가 발생했습니다.');
	}
});
