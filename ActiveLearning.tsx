import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, CheckCircle, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { TOPICS, type Topic } from '@/data/quizData';

const ActiveLearning = () => {
  const [step, setStep] = useState<'list' | 'briefing' | 'quiz'>('list');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startBriefing = (topicId: string) => {
    setSelectedTopic(TOPICS[topicId]);
    setStep('briefing');
  };

  const handleAnswer = (index: number) => {
    if (index === selectedTopic?.questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
      toast.success("Correct!");
    } else {
      toast.error("Incorrect, keep going!");
    }

    if (currentQuestion + 1 < (selectedTopic?.questions.length || 0)) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      toast.info(`Quiz Finished! Score: ${score + (index === selectedTopic?.questions[currentQuestion].answer ? 1 : 0)}`);
      setStep('list');
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <div className="dark min-h-screen bg-background p-8 flex flex-col items-center">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: TOPIC LIST */}
        {step === 'list' && (
          <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-muted-foreground">Active Learning Path</h1>
            <div className="grid gap-4">
              {Object.keys(TOPICS).map((key) => (
                <Card key={key} className="hover:border-primary cursor-pointer transition-all" onClick={() => startBriefing(key)}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{TOPICS[key].title}</CardTitle>
                      <CardDescription>{TOPICS[key].questions.length} Questions</CardDescription>
                    </div>
                    <BookOpen className="text-primary w-6 h-6" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: BRIEFING */}
        {step === 'briefing' && selectedTopic && (
          <motion.div key="briefing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-2xl">
            <Card>
              <CardHeader>
                <Button variant="ghost" size="sm" onClick={() => setStep('list')} className="w-fit mb-4">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <CardTitle className="text-2xl text-primary">{selectedTopic.title}: Briefing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed mb-8">{selectedTopic.briefing}</p>
                <Button className="w-full" onClick={() => setStep('quiz')}>
                  <Play className="mr-2 h-4 w-4" /> Start Quiz
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* STEP 3: QUIZ */}
        {step === 'quiz' && selectedTopic && (
          <motion.div key="quiz" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-xl">
            <Card className="border-primary/50 shadow-lg shadow-primary/10">
              <CardHeader>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestion + 1} of {selectedTopic.questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <CardTitle>{selectedTopic.questions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
              <div className="w-full bg-secondary h-2 rounded-full mb-6 overflow-hidden">
            <motion.div 
            className="bg-primary h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / selectedTopic.questions.length) * 100}%` }}
            />
            </div>
                {selectedTopic.questions[currentQuestion].options.map((option, i) => (
                  <Button key={i} variant="outline" className="justify-start h-auto py-4 px-6 text-left hover:bg-primary/10" onClick={() => handleAnswer(i)}>
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ActiveLearning;