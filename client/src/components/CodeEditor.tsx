import { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  language?: string;
}

export function CodeEditor({ initialValue, onChange, language = "javascript" }: CodeEditorProps) {
  const [value, setValue] = useState(initialValue);
  const monaco = useMonaco();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('leetDark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { background: '0f172a' },
          { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'c678dd' },
          { token: 'string', foreground: 'a3be8c' },
          { token: 'number', foreground: 'd19a66' },
          { token: 'function', foreground: '61afef' },
        ],
        colors: {
          'editor.background': '#0f172a',
          'editor.lineHighlightBackground': '#1e293b',
          'editorCursor.foreground': '#8b5cf6',
          'editorIndentGuide.background': '#1e293b',
          'editor.selectionBackground': '#33415580',
        }
      });
      monaco.editor.setTheme('leetDark');
    }
  }, [monaco]);

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || "";
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full h-full relative group rounded-xl overflow-hidden border border-border/50 bg-[#0f172a]">
      <Editor
        height="100%"
        language={language}
        value={value}
        theme="leetDark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'var(--font-mono)',
          lineHeight: 24,
          padding: { top: 24, bottom: 24 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
          renderLineHighlight: "all",
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          }
        }}
        loading={
          <div className="flex items-center justify-center h-full w-full bg-background text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      />
    </div>
  );
}
