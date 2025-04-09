import { supabase } from "../config/supabaseAdminClient.js";
import { nanoid } from "nanoid";

export const createInviteCode = async (req, res) => {
  const { currentCode } = req.body;
  if (!currentCode) return res.status(400).json({ error: "인증 코드가 필요합니다." });

  // 현재 코드가 admin인지 확인
  const { data: inviter, error } = await supabase
    .from("invite_codes")
    .select("role")
    .eq("code", currentCode)
    .single();

  if (error || !inviter || inviter.role !== "admin") {
    return res.status(403).json({ error: "권한이 없습니다. (admin 전용)" });
  }

  const newCode = nanoid(10);
  const { error: insertError } = await supabase.from("invite_codes").insert({
    code: newCode,
    role: "guest",
    issued_by: currentCode,
  });

  if (insertError) {
    return res.status(500).json({ error: "초대코드 발급 실패" });
  }

  return res.json({ inviteCode: newCode });
};



export const validateInviteCode = async (req, res) => {
	const { code } = req.body;
	if (!code) 
    return res.status(400).json({ error: "초대코드를 입력해주세요." });
  
	const { data, error } = await supabase
	  .from("invite_codes")
	  .select("code, role")
	  .eq("code", code)
	  .single();
  
	if (error || !data) {
	  return res.status(401).json({ error: "유효하지 않은 초대코드입니다." });
	}
  
	return res.json({ code: data.code, role: data.role });
  };
  