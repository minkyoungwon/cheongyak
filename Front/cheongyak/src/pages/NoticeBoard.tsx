
import { useState } from "react";



export default function NoticeBoard() {
	const [priorityInfo, setPriorityInfo] = useState("");

	return (
		<div className="p-8 text-gray-800 bg-gradient-to-br from-white via-purple-50 to-purple-200 min-h-screen">
			<h2 className="text-3xl font-bold mb-8 text-center">🏡 청약 (청년임대) 정보 게시판</h2>

			{/* LH 섹션 */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-8">
				<h3 className="text-2xl font-semibold mb-2 text-purple-600">LH 청약 정보</h3>
				<p className="mb-4 text-gray-700">LH 청약 공고 리스트가 들어갈 예정입니다.</p>
				<a
					href="https://apply.lh.or.kr/lhapply/apply/main.do?mi=1021"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-5 py-2 bg-gradient-to-r from-white to-purple-300 text-gray-800 font-semibold rounded hover:from-purple-200 hover:to-purple-400 transition"
				>
					LH 청약 페이지 바로가기
				</a>
				<br />
				<a
					href="https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancList.do?mi=1026"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-5 py-2 bg-gradient-to-r from-white to-purple-500 text-gray-800 font-semibold rounded hover:from-purple-200 hover:to-purple-400 transition"
				>
					LH 청약 임대주택 공고문 페이지 바로가기
				</a>
			</div>


			{/* SH 섹션 */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-2xl font-semibold mb-2 text-green-500">SH 청약 정보</h3>
				<p className="mb-4 text-gray-700">SH 청약 공고 리스트 및 내용이 <br/> 여기에 표시될 예정입니다.</p>
				<a
					// href="https://www.i-sh.co.kr/main/lay2/program/S1T294C295/www/brd/m_241/view.do?seq=1635055"
					href="https://www.i-sh.co.kr/main/index.do"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-5 py-2 bg-gradient-to-r from-white to-green-300 text-gray-800 font-semibold rounded hover:from-purple-200 hover:to-purple-400 transition"

				>
					SH 청약 페이지 바로가기
				</a>
			</div>

			

			{/* 유튜브 섹션 */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-2xl font-semibold mb-2 text-blue-400">청약 관련 유튜브 링크</h3>
				<p className="mb-4 text-gray-700 font-bold">아영이네 행복주택</p>
				<a
					href="https://www.youtube.com/@%EC%95%84%EC%98%81%EC%9D%B4%EB%84%A4%ED%96%89%EB%B3%B5%EC%A3%BC%ED%83%9D/videos"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-5 py-2 bg-gradient-to-r from-white to-blue-300 text-gray-800 font-semibold rounded hover:from-purple-200 hover:to-purple-400 transition"

				>
					"아영이네 행복주택" 유튜브로 이동
				</a>
				<div>
					<p className="mb-4 text-gray-700 font-bold">공고문 (네이버 카페) 자료</p>
					<a
						href="https://cafe.naver.com/f-e/cafes/30457337/menus/6?viewType=L"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block px-5 py-2 bg-gradient-to-r from-white to-blue-300 text-gray-800 font-semibold rounded hover:from-purple-200 hover:to-purple-400 transition"

					>
						"아영이네 행복주택" 유튜브로 이동
					</a>
				</div>
			</div>



			<div className="space-y-6 mt-6">
				{/* 1순위 정보 */}
				<div tex-black-400>
					🏆 1순위 관련 정보
				</div>

				{/* 청약저축 납입회차 정보 */}
				<div>
					청약저축 납입회차 정보
				</div>
			</div>


			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-xl font-bold mb-2 text-purple-700">메모할 공간</h3>
				<textarea
					value={priorityInfo}
					onChange={(e) => setPriorityInfo(e.target.value)}
					placeholder="메모할 공간"
					className="w-full p-3 border border-gray-300 rounded resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-400"
				/>
			</div>


		</div>
	);
}
