import { useState } from "react";

export default function AdminInvite() {
  const [result, setResult] = useState("");

  const handleInvite = async () => {
    const currentCode = localStorage.getItem("invite_code");

    const res = await fetch("http://localhost:4000/auth/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentCode }),
    });

    const data = await res.json();
    if (res.ok) {
      setResult(`🎉 발급된 초대코드: ${data.inviteCode}`);
    } else {
      setResult(`❌ 오류: ${data.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">초대코드 발급 (관리자용)</h2>
        <button
          onClick={handleInvite}
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 font-semibold"
        >
          초대코드 발급 및 이메일 전송
        </button>
        {result && <p className="mt-4">{result}</p>}
      </div>
    </div>
  );
}
