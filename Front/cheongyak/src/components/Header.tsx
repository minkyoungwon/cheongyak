// src/components/Header.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";

export default function Header() {
  const navigate = useNavigate();
  const [InviteCodeLogin, setInviteCode] = useState<string | null>(null);
  const { user } = useAuthStore();
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  useEffect(() => {
    const code = localStorage.getItem("invite_code");
    setInviteCode(code);
  }, []);

  const isAdmin = user?.role === "admin";

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
          onClick={() => navigate("/notifications/settings")}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          알림 설정
        </button>

        {isAdmin && (
          <div className="relative">
            <button
              onClick={() => setAdminMenuOpen(!adminMenuOpen)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center"
            >
              관리자 메뉴 ▼
            </button>
            {adminMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={() => {
                    navigate("/admin/invite");
                    setAdminMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  초대 코드 발급
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/notifications/test");
                    setAdminMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  알림 테스트
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
