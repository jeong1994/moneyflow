document.getElementById("deleteForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const pw = document.getElementById("deletePassword").value.trim();
  const actualPassword = "test1234!"; // 나중에 서버 연동

  if (!pw) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  if (pw !== actualPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  document.getElementById("confirmModal").style.display = "flex";
});

// 탈퇴 버튼 클릭 시
document.getElementById("confirmDelete").addEventListener("click", () => {
  alert("회원 탈퇴가 완료되었습니다.");
  // 실제 서비스에서는 여기에 서버 요청 및 redirect 추가
  window.location.href = "/html/user/login.html"; // 예시
});

// 취소 버튼 클릭 시
document.getElementById("cancelDelete").addEventListener("click", () => {
  document.getElementById("confirmModal").style.display = "none";
});