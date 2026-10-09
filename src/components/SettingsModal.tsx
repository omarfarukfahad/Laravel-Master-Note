import React from 'react';
import { X, Languages, Moon, Sun, Check, RotateCcw, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSetLanguage: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  onSetLanguage,
  isDark,
  onToggleTheme,
  onResetData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500">
              <Languages className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {language === 'bn' ? 'অ্যাপ্লিকেশন সেটিংস' : 'Application Settings'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5">
          {/* Language Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              {language === 'bn' ? 'ভাষা নির্বাচন করুন (Choose Language)' : 'Language Selection'}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onSetLanguage('bn')}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  language === 'bn'
                    ? 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold">বাংলা (Bangla)</div>
                  <div className="text-[11px] text-zinc-500">বাংলা বিবরণ ও গাইড</div>
                </div>
                {language === 'bn' && <Check className="w-4 h-4 text-red-500" />}
              </button>

              <button
                type="button"
                onClick={() => onSetLanguage('en')}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  language === 'en'
                    ? 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold">English</div>
                  <div className="text-[11px] text-zinc-500">Standard English UI</div>
                </div>
                {language === 'en' && <Check className="w-4 h-4 text-red-500" />}
              </button>
            </div>
          </div>

          {/* Theme Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              {language === 'bn' ? 'থিম মোড (Appearance)' : 'Theme Appearance'}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => isDark && onToggleTheme()}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                  !isDark
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-700 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold">Light Mode</span>
              </button>

              <button
                type="button"
                onClick={() => !isDark && onToggleTheme()}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                  isDark
                    ? 'border-red-500/50 bg-red-500/10 text-red-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Moon className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-semibold">Dark Mode</span>
              </button>
            </div>
          </div>

          {/* Privacy & Local Data */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              {language === 'bn' ? 'ডাটা ও ক্যাশ ব্যবস্থাপনা' : 'Data & Cache'}
            </label>
            <button
              type="button"
              onClick={onResetData}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 hover:bg-rose-500/5 text-zinc-700 dark:text-zinc-300 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-rose-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {language === 'bn' ? 'বুকমার্ক ও সেটিংস রিসেট করুন' : 'Reset Bookmarks & Settings'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {language === 'bn' ? 'ডিফল্ট অবস্থায় ফিরিয়ে আনুন' : 'Revert to factory defaults'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Reset</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Local Offline Storage</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-semibold transition-colors"
          >
            {language === 'bn' ? 'সংরক্ষণ ও বন্ধ' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
