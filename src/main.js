// 1. ui 폴더의 재사용 컴포넌트 모듈 및 설정 임포트
import { Navbar } from './ui/Navbar.js';
import { Profile } from './ui/Profile.js';
import { ProjectCard } from './ui/ProjectCard.js';
import { ContactForm } from './ui/ContactForm.js';
import { Modal } from './ui/Modal.js';
import { SUPABASE_CONFIG, EMAILJS_CONFIG } from './config.js';

// 3. 로컬 테스트 및 Supabase 연결 실패 시 사용할 기본 데이터(폴백 데이터)
const fallbackProfile = {
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

const fallbackProjects = [
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

// 4. 데이터 로드 및 렌더링 총괄 함수
async function loadPortfolioData() {
  // 관리자 대시보드 연동을 위해 로컬 스토리지에 기본 데이터 세팅 및 조회
  if (!localStorage.getItem("profile_data")) {
    localStorage.setItem("profile_data", JSON.stringify(fallbackProfile));
  }
  if (!localStorage.getItem("projects_data")) {
    localStorage.setItem("projects_data", JSON.stringify(fallbackProjects));
  }

  let profile = JSON.parse(localStorage.getItem("profile_data"));
  let projects = JSON.parse(localStorage.getItem("projects_data"));

  // Supabase 설정이 비어있지 않으면 서버 연동 시도 (서버 연동 시 데이터 덮어쓰기)
  if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    try {
      // Supabase 클라이언트 동적 로드
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

      // 프로필 테이블 데이터 조회
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .single();
      
      if (!profileError && profileData) {
        profile = profileData;
        console.log("Supabase 프로필 데이터를 성공적으로 가져왔습니다.");
      }

      // 프로젝트 테이블 데이터 조회
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!projectsError && projectsData) {
        projects = projectsData;
        console.log("Supabase 프로젝트 데이터를 성공적으로 가져왔습니다.");
      }
    } catch (e) {
      console.warn("Supabase 데이터베이스 연동에 실패하여 로컬 스토리지 데이터로 대체합니다.", e);
    }
  }

  // 4.1 메인 레이아웃에 컴포넌트 주입
  document.getElementById("profile-root").innerHTML = Profile(profile);
  document.getElementById("projects-root").innerHTML = projects.map(p => ProjectCard(p)).join('');

  // 4.2 상세 보기 모달 바인딩 활성화
  bindModalEvents(projects);
}

// 5. 모달 제어 및 이벤트 바인딩
function bindModalEvents(projects) {
  const modalRoot = document.getElementById("modal-root");

  // 모달 열기
  const openModal = (project) => {
    modalRoot.innerHTML = Modal(project);
    const modalContainer = document.getElementById("project-modal-container");
    
    // 모달 활성화 클래스 순차 적용 (트랜지션 애니메이션용)
    setTimeout(() => {
      if (modalContainer) modalContainer.classList.add("active");
    }, 10);

    // 모달 닫기 이벤트 핸들러
    const closeBtn = document.getElementById("btn-modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // 모달 외부 클릭 시 닫기
    if (modalContainer) {
      modalContainer.addEventListener("click", (e) => {
        if (e.target === modalContainer) {
          closeModal();
        }
      });
    }
  };

  // 모달 닫기
  const closeModal = () => {
    const modalContainer = document.getElementById("project-modal-container");
    if (modalContainer) {
      modalContainer.classList.remove("active");
      // 페이드아웃 완료 후 DOM에서 완전히 지움
      setTimeout(() => {
        modalRoot.innerHTML = "";
      }, 250);
    }
  };

  // 카드 내부의 '상세 보기' 버튼에 클릭 이벤트 이벤트 위임(Delegation) 처리
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("project-detail-btn")) {
      const projectId = parseInt(e.target.getAttribute("data-id"));
      const selectedProject = projects.find(p => p.id === projectId);
      if (selectedProject) {
        openModal(selectedProject);
      }
    }
  });
}

// 6. 이메일 문의 폼 처리 및 EmailJS 연동
function initContactForm() {
  const contactRoot = document.getElementById("contact-root");
  contactRoot.innerHTML = ContactForm();

  const contactForm = document.getElementById("portfolio-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      // [1] 스팸방지 - 허니팟 필드 검증 (봇 감지 시 발송 차단하되, 성공한 것처럼 UI 속여서 차단)
      const honeypot = formData.get("honey_trap");
      if (honeypot) {
        console.warn("🤖 스팸 봇 활동 감지! 발송을 차단합니다.");
        setTimeout(() => {
          alert("📬 메시지가 성공적으로 발송되었습니다! 확인 후 회신드리겠습니다.");
          contactForm.reset();
        }, 800);
        return;
      }

      // [2] 스팸방지 - 1분 내 연속 전송 도배 방지 (Rate Limit 60초)
      const lastSent = localStorage.getItem("last_email_sent_time");
      const now = Date.now();
      if (lastSent && (now - parseInt(lastSent) < 60000)) {
        const remaining = Math.ceil((60000 - (now - parseInt(lastSent))) / 1000);
        alert(`⚠️ 도배 방지를 위해 잠시 대기해 주세요. ${remaining}초 후에 다시 전송할 수 있습니다.`);
        return;
      }

      // 전송 버튼 비활성화 및 처리 상태 텍스트 노출
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "전송 중...";
      submitBtn.disabled = true;

      // EmailJS 연동 정보가 설정되어 있는 경우 실제 발송
      if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId) {
        // EmailJS 라이브러리 초기화
        emailjs.init(EMAILJS_CONFIG.publicKey);

        // 이메일 발송 API 호출 (네 번째 인자로 publicKey 명시 전달)
        emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, contactForm, EMAILJS_CONFIG.publicKey)
          .then(() => {
            alert("📬 메시지가 성공적으로 발송되었습니다! 확인 후 회신드리겠습니다.");
            // 성공 시 마지막 전송 시간 저장
            localStorage.setItem("last_email_sent_time", Date.now().toString());
            contactForm.reset();
          })
          .catch((error) => {
            alert("❌ 메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
            console.error("EmailJS 발송 실패:", error);
          })
          .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
          });
      } else {
        // 설정이 없는 경우 초보자를 위한 상세 동작 모의(Mock) 및 학습용 안내창 노출
        setTimeout(() => {
          alert(`📬 [이메일 전송 테스트 완료]\n\n보낸 분: ${formData.get("name")} (${formData.get("email")})\n제목: ${formData.get("title")}\n내용: ${formData.get("message")}\n\n💡 [안내] 실 서비스 작동을 원하시면 'src/config.js' 파일의 'EMAILJS_CONFIG'에 키 값을 등록해 주세요!`);
          contactForm.reset();
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }, 1000);
      }
    });
  }
}

// 7. 스크롤 리빌 애니메이션(Reveal Effect) 감지 및 트리거
function initScrollAnimation() {
  const reveals = document.querySelectorAll(".reveal");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.05 }); // 컴포넌트가 5% 노출되었을 때 애니메이션 실행
  
  reveals.forEach(el => observer.observe(el));
}

// 8. 초기 구동 실행 제어
document.addEventListener("DOMContentLoaded", async () => {
  // 네비게이션 바 주입
  document.getElementById("navbar-root").innerHTML = Navbar();

  // 자기소개 및 작업물 목록 로드 및 주입
  await loadPortfolioData();

  // 연락처 폼 주입 및 초기화
  initContactForm();

  // 모든 컴포넌트가 DOM에 주입 완료된 최종 시점에 스크롤 애니메이션 초기화
  initScrollAnimation();
});
