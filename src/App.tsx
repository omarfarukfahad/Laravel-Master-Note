import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  FolderTree, 
  Sparkles, 
  Server, 
  Search, 
  X,
  Bookmark, 
  Layers, 
  ArrowRight,
  Database,
  Flame,
  Key,
  Shield,
  HardDrive
} from 'lucide-react';
import { LARAVEL_COMMANDS } from './data/laravelCommands';
import { CODE_TEMPLATES } from './data/codeTemplates';
import { CommandCard } from './components/CommandCard';
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ArtisanGenerator } from './components/ArtisanGenerator';
import { CustomNotesManager } from './components/CustomNotesManager';
import { HostingSection } from './components/HostingSection';
import { SetupGuide } from './components/SetupGuide';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DesktopSliderNav } from './components/DesktopSliderNav';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { SettingsModal } from './components/SettingsModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { CommandCategory, Language } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'commands' | 'structure' | 'setup' | 'hosting' | 'generator' | 'terminal' | 'notes'>('commands');
  const [selectedCategory, setSelectedCategory] = useState<CommandCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavSearchOpen, setIsNavSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [terminalInputCmd, setTerminalInputCmd] = useState('');
  const [isSliderCollapsed, setIsSliderCollapsed] = useState(false);

  // Language state (Default is English 'en', secondary is Bangla 'bn')
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('laravel_lang_pref');
      if (saved === 'bn' || saved === 'en') return saved;
    } catch (e) {
      console.error(e);
    }
    return 'en';
  });

  // Selected file structure template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('routes-web');

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('laravel_master_bookmarks');
      return saved ? JSON.parse(saved) : ['make-model-mcr', 'storage-link', 'optimize-clear'];
    } catch {
      return ['make-model-mcr', 'storage-link', 'optimize-clear'];
    }
  });
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Theme (Dark & Light mode)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('laravel_theme');
      if (savedTheme) return savedTheme === 'dark';
      return document.documentElement.classList.contains('dark') || true;
    }
    return true;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('laravel_lang_pref', language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('laravel_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('laravel_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem('laravel_master_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const addToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + Math.random(),
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 2800);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(
      language === 'bn' 
        ? `"${label}" ক্লিপবোর্ডে কপি হয়েছে!` 
        : `"${label}" copied to clipboard!`,
      'success'
    );
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const isExist = prev.includes(id);
      const next = isExist ? prev.filter((item) => item !== id) : [...prev, id];
      addToast(
        isExist 
          ? (language === 'bn' ? 'বুকমার্ক সরানো হয়েছে' : 'Removed from bookmarks') 
          : (language === 'bn' ? 'বুকমার্কে যোগ করা হয়েছে' : 'Added to bookmarks'),
        'info'
      );
      return next;
    });
  };

  const handleRunInTerminal = (cmd: string) => {
    setTerminalInputCmd(cmd);
    setActiveTab('terminal');
    addToast(
      language === 'bn' 
        ? `টার্মিনালে কমান্ডটি লোড হয়েছে: ${cmd}` 
        : `Loaded into terminal: ${cmd}`, 
      'info'
    );
  };

  const handleResetData = () => {
    if (confirm(language === 'bn' ? 'আপনি কি সমস্ত বুকমার্ক ও সেটিংস রিসেট করতে চান?' : 'Reset all bookmarks and custom settings?')) {
      setBookmarks(['make-model-mcr', 'storage-link', 'optimize-clear']);
      localStorage.removeItem('laravel_master_bookmarks');
      localStorage.removeItem('laravel_notes_en');
      localStorage.removeItem('laravel_notes_bn');
      localStorage.removeItem('laravel_master_custom_notes');
      setIsSettingsOpen(false);
      addToast(language === 'bn' ? 'ডাটা রিসেট সম্পন্ন হয়েছে!' : 'Settings reset to default!', 'success');
    }
  };

  // Filter commands
  const filteredCommands = LARAVEL_COMMANDS.filter((cmd) => {
    const matchesCat = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch =
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.banglaTitle.includes(searchQuery) ||
      cmd.banglaExplanation.includes(searchQuery) ||
      (cmd.englishExplanation && cmd.englishExplanation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cmd.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(cmd.id);

    return matchesCat && matchesSearch && matchesBookmark;
  });

  const selectedTemplate = CODE_TEMPLATES.find((t) => t.id === selectedTemplateId) || CODE_TEMPLATES[0];

  const categories: { id: CommandCategory; labelBn: string; labelEn: string; icon: any }[] = [
    { id: 'all', labelBn: 'সকল কমান্ড', labelEn: 'All Commands', icon: Layers },
    { id: 'setup', labelBn: 'সেটআপ ও রান', labelEn: 'Setup & Run', icon: Flame },
    { id: 'make', labelBn: 'মেকার / জেনারেটর', labelEn: 'Make Generators', icon: Sparkles },
    { id: 'database', labelBn: 'ডাটাবেজ ও মাইগ্রেশন', labelEn: 'DB & Migrations', icon: Database },
    { id: 'cache', labelBn: 'ক্যাশ ও অপ্টিমাইজ', labelEn: 'Cache & Optimize', icon: HardDrive },
    { id: 'storage', labelBn: 'স্টোরেজ লিংক', labelEn: 'Storage & Uploads', icon: FolderTree },
    { id: 'auth', labelBn: 'অথেন্টিকেশন (Breeze)', labelEn: 'Auth (Breeze)', icon: Key },
    { id: 'route', labelBn: 'রাউট ও টিংকার', labelEn: 'Routes & Tinker', icon: Terminal },
    { id: 'hosting', labelBn: 'ডিপ্লয় ও সিকিউরিটি', labelEn: 'Deploy & Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header with Integrated Search, Language, Theme */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenSearch={() => setIsSearchOpen(true)}
        showOnlyBookmarks={showOnlyBookmarks}
        onToggleBookmarksOnly={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
        bookmarkCount={bookmarks.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isNavSearchOpen={isNavSearchOpen}
        setIsNavSearchOpen={setIsNavSearchOpen}
      />

      <div className="flex-1 flex max-w-full">
        {/* Desktop Slider Nav Bar (Completely hidden on mobile via hidden lg:flex) */}
        <DesktopSliderNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isCollapsed={isSliderCollapsed}
          onToggleCollapse={() => setIsSliderCollapsed(!isSliderCollapsed)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenSearch={() => setIsSearchOpen(true)}
          bookmarkCount={bookmarks.length}
          totalCommands={LARAVEL_COMMANDS.length}
        />

        {/* Main Workspace Content */}
        <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-5 pb-24 lg:pb-8">
          {/* Hero Banner: Exact 250px Height with clean concise text */}
          <div className="h-[250px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-black text-white px-6 sm:px-8 py-5 mb-6 border border-zinc-800 shadow-xl flex items-center justify-between">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-2.5">
                <Flame className="w-3.5 h-3.5" />
                <span>
                  {language === 'bn' ? 'লারাভেল মাস্টার চিট শিট' : 'Laravel Master Reference'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-2 leading-snug">
                {language === 'bn'
                  ? 'লারাভেলের সব কমান্ড, স্ট্রাকচার ও হোস্টিং এবার হাতের মুঠোয়! 🚀'
                  : 'Laravel Commands, Architecture & Hosting Cheat Sheet 🚀'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                {language === 'bn'
                  ? 'এক ক্লিকে কমান্ড কপি, টার্মিনাল সিমুলেশন, মডেল রিলেশনশিপ এবং পিসি সেটআপ নোট।'
                  : '1-Click command copy, terminal sandbox, eloquent relations, and PC setup guide.'}
              </p>
            </div>

            {/* Quick Summary Badges */}
            <div className="hidden sm:grid grid-cols-3 gap-2.5 shrink-0 relative z-10">
              <div className="p-3 rounded-2xl bg-zinc-800/70 border border-zinc-700/60 text-center min-w-[80px]">
                <div className="text-lg font-mono font-bold text-red-400">
                  {LARAVEL_COMMANDS.length}+
                </div>
                <div className="text-[10px] text-zinc-400">
                  {language === 'bn' ? 'কমান্ডস' : 'Commands'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-800/70 border border-zinc-700/60 text-center min-w-[80px]">
                <div className="text-lg font-mono font-bold text-sky-400">
                  {CODE_TEMPLATES.length}
                </div>
                <div className="text-[10px] text-zinc-400">
                  {language === 'bn' ? 'ফাইল কোড' : 'Templates'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-800/70 border border-zinc-700/60 text-center min-w-[80px]">
                <div className="text-lg font-mono font-bold text-emerald-400">
                  2
                </div>
                <div className="text-[10px] text-zinc-400">
                  {language === 'bn' ? 'হোস্টিং' : 'Hosting'}
                </div>
              </div>
            </div>
          </div>

          {/* TAB 1: ARTISAN COMMANDS */}
          {activeTab === 'commands' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Search and Category Filter Bar */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  {/* Search Box with clear button */}
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={language === 'bn' ? "কমান্ড লিখে খুঁজুন (যেমন: model, migrate, cache)..." : "Search commands (e.g. model, migrate, cache)..."}
                      className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        title={language === 'bn' ? "মুছে ফেলুন" : "Clear search"}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Bookmark View Indicator */}
                  {showOnlyBookmarks && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                      <Bookmark className="w-3.5 h-3.5 fill-red-500" />
                      <span>{language === 'bn' ? `বুকমার্ক করা কমান্ড (${filteredCommands.length})` : `Bookmarked commands (${filteredCommands.length})`}</span>
                      <button
                        onClick={() => setShowOnlyBookmarks(false)}
                        className="ml-1 text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
                      >
                        {language === 'bn' ? 'সব দেখুন' : 'Show all'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Categories Scrollable Row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Commands Grid */}
              {filteredCommands.length === 0 ? (
                <div className="text-center py-14 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8">
                  <Search className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {language === 'bn' ? 'কোনো কমান্ড খুঁজে পাওয়া যায়নি!' : 'No commands matched your query!'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setShowOnlyBookmarks(false);
                    }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-xs font-medium cursor-pointer"
                  >
                    {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCommands.map((command) => (
                    <CommandCard
                      key={command.id}
                      command={command}
                      language={language}
                      isBookmarked={bookmarks.includes(command.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onCopy={handleCopy}
                      onRunInTerminal={handleRunInTerminal}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FILE STRUCTURES & TEMPLATES */}
          {activeTab === 'structure' && (
            <div className="animate-in fade-in duration-150">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* File Tree Navigation */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-3">
                      <FolderTree className="w-4 h-4 text-red-500" />
                      <span>{language === 'bn' ? 'লারাভেলের কোড ফাইল ও রিলেশন:' : 'Laravel Files & Relationships:'}</span>
                    </div>

                    <div className="space-y-1">
                      {CODE_TEMPLATES.map((tpl) => {
                        const isSelected = selectedTemplateId === tpl.id;
                        return (
                          <button
                            key={tpl.id}
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-semibold'
                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="font-mono text-xs truncate">
                                {tpl.filename}
                              </div>
                              <div className="text-[11px] text-zinc-500 truncate font-sans">
                                {language === 'bn' ? tpl.banglaTitle : tpl.title}
                              </div>
                            </div>
                            <ArrowRight
                              className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                                isSelected ? 'translate-x-0.5 text-red-500' : 'opacity-40'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Relationship Quick Hint */}
                  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <span>🔗 {language === 'bn' ? 'রিলেশনশিপ নিয়মাবলী:' : 'Relationship Concepts:'}</span>
                    </div>
                    <p>
                      <strong>belongsTo:</strong> {language === 'bn' ? 'চাইল্ড মডেলে পেরেন্টের ফরেন কি ট্র্যাক করে।' : 'Points to parent model using foreign key.'}
                    </p>
                    <p>
                      <strong>hasMany:</strong> {language === 'bn' ? '১টি পেরেন্টের একাধিক চাইল্ড থাকে (Category hasMany Products)।' : 'Parent with multiple children (Category hasMany Products).'}
                    </p>
                    <p>
                      <strong>with('...'):</strong> {language === 'bn' ? 'web.php তে কুয়েরি করার সময় সর্বদা N+1 সমাধান করতে Eager Loading করুন।' : 'Always eager load to eliminate N+1 queries in web.php.'}
                    </p>
                  </div>
                </div>

                {/* Code Viewer */}
                <div className="lg:col-span-8">
                  <CodeViewer template={selectedTemplate} language={language} onCopy={handleCopy} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOW TO SET UP LARAVEL ON PC */}
          {activeTab === 'setup' && (
            <div className="animate-in fade-in duration-150">
              <SetupGuide
                language={language}
                onCopy={handleCopy}
                onRunInTerminal={handleRunInTerminal}
              />
            </div>
          )}

          {/* TAB 4: ARTISAN GENERATOR */}
          {activeTab === 'generator' && (
            <div className="animate-in fade-in duration-150">
              <ArtisanGenerator language={language} onCopy={handleCopy} onRunInTerminal={handleRunInTerminal} />
            </div>
          )}

          {/* TAB 5: HOSTING & DEPLOYMENT */}
          {activeTab === 'hosting' && (
            <div className="animate-in fade-in duration-150">
              <HostingSection language={language} onCopy={handleCopy} onRunInTerminal={handleRunInTerminal} />
            </div>
          )}

          {/* TAB 6: TERMINAL SIMULATOR */}
          {activeTab === 'terminal' && (
            <div className="animate-in fade-in duration-150">
              <TerminalSimulator
                initialCommand={terminalInputCmd}
                language={language}
                onCopyText={handleCopy}
              />
            </div>
          )}

          {/* TAB 7: PERSONAL CUSTOM NOTES */}
          {activeTab === 'notes' && (
            <div className="animate-in fade-in duration-150">
              <CustomNotesManager language={language} onCopy={handleCopy} />
            </div>
          )}
        </main>
      </div>

      {/* Global Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        onSelectCommand={(cmd) => {
          setSearchQuery(cmd);
          setActiveTab('commands');
        }}
        onSelectTemplate={(tplId) => {
          setSelectedTemplateId(tplId);
          setActiveTab('structure');
        }}
        onSelectTab={setActiveTab}
      />

      {/* Settings Modal (Language, Theme, Reset) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        onSetLanguage={(l) => {
          setLanguage(l);
          addToast(l === 'bn' ? 'ভাষা বাংলায় পরিবর্তিত হয়েছে!' : 'Language switched to English!', 'info');
        }}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onResetData={handleResetData}
      />

      {/* Toast Feedback notifications */}
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Mobile Bottom Navigation Bar: COMPLETELY HIDDEN ON DESKTOP via lg:hidden */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
    </div>
  );
}
