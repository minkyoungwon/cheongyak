import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingTruck() {
	// 단계: "loading": 초기, "truck": 짐 적재 중, "move": 적재 완료 후 차량 움직임 및 문 닫힘
	const [stage, setStage] = useState<"loading" | "truck" | "move">("loading");

	useEffect(() => {
		const truckTimer = setTimeout(() => setStage("truck"), 2500);
		const moveTimer = setTimeout(() => setStage("move"), 5000);
		return () => {
			clearTimeout(truckTimer);
			clearTimeout(moveTimer);
		};
	}, []);

	return (
		<div className="relative w-full h-64 bg-gray-200 overflow-hidden flex justify-center items-center">
			{/* 도로 배경 */}
			<div
				className="absolute bottom-0 left-0 w-full h-[60px] bg-gray-500"
				style={{ zIndex: 1 }}
			/>

			{/* 움직이는 도로 점선 */}
			{stage === "move" && (
				<motion.div
					className="absolute bottom-[30px] left-0 w-[200%] flex items-center"
					initial={{ opacity: 0 }}
					animate={{ x: ["0%", "-50%"], opacity: 1 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					style={{ zIndex: 2 }}
				>
					<div className="flex w-full">
						{[...Array(60)].map((_, i) => (
							<div key={i} className="w-8 h-1 bg-white mr-4" />
						))}
					</div>
				</motion.div>
			)}

			{/* 차량 */}
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{
					y: stage !== "loading" ? 0 : 100,
					opacity: stage !== "loading" ? 1 : 0,
					x: stage === "move"
						? ["0%", "-40%", "30%", "0%"]
						: "0%",
				}}
				transition={{
					y: { duration: 1.2 },
					x: {
						duration: 6,
						ease: "easeInOut",
						// repeat: stage === "move" ? Infinity : 0,
						repeat: Infinity,
						repeatDelay: 0.2,
					},
					opacity: { duration: 1 },
				}}
				className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2 w-32 h-16 bg-blue-600 rounded-md shadow-xl"
				style={{ zIndex: 3 }}
			>
				{/* 차량 창문 */}
				<div className="absolute top-2 left-3 w-5 h-3 bg-white rounded-sm border border-gray-300" />
				{/* 차량 눈 */}
				<div className="absolute top-[10px] left-[14px] w-[2px] h-[2px] bg-black rounded-full" />
				<div className="absolute top-[10px] left-[18px] w-[2px] h-[2px] bg-black rounded-full" />

				{/* 트럭 문 - 짐 적재 후 stage가 move로 전환되면 문이 닫히는 효과 */}
				<motion.div
					className="absolute top-0 left-0 w-1/2 h-full bg-blue-700 rounded-md"
					initial={{ x: "-100%" }}
					animate={{ x: stage === "move" ? "0%" : "-100%" }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					style={{ zIndex: 5 }}
				/>
			</motion.div>

			{/* 짐: 계단 튀듯이 들어가서 차량 내부로 적재되는 효과 */}
			<AnimatePresence>
				{stage === "truck" && (
					<motion.div
						className="absolute flex gap-1"
						style={{ zIndex: 4, left: "calc(50% - 100px)", bottom: "40px" }}
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{[...Array(2)].map((_, i) => (
							<motion.div
								key={i}
								initial={{ x: -50, y: 30, opacity: 0, scale: 0.8 }}
								animate={{ x: [-50, -30, -10, 0], y: [30, 10, 0, 0], opacity: 1, scale: 1 }}
								exit={{ x: 50, opacity: 0 }}
								transition={{
									duration: 0.8,
									delay: i * 0.3,
									ease: "easeOut",
								}}
								className="w-5 h-5 bg-yellow-400 rounded shadow-lg"
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
