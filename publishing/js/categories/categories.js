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

// 수정 유효성
document.getElementById('saveBtn').addEventListener('click', () => {
  const newName = categoryNameInput.value.trim();
  const selectedType = [...radioButtons].find(r => r.checked)?.value;

  // 모든 내 카테고리 이름 가져오기
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

  console.log("수정됨:", { name: newName, type: selectedType });
  modal.style.display = 'none';
});