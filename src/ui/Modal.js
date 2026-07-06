/**
 * 프로젝트 상세 보기 모달 컴포넌트
 * @param {Object} project - 선택된 프로젝트 정보가 담긴 데이터 객체
 * @returns {string} 모달 팝업 HTML 문자열
 */
export function Modal(project) {
  // 사용된 기술 태그 뱃지 생성
  const tagsHTML = project.tags
    ? project.tags.map(tag => `<span class="badge badge-secondary">#${tag}</span>`).join('')
    : '';

  // 비디오 데모 링크 여부에 따른 유튜브 임베드 혹은 비디오 링크 HTML 생성
  let videoEmbedHTML = '';
  if (project.video_url) {
    if (project.video_url.includes('youtube.com') || project.video_url.includes('youtu.be')) {
      // 유튜브 주소 변환 (임베드용)
      let videoId = '';
      if (project.video_url.includes('youtu.be/')) {
        videoId = project.video_url.split('youtu.be/')[1].split('?')[0];
      } else if (project.video_url.includes('v=')) {
        videoId = project.video_url.split('v=')[1].split('&')[0];
      }
      videoEmbedHTML = `
        <div class="modal-video-container">
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen class="modal-video-iframe"></iframe>
        </div>
      `;
    } else {
      videoEmbedHTML = `
        <div class="modal-video-link-box">
          <a href="${project.video_url}" target="_blank" class="btn btn-secondary">🎥 데모 비디오 링크 바로가기</a>
        </div>
      `;
    }
  }

  // 대표 이미지 혹은 상세 이미지 설정
  const imageUrl = project.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';

  return `
    <div class="modal-backdrop" id="project-modal-container">
      <div class="modal-card">
        <!-- 닫기 버튼 -->
        <button class="modal-close-btn" id="btn-modal-close" aria-label="닫기">&times;</button>
        
        <!-- 대표 이미지/영상 영역 -->
        <div class="modal-header-image">
          <img src="${imageUrl}" alt="${project.title}" class="modal-main-image" />
        </div>
        
        <!-- 모달 본문 상세 내용 -->
        <div class="modal-body">
          <h2 class="modal-title">${project.title}</h2>
          <div class="modal-tags">
            ${tagsHTML}
          </div>
          
          <!-- 상세 설명 본문 -->
          <div class="modal-description">
            <p>${project.description ? project.description.replace(/\n/g, '<br>') : '상세 설명이 등록되지 않았습니다.'}</p>
          </div>
          
          <!-- 임베드된 데모 영상이 있으면 출력 -->
          ${videoEmbedHTML}
          
          <!-- 아웃링크 버튼 그룹 (GitHub, 웹 데모 등) -->
          <div class="modal-actions">
            ${project.link_github ? `<a href="${project.link_github}" target="_blank" class="btn btn-secondary">GitHub 저장소</a>` : ''}
            ${project.link_demo ? `<a href="${project.link_demo}" target="_blank" class="btn btn-primary">라이브 데모</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}
