import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface CodingQuestion {
  question_id: string;
  topic_id: string;
  title: string;
  description: string;
  difficulty: string;
  function_name: string;
}

const TEST_USER_ID = "86d803f3-6da5-4191-8f43-984b4b02fef1";

const Challenge = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("// Write your solution here...");

  const { data, isLoading } = useQuery<{ questions: CodingQuestion[] }>({
    queryKey: ["challenge", TEST_USER_ID],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/modes/challenge/${TEST_USER_ID}`);
      return res.json();
    },
  });

  const handleSubmit = async () => {
    if (!data?.questions[0]) return;
    console.log("Submitting:", data.questions[0].question_id);
    alert("Tests running...");
    navigate("/");
  };

  if (isLoading) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  
  const question = data?.questions[0];

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-1/3 p-8 border-r border-slate-800">
        <h1 className="text-2xl font-bold mb-4">{question?.title}</h1>
        <p className="text-slate-400 mb-6">{question?.description}</p>
        <div className="bg-slate-900 p-4 rounded-lg">
          <span className="text-xs text-slate-500 block mb-1">Target Function:</span>
          <code className="text-purple-400 font-mono">{question?.function_name}()</code>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-zinc-950">
        <div className="p-4 flex justify-end">
          <button 
            onClick={handleSubmit}
            className="bg-purple-600 px-6 py-2 rounded font-bold"
          >
            Run Tests
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-6 bg-transparent font-mono text-blue-300 outline-none"
        />
      </div>
    </div>
  );
};

export default Challenge;