# 📌 Project: 청약 알리미 플랫폼
 ## 첫 로그인시 백엔드 배포 프리티어로 인하여 속도 매우매우 느림
 # https://cheongyak.vercel.app/
 # 초대코드 admin 통하여 접속 가능
 # 배포 완료

# 🏡 청약 정보 통합 플랫폼

청약 정보를 한 곳에서 확인하고, 요약 및 알림까지 받을 수 있는 통합 웹 플랫폼입니다.  
**청약 공고**, **AI 요약**, **유튜브 영상**, **알림 기능**까지 — 사용자에게 꼭 필요한 정보를 효율적으로 제공합니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 **청약 공고 조회** | 현재 진행 중인 청약 공고를 통합적으로 확인 |
| 🧠 **AI 요약 기능** | DeepSeek API를 통해 공고 내용 요약 제공 |
| 🔔 **알림 기능** *(구현 중)* | 신규 청약 정보 발생 시 Discord 및 Telegram 알림 |
| 📺 **관련 유튜브 영상 제공** | 청약 관련 유익한 영상 콘텐츠 추천 |

---

## 💻 기술 스택

### 🖥️ 프론트엔드
- **React (TypeScript)** – 컴포넌트 기반 UI 개발
- **Zustand** – 간편하고 가벼운 상태 관리 라이브러리
- **TailwindCSS** – 유틸리티 클래스 기반 스타일링

### 🛠️ 백엔드
- **Node.js + Express** – API 서버 구축
- **Supabase (PostgreSQL)** – 데이터베이스 및 인증 처리

### 🤖 AI & 크롤링
- **DeepSeek API** – 비용 효율적인 AI 요약
- **Python + Hoverify** *(예정)* – 청약 정보 자동 수집

### ☁️ 배포 환경
- **Vercel** – 프론트엔드 배포
- **Render** – 백엔드 배포

---

## 🖼️ 화면 미리보기

### 🔑 로그인 화면  
초대코드 입력 후 접속 (예시: `admin`)

<img src="![초기 로그인 화면 처양ㄱ](https://github.com/user-attachments/assets/a8add256-d2b0-44b6-95e3-be76cc072327)" width="600"/>

### 🏠 메인 페이지  
청약 공고 목록 및 유튜브 추천 콘텐츠 확인

<img src="https://user-images.githubusercontent.com/your-image-main.png" width="600"/>

---

## 🧩 시스템 구조도

```plaintext
Client (React) <---> Server (Express) <---> Database (Supabase)
       |                  |                    |
       ↓                  ↓                    ↓
  TailwindCSS        DeepSeek API          PostgreSQL
     Zustand      Discord / Telegram       Auth System
