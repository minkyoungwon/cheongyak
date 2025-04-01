import { create } from 'zustand';
import { supabase } from '../utils/supabaseClient';

interface Scrap {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  upload_date?: string;
}

interface ScrapStore {
  scraps: Scrap[];
  scrappedIds: Set<string>;
  setScraps: (scraps: Scrap[]) => void;
  toggleScrap: (id: string) => Promise<void>;
  loadScrapsFromSupabase: () => Promise<void>;
}

export const useScrapStore = create<ScrapStore>((set, get) => ({
  scraps: [],
  scrappedIds: new Set(),

  setScraps: (scraps) => {
    const enriched = scraps.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      thumbnail: s.thumbnail,
      upload_date: s.upload_date ?? "",
    }));
    set({ scraps: enriched });
  },

  toggleScrap: async (id) => {
    const { scraps, scrappedIds } = get();
    const isScrapped = scrappedIds.has(id);

    if (isScrapped) {
      await supabase.from('scraps').delete().eq('id', id);
      const newIds = new Set(scrappedIds);
      newIds.delete(id);
      set({ scrappedIds: newIds });
    } else {
      const target = scraps.find((s) => s.id === id);
      if (!target) return;

      await supabase.from('scraps').insert({
        id: target.id,
        title: target.title,
        description: target.description,
        thumbnail: target.thumbnail,
        upload_date: target.upload_date,
      });

      const newIds = new Set(scrappedIds);
      newIds.add(id);
      set({ scrappedIds: newIds });
    }
  },

  loadScrapsFromSupabase: async () => {
    const { data, error } = await supabase.from("scraps").select("id");
    if (!error && data) {
      const ids = new Set(data.map((d) => d.id));
      set({ scrappedIds: ids });
    }
  }
}));
