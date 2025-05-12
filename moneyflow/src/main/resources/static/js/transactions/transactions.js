// document.addEventListener("DOMContentLoaded", () => {
// 필터버튼관련(카드형)
//   const filterButtons = document.querySelectorAll(".view-filter button");
//   const cards = document.querySelectorAll(".transaction-card");

//   filterButtons.forEach(button => {
//     button.addEventListener("click", () => {
//       filterButtons.forEach(btn => btn.classList.remove("active"));
//       button.classList.add("active");

//       const filter = button.dataset.filter;
//       cards.forEach(card => {
//         const type = card.querySelector(".transaction-type")?.classList.contains("income")
//           ? "income"
//           : "expense";
//         card.style.display = (filter === "all" || filter === type) ? "block" : "none";
//       });
//     });
//   });

// 모달 관련
// const transactionModal = document.getElementById('transactionModal');
// const modalDate = document.getElementById('modalDate');
// const modalCategory = document.getElementById('modalCategory');
// const modalAmount = document.getElementById('modalAmount');
// const modalMemo = document.getElementById('modalMemo');

// document.querySelectorAll('.edit-button').forEach(button => {
//   button.addEventListener('click', () => {
//     modalDate.value = '2025-04-28';
//     modalCategory.value = '판매수익';
//     modalAmount.value = 150000;
//     modalMemo.value = '커피 10잔 판매';

//     transactionModal.style.display = 'flex';
//   });
// });

// document.getElementById('modalCancelBtn').addEventListener('click', () => {
//   transactionModal.style.display = 'none';
// });

// document.getElementById('modalSaveBtn').addEventListener('click', () => {
//   const date = modalDate.value;
//   const category = modalCategory.value.trim();
//   const amount = modalAmount.value.trim();
//   const memo = modalMemo.value.trim();

//   const today = new Date();
//   const todayStr = today.toISOString().split("T")[0];

//   const todayLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

//   if (!date) {
//     alert("날짜를 선택하세요.");
//     return;
//   }
//   if (date > todayStr) {
//     alert(`${todayLabel} 까지만 입력 가능합니다.`);
//     return;
//   }
//   if (!category) {
//     alert("카테고리를 선택하세요.");
//     return;
//   }
//   if (!amount || !/^\d+$/.test(amount) || parseInt(amount) < 1) {
//     alert("금액은 1 이상의 양의 정수만 입력할 수 있습니다.");
//     return;
//   }
//   if (!memo) {
//     alert("메모를 입력하세요.");
//     return;
//   }

//   const data = { date, category, amount, memo };
//   console.log("수정된 내역:", data);
//   transactionModal.style.display = 'none';
// });

// window.addEventListener('click', (e) => {
//   if (e.target === transactionModal) {
//     transactionModal.style.display = 'none';
//   }
// });
// });

document.addEventListener('DOMContentLoaded', function () {
  const addModal = document.getElementById('addModal');
  const detailModal = document.getElementById('detailModal');
  const addForm = document.getElementById('addForm');
  const closeBtn = document.getElementById('addModalClose');
  const detailCloseBtn = document.getElementById('detailModalClose');
  const formTitle = addModal.querySelector('h2');

  let calendar;
  let currentEvent = null;
  // 캘린더 로그
  calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth',
    locale: 'ko',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    dateClick(info) {
      openAddModal(info.dateStr);
    },
    eventClick(info) {
      const props = info.event.extendedProps;
      currentEvent = info.event;

      document.getElementById('detailType').textContent = props.type === 'income' ? '수입' : '지출';
      document.getElementById('detailDate').textContent = info.event.startStr;
      document.getElementById('detailAmount').textContent = `₩${parseInt(props.amount).toLocaleString()}`;
      document.getElementById('detailCategory').textContent = props.category;
      document.getElementById('detailMemo').textContent = props.memo || '(메모 없음)';

      detailModal.style.display = 'flex';
    }
  });
  calendar.render();

  // 필터 버튼 클릭 이벤트
  document.querySelectorAll('.view-filter button').forEach(btn => {
    btn.addEventListener('click', () => {
      // 버튼 스타일 변경
      document.querySelectorAll('.view-filter button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.dataset.filter;

      // 모든 이벤트 숨기고 조건에 맞는 것만 다시 렌더링
      calendar.getEvents().forEach(event => {
        const type = event.extendedProps.type;
        if (filterType === 'all' || type === filterType) {
          event.setProp('display', 'auto');
        } else {
          event.setProp('display', 'none');
        }
      });
    });
  });

  function openAddModal(dateStr, isEdit = false) {
    addForm.reset();
    formTitle.textContent = isEdit ? '내역 수정하기' : '내역 추가하기';
    document.getElementById('addDate').value = dateStr;
    addModal.style.display = 'flex';
  }

  // 모달 닫기들
  closeBtn.addEventListener('click', () => addModal.style.display = 'none');
  detailCloseBtn.addEventListener('click', () => detailModal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === addModal) addModal.style.display = 'none';
    if (e.target === detailModal) detailModal.style.display = 'none';
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      addModal.style.display = 'none';
      detailModal.style.display = 'none';
    }
  });

  // 수정 버튼 → 등록 폼에 기존 내용 세팅
  document.getElementById('detailEditBtn').addEventListener('click', () => {
    if (!currentEvent) return;

    const props = currentEvent.extendedProps;
    formTitle.textContent = '내역 수정하기';
    addForm.reset();

    document.querySelector(`input[name="type"][value="${props.type}"]`).checked = true;
    document.getElementById('addDate').value = currentEvent.startStr;
    document.getElementById('addAmount').value = props.amount;
    document.getElementById('addCategory').value = props.category;
    document.getElementById('addMemo').value = props.memo;

    detailModal.style.display = 'none';
    addModal.style.display = 'flex';
  });

  // 등록/수정 제출
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      type: document.querySelector('input[name="type"]:checked').value,
      date: document.getElementById('addDate').value,
      amount: document.getElementById('addAmount').value,
      category: document.getElementById('addCategory').value,
      memo: document.getElementById('addMemo').value
    };

    if (formTitle.textContent === '내역 수정하기' && currentEvent) {
      currentEvent.setProp('title', `${data.type === 'income' ? '수입' : '지출'} ₩${Number(data.amount).toLocaleString()} - ${data.category}`);
      currentEvent.setStart(data.date);
      currentEvent.setProp('color', data.type === 'income' ? '#4caf50' : '#f44336');
      currentEvent.setExtendedProp('type', data.type);
      currentEvent.setExtendedProp('amount', data.amount);
      currentEvent.setExtendedProp('category', data.category);
      currentEvent.setExtendedProp('memo', data.memo);
      alert('내역이 수정되었습니다.');
    } else {
      calendar.addEvent({
        title: `${data.type === 'income' ? '수입' : '지출'} ₩${Number(data.amount).toLocaleString()} - ${data.category}`,
        start: data.date,
        color: data.type === 'income' ? '#4caf50' : '#f44336',
        extendedProps: {
          type: data.type,
          amount: data.amount,
          category: data.category,
          memo: data.memo
        }
      });
      alert('내역이 추가되었습니다.');
    }

    addModal.style.display = 'none';
    currentEvent = null;
    addForm.reset();
  });

  document.getElementById('detailDeleteBtn').addEventListener('click', () => {
    if (!currentEvent) return;

    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      currentEvent.remove();
      detailModal.style.display = 'none';
      alert('내역이 삭제되었습니다.');
    }
  });

  // 상단 등록버튼 클릭 모달 열기
  document.getElementById('openAddModalBtn').addEventListener('click', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const form = document.getElementById('addForm');
    form.reset();
    document.getElementById('addDate').value = todayStr;
    document.querySelector('input[name="type"][value="income"]').checked = true;

    document.querySelector('.modal-content h2').textContent = '내역 추가하기';
    document.querySelector('.submit-button').textContent = '등록';

    document.getElementById('addModal').style.display = 'flex';
  });
});


// document.addEventListener('DOMContentLoaded', function () {
//   const calendarEl = document.getElementById('calendar');

//   const calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: 'dayGridMonth',
//     locale: 'ko',
//     height: 'auto',
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,listWeek'
//     },
//     events: [
//       {
//         title: '수입 ₩150,000 - 커피 10잔',
//         start: '2025-04-27',
//         color: '#4caf50' // 녹색
//       },
//       {
//         title: '지출 ₩80,000 - 원두 구매',
//         start: '2025-04-27',
//         color: '#f44336' // 빨강
//       },
//       {
//         title: '지출 ₩20,000 - 인스타 광고',
//         start: '2025-04-26',
//         color: '#f44336'
//       }
//     ],
//     eventClick: function (info) {
//       alert(info.event.title); // 나중에 모달 열기 연동 가능
//     }
//   });

//   calendar.render();
// });