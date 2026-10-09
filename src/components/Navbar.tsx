import React, { useRef, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Moon, 
  Sun, 
  Bookmark, 
  FolderTree, 
  Server, 
  Sparkles, 
  BookOpen, 
  Command as CommandIcon,
  Laptop,
  Languages,
  X
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  activeTab: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes';
  setActiveTab: (tab: 'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes') => void;
  language: Language;
  onOpenSettings: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  showOnlyBookmarks: boolean;
  onToggleBookmarksOnly: () => void;
  bookmarkCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isNavSearchOpen: boolean;
  setIsNavSearchOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language = 'en',
  onOpenSettings,
  isDark,
  onToggleTheme,
  onOpenSearch,
  showOnlyBookmarks,
  onToggleBookmarksOnly,
  bookmarkCount,
  searchQuery,
  setSearchQuery,
  isNavSearchOpen,
  setIsNavSearchOpen,
}) => {
  const isBn = language === 'bn';
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNavSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isNavSearchOpen]);

  const navItems = [
    { id: 'commands', label: isBn ? 'কমান্ডস' : 'Commands', icon: Terminal },
    { id: 'structure', label: isBn ? 'ফাইল ও কোড' : 'Files & Code', icon: FolderTree },
    { id: 'setup', label: isBn ? 'পিসি সেটআপ' : 'PC Setup', icon: Laptop },
    { id: 'generator', label: isBn ? 'জেনারেটর' : 'Maker', icon: Sparkles },
    { id: 'hosting', label: isBn ? 'হোস্টিং' : 'Hosting', icon: Server },
    { id: 'terminal', label: isBn ? 'টার্মিনাল' : 'Terminal', icon: CommandIcon },
    { id: 'notes', label: isBn ? 'নোটবুক' : 'Notes', icon: BookOpen },
  ] as const;

  const handleCloseSearch = () => {
    setIsNavSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* If Top Nav Search is Open: Show Full Search Bar with Clear & Cancel Button */}
        {isNavSearchOpen ? (
          <div className="w-full flex items-center gap-2.5 animate-in fade-in duration-150">
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-red-500 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    handleCloseSearch();
                  }
                }}
                placeholder={
                  isBn
                    ? "কমান্ড, ফাইল বা কনসেপ্ট সার্চ করুন (যেমন: model, migrate, cache, relations)..."
                    : "Search commands, files, relations or PC setup (e.g. model, migrate, cache)..."
                }
                className="w-full pl-10 pr-10 py-2 rounded-xl border border-red-500/30 bg-zinc-100/90 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  title={isBn ? "মুছে ফেলুন" : "Clear input"}
                  className="absolute right-3 p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Explicit Close / Cancel Button */}
            <button
              type="button"
              onClick={handleCloseSearch}
              title={isBn ? "সার্চ বন্ধ করুন" : "Close and cancel search"}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4" />
              <span>{isBn ? 'বাতিল' : 'Cancel'}</span>
              <kbd className="hidden sm:inline text-[10px] font-mono opacity-60">ESC</kbd>
            </button>
          </div>
        ) : (
          <>
            {/* Brand & Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 shrink-0">
                <svg
                  className="w-6 h-6 fill-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.0001 2.5L2.83008 7.78002V18.22L12.0001 23.5L21.1701 18.22V7.78002L12.0001 2.5ZM12.0001 4.79L19.2401 8.97L16.2901 10.67L9.05008 6.49L12.0001 4.79ZM4.76008 8.97L7.71008 10.67L7.71008 17.07L4.76008 15.37V8.97ZM12.0001 15.37L9.05008 13.67L16.2901 9.49L19.2401 11.19L12.0001 15.37ZM12.0001 21.21L9.05008 19.51V13.11L12.0001 14.81L12.0001 21.21ZM19.2401 15.37L16.2901 17.07V13.11L19.2401 11.41V15.37Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white">
                    Laravel <span className="text-red-500">Master</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400">
                    v11
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium hidden sm:block">
                  {isBn ? 'লারাভেল চিট শিট, ফাইল স্ট্রাকচার ও হোস্টিং' : 'Commands, Architecture & PC Setup'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-zinc-800 text-red-600 dark:text-red-400 shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action Controls: Search, Bookmarks, Language/Settings, Theme */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Quick Search Activation Button */}
              <button
                onClick={() => setIsNavSearchOpen(true)}
                title={isBn ? "সার্চ চালু করুন" : "Open Search Bar"}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200 text-xs transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-red-500" />
                <span className="hidden md:inline">{isBn ? 'সার্চ...' : 'Search...'}</span>
                <kbd className="hidden md:inline text-[10px] font-mono px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded">
                  /
                </kbd>
              </button>

              {/* Bookmarks Filter */}
              <button
                onClick={onToggleBookmarksOnly}
                title={isBn ? 'বুকমার্ক করা আইটেমসমূহ' : 'Saved Bookmarks'}
                className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
                  showOnlyBookmarks
                    ? 'bg-red-500/10 border-red-500/40 text-red-500'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${showOnlyBookmarks ? 'fill-red-500' : ''}`} />
                {bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </button>

              {/* Language & Settings Button */}
              <button
                onClick={onOpenSettings}
                title={isBn ? 'সেটিংস ও ভাষা পরিবর্তন' : 'Settings & Language'}
                className="px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
              >
                <Languages className="w-4 h-4 text-red-500" />
                <span className="font-mono font-bold uppercase">
                  {language}
                </span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
