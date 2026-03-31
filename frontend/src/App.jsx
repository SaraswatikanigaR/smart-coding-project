import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Practice from "./pages/Practice/Practice";
import Streak from "./pages/Streak/Streak";
import Topics from "./pages/Topics/TopicsPage";
import AchievementsPage from "./pages/Achievements/AchievementsPage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/streak" element={<Streak />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;