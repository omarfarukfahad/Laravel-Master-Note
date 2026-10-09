import { SetupSoftware } from '../types';

export const SETUP_SOFTWARE_LIST: SetupSoftware[] = [
  {
    id: 'laravel-herd',
    name: 'Laravel Herd',
    nameEn: 'Laravel Herd (Zero-Config All-In-One)',
    nameBn: 'Laravel Herd (সবচেয়ে সহজ অল-ইন-ওয়ান)',
    category: 'environment',
    requiredVersion: 'Latest (Free)',
    requiredVersionEn: 'Latest (Free)',
    requiredVersionBn: 'লেটেস্ট ভার্সন (ফ্রি)',
    isEssential: true,
    descriptionBn: 'উইন্ডোজ এবং ম্যাকের জন্য লারাভেলের অফিশিয়াল ০-কনফিগ এনভায়রনমেন্ট। এতে PHP, Composer, Node.js এবং Nginx আগে থেকেই ইনস্টল করা থাকে। কোনো XAMPP বা আলাদা PHP সেটআপের ঝামেলা নেই!',
    descriptionEn: 'The official zero-dependency local development environment for Laravel on macOS and Windows. Ships with PHP, Composer, and fast local web server out of the box.',
    downloadUrl: 'https://herd.laravel.com',
    docsUrl: 'https://herd.laravel.com/docs',
    verificationCmd: 'herd --version',
    quickInstallCmd: {
      windows: 'Download .exe installer from herd.laravel.com',
      macos: 'brew install --cask herd'
    },
    prosBn: ['১-ক্লিকে ইন্সটল হয়', 'PHP ও Composer স্বয়ংক্রিয়ভাবে দিয়ে দেয়', 'সবচেয়ে দ্রুত চলে'],
    prosEn: ['1-click zero config', 'Bundled with PHP & Composer', 'Blazing fast performance']
  },
  {
    id: 'php',
    name: 'PHP Runtime',
    nameEn: 'PHP Runtime (Core Language Engine)',
    nameBn: 'PHP Runtime (প্রয়োজনীয় পিএইচপি ইঞ্জিন)',
    category: 'runtime',
    requiredVersion: 'v8.2 / v8.3+ (Laravel 11)',
    requiredVersionEn: 'v8.2 or v8.3+ (Laravel 11 required)',
    requiredVersionBn: 'v8.2 বা v8.3+ (Laravel 11 আবশ্যক)',
    isEssential: true,
    descriptionBn: 'লারাভেল চালানোর মূল ইঞ্জিন। লারাভেল ১১ এর জন্য ন্যূনতম PHP 8.2 বা 8.3 প্রয়োজন। Herd বা Laragon ব্যবহার করলে এটি স্বয়ংক্রিয়ভাবে চলে আসে।',
    descriptionEn: 'The core programming language engine required to run Laravel. Laravel 11 requires PHP 8.2 or 8.3+ with mbstring, pdo, and openssl extensions.',
    downloadUrl: 'https://www.php.net/downloads',
    docsUrl: 'https://www.php.net/manual/en/install.php',
    verificationCmd: 'php -v',
    quickInstallCmd: {
      windows: 'Available in Herd / Laragon / windows.php.net',
      macos: 'brew install php@8.3',
      linux: 'sudo apt install php8.3-cli php8.3-mbstring php8.3-xml php8.3-mysql php8.3-curl -y'
    },
    prosBn: ['লারাভেল ১১ চালাতে আবশ্যক', 'এক্সটেনশন: pdo, curl, mbstring, openssl'],
    prosEn: ['Required for Laravel 11', 'Includes PDO, curl, mbstring, openssl']
  },
  {
    id: 'composer',
    name: 'Composer',
    nameEn: 'Composer (PHP Dependency Manager)',
    nameBn: 'Composer (পিএইচপি প্যাকেজ ম্যানেজার)',
    category: 'package_manager',
    requiredVersion: 'v2.7+ (Latest)',
    requiredVersionEn: 'v2.7+ (Latest)',
    requiredVersionBn: 'v2.7+ (লেটেস্ট)',
    isEssential: true,
    descriptionBn: 'লারাভেল ও এর যাবতীয় লাইব্রেরি ডাউনলোড ও ম্যানেজ করার অফিশিয়াল টুল। যেমন নোডজেএস-এ npm থাকে, তেমনি পিএইচপিতে কম্পোজার অপরিহার্য।',
    descriptionEn: 'The official dependency manager for PHP. Required to create new Laravel projects and install third-party packages.',
    downloadUrl: 'https://getcomposer.org/download/',
    docsUrl: 'https://getcomposer.org/doc/',
    verificationCmd: 'composer -v',
    quickInstallCmd: {
      windows: 'Download Composer-Setup.exe',
      macos: 'brew install composer',
      linux: 'curl -sS https://getcomposer.org/installer | php && sudo mv composer.phar /usr/local/bin/composer'
    },
    prosBn: ['composer create-project রান করতে লাগে', 'অটোলোড ও প্যাকেজ ম্যানেজমেন্ট'],
    prosEn: ['Required to create projects', 'Handles autoloading & dependencies']
  },
  {
    id: 'nodejs',
    name: 'Node.js & NPM',
    nameEn: 'Node.js & NPM (Frontend Asset Compiler)',
    nameBn: 'Node.js & NPM (ফ্রন্টএন্ড এসেট বিল্ডার)',
    category: 'runtime',
    requiredVersion: 'v20.x / v22.x LTS',
    requiredVersionEn: 'v20.x or v22.x LTS',
    requiredVersionBn: 'v20.x বা v22.x LTS',
    isEssential: true,
    descriptionBn: 'Vite, Tailwind CSS এবং Laravel Breeze এর জাভাস্ক্রিপ্ট/CSS ফাইলগুলো দ্রুত কম্পাইল করতে Node.js এবং npm প্রয়োজন।',
    descriptionEn: 'JavaScript runtime needed for asset compilation with Vite, Tailwind CSS, React, Vue, and Laravel Breeze authentication scaffolding.',
    downloadUrl: 'https://nodejs.org/',
    docsUrl: 'https://nodejs.org/en/learn',
    verificationCmd: 'node -v && npm -v',
    quickInstallCmd: {
      windows: 'Download LTS installer from nodejs.org',
      macos: 'brew install node',
      linux: 'sudo apt install nodejs npm -y'
    },
    prosBn: ['npm install && npm run dev চালানোর জন্য', 'Tailwind ও Vite সাপোর্ট'],
    prosEn: ['Runs Vite and Tailwind CSS compiler', 'Required for Breeze & frontend auth']
  },
  {
    id: 'laragon',
    name: 'Laragon',
    nameEn: 'Laragon (Fast WAMP Alternative for Windows)',
    nameBn: 'Laragon (উইন্ডোজ ডেভেলপারদের জনপ্রিয় বিকল্প)',
    category: 'environment',
    requiredVersion: 'v6.0+ (Full Edition)',
    requiredVersionEn: 'v6.0+ (Full Edition)',
    requiredVersionBn: 'v6.0+ (ফুল এডিশন)',
    isEssential: false,
    descriptionBn: 'উইন্ডোজের জন্য একটি চমৎকার দ্রুতগামী WAMP বিকল্প। এতে MySQL, Apache, Nginx এবং অটোমেটিক ভার্চুয়াল হোস্ট (.test ডোমেইন) সাপোর্ট রয়েছে।',
    descriptionEn: 'An ultra-fast, isolated, and portable local development environment for Windows with automatic virtual hosts and MySQL.',
    downloadUrl: 'https://laragon.org/download/',
    docsUrl: 'https://laragon.org/docs/',
    quickInstallCmd: {
      windows: 'Download Laragon - Full (PHP 8.x, MySQL, Apache, Composer)'
    },
    prosBn: ['অটোমেটিক project.test লোকাল ইউআরএল বানায়', 'খুব লাইটওয়েট ও ফাস্ট'],
    prosEn: ['Creates instant local .test domains', 'Lightweight and portable']
  },
  {
    id: 'xampp',
    name: 'XAMPP',
    nameEn: 'XAMPP (Classic Local Server Stack)',
    nameBn: 'XAMPP (ক্লাসিক লোকাল সার্ভার)',
    category: 'environment',
    requiredVersion: 'PHP 8.2+ Build',
    requiredVersionEn: 'PHP 8.2+ Build',
    requiredVersionBn: 'PHP 8.2+ বিল্ড',
    isEssential: false,
    descriptionBn: 'ঐতিহ্যবাহী লোকাল Apache ও MySQL সার্ভার সফটওয়্যার। তবে লারাভেলের জন্য Laravel Herd বা Laragon ব্যবহার করা অনেক বেশি আধুনিক ও ঝামেলামুক্ত।',
    descriptionEn: 'A traditional Apache + MariaDB/MySQL environment. Recommended to use Herd or Laragon instead for easier Laravel workflows.',
    downloadUrl: 'https://www.apachefriends.org/download.html',
    docsUrl: 'https://www.apachefriends.org',
    prosBn: ['phpMyAdmin বিল্ট-ইন থাকে', 'সহজ গ্রাফিক্যাল কন্ট্রোল প্যানেল'],
    prosEn: ['Includes phpMyAdmin out of box', 'Simple GUI control panel']
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    nameEn: 'Visual Studio Code (IDE & Code Editor)',
    nameBn: 'Visual Studio Code (কোড এডিটর)',
    category: 'editor',
    requiredVersion: 'Latest',
    requiredVersionEn: 'Latest (Free)',
    requiredVersionBn: 'লেটেস্ট ভার্সন',
    isEssential: true,
    descriptionBn: 'লারাভেল কোডিংয়ের জন্য বিশ্বসেরা ফ্রি কোড এডিটর। এক্সটেনশন ইনস্টল করলে সিনট্যাক্স হাইলাইটিং এবং অটো-কমপ্লিশন পাওয়া যায়।',
    descriptionEn: 'The most popular free code editor for Laravel developers with powerful extensions for PHP, Blade, and Eloquent autocomplete.',
    downloadUrl: 'https://code.visualstudio.com/download',
    docsUrl: 'https://code.visualstudio.com/docs',
    prosBn: ['PHP Intelephense এক্সটেনশন', 'Laravel Blade Snippets এক্সটেনশন'],
    prosEn: ['PHP Intelephense & Blade support', 'Integrated terminal & Git diff']
  },
  {
    id: 'git',
    name: 'Git',
    nameEn: 'Git (Version Control System)',
    nameBn: 'Git (ভার্সন কন্ট্রোল)',
    category: 'tools',
    requiredVersion: 'v2.40+',
    requiredVersionEn: 'v2.40+',
    requiredVersionBn: 'v2.40+',
    isEssential: true,
    descriptionBn: 'কোড ব্যাকআপ, গিটহাব (GitHub) এ পুশ করা এবং হোস্টিং সার্ভারে প্রজেক্ট ক্লোন করে তোলার জন্য গিট সফটওয়্যার অপরিহার্য।',
    descriptionEn: 'Distributed version control system for tracking changes, collaborating, and deploying Laravel applications via GitHub.',
    downloadUrl: 'https://git-scm.com/downloads',
    docsUrl: 'https://git-scm.com/doc',
    verificationCmd: 'git --version',
    prosBn: ['GitHub ইন্টিগ্রেশন', 'হোস্টিং সার্ভারে গিট ক্লোন করতে লাগে'],
    prosEn: ['Essential for GitHub integration', 'Required for deployment on servers']
  },
  {
    id: 'tableplus',
    name: 'TablePlus / DBeaver',
    nameEn: 'TablePlus / DBeaver (Database GUI Client)',
    nameBn: 'TablePlus / DBeaver (ডাটাবেজ GUI ক্লায়েন্ট)',
    category: 'database',
    requiredVersion: 'Latest Free',
    requiredVersionEn: 'Latest Free',
    requiredVersionBn: 'লেটেস্ট ফ্রি ভার্সন',
    isEssential: false,
    descriptionBn: 'MySQL বা PostgreSQL ডাটাবেজ টেবিল, কলাম এবং ডাটা সরাসরি গ্রাফিক্যাল ইন্টারফেসে দেখা ও এডিট করার আধুনিক সফটওয়্যার।',
    descriptionEn: 'Modern, native database management GUI client for inspecting and editing MySQL, SQLite, and PostgreSQL tables.',
    downloadUrl: 'https://tableplus.com/',
    docsUrl: 'https://tableplus.com/blog',
    prosBn: ['ক্লিন এবং ফাস্ট ইন্টারফেস', 'SQL কুয়েরি রান করা সহজ'],
    prosEn: ['Clean native UI', 'Easy SQL query execution & table explorer']
  }
];

export const STEP_BY_STEP_SETUP_STEPS = [
  {
    step: 1,
    titleBn: '১. সফটওয়্যার ইনস্টলেশন (সবচেয়ে দ্রুত মেথড)',
    titleEn: 'Step 1: Install Required Software (Fastest Method)',
    descBn: 'উইন্ডোজ বা ম্যাক ইউজার হলে প্রথমে **Laravel Herd** (অথবা Laragon) এবং **Node.js** ডাউনলোড করে ইনস্টল করুন। Herd ইনস্টল করলে PHP এবং Composer আলাদা করে ইনস্টল করার প্রয়োজন নেই।',
    descEn: 'On Windows or macOS, download and install **Laravel Herd** (or Laragon) and **Node.js LTS**. Herd bundles PHP and Composer automatically with zero configuration.',
    actionLabel: 'Download Laravel Herd',
    actionUrl: 'https://herd.laravel.com'
  },
  {
    step: 2,
    titleBn: '২. টার্মিনালে ইনস্টলেশন ভেরিফাই করা',
    titleEn: 'Step 2: Verify Installation in Terminal',
    descBn: 'আপনার কম্পিউটারের টার্মিনাল (Command Prompt / PowerShell / Mac Terminal) ওপেন করে নিচের কমান্ডগুলো দিন এবং নিশ্চিত হোন ভার্সন নাম্বার দেখাচ্ছে:',
    descEn: 'Open your terminal (PowerShell, Command Prompt, or macOS Terminal) and execute these verification commands to ensure all runtimes are installed properly:',
    commands: [
      'php -v',
      'composer -v',
      'node -v',
      'npm -v',
      'git --version'
    ]
  },
  {
    step: 3,
    titleBn: '৩. গ্লোবাল লারাভেল ইনস্টলার সেটআপ (অপশনাল তবে রিকমেন্ডেড)',
    titleEn: 'Step 3: Install Global Laravel Installer (Recommended)',
    descBn: 'টার্মিনালে এই কমান্ডটি একবার রান করলে পরবর্তীতে যেকোনো সময় খুব সহজে `laravel new project-name` দিয়ে নিমেষেই প্রজেক্ট তৈরি করতে পারবেন:',
    descEn: 'Installing the global Laravel installer allows you to create projects with interactive flags using the `laravel new` command:',
    commands: [
      'composer global require laravel/installer'
    ]
  },
  {
    step: 4,
    titleBn: '৪. আপনার প্রথম লারাভেল প্রজেক্ট তৈরি করুন',
    titleEn: 'Step 4: Create Your First Laravel Project',
    descBn: 'আপনার কম্পিউটারের যেকোনো ফোল্ডারে টার্মিনাল ওপেন করে নিচের কমান্ড দিন (my-app এর জায়গায় আপনার পছন্দের নাম দিন):',
    descEn: 'Navigate to your desired project directory and initialize a fresh project with Composer:',
    commands: [
      'composer create-project laravel/laravel my-app',
      'cd my-app',
      'php artisan serve'
    ]
  },
  {
    step: 5,
    titleBn: '৫. ব্রাউজারে সাইট চেক ও ভিজিট করুন',
    titleEn: 'Step 5: Open in Browser',
    descBn: 'সার্ভার রান হওয়ার পর ব্রাউজারে যান এবং ওপেন করুন: `http://127.0.0.1:8000`। আপনি সুন্দর লারাভেল ওয়েলকাম পেজ দেখতে পাবেন! 🎉',
    descEn: 'Once the artisan development server starts, open your browser and navigate to `http://127.0.0.1:8000`. You will see the official Laravel welcome screen!'
  }
];

export const VSCODE_RECOMMENDED_EXTENSIONS = [
  { name: 'PHP Intelephense', author: 'Ben Mewburn', desc: 'Code completion, parameter info, and error detection for PHP' },
  { name: 'Laravel Blade Snippets', author: 'Winnie Lin', desc: 'Blade syntax highlighting and auto directives' },
  { name: 'Laravel Extra Intellisense', author: 'Amir', desc: 'Autocomplete for routes, views, configs, and translations' },
  { name: 'Laravel Pint', author: 'OpenCode', desc: 'Code formatting with official Laravel code style standards' },
  { name: 'Tailwind CSS IntelliSense', author: 'Tailwind Labs', desc: 'Autocomplete and linting for Tailwind CSS classes' },
  { name: 'DotENV', author: 'mikestead', desc: 'Syntax highlighting for .env files' }
];
