import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your pages from the /pages folder
import Index from "./pages/Index";
import Revision from "./pages/Revision";
import Sprint from "./pages/Sprint";
import Challenge from "./pages/Challenge";

// 1. Create the Query Client (The "Engine" for data fetching)
const queryClient = new QueryClient();

function App() {
  return (
    // 2. The Provider makes useQuery work in all sub-components
    <QueryClientProvider client={queryClient}>
      {/* 3. The Router enables different URLs (e.g., /revision) */}
      <Router>
        <div className="min-h-screen bg-slate-950 text-white">
          <Routes>
            {/* 4. Map the paths to your components */}
            <Route path="/" element={<Index />} />
            <Route path="/revision" element={<Revision />} />
            { <Route path="/sprint" element={<Sprint />} /> }
            { <Route path="/challenge" element={<Challenge />} /> }
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;