import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Discord Webhook URL은 환경변수에서 가져옵니다.
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

/**
 * Discord Webhook을 사용하여 알림 보내기
 * @param {string} title - 알림 제목
 * @param {string} description - 알림 내용
 * @param {string} url - 연결될 URL
 * @param {string} imageUrl - 이미지 URL (선택사항)
 * @returns {Promise} - 요청 결과
 */
export const sendDiscordNotification = async (title, description, url, imageUrl = null) => {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('Discord Webhook URL이 설정되지 않았습니다.');
    throw new Error('Discord Webhook URL이 설정되지 않았습니다.');
  }

  try {
    const embed = {
      title: title,
      description: description,
      url: url,
      color: 7506394, // 청약 테마 색상 (연한 파란색)
      timestamp: new Date().toISOString(),
      footer: {
        text: '청약 알리미'
      }
    };

    // 이미지가 있으면 embed에 추가
    if (imageUrl) {
      embed.image = {
        url: imageUrl
      };
    }

    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [embed]
    });

    console.log('Discord 알림이 성공적으로 전송되었습니다.');
    return { success: true };
  } catch (error) {
    console.error('Discord 알림 전송 실패:', error);
    throw error;
  }
};

// 청약 정보 업데이트에 대한 Discord 알림 전송
export const sendCheongyakUpdateNotification = async (cheongyakInfo) => {
  const title = `📢 청약 정보 업데이트: ${cheongyakInfo.title}`;
  const description = `${cheongyakInfo.description}\n\n**마감일**: ${cheongyakInfo.deadline || '정보 없음'}\n**지역**: ${cheongyakInfo.region || '전국'}\n**유형**: ${cheongyakInfo.type || '일반 공고'}`;
  const url = cheongyakInfo.url || 'https://cheongyak.vercel.app/';
  
  return await sendDiscordNotification(title, description, url, cheongyakInfo.imageUrl);
};

// 새 유튜브 영상 알림 전송
export const sendNewVideoNotification = async (videoInfo) => {
  const title = `🎬 새 청약 관련 영상: ${videoInfo.title}`;
  const description = `${videoInfo.description?.substring(0, 150)}${videoInfo.description?.length > 150 ? '...' : ''}\n\n**채널**: ${videoInfo.channelTitle || '정보 없음'}\n**업로드 일자**: ${new Date(videoInfo.upload_date).toLocaleDateString('ko-KR')}`;
  const url = `https://www.youtube.com/watch?v=${videoInfo.id}`;

  return await sendDiscordNotification(title, description, url, videoInfo.thumbnail);
};
