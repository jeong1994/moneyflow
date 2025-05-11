document.querySelector('.add-form').addEventListener('submit', function (e) {
  e.preventDefault(); // 폼 제출 막기

  const input = document.querySelector('.category-name-input');
  const name = input.value.trim();
  const selectedType = document.querySelector('input[name="type"]:checked')?.value;

  // 1. 입력 확인
  if (!name) {
    alert("카테고리명을 입력해주세요.");
    return;
  }

  // 2. 중복 확인 (내 카테고리 영역 기준)
  const allNames = Array.from(document.querySelectorAll('.my-category .category-name'))
    .map(el => el.textContent.trim().toLowerCase());

  if (allNames.includes(name.toLowerCase())) {
    alert("이미 존재하는 카테고리입니다.");
    return;
  }

  if (!selectedType) {
    alert("카테고리 유형을 선택해주세요.");
    return;
  }

  // 3. 새 항목 DOM에 추가
  const ul = document.getElementById(`custom-${selectedType}`);
  const li = document.createElement('li');

  li.innerHTML = `
    <span class="category-name">${name}</span>
    <div class="category-actions">
      <button class="edit-button" data-type="${selectedType}">✏️ 수정</button>
      <button class="delete-button">🗑️ 삭제</button>
    </div>
  `;
  ul.appendChild(li);

  alert("카테고리가 등록되었습니다.");

  // 4. 입력 초기화
  input.value = '';
  document.querySelectorAll('input[name="type"]').forEach(r => r.checked = false);

  // 5. 새로 추가된 버튼에 이벤트 바인딩 다시 연결
  li.querySelector('.edit-button').addEventListener('click', editHandler);
  li.querySelector('.delete-button').addEventListener('click', deleteHandler);
});

function setupTabs(tabGroupId) {
  const tabGroup = document.getElementById(tabGroupId);
  const buttons = tabGroup.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      document.querySelectorAll(`#${tabGroupId} + ul, #${tabGroupId} ~ ul`).forEach(ul => ul.classList.add('hidden'));
      document.getElementById(button.dataset.target).classList.remove('hidden');
    });
  });
}

setupTabs("defaultTabs");
setupTabs("customTabs");

// 카테고리 수정 모달 열기
const modal = document.getElementById('modalOverlay');
const categoryNameInput = document.getElementById('categoryName');
const radioButtons = document.getElementsByName('categoryType');

document.querySelectorAll('.edit-button').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.closest('li').querySelector('.category-name')?.innerText || '';
    const type = button.dataset.type || 'income'; // data-type이 없으면 기본 매출

    categoryNameInput.value = name;
    radioButtons.forEach(radio => {
      radio.checked = (radio.value === type);
    });

    modal.style.display = 'flex';
  });
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  modal.style.display = 'none';
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const newName = categoryNameInput.value;
  const newType = [...radioButtons].find(r => r.checked)?.value;
  console.log("저장된 값:", newName, newType);
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

let currentEditingItem = null;

document.querySelectorAll('.edit-button').forEach(button => {
  button.addEventListener('click', () => {
    currentEditingItem = button.closest('li');

    const name = currentEditingItem.querySelector('.category-name')?.innerText || '';
    const type = button.dataset.type || 'income';

    categoryNameInput.value = name;
    radioButtons.forEach(radio => {
      radio.checked = (radio.value === type);
    });

    modal.style.display = 'flex';
  });
});

// 수정 유효성
document.getElementById('saveBtn').addEventListener('click', () => {
  const newName = categoryNameInput.value.trim();
  const selectedType = [...radioButtons].find(r => r.checked)?.value;

  const allNames = Array.from(document.querySelectorAll('.my-category .category-name'))
    .map(el => el.textContent.trim().toLowerCase());

  if (!newName) {
    alert("카테고리 이름을 입력하세요.");
    return;
  }

  if (allNames.includes(newName.toLowerCase())) {
    alert("이미 존재하는 카테고리입니다.");
    return;
  }

  if (!selectedType) {
    alert("카테고리 유형을 선택하세요.");
    return;
  }

  // 실제 DOM에 변경 적용
  if (currentEditingItem) {
    const nameSpan = currentEditingItem.querySelector('.category-name');
    nameSpan.textContent = newName;

    alert("카테고리가 수정되었습니다.");
  }

  modal.style.display = 'none';
});

document.querySelectorAll('.delete-button').forEach(button => {
  button.addEventListener('click', () => {
    const li = button.closest('li');
    const name = li.querySelector('.category-name')?.innerText || '이 항목';

    const confirmed = confirm(`정말 "${name}" 카테고리를 삭제하시겠습니까?`);
    if (confirmed) {
      li.remove();
      alert(`"${name}" 카테고리가 삭제되었습니다.`);
    }
  });
});