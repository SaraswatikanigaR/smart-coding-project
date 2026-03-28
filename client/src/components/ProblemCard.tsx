import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Binary, 
  Hash, 
  ListTree, 
  Workflow, 
  Network
} from "lucide-react";
import type { Problem } from "@shared/schema";

interface ProblemCardProps {
  problem: Problem;
  index: number;
}

const getTopicIcon = (topic: string) => {
  const t = topic.toLowerCase();
  if (t.includes('array') || t.includes('string')) return <Database className="w-5 h-5" />;
  if (t.includes('tree') || t.includes('graph')) return <Network className="w-5 h-5" />;
  if (t.includes('dp') || t.includes('dynamic')) return <Workflow className="w-5 h-5" />;
  if (t.includes('math') || t.includes('bit')) return <Binary className="w-5 h-5" />;
  if (t.includes('hash')) return <Hash className="w-5 h-5" />;
  if (t.includes('list')) return <ListTree className="w-5 h-5" />;
  return <Code2 className="w-5 h-5" />;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

export function ProblemCard({ problem, index }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
    >
      <Link 
        href={`/problems/${problem.id}`}
        className="block group"
      >
        <Card className="p-6 h-full glass-card hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-secondary rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
              {getTopicIcon(problem.topic)}
            </div>
            <Badge variant="outline" className={`${getDifficultyColor(problem.difficulty)} font-semibold`}>
              {problem.difficulty}
            </Badge>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {problem.id}. {problem.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {problem.description}
          </p>
          
          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/50">
            <Badge variant="secondary" className="bg-secondary/50 text-xs font-normal">
              {problem.topic}
            </Badge>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
