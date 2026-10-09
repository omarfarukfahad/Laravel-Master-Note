import React, { useState } from 'react';
import { Copy, Check, Terminal, Bookmark, BookmarkCheck } from 'lucide-react';
import { LaravelCommand, Language } from '../types';

interface CommandCardProps {
  command: LaravelCommand;
  language?: Language;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onCopy: (text: string, label: string) => void;
  onRunInTerminal: (cmd: string) => void;
}

export const CommandCard: React.FC<CommandCardProps> = ({
  command,
  language = 'en',
  isBookmarked,
  onToggleBookmark,
  onCopy,
  onRunInTerminal,
}) => {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    onCopy(command.command, command.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColor: Record<string, string> = {
    setup: 'text-sky-500 dark:text-sky-400',
    make: 'text-amber-500 dark:text-amber-400',
    database: 'text-emerald-500 dark:text-emerald-400',
    cache: 'text-purple-500 dark:text-purple-400',
    storage: 'text-orange-500 dark:text-orange-400',
    auth: 'text-rose-500 dark:text-rose-400',
    route: 'text-cyan-500 dark:text-cyan-400',
    hosting: 'text-indigo-500 dark:text-indigo-400',
  };

  const isBn = language === 'bn';

  return (
    <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:shadow-md flex flex-col justify-between min-h-[250px]">
      <div>
        {/* Header: Title and Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase mb-1">
              <span className={`font-semibold ${categoryColor[command.category] || 'text-zinc-500'}`}>
                {command.category}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                {isBn ? command.title : 'Artisan'}
              </span>
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
              {isBn ? command.banglaTitle : command.title}
            </h3>
          </div>

          <button
            onClick={() => onToggleBookmark(command.id)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-red-500 fill-red-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300/90 leading-relaxed mb-4">
          {isBn 
            ? command.banglaExplanation 
            : (command.englishExplanation || command.banglaExplanation)}
        </p>

        {/* Code / Command Snippet Box */}
        <div className="relative rounded-xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 p-3 sm:p-3.5 mb-3 flex items-center justify-between gap-3 overflow-hidden group/code">
          <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto py-0.5">
            <span className="text-red-500 font-mono text-sm select-none font-bold">$</span>
            <code className="text-xs sm:text-sm font-mono text-zinc-100 font-medium whitespace-nowrap">
              {command.command}
            </code>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onRunInTerminal(command.command)}
              title={isBn ? "টার্মিনালে টেস্ট করুন" : "Run in terminal"}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-red-400" />
              <span>Run</span>
            </button>
            
            <button
              onClick={handleCopy}
              title={isBn ? "কমান্ড কপি করুন" : "Copy command"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isBn ? 'কপি' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Flags Breakdown if any */}
        {command.flags && command.flags.length > 0 && (
          <div className="mb-3 space-y-1.5 pt-1">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              {isBn ? 'অপশন ও ফ্ল্যাগস:' : 'Flags & Options:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {command.flags.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-1.5 text-xs bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-md p-1.5"
                >
                  <code className="text-red-600 dark:text-red-400 font-mono font-medium shrink-0">
                    {f.flag}
                  </code>
                  <span className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-tight">
                    {isBn ? f.description : (f.englishDescription || f.description)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Tags and Output Preview Toggle */}
      <div>
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
          <div className="flex items-center gap-1 flex-wrap">
            {command.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {command.exampleOutput && (
            <button
              onClick={() => setShowOutput(!showOutput)}
              className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors shrink-0 cursor-pointer"
            >
              <span>{isBn ? (showOutput ? 'আউটপুট লুকান' : 'আউটপুট দেখুন') : (showOutput ? 'Hide Output' : 'View Output')}</span>
            </button>
          )}
        </div>

        {/* Collapsible Terminal Output simulation */}
        {showOutput && command.exampleOutput && (
          <div className="mt-3 p-3 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-800 text-[10px] text-zinc-500">
              <span>{isBn ? 'টার্মিনাল আউটপুট নমুনা:' : 'Simulated Terminal Output:'}</span>
              <button
                onClick={() => onCopy(command.exampleOutput!, 'Command Output')}
                className="hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </div>
            {command.exampleOutput}
          </div>
        )}
      </div>
    </div>
  );
};
