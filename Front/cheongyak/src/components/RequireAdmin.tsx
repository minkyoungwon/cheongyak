import React from "react"; 

import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }: { children: JSX.Element }) {
  const role = localStorage.getItem("role");
  const code = localStorage.getItem("invite_code");

  // 로그인 안 한 경우 → 로그인 페이지로
  if (!code || !role) {
    return <Navigate to="/login" replace />;
  }

  // 관리자 권한이 아닌 경우 → 차단 메시지
  if (role !== "admin") {
    return <div className="text-white p-8">⛔ 권한 없음</div>;
  }

  // 통과 → children 렌더링
  return children;
}
