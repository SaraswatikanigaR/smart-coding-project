import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const modes = [
    {
      id: "revision",
      title: "Revision Mode",
      description: "Strengthen your weak spots based on past performance.",
      color: "border-blue-500/50 hover:bg-blue-500/10",
      text: "text-blue-400",
      path: "/revision",
    },
    {
      id: "sprint",
      title: "Sprint Mode",
      description: "Fast-paced challenges to test your speed and accuracy.",
      color: "border-pink-500/50 hover:bg-pink-500/10",
      text: "text-pink-400",
      path: "/sprint",
    },
    {
      id: "challenge",
      title: "Coding Challenge",
      description: "Solve real-world coding problems in our custom editor.",
      color: "border-purple-500/50 hover:bg-purple-500/10",
      text: "text-purple-400",
      path: "/challenge",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="max-w-6xl mx-auto mb-16 mt-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Smart Coding Hub
        </h1>
        <p className="text-slate-400 mt-2">Pick a mode and level up your skills.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => navigate(mode.path)}
            className={`flex flex-col text-left p-8 rounded-3xl border-2 transition-all duration-300 ${mode.color}`}
          >
            <h2 className={`text-2xl font-bold mb-3 ${mode.text}`}>
              {mode.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {mode.description}
            </p>
            <div className="mt-auto font-semibold flex items-center gap-2">
              Start Session <span className="text-xl">→</span>
            </div>
          </button>
        ))}
      </main>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-900 text-slate-500 text-sm">
        Connect your dev environment to track real-time progress.
      </footer>
    </div>
  );
};

export default Index;