import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import NoticeBoard from "./pages/NoticeBoard";
import ScrapBoard from "./pages/ScrapBoard";
import ScrapDetail from "./pages/ScrapDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/youtube-scrap" element={<ScrapBoard />} />
        <Route path="/youtube-scrap/:id" element={<ScrapDetail />} />
      </Routes>
    </Router>
  );
}
