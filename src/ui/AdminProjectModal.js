/**
 * 관리자용 프로젝트 등록 및 수정 전용 모달 컴포넌트
 * @param {Object|null} project - 수정할 프로젝트 정보 객체 (null이면 등록 모드)
 * @returns {string} 모달 팝업 HTML 문자열
 */
export function AdminProjectModal(project = null) {
  const isEdit = project !== null;
  
  // 태그 배열을 쉼표 단위 문자열로 변환
  const tagsText = project && project.tags ? project.tags.join(', ') : '';

  return `
    <div class="modal-backdrop" id="admin-project-modal-container">
      <div class="modal-card">
        <!-- 모달 닫기 버튼 -->
        <button class="modal-close-btn" id="btn-admin-modal-close" aria-label="닫기">&times;</button>
        
        <div class="modal-body">
          <h2 class="modal-title">${isEdit ? '작업물 정보 수정' : '새 작업물 등록'}</h2>
          <p class="section-subtitle" style="text-align: left; margin-bottom: 25px;">
            아래 입력란에 정보를 채워주세요. 저장을 완료하면 포트폴리오 메인 화면에 즉시 갱신됩니다.
          </p>
          
          <!-- 프로젝트 등록/수정 폼 -->
          <form id="admin-project-form" class="dashboard-form">
            <!-- 수정용 프로젝트 고유 ID hidden 필드 -->
            <input type="hidden" name="id" value="${project ? project.id : ''}" />
            
            <!-- 제목 입력란 -->
            <div class="form-group">
              <label for="proj-title" class="form-label">프로젝트 제목</label>
              <input type="text" id="proj-title" name="title" class="form-input" required value="${project ? project.title : ''}" placeholder="예) 아두이노 스마트 화분" />
            </div>
            
            <!-- 한 줄 소개 입력란 -->
            <div class="form-group">
              <label for="proj-summary" class="form-label">한 줄 소개</label>
              <input type="text" id="proj-summary" name="summary" class="form-input" required value="${project ? project.summary : ''}" placeholder="카드로 노출될 핵심적인 요약을 적어주세요" />
            </div>
            
            <!-- 기술 태그 입력란 -->
            <div class="form-group">
              <label for="proj-tags" class="form-label">사용 기술 태그 (쉼표로 구분)</label>
              <input type="text" id="proj-tags" name="tags" class="form-input" value="${tagsText}" placeholder="Arduino, C++, Hardware" />
            </div>
            
            <!-- 대표 이미지 주소 입력란 -->
            <div class="form-group">
              <label for="proj-image" class="form-label">대표 이미지 URL</label>
              <input type="url" id="proj-image" name="image_url" class="form-input" value="${project ? project.image_url : ''}" placeholder="https://images.unsplash.com/... 등 이미지 링크" />
            </div>
            
            <!-- 데모 동영상 주소 입력란 -->
            <div class="form-group">
              <label for="proj-video" class="form-label">데모 동영상 URL (선택, 유튜브 등)</label>
              <input type="url" id="proj-video" name="video_url" class="form-input" value="${project ? project.video_url : ''}" placeholder="https://youtube.com/watch?v=..." />
            </div>
            
            <!-- GitHub 저장소 주소 입력란 -->
            <div class="form-group">
              <label for="proj-github" class="form-label">GitHub 저장소 URL (선택)</label>
              <input type="url" id="proj-github" name="link_github" class="form-input" value="${project ? project.link_github : ''}" placeholder="https://github.com/jikko/..." />
            </div>
            
            <!-- 라이브 데모 주소 입력란 -->
            <div class="form-group">
              <label for="proj-demo" class="form-label">라이브 데모 URL (선택)</label>
              <input type="url" id="proj-demo" name="link_demo" class="form-input" value="${project ? project.link_demo : ''}" placeholder="https://..." />
            </div>
            
            <!-- 상세 설명 본문 입력란 -->
            <div class="form-group">
              <label for="proj-desc" class="form-label">상세 기획 및 제작 과정</label>
              <textarea id="proj-desc" name="description" class="form-textarea" rows="6" required placeholder="프로젝트를 개발하게 된 배경, 사용한 부품, 제작 과정, 겪은 문제와 해결방법 등을 상세히 기록하세요.">${project ? project.description : ''}</textarea>
            </div>
            
            <!-- 저장 제출 버튼 -->
            <button type="submit" class="btn btn-primary w-100">
              ${isEdit ? '수정 사항 저장하기' : '새 작업물 저장하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}
