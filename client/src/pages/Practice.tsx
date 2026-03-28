import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useProblem } from "@/hooks/use-problems";
import { useEvaluate } from "@/hooks/use-evaluate";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { 
  ChevronLeft, 
  Play, 
  Loader2, 
  Clock, 
  Database, 
  Target, 
  Zap, 
  AlertCircle,
  Lightbulb,
  Sparkles,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  Code2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Practice() {
  const { id } = useParams();
  const problemId = parseInt(id || "0", 10);
  
  const { data: problem, isLoading: isProblemLoading, error: problemError } = useProblem(problemId);
  const evaluateMutation = useEvaluate();
  
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // Sync initial code once problem loads
  useEffect(() => {
    if (problem && !code) {
      setCode(problem.startingCode);
    }
  }, [problem, code]);

  const handleSubmit = () => {
    if (!code.trim()) return;
    evaluateMutation.mutate(
      { code, problemId },
      {
        onSuccess: () => {
          setActiveTab("results");
        }
      }
    );
  };

  if (isProblemLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (problemError || !problem) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Problem not found</h2>
        <p className="text-muted-foreground mb-6">The challenge you're looking for doesn't exist.</p>
        <Link href="/">
          <Button className="rounded-xl px-6">Return Home</Button>
        </Link>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const results = evaluateMutation.data;
  const isAllPassed = results && results.passed === results.total;

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-card/50 backdrop-blur-md z-10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-lg hidden sm:block">
              {problem.id}. {problem.title}
            </h1>
            <Badge variant="outline" className={`${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSubmit} 
            disabled={evaluateMutation.isPending}
            className="rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
          >
            {evaluateMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2 fill-current" />
            )}
            Submit Solution
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          
          {/* Left Panel: Problem Info & Feedback */}
          <ResizablePanel defaultSize={40} minSize={30} className="flex flex-col bg-card/20">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="px-4 pt-3 border-b border-border flex-shrink-0 bg-background/50">
                <TabsList className="bg-transparent border-b-0 h-auto p-0 gap-6">
                  <TabsTrigger 
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-0 pb-3 pt-2 text-sm font-medium transition-all"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="results"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-0 pb-3 pt-2 text-sm font-medium transition-all"
                  >
                    Results
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai-feedback"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-0 pb-3 pt-2 text-sm font-medium transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
                    AI Feedback
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1 p-6">
                <TabsContent value="description" className="m-0 focus-visible:outline-none">
                  <div className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-display font-bold text-foreground mb-4">{problem.title}</h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap mb-8">
                      {problem.description}
                    </div>

                    <h3 className="text-lg font-bold text-foreground border-b border-border/50 pb-2 mb-4">Examples</h3>
                    <div className="space-y-6 mb-8">
                      {(problem.examples as any[]).map((ex, i) => (
                        <div key={i} className="bg-secondary/30 rounded-xl p-4 border border-border/50">
                          <p className="font-mono text-sm mb-2"><strong className="text-foreground">Input:</strong> <span className="text-blue-300">{ex.input}</span></p>
                          <p className="font-mono text-sm"><strong className="text-foreground">Output:</strong> <span className="text-emerald-300">{ex.output}</span></p>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-foreground border-b border-border/50 pb-2 mb-4">Constraints</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-mono text-sm">
                      {(problem.constraints as string[]).map((c, i) => (
                        <li key={i}><span className="bg-secondary px-2 py-0.5 rounded text-primary-foreground">{c}</span></li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="results" className="m-0 focus-visible:outline-none">
                  <AnimatePresence mode="wait">
                    {evaluateMutation.isPending ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                      >
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                          <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Running Tests & AI Analysis</h3>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">Evaluating your solution's correctness, efficiency, and code quality...</p>
                      </motion.div>
                    ) : !results ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <Play className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">Submit your solution to see results</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        {/* Status Hero */}
                        <div className={`p-6 rounded-2xl border ${isAllPassed ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'} flex flex-col items-center text-center`}>
                          {isAllPassed ? (
                            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                          ) : (
                            <XCircle className="w-16 h-16 text-rose-500 mb-4" />
                          )}
                          <h2 className={`text-2xl font-bold mb-2 ${isAllPassed ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isAllPassed ? 'Accepted!' : 'Tests Failed'}
                          </h2>
                          <p className="text-foreground font-medium">Passed {results.passed} / {results.total} test cases</p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="p-4 bg-secondary/20 border-border/50">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">Runtime</span>
                            </div>
                            <p className="text-2xl font-mono text-foreground">{results.runtime} <span className="text-sm text-muted-foreground">ms</span></p>
                          </Card>
                          <Card className="p-4 bg-secondary/20 border-border/50">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                              <Database className="w-4 h-4" />
                              <span className="text-sm font-medium">Memory</span>
                            </div>
                            <p className="text-2xl font-mono text-foreground">{results.memory} <span className="text-sm text-muted-foreground">MB</span></p>
                          </Card>
                          <Card className="p-4 bg-secondary/20 border-border/50">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                              <Target className="w-4 h-4" />
                              <span className="text-sm font-medium">Quality Score</span>
                            </div>
                            <p className="text-2xl font-mono text-foreground text-primary">{results.qualityScore}<span className="text-sm text-muted-foreground">/100</span></p>
                          </Card>
                          <Card className="p-4 bg-secondary/20 border-border/50">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                              <Zap className="w-4 h-4" />
                              <span className="text-sm font-medium">Efficiency</span>
                            </div>
                            <p className="text-lg font-medium text-foreground truncate" title={results.efficiency}>{results.efficiency}</p>
                          </Card>
                        </div>

                        {/* Static Analysis */}
                        <Card className="p-5 border-border/50 bg-background/50">
                          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-primary" /> Static Analysis
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Complexity</p>
                              <p className="font-mono font-medium text-foreground">O(n^{results.complexity})</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Max Loop</p>
                              <p className="font-mono font-medium text-foreground">{results.loopDepth}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Lines</p>
                              <p className="font-mono font-medium text-foreground">{results.lines}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Functions</p>
                              <p className="font-mono font-medium text-foreground">{results.functions}</p>
                            </div>
                          </div>
                        </Card>

                        {/* Issues */}
                        {results.issue && results.issue !== "None" && (
                          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/10">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                              <div>
                                <h4 className="font-bold text-amber-500 mb-1">Detected Issue</h4>
                                <p className="text-sm text-amber-200/80">{results.issue}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="ai-feedback" className="m-0 focus-visible:outline-none">
                  {evaluateMutation.isPending ? (
                     <div className="flex flex-col items-center justify-center py-20 text-center">
                       <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                       <p className="text-muted-foreground">Generating AI insights...</p>
                     </div>
                  ) : !results ? (
                    <div className="text-center py-20">
                      <BrainCircuit className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">Submit code to get personalized AI feedback</p>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      
                      <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Sparkles className="w-24 h-24 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
                          <BrainCircuit className="w-5 h-5 text-primary" /> Code Review
                        </h3>
                        <p className="text-muted-foreground leading-relaxed relative z-10">
                          {results.aiExplanation}
                        </p>
                      </Card>

                      <Card className="p-6 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
                        <h3 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
                          <Lightbulb className="w-5 h-5 text-blue-400" /> Suggested Approach
                        </h3>
                        {typeof results.suggestedApproach === "string" ? (
                          <p className="text-muted-foreground leading-relaxed">
                            {results.suggestedApproach}
                          </p>
                        ) : (
                          <ol className="text-muted-foreground leading-relaxed space-y-2 list-decimal list-inside">
                            {results.suggestedApproach.map((step, i) => (
                              <li key={i} className="text-sm">{step}</li>
                            ))}
                          </ol>
                        )}
                      </Card>

                      <Card className="p-6 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
                        <h3 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5 text-purple-400" /> Think About This
                        </h3>
                        <p className="text-muted-foreground leading-relaxed italic">
                          "{results.thinkAboutThis}"
                        </p>
                      </Card>

                    </motion.div>
                  )}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </ResizablePanel>
          
          <ResizableHandle className="w-2 bg-border/50 hover:bg-primary/50 transition-colors" />
          
          {/* Right Panel: Code Editor */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full p-4 pl-2 bg-background flex flex-col">
              <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-border/50 relative">
                <CodeEditor 
                  initialValue={code} 
                  onChange={setCode}
                  language="javascript"
                />
              </div>
            </div>
          </ResizablePanel>
          
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
