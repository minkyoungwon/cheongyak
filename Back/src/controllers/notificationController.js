import { sendDiscordNotification, sendCheongyakUpdateNotification as sendDiscordCheongyakUpdate, sendNewVideoNotification as sendDiscordVideoUpdate } from './notifications/discordController.js';
import { sendTelegramNotification, sendCheongyakUpdateNotification as sendTelegramCheongyakUpdate, sendNewVideoNotification as sendTelegramVideoUpdate } from './notifications/telegramController.js';
import { supabase } from '../config/supabaseAdminClient.js';

// 사용자 알림 채널 정보 가져오기
const getUserNotificationChannels = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_notification_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data || { discord: false, telegram: false };
  } catch (error) {
    console.error('사용자 알림 설정 조회 실패:', error);
    return { discord: false, telegram: false };
  }
};

// 청약 정보 변경 알림 전송 (수동 알림)
export const sendCheongyakAlarmManual = async (req, res) => {
  const { title, description, url, imageUrl, notifyChannels } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: '제목과 내용이 필요합니다.' });
  }
  
  try {
    const results = [];
    
    // 요청된 알림 채널에 따라 알림 전송
    if (notifyChannels.discord) {
      const discordResult = await sendDiscordNotification(title, description, url, imageUrl);
      results.push({ channel: 'discord', success: true });
    }
    
    if (notifyChannels.telegram) {
      const telegramMessage = `<b>${title}</b>\n\n${description}\n\n${url ? `<a href="${url}">자세히 보기</a>` : ''}`;
      const telegramResult = await sendTelegramNotification(telegramMessage, imageUrl);
      results.push({ channel: 'telegram', success: true });
    }
    
    res.json({ success: true, results });
  } catch (error) {
    console.error('알림 전송 실패:', error);
    res.status(500).json({ error: '알림 전송 중 오류가 발생했습니다.' });
  }
};

// 새 청약 정보 알림 전송 (자동 알림)
export const sendCheongyakUpdateAlarm = async (req, res) => {
  const { cheongyakInfo, userId } = req.body;
  
  if (!cheongyakInfo) {
    return res.status(400).json({ error: '청약 정보가 필요합니다.' });
  }
  
  try {
    // 사용자 알림 설정 가져오기
    const notifyChannels = userId ? await getUserNotificationChannels(userId) : { discord: true, telegram: true };
    const results = [];
    
    if (notifyChannels.discord) {
      const discordResult = await sendDiscordCheongyakUpdate(cheongyakInfo);
      results.push({ channel: 'discord', success: true });
    }
    
    if (notifyChannels.telegram) {
      const telegramResult = await sendTelegramCheongyakUpdate(cheongyakInfo);
      results.push({ channel: 'telegram', success: true });
    }
    
    res.json({ success: true, results });
  } catch (error) {
    console.error('청약 알림 전송 실패:', error);
    res.status(500).json({ error: '알림 전송 중 오류가 발생했습니다.' });
  }
};

// 새 영상 알림 전송
export const sendNewVideoAlarm = async (req, res) => {
  const { videoInfo, userId } = req.body;
  
  if (!videoInfo) {
    return res.status(400).json({ error: '영상 정보가 필요합니다.' });
  }
  
  try {
    // 사용자 알림 설정 가져오기
    const notifyChannels = userId ? await getUserNotificationChannels(userId) : { discord: true, telegram: true };
    const results = [];
    
    if (notifyChannels.discord) {
      const discordResult = await sendDiscordVideoUpdate(videoInfo);
      results.push({ channel: 'discord', success: true });
    }
    
    if (notifyChannels.telegram) {
      const telegramResult = await sendTelegramVideoUpdate(videoInfo);
      results.push({ channel: 'telegram', success: true });
    }
    
    res.json({ success: true, results });
  } catch (error) {
    console.error('영상 알림 전송 실패:', error);
    res.status(500).json({ error: '알림 전송 중 오류가 발생했습니다.' });
  }
};

// 사용자 알림 설정 저장/업데이트
export const updateNotificationSettings = async (req, res) => {
  const { userId, settings } = req.body;
  
  if (!userId || !settings) {
    return res.status(400).json({ error: '사용자 ID와 설정 정보가 필요합니다.' });
  }
  
  try {
    const { error } = await supabase
      .from('user_notification_settings')
      .upsert({
        user_id: userId,
        ...settings
      });
    
    if (error) throw error;
    
    res.json({ success: true, message: '알림 설정이 저장되었습니다.' });
  } catch (error) {
    console.error('알림 설정 저장 실패:', error);
    res.status(500).json({ error: '알림 설정 저장 중 오류가 발생했습니다.' });
  }
};
