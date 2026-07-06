/**
 * 자기소개 프로필 컴포넌트
 * @param {Object} profileData - 데이터베이스(Supabase) 등에서 받아온 프로필 데이터 객체
 * @returns {string} 프로필 섹션 HTML 문자열
 */
export function Profile(profileData) {
  // 관심 분야 태그 생성
  const interestsHTML = profileData.interests
    ? profileData.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')
    : '<span class="interest-tag">아두이노</span><span class="interest-tag">바이브코딩</span>';

  // 할 수 있는 것(기술 목록) 리스트 생성
  const skillsHTML = profileData.skills
    ? profileData.skills.map(skill => `<li>${skill}</li>`).join('')
    : '<li>하드웨어 회로 설계 & 센서 제어</li><li>AI(바이브코딩)를 활용한 고속 프로토타이핑</li><li>C/C++ (Arduino IDE) 및 웹 프론트엔드 기초</li>';

  return `
    <section id="about" class="profile-section container reveal">
      <div class="profile-card">
        <!-- 프로필 상단 헤더 (이름 및 관심분야 태그) -->
        <div class="profile-header">
          <h2 class="profile-name">${profileData.name || 'Jikko'}</h2>
          <div class="profile-interests">
            ${interestsHTML}
          </div>
        </div>
        
        <!-- 프로필 상세 내용 -->
        <div class="profile-body">
          <p class="profile-bio">
            ${profileData.bio || '안녕하세요! 아두이노 하드웨어 메이킹과 AI 어시스턴트를 활용한 바이브코딩에 푹 빠져 있는 창작자 Jikko입니다. 아이디어를 빠르게 실물 소프트웨어와 하드웨어로 구현해내는 것을 좋아합니다.'}
          </p>
          
          <!-- 할 수 있는 것 (기술 스택 박스) -->
          <div class="profile-skills-box">
            <h3 class="skills-title">할 수 있는 것 (Skills)</h3>
            <ul class="profile-skills-list">
              ${skillsHTML}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}
