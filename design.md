# UI/UX 디자인 가이드라인 (Design System Guide)
## 프로젝트명: Jikko의 Arduino & 바이브코딩 포트폴리오
**작성일:** 2026년 7월 6일  
**디자이너/개발자:** UI/UX 디자인 전문가 (Antigravity)  

이 가이드라인은 사용자의 디자인 선호도인 **"노란색 포인트의 또렷하고 둥글둥글한 비주얼"**, **"굵직하고 뚜렷하며 둥근 폰트 스타일"**, 그리고 **"밝은 라이트 테마 기반의 선명하고 굵직한 대비 효과(네온 효과 제외)"**를 순수 HTML, CSS 환경에서 쉽게 구현할 수 있도록 설계된 디자인 시스템 가이드입니다.

---

## 1. 디자인 컨셉 (Design Concept)

> **"Bright Playful Tech & Bold Outline"**  
> 아두이노와 바이브코딩의 테크니컬한 감성을 **밝고 화사한 라이트 모드** 환경에서 풀어냅니다.  
> 흐릿한 네온 효과나 그라데이션을 배제하고, **굵고 검은 테두리선(Bold Border)**과 **명확한 대비(High Contrast)**를 사용하여 웹사이트의 모든 요소가 또렷하고 굵직하게 눈에 띄도록 합니다. 
> 메인 골든 옐로우와 서브 아두이노 틸 컬러가 화이트 배경 위에 굵은 검은색 라인과 조화롭게 배치되어 경쾌하면서도 확실한 시각적 인상을 남깁니다.

---

## 2. 컬러 시스템 (Color System)

순수 CSS에서 쉽게 불러와 쓸 수 있도록 설정된 CSS 변수(Variables) 목록입니다.

| 역할 | 컬러명 | HEX 코드 | 디자인 적용 대상 |
| :--- | :--- | :--- | :--- |
| **메인 포인트 (Primary)** | Golden Yellow (골든 옐로우) | `#E5A91A` | 로고, 주요 강조 요소 배경, 뱃지, 강조 텍스트 |
| **서브 포인트 (Secondary)** | Arduino Teal (아두이노 틸) | `#00979D` | 2차 강조 태그, 아두이노 관련 요소 및 서브 버튼 |
| **밝은 배경 (Background)** | Pure White (화이트) | `#FFFFFF` | 전체 웹사이트 메인 배경색 |
| **컴포넌트 배경 (Surface)** | Soft Cream (소프트 크림) | `#FAF9F6` | 프로필 카드, 프로젝트 카드, 문의 폼 입력란 배경 |
| **기본 본문 텍스트 (Text Main)**| Deep Charcoal (딥 차콜) | `#121212` | 높은 가독성을 위한 메인 텍스트 및 굵은 테두리선 |
| **부제목/설명 (Text Muted)** | Dark Gray (다크 그레이) | `#555555` | 카테고리 설명문 및 비활성 텍스트 |

### CSS 변수 정의 예시 (`:root`)
```css
:root {
  --color-primary: #E5A91A;
  --color-secondary: #00979D;
  --color-background: #FFFFFF;
  --color-surface: #FAF9F6;
  --color-text-main: #121212;
  --color-text-muted: #555555;
  --border-thick: 3px solid #121212; /* 굵고 명확한 윤곽선을 위한 테두리 변수 */
}
```

---

## 3. 타이포그래피 (Typography)

굵직하고 둥글며 가독성이 또렷한 스타일을 연출하기 위해, 구글 웹 폰트(Google Fonts) 조합을 사용합니다.

*   **제목/타이틀용 폰트 (Headers):** 
    *   **영문/숫자:** `Fredoka` 또는 `Outfit` (둥글글하고 아주 두껍게 표현되는 기하학적 폰트)
    *   **한글:** `Gmarket Sans` (굵기가 뚜렷하고 각이 깔끔하게 잡혀 옐로우 포인트와 최고의 시너지) 또는 `Pretendard (Extra Bold 800 이상)`
*   **본문 텍스트용 폰트 (Body):**
    *   `Pretendard` (두께가 다양하며 화면에서 가장 또렷하게 읽히는 현대적 한글 산세리프 폰트)

### 웹 폰트 로드 & CSS 적용 예시
```html
<!-- index.html의 <head> 안에 삽입 -->
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Fredoka:wght@600;700&display=swap" rel="stylesheet">
```

```css
/* 폰트 적용 규칙 */
h1, h2, h3, .title-font {
  font-family: 'Fredoka', 'Gmarket Sans', sans-serif;
  font-weight: 900; /* 최대 두께로 굵직하게 설정 */
  color: var(--color-text-main);
  letter-spacing: -0.02em;
}

body, p, input, textarea {
  font-family: 'Pretendard', sans-serif;
  font-weight: 500; /* 본문도 일반 400보다 굵직하게 표현 */
  line-height: 1.6;
  color: var(--color-text-main);
}
```

---

## 4. UI 컴포넌트 스타일 (UI Component Styles)

### 4.1 모서리 둥글기 (Border Radius) & 굵은 선 (Border)
둥글둥글한 느낌과 굵직하고 명확한 느낌을 동시에 표현하기 위해, **둥근 모서리에 두꺼운 검은색 테두리선**을 조합합니다.
*   **소형 요소 (버튼, 입력 필드, 태그):** `border-radius: 12px; border: var(--border-thick);`
*   **대형 요소 (프로젝트 카드, 프로필 박스, 모달 팝업):** `border-radius: 20px; border: var(--border-thick);`

### 4.2 버튼 규격 및 가이드 (Buttons)
*   **주요 액션 버튼 (Primary Button):** 굵은 테두리에 메인 골든 옐로우를 깔아 시인성을 극대화합니다.
*   **보조 버튼 (Secondary Button):** 아두이노 틸 컬러 배경에 굵은 테두리를 두른 버튼을 사용합니다.
*   **하드 섀도우 (Hard Shadow):** 호버 시 부드러운 네온 빛 대신 입체적인 굵은 블랙 섀도우를 밀어내는 형식을 취합니다.

```css
/* 공통 버튼 베이스 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px; /* 더 굵직한 터치 영역 */
  font-size: 1.1rem;
  font-weight: 800;
  border-radius: 12px;
  border: var(--border-thick);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  text-decoration: none;
  box-shadow: 4px 4px 0px #121212; /* 굵고 명확한 하드 섀도우 */
}

/* 주요 버튼 (Golden Yellow 배경) */
.btn-primary {
  background-color: var(--color-primary);
  color: #121212;
}

/* 버튼 호버 시 그림자를 파고드는 단단한 인터랙션 */
.btn-primary:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #121212;
}
```

---

## 5. 인터랙션 및 효과 (Interactions & Visual Effects)

### 5.1 카드 컴포넌트 하드 섀도우 (Hard Shadow Effect - 네온 효과 제거)
프로젝트 카드에 은은한 네온 효과(box-shadow)를 주는 대신, **명확한 검은색 면 그림자(Hard Shadow)**를 적용하여 굵직하고 또렷한 느낌을 줍니다.

```css
.project-card {
  background-color: var(--color-surface);
  border: var(--border-thick);
  border-radius: 20px;
  padding: 28px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 6px 6px 0px #121212; /* 네온 글로우 대신 굵직하고 명확한 하드 섀도우 */
}

/* 호버 시 카드가 살짝 밀리며 그림자가 깊어지는 효과 */
.project-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px #121212;
}
```

### 5.2 아두이노 연상 마이크로 스크롤 애니메이션
웹사이트 스크롤 시, 데이터 신호가 타고 올라오듯 화면 하단에서 상단으로 컴포넌트들이 둥글고 부드럽게 나타나도록 Intersection Observer API를 활용한 애니메이션을 적용합니다.

```css
/* 애니메이션 대기 상태 */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 스크롤 시 노출 상태 */
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// 스크롤 감지 스크립트 (main.js에 적용 예정)
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(el => observer.observe(el));
});
```

---

## 6. 레이아웃 그리드 가이드 (Layout & Grid)

### 6.1 컨테이너 (Container)
*   웹사이트의 최대 가로폭은 `1200px`로 설정하고 양옆에 최소 `20px`의 패딩을 주어 모바일 해상도에서 화면이 짤리지 않게 방지합니다.

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

### 6.2 프로젝트 카드 그리드 (Works Grid)
*   **데스크톱 (1024px 이상):** 3열 배치 (3 Columns)
*   **태블릿 (768px ~ 1023px):** 2열 배치 (2 Columns)
*   **모바일 (767px 이하):** 1열 배치 (1 Column, 카드 너비 100%)

```css
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px; /* 카드 사이 여백 */
}
```

---

## 7. UI 디자인 목업 예시 (Design Mockup)
다음은 위 디자인 가이드라인(골든 옐로우, 아두이노 틸, 굵고 또렷한 윤곽선이 들어간 밝은 크림색 카드 인터페이스)을 반영하여 생성한 포트폴리오 메인 페이지 시안입니다.

![포트폴리오 UI 목업 시안](file:///C:/Users/PC2403/.gemini/antigravity-ide/brain/b6221be9-5b60-4b95-97b3-7616225ad8a6/portfolio_ui_mockup_light_1783315433080.png)
