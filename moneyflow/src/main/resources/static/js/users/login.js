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

	loginForm.addEventListener("submit", async function(e) {
		e.preventDefault(); // 폼 제출 시 새로고침 막기

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		if (!email) {
			alert("이메일을 입력하세요.");
			return;
		}
		if (!password) {
			alert("비밀번호를 입력하세요.");
			return;
		}

		/*   // 임시 사용자 정보 (추후 백엔드)
		   const dummyEmail = "test@test.com";
		   const dummyPassword = "test1234!";
	   */

		try {
			const res = await fetch("/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })
			});

			const result = await res.text();
			if (result === "success") {
				alert("환영합니다!");
				window.location.href = "/";
			} else {
				alert("이메일 또는 비밀번호가 올바르지 않습니다.");
			}
		} catch (err) {
			console.error("로그인 요청 실패", err);
			alert("서버 오류가 발생했습니다.");
		}
	});
	
	// SNS 로그인
	const snsButtons = document.querySelector(".sns-buttons");

	snsButtons.addEventListener("click", (e) => {
	  const target = e.target; // 자식요소 이벤트 위임
	  if (target.classList.contains("kakao") ||
	      target.classList.contains("naver") ||
	      target.classList.contains("google")) {
	    alert("준비중입니다.");
	  }
	});
});