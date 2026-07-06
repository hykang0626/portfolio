// 1. 관리자용 컴포넌트 임포트
import { AdminLogin } from './ui/AdminLogin.js';
import { AdminDashboard } from './ui/AdminDashboard.js';
import { AdminProjectModal } from './ui/AdminProjectModal.js';

// 2. 관리자 비밀번호 상수 정의 (테스트 편의성을 위해 1234로 지정)
const ADMIN_PASSWORD = "1234";

// 3. 로컬 스토리지에 데이터가 없을 경우 사용할 초기 뼈대 데이터
const defaultProfile = {
  name: "Jikko",
  interests: ["아두이노 (Arduino)", "바이브코딩 (AI Coding)"],
  skills: [
    "아두이노 센서(토양수분, 온습도 등) 및 액추에이터 제어 회로 설계",
    "바이브코딩 기법을 적용한 초고속 웹 프론트엔드 빌드업",
    "C/C++ 기반 Arduino IDE 펌웨어 개발",
    "이메일 전송 API(EmailJS) 및 서버리스 DB(Supabase) 연동"
  ],
  bio: "안녕하세요! 저는 일상 속의 번뜩이는 아이디어를 아두이노 하드웨어와 AI 코딩 도구(바이브코딩)를 결합하여 세상에 하나뿐인 유용한 서비스로 실현하는 메이커 Jikko입니다."
};

const defaultProjects = [
  {
    id: 1,
    title: "스마트 식물 관리 화분",
    summary: "아두이노와 토양 수분 센서를 결합해 식물의 목마름 상태를 파악하고 자동으로 물을 주는 스마트 화분입니다.",
    tags: ["Arduino", "Hardware", "C++"],
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    description: "이 프로젝트는 아두이노 Uno 보드와 토양 수분 센서, 서보 모터 워터 펌프를 결합하여 제작되었습니다.\n\n[주요 기능]\n1. 토양 수분 실시간 센싱 (기준치 이하로 건조해지면 알람)\n2. 소형 워터 펌프 모터를 가동해 자동으로 필요한 만큼 물 급수\n3. 간이 LCD 디스플레이를 활용해 현재 습도 수치 및 상태(Smile/Sad) 아이콘 출력\n\n[제작 소감]\n하드웨어 제어 코드를 작성할 때 모터의 전압 서지 문제로 아두이노가 종종 리셋되는 문제를 겪었으나, 다이오드와 커패시터를 회로에 보강하여 안정적으로 해결할 수 있었습니다.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    link_github: "https://github.com/jikko/smart-pot",
    link_demo: ""
  },
  {
    id: 2,
    title: "바이브코딩 웹 투두리스트",
    summary: "바이브코딩 기법을 적극 활용하여 2시간 만에 디자인부터 기능까지 완성해 낸 반응형 할 일 관리 웹 애플리케이션입니다.",
    tags: ["Web", "VibeCoding", "JavaScript"],
    image_url: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=600&q=80",
    description: "로컬 스토리지를 이용해 작성한 할 일 목록이 유지되도록 설계된 직관적이고 굵직한 테마의 투두리스트입니다.\n\n[주요 기능]\n1. 할 일 추가/수정/삭제 및 완료 체크박스 연동\n2. 카테고리별(전체/진행중/완료) 필터링 기능 제공\n3. 브라우저 LocalStorage 자동 연동으로 새로고침해도 데이터 유지\n\n[제작 소감]\n바이브코딩을 활용하여 단시간 내에 수준 높은 CSS 그림자 인터랙션과 반응형 레이아웃을 성공적으로 뽑아낼 수 있었습니다. 텍스트 프롬프팅만으로 디테일한 버그까지 수정하는 기법을 연마했습니다.",
    video_url: "",
    link_github: "https://github.com/jikko/vibe-todo",
    link_demo: "https://jikko-todo.vercel.app"
  }
];

// 4. 데이터 초기화 함수 (로컬스토리지 확인용)
function initializeData() {
  if (!localStorage.getItem("profile_data")) {
    localStorage.setItem("profile_data", JSON.stringify(defaultProfile));
  }
  if (!localStorage.getItem("projects_data")) {
    localStorage.setItem("projects_data", JSON.stringify(defaultProjects));
  }
}

// 5. 현재 로그인 세션 상태 체크 및 렌더링 분기
function checkSessionAndRender() {
  initializeData();
  const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
  const adminRoot = document.getElementById("admin-root");

  if (isLoggedIn) {
    // 5.1 로그인 성공 시 대시보드 주입
    const profile = JSON.parse(localStorage.getItem("profile_data"));
    const projects = JSON.parse(localStorage.getItem("projects_data"));
    adminRoot.innerHTML = AdminDashboard(profile, projects);
    
    // 대시보드 리스너들 바인딩
    bindDashboardEvents();
  } else {
    // 5.2 로그인 전에는 로그인 폼 주입
    adminRoot.innerHTML = AdminLogin();
    
    // 로그인 폼 리스너 바인딩
    bindLoginEvents();
  }
  
  // 스크롤 리빌 효과 초기화
  initScrollAnimation();
}

// 6. 로그인 폼 이벤트 바인딩
function bindLoginEvents() {
  const form = document.getElementById("admin-login-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const passwordInput = document.getElementById("admin-password").value;

      if (passwordInput === ADMIN_PASSWORD) {
        localStorage.setItem("admin_logged_in", "true");
        alert("🔓 로그인 성공! 대시보드로 진입합니다.");
        checkSessionAndRender();
      } else {
        alert("❌ 비밀번호가 올바르지 않습니다. (테스트용 비번: 1234)");
      }
    });
  }
}

// 7. 대시보드 버튼 및 폼 이벤트 바인딩
function bindDashboardEvents() {
  // 7.1 로그아웃 처리
  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("admin_logged_in");
      alert("🔒 로그아웃 되었습니다.");
      checkSessionAndRender();
    });
  }

  // 7.2 프로필 편집 저장 처리
  const profileForm = document.getElementById("dashboard-profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(profileForm);
      
      const updatedProfile = {
        name: formData.get("name"),
        interests: formData.get("interests").split(',').map(item => item.trim()).filter(Boolean),
        bio: formData.get("bio"),
        skills: formData.get("skills").split('\n').map(item => item.trim()).filter(Boolean)
      };

      localStorage.setItem("profile_data", JSON.stringify(updatedProfile));
      alert("💾 프로필 정보가 성공적으로 저장되었습니다!");
      checkSessionAndRender();
    });
  }

  // 7.3 프로젝트 추가 버튼 연동
  const addProjectBtn = document.getElementById("btn-add-project");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      openProjectModal(null); // 신규 등록 모드
    });
  }

  // 7.4 프로젝트 수정 및 삭제 버튼 위임 처리
  const tableBody = document.getElementById("projects-table-body");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const editBtn = e.target.closest(".btn-edit");
      const deleteBtn = e.target.closest(".btn-delete");

      if (editBtn) {
        const projectId = parseInt(editBtn.getAttribute("data-id"));
        const projects = JSON.parse(localStorage.getItem("projects_data"));
        const project = projects.find(p => p.id === projectId);
        openProjectModal(project); // 수정 모드
      } else if (deleteBtn) {
        const projectId = parseInt(deleteBtn.getAttribute("data-id"));
        if (confirm("🗑️ 정말로 이 작업물을 삭제하시겠습니까? 메인 페이지에서도 즉시 사라집니다.")) {
          deleteProject(projectId);
        }
      }
    });
  }
}

// 8. 프로젝트 추가/수정용 모달 제어
function openProjectModal(project = null) {
  const modalRoot = document.getElementById("admin-modal-root");
  modalRoot.innerHTML = AdminProjectModal(project);
  
  const modalContainer = document.getElementById("admin-project-modal-container");
  
  setTimeout(() => {
    if (modalContainer) modalContainer.classList.add("active");
  }, 10);

  // 모달 닫기 이벤트
  const closeBtn = document.getElementById("btn-admin-modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
  }
  
  if (modalContainer) {
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        closeProjectModal();
      }
    });
  }

  // 모달 폼 저장 이벤트 바인딩
  const projectForm = document.getElementById("admin-project-form");
  if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveProjectData(new FormData(projectForm));
    });
  }
}

function closeProjectModal() {
  const modalContainer = document.getElementById("admin-project-modal-container");
  if (modalContainer) {
    modalContainer.classList.remove("active");
    setTimeout(() => {
      document.getElementById("admin-modal-root").innerHTML = "";
    }, 250);
  }
}

// 9. 프로젝트 데이터 저장 (추가 및 수정 통합)
function saveProjectData(formData) {
  const idVal = formData.get("id");
  const isEdit = idVal !== "";
  const projects = JSON.parse(localStorage.getItem("projects_data")) || [];

  const projectObj = {
    id: isEdit ? parseInt(idVal) : Date.now(), // 고유 숫자형 ID 부여
    title: formData.get("title"),
    summary: formData.get("summary"),
    tags: formData.get("tags").split(',').map(t => t.trim()).filter(Boolean),
    image_url: formData.get("image_url"),
    video_url: formData.get("video_url"),
    link_github: formData.get("link_github"),
    link_demo: formData.get("link_demo"),
    description: formData.get("description")
  };

  if (isEdit) {
    // 수정 처리
    const idx = projects.findIndex(p => p.id === projectObj.id);
    if (idx !== -1) {
      projects[idx] = projectObj;
    }
  } else {
    // 신규 추가 (가장 최신 글이 맨 앞에 가도록 unshift)
    projects.unshift(projectObj);
  }

  localStorage.setItem("projects_data", JSON.stringify(projects));
  alert(isEdit ? "💾 프로젝트가 성공적으로 수정되었습니다." : "💾 새 프로젝트가 등록되었습니다.");
  closeProjectModal();
  checkSessionAndRender();
}

// 10. 프로젝트 삭제
function deleteProject(id) {
  const projects = JSON.parse(localStorage.getItem("projects_data")) || [];
  const filtered = projects.filter(p => Number(p.id) !== Number(id));
  localStorage.setItem("projects_data", JSON.stringify(filtered));
  alert("🗑️ 작업물이 성공적으로 삭제되었습니다.");
  checkSessionAndRender();
}

// 11. 스크롤 애니메이션 초기화 (대시보드 노출 시 부드럽게 등장하도록 지원)
function initScrollAnimation() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => el.classList.add("active")); // 관리자 모드에서는 대기 없이 바로 활성화 처리
}

// 12. 최초 진입 실행
document.addEventListener("DOMContentLoaded", () => {
  checkSessionAndRender();
});
