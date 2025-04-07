// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import NoticeBoard from "./pages/NoticeBoard";
import ScrapBoard from "./pages/ScrapBoard";
import ScrapDetail from "./pages/ScrapDetail";
import SummarySidebar from "./components/SummarySidebar";
import InviteCodeLogin from "./pages/InviteCodeLogin";
import RequireAuth from "./components/RequireAuth";
import AdminInvite from "./pages/AdminInvite";
import RequireAdmin from "./components/RequireAdmin";
import Header from "./components/Header";


import { useLocation } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
  function MainApp() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-200 text-gray-800">
        {!isLoginPage && <Header />}
        {!isLoginPage && <SummarySidebar />}


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

        {/* <SummarySidebar /> */}
        
      </div>
    );

  }

}