import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Pin, PinOff, Search, Download, Upload, Save, X, BookOpen, Copy, Check } from 'lucide-react';
import { UserPersonalNote, Language } from '../types';

interface CustomNotesManagerProps {
  language?: Language;
  onCopy: (text: string, label: string) => void;
}

const DEFAULT_NOTES_EN: UserPersonalNote[] = [
  {
    id: 'note-1',
    title: 'Top Laravel Artisan Generator Shortcuts',
    category: 'Artisan',
    tags: ['artisan', 'shortcuts', 'model'],
    createdAt: '2026-10-08',
    isPinned: true,
    content: `Most used command combos:
• php artisan make:model Post -mcr (Model + Migration + Resource Controller)
• php artisan make:model Course -a (All-in-one: Factory, Seeder, Policy, Controller)

Quick memory trick:
m = migration
c = controller
r = resource CRUD
s = seeder
f = factory`
  },
  {
    id: 'note-2',
    title: 'Fix 404 broken images with storage:link',
    category: 'Storage',
    tags: ['storage', 'images', 'symlink'],
    createdAt: '2026-10-08',
    isPinned: true,
    content: `When uploaded images return 404 in browser:
1. Run in terminal: php artisan storage:link
2. In cPanel without terminal, create symlink.php in public_html:
symlink($_SERVER['DOCUMENT_ROOT'] . '/../laravel_core/storage/app/public', $_SERVER['DOCUMENT_ROOT'] . '/storage');`
  },
  {
    id: 'note-3',
    title: '500 Internal Server Error checklist on cPanel',
    category: 'Hosting',
    tags: ['cpanel', 'hosting', 'error 500'],
    createdAt: '2026-10-08',
    isPinned: false,
    content: `If Laravel gives 500 error after deployment:
1. Ensure storage and bootstrap/cache permissions are set to 775 or 777.
2. Verify APP_KEY is generated in .env.
3. Verify PHP Version in cPanel is at least 8.2 or 8.3.`
  }
];

const DEFAULT_NOTES_BN: UserPersonalNote[] = [
  {
    id: 'note-1',
    title: 'লারাভেল শর্টকাট মেক কমান্ডের গোপন ট্রিকস',
    category: 'Artisan',
    tags: ['artisan', 'shortcuts', 'model'],
    createdAt: '2026-10-08',
    isPinned: true,
    content: `সবচেয়ে বেশি ব্যবহৃত কমান্ড:
• php artisan make:model Post -mcr (Model + Migration + Resource Controller)
• php artisan make:model Course -a (সবকিছু একসাথে: Factory, Seeder, Policy, Resource Controller)

মনে রাখার টেকনিক:
m = migration
c = controller
r = resource CRUD
s = seeder
f = factory`
  },
  {
    id: 'note-2',
    title: 'স্টোরেজ লিংক মিস হলে ইমেজ না পাওয়ার সমাধান',
    category: 'Storage',
    tags: ['storage', 'images', 'symlink'],
    createdAt: '2026-10-08',
    isPinned: true,
    content: `ফাইল আপলোড করার পর ব্রাউজারে 404 নট ফাউন্ড আসলে:
১. টার্মিনালে দিন: php artisan storage:link
২. cPanel এ টার্মিনাল না থাকলে public_html এ symlink.php স্ক্রিপ্ট দিয়ে রান করা যায়:
symlink($_SERVER['DOCUMENT_ROOT'] . '/../laravel_core/storage/app/public', $_SERVER['DOCUMENT_ROOT'] . '/storage');`
  },
  {
    id: 'note-3',
    title: 'cPanel এ 500 Server Error ফিক্স করার সহজ চেক',
    category: 'Hosting',
    tags: ['cpanel', 'hosting', 'error 500'],
    createdAt: '2026-10-08',
    isPinned: false,
    content: `cPanel এ সাইট দেওয়ার পর 500 দিলে:
১. storage ও bootstrap/cache ফোল্ডারের পারমিশন 775 অথবা 777 করে দিন।
২. .env ফাইলে APP_KEY জেনারেট করা আছে কি না চেক করুন।
৩. PHP Version 8.2 বা 8.3 সিলেক্ট করা আছে কি না cPanel এ চেক করুন।`
  }
];

export const CustomNotesManager: React.FC<CustomNotesManagerProps> = ({ 
  language = 'en', 
  onCopy 
}) => {
  const isBn = language === 'bn';
  const storageKey = `laravel_notes_${language}`;

  const [notes, setNotes] = useState<UserPersonalNote[]>(() => {
    try {
      const saved = localStorage.getItem(`laravel_notes_${language}`);
      if (saved) return JSON.parse(saved);

      // Check legacy storage
      const legacy = localStorage.getItem('laravel_master_custom_notes');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const isLegacyBn = parsed.some((n: any) => n.id === 'note-1' && /মেক|শর্টকাট/.test(n.title));
        if (isLegacyBn && language === 'en') {
          return DEFAULT_NOTES_EN;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return language === 'bn' ? DEFAULT_NOTES_BN : DEFAULT_NOTES_EN;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Artisan');
  const [formTags, setFormTags] = useState('');
  const [formContent, setFormContent] = useState('');

  // Switch notes on language change if only default notes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`laravel_notes_${language}`);
      if (saved) {
        setNotes(JSON.parse(saved));
      } else {
        setNotes(language === 'bn' ? DEFAULT_NOTES_BN : DEFAULT_NOTES_EN);
      }
    } catch {
      setNotes(language === 'bn' ? DEFAULT_NOTES_BN : DEFAULT_NOTES_EN);
    }
  }, [language]);

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes, storageKey]);

  const handleStartCreate = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCategory('General');
    setFormTags('');
    setFormContent('');
    setIsEditing(true);
  };

  const handleStartEdit = (note: UserPersonalNote) => {
    setEditingId(note.id);
    setFormTitle(note.title);
    setFormCategory(note.category);
    setFormTags(note.tags.join(', '));
    setFormContent(note.content);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    const parsedTags = formTags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? {
                ...n,
                title: formTitle.trim(),
                category: formCategory.trim(),
                tags: parsedTags,
                content: formContent.trim(),
              }
            : n
        )
      );
    } else {
      const newNote: UserPersonalNote = {
        id: 'note-' + Date.now(),
        title: formTitle.trim(),
        category: formCategory.trim(),
        tags: parsedTags,
        content: formContent.trim(),
        createdAt: new Date().toISOString().split('T')[0],
        isPinned: false,
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    const promptMsg = isBn ? 'আপনি কি এই নোটটি মুছে ফেলতে চান?' : 'Delete this note permanently?';
    if (confirm(promptMsg)) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const handleTogglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleCopyNote = (content: string, id: string, title: string) => {
    onCopy(content, title);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `laravel-personal-notes-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          setNotes(parsed);
          alert(isBn ? 'নোট সফলভাবে ইমপোর্ট হয়েছে!' : 'Notes imported successfully!');
        }
      } catch (err) {
        alert(isBn ? 'ফাইলটি সঠিক JSON ফরম্যাটে নেই।' : 'Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const categories = ['All', ...Array.from(new Set(notes.map((n) => n.category)))];

  const filteredNotes = notes.filter((note) => {
    const matchesCat = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isBn ? 'আমার পার্সোনাল নোটবুক' : 'Personal Laravel Notes & Cheats'}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isBn 
              ? 'আপনার প্রয়োজনীয় কোড ট্রিকস, কমান্ড এবং কাস্টম নোট এখানে লিখে রাখুন। এটি স্বয়ংক্রিয়ভাবে ব্রাউজারে সেভ থাকবে।'
              : 'Save personal snippets, tips, and custom commands. Saved automatically in browser offline storage.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportJSON}
            title={isBn ? "নোট এক্সপোর্ট করুন" : "Export notes"}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <label
            title={isBn ? "নোট ইমপোর্ট করুন" : "Import notes"}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন নোট লিখুন' : 'New Note'}</span>
          </button>
        </div>
      </div>

      {/* Note Editor Modal / Inline Form */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-red-500/30 bg-white dark:bg-zinc-900 p-5 shadow-lg space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {editingId ? (isBn ? 'নোট এডিট করুন' : 'Edit Note') : (isBn ? 'নতুন নোট তৈরি করুন' : 'Create New Note')}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                {isBn ? 'শিরোনাম (Title):' : 'Title:'}
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Database backup script"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                {isBn ? 'ক্যাটাগরি:' : 'Category:'}
              </label>
              <input
                type="text"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="e.g. Artisan, Auth, Routing, Deploy"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {isBn ? 'ট্যাগস (কমা দিয়ে আলাদা করুন):' : 'Tags (comma-separated):'}
            </label>
            <input
              type="text"
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              placeholder="e.g. commands, database, backup"
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {isBn ? 'নোটের বিস্তারিত কনটেন্ট / কোড:' : 'Note Content / Code snippet:'}
            </label>
            <textarea
              required
              rows={6}
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              placeholder={isBn ? "এখানে আপনার ব্যক্তিগত নোট বা কোড স্নিপেট লিখে রাখুন..." : "Write your custom notes, commands, or snippets here..."}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isBn ? 'সেভ করুন' : 'Save Note'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? "নোটে সার্চ করুন..." : "Search notes..."}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-hidden focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat === 'All' ? (isBn ? 'সব' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {sortedNotes.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-6">
          <BookOpen className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {isBn ? 'কোনো নোট পাওয়া যায়নি!' : 'No notes found!'}
          </p>
          <button
            onClick={handleStartCreate}
            className="mt-3 text-xs text-red-500 hover:underline font-medium cursor-pointer"
          >
            + {isBn ? 'একটি নতুন নোট যোগ করুন' : 'Add your first note'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all bg-white dark:bg-zinc-900/70 ${
                note.isPinned
                  ? 'border-red-400/50 dark:border-red-500/30 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-1">
                    <span className="text-red-500 font-semibold">{note.category}</span>
                    <span>•</span>
                    <span>{note.createdAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {note.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePin(note.id)}
                    title={note.isPinned ? "Unpin" : "Pin to top"}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {note.isPinned ? (
                      <PinOff className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Pin className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleStartEdit(note)}
                    title="Edit"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950 p-3 border border-zinc-200/60 dark:border-zinc-800/80 my-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {note.content}
              </div>

              {/* Footer: Tags and Copy */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-1 flex-wrap">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleCopyNote(note.content, note.id, note.title)}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer font-medium"
                >
                  {copiedId === note.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isBn ? 'কন্টেন্ট কপি' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
