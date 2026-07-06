/**
 * 관리자 대시보드 메인 컴포넌트
 * @param {Object} profile - 데이터베이스 또는 로컬 스토리지에서 로드한 프로필 정보
 * @param {Array} projects - 프로젝트 데이터 목록 배열
 * @returns {string} 대시보드 화면 HTML 문자열
 */
export function AdminDashboard(profile, projects) {
  // 관심 분야 배열을 쉼표 단위 문자열로 변환
  const interestsText = profile.interests ? profile.interests.join(', ') : '';
  
  // 할 수 있는 것 배열을 줄바꿈 단위 문자열로 변환
  const skillsText = profile.skills ? profile.skills.join('\n') : '';

  // 작업물 목록 테이블 행(Row) 생성
  const projectRowsHTML = projects.length > 0 
    ? projects.map(p => {
        const tagsHTML = p.tags 
          ? p.tags.map(t => `<span class="badge badge-secondary">#${t}</span>`).join('') 
          : '';
        return `
          <tr class="table-row">
            <td class="table-cell font-bold">${p.title}</td>
            <td class="table-cell">${p.summary}</td>
            <td class="table-cell">${tagsHTML}</td>
            <td class="table-cell action-cells">
              <button class="btn btn-primary btn-sm btn-edit" data-id="${p.id}">수정</button>
              <button class="btn btn-secondary btn-sm btn-delete" data-id="${p.id}">삭제</button>
            </td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="4" class="table-cell text-center text-muted">등록된 프로젝트가 없습니다. 새 프로젝트를 등록해보세요!</td></tr>`;

  return `
    <div class="dashboard-container reveal">
      <!-- 1. 대시보드 헤더 -->
      <header class="dashboard-header">
        <h1 class="dashboard-title">Jikko 관리자 대시보드</h1>
        <div class="dashboard-header-buttons">
          <a href="index.html" class="btn btn-secondary btn-sm" style="margin-right:10px;">홈페이지로</a>
          <button class="btn btn-secondary btn-sm" id="btn-logout">로그아웃</button>
        </div>
      </header>

      <div class="dashboard-grid">
        <!-- 2. 좌측: 프로필 정보 편집 폼 -->
        <section class="dashboard-card profile-manage-card">
          <h2 class="card-title">프로필 정보 편집</h2>
          <form id="dashboard-profile-form" class="dashboard-form">
            <!-- 이름 편집 입력란 -->
            <div class="form-group">
              <label for="profile-name" class="form-label">이름</label>
              <input type="text" id="profile-name" name="name" class="form-input" required value="${profile.name || ''}" />
            </div>
            
            <!-- 관심 분야 편집 입력란 -->
            <div class="form-group">
              <label for="profile-interests" class="form-label">관심 분야 (쉼표로 구분)</label>
              <input type="text" id="profile-interests" name="interests" class="form-input" value="${interestsText}" placeholder="아두이노, 바이브코딩" />
            </div>
            
            <!-- 한 줄 소개 편집 입력란 -->
            <div class="form-group">
              <label for="profile-bio" class="form-label">자기소개 본문</label>
              <textarea id="profile-bio" name="bio" class="form-textarea" rows="5" required placeholder="본인 소개글을 적어주세요">${profile.bio || ''}</textarea>
            </div>
            
            <!-- 할 수 있는 것 편집 입력란 -->
            <div class="form-group">
              <label for="profile-skills" class="form-label">할 수 있는 것 (엔터/줄바꿈으로 구분)</label>
              <textarea id="profile-skills" name="skills" class="form-textarea" rows="5" placeholder="예)\n아두이노 제어\n회로 설계">${skillsText}</textarea>
            </div>
            
            <button type="submit" class="btn btn-primary w-100">프로필 저장하기</button>
          </form>
        </section>

        <!-- 3. 우측: 작업물(프로젝트) 관리 영역 -->
        <section class="dashboard-card projects-manage-card">
          <div class="card-header">
            <h2 class="card-title">작업물 관리</h2>
            <button class="btn btn-primary" id="btn-add-project">새 작업물 추가</button>
          </div>
          
          <!-- 프로젝트 테이블 목록 -->
          <div class="table-wrapper">
            <table class="dashboard-table">
              <thead>
                <tr>
                  <th class="table-header">제목</th>
                  <th class="table-header">한 줄 소개</th>
                  <th class="table-header">태그</th>
                  <th class="table-header">관리</th>
                </tr>
              </thead>
              <tbody id="projects-table-body">
                ${projectRowsHTML}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `;
}
