import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const code = localStorage.getItem("invite_code");

  const handleLogout = () => {
    localStorage.removeItem("invite_code");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-purple-100 text-white flex flex-col justify-center items-center space-y-6">
      <h1 className="text-3xl font-bold animate-text-fade">
        청약한눈에
      </h1>

      <p className="text-gray-400">청약 공고와 유튜브를 한눈에!</p>

      {/* 👋 사용자 환영 메시지 */}
      {code && (
        <p className="text-lg text-green-600">
          👋 {code} 님 반갑습니다!
        </p>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/notices")}
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
        >
          청약 공고 게시판
        </button>
        <button
          onClick={() => navigate("/youtube-scrap")}
          className="bg-green-500 px-6 py-2 rounded hover:bg-green-600"
        >
          청약 유튜브 정보 게시판
        </button>
      </div>

      {/* admin일 때만 발급 버튼 표시 */}
      {role === "admin" && (
        <button
          onClick={() => navigate("/admin/invite")}
          className="mt-4 bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600"
        >
          초대코드 발급하기
        </button>
      )}

      {/* 로그아웃 버튼은 모두에게 표시 */}
      <button
        onClick={handleLogout}
        className="mt-4 text-sm text-gray-400 underline hover:text-white"
      >
        로그아웃
      </button>
    </div>
  );
}
