import React, { useState } from 'react';
import { Server, Globe, ShieldCheck, Copy, Check, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CPANEL_STEPS, VPS_STEPS, PRODUCTION_CHECKLIST } from '../data/hostingGuides';
import { Language } from '../types';

interface HostingSectionProps {
  language?: Language;
  onCopy: (text: string, label: string) => void;
  onRunInTerminal: (cmd: string) => void;
}

export const HostingSection: React.FC<HostingSectionProps> = ({ 
  language = 'en',
  onCopy, 
  onRunInTerminal 
}) => {
  const [activeTab, setActiveTab] = useState<'cpanel' | 'vps' | 'checklist'>('cpanel');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isBn = language === 'bn';

  const handleCopy = (text: string, id: string, label: string) => {
    onCopy(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
        <button
          onClick={() => setActiveTab('cpanel')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'cpanel'
              ? 'bg-white dark:bg-zinc-800 text-red-600 dark:text-red-400 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>{isBn ? 'cPanel শেয়ার্ড হোস্টিং গাইড' : 'cPanel Shared Hosting Guide'}</span>
        </button>

        <button
          onClick={() => setActiveTab('vps')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'vps'
              ? 'bg-white dark:bg-zinc-800 text-red-600 dark:text-red-400 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{isBn ? 'VPS (Ubuntu + Nginx + SSL) গাইড' : 'VPS Deployment (Ubuntu + Nginx + SSL)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'checklist'
              ? 'bg-white dark:bg-zinc-800 text-red-600 dark:text-red-400 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isBn ? 'প্রডাকশন সিকিউরিটি চেকলিস্ট' : 'Production Security Checklist'}</span>
        </button>
      </div>

      {/* cPanel Content */}
      {activeTab === 'cpanel' && (
        <div className="space-y-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 mb-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{isBn ? 'cPanel ডিপ্লয়মেন্টের সবচেয়ে গুরুত্বপূর্ণ নিয়ম:' : 'Essential cPanel Security Architecture:'}</span>
            </div>
            {isBn 
              ? 'লারাভেলের সমস্ত ফাইল কখনোই সরাসরি public_html ফোল্ডারে পেস্ট করবেন না। রুট ফোল্ডারে একটি আলাদা ফোল্ডার (যেমন: laravel_core) বানিয়ে সেখানে কোর কোড রাখবেন, এবং কেবল প্রজেক্টের ভেতরের public ফোল্ডারের ফাইলগুলো public_html এ আনবেন।'
              : 'Never paste your entire Laravel project root directly into public_html. Create a separate folder outside public_html (e.g., laravel_core) to safeguard .env and core code, and only move files from public/ into public_html.'}
          </div>

          <div className="space-y-4">
            {CPANEL_STEPS.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-xs"
              >
                <div className="flex items-start gap-3.5 mb-2">
                  <div className="w-7 h-7 rounded-xl bg-red-500/10 text-red-500 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {isBn ? step.banglaTitle : step.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      {isBn ? step.title : `Step ${step.stepNumber} - Configuration`}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 pl-10">
                  {isBn ? step.description : (step.englishDescription || step.description)}
                </p>

                {(step.importantNote || step.englishNote) && (
                  <div className="ml-10 mb-3 text-xs text-rose-600 dark:text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                    ⚠️ {isBn ? step.importantNote : (step.englishNote || step.importantNote)}
                  </div>
                )}

                {/* Commands */}
                {step.commands && step.commands.length > 0 && (
                  <div className="ml-10 space-y-2 mb-3">
                    {step.commands.map((cmd, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 bg-zinc-950 rounded-xl font-mono text-xs text-zinc-200 border border-zinc-800"
                      >
                        <div className="flex items-center gap-2 overflow-x-auto">
                          <span className="text-red-500">$</span>
                          <span>{cmd}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onRunInTerminal(cmd)}
                            title={isBn ? "টার্মিনালে টেস্ট করুন" : "Run in terminal"}
                            className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            <Terminal className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopy(cmd, `${step.id}-${idx}`, 'Command')}
                            className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            {copiedId === `${step.id}-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Snippet */}
                {step.codeSnippet && (
                  <div className="ml-10 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden text-xs">
                    <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                      <span className="font-mono text-[11px]">{step.codeSnippet.title}</span>
                      <button
                        onClick={() => handleCopy(step.codeSnippet!.code, step.id, 'Code Snippet')}
                        className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 cursor-pointer"
                      >
                        {copiedId === step.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isBn ? 'কপি করুন' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 text-zinc-300 font-mono overflow-x-auto leading-relaxed">
                      <code>{step.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VPS Content */}
      {activeTab === 'vps' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400 mb-1">
              <Globe className="w-4 h-4 shrink-0" />
              <span>{isBn ? 'VPS ডিপ্লয়মেন্ট আর্কিটেকচার:' : 'Modern VPS Deployment Architecture:'}</span>
            </div>
            {isBn 
              ? 'উবুন্টু ২২.০৪+ সার্ভারে Nginx, PHP 8.3-FPM এবং MySQL সেটআপের আদর্শ কমান্ডগুলো নিচে ধাপে ধাপে সাজানো হয়েছে। প্রতিটি কমান্ড টার্মিনাল বাটনে ক্লিক করে ডানদিকের টার্মিনালে টেস্ট করতে পারেন।'
              : 'Production setup flow for Ubuntu 22.04 / 24.04 with Nginx, PHP 8.3-FPM, Certbot HTTPS, and task scheduling. Click Run on any command to preview it in the terminal simulator.'}
          </div>

          <div className="space-y-4">
            {VPS_STEPS.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-xs"
              >
                <div className="flex items-start gap-3.5 mb-2">
                  <div className="w-7 h-7 rounded-xl bg-red-500/10 text-red-500 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {isBn ? step.banglaTitle : step.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      {isBn ? step.title : `Step ${step.stepNumber} - Ubuntu Server`}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 pl-10">
                  {isBn ? step.description : (step.englishDescription || step.description)}
                </p>

                {(step.importantNote || step.englishNote) && (
                  <div className="ml-10 mb-3 text-xs text-rose-600 dark:text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                    ⚠️ {isBn ? step.importantNote : (step.englishNote || step.importantNote)}
                  </div>
                )}

                {/* Commands */}
                {step.commands && step.commands.length > 0 && (
                  <div className="ml-10 space-y-2 mb-3">
                    {step.commands.map((cmd, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 bg-zinc-950 rounded-xl font-mono text-xs text-zinc-200 border border-zinc-800"
                      >
                        <div className="flex items-center gap-2 overflow-x-auto">
                          <span className="text-red-500">$</span>
                          <span>{cmd}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onRunInTerminal(cmd)}
                            title={isBn ? "টার্মিনালে টেস্ট করুন" : "Run in terminal"}
                            className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            <Terminal className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopy(cmd, `${step.id}-${idx}`, 'Command')}
                            className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            {copiedId === `${step.id}-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Snippet */}
                {step.codeSnippet && (
                  <div className="ml-10 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden text-xs">
                    <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                      <span className="font-mono text-[11px]">{step.codeSnippet.title}</span>
                      <button
                        onClick={() => handleCopy(step.codeSnippet!.code, step.id, 'Nginx Config')}
                        className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 cursor-pointer"
                      >
                        {copiedId === step.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isBn ? 'কপি করুন' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 text-zinc-300 font-mono overflow-x-auto leading-relaxed">
                      <code>{step.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Production Checklist */}
      {activeTab === 'checklist' && (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {isBn ? 'সাইট লাইভ করার আগে অপরিহার্য চেকলিস্ট:' : 'Go-Live Production Checklist:'}
            </h3>
          </div>

          <div className="space-y-3">
            {PRODUCTION_CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
                    {isBn ? item.title : (item.englishTitle || item.title)}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {isBn ? item.desc : (item.englishDesc || item.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
