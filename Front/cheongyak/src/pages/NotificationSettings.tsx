import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useAuthStore } from "../hooks/useAuthStore";

interface NotificationSettings {
  discord: boolean;
  telegram: boolean;
  email: boolean;
  cheongyak_updates: boolean;
  new_videos: boolean;
}

export default function NotificationSettings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [settings, setSettings] = useState<NotificationSettings>({
    discord: false,
    telegram: false,
    email: false,
    cheongyak_updates: true,
    new_videos: true,
  });

  // 알림 설정 로딩
  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("user_notification_settings")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (error && error.code !== "PGRST116") {
          console.error("알림 설정 로딩 실패:", error);
          return;
        }
        
        if (data) {
          setSettings({
            discord: data.discord || false,
            telegram: data.telegram || false,
            email: data.email || false,
            cheongyak_updates: data.cheongyak_updates !== false, // 기본값 true
            new_videos: data.new_videos !== false, // 기본값 true
          });
        }
      } catch (error) {
        console.error("알림 설정 로딩 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSettings();
  }, [user]);

  // 알림 설정 저장
  const saveSettings = async () => {
    if (!user?.id) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    
    setSaveStatus("saving");
    try {
      // 백엔드 API를 통해 설정 저장
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notification/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          settings,
        }),
      });
      
      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }
      
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("알림 설정 저장 실패:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  // 설정 변경 핸들러
  const handleChange = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!user?.id) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">알림 설정을 변경하려면 로그인이 필요합니다.</p>
        <button 
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          로그인하기
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-purple-50 via-white to-gray-100">
      <h2 className="text-3xl font-bold mb-6">알림 설정</h2>
      
      {loading ? (
        <p className="text-center my-8">설정 불러오는 중...</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">알림 채널</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium cursor-pointer" htmlFor="discord">
                    Discord
                  </label>
                  <p className="text-sm text-gray-600">Discord 채널로 알림 받기</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="discord"
                    checked={settings.discord}
                    onChange={() => handleChange("discord")}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full ${
                      settings.discord ? "bg-blue-500" : "bg-gray-300"
                    } transition-colors`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      settings.discord ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium cursor-pointer" htmlFor="telegram">
                    Telegram
                  </label>
                  <p className="text-sm text-gray-600">Telegram으로 알림 받기</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="telegram"
                    checked={settings.telegram}
                    onChange={() => handleChange("telegram")}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full ${
                      settings.telegram ? "bg-blue-500" : "bg-gray-300"
                    } transition-colors`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      settings.telegram ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium cursor-pointer" htmlFor="email">
                    이메일
                  </label>
                  <p className="text-sm text-gray-600">이메일로 알림 받기 (추후 지원 예정)</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="email"
                    checked={settings.email}
                    onChange={() => handleChange("email")}
                    disabled
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full ${
                      settings.email ? "bg-blue-500" : "bg-gray-300"
                    } opacity-50 transition-colors`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      settings.email ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">알림 종류</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium cursor-pointer" htmlFor="cheongyak_updates">
                    청약 정보 업데이트
                  </label>
                  <p className="text-sm text-gray-600">새로운 청약 정보가 등록되면 알림 받기</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="cheongyak_updates"
                    checked={settings.cheongyak_updates}
                    onChange={() => handleChange("cheongyak_updates")}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full ${
                      settings.cheongyak_updates ? "bg-blue-500" : "bg-gray-300"
                    } transition-colors`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      settings.cheongyak_updates ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium cursor-pointer" htmlFor="new_videos">
                    새 영상 알림
                  </label>
                  <p className="text-sm text-gray-600">새로운 청약 관련 영상이 등록되면 알림 받기</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="new_videos"
                    checked={settings.new_videos}
                    onChange={() => handleChange("new_videos")}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full ${
                      settings.new_videos ? "bg-blue-500" : "bg-gray-300"
                    } transition-colors`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      settings.new_videos ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={saveSettings}
              disabled={saveStatus === "saving"}
              className={`px-6 py-2 rounded font-semibold ${
                saveStatus === "saving"
                  ? "bg-gray-400 cursor-not-allowed"
                  : saveStatus === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : saveStatus === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
            >
              {saveStatus === "idle" && "저장하기"}
              {saveStatus === "saving" && "저장 중..."}
              {saveStatus === "success" && "저장 완료 ✓"}
              {saveStatus === "error" && "저장 실패 ✗"}
            </button>
          </div>
          
          {saveStatus === "error" && (
            <p className="mt-4 text-center text-red-500">
              설정 저장 중 오류가 발생했습니다. 다시 시도해 주세요.
            </p>
          )}
        </>
      )}
    </div>
  );
}
