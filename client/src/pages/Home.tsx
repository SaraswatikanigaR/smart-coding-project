import { useState } from "react";
import { useProblems } from "@/hooks/use-problems";
import { ProblemCard } from "@/components/ProblemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: problems, isLoading } = useProblems();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filteredProblems = problems?.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.topic.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background bg-grid-pattern relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6 border border-primary/20">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
            Master Your <span className="text-gradient">Craft</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Level up your coding skills with AI-powered feedback. Solve algorithms, optimize your code, and learn from intelligent insights.
          </p>
        </motion.div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-card p-4 rounded-2xl border border-border shadow-lg">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search problems or topics..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background border-transparent focus-visible:ring-primary h-12 rounded-xl"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
              <Button
                key={difficulty}
                variant={filter === difficulty ? "default" : "outline"}
                onClick={() => setFilter(difficulty)}
                className={`rounded-xl h-12 px-6 font-semibold transition-all ${
                  filter === difficulty 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90" 
                    : "bg-background hover:bg-secondary border-border"
                }`}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground font-medium">Loading challenges...</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && filteredProblems && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem, i) => (
              <ProblemCard key={problem.id} problem={problem} index={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProblems?.length === 0 && (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-muted-foreground mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No problems found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            <Button 
              variant="outline" 
              className="mt-6 rounded-xl"
              onClick={() => { setSearch(""); setFilter("All"); }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
