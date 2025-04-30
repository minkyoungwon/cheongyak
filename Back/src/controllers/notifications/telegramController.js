import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Telegram Bot API Token과 Chat ID는 환경변수에서 가져옵니다.
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Telegram Bot API를 사용하여 알림 보내기
 * @param {string} message - 알림 메시지
 * @param {string} imageUrl - 이미지 URL (선택사항)
 * @returns {Promise} - 요청 결과
 */
export const sendTelegramNotification = async (message, imageUrl = null) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram Bot Token 또는 Chat ID가 설정되지 않았습니다.');
    throw new Error('Telegram 설정이 완료되지 않았습니다.');
  }

  const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

  try {
    // 이미지가 있으면 이미지와 함께 메시지 전송
    if (imageUrl) {
      await axios.post(`${apiUrl}/sendPhoto`, {
        chat_id: TELEGRAM_CHAT_ID,
        photo: imageUrl,
        caption: message,
        parse_mode: 'HTML'
      });
    } else {
      // 텍스트만 전송
      await axios.post(`${apiUrl}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });
    }

    console.log('Telegram 알림이 성공적으로 전송되었습니다.');
    return { success: true };
  } catch (error) {
    console.error('Telegram 알림 전송 실패:', error);
    throw error;
  }
};

// 청약 정보 업데이트에 대한 Telegram 알림 전송
export const sendCheongyakUpdateNotification = async (cheongyakInfo) => {
  const message = `<b>📢 청약 정보 업데이트</b>\n\n` +
                 `<b>${cheongyakInfo.title}</b>\n\n` +
                 `${cheongyakInfo.description}\n\n` +
                 `<b>마감일</b>: ${cheongyakInfo.deadline || '정보 없음'}\n` +
                 `<b>지역</b>: ${cheongyakInfo.region || '전국'}\n` +
                 `<b>유형</b>: ${cheongyakInfo.type || '일반 공고'}\n\n` +
                 `<a href="${cheongyakInfo.url || 'https://cheongyak.vercel.app/'}">자세히 보기</a>`;
  
  return await sendTelegramNotification(message, cheongyakInfo.imageUrl);
};

// 새 유튜브 영상 알림 전송
export const sendNewVideoNotification = async (videoInfo) => {
  const message = `<b>🎬 새 청약 관련 영상</b>\n\n` +
                 `<b>${videoInfo.title}</b>\n\n` +
                 `${videoInfo.description?.substring(0, 150)}${videoInfo.description?.length > 150 ? '...' : ''}\n\n` +
                 `<b>채널</b>: ${videoInfo.channelTitle || '정보 없음'}\n` +
                 `<b>업로드 일자</b>: ${new Date(videoInfo.upload_date).toLocaleDateString('ko-KR')}\n\n` +
                 `<a href="https://www.youtube.com/watch?v=${videoInfo.id}">영상 보기</a>`;
  
  return await sendTelegramNotification(message, videoInfo.thumbnail);
};
