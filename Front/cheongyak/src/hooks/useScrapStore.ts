import { create } from 'zustand';

interface Scrap {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface ScrapState {
  scraps: Scrap[];
  scrappedIds: Set<string>;
  setScraps: (newScraps: Scrap[]) => void;
  toggleScrap: (id: string) => void;
}

export const useScrapStore = create<ScrapState>((set) => ({
  scraps: [],
  scrappedIds: new Set(),
  setScraps: (newScraps) => set({ scraps: newScraps }),
  toggleScrap: (id) =>
    set((state) => {
      const newSet = new Set(state.scrappedIds);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return { scrappedIds: newSet };
    }),
}));
