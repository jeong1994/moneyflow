document.addEventListener("DOMContentLoaded", () => {
  const moreBtn = document.getElementById("showMoreBtn");
  const hiddenItems = document.querySelectorAll("#historyList .toggle-hidden");

  let expanded = false;

  moreBtn.addEventListener("click", () => {
    expanded = !expanded;

    hiddenItems.forEach(item => {
      item.style.display = expanded ? "list-item" : "none";
    });

    moreBtn.textContent = expanded ? "접기" : "더보기";
  });

  // 비밀번호 변경 이동
  const changePwBtn = document.getElementById("changePwBtn");
  changePwBtn.addEventListener("click", () => {
    window.location.href = "/html/user/changePw.html";
  });

  // 회원 탈퇴 이동
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    window.location.href = "/html/user/deleteAccount.html";
  });

  // 로그아웃 처리
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    alert("로그아웃되었습니다.");
    window.location.href = "/html/user/login.html";
  });

  const editBtn = document.getElementById("editNicknameBtn");
  const nicknameArea = document.getElementById("nicknameEditArea");
  const saveBtn = document.getElementById("saveNicknameBtn");
  const nicknameInput = document.getElementById("newNickname");
  const nicknameMessage = document.getElementById("nicknameEditMessage");
  const nicknameDisplay = document.getElementById("nicknameDisplay");

  editBtn.addEventListener("click", () => {
    nicknameArea.style.display = "block";
    nicknameInput.value = nicknameDisplay.textContent;
    nicknameMessage.textContent = "";
  });

  saveBtn.addEventListener("click", async () => {
    const newNickname = nicknameInput.value.trim();
    const regex = /^[a-zA-Z0-9가-힣]{2,6}$/;

    if (!regex.test(newNickname)) {
      nicknameMessage.textContent = "공백 없이 2~6자의 한글, 영문, 숫자만 가능합니다.";
      nicknameMessage.className = "input-message error";
      return;
    }

    try {
      // 실제 백엔드 연동 시 fetch에 URL, 메서드, body 등 설정
      // const response = await fetch("/api/update-nickname", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ nickname: newNickname })
      // });
      // const result = await response.json();

      // 예시 응답 가정
      const result = { success: true };

      if (result.success) {
        nicknameDisplay.textContent = newNickname;
        nicknameArea.style.display = "none";
        alert("닉네임이 성공적으로 변경되었습니다.");
      } else {
        nicknameMessage.textContent = result.message || "닉네임 변경에 실패했습니다.";
        nicknameMessage.className = "input-message error";
      }
    } catch (err) {
      nicknameMessage.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
      nicknameMessage.className = "input-message error";
    }
  });
});