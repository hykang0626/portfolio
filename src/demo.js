// 1. ui 폴더의 컴포넌트 모듈들 불러오기
import { Navbar } from './ui/Navbar.js';
import { Profile } from './ui/Profile.js';
import { ProjectCard } from './ui/ProjectCard.js';
import { ContactForm } from './ui/ContactForm.js';
import { Modal } from './ui/Modal.js';

// 2. 컴포넌트에 주입할 더미 데이터(테스트용 데이터) 정의
const dummyProfile = {
  name: "Jikko",
  interests: ["아두이노 (Arduino)", "바이브코딩 (AI Coding)"],
  skills: [
    "임베디드 회로 설계 및 각종 센서(수분, 온습도, 초음파) 활용 제어",
    "바이브코딩 어시스턴트를 통한 고속 HTML/CSS/JS 구현",
    "C/C++ (Arduino IDE) 펌웨어 코딩",
    "GitHub 기반 프로젝트 형상 관리 및 Vercel 배포"
  ],
  bio: "안녕하세요! 저는 머릿속의 번뜩이는 아이디어를 아두이노 하드웨어와 AI 코딩 도구(바이브코딩)를 결합하여 세상에 하나뿐인 유용한 도구로 실현하는 메이커 Jikko입니다."
};

const dummyProjects = [
  {
    id: 1,
    title: "스마트 식물 관리 화분",
    summary: "아두이노와 토양 수분 센서를 결합해 식물의 목마름 상태를 파악하고 자동으로 물을 주는 스마트 화분입니다.",
    tags: ["Arduino", "Hardware", "C++"],
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    description: "이 프로젝트는 아두이노 Uno 보드와 토양 수분 센서, 서보 모터 워터 펌프를 결합하여 제작되었습니다.\n\n[주요 기능]\n1. 토양 수분 실시간 센싱 (기준치 이하로 건조해지면 알람)\n2. 소형 워터 펌프 모터를 가동해 자동으로 필요한 만큼 물 급수\n3. 간이 LCD 디스플레이를 활용해 현재 습도 수치 및 상태(Smile/Sad) 아이콘 출력\n\n[제작 소감]\n하드웨어 제어 코드를 작성할 때 모터의 전압 서지 문제로 아두이노가 종종 리셋되는 문제를 겪었으나, 다이오드와 커패시터를 회로에 보강하여 안정적으로 해결할 수 있었습니다.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // 유튜브 예시 링크
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

// 3. 페이지 로드 시 컴포넌트들을 각각의 데모 컨테이너에 삽입(렌더링)
document.addEventListener("DOMContentLoaded", () => {
  // 3.1 Navbar 컴포넌트 렌더링
  const navbarContainer = document.getElementById("navbar-demo");
  if (navbarContainer) {
    navbarContainer.innerHTML = Navbar();
  }

  // 3.2 Profile 컴포넌트 렌더링
  const profileContainer = document.getElementById("profile-demo");
  if (profileContainer) {
    profileContainer.innerHTML = Profile(dummyProfile);
  }

  // 3.3 ProjectCard 컴포넌트들 렌더링 (그리드 내부)
  const projectsContainer = document.getElementById("projects-demo");
  if (projectsContainer) {
    projectsContainer.innerHTML = dummyProjects.map(project => ProjectCard(project)).join('');
  }

  // 3.4 ContactForm 컴포넌트 렌더링
  const contactContainer = document.getElementById("contact-demo");
  if (contactContainer) {
    contactContainer.innerHTML = ContactForm();
    
    // 문의 폼 서브밋(전송) 이벤트 테스트 설정
    const contactForm = document.getElementById("portfolio-contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        alert(`📬 [문의 전송 완료 테스트]\n이름: ${formData.get("user_name")}\n이메일: ${formData.get("user_email")}\n제목: ${formData.get("subject")}\n내용: ${formData.get("message")}\n\n실제 서비스 배포 시 EmailJS API를 통해 이메일이 발송됩니다.`);
        contactForm.reset();
      });
    }
  }

  // 4. 모달 상세 보기 팝업 제어 및 바인딩
  const modalRenderer = document.getElementById("modal-renderer");

  // 4.1 모달을 띄우는 함수
  const openModal = (project) => {
    modalRenderer.innerHTML = Modal(project);
    const modalContainer = document.getElementById("project-modal-container");
    
    // 모달 활성화 애니메이션 작동을 위한 클래스 추가
    setTimeout(() => {
      if (modalContainer) modalContainer.classList.add("active");
    }, 10);

    // 모달 내부 닫기 버튼 이벤트 바인딩
    const closeBtn = document.getElementById("btn-modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // 모달 바깥 백드롭 영역 클릭 시 닫기
    if (modalContainer) {
      modalContainer.addEventListener("click", (e) => {
        if (e.target === modalContainer) {
          closeModal();
        }
      });
    }
  };

  // 4.2 모달을 닫는 함수
  const closeModal = () => {
    const modalContainer = document.getElementById("project-modal-container");
    if (modalContainer) {
      modalContainer.classList.remove("active");
      // 애니메이션이 끝난 후 DOM에서 완전히 제거
      setTimeout(() => {
        modalRenderer.innerHTML = "";
      }, 250);
    }
  };

  // 4.3 데모 페이지 상의 전용 모달 켜기 버튼 연결
  const btnTriggerModal = document.getElementById("btn-trigger-modal");
  if (btnTriggerModal) {
    btnTriggerModal.addEventListener("click", () => openModal(dummyProjects[0]));
  }

  const btnTriggerModalCode = document.getElementById("btn-trigger-modal-code");
  if (btnTriggerModalCode) {
    btnTriggerModalCode.addEventListener("click", () => openModal(dummyProjects[1]));
  }

  // 4.4 렌더링된 카드 내부의 '상세 보기' 버튼들도 모달 동작 연동
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("project-detail-btn")) {
      const projectId = parseInt(e.target.getAttribute("data-id"));
      const selectedProject = dummyProjects.find(p => p.id === projectId);
      if (selectedProject) {
        openModal(selectedProject);
      }
    }
  });

  // 5. 스크롤 마이크로 애니메이션(Reveal) 동작 트리거
  const initScrollAnimation = () => {
    const reveals = document.querySelectorAll(".reveal");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.05 });
    
    reveals.forEach(el => observer.observe(el));
  };

  // 데모 렌더링 직후 및 짧은 지연 시간 후 애니메이션 초기화 (첫 화면 노출 요소 활성화 위함)
  setTimeout(initScrollAnimation, 100);
});
