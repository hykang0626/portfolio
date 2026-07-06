/**
 * 상단 네비게이션 바 컴포넌트
 * @returns {string} 네비게이션 바 HTML 문자열
 */
export function Navbar() {
  return `
    <nav class="navbar">
      <div class="container navbar-container">
        <!-- 로고 영역 -->
        <a href="#" class="navbar-logo">Jikko</a>
        
        <!-- 네비게이션 메뉴 링크 -->
        <ul class="navbar-menu">
          <li><a href="#about" class="navbar-link">자기소개</a></li>
          <li><a href="#projects" class="navbar-link">작업물</a></li>
          <li><a href="#contact" class="navbar-link">연락처</a></li>
        </ul>
        
        <!-- 관리자 페이지로 이동하는 로그인 버튼 -->
        <a href="admin.html" class="btn btn-secondary admin-login-btn">Admin</a>
      </div>
    </nav>
  `;
}
