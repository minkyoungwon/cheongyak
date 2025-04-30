import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { sendManualNotification } from "../utils/notificationApi";

export default function NotificationTest() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  // const [loading, setLoading] = useState(false); // 알림 빌드전 임시 주석
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    imageUrl: "",
    discord: true,
    telegram: true,
  });

  // 폼 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 알림 전송
  const sendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.description) {
      alert("제목과 내용은 필수 입력 사항입니다.");
      return;
    }
    
    setStatus("sending");
    try {
      await sendManualNotification(
        form.title,
        form.description,
        form.url || undefined,
        form.imageUrl || undefined,
        {
          discord: form.discord,
          telegram: form.telegram,
        }
      );
      
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("알림 전송 실패:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // 관리자 확인
  const isAdmin = user?.role === "admin";

  if (!user?.id) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">알림 테스트 페이지에 접근하려면 로그인이 필요합니다.</p>
        <button 
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          로그인하기
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">알림 테스트 페이지는 관리자만 접근할 수 있습니다.</p>
        <button 
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-300"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-purple-50 via-white to-gray-100">
      <h2 className="text-3xl font-bold mb-6">알림 테스트</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <form onSubmit={sendNotification}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              제목 *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              내용 *
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows={4}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="url" className="block font-medium mb-1">
              URL (선택사항)
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="https://example.com"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="imageUrl" className="block font-medium mb-1">
              이미지 URL (선택사항)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="mb-6">
            <p className="font-medium mb-2">알림 채널 선택</p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="discord"
                  checked={form.discord}
                  onChange={handleChange}
                  className="mr-2"
                />
                Discord
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="telegram"
                  checked={form.telegram}
                  onChange={handleChange}
                  className="mr-2"
                />
                Telegram
              </label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`px-6 py-2 rounded font-semibold ${
                status === "sending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : status === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
            >
              {status === "idle" && "알림 보내기"}
              {status === "sending" && "전송 중..."}
              {status === "success" && "전송 완료 ✓"}
              {status === "error" && "전송 실패 ✗"}
            </button>
          </div>
        </form>
      </div>
      
      {status === "success" && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
          <p className="text-green-700">알림이 성공적으로 전송되었습니다.</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">알림 전송 중 오류가 발생했습니다. 다시 시도해 주세요.</p>
        </div>
      )}
      
      <div className="text-sm text-gray-600 mt-4">
        <p>
          * 이 페이지는 관리자만 접근할 수 있으며, 알림 기능을 테스트하기 위한 페이지입니다.
        </p>
        <p className="mt-1">
          * 실제 알림을 보내므로 신중하게 사용해 주세요.
        </p>
      </div>
    </div>
  );
}
