import React from 'react';
import { Terminal, FolderTree, Laptop, Server, BookOpen, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface MobileBottomNavProps {
  activeTab: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes';
  setActiveTab: (tab: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes') => void;
  language: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  language,
}) => {
  const items = [
    { id: 'commands', label: language === 'bn' ? 'কমান্ড' : 'Cmds', icon: Terminal },
    { id: 'structure', label: language === 'bn' ? 'ফাইল' : 'Files', icon: FolderTree },
    { id: 'setup', label: language === 'bn' ? 'সেটআপ' : 'Setup', icon: Laptop },
    { id: 'generator', label: language === 'bn' ? 'মেকার' : 'Maker', icon: Sparkles },
    { id: 'hosting', label: language === 'bn' ? 'হোস্টিং' : 'Host', icon: Server },
    { id: 'notes', label: language === 'bn' ? 'নোট' : 'Notes', icon: BookOpen },
  ] as const;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 pb-safe shadow-lg">
      <div className="grid grid-cols-6 h-14">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative py-1 ${
                isActive
                  ? 'text-red-600 dark:text-red-400 font-bold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 rounded-full bg-red-500" />
              )}
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
