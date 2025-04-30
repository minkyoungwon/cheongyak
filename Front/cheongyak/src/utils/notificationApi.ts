// 알림 API 유틸리티 함수

/**
 * 수동 알림 전송하기
 * @param title 알림 제목
 * @param description 알림 내용
 * @param url 연결될 URL (선택사항)
 * @param imageUrl 이미지 URL (선택사항)
 * @param notifyChannels 알림 채널 설정 (discord, telegram)
 * @returns 
 */
export async function sendManualNotification(
  title: string, 
  description: string, 
  url?: string, 
  imageUrl?: string,
  notifyChannels = { discord: true, telegram: true }
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notification/manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        url,
        imageUrl,
        notifyChannels
      }),
    });
    
    if (!response.ok) {
      throw new Error('알림 전송 실패');
    }
    
    return await response.json();
  } catch (error) {
    console.error('알림 전송 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 청약 정보 업데이트 알림 전송
 * @param cheongyakInfo 청약 정보 객체
 * @param userId 사용자 ID (선택사항)
 * @returns 
 */
export async function sendCheongyakUpdateNotification(cheongyakInfo: any, userId?: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notification/cheongyak`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cheongyakInfo,
        userId
      }),
    });
    
    if (!response.ok) {
      throw new Error('청약 알림 전송 실패');
    }
    
    return await response.json();
  } catch (error) {
    console.error('청약 알림 전송 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 새 영상 알림 전송
 * @param videoInfo 영상 정보 객체
 * @param userId 사용자 ID (선택사항)
 * @returns 
 */
export async function sendNewVideoNotification(videoInfo: any, userId?: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notification/video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoInfo,
        userId
      }),
    });
    
    if (!response.ok) {
      throw new Error('영상 알림 전송 실패');
    }
    
    return await response.json();
  } catch (error) {
    console.error('영상 알림 전송 중 오류 발생:', error);
    throw error;
  }
}
