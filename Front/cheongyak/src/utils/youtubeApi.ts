// 유튜브 API에서 데이터를 가져오는 함수 (추가할 경우)

// utils/youtubeApi.ts
export async function fetchYoutubeVideos(query: string) {
	const response = await fetch(`http://localhost:4000/youtube?q=${encodeURIComponent(query)}`);
	if (!response.ok) throw new Error("백엔드 API 호출 실패");
  
	const data = await response.json();
	return data
  }
  

  