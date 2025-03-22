📌 Project 
한눈에 청약정보를 깔끔히 정리하고 알림으로 빠르게 받아볼 수 있는 웹 플랫폼.

🗂 프로젝트 개요 및 목적
목적

청약 관련 정보(공고, 유튜브 영상)를 한 곳에서 쉽게 확인

🖥 기술 스택 및 환경 설정 상세화
구분	사용 기술 및 서비스
프론트엔드	React (TypeScript 권장)
백엔드	Node.js, Express → NextJS 전환 고려 (API Route 기반)
DB	Supabase (PostgreSQL 클라우드 서비스)
상태관리	Zustand

고려중 
알림	Discord Webhook, Telegram Bot API
AI요약	DeepSeek API (저비용 우선) → 추후 OpenAI GPT 모델 교체 가능
크롤링	Python + Hoverify
프론트 배포	Vercel
백엔드 배포	Render
