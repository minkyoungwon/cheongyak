import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ 추가

export default function Intro() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white">
      <motion.h1
        className="text-6xl font-extrabold mb-12 text-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ChoengYak
      </motion.h1>

      <div className="flex flex-row space-x-6">
        {/* ✅ Link 컴포넌트로 교체 */}
        <Link
          to="/notices"
          className="px-6 py-4 text-lg font-semibold text-white bg-blue-500 rounded-lg border-4 border-white shadow-lg transition hover:bg-white hover:text-blue-600 text-center w-56"
        >
          cheongYak info
        </Link>

        <Link
          to="/youtube-scrap"
          className="px-6 py-4 text-lg font-semibold text-white bg-green-500 rounded-lg border-4 border-white shadow-lg transition hover:bg-white hover:text-green-600 text-center w-56"
        >
          youtube cheongYak scrap
        </Link>
      </div>
    </div>
  );
}
