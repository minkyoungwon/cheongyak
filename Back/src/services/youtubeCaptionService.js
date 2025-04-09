import transcript from "youtube-transcript";

export async function getYoutubeCaptions(videoId) {
  try {
    const { YoutubeTranscript } = transcript;
    const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcriptData.map((item) => item.text).join(" ");
    return fullText;
  } catch (error) {
    console.error("❌ 자막 추출 실패:", error);
    return null;
  }
}
// console.log("transcript 모듈 확인:", transcript);

