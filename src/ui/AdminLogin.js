/**
 * 관리자 로그인 폼 컴포넌트
 * @returns {string} 로그인 박스 HTML 문자열
 */
export function AdminLogin() {
  return `
    <div class="login-container reveal">
      <div class="login-card">
        <!-- 로그인 타이틀 헤더 -->
        <h2 class="login-title">Jikko Admin</h2>
        <p class="login-subtitle">관리자 비밀번호를 입력해주세요.</p>
        
        <!-- 로그인 비밀번호 폼 -->
        <form id="admin-login-form" class="login-form">
          <div class="form-group">
            <label for="admin-password" class="form-label">비밀번호</label>
            <input type="password" id="admin-password" name="password" class="form-input" required placeholder="비밀번호를 입력하세요" />
          </div>
          <!-- 로그인 제출 버튼 -->
          <button type="submit" class="btn btn-primary w-100">
            관리자 로그인
          </button>
        </form>
        
        <div class="login-footer">
          <a href="index.html" class="back-home-link">◀ 메인 포트폴리오로 돌아가기</a>
        </div>
      </div>
    </div>
  `;
}
