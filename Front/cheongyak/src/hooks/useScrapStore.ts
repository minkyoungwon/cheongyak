// Zustand 등을 이용해 스크랩된 영상 상태 관리

// useScrapStore.ts
import { create } from 'zustand';

interface Scrap {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface ScrapState {
  scraps: Scrap[];
  setScraps: (newScraps: Scrap[]) => void;
}

export const useScrapStore = create<ScrapState>((set) => ({
  scraps: [
    {
      id: '1',
      title: '청약 꿀팁 대방출',
      description: '초보자를 위한 청약 A to Z',
      thumbnail: 'https://via.placeholder.com/200x120',
    },
    {
      id: '2',
      title: '2025 청약 일정 정리',
      description: '놓치지 말아야 할 핵심 일정!',
      thumbnail: 'https://via.placeholder.com/200x120',
    },
  ],
  setScraps: (newScraps) => set({ scraps: newScraps }),
}));
