/**
 * 이메일 문의 폼 컴포넌트
 * @returns {string} 연락처 폼 HTML 문자열
 */
export function ContactForm() {
  return `
    <section id="contact" class="contact-section container reveal">
      <div class="contact-card">
        <h2 class="section-title">연락처 (Contact)</h2>
        <p class="section-subtitle">프로젝트 협업 제안이나 기타 문의사항이 있으시면 아래 양식을 작성해 주세요!</p>
        
        <!-- 이메일 전송 폼 -->
        <form id="portfolio-contact-form" class="contact-form">
          <div class="form-group-row">
            <!-- 보내는 사람 이름 입력란 -->
            <div class="form-group">
              <label for="contact-name" class="form-label">이름</label>
              <input type="text" id="contact-name" name="name" class="form-input" required placeholder="이름을 입력하세요" />
            </div>
            
            <!-- 보내는 사람 이메일 입력란 -->
            <div class="form-group">
              <label for="contact-email" class="form-label">이메일 주소</label>
              <input type="email" id="contact-email" name="email" class="form-input" required placeholder="example@email.com" />
            </div>
          </div>
          
          <!-- 스팸 방지용 허니팟 필드 (사람 눈에는 보이지 않으며 봇의 전송만 차단합니다) -->
          <div style="display: none !important;">
            <label for="contact-honey">이 필드는 비워두세요.</label>
            <input type="text" id="contact-honey" name="honey_trap" autocomplete="off" tabindex="-1" />
          </div>
          
          <!-- 메시지 제목 입력란 -->
          <div class="form-group">
            <label for="contact-subject" class="form-label">제목</label>
            <input type="text" id="contact-subject" name="title" class="form-input" required placeholder="문의 제목을 입력하세요" />
          </div>
          
          <!-- 메시지 본문 입력란 -->
          <div class="form-group">
            <label for="contact-message" class="form-label">메시지 내용</label>
            <textarea id="contact-message" name="message" class="form-textarea" required rows="6" placeholder="자세한 문의 내용을 입력해주세요..."></textarea>
          </div>
          
          <!-- 전송 버튼 -->
          <button type="submit" class="btn btn-primary btn-submit w-100">
            이메일 보내기
          </button>
        </form>
      </div>
    </section>
  `;
}
