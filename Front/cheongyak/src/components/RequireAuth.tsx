// src/components/RequireAuth.tsx
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const inviteCode = localStorage.getItem("invite_code");
  if (!inviteCode) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
