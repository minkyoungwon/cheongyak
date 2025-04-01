import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InviteCodeLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false); // 마우스 감지용
  const [isFocused, setIsFocused] = useState(false); // 입력 커서가 활성화된 상태
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:4000/auth/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("invite_code", code);
      localStorage.setItem("role", data.role); // 'admin' 또는 'guest'
      navigate("/");
    } else {
      setError(data.message || "초대코드가 올바르지 않습니다");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-puple-300 text-white p-4">
      <div className="bg-wihte-500 p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">

        {/* 🦈 상태에 따라 이미지 변경 */}
        <img
          src={isHovered || isFocused ? "/상어2-2.jpg" : "/상어1-2.jpg"}
          alt="Shark Reaction"
          className="w-72 h-auto mb-6 transition-all duration-300"
        />


        <h2 className="text-2xl font-bold mb-4 animate-text-fade">초대코드를 입력해주세요</h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}      // 입력 커서가 깜빡일 때
          onBlur={() => setIsFocused(false)}      // 포커스 잃을 때
          className="w-full p-2 text-black rounded mb-4"
          placeholder="초대코드 입력"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 font-semibold"
        >
          입장하기
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  );
}
