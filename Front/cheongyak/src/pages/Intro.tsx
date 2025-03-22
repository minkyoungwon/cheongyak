import { motion } from "framer-motion";

export default function Intro() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white">
      <motion.h1
        className="text-6xl font-extrabold mb-12 text-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        청약 정보를 한눈에!
      </motion.h1>

      <div className="flex flex-row space-x-6">
        <a 
          href="/notices"
          className="px-6 py-4 text-lg font-semibold text-white bg-blue-500 rounded-lg border-4 border-white shadow-lg transition hover:bg-white hover:text-blue-600 text-center w-56"
        >
          청약 정보 게시판
        </a>

        <a 
          href="/youtube-scrap"
          className="px-6 py-4 text-lg font-semibold text-white bg-green-500 rounded-lg border-4 border-white shadow-lg transition hover:bg-white hover:text-green-600 text-center w-56"
        >
          유튜버 청약 스크랩 정리 게시판
        </a>
      </div>
    </div>
  );
}
