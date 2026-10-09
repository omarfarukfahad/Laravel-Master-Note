import React from 'react';
import { 
  Terminal, 
  FolderTree, 
  Sparkles, 
  Server, 
  BookOpen, 
  Command, 
  ChevronLeft, 
  ChevronRight,
  Bookmark,
  Sun,
  Moon,
  Search,
  Laptop,
  Settings
} from 'lucide-react';
import { Language } from '../types';

interface DesktopSliderNavProps {
  activeTab: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes';
  setActiveTab: (tab: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes') => void;
  language: Language;
  onOpenSettings: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  bookmarkCount: number;
  totalCommands: number;
}

export const DesktopSliderNav: React.FC<DesktopSliderNavProps> = ({
  activeTab,
  setActiveTab,
  language = 'en',
  onOpenSettings,
  isCollapsed,
  onToggleCollapse,
  isDark,
  onToggleTheme,
  onOpenSearch,
  bookmarkCount,
  totalCommands,
}) => {
  const isBn = language === 'bn';

  interface NavItem {
    id: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes';
    label: string;
    subLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }

  const navItems: NavItem[] = [
    { 
      id: 'commands', 
      label: isBn ? 'কমান্ডস' : 'Commands', 
      subLabel: isBn ? 'আর্টিসান চিট শিট' : 'Artisan Cheat Sheet', 
      icon: Terminal, 
      count: totalCommands 
    },
    { 
      id: 'structure', 
      label: isBn ? 'ফাইল ও রিলেশন' : 'Files & Relations', 
      subLabel: 'web.php, Models & Migrations', 
      icon: FolderTree 
    },
    { 
      id: 'setup', 
      label: isBn ? 'পিসি সেটআপ' : 'PC Setup Guide', 
      subLabel: isBn ? 'সফটওয়্যার ও ইনস্টল' : 'Apps & Download Links', 
      icon: Laptop 
    },
    { 
      id: 'generator', 
      label: isBn ? 'মেকার জেনারেটর' : 'Artisan Maker', 
      subLabel: isBn ? 'কমান্ড বয়লারপ্লেট' : 'Interactive Generator', 
      icon: Sparkles 
    },
    { 
      id: 'hosting', 
      label: isBn ? 'হোস্টিং গাইড' : 'Hosting & Deploy', 
      subLabel: 'cPanel & VPS Ubuntu', 
      icon: Server 
    },
    { 
      id: 'terminal', 
      label: isBn ? 'টার্মিনাল' : 'Terminal Shell', 
      subLabel: isBn ? 'ইন্টারেক্টিভ সিমুলেটর' : 'Interactive Runner', 
      icon: Command 
    },
    { 
      id: 'notes', 
      label: isBn ? 'আমার নোটবুক' : 'Personal Notes', 
      subLabel: isBn ? 'অফলাইন নোট' : 'Saved Notebook', 
      icon: BookOpen 
    },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 transition-all duration-300 shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 select-none ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Sidebar Header / Slider Toggle */}
      <div className="flex items-center justify-between p-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              {isBn ? 'ন্যাভিগেশন স্লাইডার' : 'Navigation Menu'}
            </span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          title={isCollapsed ? (isBn ? 'স্লাইডার প্রসারিত করুন' : 'Expand Sidebar') : (isBn ? 'স্লাইডার সংকুচিত করুন' : 'Collapse Sidebar')}
          className={`p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer ${
            isCollapsed ? 'mx-auto' : ''
          }`}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Search in Slider (if expanded) */}
      {!isCollapsed && (
        <div className="p-3">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200 text-xs transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-red-500" />
              <span>{isBn ? 'সার্চ করুন...' : 'Search docs...'}</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded">
              ⌘K
            </kbd>
          </button>
        </div>
      )}

      {/* Nav Items */}
      <div className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all group cursor-pointer ${
                isActive
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate leading-tight">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate font-mono">
                    {item.subLabel}
                  </div>
                </div>
              )}

              {!isCollapsed && item.count !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Slider Footer */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800/60 space-y-2">
        {!isCollapsed && (
          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Bookmark className="w-3.5 h-3.5 text-red-500" />
              <span>{isBn ? 'বুকমার্ক:' : 'Saved:'}</span>
            </div>
            <span className="font-mono font-bold text-red-500">{bookmarkCount}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            title={isDark ? (isBn ? 'লাইট মোড' : 'Light Mode') : (isBn ? 'ডার্ক মোড' : 'Dark Mode')}
            className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                {!isCollapsed && <span>{isBn ? 'লাইট' : 'Light'}</span>}
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-zinc-700" />
                {!isCollapsed && <span>{isBn ? 'ডার্ক' : 'Dark'}</span>}
              </>
            )}
          </button>

          <button
            onClick={onOpenSettings}
            title={isBn ? 'সেটিংস' : 'Settings'}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
