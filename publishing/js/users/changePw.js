document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("changePwForm");
  const currentPw = document.getElementById("currentPassword");
  const newPw = document.getElementById("newPassword");
  const confirmPw = document.getElementById("confirmPassword");

  const currentMsg = createMessageBelow(currentPw, "currentPwMessage");
  const newMsg = createMessageBelow(newPw, "newPwMessage");
  const confirmMsg = createMessageBelow(confirmPw, "confirmPwMessage");

  // 👁 버튼 토글
  document.querySelectorAll(".eye-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      const isPw = input.type === "password";
      input.type = isPw ? "text" : "password";
      btn.textContent = isPw ? "👁‍🗨" : "👁";
    });
  });

  // 유효성 검사 함수들
  const validateCurrent = () => {
    if (currentPw.value.trim() === "") {
      showError(currentMsg, "현재 비밀번호를 입력해주세요.");
      return false;
    } else {
      clearMessage(currentMsg);
      return true;
    }
  };

  const validateNew = () => {
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
    if (!pwRegex.test(newPw.value)) {
      showError(newMsg, "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.");
      return false;
    } else {
      showSuccess(newMsg, "사용 가능한 비밀번호입니다.");
      return true;
    }
  };

  const validateConfirm = () => {
    if (confirmPw.value !== newPw.value) {
      showError(confirmMsg, "비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      showSuccess(confirmMsg, "비밀번호가 일치합니다.");
      return true;
    }
  };

  // 실시간 검사
  currentPw.addEventListener("input", validateCurrent);
  newPw.addEventListener("input", validateNew);
  confirmPw.addEventListener("input", validateConfirm);

  // 제출 시 검사
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid =
      validateCurrent() &
      validateNew() &
      validateConfirm(); // 단순 &, short-circuit 방지

    if (valid) {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      window.location.href = "/html/mypage/mypage.html";
    }
  });

  // 메시지 생성 함수
  function createMessageBelow(inputEl, id) {
    let p = document.createElement("p");
    p.className = "input-message";
    p.id = id;
    inputEl.parentElement.insertAdjacentElement("afterend", p);
    return p;
  }

  function showError(el, msg) {
    el.textContent = msg;
    el.className = "input-message error";
  }

  function showSuccess(el, msg) {
    el.textContent = msg;
    el.className = "input-message success";
  }

  function clearMessage(el) {
    el.textContent = "";
  }
});
