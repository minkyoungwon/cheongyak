// 유튜브 API에서 데이터를 가져오는 함수 (추가할 경우)

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function fetchYoutubeVideos(query: string) {
  const maxResults = 10;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("유튜브 API 호출 실패");

  const data = await response.json();
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}
