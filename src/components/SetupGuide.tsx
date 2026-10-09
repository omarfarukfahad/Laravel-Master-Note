import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  Terminal, 
  Check, 
  Copy, 
  Laptop, 
  Monitor, 
  Apple, 
  Cpu, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SETUP_SOFTWARE_LIST, STEP_BY_STEP_SETUP_STEPS, VSCODE_RECOMMENDED_EXTENSIONS } from '../data/setupGuide';
import { Language } from '../types';

interface SetupGuideProps {
  language: Language;
  onCopy: (text: string, label: string) => void;
  onRunInTerminal: (cmd: string) => void;
}

export const SetupGuide: React.FC<SetupGuideProps> = ({
  language,
  onCopy,
  onRunInTerminal,
}) => {
  const [selectedOS, setSelectedOS] = useState<'windows' | 'macos' | 'linux'>('windows');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'essential' | 'environment' | 'runtime' | 'editor'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string, label: string) => {
    onCopy(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSoftware = SETUP_SOFTWARE_LIST.filter((item) => {
    if (selectedCategory === 'essential') return item.isEssential;
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Overview Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-wider mb-1">
              <Laptop className="w-4 h-4" />
              <span>{language === 'bn' ? 'কম্পিউটার লোকাল সেটআপ' : 'Local Machine Environment Setup'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {language === 'bn' 
                ? 'কম্পিউটারে লারাভেল সেটআপ করার পূর্ণাঙ্গ গাইড ও সফটওয়্যার ডাউনলোড' 
                : 'Complete Laravel PC Setup & Software Download Center'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {language === 'bn'
                ? 'লারাভেল নিয়ে কাজ করার জন্য আপনার পিসিতে যা যা সফটওয়্যার লাগবে, তাদের অফিশিয়াল ডাউনলোড লিংক এবং ধাপে ধাপে নির্দেশিকা নিচে দেওয়া হলো।'
                : 'All essential runtimes, package managers, local server stacks, and IDE extensions required to run Laravel locally on your machine.'}
            </p>
          </div>

          {/* OS Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shrink-0">
            <button
              onClick={() => setSelectedOS('windows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedOS === 'windows'
                  ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Windows</span>
            </button>

            <button
              onClick={() => setSelectedOS('macos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedOS === 'macos'
                  ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>macOS</span>
            </button>

            <button
              onClick={() => setSelectedOS('linux')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedOS === 'linux'
                  ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Linux</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended 1-Click Recommendation Banner */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 via-zinc-900/40 to-transparent p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500 text-white text-[11px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>{language === 'bn' ? 'সেরা ও দ্রুততম পছন্দ (2026 Recommended)' : 'Official Recommended Tool'}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Laravel Herd — {language === 'bn' ? '১-ক্লিকে নো-কনফিগ সেটআপ' : 'Zero-Dependency Native Setup'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-xl">
              {language === 'bn'
                ? 'PHP, Composer, এবং Node.js আলাদা করে ইনস্টল করার কোনো দরকার নেই। শুধু Laravel Herd ডাউনলোড করে ইনস্টল করুন, সব কিছু স্বয়ংক্রিয়ভাবে রেডি হয়ে যাবে!'
                : 'No need to manually install PHP or Composer. Download Herd for macOS or Windows to get a complete native environment instantly.'}
            </p>
          </div>

          <a
            href="https://herd.laravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-500/20 transition-all shrink-0 w-fit"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'bn' ? 'Laravel Herd ডাউনলোড করুন' : 'Download Herd Free'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* Software Catalog Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', labelBn: 'সকল সফটওয়্যার', labelEn: 'All Software' },
              { id: 'essential', labelBn: 'অপরিহার্য (Must-Have)', labelEn: 'Essential Only' },
              { id: 'environment', labelBn: 'লোকাল সার্ভার স্ট্যাক', labelEn: 'Servers & Stacks' },
              { id: 'runtime', labelBn: 'রানটাইম (PHP / Node)', labelEn: 'Runtimes' },
              { id: 'editor', labelBn: 'কোড এডিটর', labelEn: 'Code Editors' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          <span className="text-xs text-zinc-500 font-mono">
            {filteredSoftware.length} {language === 'bn' ? 'টি আইটেম' : 'tools'}
          </span>
        </div>

        {/* Software Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSoftware.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 flex flex-col justify-between shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold uppercase text-red-500">
                        {item.category}
                      </span>
                      {item.isEssential && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {language === 'bn' ? 'আবশ্যক' : 'Required'}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {language === 'bn' ? (item.nameBn || item.name) : (item.nameEn || item.name)}
                    </h4>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md shrink-0">
                    {language === 'bn' ? (item.requiredVersionBn || item.requiredVersion) : (item.requiredVersionEn || item.requiredVersion)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  {language === 'bn' ? item.descriptionBn : item.descriptionEn}
                </p>

                {/* Key Highlights */}
                {item.prosBn && (
                  <div className="space-y-1 mb-4">
                    {(language === 'bn' ? item.prosBn : item.prosEn || []).map((pro, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick install command for selected OS if available */}
                {item.quickInstallCmd && item.quickInstallCmd[selectedOS] && (
                  <div className="mb-4 rounded-xl bg-zinc-950 p-2.5 border border-zinc-800 flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-zinc-300 truncate">
                      {item.quickInstallCmd[selectedOS]}
                    </span>
                    <button
                      onClick={() => handleCopyText(item.quickInstallCmd![selectedOS]!, item.id, language === 'bn' ? 'কমান্ড' : 'Install command')}
                      className="p-1 text-zinc-400 hover:text-zinc-200 shrink-0 cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                {item.verificationCmd ? (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                    <span className="text-red-500">$</span>
                    <span>{item.verificationCmd}</span>
                  </div>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-2">
                  {item.verificationCmd && (
                    <button
                      onClick={() => onRunInTerminal(item.verificationCmd!)}
                      title={language === 'bn' ? "টার্মিনালে টেস্ট করুন" : "Run in terminal"}
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'ডাউনলোড লিংক' : 'Download'}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Walkthrough */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'bn' ? 'ধাপে ধাপে সেটআপ করার নির্দেশিকা (Step-by-Step Flow)' : 'Step-by-Step Installation Walkthrough'}
          </h3>
        </div>

        <div className="space-y-4">
          {STEP_BY_STEP_SETUP_STEPS.map((s) => (
            <div
              key={s.step}
              className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {language === 'bn' ? s.titleBn : s.titleEn}
                </h4>
                {s.actionUrl && (
                  <a
                    href={s.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-semibold hover:underline shrink-0"
                  >
                    <span>{s.actionLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {language === 'bn' ? s.descBn : s.descEn}
              </p>

              {s.commands && s.commands.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {s.commands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200"
                    >
                      <div className="flex items-center gap-2 overflow-x-auto">
                        <span className="text-red-500">$</span>
                        <span>{cmd}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => onRunInTerminal(cmd)}
                          title="Run in terminal"
                          className="p-1 text-zinc-400 hover:text-zinc-200"
                        >
                          <Terminal className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleCopyText(cmd, `step-${s.step}-${idx}`, language === 'bn' ? 'কমান্ড' : 'Command')}
                          title="Copy"
                          className="p-1 text-zinc-400 hover:text-zinc-200"
                        >
                          {copiedId === `step-${s.step}-${idx}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended VS Code Extensions */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {language === 'bn' ? 'লারাভেলের জন্য জরুরি VS Code এক্সটেনশনসমূহ' : 'Recommended VS Code Extensions'}
            </h3>
          </div>
          <a
            href="https://marketplace.visualstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-red-500 flex items-center gap-1"
          >
            <span>VS Code Marketplace</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {VSCODE_RECOMMENDED_EXTENSIONS.map((ext) => (
            <div
              key={ext.name}
              className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col justify-between"
            >
              <div>
                <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 mb-0.5">
                  {ext.name}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mb-2">
                  by {ext.author}
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">
                  {ext.desc}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-mono">Free Extension</span>
                <button
                  onClick={() => handleCopyText(ext.name, ext.name, language === 'bn' ? 'এক্সটেনশন নাম' : 'Extension name')}
                  className="text-[11px] text-red-600 dark:text-red-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === ext.name ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>{language === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{language === 'bn' ? 'নাম কপি' : 'Copy Name'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
