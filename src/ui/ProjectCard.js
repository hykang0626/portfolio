/**
 * 프로젝트 개별 카드 컴포넌트
 * @param {Object} project - 프로젝트 정보가 담긴 데이터 객체
 * @returns {string} 프로젝트 카드 HTML 문자열
 */
export function ProjectCard(project) {
  // 기술 태그 뱃지 HTML 리스트 생성
  const tagsHTML = project.tags
    ? project.tags.map(tag => `<span class="badge badge-secondary">#${tag}</span>`).join('')
    : '';

  // 대표 이미지가 없을 경우 대체할 기본 이미지 설정
  const imageUrl = project.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';

  return `
    <div class="project-card reveal" data-id="${project.id}">
      <!-- 프로젝트 썸네일 이미지 -->
      <div class="project-card-image-wrapper">
        <img src="${imageUrl}" alt="${project.title}" class="project-card-image" />
      </div>
      
      <!-- 프로젝트 간략 내용 설명 -->
      <div class="project-card-content">
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-summary">${project.summary}</p>
        
        <!-- 기술 태그 목록 -->
        <div class="project-card-tags">
          ${tagsHTML}
        </div>
        
        <!-- 상세 보기 액션 버튼 -->
        <button class="btn btn-primary project-detail-btn" data-id="${project.id}">
          상세 보기
        </button>
      </div>
    </div>
  `;
}
