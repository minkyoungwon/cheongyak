// src/utils/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

// ✅ 디버깅 로그: .env에서 값이 잘 불러와졌는지 확인
console.log("env 확인 👉", import.meta.env);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabaseUrl 또는 supabaseAnonKey가 설정되지 않았습니다.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
