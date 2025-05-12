document.addEventListener('DOMContentLoaded', () => {
  // 탭 전환
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 모든 탭 초기화
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // 클릭된 탭 활성화
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      document.getElementById(`tab-${targetId}`).classList.add('active');
    });
  });

  // 아이디 찾기 (휴대폰 인증)
  const verifyPhoneId = document.getElementById('verifyPhoneId');
  const confirmCodeId = document.getElementById('confirmCodeId');
  const phoneForId = document.getElementById('phoneForId');
  const codeSectionId = document.getElementById('codeSectionId');
  const codeInputId = document.getElementById('verificationCodeId');
  const idResultMessage = document.getElementById('idResultMessage');

  let phoneVerifiedId = false;

  verifyPhoneId.addEventListener('click', () => {
    const phone = phoneForId.value.trim();
    const phoneRegex = /^010\d{8}$/;

    if (!phoneRegex.test(phone)) {
      idResultMessage.textContent = '형식을 확인하세요. -제외';
      idResultMessage.className = 'input-message error';
      codeSectionId.style.display = 'none';
      phoneVerifiedId = false;
    } else {
      idResultMessage.textContent = '인증번호가 발송되었습니다.';
      idResultMessage.className = 'input-message success';
      codeSectionId.style.display = 'flex';
    }
  });

  confirmCodeId.addEventListener('click', () => {
    const code = codeInputId.value.trim();

    if (code === '123456') {
      idResultMessage.textContent = '회원님의 이메일은 test@test.com 입니다.';
      idResultMessage.className = 'input-message success';
      phoneVerifiedId = true;
    } else {
      idResultMessage.textContent = '인증번호가 일치하지 않습니다.';
      idResultMessage.className = 'input-message error';
      phoneVerifiedId = false;
    }
  });

  // 비밀번호 재설정 (이메일)
  const emailForPw = document.getElementById('emailForPw');
  const sendTempPw = document.getElementById('sendTempPw');
  const pwResultMessage = document.getElementById('pwResultMessage');

  sendTempPw.addEventListener('click', () => {
    const email = emailForPw.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      pwResultMessage.textContent = '올바른 이메일 형식이 아닙니다.';
      pwResultMessage.className = 'input-message error';
    } else {
      // 실제 서비스에서는 이메일로 임시 비밀번호 발송
      pwResultMessage.textContent = '임시 비밀번호가 메일로 발송되었습니다.';
      pwResultMessage.className = 'input-message success';
    }
  });
});
