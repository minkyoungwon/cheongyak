// 유튜브 API에서 데이터를 가져오는 함수 (추가할 경우)

// utils/youtubeApi.ts
// export async function fetchYoutubeVideos(query: string) {
// 	const response = await fetch(`http://localhost:4000/youtube?q=${encodeURIComponent(query)}`);
// 	if (!response.ok) throw new Error("백엔드 API 호출 실패");
  
// 	const data = await response.json();
// 	return data
//   }
  

  // utils/youtubeApi.ts
export async function fetchYoutubeVideos(query: string) {
	const res = await fetch(`http://localhost:4000/youtube?q=${encodeURIComponent(query)}`);
	const data = await res.json();
	return data;
  }
  


//   export async function fetchYoutubeVideos(query = "청약", maxResults = 8) {
// 	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;
// 	console.log("🔍 유튜브 API 요청 URL:", url);
  
// 	try {
// 	  const response = await axios.get(url);
// 	  console.log("✅ 유튜브 API 응답:", response.data);
  
// 	  return response.data.items.map(item => ({
// 		id: item.id.videoId,
// 		title: item.snippet.title,
// 		description: item.snippet.description,
// 		thumbnail: item.snippet.thumbnails.medium.url,
// 		upload_date: item.snippet.publishedAt,
// 	  }));
// 	} catch (error) {
// 	  console.error("❌ 유튜브 API 호출 실패:", error);
// 	  return []; // 실패 시 빈 배열 리턴
// 	}
//   }
  


