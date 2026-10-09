import React, { useState } from 'react';
import { Sparkles, Copy, Check, Terminal } from 'lucide-react';
import { Language } from '../types';

interface ArtisanGeneratorProps {
  language?: Language;
  onCopy: (text: string, label: string) => void;
  onRunInTerminal: (cmd: string) => void;
}

export const ArtisanGenerator: React.FC<ArtisanGeneratorProps> = ({
  language = 'en',
  onCopy,
  onRunInTerminal,
}) => {
  const [artifactType, setArtifactType] = useState<'model' | 'controller' | 'migration' | 'request' | 'middleware'>('model');
  const [name, setName] = useState('Product');

  // Model flags
  const [withMigration, setWithMigration] = useState(true);
  const [withController, setWithController] = useState(true);
  const [withResource, setWithResource] = useState(true);
  const [withSeeder, setWithSeeder] = useState(false);
  const [withFactory, setWithFactory] = useState(false);
  const [withAll, setWithAll] = useState(false);

  // Controller flags
  const [isResourceController, setIsResourceController] = useState(true);
  const [isApiController, setIsApiController] = useState(false);

  const [copiedCmd, setCopiedCmd] = useState(false);

  const isBn = language === 'bn';

  // Compute generated command
  let generatedCommand = '';
  if (artifactType === 'model') {
    const safeName = name.trim() || 'ModelName';
    if (withAll) {
      generatedCommand = `php artisan make:model ${safeName} -a`;
    } else {
      let flags = '';
      if (withMigration) flags += 'm';
      if (withController) flags += 'c';
      if (withResource) flags += 'r';
      if (withSeeder) flags += 's';
      if (withFactory) flags += 'f';

      generatedCommand = flags
        ? `php artisan make:model ${safeName} -${flags}`
        : `php artisan make:model ${safeName}`;
    }
  } else if (artifactType === 'controller') {
    const safeName = name.trim() || 'CustomController';
    const controllerName = safeName.endsWith('Controller') ? safeName : `${safeName}Controller`;
    let flag = '';
    if (isApiController) flag = ' --api';
    else if (isResourceController) flag = ' -r';
    generatedCommand = `php artisan make:controller ${controllerName}${flag}`;
  } else if (artifactType === 'migration') {
    const safeName = name.trim() || 'items';
    const tableName = safeName.toLowerCase().replace(/\s+/g, '_');
    generatedCommand = `php artisan make:migration create_${tableName}_table`;
  } else if (artifactType === 'request') {
    const safeName = name.trim() || 'StorePost';
    const requestName = safeName.endsWith('Request') ? safeName : `${safeName}Request`;
    generatedCommand = `php artisan make:request ${requestName}`;
  } else if (artifactType === 'middleware') {
    const safeName = name.trim() || 'CheckRole';
    generatedCommand = `php artisan make:middleware ${safeName}`;
  }

  const handleCopyCmd = () => {
    onCopy(generatedCommand, 'Generated Artisan Command');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-red-500" />
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isBn ? 'ইন্টারেক্টিভ লারাভেল কমান্ড জেনারেটর' : 'Interactive Artisan Command Generator'}
        </h2>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
        {isBn
          ? 'কমান্ডের সিনট্যাক্স মনে না রেখে আপনার যা যা ফাইল লাগবে তা সিলেক্ট করুন, নিখুঁত Artisan কমান্ড স্বয়ংক্রিয়ভাবে তৈরি হয়ে যাবে।'
          : 'Select which files and scaffolding you need, and the precise Artisan command will generate in real time.'}
      </p>

      {/* Artifact Type Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/70 rounded-xl mb-5">
        {[
          { id: 'model', label: isBn ? 'Model (মডেল)' : 'Eloquent Model' },
          { id: 'controller', label: isBn ? 'Controller (কন্ট্রোলার)' : 'Controller' },
          { id: 'migration', label: isBn ? 'Migration (মাইগ্রেশন)' : 'Migration' },
          { id: 'request', label: 'Form Request' },
          { id: 'middleware', label: 'Middleware' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setArtifactType(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              artifactType === tab.id
                ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Name Input & Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {isBn ? 'ফাইলের নাম (PascalCase):' : 'File Name (PascalCase):'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Product, Category, Invoice"
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/30 text-sm font-mono"
          />
        </div>

        {/* Dynamic Checkboxes based on artifact type */}
        {artifactType === 'model' && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              {isBn ? 'সাথে যা যা তৈরি করতে চান:' : 'Include Associated Scaffolding:'}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withMigration}
                  onChange={(e) => setWithMigration(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>Migration (-m)</span>
              </label>
              <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withController}
                  onChange={(e) => setWithController(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>Controller (-c)</span>
              </label>
              <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withResource}
                  onChange={(e) => setWithResource(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>Resource CRUD (-r)</span>
              </label>
              <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withSeeder}
                  onChange={(e) => setWithSeeder(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>Seeder (-s)</span>
              </label>
              <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withFactory}
                  onChange={(e) => setWithFactory(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>Factory (-f)</span>
              </label>
              <label className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={withAll}
                  onChange={(e) => setWithAll(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>All In One (-a)</span>
              </label>
            </div>
          </div>
        )}

        {artifactType === 'controller' && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              {isBn ? 'কন্ট্রোলারের ধরন:' : 'Controller Type:'}
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="radio"
                  name="ctrl-type"
                  checked={isResourceController && !isApiController}
                  onChange={() => {
                    setIsResourceController(true);
                    setIsApiController(false);
                  }}
                  className="text-red-600 focus:ring-red-500"
                />
                <span>Standard Resource Controller (-r CRUD)</span>
              </label>
              <label className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="radio"
                  name="ctrl-type"
                  checked={isApiController}
                  onChange={() => {
                    setIsApiController(true);
                    setIsResourceController(false);
                  }}
                  className="text-red-600 focus:ring-red-500"
                />
                <span>API Resource Controller (--api JSON Only)</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Generated Result Box */}
      <div className="rounded-xl bg-zinc-950 p-4 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto">
          <span className="text-red-500 font-mono font-bold select-none">$</span>
          <code className="text-sm sm:text-base font-mono font-semibold text-emerald-400 whitespace-nowrap">
            {generatedCommand}
          </code>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onRunInTerminal(generatedCommand)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{isBn ? 'সিমুলেট করুন' : 'Run in Sandbox'}</span>
          </button>
          <button
            onClick={handleCopyCmd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              copiedCmd
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            {copiedCmd ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isBn ? 'কমান্ড কপি' : 'Copy Command'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
