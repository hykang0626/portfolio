const fs = require('fs');

const content = `// Vercel 빌드 타임에 자동으로 조립되는 설정 파일입니다.
export const SUPABASE_CONFIG = {
  url: "${process.env.SUPABASE_URL || ''}",
  anonKey: "${process.env.SUPABASE_ANON_KEY || ''}"
};

export const EMAILJS_CONFIG = {
  serviceId: "${process.env.EMAILJS_SERVICE_ID || ''}",
  templateId: "${process.env.EMAILJS_TEMPLATE_ID || ''}",
  publicKey: "${process.env.EMAILJS_PUBLIC_KEY || ''}"
};
`;

fs.writeFileSync('src/config.js', content);
console.log('✅ config.js 파일이 빌드 환경변수를 토대로 안전하게 생성되었습니다.');
