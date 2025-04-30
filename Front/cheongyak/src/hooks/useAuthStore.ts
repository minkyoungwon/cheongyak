import { create } from 'zustand';
//import { supabase } from '../utils/supabaseClient'; // 잠시 주석처리 

interface User {
  id: string;
  code: string;
  role: 'admin' | 'guest';
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,

  setUser: (user) => {
    set({ user });
  },

  login: async (code) => {
    try {
      // 백엔드 API로 초대 코드 검증
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || '로그인 실패' };
      }

      // 성공 시 로컬 스토리지에 코드 저장
      localStorage.setItem('invite_code', code);
      
      // 사용자 정보 저장
      set({
        user: {
          id: code, // 코드를 ID로 사용
          code,
          role: data.role,
        },
      });

      return { success: true };
    } catch (error) {
      console.error('로그인 오류:', error);
      return { success: false, error: '로그인 중 오류가 발생했습니다.' };
    }
  },

  logout: () => {
    localStorage.removeItem('invite_code');
    set({ user: null });
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const code = localStorage.getItem('invite_code');
      
      if (!code) {
        set({ user: null, loading: false });
        return;
      }

      // 백엔드 API로 코드 재검증
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        localStorage.removeItem('invite_code');
        set({ user: null, loading: false });
        return;
      }

      // 검증 성공 시 사용자 정보 저장
      set({
        user: {
          id: code,
          code,
          role: data.role,
        },
        loading: false,
      });
    } catch (error) {
      console.error('인증 확인 오류:', error);
      localStorage.removeItem('invite_code');
      set({ user: null, loading: false });
    }
  },
}));
