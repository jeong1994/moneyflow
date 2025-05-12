document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginForm = document.getElementById("loginForm");
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  toggleBtn.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    toggleBtn.textContent = type === "password" ? "👁" : "👁‍🗨";
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // 폼 제출 시 새로고침 막기

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("입력된 이메일:", email);
    console.log("입력된 비밀번호:", password);

    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    // 임시 사용자 정보 (추후 백엔드)
    const dummyEmail = "test@test.com";
    const dummyPassword = "test1234!";

    if (email === dummyEmail && password === dummyPassword) {
      alert("환영합니다");
      window.location.href = "/html/main/mfMain.html";
    } else {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  });
});