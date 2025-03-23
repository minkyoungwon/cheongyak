import axios from "axios";

export async function summarizeTextWithDeepSeek(text) {
  const prompt = `다음 유튜브 영상 자막 내용을 짧게 요약해줘:\n\n${text}`;
  
  const response = await axios.post(
    "https://api.deepseek.com/v1/chat/completions",
    {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "당신은 영상 자막을 요약해주는 AI입니다." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}
