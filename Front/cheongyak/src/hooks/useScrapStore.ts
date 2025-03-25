import { create } from 'zustand';
import { supabase } from '../utils/supabaseClient';

interface Scrap {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface ScrapStore {
  scraps: Scrap[];
  scrappedIds: Set<string>;
  setScraps: (scraps: Scrap[]) => void;
  toggleScrap: (id: string) => Promise<void>;
}

export const useScrapStore = create<ScrapStore>((set, get) => ({
  scraps: [],
  scrappedIds: new Set(),

  setScraps: (scraps) => {
    set({ scraps });
  },

  toggleScrap: async (id) => {
    const { scraps, scrappedIds } = get();
    const isScrapped = scrappedIds.has(id);

    if (isScrapped) {
      // 스크랩 해제
      await supabase.from('scraps').delete().eq('id', id);
      const newIds = new Set(scrappedIds);
      newIds.delete(id);
      set({ scrappedIds: newIds });
    } else {
      // 스크랩 추가
      const target = scraps.find((s) => s.id === id);
      if (!target) return;

      await supabase.from('scraps').insert({
        id: target.id,
        title: target.title,
        description: target.description,
        thumbnail: target.thumbnail,
      });

      const newIds = new Set(scrappedIds);
      newIds.add(id);
      set({ scrappedIds: newIds });   
    }
  },

  loadScrapsFromSupabase: async () => {
    const { data, error } = await supabase.from("scraps").select();
    if (!error && data) {
      const ids = new Set(data.map((d) => d.id));
      set({ scrappedIds: ids });
    }
  }
}));
