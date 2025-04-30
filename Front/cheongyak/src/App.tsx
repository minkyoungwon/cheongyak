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
import NotificationSettings from "./pages/NotificationSettings";
import NotificationTest from "./pages/NotificationTest";
import { useAuthStore } from "./hooks/useAuthStore";
import { useEffect } from "react";


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
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const loading = useAuthStore((state) => state.loading);
    
    useEffect(() => {
      checkAuth();
    }, []);
    
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-purple-200">
          <p className="text-lg">인증 확인 중...</p>
        </div>
      );
    }

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
            {/* 일반 사용자 접근 가능한 알림 설정 페이지 */}
            <Route
              path="/notifications/settings"
              element={<RequireAuth><NotificationSettings /></RequireAuth>}
            />
            
            {/* 관리자 전용 페이지들 */}
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
            <Route
              path="/admin/notifications/test"
              element={
                <RequireAuth>
                  <RequireAdmin>
                    <NotificationTest />
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