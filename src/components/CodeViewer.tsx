import React, { useState } from 'react';
import { Copy, Check, FileCode, Lightbulb } from 'lucide-react';
import { CodeTemplate, Language } from '../types';

interface CodeViewerProps {
  template: CodeTemplate;
  language?: Language;
  onCopy: (code: string, label: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ 
  template, 
  language = 'en', 
  onCopy 
}) => {
  const [copied, setCopied] = useState(false);

  const isBn = language === 'bn';

  const handleCopy = () => {
    onCopy(template.code, template.filename);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = template.code.trim().split('\n');

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs overflow-hidden mb-6">
      {/* File Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 bg-zinc-50 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {template.filename}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {isBn ? template.banglaTitle : template.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded">
            {template.language}
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-zinc-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isBn ? 'কোড কপি হয়েছে' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isBn ? 'কোড কপি করুন' : 'Copy Code'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Description & Explanation */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
          {isBn ? template.banglaExplanation : (template.englishExplanation || template.banglaExplanation)}
        </p>

        {template.tips && template.tips.length > 0 && (
          <div className="space-y-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              <span>{isBn ? 'গুরুত্বপূর্ণ টিপস:' : 'Important Tips & Best Practices:'}</span>
            </div>
            <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1 list-disc list-inside">
              {(isBn ? template.tips : (template.englishTips || template.tips)).map((tip, idx) => (
                <li key={idx} className="leading-snug">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Code Body with Line Numbers */}
      <div className="bg-zinc-950 p-4 overflow-x-auto max-h-[520px]">
        <pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-zinc-200">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row hover:bg-zinc-900/60">
                <span className="table-cell select-none text-right pr-4 text-zinc-600 text-[11px] w-8">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
