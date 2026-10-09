export type Language = 'bn' | 'en';

export type CommandCategory = 
  | 'all'
  | 'setup'
  | 'make'
  | 'database'
  | 'cache'
  | 'storage'
  | 'auth'
  | 'route'
  | 'hosting';

export interface LaravelCommand {
  id: string;
  command: string;
  title: string;
  category: CommandCategory;
  banglaTitle: string;
  banglaExplanation: string;
  englishExplanation?: string;
  flags?: { flag: string; description: string; englishDescription?: string }[];
  exampleOutput?: string;
  tags: string[];
  isEssential?: boolean;
}

export interface CodeTemplate {
  id: string;
  filename: string;
  category: 'routes' | 'models' | 'migrations' | 'controllers' | 'bootstrap' | 'middleware' | 'env' | 'views';
  title: string;
  banglaTitle: string;
  banglaExplanation: string;
  englishExplanation?: string;
  code: string;
  language: string;
  tips?: string[];
  englishTips?: string[];
}

export interface HostingStep {
  id: string;
  type: 'cpanel' | 'vps' | 'checklist';
  stepNumber: number;
  title: string;
  banglaTitle: string;
  description: string;
  englishDescription?: string;
  commands?: string[];
  codeSnippet?: { title: string; code: string; language: string };
  importantNote?: string;
  englishNote?: string;
}

export interface ProductionChecklistItem {
  title: string;
  englishTitle?: string;
  desc: string;
  englishDesc?: string;
}

export interface UserPersonalNote {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  isPinned?: boolean;
}

export interface SetupSoftware {
  id: string;
  name: string;
  nameEn?: string;
  nameBn?: string;
  category: 'runtime' | 'package_manager' | 'environment' | 'editor' | 'database' | 'tools';
  requiredVersion: string;
  requiredVersionEn?: string;
  requiredVersionBn?: string;
  isEssential: boolean;
  descriptionBn: string;
  descriptionEn: string;
  downloadUrl: string;
  docsUrl?: string;
  verificationCmd?: string;
  quickInstallCmd?: {
    windows?: string;
    macos?: string;
    linux?: string;
  };
  prosBn?: string[];
  prosEn?: string[];
}
