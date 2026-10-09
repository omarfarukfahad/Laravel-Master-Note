import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Trash2, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';
import { LARAVEL_COMMANDS } from '../data/laravelCommands';
import { Language } from '../types';

interface TerminalSimulatorProps {
  initialCommand?: string;
  language?: Language;
  onCopyText: (text: string, label: string) => void;
}

interface CommandHistoryEntry {
  command: string;
  output: string;
  timestamp: string;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  initialCommand = '',
  language = 'en',
  onCopyText,
}) => {
  const isBn = language === 'bn';

  const [inputCommand, setInputCommand] = useState(initialCommand);
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: 'php artisan about',
      output: `  Environment .................................................. local
  Laravel Version .............................................. 11.2.0
  PHP Version .................................................. 8.3.6
  Composer Version ............................................. 2.7.2
  Database ..................................................... mysql (127.0.0.1:3306)
  Cache Driver ................................................. database
  Session Driver ............................................... database
  Queue Driver ................................................. sync`,
      timestamp: '10:00:00',
    },
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCommand) {
      executeCommand(initialCommand);
    }
  }, [initialCommand]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInputCommand('');
      return;
    }

    if (trimmed.toLowerCase() === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          output: isBn 
            ? `লারাভেল টার্মিনাল সিমুলেটর হেল্প:
• যে কোনো artisan বা composer কমান্ড টাইপ করুন বা নিচের বাটনে ক্লিক করুন।
• 'clear' লিখলে টার্মিনাল পরিষ্কার হবে।
• উদাহরণ: php artisan route:list, php artisan make:model Post -mcr, php artisan optimize:clear`
            : `Laravel Interactive Terminal Sandbox Help:
• Type any artisan or composer command, or click the quick action buttons below.
• Type 'clear' to reset terminal history.
• Examples: php artisan route:list, php artisan make:model Post -mcr, php artisan optimize:clear`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setInputCommand('');
      return;
    }

    // Match with our known commands or generate realistic mock
    const matched = LARAVEL_COMMANDS.find(
      (c) => c.command.toLowerCase() === trimmed.toLowerCase() ||
             trimmed.toLowerCase().includes(c.id) ||
             (trimmed.startsWith('php artisan make:model') && c.id.startsWith('make-model'))
    );

    let output = '';
    if (matched && matched.exampleOutput) {
      output = matched.exampleOutput;
    } else if (trimmed.startsWith('php artisan make:')) {
      const parts = trimmed.split(' ');
      const target = parts[3] || 'GeneratedItem';
      output = `   INFO  Class [app/Http/.../${target}.php] created successfully.`;
    } else if (trimmed.startsWith('php artisan migrate')) {
      output = `   INFO  Running migrations.\n  2026_10_08_000001_create_posts_table ....................... 16ms DONE`;
    } else if (trimmed.startsWith('php artisan route:list')) {
      output = `  GET|HEAD   / ..................................................... home
  POST       /login ................................................ login.store
  POST       /logout ............................................... logout
  GET|HEAD   /dashboard ............................................ dashboard
  GET|HEAD   /api/user ............................................. api.user`;
    } else if (trimmed.startsWith('composer dump-autoload')) {
      output = `Generating optimized autoload files\nGenerated optimized autoload files containing 4920 classes`;
    } else {
      output = `   INFO  Command "${trimmed}" executed successfully in 12ms.`;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInputCommand('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputCommand);
  };

  const handleCopyHistory = (text: string, idx: number) => {
    onCopyText(text, isBn ? 'টার্মিনাল আউটপুট' : 'Terminal output');
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const quickCommands = [
    'php artisan route:list',
    'php artisan make:model Post -mcr',
    'php artisan migrate',
    'php artisan optimize:clear',
    'php artisan storage:link',
    'php artisan key:generate',
    'php artisan tinker',
    'composer dump-autoload',
  ];

  return (
    <div className="space-y-4">
      {/* Quick Launch Buttons */}
      <div className="p-4 rounded-2xl bg-zinc-900/60 dark:bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>{isBn ? 'কুইক কমান্ড রানার (ক্লিক করলেই রান হবে)' : 'Quick Command Sandbox (Click to run)'}</span>
          </div>
          <button
            onClick={() => setHistory([])}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isBn ? 'ক্লিয়ার টার্মিনাল' : 'Clear Console'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-3 h-3 text-red-400 fill-red-400" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="ml-2 text-xs text-zinc-400 font-sans font-medium flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-red-400" />
              artisan@laravel:~/my-project
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 font-sans">
            Interactive Artisan Console
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 min-h-[360px] max-h-[500px] overflow-y-auto space-y-4">
          <div className="text-zinc-400 text-xs">
            Laravel Framework <span className="text-red-400 font-bold">11.x</span> (PHP v8.3.6)
            <br />
            {isBn ? (
              <>টাইপ করুন <span className="text-amber-400 font-bold">help</span> অথবা নিচের যেকোনো কমান্ড টেস্ট করতে লিখে এন্টার দিন:</>
            ) : (
              <>Type <span className="text-amber-400 font-bold">help</span> or enter any artisan command below:</>
            )}
          </div>

          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1.5 border-b border-zinc-900/80 pb-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">developer@app:~$</span>
                  <span className="text-zinc-100 font-semibold">{entry.command}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-600">{entry.timestamp}</span>
                  <button
                    onClick={() => handleCopyHistory(entry.output, idx)}
                    className="text-zinc-500 hover:text-zinc-300 p-1"
                    title="Copy output"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-zinc-300 whitespace-pre-wrap pl-3 border-l-2 border-red-500/40 text-xs sm:text-[13px] leading-relaxed bg-zinc-900/40 p-2.5 rounded-r-lg">
                {entry.output}
              </div>
            </div>
          ))}

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Box */}
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 p-3 bg-zinc-900/90 border-t border-zinc-800"
        >
          <span className="text-red-400 font-bold pl-2 select-none">❯</span>
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            placeholder={isBn ? "php artisan make:model Product -mcr (বা টাইপ করুন...)" : "php artisan make:model Product -mcr (or type command...)"}
            className="flex-1 bg-transparent border-none text-zinc-100 placeholder-zinc-500 focus:outline-hidden text-xs sm:text-sm font-mono"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-medium transition-colors"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
