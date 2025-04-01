// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import NoticeBoard from "./pages/NoticeBoard";
import ScrapBoard from "./pages/ScrapBoard";
import ScrapDetail from "./pages/ScrapDetail";
import SummarySidebar from "./components/SummarySidebar";
import InviteCodeLogin from "./pages/InviteCodeLogin";
import RequireAuth from "./components/RequireAuth";
import AdminInvite from "./pages/AdminInvite"; // ⬅️ 관리자 페이지 추가
import RequireAdmin from "./components/RequireAdmin"; // ✅ 추가

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-200 text-gray-800">
      <Router>
        <Routes>
          {/* 로그인 (초대코드 입력) */}
          <Route path="/login" element={<InviteCodeLogin />} />

          {/* 일반 사용자 접근 가능한 페이지 */}
          <Route path="/" element={<RequireAuth><Intro /></RequireAuth>} />
          <Route path="/notices" element={<RequireAuth><NoticeBoard /></RequireAuth>} />
          <Route path="/youtube-scrap" element={<RequireAuth><ScrapBoard /></RequireAuth>} />
          <Route path="/youtube-scrap/:id" element={<RequireAuth><ScrapDetail /></RequireAuth>} />

          {/* 관리자 전용 초대코드 발급 페이지 */}
          <Route
            path="/admin/invite"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <AdminInvite />
                </RequireAdmin>
              </RequireAuth>
            }
          />

        </Routes>
      </Router>

      <SummarySidebar />
    </div>
  );
  
}

