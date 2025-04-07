// src/components/Header.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [InviteCodeLogin, setInviteCode] = useState<string | null>(null);

  useEffect(() => {
    const code = localStorage.getItem("invite_code");
    setInviteCode(code);
  }, []);

  if (!InviteCodeLogin) return null; // 인증된 사용자만 보여줌

  return (
    <header className="w-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <button
        onClick={() => navigate("/")}
        className="text-lg font-bold hover:text-blue-300"
      >
        홈
      </button>
      <div className="flex items-center gap-4">
        <span className="text-sm">{InviteCodeLogin}님 반갑습니다 👋</span>
        <button
          onClick={() => alert("🔔 알림 기능은 아직 준비 중입니다")}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          알림
        </button>
      </div>
    </header>
  );
}
