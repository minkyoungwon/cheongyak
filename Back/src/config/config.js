import dotenv from "dotenv";
dotenv.config();

export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// console.log(YOUTUBE_API_KEY);
export const PORT = process.env.PORT || 4000;

// console.log("API KEY 직접 확인:", YOUTUBE_API_KEY);
// console.log("PORT 직접 확인:", PORT);