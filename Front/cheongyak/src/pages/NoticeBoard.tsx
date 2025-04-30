import { useState, useEffect } from "react";

export default function NoticeBoard() {
	const [priorityInfo, setPriorityInfo] = useState("");
	const [open, setOpen] = useState(false);
	const [activeFaqIndex, setActiveFaqIndex] = useState(-1);
	const [lhNotices, setLhNotices] = useState<any[]>([]);
	const [shNotices, setShNotices] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	
	// FAQ 데이터 배열
	const faqs = [
		{
			question: "청약통장은 언제부터 가입할 수 있나요?",
			answer: "만 19세 이상이면 청약통장에 가입할 수 있습니다. 단, 주택청약종합저축의 경우는 만 19세 미만도 가입 가능합니다."
		},
		{
			question: "청약 신청 시 필요한 서류는 무엇인가요?",
			answer: "신분증, 주민등록등본, 가족관계증명서, 소득증빙서류 등이 일반적으로 필요합니다. 청약 유형에 따라 추가 서류가 필요할 수 있으니 공고문을 꼼꼼히 확인하세요."
		},
		{
			question: "청약 가점은 어떻게 계산되나요?",
			answer: "무주택기간, 부양가족 수, 청약통장 가입기간을 기준으로 계산됩니다. 각 항목별로 최대 32점, 35점, 17점으로 총 84점까지 가능합니다."
		},
		{
			question: "신혼부부 특별공급 자격 조건은 무엇인가요?",
			answer: "혼인기간 7년 이내, 소득기준 충족(도시근로자 월평균 소득의 120% 이하), 무주택세대구성원 등의 조건이 필요합니다. 자세한 사항은 공고문을 참고하세요."
		},
		{
			question: "청약 당첨 후 계약을 포기하면 어떻게 되나요?",
			answer: "청약 당첨 후 계약을 포기하면 청약 당첨자 명단에 등록되어 일정 기간 동안 청약 제한을 받을 수 있습니다. 주택 유형에 따라 제한 기간이 다르니 유의하세요."
		}
	];
	
	// 청약 공고 데이터 로드 함수
	const fetchNoticeData = async () => {
		setLoading(true);
		try {
			// 실제 API 연동은 아래 주석을 해제하고 실제 API 엔드포인트로 대체해야 합니다
			// const lhResponse = await fetch('/api/notices/lh');
			// const lhData = await lhResponse.json();
			// setLhNotices(lhData);
			
			// const shResponse = await fetch('/api/notices/sh');
			// const shData = await shResponse.json();
			// setShNotices(shData);
			
			// 임시 데이터 (API 연동 전까지 사용)
			setLhNotices([
				{ id: 1, title: "2025년 1차 행복주택 입주자 모집공고", date: "2025-03-20", link: "#" },
				{ id: 2, title: "2025년 신혼부부 특별공급 안내", date: "2025-03-15", link: "#" },
				{ id: 3, title: "LH 청년매입임대 입주자 모집공고", date: "2025-03-05", link: "#" }
			]);
			
			setShNotices([
				{ id: 1, title: "SH 청년 매입임대주택 입주자 모집공고", date: "2025-04-01", link: "#" },
				{ id: 2, title: "2025 SH 청년 지원 주택 모집공고", date: "2025-03-25", link: "#" }
			]);
		} catch (error) {
			console.error("청약 공고 데이터 로드 실패:", error);
		} finally {
			setLoading(false);
		}
	};
	
	// 컴포넌트 마운트 시 데이터 로드
	useEffect(() => {
		fetchNoticeData();
	}, []);

	return (
		<div className="p-8 text-gray-800 bg-gradient-to-br from-white via-purple-50 to-purple-200 min-h-screen">
			<h2 className="text-3xl font-bold mb-8 text-center">🏡 청약 (청년임대) 정보 게시판</h2>


			<div className="flex flex-col lg:flex-row gap-6 mb-8">
				{/* LH 섹션 */}
				<div className="bg-white rounded-lg shadow-md p-6 mb-8 lg:mb-0 lg:flex-1">
					<h3 className="text-2xl font-semibold mb-4 text-purple-600">LH 청약 정보</h3>
					
					{loading ? (
						<div className="flex justify-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
						</div>
					) : lhNotices.length > 0 ? (
						<div className="mb-6">
							<div className="border border-purple-200 rounded-lg overflow-hidden">
								<table className="min-w-full divide-y divide-purple-200">
									<thead className="bg-purple-50">
										<tr>
											<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">공고명</th>
											<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">게시일</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-purple-100">
										{lhNotices.map((notice) => (
											<tr key={notice.id} className="hover:bg-purple-50 transition-colors">
												<td className="px-6 py-4">
													<a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-purple-900 hover:underline">
														{notice.title}
													</a>
												</td>
												<td className="px-6 py-4 text-sm text-gray-600">{notice.date}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<p className="mb-4 text-gray-700">현재 등록된 LH 청약 공고가 없습니다.</p>
					)}
					
					<div className="flex flex-col sm:flex-row gap-2 mt-4">
						<a
							href="https://apply.lh.or.kr/lhapply/apply/main.do?mi=1021"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-5 py-2 bg-gradient-to-r from-white to-purple-300 text-gray-800 font-semibold rounded hover:from-purple-200 hover:to-purple-400 transition"
						>
							LH 청약 페이지 바로가기
						</a>
						<a
							href="https://apply.lh.or.kr/lhapply/apply/wt/wrtanc/selectWrtancList.do?mi=1026"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-5 py-2 bg-gradient-to-r from-white to-purple-500 text-gray-800 font-semibold rounded hover:from-purple-200 hover:to-purple-400 transition"
						>
							LH 청약 임대주택 공고문 바로가기
						</a>
					</div>
				</div>


				{/* SH 섹션 */}
				<div className="flex-1 bg-white rounded-lg shadow-md p-6">
					<h3 className="text-2xl font-semibold mb-4 text-green-500">SH 청약 정보</h3>
					
					{loading ? (
						<div className="flex justify-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
						</div>
					) : shNotices.length > 0 ? (
						<div className="mb-6">
							<div className="border border-green-200 rounded-lg overflow-hidden">
								<table className="min-w-full divide-y divide-green-200">
									<thead className="bg-green-50">
										<tr>
											<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">공고명</th>
											<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">게시일</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-green-100">
										{shNotices.map((notice) => (
											<tr key={notice.id} className="hover:bg-green-50 transition-colors">
												<td className="px-6 py-4">
													<a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 hover:underline">
														{notice.title}
													</a>
												</td>
												<td className="px-6 py-4 text-sm text-gray-600">{notice.date}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<p className="mb-4 text-gray-700">현재 등록된 SH 청약 공고가 없습니다.</p>
					)}
					
					<div className="mt-4">
						<a
							href="https://www.i-sh.co.kr/main/index.do"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-5 py-2 bg-gradient-to-r from-white to-green-300 text-gray-800 font-semibold rounded hover:from-green-200 hover:to-green-400 transition"
						>
							SH 청약 페이지 바로가기
						</a>
					</div>
				</div>
			</div>


      {/* 청약 관련 콘텐츠 섹션 */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">청약 정보 만나기</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 유튜브 콘텐츠 */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-5 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              <h4 className="text-xl font-bold text-gray-800">청약 유튜브 채널</h4>
            </div>
            <p className="text-gray-700 mb-4">청약 관련 정보와 팁을 제공하는 유튜브 채널을 통해 간편하게 청약 정보를 확인하세요.</p>
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/@%EC%95%84%EC%98%81%EC%9D%B4%EB%84%A4%ED%96%89%EB%B3%B5%EC%A3%BC%ED%83%9D/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
              >
                <img 
                  src="https://via.placeholder.com/32x32?text=AY" 
                  alt="아영이네" 
                  className="w-8 h-8 rounded-full mr-3" 
                />
                <div>
                  <h5 className="font-medium text-gray-900">아영이네 행복주택</h5>
                  <p className="text-sm text-gray-600">청약 업데이트 및 상세 정보 제공</p>
                </div>
              </a>
              <a
                href="https://www.youtube.com/c/LH%ED%95%9C%EA%B5%AD%ED%86%A0%EC%A7%80%EC%A3%BC%ED%83%9D%EA%B3%B5%EC%82%AC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
              >
                <img 
                  src="https://via.placeholder.com/32x32?text=LH" 
                  alt="LH공사" 
                  className="w-8 h-8 rounded-full mr-3" 
                />
                <div>
                  <h5 className="font-medium text-gray-900">LH 공식 채널</h5>
                  <p className="text-sm text-gray-600">공식 정책 및 사업 소개</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* 커뮤니티 콘텐츠 */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"/>
              </svg>
              <h4 className="text-xl font-bold text-gray-800">청약 커뮤니티</h4>
            </div>
            <p className="text-gray-700 mb-4">실제 청약 신청자들이 정보를 공유하는 커뮤니티에서 최신 팁과 사례를 확인하세요.</p>
            <div className="space-y-3">
              <a
                href="https://cafe.naver.com/f-e/cafes/30457337/menus/6?viewType=L"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-white rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
              >
                <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <div>
                  <h5 className="font-medium text-gray-900">네이버 카페</h5>
                  <p className="text-sm text-gray-600">공고문 및 청약 정보 공유</p>
                </div>
              </a>
              <a
                href="https://m.post.naver.com/my/series/detail.naver?seriesNo=630160&memberNo=2390067"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-white rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
              >
                <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.568.075c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-.185-4.534s-1.088-.57-2.198-.872v13.629l.959-.001c.635-1.189 1.817-2.077 3.067-2.077 1.886 0 3.436 1.55 3.436 3.436s-1.55 3.436-3.436 3.436c-1.577 0-2.914-1.093-3.295-2.555h-1.731v6.212h-4.9v-19.5h2.722c.653-1.027 2.786-2.32 4.22-2.876zm-9.845 20.598h9.942v-13.629c-2.05-.589-3.543-.827-4.9-1.806-2.066 1.177-4.491 2.501-5.042 3.034v12.401zm6.69-5.834c.407.222.887.347 1.395.347 1.607 0 2.908-1.301 2.908-2.908s-1.301-2.908-2.908-2.908c-.511 0-.993.129-1.414.353.098.589.157 1.188.171 1.8l.437-.002c.551 0 .998.447.998.998s-.447.998-.998.998h-.421c-.049.437-.138.871-.268 1.292.038.009.073.022.11.03z"/>
                </svg>
                <div>
                  <h5 className="font-medium text-gray-900">네이버 포스트</h5>
                  <p className="text-sm text-gray-600">청약 경험 및 사례 전파</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

			<div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
				<h3 className="text-2xl font-bold text-gray-800 mb-6">청약 중요 정보</h3>
				<div className="space-y-4">
					{/* 1순위 관련 아코디언 */}
					<div className="border border-blue-200 rounded-lg overflow-hidden">
						<button
							onClick={() => setOpen(!open)}
							className={`w-full flex justify-between items-center px-5 py-4 font-medium transition-colors text-left ${open ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
						>
							<div className="flex items-center">
								<svg className="w-6 h-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
								</svg>
								<span>청약 1순위 자격 조건</span>
							</div>
							<svg
								className={`h-5 w-5 transform transition-transform ${open ? 'rotate-180' : ''}`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						
						{open && (
							<div className="p-5 bg-blue-50 border-t border-blue-200">
								<ul className="space-y-3 text-gray-700">
									<li>무주택 세대구성원: 본인과 배우자, 직계존비속 등 포함</li>
									<li>청약통장 가입기간: 일반적으로 2년 이상, 납입회수 24회 이상</li>
									<li>지역별 조건이 상이하므로 공고문 상세 확인 필요</li>
								</ul>
							</div>
						)}
					</div>
					
					{/* 바로가기 버튼 */}
					<a
						href="https://apply.lh.or.kr"
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full border border-green-200 rounded-lg p-4 bg-white hover:bg-green-50 transition-colors text-center font-medium text-green-700"
					>
						청약통장 가점 확인하기
					</a>
				</div>
			</div>


			{/* 메모 섹션 */}
			<div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
				<h3 className="text-2xl font-bold text-gray-800 mb-4">나만의 청약 메모</h3>
				<div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
					<p className="text-sm text-yellow-800">이 메모는 브라우저에 임시 저장됩니다. 청약 정보, 일정, 준비 서류 등 중요한 내용을 기록해 두세요.</p>
				</div>
				<textarea
					value={priorityInfo}
					onChange={(e) => setPriorityInfo(e.target.value)}
					placeholder="청약 관련 중요 정보를 메모하세요 (예: 서류 준비 목록, 자격 조건 등)"
					className="w-full p-4 border border-blue-200 rounded-lg resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
				/>
			</div>

			{/* 자주 묻는 질문 섹션 */}
			<div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
				<h3 className="text-2xl font-bold text-gray-800 mb-6">자주 묻는 질문 (FAQ)</h3>
				<div className="space-y-3">
					{faqs.map((faq, index) => (
						<div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
							<button
								onClick={() => setActiveFaqIndex(activeFaqIndex === index ? -1 : index)}
								className={`w-full text-left p-4 font-medium transition-colors flex justify-between items-center ${activeFaqIndex === index ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
							>
								<span>{faq.question}</span>
								<svg
									className={`h-5 w-5 transform transition-transform ${activeFaqIndex === index ? 'rotate-180' : ''}`}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							{activeFaqIndex === index && (
								<div className="p-4 bg-gray-50 border-t border-gray-200">
									<p className="text-gray-700">{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}