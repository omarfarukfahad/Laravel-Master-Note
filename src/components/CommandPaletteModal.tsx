import React, { useState, useEffect } from 'react';
import { Search, X, Terminal, FileCode, ArrowRight, Laptop } from 'lucide-react';
import { LARAVEL_COMMANDS } from '../data/laravelCommands';
import { CODE_TEMPLATES } from '../data/codeTemplates';
import { Language } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  onSelectCommand: (cmd: string) => void;
  onSelectTemplate: (templateId: string) => void;
  onSelectTab: (tab: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes') => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
  onSelectCommand,
  onSelectTemplate,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isBn = language === 'bn';

  const filteredCommands = LARAVEL_COMMANDS.filter((cmd) =>
    cmd.command.toLowerCase().includes(query.toLowerCase()) ||
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.banglaTitle.includes(query) ||
    cmd.banglaExplanation.includes(query) ||
    (cmd.englishExplanation && cmd.englishExplanation.toLowerCase().includes(query.toLowerCase())) ||
    cmd.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6);

  const filteredTemplates = CODE_TEMPLATES.filter((tpl) =>
    tpl.filename.toLowerCase().includes(query.toLowerCase()) ||
    tpl.title.toLowerCase().includes(query.toLowerCase()) ||
    tpl.banglaTitle.includes(query)
  ).slice(0, 4);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar with Cross and Cancel Buttons */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isBn
                ? "কমান্ড, ফাইল বা কনসেপ্ট সার্চ করুন (যেমন: model, migrate, cache)..."
                : "Search commands, files, or concepts (e.g. model, migrate, cache)..."
            }
            className="flex-1 bg-transparent border-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden text-sm"
          />

          {/* Clear query button if query exists */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              title={isBn ? "মুছে ফেলুন" : "Clear query"}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Dedicated Cancel / Close Button */}
          <button
            type="button"
            onClick={handleClose}
            title={isBn ? "সার্চ বন্ধ করুন" : "Close search modal"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <X className="w-3.5 h-3.5" />
            <span>{isBn ? 'বাতিল' : 'Cancel'}</span>
            <kbd className="hidden sm:inline text-[10px] font-mono opacity-60">ESC</kbd>
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {filteredCommands.length > 0 && (
            <div className="p-2 space-y-1">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-2 py-1">
                {isBn ? `Artisan কমান্ডসমূহ (${filteredCommands.length})` : `Artisan Commands (${filteredCommands.length})`}
              </div>
              {filteredCommands.map((cmd) => (
                <div
                  key={cmd.id}
                  onClick={() => {
                    onSelectCommand(cmd.command);
                    onSelectTab('commands');
                    handleClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {cmd.command}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">
                        {isBn ? cmd.banglaTitle : cmd.title}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}

          {filteredTemplates.length > 0 && (
            <div className="p-2 space-y-1">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-2 py-1">
                {isBn ? `ফাইল কোড টেমপ্লেট (${filteredTemplates.length})` : `Code Templates (${filteredTemplates.length})`}
              </div>
              {filteredTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                    onSelectTemplate(tpl.id);
                    onSelectTab('structure');
                    handleClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-500">
                      <FileCode className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {tpl.filename}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">
                        {isBn ? tpl.banglaTitle : tpl.title}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}

          {/* Quick jump to PC setup */}
          <div className="p-2">
            <div
              onClick={() => {
                onSelectTab('setup');
                handleClose();
              }}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 cursor-pointer group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {isBn ? 'কম্পিউটার লোকাল সেটআপ ও সফটওয়্যার ডাউনলোড' : 'PC Environment Setup & Software Downloads'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    PHP 8.3, Composer, Node.js, Herd, VS Code, Git
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {filteredCommands.length === 0 && filteredTemplates.length === 0 && (
            <div className="p-8 text-center text-zinc-400 text-xs sm:text-sm">
              {isBn 
                ? `"${query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি।` 
                : `No results found for "${query}". Try searching for 'model', 'cache', or 'setup'.`}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span>{isBn ? 'ন্যাভিগেট করতে' : 'Navigate:'} <kbd className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded">↑</kbd> <kbd className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded">↓</kbd></span>
            <span>{isBn ? 'সিলেক্ট করতে' : 'Select:'} <kbd className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded">↵</kbd></span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-red-500 hover:underline font-semibold cursor-pointer"
          >
            {isBn ? 'সার্চ উইন্ডো বন্ধ করুন (ESC)' : 'Close window (ESC)'}
          </button>
        </div>
      </div>
    </div>
  );
};
