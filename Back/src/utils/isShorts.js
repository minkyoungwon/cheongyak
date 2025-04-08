



// --- 쇼츠인지 동영상인지 구분 하는 방법
// => 이게 로직상으로 힘들어서
// 영상 길이 60초 이하
// 화면 설정 등으로 구분 짓어서 해야하는데
// 이게 생각보다 어려움
// youtube api 측에서 따로 지정해주는 명이 없고
// 영상  길이가 60초 이상이 넘어가는게 있고
// 화면 길이 조건이 어떤것은 영상 안에서 쇼츠를 틀어주는 조건등이
// 있어서 
// 쇼츠 구분은 현재 어려움
// 할라면 아예 로직이 아니라 모델을 파야함



// // src/utils/isShorts.js

// export function isShorts({ duration, title, description, thumbnail }) {
// 	// duration: ISO 8601 형식 (예: PT1M2S)
// 	const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
// 	const minutes = parseInt(match?.[1] || "0");
// 	const seconds = parseInt(match?.[2] || "0");
// 	const totalSeconds = minutes * 60 + seconds;
  
// 	// 제목 또는 설명에 #shorts 포함 여부
// 	const hasShortsTag = (title + " " + description).toLowerCase().includes("#shorts");
  
// 	// 썸네일 세로 비율 여부
// 	const isVerticalThumbnail = thumbnail?.height > thumbnail?.width;
  
// 	return totalSeconds <= 70 || hasShortsTag || isVerticalThumbnail;
//   }
  


// utils/isShorts.js

// export function isShorts({ duration, title, description, thumbnail }) {
// 	const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
// 	const minutes = parseInt(match?.[1] || "0");
// 	const seconds = parseInt(match?.[2] || "0");
// 	const totalSeconds = minutes * 60 + seconds;
  
// 	const hasShortsTag = (title + " " + description).toLowerCase().includes("#shorts");
// 	const isVerticalThumbnail = thumbnail?.height > thumbnail?.width;
  
// 	return totalSeconds <= 70 || hasShortsTag || isVerticalThumbnail;
//   }
  